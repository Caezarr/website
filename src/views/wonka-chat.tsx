import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  HOMEPAGE_CONTENT_QUERY,
  SITE_SETTINGS_QUERY,
  WONKA_CHAT_CONTENT_QUERY,
} from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema, SoftwareAppSchema } from "@/components/json-ld";
import { CenteredBanner } from "@/components/sections/centered-banner";
import { ContactBlock } from "@/components/sections/contact-block";
import { Cta } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { SplitContent } from "@/components/sections/split-content";
import { StickyFeatures } from "@/components/sections/sticky-features";
import { Testimonials } from "@/components/sections/testimonials";
import { UseCases } from "@/components/sections/use-cases";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { getT } from "@/i18n/ui";
import { fetchPageDoc, resolveMeetingLabel } from "@/lib/localized-content";
import { getPageDefaults } from "@/lib/page-defaults/localized";
import {
  resolveWonkaChatContent,
  type WonkaChatResolvedContent,
} from "@/lib/page-defaults/resolve-pages";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { HomepageContent, SiteSettings, WonkaChatContent } from "@/lib/types";
import { WONKA_CHAT_COPY, type WonkaChatCopy } from "@/views/copy/wonka-chat";

const TRIAL_URL = "https://wonka.chat/register";

async function getPageBundle(locale: Locale) {
  const [{ data: settings }, homepage, content] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    fetchPageDoc<HomepageContent>(HOMEPAGE_CONTENT_QUERY, "homepageContent", locale),
    fetchPageDoc<WonkaChatContent>(WONKA_CHAT_CONTENT_QUERY, "wonkaChatContent", locale),
  ]);

  return {
    settings: settings as SiteSettings | null,
    content: resolveWonkaChatContent(content, homepage?.useCases ?? null, locale),
    rawContent: content,
  };
}

export async function wonkaChatMetadata(locale: Locale): Promise<Metadata> {
  const { content } = await getPageBundle(locale);
  return buildCommercialMetadata(
    content.seo,
    "wonkaChat",
    locale,
    getPageDefaults(locale).wonkaChat.seo.metaTitle ?? undefined,
  );
}

export async function WonkaChatView({ locale }: { locale: Locale }) {
  const copy = WONKA_CHAT_COPY[locale];
  const siteUrl = getSiteUrl();
  const homePath = commercialPath("home", locale);
  const homeUrl = homePath === "/" ? siteUrl : `${siteUrl}${homePath}`;
  const pageUrl = `${siteUrl}${commercialPath("wonkaChat", locale)}`;
  const { settings, content, rawContent } = await getPageBundle(locale);
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale);
  const faqItems =
    content.faq.items?.map((item) => ({
      question: item.question,
      answer: item.answer,
    })) ?? [];
  const schemaDescription =
    content.seo.metaDescription ??
    getPageDefaults(locale).wonkaChat.seo.metaDescription ??
    "";

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: copy.schema.breadcrumbHome, url: homeUrl },
          { name: copy.schema.breadcrumbPage, url: pageUrl },
        ]}
      />
      <SoftwareAppSchema
        name="WonkaChat"
        description={schemaDescription}
        url={pageUrl}
        features={content.features.features.map((f) => f.title)}
      />
      {faqItems.length > 0 ? <FaqSchema items={faqItems} /> : null}

      <main className="bg-background text-text">
        <WonkaChatSections
          locale={locale}
          copy={copy}
          content={content}
          rawSecurity={rawContent?.security ?? null}
          meetingUrl={meetingUrl}
          meetingLabel={meetingLabel}
        />
      </main>

      <Cta
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        locale={locale}
      />
    </>
  );
}

function WonkaChatSections({
  locale,
  copy,
  content,
  rawSecurity,
  meetingUrl,
  meetingLabel,
}: {
  locale: Locale;
  copy: WonkaChatCopy;
  content: WonkaChatResolvedContent;
  rawSecurity: WonkaChatContent["security"];
  meetingUrl: string;
  meetingLabel: string | null;
}) {
  const trialLabel = getT(locale)("common.startFreeTrial");

  return (
    <>
      <ProductHero
        data={{
          ...content.hero,
          eyebrow: copy.hero.eyebrow,
          title: copy.hero.title,
          subtitle: copy.hero.subtitle,
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel={trialLabel}
        meetingTrackType="wonka-chat"
        locale={locale}
      />
      <LogoStrip data={content.logoStrip} />
      <SplitContent
        data={{
          ...content.problem,
          header: {
            ...content.problem.header,
            heading: copy.problem.heading,
            body: copy.problem.body,
          },
        }}
        className="py-18 md:py-24"
      />
      <CenteredBanner
        id="how-it-works"
        header={{
          ...content.overview,
          eyebrow: copy.overview.eyebrow,
          body: copy.overview.body,
        }}
      />
      <StickyFeatures
        data={{
          ...content.features,
          header: {
            ...content.features.header,
            body: copy.features.headerBody,
          },
          features: content.features.features.map((feature) => {
            if (feature._key === "chat") {
              return { ...feature, ...copy.features.chat };
            }
            if (feature._key === "models") {
              return { ...feature, ...copy.features.models };
            }
            return feature;
          }),
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel={trialLabel}
        meetingTrackType="wonka-chat"
        className="py-18 md:py-24"
      />
      <UseCases
        id="use-cases"
        data={content.useCases}
        defaults={getPageDefaults(locale).useCases}
      />
      <Security
        id="security"
        data={rawSecurity}
        defaults={getPageDefaults(locale).wonkaChatSecurity}
        locale={locale}
      />
      <Testimonials
        id="testimonials"
        header={content.testimonials}
        className="py-18 md:py-24"
        locale={locale}
      />
      <ContactBlock
        id="contact"
        data={content.contact}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        className="py-18 text-center md:py-24"
        locale={locale}
      />
      <FaqSection data={content.faq} className="py-18 md:py-24" />
    </>
  );
}
