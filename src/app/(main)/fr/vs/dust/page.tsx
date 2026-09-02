import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import type { HeroData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/fr/vs/dust";
const title = "Alternative Dust AI pour ETI françaises | Wonka vs Dust";
const description = "L'alternative Dust pour ceux qui arbitrent le SI des ETI françaises. Agents IA dans Odoo et SharePoint. Données en Azure West Europe.";

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
  title: "L'alternative Dust pour ceux qui arbitrent le SI des ETI françaises",
  subtitle: "Agents IA dans Odoo et SharePoint. Données en Azure West Europe. Diagnostic 45 min avec Gabriel.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "Dust est le terme de recherche. ChatGPT perso reste le vrai concurrent.",
  },
  {
    tag: "p",
    content: "Votre équipe utilise déjà ChatGPT sur des comptes personnels.",
  },
  {
    tag: "p",
    content: "Les directions informatiques d'ETI françaises savent qu'elles ont besoin de gouvernance, de résidence des données en Europe, et d'agents qui agissent dans vos outils réels (Odoo, SharePoint) plutôt que juste du chat.",
  },
];

export default async function DustVsPageFr() {
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=vs-dust";

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
          <h2 className="type-h4 mb-6">Pour les ETI françaises avec Odoo et SharePoint</h2>
          <ul className="space-y-4 type-body">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>Si vous utilisez Odoo comme ERP et SharePoint pour les documents, Wonka se connecte nativement.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>Les agents lisent le contexte Odoo, suggèrent des actions, et laissent les équipes ops valider avant exécution.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>La connexion SharePoint fonctionne via l'API Microsoft Graph avec vos credentials.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-text/40">~</span>
              <span>Dust offre 66 connecteurs publics dont SharePoint, Salesforce, Slack, Notion, ServiceNow, mais PAS Odoo. Des connecteurs MCP personnalisés sont possibles mais nécessitent un effort de développement.</span>
            </li>
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">Certifications et conformité</h2>
          <p className="type-body mb-4 font-medium">
            Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande).
          </p>
          <p className="type-paragraph-m text-text/60">
            Dust: certifié SOC 2 Type II, RGPD, activation HIPAA. ISO 27001 non listé sur leur page sécurité publique en août 2026.
          </p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">Tableau comparatif</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-background">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-text/[0.03]">
                  <th className="px-5 py-4 type-paragraph-m-bold">Critère</th>
                  <th className="px-5 py-4 type-paragraph-m-bold text-text/50">ChatGPT perso</th>
                  <th className="px-5 py-4 type-paragraph-m-bold text-text/50">Dust</th>
                  <th className="px-5 py-4 type-paragraph-m-bold text-accent">Wonka</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Localisation données</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">US (OpenAI)</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Cloud, multi-région</td>
                  <td className="px-5 py-4 type-paragraph-m">Azure West Europe</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Qui utilise les agents</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Comptes personnels</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Workspace org</td>
                  <td className="px-5 py-4 type-paragraph-m">Workspace org</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Odoo natif</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Non</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">MCP personnalisé</td>
                  <td className="px-5 py-4 type-paragraph-m">Oui</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">SharePoint</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Non</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Oui (connecteur)</td>
                  <td className="px-5 py-4 type-paragraph-m">Oui (Graph API)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">ISO 27001</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">N/A</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Non listé publiquement</td>
                  <td className="px-5 py-4 type-paragraph-m">Certifié</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Autre conformité</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">N/A</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">SOC 2 Type II, RGPD, HIPAA</td>
                  <td className="px-5 py-4 type-paragraph-m">RGPD, NIS 2, SOC 2 en cours</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Hébergement EU</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Non</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Option multi-région</td>
                  <td className="px-5 py-4 type-paragraph-m">Azure West Europe par défaut</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Délai premier agent utile</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Immédiat</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Variable</td>
                  <td className="px-5 py-4 type-paragraph-m">Diagnostic 45 min + 1 semaine</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Tarifs publics</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">20$/mois</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Pro 24$/siège/an, Max 120$</td>
                  <td className="px-5 py-4 type-paragraph-m">21,60€ HT/user/mois</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 type-paragraph-m">Essai</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Gratuit limité</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Voir dust.tt</td>
                  <td className="px-5 py-4 type-paragraph-m">7 jours sans carte</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">Preuves: Itzu et N-allo</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">Itzu</h3>
              <p className="type-paragraph-m text-text/70">100% des employés sur WonkaChat personnel. Heures économisées par personne chaque semaine sur les workflows RH et ops.</p>
              <a href="/case-studies/itzu" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Lire le cas client →</a>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">N-allo (Engie)</h3>
              <p className="type-paragraph-m text-text/70">Équipe de plus de 70 personnes, réduction de 50% du temps de traitement des emails support. N'a jamais opéré à 70% de capacité.</p>
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
            <span>~35 personnes</span>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">FAQ pour les directions informatiques</h2>
          <div className="space-y-6">
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Wonka se connecte-t-il nativement à Odoo?</h3>
              <p className="type-paragraph-m text-text/60">Oui. Wonka lit les enregistrements Odoo, prépare des actions (créer devis, mettre à jour livraison), et laisse votre équipe ops valider avant exécution. C'est une intégration native, pas un connecteur API générique.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Où les données sont-elles traitées?</h3>
              <p className="type-paragraph-m text-text/60">Azure West Europe (Microsoft Irlande) par défaut. Vos données ne quittent jamais l'infrastructure européenne. SOC 2 Type II en cours, certifié ISO 27001, conforme RGPD et NIS 2.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Combien de temps pour déployer pour une ETI de 50 personnes?</h3>
              <p className="type-paragraph-m text-text/60">Diagnostic de 45 minutes, 3 agents définis pour vos workflows Odoo et SharePoint. Agents de test en ligne dans la semaine. Déploiement complet selon cycles de validation, typiquement 4-8 semaines.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Les directions informatiques peuvent-elles coller la ligne de conformité?</h3>
              <p className="type-paragraph-m text-text/60">Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande).</p>
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
            <a href="/fr/integrations/odoo" className="text-accent hover:underline">Intégration Odoo</a>
            <span className="text-text/30">•</span>
            <a href="/fr/integrations/sharepoint" className="text-accent hover:underline">Intégration SharePoint</a>
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
          heading: "Diagnostic 45 min. 3 agents prêts pour votre Odoo et SharePoint.",
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
