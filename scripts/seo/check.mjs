import { writeFile } from "node:fs/promises";

const base = process.env.SEO_BASE_URL || "http://localhost:3100";
const origin = process.env.SEO_CANONICAL_ORIGIN || "https://www.wonka-ai.com";
const errors = [];
const warnings = [];
const rows = [];
const attr = (tag, name) =>
  tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, "i"))?.[1];
const tags = (html, name) =>
  html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];
const canonical = (html) =>
  attr(
    tags(html, "link").find((t) => attr(t, "rel") === "canonical") || "",
    "href",
  );
const meta = (html, name) =>
  attr(
    tags(html, "meta").find((t) => attr(t, "name") === name) || "",
    "content",
  );
const response = async (path) => {
  const r = await fetch(new URL(path, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(30000),
  });
  return { status: r.status, html: await r.text() };
};
const sitemap = await response("/sitemap.xml");
if (sitemap.status !== 200) throw new Error(`Sitemap HTTP ${sitemap.status}`);
const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replaceAll("&amp;", "&"),
);
if (!urls.length) throw new Error("Sitemap is empty");
if (new Set(urls).size !== urls.length) errors.push("Duplicate sitemap URLs");
const expectedComparisons = [
  "/fr/vs/dust",
  "/fr/vs/langdock",
  "/fr/vs/claude",
  "/fr/vs/wonka-ai-vs-chatgpt-enterprise",
];
for (const path of expectedComparisons)
  if (!urls.includes(origin + path))
    errors.push(`Missing from sitemap: ${path}`);
const results = new Map();
for (let i = 0; i < urls.length; i += 6) {
  await Promise.all(
    urls.slice(i, i + 6).map(async (url) => {
      const u = new URL(url);
      if (u.origin !== origin) errors.push(`Unexpected sitemap origin: ${url}`);
      const path = u.pathname;
      try {
        const { status, html } = await response(path);
        const row = {
          path,
          status,
          canonical: canonical(html),
          title: html.match(/<title>([^<]*)<\/title>/)?.[1],
          description: meta(html, "description"),
          robots: meta(html, "robots"),
          h1: (html.match(/<h1[\s>]/g) || []).length,
        };
        rows.push(row);
        results.set(url, { row, html });
        if (status !== 200) errors.push(`${path}: HTTP ${status}`);
        if (row.canonical?.replace(/\/$/, "") !== url.replace(/\/$/, ""))
          errors.push(`${path}: canonical ${row.canonical}`);
        if (/noindex/.test(row.robots || ""))
          errors.push(`${path}: sitemap includes noindex`);
        if (!row.title || !row.description)
          errors.push(`${path}: missing title or description`);
        if (row.h1 !== 1) warnings.push(`${path}: ${row.h1} H1 headings`);
        for (const script of html.matchAll(
          /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
        )) {
          try {
            JSON.parse(script[1]);
          } catch {
            errors.push(`${path}: invalid JSON-LD`);
          }
        }
      } catch (e) {
        errors.push(`${path}: ${e.message}`);
      }
    }),
  );
}
for (const [url, { html }] of results) {
  for (const tag of tags(html, "link").filter((t) => attr(t, "hreflang"))) {
    const target = attr(tag, "href");
    const alternate =
      results.get(target) || results.get(target?.replace(/\/$/, ""));
    if (!alternate) {
      warnings.push(
        `${new URL(url).pathname}: hreflang target absent from sitemap ${target}`,
      );
      continue;
    }
    const returnLinks = tags(alternate.html, "link")
      .filter((t) => attr(t, "hreflang"))
      .map((t) => attr(t, "href")?.replace(/\/$/, ""));
    if (!returnLinks.includes(url.replace(/\/$/, "")))
      errors.push(`${new URL(url).pathname}: nonreciprocal hreflang ${target}`);
  }
}
for (const path of expectedComparisons) {
  const item = results.get(origin + path);
  if (!item) continue;
  if (item.row.h1 !== 1) errors.push(`${path}: comparison must have one H1`);
  const schemas = [
    ...item.html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => JSON.parse(m[1]));
  if (
    !schemas.some((s) => s["@type"] === "Article" && s.inLanguage === "fr-FR")
  )
    errors.push(`${path}: missing French Article schema`);
  if (
    !schemas.some((s) => s["@type"] === "FAQPage") ||
    !schemas.some((s) => s["@type"] === "BreadcrumbList")
  )
    errors.push(`${path}: missing FAQ or breadcrumbs`);
  if (!item.html.includes("Sources et méthode"))
    errors.push(`${path}: missing visible sources`);
}
for (const path of [
  "/fr/page-inconnue-seo-test",
  "/nl/vs/dust",
  "/nl/vs/langdock",
]) {
  const r = await response(path);
  if (r.status !== 404) errors.push(`${path}: expected 404, got ${r.status}`);
}
const inbound = new Set();
for (const [source, { html }] of results) {
  for (const anchor of tags(html, "a")) {
    const href = attr(anchor, "href");
    if (!href) continue;
    const target = new URL(href.replaceAll("&amp;", "&"), source);
    if (
      target.origin === origin &&
      target.pathname !== new URL(source).pathname
    )
      inbound.add(target.pathname);
  }
}
for (const path of [
  ...expectedComparisons,
  "/vs/dust",
  "/vs/langdock",
  "/ai-agent-blueprint",
]) {
  if (!inbound.has(path))
    errors.push(`${path}: no inbound link from a sitemap page`);
}
for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const row of rows) {
    if (seen.has(row[field]))
      errors.push(
        `${row.path}: duplicate ${field} with ${seen.get(row[field])}`,
      );
    seen.set(row[field], row.path);
  }
}
const diagnostic = await response("/france/diagnostic");
if (
  diagnostic.status !== 200 ||
  !/noindex/.test(meta(diagnostic.html, "robots") || "")
)
  errors.push("Diagnostic should remain accessible and noindex");
const report = {
  checkedAt: new Date().toISOString(),
  base,
  origin,
  pages: urls.length,
  errors,
  warnings,
  rows: rows.sort((a, b) => a.path.localeCompare(b.path)),
};
if (process.env.SEO_REPORT_PATH)
  await writeFile(
    process.env.SEO_REPORT_PATH,
    JSON.stringify(report, null, 2) + "\n",
  );
console.log(JSON.stringify({ pages: urls.length, errors, warnings }, null, 2));
if (errors.length) process.exitCode = 1;
