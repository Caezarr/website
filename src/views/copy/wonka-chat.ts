import type { Locale } from "@/i18n/config";

/** Page-level overrides that beat the CMS on /wonka-chat. */
export interface WonkaChatCopy {
  schema: { breadcrumbHome: string; breadcrumbPage: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  problem: { heading: string; body: string };
  overview: { eyebrow: string; body: string };
  features: {
    headerBody: string;
    chat: { title: string; description: string };
    models: { title: string; description: string };
  };
}

const en: WonkaChatCopy = {
  schema: { breadcrumbHome: "Home", breadcrumbPage: "WonkaChat" },
  hero: {
    eyebrow: "Wonka Workspace",
    title: "The AI workspace for your entire organization.",
    subtitle:
      "Let your entire organization use AI in a safe and secure way. Optimize your work by connecting to your daily tools.",
  },
  problem: {
    heading: "Not everyone knows how to work with AI.",
    body: "Most AI tools create value for the people who already know how to use them. Everyone else keeps doing repetitive work manually.\n\nWonka Workspace changes that. It gives your whole team access to AI in a way that is simple, practical and built for daily work.",
  },
  overview: {
    eyebrow: "What is Wonka Workspace?",
    body: "Wonka Workspace lets you chat with AI in a safe manner, create AI Agents for daily work, make AI Apps to visualize key processes and statistics, and AI Automations to automate boring work. All in a secure environment.",
  },
  features: {
    headerBody:
      "Wonka Workspace is built to make AI useful across the organisation: simple enough for every employee, powerful enough for difficult processes.",
    chat: {
      title: "AI Chat for everyone.",
      description:
        "Give your employees one simple place to ask questions, find information and get support from AI. Wonka Workspace works like a familiar chat experience, but with your company context built in.",
    },
    models: {
      title: "Choose your own AI model.",
      description:
        "Wonka Workspace gives your company the flexibility to use an AI model that fits your needs, preferences and security requirements.",
    },
  },
};

const fr: WonkaChatCopy = {
  schema: { breadcrumbHome: "Accueil", breadcrumbPage: "WonkaChat" },
  hero: {
    eyebrow: "Wonka Workspace",
    title: "L'espace de travail IA pour toute votre organisation.",
    subtitle:
      "Permettez à toute votre organisation d'utiliser l'IA en toute sécurité. Optimisez votre travail en vous connectant à vos outils du quotidien.",
  },
  problem: {
    heading: "Tout le monde ne sait pas travailler avec l'IA.",
    body: "La plupart des outils d'IA profitent surtout à ceux qui savent déjà s'en servir. Les autres continuent à faire le travail répétitif à la main.\n\nWonka Workspace change la donne. Il donne à toute votre équipe accès à l'IA de façon simple, pratique et pensée pour le travail quotidien.",
  },
  overview: {
    eyebrow: "Qu'est-ce que Wonka Workspace ?",
    body: "Avec Wonka Workspace, vous discutez avec l'IA en toute sécurité, créez des agents IA pour le travail quotidien, concevez des applications IA pour visualiser vos processus et statistiques clés, et des automatisations IA pour éliminer les tâches fastidieuses. Le tout dans un environnement sécurisé.",
  },
  features: {
    headerBody:
      "Wonka Workspace rend l'IA utile dans toute l'organisation : assez simple pour chaque collaborateur, assez puissant pour les processus complexes.",
    chat: {
      title: "Le chat IA pour tous.",
      description:
        "Offrez à vos collaborateurs un seul endroit simple pour poser leurs questions, trouver l'information et se faire aider par l'IA. Wonka Workspace fonctionne comme un chat familier, avec le contexte de votre entreprise intégré.",
    },
    models: {
      title: "Choisissez votre modèle d'IA.",
      description:
        "Wonka Workspace laisse à votre entreprise la liberté d'utiliser le modèle d'IA qui correspond à ses besoins, ses préférences et ses exigences de sécurité.",
    },
  },
};

const nl: WonkaChatCopy = {
  schema: { breadcrumbHome: "Home", breadcrumbPage: "WonkaChat" },
  hero: {
    eyebrow: "Wonka Workspace",
    title: "De AI-werkruimte voor uw hele organisatie.",
    subtitle:
      "Laat uw hele organisatie AI op een veilige manier gebruiken. Optimaliseer uw werk door te koppelen met uw dagelijkse tools.",
  },
  problem: {
    heading: "Niet iedereen kan al met AI werken.",
    body: "De meeste AI-tools leveren vooral waarde op voor wie ze al kan gebruiken. Alle anderen blijven repetitief werk manueel doen.\n\nWonka Workspace brengt daar verandering in. Het geeft uw hele team toegang tot AI op een manier die eenvoudig, praktisch en gemaakt voor dagelijks werk is.",
  },
  overview: {
    eyebrow: "Wat is Wonka Workspace?",
    body: "Met Wonka Workspace chat u veilig met AI, maakt u AI-agents voor dagelijks werk, bouwt u AI-apps om kernprocessen en statistieken te visualiseren en zet u AI-automatiseringen in voor saai werk. Allemaal in een beveiligde omgeving.",
  },
  features: {
    headerBody:
      "Wonka Workspace maakt AI nuttig in de hele organisatie: eenvoudig genoeg voor elke medewerker, krachtig genoeg voor complexe processen.",
    chat: {
      title: "AI-chat voor iedereen.",
      description:
        "Geef uw medewerkers één eenvoudige plek om vragen te stellen, informatie te vinden en hulp te krijgen van AI. Wonka Workspace werkt als een vertrouwde chat, maar met de context van uw bedrijf ingebouwd.",
    },
    models: {
      title: "Kies uw eigen AI-model.",
      description:
        "Wonka Workspace geeft uw bedrijf de flexibiliteit om een AI-model te gebruiken dat past bij uw behoeften, voorkeuren en beveiligingseisen.",
    },
  },
};

export const WONKA_CHAT_COPY: Record<Locale, WonkaChatCopy> = { en, fr, nl };
