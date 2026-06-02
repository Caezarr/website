import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERM_QUERY, GLOSSARY_SLUGS_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PortableText } from "@portabletext/react";
import { DefinedTermSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import type { Locale } from "@/i18n/config";
import type { GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(GLOSSARY_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const t = data as GlossaryTerm;
  return buildMetadata(t.seo ?? null, { path: locale === "en" ? `/glossaire/${slug}` : `/${locale}/glossaire/${slug}`, fallbackTitle: t.term });
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });
  if (!data) notFound();

  const t = data as GlossaryTerm;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${locale === "en" ? `/glossaire/${slug}` : `/${locale}/glossaire/${slug}`}`;

  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <DefinedTermSchema term={t.term} definition={t.shortDefinition} url={pageUrl} />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Glossaire", url: `${siteUrl}${locale === "en" ? "/glossaire" : `/${locale}/glossaire`}` }, { name: t.term, url: pageUrl }]} />
      {t.faq?.length ? <FaqSchema items={t.faq} /> : null}
      <h1 className="type-h2 mb-4">{t.term}</h1>
      <p className="type-body text-text/60 mb-12">{t.shortDefinition}</p>
      <div className="prose prose-lg max-w-none">
        {t.body && <PortableText value={t.body as never} />}
      </div>
      {t.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          {t.faq.map((item, i) => <div key={i} className="mb-6"><h3 className="type-paragraph-m-bold mb-2">{item.question}</h3><p className="type-paragraph-m text-text/60">{item.answer}</p></div>)}
        </section>
      ) : null}
    </main>
  );
}
