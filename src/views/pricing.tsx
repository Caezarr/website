import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { PricingPage } from "@/components/sections/pricing-page";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SeoData, SiteSettings } from "@/lib/types";

export async function pricingMetadata(locale: Locale): Promise<Metadata> {
  const t = getT(locale);
  const title = t("pricing.seo.title");
  const seo: SeoData = {
    metaTitle: title,
    metaDescription: t("pricing.seo.description"),
    ogImage: null,
  };
  return buildCommercialMetadata(seo, "pricing", locale, title);
}

export async function PricingView({ locale }: { locale: Locale }) {
  // PricingPage (client) reads its own strings' locale from the URL prefix.
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;
  const bookingHref = resolveMeetingUrl(settings?.sharedLinks, "wonka-chat", locale);

  return (
    <main className="bg-background text-text">
      <PricingPage bookingHref={bookingHref} />
    </main>
  );
}
