import type { Locale } from "@/i18n/config";
import type { ContextClass, CostTier, PriorityId, ProviderHq, SpeedTier, TaskId } from "@/lib/model-comparator/models";
import type { ReasonCode } from "@/lib/model-comparator/rank";

export interface ModelComparatorCopy {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    /** `{date}` is replaced with the localized review month. */
    reviewed: string;
    assessment: string;
  };
  picker: {
    heading: string;
    tasksLabel: string;
    tasksHint: string;
    prioritiesLabel: string;
    prioritiesHint: string;
    reset: string;
  };
  tasks: Record<TaskId, string>;
  priorities: Record<PriorityId, string>;
  results: {
    heading: string;
    forTasks: string;
    allTasks: string;
    /** `{n}` is replaced with the match percentage. */
    match: string;
    why: string;
    bestPick: string;
    /** Screen-reader status after each change. `{model}` is the top model. */
    announce: string;
  };
  /** `{task}` is replaced with the task label. */
  reasonTask: string;
  reasons: Record<ReasonCode, string>;
  table: {
    heading: string;
    body: string;
    caption: string;
    model: string;
    match: string;
    provider: string;
    hq: string;
    context: string;
    speed: string;
    cost: string;
    sovereignty: string;
    hosting: string;
    strengths: string;
    sortHint: string;
    scoreOutOf: string;
  };
  hqLabels: Record<ProviderHq, string>;
  openWeight: string;
  contextLabels: Record<ContextClass, string>;
  speedLabels: Record<SpeedTier, string>;
  costLabels: Record<CostTier, string>;
  methodology: { heading: string; items: string[] };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    trial: string;
    meeting: string;
    pricing: string;
  };
  faq: { heading: string; items: { question: string; answer: string }[] };
}

const COST_SYMBOLS: Record<CostTier, string> = { 1: "€", 2: "€€", 3: "€€€" };

