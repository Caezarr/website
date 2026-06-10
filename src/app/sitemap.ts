import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { client } from "@sanity/lib/client";
import { ALL_CONTENT_SLUGS_QUERY } from "@sanity/lib/queries";
import { hubPath, itemPath } from "@/lib/locale-path";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { buildExistingItemLanguages, buildHubLanguages } from "@/lib/hreflang";

type SlugItem = { slug: { current: string }; language: string; _updatedAt?: string };

const sections = ["blog", "connectors", "glossary", "comparisons", "case-studies"] as const;

function latestModified(items: SlugItem[]): Date {
  const latest = items
    .map((item) => item._updatedAt ? new Date(item._updatedAt).getTime() : 0)
    .filter(Boolean)
    .sort((a, b) => b - a)[0];

  return latest ? new Date(latest) : new Date();
}

function uniqueByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
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
          "x-default": siteUrl,
        },
      },
    },
    { url: `${siteUrl}/ai-agents`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/start-ai`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/wonka-chat`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    // Hub pages with hreflang
    ...sections.flatMap((section) =>
      locales.map((locale) => ({
        url: `${siteUrl}${hubPath(section, locale as Locale)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: buildHubLanguages(siteUrl, section, locales) },
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
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "blog", items) },
        }))
      ),
      // Glossary
      ...Object.entries(glossaryBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("glossary", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "glossary", items) },
        }))
      ),
      // Comparisons
      ...Object.entries(comparisonsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("comparisons", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "comparisons", items) },
        }))
      ),
      // Connectors
      ...Object.entries(connectorsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("connectors", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "connectors", items) },
        }))
      ),
      // Case studies
      ...Object.entries(caseStudiesBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("case-studies", item.language as Locale, slug)}`,
          lastModified: item._updatedAt ? new Date(item._updatedAt) : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages: buildExistingItemLanguages(siteUrl, "case-studies", items) },
        }))
      ),
    ];

    return uniqueByUrl([...staticPages, ...contentPages]);
  } catch {
    return uniqueByUrl(staticPages);
  }
}
