import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { AgentLibraryBrowser } from "@/components/agent-library/agent-library-browser";
import { LibraryBlueprintLink } from "@/components/agent-library/agent-library-client";
import { BreadcrumbSchema, FaqSchema } from "@/components/json-ld";
import { JsonLd } from "@/components/json-ld/json-ld";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { commercialPath, localizeHref } from "@/i18n/routes";
import {
  LIBRARY_AGENTS,
  LIBRARY_USE_CASES,
  libraryAgentPath,
  libraryIndexPath,
  libraryToolsInUse,
  toolLabel,
} from "@/lib/agent-library";
import { toCardData, toUseCaseCardData } from "@/lib/agent-library/cards";
import { AGENT_LIBRARY_COPY } from "@/lib/agent-library/copy";
import { meetingTrackProps } from "@/lib/meeting-track";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import { HREFLANG } from "@/lib/hreflang";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";

export async function agentLibraryMetadata(locale: Locale): Promise<Metadata> {
  const { seo } = AGENT_LIBRARY_COPY[locale];
  return buildCommercialMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    "agentLibrary",
    locale,
    seo.title,
  );
}

export async function AgentLibraryView({ locale }: { locale: Locale }) {
  const copy = AGENT_LIBRARY_COPY[locale];
  const siteUrl = getSiteUrl();
  const homePath = commercialPath("home", locale);
  const pageUrl = `${siteUrl}${libraryIndexPath(locale)}`;
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "default", locale);
  const blueprintHref = localizeHref("/ai-agent-blueprint", locale);

  const cards = [
    ...LIBRARY_AGENTS.map((agent) =>
      toCardData(agent, locale, libraryAgentPath(agent.slug, locale)),
    ),
    ...LIBRARY_USE_CASES.map((useCase) =>
      toUseCaseCardData(useCase, locale, libraryAgentPath(useCase.slug, locale)),
    ),
  ];
  const tools = libraryToolsInUse().map((name) => ({ name, label: toolLabel(name) }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: copy.breadcrumbHome, url: homePath === "/" ? siteUrl : `${siteUrl}${homePath}` },
          { name: copy.breadcrumb, url: pageUrl },
        ]}
      />
      <JsonLd
        id="schema-agent-library"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.breadcrumb,
          description: copy.seo.description,
          url: pageUrl,
          inLanguage: HREFLANG[locale],
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: cards.length,
            itemListElement: cards.map((card, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: card.name,
              url: `${siteUrl}${card.href}`,
            })),
          },
        }}
      />
      <FaqSchema items={copy.faq.items} />

      <main className="bg-background text-text">
        <section className="relative overflow-hidden border-b border-dashed border-border bg-black text-white" data-theme="dark">
          <div className="mx-auto max-w-[75rem] px-6 pb-16 pt-32 md:pb-20 md:pt-40">
            <p className="type-eyebrow text-white/50">{copy.hero.eyebrow}</p>
            <h1 className="type-h2 mt-6 max-w-4xl text-white">{copy.hero.title}</h1>
            <p className="type-body mt-6 max-w-2xl text-white/70">{copy.hero.body}</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ButtonLink href="#agents" variant="primary">
                {copy.hero.primaryCta}
              </ButtonLink>
              <LibraryBlueprintLink
                href={blueprintHref}
                locale={locale}
                placement="library_hero"
                variant="text"
              >
                {copy.hero.secondaryCta}
              </LibraryBlueprintLink>
            </div>
          </div>
        </section>

        <section id="agents" className="mx-auto max-w-[75rem] scroll-mt-24 px-6 py-14 md:py-20">
          <AgentLibraryBrowser agents={cards} tools={tools} copy={copy} locale={locale} />
        </section>

        <section className="border-y border-dashed border-border bg-black text-white" data-theme="dark">
          <div className="mx-auto grid max-w-[75rem] gap-8 px-6 py-16 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20">
            <div>
              <p className="type-eyebrow text-white/50">{copy.blueprintBand.eyebrow}</p>
              <h2 className="type-h4 mt-5 text-white">{copy.blueprintBand.title}</h2>
              <p className="type-body mt-5 max-w-xl text-white/70">{copy.blueprintBand.body}</p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <LibraryBlueprintLink
                href={blueprintHref}
                locale={locale}
                placement="library_band"
                variant="primary"
              >
                {copy.blueprintBand.cta}
              </LibraryBlueprintLink>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[56rem] px-6 py-16 md:py-20">
          <h2 className="type-h4">{copy.faq.heading}</h2>
          <div className="mt-8 divide-y divide-dashed divide-border">
            {copy.faq.items.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="type-body font-medium">{item.question}</h3>
                <p className="type-paragraph-m mt-3 text-text/62">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-dashed border-border bg-light-gray">
          <div className="mx-auto flex max-w-[75rem] flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="type-h5">{copy.booking.title}</h2>
              <p className="type-paragraph-m mt-3 max-w-xl text-text/62">{copy.booking.body}</p>
            </div>
            <ButtonLink href={meetingUrl} variant="primary" {...meetingTrackProps("general")}>
              {copy.booking.cta}
            </ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}
