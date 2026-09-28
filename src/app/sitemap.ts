import { comparisonPath, FRENCH_COMPARISONS } from "@/lib/french-comparisons";
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { client } from "@sanity/lib/client";
import { ALL_CONTENT_SLUGS_QUERY } from "@sanity/lib/queries";
import { hubPath, itemPath } from "@/lib/locale-path";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { buildExistingItemLanguages, buildHubLanguages } from "@/lib/hreflang";
import {
  commercialLanguages,
  commercialPath,
  LANDING_PATHS,
  landingLanguages,
  landingPath,
  type CommercialPage,
  type LandingPage,
} from "@/i18n/routes";

// /wonka-chat redirects to /workspace (a duplicate of the homepage): not listed.
const COMMERCIAL_PRIORITY: Record<
  Exclude<CommercialPage, "wonkaChat">,
  number
> = {
  home: 1.0,
  startAi: 0.9,
  wonkaBuild: 0.9,
  aiAgents: 0.85,
  wonkaChatOdoo: 0.85,
  aiChat: 0.85,
  security: 0.85,
  pricing: 0.85,
  contact: 0.85,
};

type SlugItem = {
  slug: { current: string };
  language: string;
  _updatedAt?: string;
};

const sections = [
  "blog",
  "connectors",
  "glossary",
  "comparisons",
  "case-studies",
] as const;

function latestModified(items: SlugItem[]): Date | undefined {
  const latest = items
    .map((item) => (item._updatedAt ? new Date(item._updatedAt).getTime() : 0))
    .filter(Boolean)
    .sort((a, b) => b - a)[0];

  return latest ? new Date(latest) : undefined;
}

function uniqueByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // Commercial pages: one entry per locale, each listing its EN/FR/NL siblings
  const commercialPages: MetadataRoute.Sitemap = (
    Object.keys(COMMERCIAL_PRIORITY) as Array<keyof typeof COMMERCIAL_PRIORITY>
  ).flatMap((page) =>
    locales.map((locale) => {
      const path = commercialPath(page, locale as Locale);
      return {
        url: path === "/" ? siteUrl : `${siteUrl}${path}`,
        changeFrequency:
          page === "home" ? ("weekly" as const) : ("monthly" as const),
        priority: COMMERCIAL_PRIORITY[page],
        alternates: { languages: commercialLanguages(siteUrl, page) },
      };
    }),
  );

  // SEO landing pages: localized slugs, hreflang limited to existing locales
  const landingPages: MetadataRoute.Sitemap = (
    Object.keys(LANDING_PATHS) as LandingPage[]
  ).flatMap((page) =>
    locales.flatMap((locale) => {
      const path = landingPath(page, locale as Locale);
      if (!path) return [];
      return [
        {
          url: `${siteUrl}${path}`,
          changeFrequency: "monthly" as const,
          priority: 0.85,
          alternates: { languages: landingLanguages(siteUrl, page) },
        },
      ];
    }),
  );

  const staticPages: MetadataRoute.Sitemap = [
    ...commercialPages,
    ...landingPages,
    ...FRENCH_COMPARISONS.map((item) => ({
      url: `${siteUrl}${comparisonPath(item)}`,
      lastModified: new Date(item.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/ai-agent-blueprint`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services/start-ai-subsidized-flanders`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${siteUrl}/france`, changeFrequency: "monthly", priority: 0.85 },

    { url: `${siteUrl}/vs/dust`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${siteUrl}/vs/langdock`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/fr/agent-ia-entreprise`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Hub pages with hreflang
    ...sections.flatMap((section) =>
      locales.map((locale) => ({
        url: `${siteUrl}${hubPath(section, locale as Locale)}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: buildHubLanguages(siteUrl, section, locales) },
      })),
    ),
  ];

  try {
    const data = await client.fetch(ALL_CONTENT_SLUGS_QUERY);
    if (!data) throw new Error("Sanity returned no sitemap data");

    // Group items by slug so we can build hreflang across all 3 language versions
    const groupBySlug = (items: SlugItem[]) =>
      items.reduce<Record<string, SlugItem[]>>((acc, item) => {
        if (!item.slug?.current || !locales.includes(item.language as Locale))
          return acc;
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
          lastModified: item._updatedAt
            ? new Date(item._updatedAt)
            : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: buildExistingItemLanguages(siteUrl, "blog", items),
          },
        })),
      ),
      // Glossary
      ...Object.entries(glossaryBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("glossary", item.language as Locale, slug)}`,
          lastModified: item._updatedAt
            ? new Date(item._updatedAt)
            : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: {
            languages: buildExistingItemLanguages(siteUrl, "glossary", items),
          },
        })),
      ),
      // Comparisons
      ...Object.entries(comparisonsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("comparisons", item.language as Locale, slug)}`,
          lastModified: item._updatedAt
            ? new Date(item._updatedAt)
            : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: buildExistingItemLanguages(
              siteUrl,
              "comparisons",
              items,
            ),
          },
        })),
      ),
      // Connectors
      ...Object.entries(connectorsBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("connectors", item.language as Locale, slug)}`,
          lastModified: item._updatedAt
            ? new Date(item._updatedAt)
            : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: {
            languages: buildExistingItemLanguages(siteUrl, "connectors", items),
          },
        })),
      ),
      // Case studies
      ...Object.entries(caseStudiesBySlug).flatMap(([slug, items]) =>
        items.map((item) => ({
          url: `${siteUrl}${itemPath("case-studies", item.language as Locale, slug)}`,
          lastModified: item._updatedAt
            ? new Date(item._updatedAt)
            : latestModified(items),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: buildExistingItemLanguages(
              siteUrl,
              "case-studies",
              items,
            ),
          },
        })),
      ),
    ];

    // Curated routes override CMS entries and their alternate-language declarations.
    const curatedPaths = new Set(
      FRENCH_COMPARISONS.map((item) => `${siteUrl}${comparisonPath(item)}`),
    );
    const validContentPages = contentPages
      .filter((entry) => !curatedPaths.has(entry.url))
      .map((entry) => ({
        ...entry,
        alternates: entry.alternates
          ? {
              languages: Object.fromEntries(
                Object.entries(entry.alternates.languages ?? {}).filter(
                  ([, url]) => !curatedPaths.has(String(url)),
                ),
              ),
            }
          : undefined,
      }));
    return uniqueByUrl([...staticPages, ...validContentPages]);
  } catch (error) {
    // Fail the build/revalidation instead of replacing a healthy sitemap with a partial one.
    console.error("Unable to generate the complete sitemap from Sanity");
    throw error;
  }
}
