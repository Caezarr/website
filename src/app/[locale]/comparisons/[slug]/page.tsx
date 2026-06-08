import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGE_QUERY, COMPARISON_SLUGS_QUERY, MEETING_URL_QUERY, RELATED_BLOG_POSTS_QUERY, RELATED_CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { getEvergreenInternalLinks } from "@/lib/internal-links";
import type { Locale } from "@/i18n/config";
import type { BlogPost, ComparisonPage, ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(COMPARISON_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as ComparisonPage;
  return buildMetadata(c.seo ?? null, { path: itemPath('comparisons', locale, slug), fallbackTitle: c.title, locale, hreflang: { section: 'comparisons', slug } });
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const [{ data }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);
  if (!data) notFound();

  const c = data as ComparisonPage;
  const [{ data: relatedPosts }, { data: relatedConnectors }] = await Promise.all([
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
    sanityFetch({ query: RELATED_CONNECTOR_PAGES_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('comparisons', locale, slug)}`;
  const parentUrl = `${siteUrl}${hubPath('comparisons', locale)}`;

  const parentLabel = locale === "fr" ? "Comparaisons" : locale === "nl" ? "Vergelijkingen" : "Comparisons";
  const relatedGuidesLabel = locale === "fr" ? "Guides liés" : locale === "nl" ? "Gerelateerde gidsen" : "Related guides";
  const relatedIntegrationsLabel = locale === "fr" ? "Intégrations liées" : locale === "nl" ? "Gerelateerde integraties" : "Related integrations";
  const exploreMoreLabel = locale === "fr" ? "Explorer les sujets IA liés" : locale === "nl" ? "Verken gerelateerde AI-thema's" : "Explore related AI topics";
  const evergreenLinks = getEvergreenInternalLinks(locale, "comparisons", itemPath("comparisons", locale, slug));

  return (
    <>
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <ArticleSchema title={c.title} description={c.excerpt} publishedAt={new Date().toISOString()} url={pageUrl} />
        <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: parentLabel, url: parentUrl }, { name: c.title, url: pageUrl }]} />
        {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

        <h1 className="type-h2 mb-4">{c.title}</h1>
        <p className="type-body text-text/60 mb-12">{c.excerpt}</p>

        <div className="prose prose-lg max-w-none">{c.body && <PortableText value={c.body as never} />}</div>

        <ComparisonTable locale={locale} competitor={c.competitor} />

        {c.faq?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h5 mb-8">{locale === "fr" ? "Questions fréquentes" : locale === "nl" ? "Veelgestelde vragen" : "Frequently asked questions"}</h2>
            {c.faq.map((item, i) => (
              <div key={i} className="mb-6">
                <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                <p className="type-paragraph-m text-text/60">{item.answer}</p>
              </div>
            ))}
          </section>
        ) : null}

        {((relatedPosts as BlogPost[])?.length || (relatedConnectors as ConnectorPage[])?.length) ? (
          <section className="mt-16 border-t border-border pt-12">
            <div className="grid gap-8 md:grid-cols-2">
              {(relatedPosts as BlogPost[])?.length ? (
                <div>
                  <h2 className="type-h6 mb-5 text-text/50">{relatedGuidesLabel}</h2>
                  <div className="grid gap-3">
                    {(relatedPosts as BlogPost[]).map((post) => (
                      <a key={post._id} href={itemPath("blog", locale, post.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                        <span className="type-eyebrow text-text/30">{post.category}</span>
                        <p className="mt-2 type-paragraph-m-bold group-hover:text-accent">{post.title}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              {(relatedConnectors as ConnectorPage[])?.length ? (
                <div>
                  <h2 className="type-h6 mb-5 text-text/50">{relatedIntegrationsLabel}</h2>
                  <div className="grid gap-3">
                    {(relatedConnectors as ConnectorPage[]).map((connector) => (
                      <a key={connector._id} href={itemPath("connectors", locale, connector.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                        <p className="type-paragraph-m-bold group-hover:text-accent">{connector.toolName}</p>
                        <p className="mt-1 line-clamp-2 type-paragraph-s text-text/50">{connector.tagline}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <InternalLinkGrid title={exploreMoreLabel} links={evergreenLinks} className="mt-16" />

        <WonkaSolves locale={locale} meetingUrl={meetingUrl as string | null} />
      </main>
      <Cta meetingUrl={meetingUrl as string | null} />
    </>
  );
}
