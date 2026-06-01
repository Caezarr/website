import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGE_QUERY, CONNECTOR_SLUGS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PortableText } from "@portabletext/react";
import { SoftwareAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: CONNECTOR_SLUGS_QUERY });
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: connector } = await sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } });
  if (!connector) return {};
  const path = locale === "en" ? `/connecteurs/${slug}` : `/${locale}/connecteurs/${slug}`;
  return buildMetadata(connector.seo ?? null, { path, fallbackTitle: connector.toolName });
}

export default async function ConnecteurPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: connector } = await sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } });

  if (!connector) notFound();

  const siteUrl = getSiteUrl();
  const connectorUrl = `${siteUrl}${locale === "en" ? `/connecteurs/${slug}` : `/${locale}/connecteurs/${slug}`}`;
  const connecteursUrl = `${siteUrl}${locale === "en" ? "/connecteurs" : `/${locale}/connecteurs`}`;
  const connecteursLabel = locale === "fr" ? "Connecteurs" : locale === "nl" ? "Connectoren" : "Connectors";

  const featureList = connector.useCases?.map((uc) => uc.title) ?? [];

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <SoftwareAppSchema
        name={connector.toolName}
        description={connector.description}
        url={connectorUrl}
        features={featureList}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: connecteursLabel, url: connecteursUrl },
          { name: connector.toolName, url: connectorUrl },
        ]}
      />
      {connector.faq?.length ? <FaqSchema items={connector.faq} /> : null}

      <div className="mb-12">
        <h1 className="type-h2 mb-3">{connector.toolName}</h1>
        <p className="type-paragraph-l text-text/70 mb-4">{connector.tagline}</p>
        <p className="type-paragraph-m text-text/60">{connector.description}</p>
      </div>

      {connector.useCases?.length ? (
        <section className="mb-16">
          <h2 className="type-h4 mb-8">
            {locale === "fr" ? "Cas d'usage" : locale === "nl" ? "Gebruiksscenario's" : "Use cases"}
          </h2>
          <div className="flex flex-col gap-8">
            {connector.useCases.map((useCase, i) => (
              <div key={i} className="p-6 border border-border rounded-lg flex flex-col gap-3">
                <h3 className="type-h5">{useCase.title}</h3>
                <p className="type-paragraph-m text-text/70">{useCase.description}</p>
                {useCase.prompt && (
                  <div className="mt-2 bg-surface rounded-md p-4">
                    <p className="type-paragraph-s text-text/50 mb-2 uppercase tracking-wide">
                      {locale === "fr" ? "Prompt exemple" : locale === "nl" ? "Voorbeeldprompt" : "Example prompt"}
                    </p>
                    <p className="type-paragraph-m font-mono text-text/80 whitespace-pre-wrap">{useCase.prompt}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {connector.body && (
        <div className="prose prose-lg max-w-none mb-16">
          <PortableText value={connector.body as never} />
        </div>
      )}

      {connector.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          <div className="flex flex-col gap-6">
            {connector.faq.map((item, i) => (
              <div key={i}>
                <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                <p className="type-paragraph-m text-text/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
