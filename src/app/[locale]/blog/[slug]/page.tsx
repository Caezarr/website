import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY, RELATED_GLOSSARY_TERMS_QUERY, MEETING_URL_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import type { Locale } from "@/i18n/config";
import type { BlogPost, GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(BLOG_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, language: locale } });
  if (!post) return {};
  return buildMetadata((post as BlogPost).seo ?? null, { path: itemPath('blog', locale, slug), fallbackTitle: (post as BlogPost).title, locale });
}

const relatedLabels = {
  en: "Related glossary terms",
  fr: "Termes de glossaire liés",
  nl: "Gerelateerde glossariumtermen",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, language: locale } });
  if (!post) notFound();

  const p = post as BlogPost;
  const [{ data: relatedTerms }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: RELATED_GLOSSARY_TERMS_QUERY, params: { slug, language: locale, tags: p.tags ?? [] } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);

  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}${itemPath('blog', locale, slug)}`;
  const hubUrl = `${siteUrl}${hubPath('blog', locale)}`;

  return (
    <>
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <ArticleSchema title={p.title} description={p.excerpt} publishedAt={p.publishedAt} url={postUrl} />
        <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Blog", url: hubUrl }, { name: p.title, url: postUrl }]} />
        {p.faq?.length ? <FaqSchema items={p.faq} /> : null}

        <div className="mb-12">
          <span className="type-eyebrow text-text/40">{p.category}</span>
          <h1 className="type-h2 mt-2 mb-4">{p.title}</h1>
          <time className="type-paragraph-s text-text/30" dateTime={p.publishedAt}>
            {new Date(p.publishedAt).toLocaleDateString(locale)}
          </time>
        </div>

        <div className="prose prose-lg max-w-none">
          {p.body && <PortableText value={p.body as never} />}
        </div>

        {p.faq?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h5 mb-8">{locale === "fr" ? "Questions fréquentes" : locale === "nl" ? "Veelgestelde vragen" : "Frequently asked questions"}</h2>
            <div className="flex flex-col gap-6">
              {p.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                  <p className="type-paragraph-m text-text/60">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {(relatedTerms as GlossaryTerm[])?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h6 mb-6 text-text/50">{relatedLabels[locale]}</h2>
            <div className="flex flex-col gap-4">
              {(relatedTerms as GlossaryTerm[]).map((t) => (
                <a key={t._id} href={itemPath('glossary', locale, t.slug.current)} className="group flex flex-col gap-1 rounded-lg border border-border p-4 hover:border-accent transition-colors">
                  <span className="type-paragraph-m-bold group-hover:text-accent transition-colors">{t.term}</span>
                  <span className="type-paragraph-s text-text/50">{t.shortDefinition}</span>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <WonkaSolves locale={locale} meetingUrl={meetingUrl as string | null} />
      </main>
      <Cta meetingUrl={meetingUrl as string | null} />
    </>
  );
}
