import { afterEach, describe, expect, test } from "bun:test";
import { buildMetadata } from "../../src/lib/seo";
import { getSiteUrl } from "../../src/lib/site-url";
import { buildExistingItemLanguages } from "../../src/lib/hreflang";
import { FRENCH_COMPARISONS } from "../../src/lib/french-comparisons";

const original = { ...process.env };
afterEach(() => {
  process.env = { ...original };
});

describe("Canonical URLs and indexing", () => {
  test("deployment hosts never become canonical fallbacks", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_VERCEL_URL = "preview-123.vercel.app";
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL =
      "project.vercel.app";
    expect(getSiteUrl()).toBe("https://www.wonka-ai.com");
  });
  test("normalizes an explicit origin, including the apex hostname", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://wonka-ai.com/";
    expect(getSiteUrl()).toBe("https://www.wonka-ai.com");
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3100/path?query=yes";
    expect(getSiteUrl()).toBe("http://localhost:3100");
    process.env.NEXT_PUBLIC_SITE_URL = "https://user:secret@example.com";
    expect(() => getSiteUrl()).toThrow();
  });
  test("preview pages cannot override noindex through page metadata", () => {
    process.env.VERCEL_ENV = "preview";
    const m = buildMetadata(null, { path: "/fr/vs/dust", locale: "fr" });
    expect(m.robots).toMatchObject({ index: false, follow: true });
  });
  test("supports non-Vercel staging and individual noindex pages", () => {
    process.env.SEO_NOINDEX = "true";
    expect(buildMetadata(null, { path: "/" }).robots).toMatchObject({
      index: false,
    });
    delete process.env.SEO_NOINDEX;
    expect(
      buildMetadata(null, { path: "/draft", noindex: true }).robots,
    ).toMatchObject({ index: false });
  });
});

describe("Language alternates", () => {
  test("hub x-default points to the matching English hub", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.wonka-ai.com";
    const m = buildMetadata(null, {
      path: "/fr/vs",
      locale: "fr",
      hreflang: "hub",
    });
    expect(m.alternates?.languages?.["x-default"]).toBe(
      "https://www.wonka-ai.com/vs",
    );
    expect(m.alternates?.languages?.["fr-FR"]).toBe(
      "https://www.wonka-ai.com/fr/vs",
    );
  });
  test("does not invent translated CMS documents", () => {
    const m = buildMetadata(null, {
      path: "/fr/blog/unique",
      locale: "fr",
      hreflang: { section: "blog", slug: "unique" },
    });
    expect(m.alternates?.languages).toBeUndefined();
    expect(
      buildExistingItemLanguages("https://www.wonka-ai.com", "blog", [
        { language: "fr", slug: { current: "unique" } },
      ]),
    ).toEqual({ "fr-FR": "https://www.wonka-ai.com/fr/blog/unique" });
  });
  test("fallback descriptions match the requested language", () => {
    const fr = buildMetadata(null, { path: "/fr/example", locale: "fr" });
    expect(fr.description).toContain("Déployez");
    expect(buildMetadata(null, { path: "/example" }).description).toContain(
      "Deploy",
    );
  });
});

test("curated comparison URLs are unique and carry reviewable evidence", () => {
  expect(new Set(FRENCH_COMPARISONS.map((c) => c.slug)).size).toBe(4);
  for (const c of FRENCH_COMPARISONS) {
    expect(c.sources.length).toBeGreaterThan(0);
    expect(c.questions.length).toBeGreaterThan(0);
    expect(c.pilot.length).toBe(3);
    expect(Number.isNaN(Date.parse(c.reviewedAt))).toBe(false);
    for (const source of c.sources)
      expect(new URL(source.url).protocol).toBe("https:");
  }
});
