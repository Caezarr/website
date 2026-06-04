import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import type { Locale } from "@/i18n/config";
import type { ComparisonPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, { path: hubPath('comparisons', locale), hreflang: 'hub', fallbackTitle: "Comparisons", locale });
}

export default async function ComparaisonsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: comparisons } = await sanityFetch({ query: COMPARISON_PAGES_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-24 max-w-5xl">
      <h1 className="type-h2 mb-4">{locale === "fr" ? "Comparaisons" : locale === "nl" ? "Vergelijkingen" : "Comparisons"}</h1>
      <p className="type-body text-text/60 mb-16">
        {locale === "fr" ? "Comment Wonka AI se compare aux autres solutions d'IA enterprise." : locale === "nl" ? "Hoe Wonka AI zich verhoudt tot andere enterprise AI-oplossingen." : "How Wonka AI compares to other enterprise AI solutions."}
      </p>
      {!comparisons?.length ? <p className="type-body text-text/40">No comparisons yet.</p> : (
        <div className="grid gap-8 md:grid-cols-2">
          {(comparisons as ComparisonPage[]).map((c) => {
            const href = itemPath('comparisons', locale, c.slug.current);
            return (
              <a key={c._id} href={href} className="flex flex-col gap-2 p-6 border border-border rounded-lg hover:border-accent transition-colors">
                <h2 className="type-h6">{c.title}</h2>
                <p className="type-paragraph-m text-text/60">{c.excerpt}</p>
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
