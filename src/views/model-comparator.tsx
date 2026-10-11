import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { FaqSchema } from "@/components/json-ld";
import { ModelComparator } from "@/components/sections/model-comparator/model-comparator";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import { headingClass } from "@/lib/design-tokens";
import { resolveMeetingLabel } from "@/lib/localized-content";
import { LAST_REVIEWED } from "@/lib/model-comparator/models";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatReviewMonth, MODEL_COMPARATOR_COPY } from "@/views/copy/model-comparator";

export async function modelComparatorMetadata(locale: Locale): Promise<Metadata> {
  const { seo } = MODEL_COMPARATOR_COPY[locale];
  return buildCommercialMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    "modelComparator",
    locale,
    seo.title,
  );
}

export async function ModelComparatorView({ locale }: { locale: Locale }) {
  const copy = MODEL_COMPARATOR_COPY[locale];
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);
  const meetingLabel = resolveMeetingLabel(sharedLinks, locale) ?? copy.cta.meeting;
  const reviewedMonth = formatReviewMonth(LAST_REVIEWED, locale);

  return (
    <div className="bg-background text-text">
      <FaqSchema items={copy.faq.items} />

      <Section className="py-12 pt-24 md:py-16 md:pt-28" containerClassName="max-w-5xl">
        <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
        <h1 className={cn(headingClass.hero, "mt-5 max-w-3xl")}>{copy.hero.title}</h1>
        <p className="mt-6 max-w-2xl type-body text-text/70">{copy.hero.body}</p>
        <p className="mt-4 type-paragraph-s text-text/55">
          <time dateTime={LAST_REVIEWED}>{copy.hero.reviewed.replace("{date}", reviewedMonth)}</time>
          {" · "}
          {copy.hero.assessment}
        </p>
      </Section>

      <ModelComparator
        locale={locale}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        pricingHref={localizeHref("/pricing", locale)}
      />

      <Section
        className="border-t border-dashed border-border py-12 md:py-16"
        containerClassName="max-w-3xl"
      >
        <h2 className={headingClass.section}>{copy.methodology.heading}</h2>
        <ul className="mt-8 flex flex-col gap-3">
          {copy.methodology.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="type-paragraph-m text-text/70">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-dashed border-border bg-mid-gray">
        <Section className="py-18 md:py-24" containerClassName="max-w-2xl">
          <h2 className={cn(headingClass.section, "text-center")}>{copy.faq.heading}</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {copy.faq.items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 type-body text-text [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span aria-hidden className="shrink-0 text-text/50 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 type-paragraph-m text-text/65">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      </section>
    </div>
  );
}
