import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings } from "@/lib/types";
import { HOME_V2_COPY } from "@/views/copy/home-v2";
import { HomeV2Client } from "./home-v2-client";

/** Temporary landing under review: kept out of search until it replaces the homepage. */
export function homeV2Metadata(locale: Locale): Metadata {
  const { seo } = HOME_V2_COPY[locale];
  return {
    title: seo.title,
    description: seo.description,
    robots: { index: false, follow: false },
  };
}

export async function HomeV2Page({ locale = "en" }: { locale?: Locale }) {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;

  return (
    <HomeV2Client
      locale={locale}
      copy={HOME_V2_COPY[locale]}
      links={{
        meetingUrl: resolveMeetingUrl(sharedLinks, "wonka-chat", locale),
        securityUrl: commercialPath("security", locale),
      }}
    />
  );
}
