import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERMS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/glossaire" : `/${locale}/glossaire`;
  return buildMetadata(null, {
    path,
    fallbackTitle: locale === "fr" ? "Glossaire" : locale === "nl" ? "Woordenlijst" : "Glossary",
  });
}

export default async function GlossairePage({ params }: PageProps) {
  const { locale } = await params;
  const { data: terms } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="type-h2 mb-8">
        {locale === "fr" ? "Glossaire" : locale === "nl" ? "Woordenlijst" : "Glossary"}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {terms?.map((term) => (
          <article key={term._id} className="flex flex-col gap-2 p-6 border border-border rounded-lg">
            <h2 className="type-h5">
              <a href={locale === "en" ? `/glossaire/${term.slug.current}` : `/${locale}/glossaire/${term.slug.current}`}>
                {term.term}
              </a>
            </h2>
            <p className="type-paragraph-m text-text/70">{term.shortDefinition}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
