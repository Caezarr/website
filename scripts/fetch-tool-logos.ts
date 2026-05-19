/**
 * Fetches Wonka integration logos from simpleicons.org.
 *
 * Pulls each brand's official SVG + hex color, writes them to
 * `public/images/solution/card-3/logos/`, and emits a `logos.json` manifest
 * the section component can consume directly.
 *
 * Run: `bun run scripts/fetch-tool-logos.ts`
 */

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type BgMode = "brand" | "white";

interface LogoSpec {
  slug: string;
  name: string;
  bgMode: BgMode;
  /** Used when simple-icons doesn't carry this brand (Microsoft, Slack, LinkedIn,
   *  Salesforce, etc. were removed for brand-policy reasons). Sourced from each
   *  brand's official guidelines. */
  fallbackHex?: string;
}

const LOGOS: LogoSpec[] = [
  { slug: "gmail", name: "Gmail", bgMode: "white" },
  { slug: "googlecalendar", name: "Google Calendar", bgMode: "white" },
  { slug: "googledocs", name: "Google Docs", bgMode: "white" },
  { slug: "googledrive", name: "Google Drive", bgMode: "white" },
  { slug: "googlesheets", name: "Google Sheets", bgMode: "white" },
  { slug: "linkedin", name: "LinkedIn", bgMode: "brand", fallbackHex: "0A66C2" },
  { slug: "teams", name: "Microsoft Teams", bgMode: "white", fallbackHex: "6264A7" },
  { slug: "excel", name: "Excel", bgMode: "white", fallbackHex: "217346" },
  { slug: "word", name: "Word", bgMode: "white", fallbackHex: "2B579A" },
  { slug: "powerpoint", name: "PowerPoint", bgMode: "white", fallbackHex: "B7472A" },
  { slug: "onedrive", name: "OneDrive", bgMode: "white", fallbackHex: "0364B8" },
  { slug: "outlook", name: "Outlook", bgMode: "white", fallbackHex: "0078D4" },
  { slug: "odoo", name: "Odoo", bgMode: "brand" },
  { slug: "slack", name: "Slack", bgMode: "white", fallbackHex: "4A154B" },
  { slug: "aircall", name: "Aircall", bgMode: "brand" },
  { slug: "airtable", name: "Airtable", bgMode: "white" },
  { slug: "apollographql", name: "Apollo", bgMode: "white" },
  { slug: "asana", name: "Asana", bgMode: "white" },
  { slug: "attio", name: "Attio", bgMode: "white", fallbackHex: "000000" },
  { slug: "box", name: "Box", bgMode: "white" },
  { slug: "caldotcom", name: "Cal.com", bgMode: "white" },
  { slug: "clickup", name: "ClickUp", bgMode: "white" },
  { slug: "close", name: "Close", bgMode: "white", fallbackHex: "02BF87" },
  { slug: "confluence", name: "Confluence", bgMode: "white" },
  { slug: "fathom", name: "Fathom", bgMode: "white" },
  { slug: "figma", name: "Figma", bgMode: "white" },
  { slug: "github", name: "GitHub", bgMode: "white" },
  { slug: "gitlab", name: "GitLab", bgMode: "white" },
  { slug: "hubspot", name: "HubSpot", bgMode: "brand" },
  { slug: "jira", name: "Jira", bgMode: "white" },
  { slug: "klaviyo", name: "Klaviyo", bgMode: "white", fallbackHex: "FFD000" },
  { slug: "linear", name: "Linear", bgMode: "white" },
  { slug: "mondaydotcom", name: "Monday", bgMode: "white", fallbackHex: "FF3D57" },
  { slug: "n8n", name: "n8n", bgMode: "brand" },
  { slug: "notion", name: "Notion", bgMode: "white" },
  { slug: "salesforce", name: "Salesforce", bgMode: "brand", fallbackHex: "00A1E0" },
  { slug: "supabase", name: "Supabase", bgMode: "white" },
  { slug: "vercel", name: "Vercel", bgMode: "white" },
];

const OUT_DIR = path.resolve(
  process.cwd(),
  "public/images/solution/card-3/logos",
);

interface ManifestEntry {
  slug: string;
  name: string;
  hex: string;
  bgMode: BgMode;
  /** null when SVG still needs to be sourced manually. */
  file: string | null;
}

async function fetchSimpleIconsManifest(): Promise<Map<string, string>> {
  const url =
    "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/data/simple-icons.json";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
  const data = (await res.json()) as Array<{
    title: string;
    slug?: string;
    hex: string;
  }>;

  const titleToSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/\+/g, "plus")
      .replace(/\./g, "dot")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "");

  const map = new Map<string, string>();
  for (const icon of data) {
    const slug = icon.slug ?? titleToSlug(icon.title);
    map.set(slug, icon.hex);
  }
  return map;
}

async function fetchSvg(slug: string): Promise<string | null> {
  const url = `https://cdn.simpleicons.org/${slug}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.text();
}

async function main() {
  console.log(`Fetching simple-icons manifest…`);
  const hexBySlug = await fetchSimpleIconsManifest();
  console.log(`  manifest entries: ${hexBySlug.size}`);

  await mkdir(OUT_DIR, { recursive: true });

  const manifest: ManifestEntry[] = [];
  const fetched: string[] = [];
  const needSvg: string[] = [];

  for (const logo of LOGOS) {
    const hex = hexBySlug.get(logo.slug) ?? logo.fallbackHex;
    if (!hex) {
      console.warn(`  ! no hex available for ${logo.slug} (${logo.name})`);
      continue;
    }

    const file = `${logo.slug}.svg`;
    const fileExists = existsSync(path.join(OUT_DIR, file));

    if (fileExists) {
      manifest.push({
        slug: logo.slug,
        name: logo.name,
        hex: `#${hex}`,
        bgMode: logo.bgMode,
        file,
      });
      console.log(`  = ${logo.slug.padEnd(24)} #${hex}  (kept existing file)`);
      continue;
    }

    const svg = hexBySlug.has(logo.slug) ? await fetchSvg(logo.slug) : null;

    if (svg) {
      await writeFile(path.join(OUT_DIR, file), svg, "utf8");
      manifest.push({
        slug: logo.slug,
        name: logo.name,
        hex: `#${hex}`,
        bgMode: logo.bgMode,
        file,
      });
      fetched.push(logo.slug);
      console.log(`  ✓ ${logo.slug.padEnd(24)} #${hex}`);
    } else {
      manifest.push({
        slug: logo.slug,
        name: logo.name,
        hex: `#${hex}`,
        bgMode: logo.bgMode,
        file: null,
      });
      needSvg.push(logo.slug);
      console.log(
        `  · ${logo.slug.padEnd(24)} #${hex}  (manifest entry only — SVG TBD)`,
      );
    }
  }

  await writeFile(
    path.join(OUT_DIR, "logos.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );

  console.log(
    `\nDone. ${fetched.length} SVGs fetched, ${needSvg.length} entries pending SVG, manifest has ${manifest.length}/${LOGOS.length}.`,
  );
  if (needSvg.length > 0) {
    console.log(`\nDrop SVGs into ${OUT_DIR} for:`);
    for (const slug of needSvg) console.log(`  - ${slug}.svg`);
    console.log(
      `Then update logos.json "file" from null to "<slug>.svg" for each.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
