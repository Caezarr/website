import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDY_QUERY, CASE_STUDY_SLUGS_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import type { Locale } from "@/i18n/config";
import type { CaseStudy } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(CASE_STUDY_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as CaseStudy;
  return buildMetadata(c.seo ?? null, { path: locale === "en" ? `/cas-clients/${slug}` : `/${locale}/cas-clients/${slug}`, fallbackTitle: c.headline });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  if (!data) notFound();

  const c = data as CaseStudy;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${locale === "en" ? `/cas-clients/${slug}` : `/${locale}/cas-clients/${slug}`}`;

  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <ArticleSchema title={c.headline} description={c.excerpt} publishedAt={c.publishedAt ?? new Date().toISOString()} url={pageUrl} />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Case Studies", url: `${siteUrl}${locale === "en" ? "/cas-clients" : `/${locale}/cas-clients`}` }, { name: c.clientName, url: pageUrl }]} />
      {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

      <span className="type-eyebrow text-text/40 block mb-4">{c.sector}</span>
      <h1 className="type-h2 mb-6">{c.headline}</h1>

      {c.results?.length ? (
        <div className="grid grid-cols-2 gap-4 mb-12">
          {c.results.map((r, i) => <div key={i} className="p-4 bg-light-gray rounded-lg"><p className="type-paragraph-m-bold">{r}</p></div>)}
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none">{c.body && <PortableText value={c.body as never} />}</div>

      {c.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          {c.faq.map((item, i) => <div key={i} className="mb-6"><h3 className="type-paragraph-m-bold mb-2">{item.question}</h3><p className="type-paragraph-m text-text/60">{item.answer}</p></div>)}
        </section>
      ) : null}
    </main>
  );
}
