import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERMS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { GuideLinkBand } from "@/components/sections/guide-link-band";
import { getHubGuideLinks } from "@/lib/hub-guides";
import type { Locale } from "@/i18n/config";
import type { GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Learn",
    title: "Enterprise AI glossary for private agents and workflows",
    subtitle: "Clear definitions for the concepts behind AI agents, RAG, automation, governance and private enterprise AI.",
    core: "Core concepts",
    guides: "Practical enterprise AI guides",
    all: "All terms",
    empty: "No terms yet.",
    pillars: ["Agents", "RAG", "Automation", "Governance", "Private AI"],
  },
  fr: {
    eyebrow: "Apprendre",
    title: "Glossaire IA entreprise pour agents privés et workflows",
    subtitle: "Des définitions claires pour comprendre agents IA, RAG, automatisation, gouvernance et IA privée en entreprise.",
    core: "Concepts clés",
    guides: "Guides pratiques IA entreprise",
    all: "Tous les termes",
    empty: "Aucun terme pour le moment.",
    pillars: ["Agents", "RAG", "Automatisation", "Gouvernance", "IA privée"],
  },
  nl: {
    eyebrow: "Leren",
    title: "Enterprise AI-woordenlijst voor private agents en workflows",
    subtitle: "Heldere definities voor AI-agents, RAG, automatisering, governance en private enterprise AI.",
    core: "Kernbegrippen",
    guides: "Praktische enterprise AI-gidsen",
    all: "Alle termen",
    empty: "Nog geen termen.",
    pillars: ["Agents", "RAG", "Automatisering", "Governance", "Private AI"],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; subtitle: string; core: string; guides: string; all: string; empty: string; pillars: string[] }>;

const prioritySlugs = ["ai-agent", "agentic-ai", "ai-agents", "agentic-rag", "workflow-automation", "multi-agent-system"];

const seo = {
  en: {
    metaTitle: "Enterprise AI Glossary | Wonka AI",
    metaDescription: "Learn the key terms behind enterprise AI: AI agents, RAG, private LLMs, MCP, workflow automation, governance and secure deployment.",
    ogImage: null,
  },
  fr: {
    metaTitle: "Glossaire IA Entreprise | Wonka AI",
    metaDescription: "Comprenez les termes clés de l'IA entreprise : agents IA, RAG, LLM privés, MCP, automatisation, gouvernance et déploiement sécurisé.",
    ogImage: null,
  },
  nl: {
    metaTitle: "Enterprise AI Woordenlijst | Wonka AI",
    metaDescription: "Leer de belangrijkste begrippen rond enterprise AI: AI-agents, RAG, private LLMs, MCP, automatisering, governance en veilige uitrol.",
    ogImage: null,
  },
} satisfies Record<Locale, { metaTitle: string; metaDescription: string; ogImage: null }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(seo[locale], {
    path: hubPath("glossary", locale),
    hreflang: "hub",
    fallbackTitle: seo[locale].metaTitle,
    locale,
  });
}

export default async function GlossairePage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY, params: { language: locale } });
  const terms = (data ?? []) as GlossaryTerm[];
  const l = copy[locale];
  const guideLinks = getHubGuideLinks(locale);
  const coreTerms = terms
    .filter((term) => prioritySlugs.includes(term.slug.current))
    .sort((a, b) => prioritySlugs.indexOf(a.slug.current) - prioritySlugs.indexOf(b.slug.current));

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{l.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{l.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{l.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {l.pillars.map((pillar) => (
              <span key={pillar} className="rounded-full border border-border px-3 py-1 type-eyebrow text-text/45">
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        {!terms.length ? (
          <p className="type-body text-text/40">{l.empty}</p>
        ) : (
          <>
            {coreTerms.length ? (
              <div className="mb-14">
                <h2 className="type-h5 mb-6">{l.core}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {coreTerms.map((term) => (
                    <a
                      key={term._id}
                      href={itemPath("glossary", locale, term.slug.current)}
                      className="group rounded-lg border border-border bg-mid-gray p-5 transition-colors hover:border-accent hover:bg-background"
                    >
                      <h3 className="type-h6 group-hover:text-accent">{term.term}</h3>
                      <p className="mt-3 line-clamp-4 type-paragraph-m text-text/60">{term.shortDefinition}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <GuideLinkBand title={l.guides} links={guideLinks} />

            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {terms.map((term) => (
                <a
                  key={term._id}
                  href={itemPath("glossary", locale, term.slug.current)}
                  className="group rounded-lg border border-border p-5 transition-colors hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-body font-medium group-hover:text-accent">{term.term}</h3>
                    <span className="type-eyebrow text-text/30">{term.slug.current}</span>
                  </div>
                  <p className="mt-3 type-paragraph-m text-text/60">{term.shortDefinition}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
