import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { urlFor } from "@sanity/lib/image";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Integrations",
    title: "Connect private AI agents to your company stack",
    subtitle: "Explore the tools Wonka can connect to for private search, summaries, workflow automation and governed AI agents.",
    popular: "Popular integrations",
    all: "All connectors",
    categories: ["CRM", "Documents", "Project management", "Communication", "ERP", "Knowledge"],
    empty: "No connectors yet.",
  },
  fr: {
    eyebrow: "Intégrations",
    title: "Connectez des agents IA privés à votre stack entreprise",
    subtitle: "Explorez les outils que Wonka peut connecter pour la recherche privée, les résumés, l'automatisation et les agents IA gouvernés.",
    popular: "Intégrations populaires",
    all: "Tous les connecteurs",
    categories: ["CRM", "Documents", "Gestion projet", "Communication", "ERP", "Connaissance"],
    empty: "Aucun connecteur pour le moment.",
  },
  nl: {
    eyebrow: "Integraties",
    title: "Koppel private AI-agents aan je bedrijfsstack",
    subtitle: "Ontdek de tools die Wonka kan verbinden voor private search, samenvattingen, workflowautomatisering en beheerde AI-agents.",
    popular: "Populaire integraties",
    all: "Alle connectoren",
    categories: ["CRM", "Documenten", "Projectmanagement", "Communicatie", "ERP", "Kennis"],
    empty: "Nog geen connectoren.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const prioritySlugs = ["odoo", "sharepoint", "salesforce", "slack", "hubspot", "google-drive"];

function logoUrl(connector: ConnectorPage): string | null {
  return connector.toolLogo ? urlFor(connector.toolLogo).width(96).height(96).fit("max").url() : null;
}

function ConnectorLogo({ connector }: { connector: ConnectorPage }) {
  const src = logoUrl(connector);
  return (
    <div className="grid size-12 shrink-0 place-items-center rounded-md border border-border bg-background">
      {src ? (
        <Image
          src={src}
          alt={connector.toolLogo?.alt || `${connector.toolName} logo`}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <span className="type-paragraph-m-bold text-text/40">{connector.toolName.slice(0, 1)}</span>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, {
    path: hubPath("connectors", locale),
    hreflang: "hub",
    fallbackTitle: "AI Integrations and Connectors | Wonka AI",
    locale,
  });
}

export default async function ConnectorsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: CONNECTOR_PAGES_QUERY, params: { language: locale } });
  const connectors = (data ?? []) as ConnectorPage[];
  const labels = copy[locale];
  const popular = connectors
    .filter((connector) => prioritySlugs.includes(connector.slug.current))
    .sort((a, b) => prioritySlugs.indexOf(a.slug.current) - prioritySlugs.indexOf(b.slug.current));

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{labels.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{labels.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{labels.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {(labels.categories as string[]).map((category) => (
              <span key={category} className="rounded-full border border-border px-3 py-1 type-eyebrow text-text/45">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        {!connectors.length ? (
          <p className="type-body text-text/40">{labels.empty}</p>
        ) : (
          <>
            {popular.length ? (
              <div className="mb-14">
                <h2 className="type-h5 mb-6">{labels.popular}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {popular.map((connector) => (
                    <a
                      key={connector._id}
                      href={itemPath("connectors", locale, connector.slug.current)}
                      className="group flex gap-4 rounded-lg border border-border bg-mid-gray p-5 transition-colors hover:border-accent hover:bg-background"
                    >
                      <ConnectorLogo connector={connector} />
                      <div>
                        <h3 className="type-body font-medium group-hover:text-accent">{connector.toolName}</h3>
                        <p className="mt-1 line-clamp-2 type-paragraph-m text-text/55">{connector.tagline}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <h2 className="type-h5 mb-6">{labels.all}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {connectors.map((connector) => (
                  <a
                    key={connector._id}
                    href={itemPath("connectors", locale, connector.slug.current)}
                    className="group flex min-h-40 flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <ConnectorLogo connector={connector} />
                      <h3 className="type-body font-medium group-hover:text-accent">{connector.toolName}</h3>
                    </div>
                    <p className="type-paragraph-m text-text/60">{connector.tagline}</p>
                    {connector.tags?.length ? (
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {connector.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-mid-gray px-2 py-1 type-eyebrow text-text/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
