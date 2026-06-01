import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/cas-clients" : `/${locale}/cas-clients`;
  return buildMetadata(null, {
    path,
    fallbackTitle: locale === "fr" ? "Cas clients" : locale === "nl" ? "Klantcases" : "Case studies",
  });
}

export default async function CasClientsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: caseStudies } = await sanityFetch({ query: CASE_STUDIES_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="type-h2 mb-8">
        {locale === "fr" ? "Cas clients" : locale === "nl" ? "Klantcases" : "Case studies"}
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        {caseStudies?.map((study) => (
          <article key={study._id} className="flex flex-col gap-3 p-6 border border-border rounded-lg">
            <span className="type-eyebrow text-text/50">{study.sector}</span>
            <h2 className="type-h5">
              <a
                href={
                  locale === "en"
                    ? `/cas-clients/${study.slug.current}`
                    : `/${locale}/cas-clients/${study.slug.current}`
                }
              >
                {study.headline}
              </a>
            </h2>
            <p className="type-paragraph-m text-text/70">{study.excerpt}</p>
            {study.results?.length ? (
              <ul className="flex flex-wrap gap-2 mt-2">
                {study.results.slice(0, 3).map((result, i) => (
                  <li key={i} className="type-paragraph-s bg-surface px-3 py-1 rounded-full text-text/70">
                    {result}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="type-paragraph-s text-text/40 mt-1">{study.clientName}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
