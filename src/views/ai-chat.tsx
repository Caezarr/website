import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY, WONKA_CHAT_CONTENT_QUERY } from "@sanity/lib/queries";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ContactBlock } from "@/components/sections/contact-block";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { WorkspaceTrialCta } from "@/components/sections/workspace-trial-cta";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { getPageDefaults } from "@/lib/page-defaults/localized";
import { resolveWonkaChatContent } from "@/lib/page-defaults/resolve-pages";
import { resolveSectionHeader } from "@/lib/resolve-cms";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SiteSettings, WonkaChatContent } from "@/lib/types";
import { AI_CHAT_COPY } from "@/views/copy/ai-chat";

const TRIAL_URL = "https://wonka.chat/register";

export async function aiChatMetadata(locale: Locale): Promise<Metadata> {
  // Own SEO: the CMS `seo` on the WonkaChat document belongs to /wonka-chat
  const { seo } = AI_CHAT_COPY[locale];
  return buildCommercialMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    "aiChat",
    locale,
  );
}

export async function AiChatView({ locale }: { locale: Locale }) {
  const copy = AI_CHAT_COPY[locale];
  const t = getT(locale);
  const defaults = getPageDefaults(locale);

  const [rawContent, { data: settings }] = await Promise.all([
    fetchPageDoc<WonkaChatContent>(WONKA_CHAT_CONTENT_QUERY, "wonkaChatContent", locale),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const content = resolveWonkaChatContent(rawContent, null, locale);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat");
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);
  const trialLabel = t("common.startFreeTrial");

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
            src: "/images/wonka-chat/wonka-ai-chat-header.png",
            alt: copy.hero.imageAlt,
            width: 3840,
            height: 2160,
          },
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel={trialLabel}
        locale={locale}
      />
      <LogoStrip data={content.logoStrip} />
      <CapabilityGrid id="capabilities" data={defaults.aiChatCapabilities} />
      <FaqSection data={content.faq} bordered={false} />
      <WorkspaceTrialCta
        href={TRIAL_URL}
        ctaLabel={trialLabel}
        {...(copy.trial ?? {})}
        locale={locale}
      />
      <Security
        id="security"
        data={rawContent?.security ?? null}
        defaults={defaults.wonkaChatSecurity}
        locale={locale}
      />
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
