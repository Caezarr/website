import type { Locale } from "@/i18n/config";

export interface TeamMember {
  name: string;
  /** Job title as recorded in Wonka's HR system (Odoo), or on the public site when they differ. Empty until confirmed. */
  role: string;
  /** Path under /public; members without one render a brand-landscape monogram. */
  photo?: string;
}

/**
 * Roster sourced from Odoo hr.employee (active, 07/10/2026). Titles shown on the
 * public site (Jordy Callens "Partner") take precedence over Odoo. Members with an
 * empty role still need their title confirmed before this page is indexed.
 */
export const TEAM: TeamMember[] = [
  { name: "Cédric Gilissen", role: "CEO" },
  { name: "Antoine Percy", role: "CTO" },
  { name: "Florian De Boeck", role: "CPO" },
  { name: "Bilal Errahil", role: "COO" },
  { name: "Jordy Callens", role: "Partner" },
  { name: "Simran Dubey", role: "Chief of Staff" },
  { name: "Nathan De Witte", role: "Business Development Lead" },
  { name: "Maarten Mollie", role: "Account Executive Lead" },
  { name: "Corentin Peyresblanques", role: "Application Product Lead" },
  { name: "Juliette Felix", role: "Project Manager" },
  { name: "Foucauld Bellanger", role: "Project Manager" },
  { name: "Tom Van Nieuwenhuyse", role: "Business Analyst" },
  { name: "Elsa Valet", role: "Business Analyst" },
  { name: "Hugo Vandermosten", role: "Data & AI Engineer" },
  { name: "Julien Lamon", role: "Data & AI Engineer" },
  { name: "Lucy Janssens", role: "Data & AI Engineer" },
  { name: "Fozan Shahid", role: "Data & AI Engineer" },
  { name: "Andrea Zecevic", role: "Data & AI Engineer" },
  { name: "Yevgen Yakovliev", role: "Full-Stack Developer" },
  { name: "Djager Al-Yussef", role: "Software Developer" },
  { name: "Alexis Bonte", role: "Business Developer" },
  { name: "Gilles Liger", role: "Business Developer" },
  { name: "Céline Nagels", role: "HR Consultant" },
  { name: "Florence Vanbelle", role: "Finance & Administration Consultant" },
  { name: "Casper Colpaert", role: "Sales Intern" },
  { name: "Remko Moorkens", role: "Video Content Intern" },
  { name: "Adrien Van Den Branden", role: "" },
  { name: "Gabriel Rance", role: "" },
  { name: "Rodolphe de Schaetzen", role: "" },
  { name: "Léopold Schaller", role: "" },
  { name: "Leon De Landsheer", role: "" },
  { name: "Theau Lepouttre", role: "" },
  { name: "Arthur Pisvin", role: "" },
  { name: "Lucas El Raghibi", role: "" },
  { name: "Younes Baghor", role: "" },
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
