import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGE_QUERY, COMPARISON_SLUGS_QUERY } from "@sanity/lib/queries";
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
  const { data } = await sanityFetch({ query: COMPARISON_SLUGS_QUERY });
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: page } = await sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } });
  if (!page) return {};
  const path = locale === "en" ? `/comparaisons/${slug}` : `/${locale}/comparaisons/${slug}`;
  return buildMetadata(page.seo ?? null, { path, fallbackTitle: page.title });
}

export default async function ComparaisonPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: page } = await sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } });

  if (!page) notFound();

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${locale === "en" ? `/comparaisons/${slug}` : `/${locale}/comparaisons/${slug}`}`;
  const comparaisonsUrl = `${siteUrl}${locale === "en" ? "/comparaisons" : `/${locale}/comparaisons`}`;
  const comparaisonsLabel = locale === "fr" ? "Comparaisons" : locale === "nl" ? "Vergelijkingen" : "Comparisons";

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <ArticleSchema
        title={page.title}
        description={page.excerpt}
        publishedAt={new Date().toISOString()}
        url={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: comparaisonsLabel, url: comparaisonsUrl },
          { name: page.title, url: pageUrl },
        ]}
      />
      {page.faq?.length ? <FaqSchema items={page.faq} /> : null}

      <div className="mb-8">
        <span className="type-eyebrow text-text/50">{page.competitor}</span>
        <h1 className="type-h2 mt-2 mb-4">{page.title}</h1>
        <p className="type-paragraph-l text-text/70">{page.excerpt}</p>
      </div>

      <div className="prose prose-lg max-w-none">
        {page.body && <PortableText value={page.body as never} />}
      </div>

      {page.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          <div className="flex flex-col gap-6">
            {page.faq.map((item, i) => (
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
