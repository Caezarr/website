import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/connecteurs" : `/${locale}/connecteurs`;
  return buildMetadata(null, { path, fallbackTitle: "Connectors" });
}

export default async function ConnecteursPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: connectors } = await sanityFetch({
    query: CONNECTOR_PAGES_QUERY,
    params: { language: locale },
  });

  return (
    <main className="container mx-auto px-4 py-24 max-w-5xl">
      <h1 className="type-h2 mb-4">
        {locale === "fr" ? "Connecteurs" : locale === "nl" ? "Connectoren" : "Connectors"}
      </h1>
      <p className="type-body text-text/60 mb-16">
        {locale === "fr"
          ? "Connectez vos outils à Wonka AI. Une plateforme, toutes vos données."
          : locale === "nl"
            ? "Verbind uw tools met Wonka AI. Één platform, al uw data."
            : "Connect your tools to Wonka AI. One platform, all your data."}
      </p>

      {!connectors?.length ? (
        <p className="type-body text-text/40">
          {locale === "fr" ? "Aucun connecteur pour le moment." : locale === "nl" ? "Nog geen connectoren." : "No connectors yet."}
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(connectors as ConnectorPage[]).map((c) => {
            const href = locale === "en" ? `/connecteurs/${c.slug.current}` : `/${locale}/connecteurs/${c.slug.current}`;
            return (
              <a key={c._id} href={href} className="flex flex-col gap-2 p-6 border border-border rounded-lg hover:border-accent transition-colors">
                <h2 className="type-h6">{c.toolName}</h2>
                <p className="type-paragraph-m text-text/60">{c.tagline}</p>
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
