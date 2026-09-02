import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings, HeroData, SolutionData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/france";
const title = "Wonka AI France - IA d'entreprise déployable";
const description = "IA d'entreprise avec agents et gouvernance. ISO 27001, GDPR, NIS 2. Hébergement Azure West Europe (Microsoft Irlande).";

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

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

const heroData: HeroData = {
  awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
  title: "L'IA d'entreprise qui se déploie vraiment",
  subtitle: "Une bibliothèque d'agents prêts à brancher sur vos outils (ERP, CRM, SharePoint, Teams). Gouvernance centralisée, conformité RGPD.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "Votre ChatGPT perso marche très bien.",
  },
  { tag: "p", content: "Pour les 12 qui savent s'en servir." },
  {
    tag: "p",
    content: "Pour tout le monde ailleurs, le travail avance encore à la main.",
  },
  { tag: "p", content: "Le RSSI n'a aucune visibilité sur ce qui sort de l'entreprise." },
  {
    tag: "p",
    content: "Un agent dans vos outils, ça se gouverne.",
  },
];

const solutionData: SolutionData = {
  eyebrow: "Comment on travaille",
  heading: "Wonka AI fait fonctionner l'IA pour toute votre organisation.",
  body: "La plupart des projets IA ont l'air géniaux le jour du lancement et prennent la poussière à la troisième semaine. On part de vos processus actuels, on travaille à rebours depuis l'usage quotidien, et on reste jusqu'à ce que toute votre équipe l'utilise vraiment.",
  steps: [
    {
      _key: "step-1",
      title: "On part de là où vous êtes.",
      body: "Certaines entreprises viennent avec un cas d'usage clair, d'autres savent juste que l'IA compte mais pas où elle s'intègre. Dans tous les cas, on sait comment avancer.",
    },
    {
      _key: "step-2",
      title: "On construit autour de votre vraie façon de travailler.",
      body: "On ne largue pas un outil générique en espérant que ça colle. On façonne tout autour de la façon dont votre entreprise fonctionne aujourd'hui, pour que ça appartienne dès le premier jour.",
    },
    {
      _key: "step-3",
      title: "On le met entre les mains de votre équipe.",
      body: "Une feuille de route, un build sur mesure, ou un chat IA que tout le monde utilise au quotidien. On livre exactement ce dont votre situation a besoin, et on s'assure que ça atterrit auprès des gens qui vont s'y fier.",
    },
    {
      _key: "step-4",
      title: "On reste jusqu'à ce que tout le monde soit à bord.",
      body: "La plupart des projets IA échouent sur l'adoption, pas sur la technologie. On s'intègre à votre équipe et on reste jusqu'à ce que les gens l'utilisent vraiment, pas juste jusqu'à ce que ce soit en ligne.",
    },
  ],
};

export default async function FrancePage() {
  const settings = await getSiteSettings();
  const franceMeetingUrl = resolveMeetingUrl(settings?.sharedLinks, "france");

  return (
    <>
      <Hero
        data={heroData}
        ctaHref="/france/diagnostic?utm_campaign=france&utm_source=hero"
        ctaLabel="Faire le diagnostic"
      />
      <Problem id="problem" items={problemItems} />
      <Solution id="solution" data={solutionData} />
      <Stats id="stats" />
      <TrustedBy id="trusted-by" />
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
          heading: "En 5 questions, 3 agents prêts pour vos outils.",
          body: "Secteur, outils, données, frein, rôle. Deux minutes. Vous voyez le résultat avant de parler à quelqu'un.",
        }}
        meetingUrl="/france/diagnostic?utm_campaign=france&utm_source=cta"
        meetingLabel="Faire le diagnostic"
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
