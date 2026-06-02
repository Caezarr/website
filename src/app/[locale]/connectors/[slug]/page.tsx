import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGE_QUERY, CONNECTOR_SLUGS_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { FaqSchema, BreadcrumbSchema, SoftwareAppSchema } from "@/components/json-ld";
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
  return buildMetadata(c.seo ?? null, { path: itemPath('connectors', locale, slug), fallbackTitle: c.toolName });
}

export default async function ConnectorDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } });

  if (!data) notFound();

  const c = data as ConnectorPage;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('connectors', locale, slug)}`;
  const hubUrl = `${siteUrl}${hubPath('connectors', locale)}`;

  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <BreadcrumbSchema items={[
        { name: "Home", url: siteUrl },
        { name: locale === "fr" ? "Connecteurs" : locale === "nl" ? "Connectoren" : "Connectors", url: hubUrl },
        { name: c.toolName, url: pageUrl },
      ]} />
      <SoftwareAppSchema
        name={`Wonka AI + ${c.toolName}`}
        description={c.description}
        url={pageUrl}
        features={c.useCases?.map((u) => u.title) ?? []}
      />
      {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

      {/* Header */}
      <div className="mb-16">
        <span className="type-eyebrow text-text/40 mb-4 block">
          {locale === "fr" ? "Connecteur" : locale === "nl" ? "Connector" : "Connector"}
        </span>
        <h1 className="type-h2 mb-4">{c.tagline}</h1>
        <p className="type-body text-text/60 max-w-2xl">{c.description}</p>
      </div>

      {/* Use cases */}
      {c.useCases?.length ? (
        <section className="mb-16">
          <h2 className="type-h5 mb-8">
            {locale === "fr" ? "Cas d'usage" : locale === "nl" ? "Gebruiksscenario's" : "Use cases"}
          </h2>
          <div className="flex flex-col gap-8">
            {c.useCases.map((u, i) => (
              <div key={i} className="border border-border rounded-lg p-6">
                <h3 className="type-paragraph-m-bold mb-2">{u.title}</h3>
                <p className="type-paragraph-m text-text/60 mb-4">{u.description}</p>
                {u.prompt && (
                  <div className="bg-light-gray rounded p-4">
                    <p className="type-paragraph-s text-text/40 mb-1">
                      {locale === "fr" ? "Exemple de prompt" : locale === "nl" ? "Voorbeeldprompt" : "Example prompt"}
                    </p>
                    <p className="type-paragraph-m italic">"{u.prompt}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {c.faq?.length ? (
        <section className="border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
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
    </main>
  );
}
