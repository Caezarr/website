import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { client } from "@sanity/lib/client";
import { ALL_CONTENT_SLUGS_QUERY } from "@sanity/lib/queries";
import { hubPath, itemPath } from "@/lib/locale-path";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

type SlugItem = { slug: { current: string }; language: string };

const sections = ["blog", "connectors", "glossary", "comparisons", "case-studies"] as const;

// Build hreflang alternates: for a given slug+section, map every locale to its URL
function buildAlternates(
  siteUrl: string,
  section: (typeof sections)[number],
  slug: string,
): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [
      locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "nl-BE",
      `${siteUrl}${itemPath(section, locale as Locale, slug)}`,
    ])
  );
}

function buildHubAlternates(siteUrl: string, section: (typeof sections)[number]): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [
      locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "nl-BE",
      `${siteUrl}${hubPath(section, locale as Locale)}`,
    ])
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "en-US": siteUrl,
          "fr-FR": `${siteUrl}/fr`,
          "nl-BE": `${siteUrl}/nl`,
          "x-default": siteUrl,
        },
      },
    },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.1 },
    // Hub pages with hreflang
    ...sections.flatMap((section) =>
      locales.map((locale) => ({
        url: `${siteUrl}${hubPath(section, locale as Locale)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: buildHubAlternates(siteUrl, section) },
      }))
    ),
  ];

  try {
    const data = await client.fetch(ALL_CONTENT_SLUGS_QUERY);
    if (!data) return staticPages;

    // Group items by slug so we can build hreflang across all 3 language versions
    const groupBySlug = (items: SlugItem[]) =>
      items.reduce<Record<string, SlugItem[]>>((acc, item) => {
        const s = item.slug.current;
        acc[s] = [...(acc[s] ?? []), item];
        return acc;
      }, {});

    const blogBySlag = groupBySlug(data.blogPosts ?? []);
    const glossaryBySlug = groupBySlug(data.glossaryTerms ?? []);
    const comparisonsBySlug = groupBySlug(data.comparisons ?? []);
    const connectorsBySlug = groupBySlug(data.connectors ?? []);
    const caseStudiesBySlug = groupBySlug(data.caseStudies ?? []);

    const contentPages: MetadataRoute.Sitemap = [
      // Blog
      ...Object.entries(blogBySlag).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("blog", item.language as Locale, slug)}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildAlternates(siteUrl, "blog", slug) },
        }))
      ),
      // Glossary
      ...Object.entries(glossaryBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("glossary", item.language as Locale, slug)}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: { languages: buildAlternates(siteUrl, "glossary", slug) },
        }))
      ),
      // Comparisons
      ...Object.entries(comparisonsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("comparisons", item.language as Locale, slug)}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildAlternates(siteUrl, "comparisons", slug) },
        }))
      ),
      // Connectors
      ...Object.entries(connectorsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("connectors", item.language as Locale, slug)}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: { languages: buildAlternates(siteUrl, "connectors", slug) },
        }))
      ),
      // Case studies
      ...Object.entries(caseStudiesBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("case-studies", item.language as Locale, slug)}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildAlternates(siteUrl, "case-studies", slug) },
        }))
      ),
    ];

    return [...staticPages, ...contentPages];
  } catch {
    return staticPages;
  }
}
