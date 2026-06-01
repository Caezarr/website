import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { BLOG_POSTS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/blog" : `/${locale}/blog`;
  return buildMetadata(null, {
    path,
    fallbackTitle: "Blog",
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: posts } = await sanityFetch({ query: BLOG_POSTS_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="type-h2 mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <article key={post._id} className="flex flex-col gap-3">
            <span className="type-eyebrow text-text/50">{post.category}</span>
            <h2 className="type-h5">
              <a href={locale === "en" ? `/blog/${post.slug.current}` : `/${locale}/blog/${post.slug.current}`}>
                {post.title}
              </a>
            </h2>
            <p className="type-paragraph-m text-text/70">{post.excerpt}</p>
            <time className="type-paragraph-s text-text/40" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(locale)}
            </time>
          </article>
        ))}
      </div>
    </main>
  );
}
