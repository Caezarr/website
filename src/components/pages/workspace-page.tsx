import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY, WONKA_CHAT_CONTENT_QUERY } from "@sanity/lib/queries";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ContactBlock } from "@/components/sections/contact-block";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { WorkspaceTrialCta } from "@/components/sections/workspace-trial-cta";
import { WorkspaceProductCarousel } from "@/components/sections/workspace-product-carousel";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { getWorkspaceCapabilityClusters } from "@/lib/page-defaults/workspace-capabilities";
import { getWorkspaceLogoStrip } from "@/lib/page-defaults/workspace-logo-strip";
import { getWorkspaceProducts } from "@/lib/page-defaults/workspace-products";
import { getPageDefaults } from "@/lib/page-defaults/localized";
import { resolveWonkaChatContent } from "@/lib/page-defaults/resolve-pages";
import { resolveSectionHeader } from "@/lib/resolve-cms";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SiteSettings, WonkaChatContent } from "@/lib/types";
import { WORKSPACE_COPY } from "@/views/copy/workspace";

const TRIAL_URL = "https://wonka.chat/register";

async function getPageContent(locale: Locale) {
  const content = await fetchPageDoc<WonkaChatContent>(
    WONKA_CHAT_CONTENT_QUERY,
    "wonkaChatContent",
    locale,
  );

  return {
    content: resolveWonkaChatContent(content, null, locale),
  };
}

/** Home metadata: `/`, `/fr`, `/nl` canonicals with the full hreflang cluster. */
export async function workspaceMetadata(locale: Locale): Promise<Metadata> {
  const { content } = await getPageContent(locale);
  return buildCommercialMetadata(
    content.seo,
    "home",
    locale,
    getPageDefaults(locale).wonkaChat.seo.metaTitle ??
      "Discover Wonka Workspace | Wonka",
  );
}

export async function WorkspacePage({ locale = "en" }: { locale?: Locale }) {
  const copy = WORKSPACE_COPY[locale];
  const [{ content }, { data: settings }] = await Promise.all([
    getPageContent(locale),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);

  return (
    <main className="bg-background text-text">
      <ProductHero
        data={{
          ...content.hero,
          eyebrow: copy.hero.eyebrow,
          title: copy.hero.title,
          subtitle: copy.hero.subtitle,
          theme: "light",
          heroImage: null,
          fallbackHero: {
            src: "/images/workspace/wonka-workspace-header.png",
            alt: copy.hero.imageAlt,
            width: 1024,
            height: 576,
          },
          secondaryLink: {
            label: copy.hero.talkToSales,
            href: meetingUrl,
          },
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel={getT(locale)("common.startFreeTrial")}
        secondaryMeetingTrackType="wonka-chat"
        locale={locale}
      />
      <LogoStrip data={getWorkspaceLogoStrip(locale)} logoSize="lg" marquee />
      <WorkspaceProductCarousel data={getWorkspaceProducts(locale)} />
      <CapabilityGrid
        id="capabilities"
        data={getWorkspaceCapabilityClusters(locale)}
      />
      <WorkspaceTrialCta href={TRIAL_URL} locale={locale} />
      <FaqSection data={content.faq} bordered={false} />
      <ContactBlock
        id="contact"
        data={{
          ...content.contact,
          header: resolveSectionHeader(content.contact.header, {
            eyebrow: null,
            heading: copy.contactHeading,
            body: null,
          }),
        }}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        className="py-18 text-center md:py-24"
        locale={locale}
      />
    </main>
  );
}
