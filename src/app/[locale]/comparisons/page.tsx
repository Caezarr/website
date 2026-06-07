import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import type { Locale } from "@/i18n/config";
import type { ComparisonPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Comparisons",
    title: "Compare Wonka with enterprise AI tools",
    subtitle: "Evaluate AI platforms by privacy, integrations, workflow depth, governance and European deployment readiness.",
    criteria: "Comparison criteria",
    all: "All comparisons",
    empty: "No comparisons yet.",
    points: ["Private data", "Tool integrations", "Agent workflows", "Governance", "EU readiness"],
    choose: "Compare",
  },
  fr: {
    eyebrow: "Comparaisons",
    title: "Comparez Wonka aux outils IA enterprise",
    subtitle: "Évaluez les plateformes IA selon la confidentialité, les intégrations, les workflows, la gouvernance et le déploiement européen.",
    criteria: "Critères de comparaison",
    all: "Toutes les comparaisons",
    empty: "Aucune comparaison pour le moment.",
    points: ["Données privées", "Intégrations", "Workflows agents", "Gouvernance", "Déploiement EU"],
    choose: "Comparer",
  },
  nl: {
    eyebrow: "Vergelijkingen",
    title: "Vergelijk Wonka met enterprise AI-tools",
    subtitle: "Evalueer AI-platformen op privacy, integraties, workflowdiepte, governance en Europese uitrol.",
    criteria: "Evaluatiecriteria",
    all: "Alle vergelijkingen",
    empty: "Nog geen vergelijkingen.",
    points: ["Private data", "Integraties", "Agent workflows", "Governance", "EU-uitrol"],
    choose: "Vergelijk",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; subtitle: string; criteria: string; all: string; empty: string; points: string[]; choose: string }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(null, {
    path: hubPath("comparisons", locale),
    hreflang: "hub",
    fallbackTitle: "Wonka AI Comparisons | Private Enterprise AI",
    locale,
  });
}

export default async function ComparaisonsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: COMPARISON_PAGES_QUERY, params: { language: locale } });
  const comparisons = (data ?? []) as ComparisonPage[];
  const l = copy[locale];

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{l.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{l.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{l.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="mb-14 rounded-lg border border-border bg-mid-gray p-6">
          <h2 className="type-h5 mb-5">{l.criteria}</h2>
          <div className="grid gap-3 md:grid-cols-5">
            {l.points.map((point, index) => (
              <div key={point} className="rounded-md border border-border bg-background p-4">
                <span className="type-eyebrow text-text/30">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 type-paragraph-m-bold">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {!comparisons.length ? (
          <p className="type-body text-text/40">{l.empty}</p>
        ) : (
          <>
            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((comparison) => (
                <a
                  key={comparison._id}
                  href={itemPath("comparisons", locale, comparison.slug.current)}
                  className="group flex min-h-64 flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent"
                >
                  <span className="type-eyebrow text-text/40">Wonka vs {comparison.competitor}</span>
                  <h3 className="mt-4 type-h6 group-hover:text-accent">{comparison.title}</h3>
                  <p className="mt-3 type-paragraph-m text-text/60">{comparison.excerpt}</p>
                  <span className="mt-auto pt-6 type-paragraph-m-bold text-accent">{l.choose}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
