import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGE_QUERY, COMPARISON_SLUGS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import type { Locale } from "@/i18n/config";
import type { ComparisonPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: COMPARISON_SLUGS_QUERY });
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as ComparisonPage;
  return buildMetadata(c.seo ?? null, { path: locale === "en" ? `/comparaisons/${slug}` : `/${locale}/comparaisons/${slug}`, fallbackTitle: c.title });
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } });
  if (!data) notFound();

  const c = data as ComparisonPage;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${locale === "en" ? `/comparaisons/${slug}` : `/${locale}/comparaisons/${slug}`}`;

  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <ArticleSchema title={c.title} description={c.excerpt} publishedAt={new Date().toISOString()} url={pageUrl} />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Comparisons", url: `${siteUrl}${locale === "en" ? "/comparaisons" : `/${locale}/comparaisons`}` }, { name: c.title, url: pageUrl }]} />
      {c.faq?.length ? <FaqSchema items={c.faq} /> : null}
      <h1 className="type-h2 mb-4">{c.title}</h1>
      <p className="type-body text-text/60 mb-12">{c.excerpt}</p>
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