const en: ModelComparatorCopy = {
  seo: {
    title: "AI Model Comparator: GPT, Claude, Mistral, Gemini | Wonka AI",
    description:
      "Which AI model for which task? Compare GPT, Claude, Mistral, Gemini and Llama on writing, analysis, coding, translation, speed, cost and EU sovereignty. Free tool.",
  },
  hero: {
    eyebrow: "Free tool",
    title: "Which AI model for which task?",
    body: "Pick your tasks and priorities to see which model fits best. WonkaChat gives your team access to the main models in one secure workspace.",
    reviewed: "Reviewed {date}",
    assessment: "Scores are Wonka's practical assessment of everyday business tasks, not benchmark results.",
  },
  picker: {
    heading: "Tell us what you need",
    tasksLabel: "Your tasks",
    tasksHint: "Select one or more. None selected means all tasks.",
    prioritiesLabel: "Your priorities",
    prioritiesHint: "Quality always counts. Add what matters most to you.",
    reset: "Reset",
  },
  tasks: {
    writing: "Writing & emails",
    summarising: "Summarising long documents",
    dataAnalysis: "Data analysis & Excel",
    coding: "Coding",
    reasoning: "Reasoning & strategy",
    translation: "Translation FR/NL/EN",
    imageUnderstanding: "Image understanding",
    fastChat: "Speed-critical chat",
  },
  priorities: {
    quality: "Quality",
    speed: "Speed",
    cost: "Cost",
    sovereignty: "EU sovereignty",
  },
  results: {
    heading: "Recommended models",
    forTasks: "For",
    allTasks: "all tasks",
    match: "{n}% fit",
    why: "Why",
    bestPick: "Best fit",
    announce: "Best fit: {model}",
  },
  reasonTask: "Strong at {task}",
  reasons: {
    fast: "Among the fastest in this comparison",
    lowCost: "Lowest cost tier",
    midCost: "Mid cost tier",
    euProvider: "European provider, EU hosting options",
    openWeight: "Open weights, can be self-hosted",
    veryLargeContext: "Handles very large documents",
  },
  table: {
    heading: "Full comparison",
    body: "The main model families, side by side. Select a column to sort.",
    caption: "AI models compared by task, speed, cost and EU sovereignty",
    model: "Model",
    match: "Fit %",
    provider: "Provider",
    hq: "Headquarters",
    context: "Context",
    speed: "Speed",
    cost: "Cost",
    sovereignty: "EU sovereignty",
    hosting: "Hosting",
    strengths: "Strengths",
    sortHint: "Sort by",
    scoreOutOf: "out of 5",
  },
  hqLabels: { us: "United States", fr: "France" },
  openWeight: "Open weights",
  contextLabels: { standard: "Standard", large: "Large", veryLarge: "Very large" },
  speedLabels: { 1: "Thorough", 2: "Balanced", 3: "Fast" },
  costLabels: COST_SYMBOLS,
  methodology: {
    heading: "How to read these scores",
    items: [
      "Scores from 1 to 5 reflect Wonka's practical assessment of business use: emails, reports, spreadsheets, code and multilingual work. They are not benchmark results.",
      "Cost tiers are relative to each other. For actual prices, see our pricing page.",
      "EU sovereignty combines the provider's home jurisdiction and the hosting options available in the EU.",
      "Models evolve quickly. We review this page regularly and date each review.",
    ],
  },
  cta: {
    eyebrow: "WonkaChat",
    heading: "Use the right model for each task in WonkaChat.",
    body: "No need to pick one provider. Your team switches model per task or per agent, in one secure workspace connected to your tools.",
    trial: "Start free trial",
    meeting: "Book a demo",
    pricing: "See pricing",
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "What is the best AI model for business?",
        answer:
          "There is no single best model. GPT and Claude are strong all-rounders, Gemini handles very large documents well, Mistral is a European option at ease in French, and smaller models like Mistral Small are fast and economical for everyday tasks. The right choice depends on the task, which is why WonkaChat lets your team switch model per task.",
      },
      {
        question: "GPT vs Claude vs Mistral: which one should we choose?",
        answer:
          "Use each where it fits: GPT for broad analysis and multilingual work, Claude for careful long-form writing and long documents, Mistral when you want a European provider or strong French. In WonkaChat you can switch model per conversation or per agent, so you don't have to commit to one.",
      },
      {
        question: "Which AI models are hosted in the EU?",
        answer:
          "Mistral AI is a French provider headquartered in Paris. GPT, Claude and Gemini come from US providers. EU hosting options exist for all of them, and open-weight models such as Llama can be hosted wherever you choose. WonkaChat runs on Microsoft Azure West Europe (Ireland) and includes EU-hosted AI models.",
      },
      {
        question: "How were these scores established?",
        answer:
          "They are Wonka's practical assessment of typical business tasks. They are not benchmark numbers, and they are reviewed regularly as models change.",
      },
      {
        question: "Can we use several AI models with one subscription?",
        answer:
          "Yes. WonkaChat includes the main models from OpenAI, Anthropic, Google and Mistral in one workspace. You can also bring your own model API key. See the pricing page for details.",
      },
      {
        question: "Is our data used to train the models?",
        answer:
          "Not through WonkaChat. Your conversations and documents are not used to train AI models. Wonka AI is ISO 27001 certified and GDPR compliant.",
      },
    ],
  },
};

