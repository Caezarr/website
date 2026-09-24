import type { Locale } from "@/i18n/config";

type CardCopy = { title: string; body: string; alt: string };

/** Page-level copy for the Workspace page (`/`, `/fr`, `/nl`). Images and structure live in the EN defaults. */
export interface WorkspaceCopy {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageAlt: string;
    talkToSales: string;
  };
  proofLines: string[];
  products: {
    heading: string;
    aiChat: CardCopy & { ctaLabel: string };
    aiAgents: CardCopy;
  };
  capabilities: {
    heading: string;
    cards: Record<
      | "connected-tools"
      | "set-up-per-team"
      | "human-approves"
      | "your-model-choice"
      | "workflow-templates"
      | "hosted-in-eu",
      CardCopy
    >;
  };
  contactHeading: string;
}

const en: WorkspaceCopy = {
  hero: {
    eyebrow: "Wonka Workspace",
    title: "The AI workspace for your entire organization.",
    subtitle:
      "Let your entire organization use AI in a safe and secure way. Optimize your work by connecting to your daily tools.",
    imageAlt: "Wonka Workspace product screenshot",
    talkToSales: "Talk to sales",
  },
  proofLines: ["Trusted by Belgian teams of every size", "European data storage"],
  products: {
    heading: "Explore Wonka Workspace.",
    aiChat: {
      title: "AI Chat",
      body: "Chat with your data, safely.",
      ctaLabel: "Discover AI Chat",
      alt: "AI Chat in Wonka Workspace",
    },
    aiAgents: {
      title: "AI Agents",
      body: "Delegate recurring tasks to AI.",
      alt: "AI Agents in Wonka Workspace",
    },
  },
  capabilities: {
    heading: "Safe and customized for you.",
    cards: {
      "connected-tools": {
        title: "Connected to your tools",
        body: "Odoo, SharePoint, Teams and your mailbox.",
        alt: "Connected to your tools in Wonka Workspace",
      },
      "set-up-per-team": {
        title: "Set up per team",
        body: "SSO, user management and who reaches what.",
        alt: "Team setup in Wonka Workspace",
      },
      "human-approves": {
        title: "A human approves",
        body: "AI does the work, you sign off before it leaves.",
        alt: "Human approval in Wonka Workspace",
      },
      "your-model-choice": {
        title: "Your model, your choice",
        body: "Every leading model, or connect your own.",
        alt: "Choose your AI model in Wonka Workspace",
      },
      "workflow-templates": {
        title: "Workflow templates included",
        body: "Fifty processes that already run at other companies.",
        alt: "Workflow templates in Wonka Workspace",
      },
      "hosted-in-eu": {
        title: "Hosted in the EU",
        body: "Your data stays in Europe and never trains a model.",
        alt: "EU hosting in Wonka Workspace",
      },
    },
  },
  contactHeading: "Book a demo meeting.",
};

