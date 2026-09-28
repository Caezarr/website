import { comparisonPath, FRENCH_COMPARISONS } from "@/lib/french-comparisons";
import { sanityFetch } from "@sanity/lib/live";
import { CONTENT_SLUG_LOCALES_QUERY } from "@sanity/lib/queries";
import {
  buildExistingItemLanguages,
  type ContentSection,
  type SlugLocale,
} from "@/lib/hreflang";

const documentTypes: Record<ContentSection, string> = {
  blog: "blogPost",
  connectors: "connectorPage",
  glossary: "glossaryTerm",
  comparisons: "comparisonPage",
  "case-studies": "caseStudy",
};

export async function getContentLanguages(
  siteUrl: string,
  section: ContentSection,
  slug: string,
): Promise<Record<string, string>> {
  const { data } = await sanityFetch({
    query: CONTENT_SLUG_LOCALES_QUERY,
    params: { type: documentTypes[section], slug },
  });

  const languages = buildExistingItemLanguages(
    siteUrl,
    section,
    (data ?? []) as SlugLocale[],
  );
  if (section === "comparisons") {
    const curated = new Set(
      FRENCH_COMPARISONS.map((item) => `${siteUrl}${comparisonPath(item)}`),
    );
    return Object.fromEntries(
      Object.entries(languages).filter(([, url]) => !curated.has(url)),
    );
  }
  return languages;
}
