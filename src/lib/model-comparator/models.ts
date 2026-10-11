import type { Locale } from "@/i18n/config";

/** Date of the last editorial review of the assessments below (ISO, UTC). */
export const LAST_REVIEWED = "2026-10-11";

export const TASK_IDS = [
  "writing",
  "summarising",
  "dataAnalysis",
  "coding",
  "reasoning",
  "translation",
  "imageUnderstanding",
  "fastChat",
] as const;
export type TaskId = (typeof TASK_IDS)[number];

export const PRIORITY_IDS = ["quality", "speed", "cost", "sovereignty"] as const;
export type PriorityId = (typeof PRIORITY_IDS)[number];

export type Score = 1 | 2 | 3 | 4 | 5;
/** Qualitative context-window class, not a token count. */
export type ContextClass = "standard" | "large" | "veryLarge";
/** 1 = thorough, 2 = balanced, 3 = fast. */
export type SpeedTier = 1 | 2 | 3;
/** Relative cost: 1 = €, 2 = €€, 3 = €€€. Exact prices live on /pricing. */
export type CostTier = 1 | 2 | 3;
export type ProviderHq = "us" | "fr";

export interface ComparatorModel {
  id: string;
  /** Model family name, never translated. */
  name: string;
  provider: string;
  providerHq: ProviderHq;
  openWeight: boolean;
  context: ContextClass;
  speed: SpeedTier;
  cost: CostTier;
  /** EU sovereignty fit (provider jurisdiction + hosting options), 1–5. */
  sovereignty: Score;
  /** Wonka's practical assessment per task, 1–5. Not a benchmark. */
  scores: Record<TaskId, Score>;
  strengths: Record<Locale, string>;
  hosting: Record<Locale, string>;
}