const fr: WorkspaceCopy = {
  hero: {
    eyebrow: "Wonka Workspace",
    title: "L'espace de travail IA pour toute votre organisation.",
    subtitle:
      "Permettez à toute votre organisation d'utiliser l'IA de façon sûre et sécurisée. Optimisez votre travail en vous connectant à vos outils du quotidien.",
    imageAlt: "Capture d'écran de Wonka Workspace",
    talkToSales: "Parler à un commercial",
  },
  proofLines: [
    "La confiance d'équipes belges de toutes tailles",
    "Données stockées en Europe",
  ],
  products: {
    heading: "Découvrez Wonka Workspace.",
    aiChat: {
      title: "Chat IA",
      body: "Échangez avec vos données, en sécurité.",
      ctaLabel: "Découvrir le Chat IA",
      alt: "Chat IA dans Wonka Workspace",
    },
    aiAgents: {
      title: "Agents IA",
      body: "Confiez vos tâches récurrentes à l'IA.",
      alt: "Agents IA dans Wonka Workspace",
    },
  },
  capabilities: {
    heading: "Sûr et adapté à vous.",
    cards: {
      "connected-tools": {
        title: "Connecté à vos outils",
        body: "Odoo, SharePoint, Teams et votre boîte mail.",
        alt: "Wonka Workspace connecté à vos outils",
      },
      "set-up-per-team": {
        title: "Configuré par équipe",
        body: "SSO, gestion des utilisateurs et qui accède à quoi.",
        alt: "Configuration par équipe dans Wonka Workspace",
      },
      "human-approves": {
        title: "Un humain valide",
        body: "L'IA fait le travail, vous validez avant l'envoi.",
        alt: "Validation humaine dans Wonka Workspace",
      },
      "your-model-choice": {
        title: "Votre modèle, votre choix",
        body: "Tous les grands modèles, ou connectez le vôtre.",
        alt: "Choix du modèle d'IA dans Wonka Workspace",
      },
      "workflow-templates": {
        title: "Modèles de workflows inclus",
        body: "Cinquante processus qui tournent déjà dans d'autres entreprises.",
        alt: "Modèles de workflows dans Wonka Workspace",
      },
      "hosted-in-eu": {
        title: "Hébergé dans l'UE",
        body: "Vos données restent en Europe et n'entraînent jamais de modèle.",
        alt: "Hébergement européen de Wonka Workspace",
      },
    },
  },
  contactHeading: "Réservez une démo.",
};

const nl: WorkspaceCopy = {
  hero: {
    eyebrow: "Wonka Workspace",
    title: "De AI-werkruimte voor uw hele organisatie.",
    subtitle:
      "Laat uw hele organisatie AI op een veilige manier gebruiken. Optimaliseer uw werk door te koppelen met uw dagelijkse tools.",
    imageAlt: "Screenshot van Wonka Workspace",
    talkToSales: "Praat met sales",
  },
  proofLines: [
    "Vertrouwd door Belgische teams van elke omvang",
    "Europese dataopslag",
  ],
  products: {
    heading: "Ontdek Wonka Workspace.",
    aiChat: {
      title: "AI-chat",
      body: "Chat veilig met uw data.",
      ctaLabel: "Ontdek AI-chat",
      alt: "AI-chat in Wonka Workspace",
    },
    aiAgents: {
      title: "AI-agents",
      body: "Delegeer terugkerende taken aan AI.",
      alt: "AI-agents in Wonka Workspace",
    },
  },
  capabilities: {
    heading: "Veilig en op maat van u.",
    cards: {
      "connected-tools": {
        title: "Gekoppeld aan uw tools",
        body: "Odoo, SharePoint, Teams en uw mailbox.",
        alt: "Wonka Workspace gekoppeld aan uw tools",
      },
      "set-up-per-team": {
        title: "Ingesteld per team",
        body: "SSO, gebruikersbeheer en wie wat mag zien.",
        alt: "Teaminstellingen in Wonka Workspace",
      },
      "human-approves": {
        title: "Een mens keurt goed",
        body: "AI doet het werk, u keurt goed voor het vertrekt.",
        alt: "Menselijke goedkeuring in Wonka Workspace",
      },
      "your-model-choice": {
        title: "Uw model, uw keuze",
        body: "Elk toonaangevend model, of koppel uw eigen model.",
        alt: "Kies uw AI-model in Wonka Workspace",
      },
      "workflow-templates": {
        title: "Workflowsjablonen inbegrepen",
        body: "Vijftig processen die al bij andere bedrijven draaien.",
        alt: "Workflowsjablonen in Wonka Workspace",
      },
      "hosted-in-eu": {
        title: "Gehost in de EU",
        body: "Uw data blijft in Europa en traint nooit een model.",
        alt: "EU-hosting van Wonka Workspace",
      },
    },
  },
  contactHeading: "Plan een demo.",
};

export const WORKSPACE_COPY: Record<Locale, WorkspaceCopy> = { en, fr, nl };
