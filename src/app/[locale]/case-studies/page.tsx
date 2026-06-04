import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import type { Locale } from "@/i18n/config";
import type { CaseStudy } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, { path: hubPath('case-studies', locale), hreflang: 'hub', fallbackTitle: "Case Studies", locale });
}

export default async function CasClientsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: cases } = await sanityFetch({ query: CASE_STUDIES_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-24 max-w-5xl">
      <h1 className="type-h2 mb-4">{locale === "fr" ? "Cas clients" : locale === "nl" ? "Klantcases" : "Case Studies"}</h1>
      <p className="type-body text-text/60 mb-16">
        {locale === "fr" ? "Comment nos clients déploient l'IA dans leur organisation." : locale === "nl" ? "Hoe onze klanten AI inzetten in hun organisatie." : "How our clients deploy AI across their organizations."}
      </p>
      {!cases?.length ? <p className="type-body text-text/40">No case studies yet.</p> : (
        <div className="grid gap-8 md:grid-cols-2">
          {(cases as CaseStudy[]).map((c) => {
            const href = itemPath('case-studies', locale, c.slug.current);
            return (
              <a key={c._id} href={href} className="flex flex-col gap-3 p-6 border border-border rounded-lg hover:border-accent transition-colors">
                <span className="type-eyebrow text-text/40">{c.sector}</span>
                <h2 className="type-h6">{c.clientName}</h2>
                <p className="type-paragraph-m text-text/60">{c.headline}</p>
                {c.results?.length ? (
                  <ul className="flex flex-col gap-1 mt-2">
                    {c.results.slice(0, 2).map((r, i) => <li key={i} className="type-paragraph-s text-accent">→ {r}</li>)}
                  </ul>
                ) : null}
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
