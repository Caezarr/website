import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import type { HeroData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/fr/vs/langdock";
const title = "Alternative Langdock pour ETI : Odoo, Azure West Europe";
const description = "Des agents IA dans Odoo et SharePoint, pour ceux qui arbitrent le SI d'ETI qui évaluent Langdock. Données en Azure West Europe.";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: title,
      metaDescription: description,
      ogImage: null,
    },
    { path: pagePath, fallbackTitle: title },
  );
}

const heroData: HeroData = {
  awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
  title: "Des agents IA dans Odoo et SharePoint, pour ceux qui arbitrent le SI d'ETI qui évaluent Langdock",
  subtitle: "Données en Azure West Europe. ISO 27001, RGPD, NIS 2. Diagnostic 45 min avec Gabriel.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "Langdock est le terme de recherche. ChatGPT perso reste le vrai concurrent.",
  },
  {
    tag: "p",
    content: "Votre équipe utilise déjà ChatGPT sur des comptes personnels.",
  },
  {
    tag: "p",
    content: "Les directions informatiques d'ETI savent qu'elles ont besoin de gouvernance, de résidence européenne des données, et d'agents qui agissent dans vos outils métier réels.",
  },
];

export default async function LangdockVsPageFr() {
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=vs-langdock";

  return (
    <>
      <Hero
        data={heroData}
        ctaHref={diagnosticUrl}
        ctaLabel="Diagnostic 45 min"
      />
      <Problem id="problem" items={problemItems} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">Intégration Odoo native vs connecteurs génériques</h2>
          <ul className="space-y-4 type-body">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>Wonka se connecte nativement à Odoo comme ERP. Les agents lisent le contexte, préparent des actions, et laissent les équipes ops valider avant exécution.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>SharePoint via API Microsoft Graph avec vos credentials.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-text/40">~</span>
              <span>Couverture connecteurs Langdock: vérifier le contenu existant sur wonka-ai.com et /fr/blog/wonka-vs-langdock pour les informations publiques actuelles.</span>
            </li>
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">Certifications que vous pouvez coller</h2>
          <p className="type-body font-medium">
            Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande).
          </p>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">Prouvé avec des équipes ETI françaises</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">Itzu</h3>
              <p className="type-paragraph-m text-text/70">100% des employés sur WonkaChat personnel pour RH et ops.</p>
              <a href="/case-studies/itzu" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Lire le cas client →</a>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">N-allo (Engie)</h3>
              <p className="type-paragraph-m text-text/70">Plus de 70 personnes, réduction de 50% du temps email support.</p>
              <a href="/case-studies/n-allo" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Lire le cas client →</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 type-paragraph-m text-text/60">
            <span>#1 AI Start-up Belgium 2026</span>
            <span>•</span>
            <span>Nvidia Inception</span>
            <span>•</span>
            <span>Microsoft for Startups</span>
            <span>•</span>
            <span>Environ 35 personnes</span>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">Diagnostic de 45 minutes</h2>
          <p className="type-body mb-4">
            Diagnostic avec Gabriel identifie 3 agents prêts pour vos workflows Odoo et SharePoint. Agents de test dans la semaine.
          </p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Wonka se connecte-t-il nativement à Odoo?</h3>
              <p className="type-paragraph-m text-text/60">Oui. Intégration native qui lit les enregistrements Odoo, prépare les actions, et laisse votre équipe valider avant exécution. Pas un wrapper API générique.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Où les données sont-elles hébergées?</h3>
              <p className="type-paragraph-m text-text/60">Azure West Europe (Microsoft Irlande). Certifié ISO 27001, conforme RGPD, conforme NIS 2, SOC 2 Type II en cours.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Combien de temps jusqu'au premier agent pour une entreprise de 50 personnes?</h3>
              <p className="type-paragraph-m text-text/60">Diagnostic de 45 minutes, 3 agents définis pour vos outils. Test en ligne dans la semaine. Déploiement complet 4-8 semaines selon validation.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="type-h4 mb-4">Liens internes</h2>
          <div className="flex flex-wrap justify-center gap-4 type-paragraph-m">
            <a href="/france" className="text-accent hover:underline">France</a>
            <span className="text-text/30">•</span>
            <a href="/security" className="text-accent hover:underline">Sécurité</a>
            <span className="text-text/30">•</span>
            <a href="/wonka-chat" className="text-accent hover:underline">WonkaChat</a>
            <span className="text-text/30">•</span>
            <a href="/fr/wonka-chat/odoo" className="text-accent hover:underline">Odoo</a>
            <span className="text-text/30">•</span>
            <a href="/fr/integrations" className="text-accent hover:underline">Intégrations</a>
            <span className="text-text/30">•</span>
            <a href="/ai-agents" className="text-accent hover:underline">Agents IA</a>
          </div>
        </div>
      </section>

      <Stats id="stats" />
      <div className="pb-20 md:pb-24">
        <Security
          id="security"
          data={{
            eyebrow: null,
            heading: "Vos données restent les vôtres.",
            body: null,
          }}
        />
      </div>
      <Cta
        id="get-started"
        data={{
          heading: "Diagnostic 45 min. 3 agents prêts pour vos outils.",
          body: "Secteur, outils, données, frein, rôle. Deux minutes. Vous voyez le résultat avant de parler à quelqu'un.",
        }}
        meetingUrl={diagnosticUrl}
        meetingLabel="Démarrer diagnostic"
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
