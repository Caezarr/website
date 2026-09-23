import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { sanityFetch } from "@sanity/lib/live";
import { HOMEPAGE_CONTENT_QUERY } from "@sanity/lib/queries";
import type { HomepageContent } from "@/lib/types";
import { LegacyHomepage } from "@/components/pages/legacy-homepage";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-static";

const pagePath = "/legacy-homepage";

async function getHomepageContent() {
  const { data } = await sanityFetch({ query: HOMEPAGE_CONTENT_QUERY });
  return data as HomepageContent | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([
    getHomepageContent(),
    getLocale(),
  ]);

  return {
    ...buildMetadata(content?.seo ?? null, {
      path: pagePath,
      locale,
    }),
    robots: { index: false, follow: false },
  };
}

export default function LegacyHomepagePage() {
  return <LegacyHomepage />;
}
