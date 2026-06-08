import type { Locale } from "@/i18n/config";
import { hubPath, itemPath } from "@/lib/locale-path";

export interface InternalLink {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}

type DetailSection = "blog" | "case-studies" | "comparisons" | "connectors" | "glossary";

const copy = {
  connectorsHub: {
    eyebrow: { en: "Integrations", fr: "Intégrations", nl: "Integraties" },
    title: { en: "Explore all Wonka connectors", fr: "Explorer tous les connecteurs Wonka", nl: "Bekijk alle Wonka-connectoren" },
    description: {
      en: "Connect private AI to SharePoint, Google Drive, Outlook, Slack, Salesforce, and the systems your teams already use.",
      fr: "Connectez l'IA privée à SharePoint, Google Drive, Outlook, Slack, Salesforce et aux outils déjà utilisés par vos équipes.",
      nl: "Verbind private AI met SharePoint, Google Drive, Outlook, Slack, Salesforce en de tools die je teams al gebruiken.",
    },
  },
  googleDrive: {
    eyebrow: { en: "Connector", fr: "Connecteur", nl: "Connector" },
    title: { en: "Google Drive AI connector", fr: "Connecteur IA Google Drive", nl: "Google Drive AI-connector" },
    description: {
      en: "Turn files and folders into source-aware answers, without moving company data into public AI tools.",
      fr: "Transformez les fichiers et dossiers en réponses sourcées, sans déplacer les données vers des outils IA publics.",
      nl: "Zet bestanden en mappen om in antwoorden met bronnen, zonder bedrijfsdata naar publieke AI-tools te verplaatsen.",
    },
  },
  guide: {
    eyebrow: { en: "Guide", fr: "Guide", nl: "Gids" },
    title: { en: "Agentic AI for Enterprise", fr: "IA agentique pour l'entreprise", nl: "Agentische AI voor enterprise" },
    description: {
      en: "A practical guide to enterprise AI agents, deployment patterns, and high-value use cases.",
      fr: "Un guide pratique sur les agents IA en entreprise, les modèles de déploiement et les cas d'usage à fort impact.",
      nl: "Een praktische gids over AI-agenten voor bedrijven, implementatiepatronen en waardevolle use cases.",
    },
  },
  rag: {
    eyebrow: { en: "Glossary", fr: "Glossaire", nl: "Woordenlijst" },
    title: { en: "RAG explained", fr: "RAG expliqué", nl: "RAG uitgelegd" },
    description: {
      en: "Understand retrieval-augmented generation and why it matters for grounded enterprise AI answers.",
      fr: "Comprendre la génération augmentée par récupération et son rôle pour des réponses IA fiables en entreprise.",
      nl: "Begrijp retrieval-augmented generation en waarom het belangrijk is voor betrouwbare AI-antwoorden in bedrijven.",
    },
  },
  aiAgent: {
    eyebrow: { en: "Glossary", fr: "Glossaire", nl: "Woordenlijst" },
    title: { en: "What is an AI agent?", fr: "Qu'est-ce qu'un agent IA ?", nl: "Wat is een AI-agent?" },
    description: {
      en: "A clear definition of AI agents, how they differ from chatbots, and where companies can use them.",
      fr: "Une définition claire des agents IA, de leur différence avec les chatbots et de leurs usages en entreprise.",
      nl: "Een heldere definitie van AI-agenten, hoe ze verschillen van chatbots en waar bedrijven ze kunnen inzetten.",
    },
  },
  privateLlm: {
    eyebrow: { en: "Comparison", fr: "Comparaison", nl: "Vergelijking" },
    title: { en: "Private LLM vs public LLM", fr: "LLM privé vs LLM public", nl: "Private LLM vs publieke LLM" },
    description: {
      en: "Compare private and public AI deployments for data control, compliance, and enterprise adoption.",
      fr: "Comparez les déploiements IA privés et publics sur le contrôle des données, la conformité et l'adoption.",
      nl: "Vergelijk private en publieke AI-implementaties op datacontrole, compliance en adoptie.",
    },
  },
} as const;

function text(key: keyof typeof copy, locale: Locale): InternalLink {
  const item = copy[key];
  return {
    href: "#",
    eyebrow: item.eyebrow[locale],
    title: item.title[locale],
    description: item.description[locale],
  };
}

export function getEvergreenInternalLinks(locale: Locale, section: DetailSection, currentHref: string): InternalLink[] {
  const links: InternalLink[] = [
    { ...text("connectorsHub", locale), href: hubPath("connectors", locale) },
    { ...text("guide", locale), href: itemPath("blog", locale, {
      en: "agentic-ai-for-enterprise",
      fr: "ia-agentique-entreprise",
      nl: "agentische-ai-enterprise",
    }[locale]) },
    { ...text("rag", locale), href: itemPath("glossary", locale, "rag") },
    { ...text("privateLlm", locale), href: itemPath("comparisons", locale, "private-llm-vs-public-llm") },
  ];

  if (section === "blog" || section === "glossary") {
    links.splice(1, 0, { ...text("googleDrive", locale), href: itemPath("connectors", locale, "google-drive") });
  }

  if (section === "connectors") {
    links.splice(2, 0, { ...text("aiAgent", locale), href: itemPath("glossary", locale, "ai-agent") });
  }

  return links.filter((link) => link.href !== currentHref).slice(0, 4);
}
