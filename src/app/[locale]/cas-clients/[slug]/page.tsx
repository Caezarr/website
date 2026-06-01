import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDY_QUERY, CASE_STUDY_SLUGS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: CASE_STUDY_SLUGS_QUERY });
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: study } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  if (!study) return {};
  const path = locale === "en" ? `/cas-clients/${slug}` : `/${locale}/cas-clients/${slug}`;
  return buildMetadata(study.seo ?? null, { path, fallbackTitle: study.headline });
}

export default async function CasClientPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: study } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });

  if (!study) notFound();

  const siteUrl = getSiteUrl();
  const studyUrl = `${siteUrl}${locale === "en" ? `/cas-clients/${slug}` : `/${locale}/cas-clients/${slug}`}`;
  const casClientsUrl = `${siteUrl}${locale === "en" ? "/cas-clients" : `/${locale}/cas-clients`}`;
  const casClientsLabel = locale === "fr" ? "Cas clients" : locale === "nl" ? "Klantcases" : "Case studies";

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <ArticleSchema
        title={study.headline}
        description={study.excerpt}
        publishedAt={study.publishedAt}
        url={studyUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: casClientsLabel, url: casClientsUrl },
          { name: study.headline, url: studyUrl },
        ]}
      />
      {study.faq?.length ? <FaqSchema items={study.faq} /> : null}

      <div className="mb-8">
        <span className="type-eyebrow text-text/50">{study.sector}</span>
        <h1 className="type-h2 mt-2 mb-2">{study.headline}</h1>
        <p className="type-paragraph-m text-text/50 mb-4">{study.clientName}</p>
        <p className="type-paragraph-l text-text/70">{study.excerpt}</p>
      </div>

      {study.results?.length ? (
        <section className="mb-12 p-6 bg-surface rounded-lg border border-border">
          <h2 className="type-h5 mb-6">
            {locale === "fr" ? "Résultats" : locale === "nl" ? "Resultaten" : "Results"}
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {study.results.map((result, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-text/30 mt-1">—</span>
                <span className="type-paragraph-m-bold">{result}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="prose prose-lg max-w-none">
        {study.body && <PortableText value={study.body as never} />}
      </div>

      {study.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          <div className="flex flex-col gap-6">
            {study.faq.map((item, i) => (
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
