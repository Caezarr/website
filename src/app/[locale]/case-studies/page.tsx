import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { GuideLinkBand } from "@/components/sections/guide-link-band";
import { getHubGuideLinks } from "@/lib/hub-guides";
import type { Locale } from "@/i18n/config";
import type { CaseStudy } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Customer proof",
    title: "How teams deploy private AI with Wonka",
    subtitle: "Real workflows, connected systems and measurable outcomes from companies adopting private enterprise AI.",
    proof: "What we prove",
    approach: "What every deployment should show",
    approachBody: "A useful AI case study is not only a logo and a quote. It should explain which systems were connected, what workflow changed, how users stayed in control, and which measurable result improved after deployment.",
    guides: "Guides behind the deployments",
    all: "Customer stories",
    empty: "Case studies are coming soon. In the meantime, explore integrations and AI agent workflows.",
    metrics: ["Private deployment", "Connected stack", "Measurable workflow", "Human oversight"],
  },
  fr: {
    eyebrow: "Preuve client",
    title: "Comment les équipes déploient l'IA privée avec Wonka",
    subtitle: "Workflows réels, systèmes connectés et résultats mesurables d'entreprises qui adoptent l'IA privée.",
    proof: "Ce que l'on prouve",
    approach: "Ce qu'un déploiement doit démontrer",
    approachBody: "Un bon cas client IA ne se limite pas à un logo. Il doit montrer quels systèmes ont été connectés, quel workflow a changé, comment les équipes gardent le contrôle et quel résultat mesurable progresse.",
    guides: "Guides derrière les déploiements",
    all: "Cas clients",
    empty: "Les cas clients arrivent bientôt. En attendant, explorez les intégrations et workflows d'agents IA.",
    metrics: ["Déploiement privé", "Stack connectée", "Workflow mesurable", "Validation humaine"],
  },
  nl: {
    eyebrow: "Customer proof",
    title: "Hoe teams private AI uitrollen met Wonka",
    subtitle: "Echte workflows, gekoppelde systemen en meetbare resultaten van bedrijven die private enterprise AI adopteren.",
    proof: "Wat we bewijzen",
    approach: "Wat elke implementatie moet aantonen",
    approachBody: "Een sterke AI-klantcase is meer dan een logo. Ze toont welke systemen gekoppeld zijn, welke workflow verandert, hoe teams controle houden en welk meetbaar resultaat verbetert.",
    guides: "Gidsen achter de implementaties",
    all: "Klantcases",
    empty: "Klantcases komen binnenkort. Bekijk intussen integraties en AI-agent workflows.",
    metrics: ["Private deployment", "Gekoppelde stack", "Meetbare workflow", "Menselijke controle"],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; subtitle: string; proof: string; approach: string; approachBody: string; guides: string; all: string; empty: string; metrics: string[] }>;

const seo = {
  en: {
    metaTitle: "Private AI Case Studies | Wonka AI",
    metaDescription: "Explore how companies use Wonka AI to deploy private AI agents, connect business systems and automate enterprise workflows securely.",
    ogImage: null,
  },
  fr: {
    metaTitle: "Cas Clients IA Privée | Wonka AI",
    metaDescription: "Découvrez comment les entreprises utilisent Wonka AI pour déployer des agents IA privés et automatiser leurs workflows métier.",
    ogImage: null,
  },
  nl: {
    metaTitle: "Private AI Klantcases | Wonka AI",
    metaDescription: "Ontdek hoe bedrijven Wonka AI gebruiken om private AI-agents te implementeren en enterprise workflows veilig te automatiseren.",
    ogImage: null,
  },
} satisfies Record<Locale, { metaTitle: string; metaDescription: string; ogImage: null }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(seo[locale], {
    path: hubPath("case-studies", locale),
    hreflang: "hub",
    fallbackTitle: seo[locale].metaTitle,
    locale,
  });
}

export default async function CasClientsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY, params: { language: locale } });
  const cases = (data ?? []) as CaseStudy[];
  const l = copy[locale];
  const guideLinks = getHubGuideLinks(locale);

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
          <h2 className="type-h5 mb-5">{l.proof}</h2>
          <div className="grid gap-3 md:grid-cols-4">
            {l.metrics.map((metric) => (
              <div key={metric} className="rounded-md border border-border bg-background p-4">
                <span className="mb-4 block size-2 rounded-full bg-text" aria-hidden />
                <p className="type-paragraph-m-bold">{metric}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mb-14 grid gap-6 rounded-lg border border-border p-6 lg:grid-cols-[280px_1fr]">
          <h2 className="type-h5">{l.approach}</h2>
          <p className="type-body leading-relaxed text-text/60">{l.approachBody}</p>
        </section>

        <GuideLinkBand title={l.guides} links={guideLinks} />

        {!cases.length ? (
          <div className="rounded-lg border border-dashed border-border p-8">
            <p className="type-body text-text/60">{l.empty}</p>
          </div>
        ) : (
          <>
            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {cases.map((caseStudy) => (
                <a
                  key={caseStudy._id}
                  href={itemPath("case-studies", locale, caseStudy.slug.current)}
                  className="group flex min-h-72 flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent"
                >
                  <span className="type-eyebrow text-text/40">{caseStudy.sector}</span>
                  <h3 className="mt-4 type-h5 group-hover:text-accent">{caseStudy.clientName}</h3>
                  <p className="mt-3 type-body text-text/65">{caseStudy.headline}</p>
                  {caseStudy.results?.length ? (
                    <ul className="mt-auto flex flex-col gap-2 pt-6">
                      {caseStudy.results.slice(0, 3).map((result) => (
                        <li key={result} className="type-paragraph-s text-accent">{result}</li>
                      ))}
                    </ul>
                  ) : null}
                </a>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
