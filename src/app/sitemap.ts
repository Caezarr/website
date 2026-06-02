import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { client } from "@sanity/lib/client";
import { ALL_CONTENT_SLUGS_QUERY } from "@sanity/lib/queries";
import { hubPath, itemPath } from "@/lib/locale-path";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

type SlugItem = { slug: { current: string }; language: string };

const sections = ["blog", "connectors", "glossary", "comparisons", "case-studies"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.1 },
    // Hub pages for all locales
    ...sections.flatMap((section) =>
      locales.map((locale) => ({
        url: `${siteUrl}${hubPath(section, locale as Locale)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    ),
  ];

  try {
    const data = await client.fetch(ALL_CONTENT_SLUGS_QUERY);
    if (!data) return staticPages;

    const contentPages: MetadataRoute.Sitemap = [
      ...(data.blogPosts as SlugItem[]).map((item) => ({
        url: `${siteUrl}${itemPath("blog", item.language as Locale, item.slug.current)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...(data.connectors as SlugItem[]).map((item) => ({
        url: `${siteUrl}${itemPath("connectors", item.language as Locale, item.slug.current)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...(data.glossaryTerms as SlugItem[]).map((item) => ({
        url: `${siteUrl}${itemPath("glossary", item.language as Locale, item.slug.current)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...(data.comparisons as SlugItem[]).map((item) => ({
        url: `${siteUrl}${itemPath("comparisons", item.language as Locale, item.slug.current)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...(data.caseStudies as SlugItem[]).map((item) => ({
        url: `${siteUrl}${itemPath("case-studies", item.language as Locale, item.slug.current)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];

    return [...staticPages, ...contentPages];
  } catch {
    return staticPages;
  }
}
