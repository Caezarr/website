import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERM_QUERY, GLOSSARY_SLUGS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PortableText } from "@portabletext/react";
import { DefinedTermSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: GLOSSARY_SLUGS_QUERY });
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: term } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });
  if (!term) return {};
  const path = locale === "en" ? `/glossaire/${slug}` : `/${locale}/glossaire/${slug}`;
  return buildMetadata(term.seo ?? null, { path, fallbackTitle: term.term });
}

export default async function GlossaireTermPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: term } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });

  if (!term) notFound();

  const siteUrl = getSiteUrl();
  const termUrl = `${siteUrl}${locale === "en" ? `/glossaire/${slug}` : `/${locale}/glossaire/${slug}`}`;
  const glossaireUrl = `${siteUrl}${locale === "en" ? "/glossaire" : `/${locale}/glossaire`}`;
  const glossaireLabel = locale === "fr" ? "Glossaire" : locale === "nl" ? "Woordenlijst" : "Glossary";

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <DefinedTermSchema
        term={term.term}
        definition={term.shortDefinition}
        url={termUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: glossaireLabel, url: glossaireUrl },
          { name: term.term, url: termUrl },
        ]}
      />
      {term.faq?.length ? <FaqSchema items={term.faq} /> : null}

      <div className="mb-8">
        <h1 className="type-h2 mb-4">{term.term}</h1>
        <p className="type-paragraph-l text-text/70">{term.shortDefinition}</p>
      </div>

      <div className="prose prose-lg max-w-none">
        {term.body && <PortableText value={term.body as never} />}
      </div>

      {term.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          <div className="flex flex-col gap-6">
            {term.faq.map((item, i) => (
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
