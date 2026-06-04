import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERM_QUERY, GLOSSARY_SLUGS_QUERY, RELATED_BLOG_POSTS_QUERY, MEETING_URL_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { PortableText } from "@portabletext/react";
import { DefinedTermSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import type { Locale } from "@/i18n/config";
import type { GlossaryTerm, BlogPost } from "@/lib/types";

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
  return buildMetadata(t.seo ?? null, { path: itemPath('glossary', locale, slug), fallbackTitle: t.term, locale, hreflang: { section: 'glossary', slug } });
}

const relatedLabels = {
  en: "Related articles",
  fr: "Articles liés",
  nl: "Gerelateerde artikelen",
};

const parentLabels = {
  en: "Glossary",
  fr: "Glossaire",
  nl: "Woordenlijst",
};

export default async function GlossaryTermPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });
  if (!data) notFound();

  const t = data as GlossaryTerm;
  const [{ data: relatedPosts }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: t.tags ?? [] } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('glossary', locale, slug)}`;
  const parentUrl = `${siteUrl}${hubPath('glossary', locale)}`;

  return (
    <>
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <DefinedTermSchema term={t.term} definition={t.shortDefinition} url={pageUrl} />
        <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: parentLabels[locale], url: parentUrl }, { name: t.term, url: pageUrl }]} />
        {t.faq?.length ? <FaqSchema items={t.faq} /> : null}

        <h1 className="type-h2 mb-4">{t.term}</h1>
        <p className="type-body text-text/60 mb-12">{t.shortDefinition}</p>

        <div className="prose prose-lg max-w-none">
          {t.body && <PortableText value={t.body as never} />}
        </div>

        {t.faq?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h5 mb-8">{locale === "fr" ? "Questions fréquentes" : locale === "nl" ? "Veelgestelde vragen" : "Frequently asked questions"}</h2>
            {t.faq.map((item, i) => (
              <div key={i} className="mb-6">
                <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                <p className="type-paragraph-m text-text/60">{item.answer}</p>
              </div>
            ))}
          </section>
        ) : null}

        {(relatedPosts as BlogPost[])?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h6 mb-6 text-text/50">{relatedLabels[locale]}</h2>
            <div className="flex flex-col gap-4">
              {(relatedPosts as BlogPost[]).map((post) => (
                <a key={post._id} href={itemPath('blog', locale, post.slug.current)} className="group flex flex-col gap-1 rounded-lg border border-border p-4 hover:border-accent transition-colors">
                  <span className="type-eyebrow text-text/30">{post.category}</span>
                  <span className="type-paragraph-m-bold group-hover:text-accent transition-colors">{post.title}</span>
                  <span className="type-paragraph-s text-text/50">{post.excerpt}</span>
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