const fr: ModelComparatorCopy = {
  seo: {
    title: "Comparatif des modèles d'IA : GPT, Claude, Mistral, Gemini | Wonka AI",
    description:
      "Quel modèle d'IA pour quelle tâche ? Comparez GPT, Claude, Mistral, Gemini et Llama : rédaction, analyse, code, traduction, vitesse, coût et souveraineté. Outil gratuit.",
  },
  hero: {
    eyebrow: "Outil gratuit",
    title: "Quel modèle d'IA pour quelle tâche ?",
    body: "Choisissez vos tâches et vos priorités pour voir le modèle le plus adapté. WonkaChat donne à votre équipe accès aux principaux modèles, dans un seul espace sécurisé.",
    reviewed: "Mis à jour en {date}",
    assessment: "Les notes reflètent l'évaluation pratique de Wonka sur des tâches professionnelles courantes. Ce ne sont pas des résultats de benchmark.",
  },
  picker: {
    heading: "Décrivez votre besoin",
    tasksLabel: "Vos tâches",
    tasksHint: "Sélectionnez une ou plusieurs tâches. Sans sélection, toutes les tâches comptent.",
    prioritiesLabel: "Vos priorités",
    prioritiesHint: "La qualité compte toujours. Ajoutez ce qui compte le plus pour vous.",
    reset: "Réinitialiser",
  },
  tasks: {
    writing: "Rédaction et e-mails",
    summarising: "Synthèse de longs documents",
    dataAnalysis: "Analyse de données et Excel",
    coding: "Code",
    reasoning: "Raisonnement et stratégie",
    translation: "Traduction FR/NL/EN",
    imageUnderstanding: "Compréhension d'images",
    fastChat: "Chat où la vitesse compte",
  },
  priorities: {
    quality: "Qualité",
    speed: "Vitesse",
    cost: "Coût",
    sovereignty: "Souveraineté européenne",
  },
  results: {
    heading: "Modèles recommandés",
    forTasks: "Pour",
    allTasks: "toutes les tâches",
    match: "Adéquation {n} %",
    why: "Pourquoi",
    bestPick: "Le plus adapté",
    announce: "Le plus adapté : {model}",
  },
  reasonTask: "Fort en {task}",
  reasons: {
    fast: "Parmi les plus rapides de ce comparatif",
    lowCost: "Niveau de coût le plus bas",
    midCost: "Niveau de coût intermédiaire",
    euProvider: "Éditeur européen, options d'hébergement dans l'UE",
    openWeight: "Poids ouverts, auto-hébergeable",
    veryLargeContext: "Gère de très gros documents",
  },
  table: {
    heading: "Comparatif complet",
    body: "Les principales familles de modèles, côte à côte. Sélectionnez une colonne pour trier.",
    caption: "Modèles d'IA comparés par tâche, vitesse, coût et souveraineté européenne",
    model: "Modèle",
    match: "Adéquation %",
    provider: "Éditeur",
    hq: "Siège",
    context: "Contexte",
    speed: "Vitesse",
    cost: "Coût",
    sovereignty: "Souveraineté UE",
    hosting: "Hébergement",
    strengths: "Points forts",
    sortHint: "Trier par",
    scoreOutOf: "sur 5",
  },
  hqLabels: { us: "États-Unis", fr: "France" },
  openWeight: "Poids ouverts",
  contextLabels: { standard: "Standard", large: "Long", veryLarge: "Très long" },
  speedLabels: { 1: "Approfondi", 2: "Équilibré", 3: "Rapide" },
  costLabels: COST_SYMBOLS,
  methodology: {
    heading: "Comment lire ces notes",
    items: [
      "Les notes de 1 à 5 reflètent l'évaluation pratique de Wonka pour un usage professionnel : e-mails, rapports, tableurs, code et travail multilingue. Ce ne sont pas des résultats de benchmark.",
      "Les niveaux de coût sont relatifs entre les modèles. Pour les prix réels, consultez notre page tarifs.",
      "La souveraineté européenne combine la juridiction de l'éditeur et les options d'hébergement disponibles dans l'UE.",
      "Les modèles évoluent vite. Nous révisons cette page régulièrement et datons chaque révision.",
    ],
  },
  cta: {
    eyebrow: "WonkaChat",
    heading: "Utilisez le bon modèle pour chaque tâche dans WonkaChat.",
    body: "Inutile de choisir un seul éditeur. Votre équipe change de modèle selon la tâche ou l'agent, dans un seul espace sécurisé connecté à vos outils.",
    trial: "Démarrer l'essai gratuit",
    meeting: "Réserver une démo",
    pricing: "Voir les tarifs",
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        question: "Quel est le meilleur modèle d'IA pour une entreprise ?",
        answer:
          "Il n'y a pas de meilleur modèle unique. GPT et Claude sont très polyvalents, Gemini gère bien les très gros documents, Mistral est une option européenne à l'aise en français, et des modèles plus légers comme Mistral Small sont rapides et économiques pour les tâches courantes. Le bon choix dépend de la tâche : c'est pourquoi WonkaChat permet à votre équipe de changer de modèle selon la tâche.",
      },
      {
        question: "GPT, Claude ou Mistral : lequel choisir ?",
        answer:
          "Utilisez chacun là où il est le plus utile : GPT pour l'analyse et le travail multilingue, Claude pour la rédaction longue et les documents volumineux, Mistral pour un éditeur européen ou un français soigné. Dans WonkaChat, vous changez de modèle par conversation ou par agent, sans vous engager sur un seul.",
      },
      {
        question: "Quels modèles d'IA sont hébergés dans l'UE ?",
        answer:
          "Mistral AI est un éditeur français basé à Paris. GPT, Claude et Gemini viennent d'éditeurs américains. Des options d'hébergement dans l'UE existent pour chacun d'eux, et les modèles à poids ouverts comme Llama peuvent être hébergés où vous le souhaitez. WonkaChat est hébergé sur Microsoft Azure West Europe (Irlande) et inclut des modèles d'IA hébergés dans l'UE.",
      },
      {
        question: "Comment ces notes ont-elles été établies ?",
        answer:
          "Il s'agit de l'évaluation pratique de Wonka sur des tâches professionnelles courantes. Ce ne sont pas des chiffres de benchmark, et nous les révisons régulièrement au fil de l'évolution des modèles.",
      },
      {
        question: "Peut-on utiliser plusieurs modèles d'IA avec un seul abonnement ?",
        answer:
          "Oui. WonkaChat inclut les principaux modèles d'OpenAI, Anthropic, Google et Mistral dans un seul espace. Vous pouvez aussi utiliser votre propre clé API. Consultez la page tarifs pour le détail.",
      },
      {
        question: "Nos données servent-elles à entraîner les modèles ?",
        answer:
          "Pas via WonkaChat. Vos conversations et vos documents ne servent pas à entraîner des modèles d'IA. Wonka AI est certifiée ISO 27001 et conforme au RGPD.",
      },
    ],
  },
};