// TODO(gabriel): confirm list against WonkaChat Config. Taken from what the site
// already advertises: "GPT, Claude, Mistral et Gemini" (ads landings, BTP page)
// plus open models "Llama, Mistral" (comparison table). Mistral Small is an
// assumption for the fast/economical tier.
// The UI stays at family level. Current flagship versions in WonkaChat:
// GPT-5.6 Luna (GPT) and Mistral Large 4 (Mistral Large).
// Hosting notes describe provider HQ/jurisdiction only, so they stay true
// whatever region WonkaChat routes a given model to.
export const MODELS: readonly ComparatorModel[] = [
  {
    id: "openai-gpt",
    name: "GPT",
    provider: "OpenAI",
    providerHq: "us",
    openWeight: false,
    context: "large",
    speed: 2,
    cost: 3,
    sovereignty: 3,
    scores: {
      writing: 5,
      summarising: 4,
      dataAnalysis: 5,
      coding: 5,
      reasoning: 5,
      translation: 5,
      imageUnderstanding: 5,
      fastChat: 3,
    },
    strengths: {
      en: "A strong all-rounder: writing, data analysis, coding and multilingual work, with solid image understanding.",
      fr: "Un modèle polyvalent : rédaction, analyse de données, code et travail multilingue, avec une bonne compréhension des images.",
      nl: "Een sterke alleskunner: schrijven, data-analyse, code en meertalig werk, met goed beeldbegrip.",
    },
    hosting: {
      en: "US provider, under US jurisdiction. EU hosting options exist.",
      fr: "Éditeur américain, soumis au droit américain. Des options d'hébergement dans l'UE existent.",
      nl: "Amerikaanse aanbieder, onder Amerikaans recht. Er bestaan hostingopties in de EU.",
    },
  },
  {
    id: "anthropic-claude",
    name: "Claude",
    provider: "Anthropic",
    providerHq: "us",
    openWeight: false,
    context: "large",
    speed: 2,
    cost: 3,
    sovereignty: 3,
    scores: {
      writing: 5,
      summarising: 5,
      dataAnalysis: 4,
      coding: 5,
      reasoning: 5,
      translation: 4,
      imageUnderstanding: 4,
      fastChat: 3,
    },
    strengths: {
      en: "Careful long-form writing, long documents and coding. Follows detailed instructions closely.",
      fr: "Rédaction longue et soignée, documents volumineux et code. Suit de près des consignes détaillées.",
      nl: "Zorgvuldig lang schrijfwerk, lange documenten en code. Volgt gedetailleerde instructies nauwgezet.",
    },
    hosting: {
      en: "US provider, under US jurisdiction. EU hosting options exist.",
      fr: "Éditeur américain, soumis au droit américain. Des options d'hébergement dans l'UE existent.",
      nl: "Amerikaanse aanbieder, onder Amerikaans recht. Er bestaan hostingopties in de EU.",
    },
  },
  {
    id: "google-gemini",
    name: "Gemini",
    provider: "Google",
    providerHq: "us",
    openWeight: false,
    context: "veryLarge",
    speed: 2,
    cost: 2,
    sovereignty: 3,
    scores: {
      writing: 4,
      summarising: 5,
      dataAnalysis: 4,
      coding: 4,
      reasoning: 4,
      translation: 4,
      imageUnderstanding: 5,
      fastChat: 4,
    },
    strengths: {
      en: "Very long context with strong image and document understanding. A natural fit for very large files.",
      fr: "Contexte très long, bonne compréhension des images et des documents. Adapté aux fichiers très volumineux.",
      nl: "Zeer lange context met sterk beeld- en documentbegrip. Geschikt voor zeer grote bestanden.",
    },
    hosting: {
      en: "US provider, under US jurisdiction. EU hosting options exist.",
      fr: "Éditeur américain, soumis au droit américain. Des options d'hébergement dans l'UE existent.",
      nl: "Amerikaanse aanbieder, onder Amerikaans recht. Er bestaan hostingopties in de EU.",
    },
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    providerHq: "fr",
    openWeight: false,
    context: "large",
    speed: 2,
    cost: 2,
    sovereignty: 5,
    scores: {
      writing: 4,
      summarising: 4,
      dataAnalysis: 3,
      coding: 4,
      reasoning: 4,
      translation: 5,
      imageUnderstanding: 3,
      fastChat: 4,
    },
    strengths: {
      en: "Mistral AI's flagship model: at ease in French and other European languages, good at writing and reasoning.",
      fr: "Le modèle phare de Mistral AI : à l'aise en français et dans les autres langues européennes, bon en rédaction et en raisonnement.",
      nl: "Het vlaggenschipmodel van Mistral AI: sterk in het Frans en andere Europese talen, goed in schrijven en redeneren.",
    },
    hosting: {
      en: "French provider headquartered in Paris, under EU jurisdiction. EU hosting options exist.",
      fr: "Éditeur français basé à Paris, soumis au droit européen. Des options d'hébergement dans l'UE existent.",
      nl: "Franse aanbieder met hoofdzetel in Parijs, onder Europees recht. Er bestaan hostingopties in de EU.",
    },
  },
  {
    id: "mistral-small",
    name: "Mistral Small",
    provider: "Mistral AI",
    providerHq: "fr",
    openWeight: false,
    context: "standard",
    speed: 3,
    cost: 1,
    sovereignty: 5,
    scores: {
      writing: 3,
      summarising: 3,
      dataAnalysis: 2,
      coding: 3,
      reasoning: 2,
      translation: 4,
      imageUnderstanding: 2,
      fastChat: 5,
    },
    strengths: {
      en: "Fast and economical for everyday chat, short drafts, sorting and simple translations.",
      fr: "Rapide et économique pour le chat du quotidien, les brouillons courts, le tri et les traductions simples.",
      nl: "Snel en voordelig voor dagelijkse chat, korte concepten, sorteren en eenvoudige vertalingen.",
    },
    hosting: {
      en: "French provider headquartered in Paris, under EU jurisdiction. EU hosting options exist.",
      fr: "Éditeur français basé à Paris, soumis au droit européen. Des options d'hébergement dans l'UE existent.",
      nl: "Franse aanbieder met hoofdzetel in Parijs, onder Europees recht. Er bestaan hostingopties in de EU.",
    },
  },
  {
    id: "meta-llama",
    name: "Llama",
    provider: "Meta",
    providerHq: "us",
    openWeight: true,
    context: "large",
    speed: 3,
    cost: 1,
    sovereignty: 4,
    scores: {
      writing: 3,
      summarising: 3,
      dataAnalysis: 3,
      coding: 3,
      reasoning: 3,
      translation: 3,
      imageUnderstanding: 2,
      fastChat: 4,
    },
    strengths: {
      en: "Open-weight model family: runs on infrastructure you choose, a cost-effective option for standard tasks.",
      fr: "Famille de modèles à poids ouverts : elle tourne sur l'infrastructure de votre choix, une option économique pour les tâches courantes.",
      nl: "Modelfamilie met open gewichten: draait op infrastructuur naar keuze, een voordelige optie voor standaardtaken.",
    },
    hosting: {
      en: "Open weights published by Meta (US) under its licence terms. Can be hosted in the EU or on your own servers.",
      fr: "Poids ouverts publiés par Meta (États-Unis) selon ses conditions de licence. Peut être hébergé dans l'UE ou sur vos propres serveurs.",
      nl: "Open gewichten gepubliceerd door Meta (VS) onder eigen licentievoorwaarden. Kan in de EU of op uw eigen servers gehost worden.",
    },
  },
];
