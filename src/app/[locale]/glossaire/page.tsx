import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERMS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import type { GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, { path: locale === "en" ? "/glossaire" : `/${locale}/glossaire`, fallbackTitle: "Glossary" });
}

export default async function GlossairePage({ params }: PageProps) {
  const { locale } = await params;
  const { data: terms } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="type-h2 mb-4">{locale === "fr" ? "Glossaire IA" : locale === "nl" ? "AI Woordenlijst" : "AI Glossary"}</h1>
      <p className="type-body text-text/60 mb-16">
        {locale === "fr" ? "Les concepts clés de l'IA en entreprise, expliqués clairement." : locale === "nl" ? "Sleutelbegrippen in enterprise AI, duidelijk uitgelegd." : "Key concepts in enterprise AI, clearly explained."}
      </p>
      {!terms?.length ? (
        <p className="type-body text-text/40">No terms yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {(terms as GlossaryTerm[]).map((t) => {
            const href = locale === "en" ? `/glossaire/${t.slug.current}` : `/${locale}/glossaire/${t.slug.current}`;
            return (
              <div key={t._id} className="py-6">
                <a href={href} className="type-h6 hover:underline block mb-2">{t.term}</a>
                <p className="type-paragraph-m text-text/60">{t.shortDefinition}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
