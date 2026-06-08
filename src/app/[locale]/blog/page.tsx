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

const labels = {
  en: {
    eyebrow: "Resources",
    title: "Enterprise AI guides for teams shipping real workflows",
    subtitle: "Practical articles on AI agents, RAG, workflow automation, private deployments and enterprise AI strategy.",
    featured: "Featured guide",
    guideType: "Enterprise AI guide",
    latest: "Latest articles",
    empty: "No posts yet.",
    clusters: ["AI Agents", "RAG", "Enterprise AI", "Workflow Automation", "Private AI"],
  },
  fr: {
    eyebrow: "Ressources",
    title: "Guides IA entreprise pour les équipes qui déploient de vrais workflows",
    subtitle: "Articles pratiques sur les agents IA, le RAG, l'automatisation, les déploiements privés et la stratégie IA.",
    featured: "Guide à lire",
    guideType: "Guide IA entreprise",
    latest: "Derniers articles",
    empty: "Aucun article pour le moment.",
    clusters: ["Agents IA", "RAG", "IA entreprise", "Automatisation", "IA privée"],
  },
  nl: {
    eyebrow: "Resources",
    title: "Enterprise AI-gidsen voor teams die echte workflows lanceren",
    subtitle: "Praktische artikels over AI-agents, RAG, workflowautomatisering, private deployments en enterprise AI-strategie.",
    featured: "Aanbevolen gids",
    guideType: "Enterprise AI-gids",
    latest: "Laatste artikels",
    empty: "Nog geen artikelen.",
    clusters: ["AI-agents", "RAG", "Enterprise AI", "Workflowautomatisering", "Private AI"],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; subtitle: string; featured: string; guideType: string; latest: string; empty: string; clusters: string[] }>;

const categoryLabels: Record<string, Record<Locale, string>> = {
  "ai-strategy": { en: "AI Strategy", fr: "Stratégie IA", nl: "AI Strategie" },
  "use-cases": { en: "Use Cases", fr: "Cas d'usage", nl: "Use cases" },
  "product-updates": { en: "Product Updates", fr: "Produit", nl: "Product" },
  "security-compliance": { en: "Security", fr: "Sécurité", nl: "Security" },
  tutorials: { en: "Tutorials", fr: "Tutoriels", nl: "Tutorials" },
};

const seo = {
  en: {
    metaTitle: "Enterprise AI Blog | Wonka AI",
    metaDescription: "Read practical enterprise AI guides on AI agents, RAG, private deployments, automation workflows, Odoo AI and secure AI adoption.",
    ogImage: null,
  },
  fr: {
    metaTitle: "Blog IA Entreprise | Wonka AI",
    metaDescription: "Explorez des guides pratiques sur les agents IA, le RAG, l'IA privée, l'automatisation, Odoo et l'adoption sécurisée de l'IA.",
    ogImage: null,
  },
  nl: {
    metaTitle: "Enterprise AI Blog | Wonka AI",
    metaDescription: "Lees praktische gidsen over AI-agents, RAG, private deployments, workflowautomatisering, Odoo AI en veilige AI-adoptie.",
    ogImage: null,
  },
} satisfies Record<Locale, { metaTitle: string; metaDescription: string; ogImage: null }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(seo[locale], {
    path: hubPath("blog", locale),
    hreflang: "hub",
    fallbackTitle: seo[locale].metaTitle,
    locale,
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: BLOG_POSTS_QUERY, params: { language: locale } });
  const posts = (data ?? []) as BlogPost[];
  const featured = posts[0];
  const rest = featured ? posts.slice(1) : posts;
  const l = labels[locale];
  const featuredCategory = featured?.category
    ? categoryLabels[featured.category]?.[locale] ?? featured.category
    : l.guideType;

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{l.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{l.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{l.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {l.clusters.map((cluster) => (
              <span key={cluster} className="rounded-full border border-border px-3 py-1 type-eyebrow text-text/45">
                {cluster}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        {!posts.length ? (
          <p className="type-body text-text/40">{l.empty}</p>
        ) : (
          <>
            {featured ? (
              <a
                href={itemPath("blog", locale, featured.slug.current)}
                className="group mb-14 grid gap-8 rounded-lg border border-border bg-mid-gray p-6 transition-colors hover:border-accent lg:grid-cols-[1fr_360px]"
              >
                <div>
                  <p className="type-eyebrow text-text/40">{l.featured}</p>
                  <h2 className="mt-4 type-h3 max-w-3xl group-hover:text-accent">{featured.title}</h2>
                  <p className="mt-4 max-w-2xl type-body text-text/60">{featured.excerpt}</p>
                </div>
                <div className="flex flex-col justify-between rounded-md border border-dashed border-border bg-background p-5">
                  <span className="type-eyebrow text-text/40">
                    {featuredCategory}
                  </span>
                  <p className="mt-6 type-paragraph-m text-text/55">
                    {featured.excerpt}
                  </p>
                  <time className="mt-12 type-paragraph-s text-text/40" dateTime={featured.publishedAt}>
                    {new Date(featured.publishedAt).toLocaleDateString(locale)}
                  </time>
                </div>
              </a>
            ) : null}

            <h2 className="type-h5 mb-6">{l.latest}</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <article key={post._id} className="rounded-lg border border-border p-5 transition-colors hover:border-accent">
                  <a href={itemPath("blog", locale, post.slug.current)} className="group flex min-h-64 flex-col">
                    <span className="type-eyebrow text-text/40">
                      {post.category ? categoryLabels[post.category]?.[locale] ?? post.category : l.guideType}
                    </span>
                    <h3 className="mt-4 type-h6 group-hover:text-accent">{post.title}</h3>
                    <p className="mt-3 type-paragraph-m text-text/60">{post.excerpt}</p>
                    <time className="mt-auto pt-6 type-paragraph-s text-text/35" dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(locale)}
                    </time>
                  </a>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
