import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, { path: hubPath('connectors', locale), fallbackTitle: "Connectors", locale });
}

export default async function ConnectorsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data: connectors } = await sanityFetch({ query: CONNECTOR_PAGES_QUERY, params: { language: locale } });

  const title = { en: "Connectors", fr: "Connecteurs", nl: "Connectoren" }[locale];
  const subtitle = {
    en: "Connect your tools to Wonka AI. One platform, all your data.",
    fr: "Connectez vos outils à Wonka AI. Une plateforme, toutes vos données.",
    nl: "Verbind uw tools met Wonka AI. Één platform, al uw data.",
  }[locale];

  return (
    <main className="container mx-auto px-4 py-24 max-w-5xl">
      <h1 className="type-h2 mb-4">{title}</h1>
      <p className="type-body text-text/60 mb-16">{subtitle}</p>
      {!connectors?.length ? (
        <p className="type-body text-text/40">No connectors yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(connectors as ConnectorPage[]).map((c) => (
            <a key={c._id} href={itemPath('connectors', locale, c.slug.current)}
              className="flex flex-col gap-2 p-6 border border-border rounded-lg hover:border-accent transition-colors">
              <h2 className="type-h6">{c.toolName}</h2>
              <p className="type-paragraph-m text-text/60">{c.tagline}</p>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
