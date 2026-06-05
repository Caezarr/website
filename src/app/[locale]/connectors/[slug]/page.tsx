import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGE_QUERY, CONNECTOR_SLUGS_QUERY, MEETING_URL_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { FaqSchema, BreadcrumbSchema, SoftwareAppSchema } from "@/components/json-ld";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(CONNECTOR_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as ConnectorPage;
  return buildMetadata(c.seo ?? null, { path: itemPath('connectors', locale, slug), fallbackTitle: c.toolName, locale, hreflang: { section: 'connectors', slug } });
}

export default async function ConnectorDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const [{ data }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);

  if (!data) notFound();

  const c = data as ConnectorPage;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('connectors', locale, slug)}`;
  const hubUrl = `${siteUrl}${hubPath('connectors', locale)}`;

  const connectorLabel = { en: "Connector", fr: "Connecteur", nl: "Connector" }[locale];
  const useCasesLabel = { en: "Use cases", fr: "Cas d'usage", nl: "Gebruiksscenario's" }[locale];
  const examplePromptLabel = { en: "Example prompt", fr: "Exemple de prompt", nl: "Voorbeeldprompt" }[locale];
  const faqLabel = { en: "Frequently asked questions", fr: "Questions fréquentes", nl: "Veelgestelde vragen" }[locale];
  const hubLabel = { en: "Connectors", fr: "Connecteurs", nl: "Connectoren" }[locale];

  return (
    <>
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <BreadcrumbSchema items={[
          { name: "Home", url: siteUrl },
          { name: hubLabel, url: hubUrl },
          { name: c.toolName, url: pageUrl },
        ]} />
        <SoftwareAppSchema
          name={`Wonka AI + ${c.toolName}`}
          description={c.description}
          url={pageUrl}
          features={c.useCases?.map((u) => u.title) ?? []}
        />
        {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

        <div className="mb-16">
          <span className="type-eyebrow text-text/40 mb-4 block">{connectorLabel}</span>
          <h1 className="type-h2 mb-4">{c.tagline}</h1>
          <p className="type-body text-text/60 max-w-2xl">{c.description}</p>
        </div>

        {c.useCases?.length ? (
          <section className="mb-16">
            <h2 className="type-h5 mb-8">{useCasesLabel}</h2>
            <div className="flex flex-col gap-8">
              {c.useCases.map((u, i) => (
                <div key={i} className="border border-border rounded-lg p-6">
                  <h3 className="type-paragraph-m-bold mb-2">{u.title}</h3>
                  <p className="type-paragraph-m text-text/60 mb-4">{u.description}</p>
                  {u.prompt && (
                    <div className="bg-text/[0.03] rounded-lg p-4">
                      <p className="type-paragraph-s text-text/40 mb-1">{examplePromptLabel}</p>
                      <p className="type-paragraph-m italic">&ldquo;{u.prompt}&rdquo;</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {c.faq?.length ? (
          <section className="border-t border-border pt-12 mb-0">
            <h2 className="type-h5 mb-8">{faqLabel}</h2>
            <div className="flex flex-col gap-6">
              {c.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                  <p className="type-paragraph-m text-text/60">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <WonkaSolves locale={locale} meetingUrl={meetingUrl as string | null} />
      </main>
      <Cta meetingUrl={meetingUrl as string | null} />
    </>
  );
}
