import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY, RELATED_GLOSSARY_TERMS_QUERY, RELATED_BLOG_POSTS_QUERY, MEETING_URL_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { SmartPortableText } from "@/components/portable-text-components";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { BlogPost, GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(BLOG_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, language: locale } });
  if (!post) return {};
  return buildMetadata((post as BlogPost).seo ?? null, {
    path: itemPath("blog", locale, slug),
    fallbackTitle: (post as BlogPost).title,
    locale,
    hreflang: { section: "blog", slug },
  });
}

function estimateReadingTime(body: unknown[]): number {
  const text = JSON.stringify(body);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const categoryLabels: Record<string, Record<string, string>> = {
  "ai-strategy":       { en: "AI Strategy",          fr: "Stratégie IA",         nl: "AI Strategie" },
  "use-cases":         { en: "Use Cases",             fr: "Cas d'usage",          nl: "Toepassingen" },
  "product-updates":   { en: "Product Updates",       fr: "Mises à jour produit", nl: "Product updates" },
  "security-compliance": { en: "Security",            fr: "Sécurité",             nl: "Beveiliging" },
  "tutorials":         { en: "Tutorials",             fr: "Tutoriels",            nl: "Tutorials" },
};

const labels = {
  readingTime:   { en: "min read", fr: "min de lecture", nl: "min leestijd" },
  relatedGlossary: { en: "Related glossary terms", fr: "Termes liés", nl: "Gerelateerde termen" },
  relatedPosts:  { en: "Related articles",         fr: "Articles liés",     nl: "Gerelateerde artikelen" },
  faq:           { en: "Frequently asked questions", fr: "Questions fréquentes", nl: "Veelgestelde vragen" },
  backToBlog:    { en: "Blog", fr: "Blog", nl: "Blog" },
};

function L<T extends Record<string, string>>(map: T, locale: string): string {
  return (map as Record<string, string>)[locale] ?? map["en"];
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, language: locale } });
  if (!post) notFound();

  const p = post as BlogPost;
  const [{ data: relatedTerms }, { data: relatedPosts }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: RELATED_GLOSSARY_TERMS_QUERY, params: { slug, language: locale, tags: p.tags ?? [] } }),
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY,     params: { slug, language: locale, tags: p.tags ?? [] } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);

  const siteUrl  = getSiteUrl();
  const postUrl  = `${siteUrl}${itemPath("blog", locale, slug)}`;
  const hubUrl   = `${siteUrl}${hubPath("blog", locale)}`;
  const readMins = p.body ? estimateReadingTime(p.body as unknown[]) : 1;
  const catLabel = p.category ? (categoryLabels[p.category]?.[locale] ?? p.category) : null;

  const hasRightSidebar = (relatedPosts as BlogPost[])?.length > 0 || (relatedTerms as GlossaryTerm[])?.length > 0;

  return (
    <>
      <ArticleSchema title={p.title} description={p.excerpt} publishedAt={p.publishedAt} url={postUrl} />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: L(labels.backToBlog, locale), url: hubUrl }, { name: p.title, url: postUrl }]} />
      {p.faq?.length ? <FaqSchema items={p.faq} /> : null}

      {/* ── ARTICLE HEADER ── */}
      <header className="border-b border-dashed border-border bg-background">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-32 md:pt-36">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 type-eyebrow text-text/40">
            <a href={hubUrl} className="hover:text-text transition-colors">{L(labels.backToBlog, locale)}</a>
            <span>/</span>
            <span className="text-text/60 truncate max-w-xs">{p.title}</span>
          </nav>

          {/* Category + reading time */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {catLabel && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 type-eyebrow text-blue-800">
                {catLabel}
              </span>
            )}
            <span className="type-paragraph-s text-text/40">
              {readMins} {L(labels.readingTime, locale)}
            </span>
          </div>

          {/* Title */}
          <h1 className="type-h2 max-w-3xl">{p.title}</h1>

          {/* Excerpt + date */}
          {p.excerpt && (
            <p className="mt-4 max-w-2xl type-body text-text/60 leading-relaxed">{p.excerpt}</p>
          )}
          <time className="mt-4 block type-paragraph-s text-text/35" dateTime={p.publishedAt}>
            {new Date(p.publishedAt).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
      </header>

      {/* ── BODY + SIDEBAR ── */}
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className={`flex gap-16 ${hasRightSidebar ? "lg:grid lg:grid-cols-[1fr_300px]" : ""}`}>

          {/* Main article */}
          <article className="min-w-0">
            <div className="prose prose-lg max-w-none">
              {p.body && <SmartPortableText value={p.body as unknown[]} />}
            </div>

            {/* FAQ */}
            {p.faq?.length ? (
              <section className="mt-16 border-t border-dashed border-border pt-12">
                <h2 className="type-h5 mb-8">{L(labels.faq, locale)}</h2>
                <div className="flex flex-col divide-y divide-dashed divide-border">
                  {p.faq.map((item, i) => (
                    <div key={i} className="py-5">
                      <h3 className="type-body font-medium mb-2">{item.question}</h3>
                      <p className="type-paragraph-m text-text/60">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          {/* Sidebar */}
          {hasRightSidebar && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-8">

                {/* Related posts */}
                {(relatedPosts as BlogPost[])?.length > 0 && (
                  <div>
                    <p className="type-eyebrow text-text/40 mb-4">{L(labels.relatedPosts, locale)}</p>
                    <div className="flex flex-col gap-3">
                      {(relatedPosts as BlogPost[]).map((post) => (
                        <a
                          key={post._id}
                          href={itemPath("blog", locale, post.slug.current)}
                          className="group flex flex-col gap-1 rounded-lg border border-border bg-mid-gray p-4 hover:border-accent hover:bg-background transition-all"
                        >
                          {post.category && (
                            <span className="type-eyebrow text-text/35">{categoryLabels[post.category]?.[locale] ?? post.category}</span>
                          )}
                          <span className="type-paragraph-m-bold group-hover:text-accent transition-colors leading-snug">{post.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related glossary */}
                {(relatedTerms as GlossaryTerm[])?.length > 0 && (
                  <div>
                    <p className="type-eyebrow text-text/40 mb-4">{L(labels.relatedGlossary, locale)}</p>
                    <div className="flex flex-col gap-3">
                      {(relatedTerms as GlossaryTerm[]).map((t) => (
                        <a
                          key={t._id}
                          href={itemPath("glossary", locale, t.slug.current)}
                          className="group flex flex-col gap-1 rounded-lg border border-border bg-mid-gray p-4 hover:border-accent hover:bg-background transition-all"
                        >
                          <span className="type-paragraph-m-bold group-hover:text-accent transition-colors">{t.term}</span>
                          <span className="type-paragraph-s text-text/50 line-clamp-2">{t.shortDefinition}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA mini */}
                <div className="rounded-xl border border-border bg-mid-gray p-6">
                  <p className="type-body font-medium mb-1">Ready to start?</p>
                  <p className="type-paragraph-s text-text/55 mb-4">30-minute call, no slides.</p>
                  <ButtonLink href={meetingUrl as string ?? "#"} variant="primary">
                    Book a call
                  </ButtonLink>
                </div>

              </div>
            </aside>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <WonkaSolves locale={locale} meetingUrl={meetingUrl as string | null} />
      </div>
      <Cta meetingUrl={meetingUrl as string | null} />
    </>
  );
}
