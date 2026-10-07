import type { Locale } from "@/i18n/config";

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public; members without one render a brand-landscape monogram. */
  photo?: string;
}

/** Roster validated by Gabriel (07/10/2026), ordered by seniority: founders, leadership, leads, then teams. */
export const TEAM: TeamMember[] = [
  {
    name: "Cédric Gilissen",
    role: "Co-founder & CEO",
    photo: "/images/team/cedric-gilissen.jpg",
  },
  {
    name: "Antoine Percy",
    role: "Co-founder & CTO",
    photo: "/images/team/antoine-percy.jpg",
  },
  {
    name: "Florian De Boeck",
    role: "CPO",
    photo: "/images/team/florian-de-boeck.jpg",
  },
  {
    name: "Bilal Errahil",
    role: "COO",
    photo: "/images/team/bilal-errahil.jpg",
  },
  {
    name: "Corentin Peyresblanques",
    role: "CISO",
    photo: "/images/team/corentin-peyresblanques.jpg",
  },
  {
    name: "Nathan De Witte",
    role: "Head of Sales",
    photo: "/images/team/nathan-de-witte.jpg",
  },
  {
    name: "Younes Baghor",
    role: "Head of Agentic",
    photo: "/images/team/younes-baghor.jpg",
  },
  {
    name: "Adrien Van Den Branden",
    role: "Go-to-Market & Delivery",
    photo: "/images/team/adrien-van-den-branden.jpg",
  },
  {
    name: "Gabriel Rance",
    role: "Country Manager France",
    photo: "/images/team/gabriel-rance.jpg",
  },
  { name: "Theau Lepouttre", role: "Country Manager Canada" },
  {
    name: "Jordy Callens",
    role: "Start AI Lead",
    photo: "/images/team/jordy-callens.jpg",
  },
  {
    name: "Maarten Mollie",
    role: "Account Executive Lead",
    photo: "/images/team/maarten-mollie.jpg",
  },
  {
    name: "Foucauld Bellanger",
    role: "Tech Lead",
    photo: "/images/team/foucauld-bellanger.jpg",
  },
  {
    name: "Rodolphe de Schaetzen",
    role: "Tech Lead",
    photo: "/images/team/rodolphe-de-schaetzen.jpg",
  },
  {
    name: "Juliette Felix",
    role: "Project Manager",
    photo: "/images/team/juliette-felix.jpg",
  },
  {
    name: "Leon De Landsheer",
    role: "Project Manager",
    photo: "/images/team/leon-de-landsheer.jpg",
  },
  {
    name: "Tom Van Nieuwenhuyse",
    role: "Business Analyst",
    photo: "/images/team/tom-van-nieuwenhuyse.jpg",
  },
  { name: "Hugo Vandermosten", role: "Data & AI Engineer" },
  { name: "Julien Lamon", role: "Data & AI Engineer" },
  {
    name: "Lucy Janssens",
    role: "Data & AI Engineer",
    photo: "/images/team/lucy-janssens.jpg",
  },
  {
    name: "Fozan Shahid",
    role: "Data & AI Engineer",
    photo: "/images/team/fozan-shahid.jpg",
  },
  { name: "Yevgen Yakovliev", role: "Full-Stack Developer" },
  {
    name: "Djager Al-Yussef",
    role: "Software Developer",
    photo: "/images/team/djager-al-yussef.jpg",
  },
  { name: "Elsa Valet", role: "Customer Support Expert" },
  { name: "Alexis Bonte", role: "Business Developer" },
  { name: "Gilles Liger", role: "Business Developer" },
  {
    name: "Léopold Schaller",
    role: "Business Developer",
    photo: "/images/team/leopold-schaller.jpg",
  },
  { name: "Céline Nagels", role: "HR Consultant" },
  { name: "Florence Vanbelle", role: "Finance & Administration Consultant" },
  { name: "Casper Colpaert", role: "Sales Intern" },
  {
    name: "Raffe Vanderbeken Vancauwenbeghe",
    role: "Sales & Marketing Intern",
    photo: "/images/team/raffe-vanderbeken-vancauwenbeghe.jpg",
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
