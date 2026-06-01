import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { sanityFetch } from "@sanity/lib/live";
import { ALL_CONTENT_SLUGS_QUERY } from "@sanity/lib/queries";

type SlugItem = { slug: { current: string }; language: string };

function contentUrl(siteUrl: string, section: string, language: string, slug: string): string {
  const prefix = language === "en" ? "" : `/${language}`;
  return `${siteUrl}${prefix}/${section}/${slug}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.1 },
    // Hub pages — all 3 locales
    ...["blog", "glossaire", "comparaisons", "connecteurs", "cas-clients"].flatMap((section) =>
      ["en", "fr", "nl"].map((locale) => ({
        url: locale === "en" ? `${siteUrl}/${section}` : `${siteUrl}/${locale}/${section}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    ),
  ];

  try {
    const { data } = await sanityFetch({ query: ALL_CONTENT_SLUGS_QUERY });
    if (!data) return staticPages;

    const blogPages = (data.blogPosts as SlugItem[]).map((item) => ({
      url: contentUrl(siteUrl, "blog", item.language, item.slug.current),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const glossaryPages = (data.glossaryTerms as SlugItem[]).map((item) => ({
      url: contentUrl(siteUrl, "glossaire", item.language, item.slug.current),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const comparisonPages = (data.comparisons as SlugItem[]).map((item) => ({
      url: contentUrl(siteUrl, "comparaisons", item.language, item.slug.current),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const connectorPages = (data.connectors as SlugItem[]).map((item) => ({
      url: contentUrl(siteUrl, "connecteurs", item.language, item.slug.current),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const caseStudyPages = (data.caseStudies as SlugItem[]).map((item) => ({
      url: contentUrl(siteUrl, "cas-clients", item.language, item.slug.current),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [
      ...staticPages,
      ...blogPages,
      ...glossaryPages,
      ...comparisonPages,
      ...connectorPages,
      ...caseStudyPages,
    ];
  } catch {
    return staticPages;
  }
}
