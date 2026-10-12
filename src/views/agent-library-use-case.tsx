import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { AgentCard, ToolLogo } from "@/components/agent-library/agent-card";
import {
  LibraryBlueprintLink,
  LibraryUseCaseViewTracker,
} from "@/components/agent-library/agent-library-client";
import { LibrarySelectionToggle } from "@/components/agent-library/agent-library-selection";
import { LibraryTray } from "@/components/agent-library/agent-library-tray";
import { BreadcrumbSchema } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { commercialPath, localizeHref } from "@/i18n/routes";
import {
  libraryAgentLanguages,
  libraryAgentPath,
  libraryIndexPath,
  relatedEntries,
  type LibraryUseCase,
} from "@/lib/agent-library";
import {
  toCardData,
  toCardTools,
  toUseCaseCardData,
} from "@/lib/agent-library/cards";
import { AGENT_LIBRARY_COPY } from "@/lib/agent-library/copy";
import { meetingTrackProps } from "@/lib/meeting-track";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";
import { DetailBlock, truncate } from "@/views/agent-library-agent";

export function libraryUseCaseMetadata(
  useCase: LibraryUseCase,
  locale: Locale,
): Metadata {
  const copy = useCase.copy[locale];
  const labels = AGENT_LIBRARY_COPY[locale];
  const colon = locale === "fr" ? " :" : ":";
  const title = `${copy.name}${colon} ${labels.useCase.metaSuffix} | Wonka AI`;
  return buildMetadata(
    {
      metaTitle: title,
      metaDescription: truncate(copy.description, 160),
      ogImage: null,
    },
    {
      path: libraryAgentPath(useCase.slug, locale),
      locale,
      fallbackTitle: title,
      languages: libraryAgentLanguages(getSiteUrl(), useCase.slug),
    },
  );
}

export async function LibraryUseCaseView({
  useCase,
  locale,
}: {
  useCase: LibraryUseCase;
  locale: Locale;
}) {
  const copy = useCase.copy[locale];
  const labels = AGENT_LIBRARY_COPY[locale];
  const siteUrl = getSiteUrl();
  const homePath = commercialPath("home", locale);
  const indexPath = libraryIndexPath(locale);
  const pagePath = libraryAgentPath(useCase.slug, locale);
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "default", locale);
  const meetingTrack = meetingTrackProps("general");
  const blueprintHref = localizeHref("/ai-agent-blueprint", locale);
  const tools = toCardTools(useCase.tools);
  const related = relatedEntries(useCase).map((item) => {
    const href = libraryAgentPath(item.entry.slug, locale);
    return item.kind === "agent"
      ? toCardData(item.entry, locale, href)
      : toUseCaseCardData(item.entry, locale, href);
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: labels.breadcrumbHome,
            url: homePath === "/" ? siteUrl : `${siteUrl}${homePath}`,
          },
          { name: labels.breadcrumb, url: `${siteUrl}${indexPath}` },
          { name: copy.name, url: `${siteUrl}${pagePath}` },
        ]}
      />
      <LibraryUseCaseViewTracker
        slug={useCase.slug}
        agentFunction={useCase.function}
        locale={locale}
      />

      <main className="bg-background text-text">
        <section
          className="border-border border-b border-dashed bg-black text-white"
          data-theme="dark"
        >
          <div className="mx-auto max-w-[75rem] px-6 pt-32 pb-14 md:pt-40 md:pb-16">
            <Link
              href={indexPath}
              className="type-paragraph-m text-white/60 underline-offset-4 hover:text-white hover:underline"
            >
              ← {labels.detail.backToLibrary}
            </Link>
            <p className="type-eyebrow mt-8 text-white/50">
              {labels.functions[useCase.function]} · {labels.card.useCase}
            </p>
            <h1 className="type-h2 mt-5 max-w-4xl text-white">{copy.name}</h1>
            <p className="type-body mt-6 max-w-2xl text-white/75">
              {copy.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <LibraryBlueprintLink
                href={blueprintHref}
                slug={useCase.slug}
                locale={locale}
                placement="use_case_hero"
                variant="primary"
              >
                {labels.useCase.blueprintCta}
              </LibraryBlueprintLink>
              <ButtonLink
                href={meetingUrl}
                variant="primaryOutline"
                {...meetingTrack}
              >
                {labels.useCase.bookCta}
              </ButtonLink>
              <LibrarySelectionToggle
                slug={useCase.slug}
                kind="use-case"
                name={copy.name}
                labels={labels.card}
                locale={locale}
                placement="use_case_hero"
                tone="dark"
                className="h-11 px-4"
              />
            </div>
            <p className="type-paragraph-s mt-4 max-w-xl text-white/50">
              {labels.useCase.blueprintNote}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[75rem] gap-8 px-6 py-14 md:grid-cols-3 md:gap-12 md:py-20">
          <DetailBlock title={labels.useCase.function}>
            <p className="type-paragraph-m text-text/75">
              {labels.functions[useCase.function]}
            </p>
          </DetailBlock>
          <DetailBlock title={labels.useCase.sectors}>
            <ul className="flex flex-wrap gap-2">
              {useCase.sectors.map((sector) => (
                <li
                  key={sector}
                  className="type-paragraph-s border-border/20 text-text/70 rounded-full border px-3 py-1"
                >
                  {labels.sectors[sector]}
                </li>
              ))}
            </ul>
          </DetailBlock>
          <DetailBlock title={labels.useCase.tools}>
            {tools.length ? (
              <ul className="flex flex-col gap-2">
                {tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="type-paragraph-m text-text/80 flex items-center gap-3"
                  >
                    <ToolLogo tool={tool} decorative />
                    {tool.label}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="type-paragraph-m text-text/75">
                {labels.useCase.noTools}
              </p>
            )}
          </DetailBlock>
        </section>

        {related.length ? (
          <section className="border-border bg-light-gray border-t border-dashed">
            <div className="mx-auto max-w-[75rem] px-6 py-14 md:py-20">
              <h2 className="type-h5">{labels.useCase.related}</h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((other) => (
                  <li key={other.slug}>
                    <AgentCard agent={other} labels={labels.card} locale={locale} placement="related_card" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section
          className="border-border border-t border-dashed bg-black text-white"
          data-theme="dark"
        >
          <div className="mx-auto grid max-w-[75rem] gap-8 px-6 py-16 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20">
            <div>
              <p className="type-eyebrow text-white/50">
                {labels.blueprintBand.eyebrow}
              </p>
              <h2 className="type-h4 mt-5 text-white">
                {labels.blueprintBand.title}
              </h2>
              <p className="type-body mt-5 max-w-xl text-white/70">
                {labels.blueprintBand.body}
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <LibraryBlueprintLink
                href={blueprintHref}
                slug={useCase.slug}
                locale={locale}
                placement="use_case_band"
                variant="primary"
              >
                {labels.blueprintBand.cta}
              </LibraryBlueprintLink>
              <ButtonLink
                href={meetingUrl}
                variant="primaryOutline"
                {...meetingTrack}
              >
                {labels.booking.cta}
              </ButtonLink>
            </div>
          </div>
        </section>
        <LibraryTray locale={locale} meetingUrl={meetingUrl} />
      </main>
    </>
  );
}
