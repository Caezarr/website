import Link from "next/link";
import { comparisonPath, FRENCH_COMPARISONS } from "@/lib/french-comparisons";
import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { HubPopularLinks } from "@/components/sections/hub-popular-links";
import { getHubPopularLinks } from "@/lib/hub-popular-links";
import type { Locale } from "@/i18n/config";
import type { ComparisonPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const copy = {
  en: {
    eyebrow: "Comparisons",
    title: "Compare Wonka with enterprise AI tools",
    subtitle:
      "Evaluate AI platforms by privacy, integrations, workflow depth, governance and European deployment readiness.",
    criteria: "Comparison criteria",
    all: "All comparisons",
    popular: "Popular comparison guides",
    empty: "No comparisons yet.",
    points: [
      "Private data",
      "Tool integrations",
      "Agent workflows",
      "Governance",
      "EU readiness",
    ],
    choose: "Compare",
    explainer:
      "These comparisons focus on the buying questions that matter once AI leaves the demo stage: where data is hosted, which business systems are connected, how answers are sourced, and how teams keep control of automated workflows.",
    decisionBody:
      "A useful evaluation should also include adoption risk. Teams need to understand whether the tool can reach the data they need, whether users can verify answers before acting, and whether the deployment model fits internal security expectations. That is why each comparison links product capabilities back to concrete workflows, not only feature checklists. The strongest choice is usually the platform that fits the operating model: private data access, clear ownership, measurable adoption and enough control for administrators to keep AI inside approved boundaries. A good comparison therefore helps both business leaders and technical teams decide what can safely move from pilot to production.",
    seo: {
      metaTitle: "Enterprise AI Comparisons | Wonka AI",
      metaDescription:
        "Compare Wonka AI with ChatGPT Enterprise, Microsoft Copilot, public LLMs and other enterprise AI platforms.",
      ogImage: null,
    },
  },
  fr: {
    eyebrow: "Comparaisons",
    title: "ChatGPT, Claude, Dust ou Langdock : comparez avec Wonka",
    subtitle:
      "Évaluez les plateformes IA selon la confidentialité, les intégrations, les workflows, la gouvernance et le déploiement européen.",
    criteria: "Critères de comparaison",
    all: "Toutes les comparaisons",
    popular: "Comparatifs populaires",
    empty: "Aucune comparaison pour le moment.",
    points: [
      "Données privées",
      "Intégrations",
      "Workflows agents",
      "Gouvernance",
      "Déploiement EU",
    ],
    choose: "Comparer",
    explainer:
      "Ces comparaisons se concentrent sur les vraies questions d'achat après la démo : où les données sont hébergées, quels systèmes métier sont connectés, comment les réponses sont sourcées et comment les équipes gardent le contrôle des workflows automatisés.",
    decisionBody:
      "Une bonne évaluation doit aussi intégrer le risque d'adoption. Les équipes doivent savoir si l'outil peut accéder aux données utiles, si les utilisateurs peuvent vérifier les réponses avant d'agir et si le modèle de déploiement respecte les attentes de sécurité internes. C'est pourquoi chaque comparaison relie les capacités produit à des workflows concrets, pas seulement à une liste de fonctionnalités. Le meilleur choix est souvent la plateforme qui correspond au modèle opérationnel : accès aux données privées, ownership clair, adoption mesurable et contrôle suffisant pour garder l'IA dans des limites approuvées. Une bonne comparaison aide donc les dirigeants et les équipes techniques à décider ce qui peut passer du pilote à la production.",
    seo: {
      metaTitle: "Comparatifs IA : ChatGPT, Claude, Dust, Langdock | Wonka",
      metaDescription:
        "Comparez Wonka à ChatGPT, Claude, Dust et Langdock : intégrations, gouvernance, données, coût total et tests pour choisir une IA d’entreprise.",
      ogImage: null,
    },
  },
  nl: {
    eyebrow: "Vergelijkingen",
    title: "Vergelijk Wonka met enterprise AI-tools",
    subtitle:
      "Evalueer AI-platformen op privacy, integraties, workflowdiepte, governance en Europese uitrol.",
    criteria: "Evaluatiecriteria",
    all: "Alle vergelijkingen",
    popular: "Populaire vergelijkingsgidsen",
    empty: "Nog geen vergelijkingen.",
    points: [
      "Private data",
      "Integraties",
      "Agent workflows",
      "Governance",
      "EU-uitrol",
    ],
    choose: "Vergelijk",
    explainer:
      "Deze vergelijkingen focussen op de koopvragen die belangrijk worden na de demo: waar data gehost wordt, welke bedrijfssystemen gekoppeld zijn, hoe antwoorden bronnen gebruiken en hoe teams controle houden over geautomatiseerde workflows.",
    decisionBody:
      "Een nuttige evaluatie kijkt ook naar adoptierisico. Teams moeten weten of de tool de juiste data kan bereiken, of gebruikers antwoorden kunnen controleren voordat ze handelen en of het deploymentmodel past bij interne security-eisen. Daarom koppelt elke vergelijking productmogelijkheden aan concrete workflows, niet alleen aan featurelijsten. De sterkste keuze is meestal het platform dat past bij het operating model: private datatoegang, duidelijk eigenaarschap, meetbare adoptie en genoeg controle om AI binnen goedgekeurde grenzen te houden. Een goede vergelijking helpt business leaders en technische teams dus beslissen wat veilig van pilot naar productie kan.",
    seo: {
      metaTitle: "Enterprise AI-vergelijkingen | Wonka AI",
      metaDescription:
        "Vergelijk Wonka AI met ChatGPT Enterprise, Microsoft Copilot, publieke LLMs en andere enterprise AI-platformen.",
      ogImage: null,
    },
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    criteria: string;
    all: string;
    popular: string;
    empty: string;
    points: string[];
    choose: string;
    explainer: string;
    decisionBody: string;
    seo: { metaTitle: string; metaDescription: string; ogImage: null };
  }
>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(copy[locale].seo, {
    path: hubPath("comparisons", locale),
    hreflang: "hub",
    fallbackTitle: "Wonka AI Comparisons | Private Enterprise AI",
    locale,
  });
}

export default async function ComparaisonsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({
    query: COMPARISON_PAGES_QUERY,
    params: { language: locale },
  });
  const comparisons = ((data ?? []) as ComparisonPage[]).filter(
    (item) =>
      locale !== "fr" ||
      !FRENCH_COMPARISONS.some((c) => c.slug === item.slug.current),
  );
  const l = copy[locale];

  return (
    <main className="bg-background">
      <section className="border-border border-b border-dashed">
        <div className="mx-auto max-w-[1200px] px-6 pt-32 pb-14 md:pt-36">
          <p className="type-eyebrow text-text/40">{l.eyebrow}</p>
          <h1 className="type-h2 mt-4 max-w-4xl">{l.title}</h1>
          <p className="type-body text-text/60 mt-5 max-w-3xl leading-relaxed">
            {l.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="border-border bg-mid-gray mb-14 rounded-lg border p-6">
          <h2 className="type-h5 mb-5">{l.criteria}</h2>
          <p className="type-paragraph-m text-text/60 mb-6 max-w-3xl leading-relaxed">
            {l.explainer}
          </p>
          <p className="type-paragraph-m text-text/60 mb-6 max-w-3xl leading-relaxed">
            {l.decisionBody}
          </p>
          <div className="grid gap-3 md:grid-cols-5">
            {l.points.map((point, index) => (
              <div
                key={point}
                className="border-border bg-background rounded-md border p-4"
              >
                <span className="type-eyebrow text-text/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-paragraph-m-bold mt-3">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {locale === "fr" && (
          <section aria-labelledby="fr-comparisons" className="mb-14">
            <h2 id="fr-comparisons" className="type-h4">
              Quatre comparatifs pour préparer votre décision
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {FRENCH_COMPARISONS.map((c) => (
                <article
                  key={c.slug}
                  className="border-border rounded-sm border p-6"
                >
                  <h3 className="type-h6">
                    <Link href={comparisonPath(c)} className="underline">
                      Wonka vs {c.competitor}
                    </Link>
                  </h3>
                  <p className="mt-4">{c.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6">
              <Link href="/fr/comparatif-ia-entreprise" className="underline">
                La méthode complète pour choisir votre IA d’entreprise
              </Link>
            </p>
          </section>
        )}
        {locale === "en" && (
          <section className="mb-14" aria-labelledby="comparison-shortlist">
            <h2 id="comparison-shortlist" className="type-h4">
              Evaluate your shortlist
            </h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/vs/dust" className="underline">
                  Wonka and Dust: integrations and rollout
                </Link>
              </li>
              <li>
                <Link href="/vs/langdock" className="underline">
                  Wonka and Langdock: enterprise workflows
                </Link>
              </li>
              <li>
                <Link href="/ai-agent-blueprint" className="underline">
                  Prepare your AI agent blueprint
                </Link>
              </li>
            </ul>
          </section>
        )}
        {!comparisons.length ? (
          <p className="type-body text-text/40">
            {locale === "fr"
              ? "D’autres comparatifs seront ajoutés après vérification des sources."
              : l.empty}
          </p>
        ) : (
          <>
            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((comparison) => (
                <a
                  key={comparison._id}
                  href={itemPath(
                    "comparisons",
                    locale,
                    comparison.slug.current,
                  )}
                  className="group border-border hover:border-accent flex min-h-64 flex-col rounded-lg border p-5 transition-colors"
                >
                  <span className="type-eyebrow text-text/40">
                    Wonka vs {comparison.competitor}
                  </span>
                  <h3 className="type-h6 group-hover:text-accent mt-4">
                    {comparison.title}
                  </h3>
                  <p className="type-paragraph-m text-text/60 mt-3">
                    {comparison.excerpt}
                  </p>
                  <span className="type-paragraph-m-bold text-accent mt-auto pt-6">
                    {l.choose}
                  </span>
                </a>
              ))}
            </div>
            <HubPopularLinks
              title={l.popular}
              links={getHubPopularLinks(locale)}
            />
          </>
        )}
      </section>
    </main>
  );
}