const nl: ModelComparatorCopy = {
  seo: {
    title: "AI-modellen vergelijken: GPT, Claude, Mistral, Gemini | Wonka AI",
    description:
      "Welk AI-model voor welke taak? Vergelijk GPT, Claude, Mistral, Gemini en Llama op schrijven, analyse, code, vertaling, snelheid, kost en Europese soevereiniteit. Gratis tool.",
  },
  hero: {
    eyebrow: "Gratis tool",
    title: "Welk AI-model voor welke taak?",
    body: "Kies uw taken en prioriteiten en zie welk model het best past. WonkaChat geeft uw team toegang tot de belangrijkste modellen, in één beveiligde werkruimte.",
    reviewed: "Herzien in {date}",
    assessment: "De scores zijn Wonka's praktijkbeoordeling voor typische zakelijke taken, geen benchmarkresultaten.",
  },
  picker: {
    heading: "Wat heeft u nodig?",
    tasksLabel: "Uw taken",
    tasksHint: "Kies er één of meer. Zonder selectie tellen alle taken.",
    prioritiesLabel: "Uw prioriteiten",
    prioritiesHint: "Kwaliteit telt altijd. Voeg toe wat voor u het zwaarst weegt.",
    reset: "Opnieuw instellen",
  },
  tasks: {
    writing: "Schrijven en e-mails",
    summarising: "Lange documenten samenvatten",
    dataAnalysis: "Data-analyse en Excel",
    coding: "Code",
    reasoning: "Redeneren en strategie",
    translation: "Vertalen FR/NL/EN",
    imageUnderstanding: "Beeldbegrip",
    fastChat: "Chat waar snelheid telt",
  },
  priorities: {
    quality: "Kwaliteit",
    speed: "Snelheid",
    cost: "Kost",
    sovereignty: "Europese soevereiniteit",
  },
  results: {
    heading: "Aanbevolen modellen",
    forTasks: "Voor",
    allTasks: "alle taken",
    match: "{n}% match",
    why: "Waarom",
    bestPick: "Beste keuze",
    announce: "Beste keuze: {model}",
  },
  reasonTask: "Sterk in {task}",
  reasons: {
    fast: "Bij de snelste in deze vergelijking",
    lowCost: "Laagste kostenniveau",
    midCost: "Gemiddeld kostenniveau",
    euProvider: "Europese aanbieder, hostingopties in de EU",
    openWeight: "Open gewichten, zelf te hosten",
    veryLargeContext: "Kan zeer grote documenten aan",
  },
  table: {
    heading: "Volledige vergelijking",
    body: "De belangrijkste modelfamilies naast elkaar. Kies een kolom om te sorteren.",
    caption: "AI-modellen vergeleken op taak, snelheid, kost en Europese soevereiniteit",
    model: "Model",
    match: "Match %",
    provider: "Aanbieder",
    hq: "Hoofdzetel",
    context: "Context",
    speed: "Snelheid",
    cost: "Kost",
    sovereignty: "EU-soevereiniteit",
    hosting: "Hosting",
    strengths: "Sterktes",
    sortHint: "Sorteren op",
    scoreOutOf: "op 5",
  },
  hqLabels: { us: "Verenigde Staten", fr: "Frankrijk" },
  openWeight: "Open gewichten",
  contextLabels: { standard: "Standaard", large: "Groot", veryLarge: "Zeer groot" },
  speedLabels: { 1: "Grondig", 2: "Gebalanceerd", 3: "Snel" },
  costLabels: COST_SYMBOLS,
  methodology: {
    heading: "Hoe leest u deze scores?",
    items: [
      "Scores van 1 tot 5 geven Wonka's praktijkbeoordeling voor zakelijk gebruik weer: e-mails, rapporten, spreadsheets, code en meertalig werk. Het zijn geen benchmarkresultaten.",
      "Kostenniveaus zijn relatief ten opzichte van elkaar. Voor de echte prijzen verwijzen we naar onze prijspagina.",
      "Europese soevereiniteit combineert de jurisdictie van de aanbieder en de hostingopties in de EU.",
      "Modellen evolueren snel. We herzien deze pagina regelmatig en dateren elke herziening.",
    ],
  },
  cta: {
    eyebrow: "WonkaChat",
    heading: "Gebruik het juiste model voor elke taak in WonkaChat.",
    body: "U hoeft niet voor één aanbieder te kiezen. Uw team wisselt van model per taak of per agent, in één beveiligde werkruimte gekoppeld aan uw tools.",
    trial: "Start gratis proefperiode",
    meeting: "Boek een demo",
    pricing: "Bekijk de prijzen",
  },
  faq: {
    heading: "Veelgestelde vragen",
    items: [
      {
        question: "Wat is het beste AI-model voor bedrijven?",
        answer:
          "Er is geen enkel beste model. GPT en Claude zijn sterke alleskunners, Gemini kan goed om met zeer grote documenten, Mistral is een Europese optie die sterk is in het Frans, en kleinere modellen zoals Mistral Small zijn snel en voordelig voor dagelijkse taken. De juiste keuze hangt af van de taak. Daarom laat WonkaChat uw team per taak van model wisselen.",
      },
      {
        question: "GPT, Claude of Mistral: welke kiezen we?",
        answer:
          "Gebruik elk model waar het past: GPT voor brede analyse en meertalig werk, Claude voor zorgvuldig lang schrijfwerk en lange documenten, Mistral als u een Europese aanbieder of sterk Frans wilt. In WonkaChat wisselt u van model per gesprek of per agent, zonder u aan één model te binden.",
      },
      {
        question: "Welke AI-modellen worden in de EU gehost?",
        answer:
          "Mistral AI is een Franse aanbieder met hoofdzetel in Parijs. GPT, Claude en Gemini komen van Amerikaanse aanbieders. Voor al deze modellen bestaan hostingopties in de EU, en modellen met open gewichten zoals Llama kunt u hosten waar u wilt. WonkaChat draait op Microsoft Azure West Europe (Ierland) en bevat AI-modellen die in de EU gehost worden.",
      },
      {
        question: "Hoe kwamen deze scores tot stand?",
        answer:
          "Het is Wonka's praktijkbeoordeling voor typische zakelijke taken. Het zijn geen benchmarkcijfers en we herzien ze regelmatig naarmate modellen evolueren.",
      },
      {
        question: "Kunnen we meerdere AI-modellen gebruiken met één abonnement?",
        answer:
          "Ja. WonkaChat bevat de belangrijkste modellen van OpenAI, Anthropic, Google en Mistral in één werkruimte. U kunt ook uw eigen API-sleutel gebruiken. Zie de prijspagina voor details.",
      },
      {
        question: "Worden onze gegevens gebruikt om de modellen te trainen?",
        answer:
          "Niet via WonkaChat. Uw gesprekken en documenten worden niet gebruikt om AI-modellen te trainen. Wonka AI is ISO 27001-gecertificeerd en AVG-conform.",
      },
    ],
  },
};

export const MODEL_COMPARATOR_COPY: Record<Locale, ModelComparatorCopy> = { en, fr, nl };

const REVIEW_LOCALE: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", nl: "nl-BE" };

/** "October 2026" / "octobre 2026" / "oktober 2026". */
export function formatReviewMonth(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(REVIEW_LOCALE[locale], {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
