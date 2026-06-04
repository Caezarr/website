import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { BLOG_POSTS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, { path: hubPath('blog', locale), hreflang: 'hub', fallbackTitle: "Blog", locale });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: posts } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
    params: { language: locale },
  });

  return (
    <main className="container mx-auto px-4 py-24 max-w-5xl">
      <h1 className="type-h2 mb-4">Blog</h1>
      <p className="type-body text-text/60 mb-16">
        {locale === "fr"
          ? "Décryptage de l'IA en entreprise, de l'automatisation et du déploiement."
          : locale === "nl"
            ? "Inzichten over enterprise AI, automatisering en implementatie."
            : "Insights on enterprise AI, automation, and deployment."}
      </p>

      {!posts?.length ? (
        <p className="type-body text-text/40">
          {locale === "fr" ? "Aucun article pour le moment." : locale === "nl" ? "Nog geen artikelen." : "No posts yet."}
        </p>
      ) : (
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {(posts as BlogPost[]).map((post) => {
            const href = itemPath('blog', locale, post.slug.current);
            return (
              <article key={post._id} className="flex flex-col gap-3">
                <span className="type-eyebrow text-text/40">{post.category}</span>
                <h2 className="type-h5">
                  <a href={href} className="hover:underline">{post.title}</a>
                </h2>
                <p className="type-paragraph-m text-text/60 flex-1">{post.excerpt}</p>
                <time className="type-paragraph-s text-text/30" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(locale)}
                </time>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
