import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/comparaisons" : `/${locale}/comparaisons`;
  return buildMetadata(null, {
    path,
    fallbackTitle: locale === "fr" ? "Comparaisons" : locale === "nl" ? "Vergelijkingen" : "Comparisons",
  });
}

export default async function ComparaisonsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: pages } = await sanityFetch({ query: COMPARISON_PAGES_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="type-h2 mb-8">
        {locale === "fr" ? "Comparaisons" : locale === "nl" ? "Vergelijkingen" : "Comparisons"}
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pages?.map((page) => (
          <article key={page._id} className="flex flex-col gap-3">
            <span className="type-eyebrow text-text/50">{page.competitor}</span>
            <h2 className="type-h5">
              <a href={locale === "en" ? `/comparaisons/${page.slug.current}` : `/${locale}/comparaisons/${page.slug.current}`}>
                {page.title}
              </a>
            </h2>
            <p className="type-paragraph-m text-text/70">{page.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
