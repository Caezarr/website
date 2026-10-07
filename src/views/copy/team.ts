import type { Locale } from "@/i18n/config";

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public; members without one render a brand-landscape monogram. */
  photo?: string;
}

/** Roster validated by Gabriel (07/10/2026), ordered by seniority: founders, leadership, leads, then teams. */
export const TEAM: TeamMember[] = [
  { name: "Cédric Gilissen", role: "Co-founder & CEO" },
  { name: "Antoine Percy", role: "Co-founder & CTO" },
  { name: "Florian De Boeck", role: "CPO" },
  { name: "Bilal Errahil", role: "COO" },
  { name: "Corentin Peyresblanques", role: "CISO" },
  { name: "Adrien Van Den Branden", role: "Go-to-Market & Delivery" },
  { name: "Nathan De Witte", role: "Head of Sales" },
  { name: "Younes Baghor", role: "Head of Agentic" },
  { name: "Jordy Callens", role: "Start AI Lead" },
  { name: "Gabriel Rance", role: "Country Manager France" },
  { name: "Theau Lepouttre", role: "Country Manager Canada" },
  { name: "Maarten Mollie", role: "Account Executive Lead" },
  { name: "Foucauld Bellanger", role: "Tech Lead" },
  { name: "Rodolphe de Schaetzen", role: "Tech Lead" },
  { name: "Juliette Felix", role: "Project Manager" },
  { name: "Leon De Landsheer", role: "The Launcher Project Manager" },
  { name: "Tom Van Nieuwenhuyse", role: "Business Analyst" },
  { name: "Hugo Vandermosten", role: "Data & AI Engineer" },
  { name: "Julien Lamon", role: "Data & AI Engineer" },
  { name: "Lucy Janssens", role: "Data & AI Engineer" },
  { name: "Fozan Shahid", role: "Data & AI Engineer" },
  { name: "Yevgen Yakovliev", role: "Full-Stack Developer" },
  { name: "Djager Al-Yussef", role: "Software Developer" },
  { name: "Elsa Valet", role: "Customer Support Expert" },
  { name: "Alexis Bonte", role: "Business Developer" },
  { name: "Gilles Liger", role: "Business Developer" },
  { name: "Léopold Schaller", role: "Business Developer" },
  { name: "Céline Nagels", role: "HR Consultant" },
  { name: "Florence Vanbelle", role: "Finance & Administration Consultant" },
  { name: "Casper Colpaert", role: "Sales Intern" },
  {
    name: "Raffe Vanderbeken Vancauwenbeghe",
    role: "Sales & Marketing Intern",
  },
];

export interface TeamPageCopy {
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  body: string;
  countLabel: string;
  ctaTitle: string;
  ctaBody: string;
  cta: string;
}

export const TEAM_PAGE_COPY: Record<Locale, TeamPageCopy> = {
  en: {
    seo: {
      title: "Team | Wonka AI",
      description:
        "The AI consultants, engineers and product people behind WonkaChat.",
    },
    eyebrow: "The team",
    title: "The people who put AI to work in your company.",
    body: "Consultants, engineers and product people based in Belgium and France. They set up your agents with you and stay until they run.",
    countLabel: "people",
    ctaTitle: "Talk to one of them about your use case.",
    ctaBody:
      "A first conversation is enough to find the agent that will save your teams the most time.",
    cta: "Talk to a consultant",
  },
  fr: {
    seo: {
      title: "Équipe | Wonka AI",
      description:
        "Les consultants IA, ingénieurs et product builders derrière WonkaChat.",
    },
    eyebrow: "L'équipe",
    title: "Les personnes qui mettent l'IA au travail dans votre entreprise.",
    body: "Consultants, ingénieurs et product builders basés en Belgique et en France. Ils mettent vos agents en place avec vous et restent jusqu'à ce qu'ils tournent.",
    countLabel: "personnes",
    ctaTitle: "Parlez de votre cas d'usage à l'un d'entre eux.",
    ctaBody:
      "Une première conversation suffit pour trouver l'agent qui fera gagner le plus de temps à vos équipes.",
    cta: "Parler à un consultant",
  },
  nl: {
    seo: {
      title: "Team | Wonka AI",
      description:
        "De AI-consultants, engineers en productmensen achter WonkaChat.",
    },
    eyebrow: "Het team",
    title: "De mensen die AI aan het werk zetten in uw bedrijf.",
    body: "Consultants, engineers en productmensen in België en Frankrijk. Ze zetten uw agents samen met u op en blijven tot ze draaien.",
    countLabel: "mensen",
    ctaTitle: "Bespreek uw use case met een van hen.",
    ctaBody:
      "Eén eerste gesprek volstaat om de agent te vinden die uw teams de meeste tijd bespaart.",
    cta: "Spreek een consultant",
  },
};
