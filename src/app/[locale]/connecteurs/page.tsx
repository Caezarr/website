import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/connecteurs" : `/${locale}/connecteurs`;
  return buildMetadata(null, {
    path,
    fallbackTitle: locale === "fr" ? "Connecteurs" : locale === "nl" ? "Connectoren" : "Connectors",
  });
}

export default async function ConnecteursPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: connectors } = await sanityFetch({ query: CONNECTOR_PAGES_QUERY, params: { language: locale } });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="type-h2 mb-4">
        {locale === "fr" ? "Connecteurs" : locale === "nl" ? "Connectoren" : "Connectors"}
      </h1>
      <p className="type-paragraph-l text-text/70 mb-12">
        {locale === "fr"
          ? "Intégrez Wonka AI avec vos outils préférés."
          : locale === "nl"
            ? "Integreer Wonka AI met uw favoriete tools."
            : "Integrate Wonka AI with your favourite tools."}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connectors?.map((connector) => (
          <article
            key={connector._id}
            className="flex flex-col gap-3 p-6 border border-border rounded-lg hover:border-text/20 transition-colors"
          >
            <h2 className="type-h5">
              <a
                href={
                  locale === "en"
                    ? `/connecteurs/${connector.slug.current}`
                    : `/${locale}/connecteurs/${connector.slug.current}`
                }
              >
                {connector.toolName}
              </a>
            </h2>
            <p className="type-paragraph-m text-text/70">{connector.tagline}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
