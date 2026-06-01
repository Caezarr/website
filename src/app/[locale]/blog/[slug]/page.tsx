import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from "@sanity/lib/queries";
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
  const { data } = await sanityFetch({ query: BLOG_SLUGS_QUERY });
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, language: locale } });
  if (!post) return {};
  const path = locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
  return buildMetadata(post.seo ?? null, { path, fallbackTitle: post.title });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, language: locale } });

  if (!post) notFound();

  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}${locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`}`;
  const blogUrl = `${siteUrl}${locale === "en" ? "/blog" : `/${locale}/blog`}`;

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        url={postUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: blogUrl },
          { name: post.title, url: postUrl },
        ]}
      />
      {post.faq?.length ? <FaqSchema items={post.faq} /> : null}

      <div className="mb-8">
        <span className="type-eyebrow text-text/50">{post.category}</span>
        <h1 className="type-h2 mt-2 mb-4">{post.title}</h1>
        <time className="type-paragraph-s text-text/40" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString(locale)}
        </time>
      </div>

      <div className="prose prose-lg max-w-none">
        {post.body && <PortableText value={post.body as never} />}
      </div>

      {post.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          <div className="flex flex-col gap-6">
            {post.faq.map((item, i) => (
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
