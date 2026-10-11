import type { Locale } from "@/i18n/config";
import type { AgentTier } from "@/lib/agent-blueprint";
import type { AgentFunction, AgentSector } from "./types";

export interface AgentLibraryCopy {
  seo: { title: string; description: string };
  breadcrumbHome: string;
  breadcrumb: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  functions: Record<AgentFunction, string>;
  sectors: Record<AgentSector, string>;
  tiers: Record<AgentTier, string>;
  filters: {
    searchLabel: string;
    searchPlaceholder: string;
    function: string;
    sector: string;
    tool: string;
    all: string;
    reset: string;
    results: string;
    resultsOne: string;
    empty: string;
  };
  card: { open: string };
  blueprintBand: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  booking: { title: string; body: string; cta: string };
  detail: {
    backToLibrary: string;
    problem: string;
    steps: string;
    tools: string;
    prompt: string;
    gain: string;
    trigger: string;
    humanControl: string;
    sectors: string;
    film: string;
    filmNote: string;
    importCta: string;
    importNote: string;
    blueprintCta: string;
    bookCta: string;
    related: string;
    pricing: string;
    metaSuffix: string;
  };
  faq: { heading: string; items: Array<{ question: string; answer: string }> };
}

export const AGENT_LIBRARY_COPY: Record<Locale, AgentLibraryCopy> = {
  en: {
    seo: {
      title: "AI Agent Library: Ready-to-Use Business AI Agents | Wonka AI",
      description:
        "Browse ready-to-use AI agents for finance, sales, support, HR, operations, legal and IT. Connected to Odoo, Microsoft 365, Salesforce and HubSpot. Import them into WonkaChat.",
    },
    breadcrumbHome: "Home",
    breadcrumb: "AI agent library",
    hero: {
      eyebrow: "AI agent library",
      title: "Ready-to-use AI agents for the work your teams repeat every week",
      body: "Each agent comes with its workflow, the tools it connects and a demo run. Import it into WonkaChat as it is, or let the Blueprint design agents around your own processes.",
      primaryCta: "Browse the agents",
      secondaryCta: "Design agents for my company",
    },
    functions: {
      finance: "Finance and accounting",
      sales: "Sales",
      support: "Customer support",
      hr: "HR",
      operations: "Operations and supply chain",
      legal: "Legal and compliance",
      marketing: "Marketing",
      it: "IT",
    },
    sectors: {
      industry: "Industry and manufacturing",
      construction: "Construction",
      "professional-services": "Professional services",
      retail: "Retail and distribution",
      public: "Public sector",
      finance: "Financial services",
    },
    tiers: {
      Copilot: "Copilot",
      "Human in the loop": "Human in the loop",
      "Fully autonomous": "Fully autonomous",
    },
    filters: {
      searchLabel: "Search agents",
      searchPlaceholder: "Invoices, tenders, onboarding…",
      function: "Function",
      sector: "Sector",
      tool: "Tool",
      all: "All",
      reset: "Clear filters",
      results: "{count} agents",
      resultsOne: "1 agent",
      empty: "No agent matches these filters yet. The Blueprint can design one around your process.",
    },
    card: { open: "See the agent" },
    blueprintBand: {
      eyebrow: "AI Agent Blueprint",
      title: "Get agents designed for your company in a few minutes",
      body: "Enter your website. The Blueprint reads how your company works and proposes agents built around your real processes, ready to import into WonkaChat.",
      cta: "Start my Blueprint",
    },
    booking: {
      title: "Want us to deploy them with you?",
      body: "Talk to a Wonka AI engineer about your processes, your tools and the controls you need.",
      cta: "Book a call",
    },
    detail: {
      backToLibrary: "All agents",
      problem: "The problem",
      steps: "What the agent does",
      tools: "Connected tools",
      prompt: "Example prompt",
      gain: "What changes for the team",
      trigger: "When it runs",
      humanControl: "Human control",
      sectors: "Sectors",
      film: "Watch a demo run",
      filmNote: "Demo data. Your agent runs on your own tools and permissions.",
      importCta: "Import into WonkaChat",
      importNote: "Creates this agent in your WonkaChat workspace. You review every setting before it is saved.",
      blueprintCta: "Personalise with the Blueprint",
      bookCta: "Book a call",
      related: "Related agents",
      pricing: "See pricing",
      metaSuffix: "AI agent",
    },
    faq: {
      heading: "Questions about the agent library",
      items: [
        {
          question: "Can I use these agents as they are?",
          answer: "Yes. Each agent can be imported into WonkaChat in one click with its instructions, conversation starters and connectors. You then connect your own tools and adjust the instructions to your process.",
        },
        {
          question: "Do the agents act without human approval?",
          answer: "Each agent states its autonomy level. Copilots work with you in the chat, human-in-the-loop agents prepare work for approval, and autonomous agents run scheduled, read-only or controlled tasks. Sending, publishing or changing data always asks for confirmation unless you decide otherwise.",
        },
        {
          question: "Which tools can the agents connect to?",
          answer: "The library uses connectors available in WonkaChat, such as Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Jira and Confluence. Agents only see what the connected user is allowed to see.",
        },
        {
          question: "What if my process is different?",
          answer: "Start from the closest agent and adapt it, or run the AI Agent Blueprint: it designs agents from your own website and processes in a couple of minutes.",
        },
      ],
    },
  },
  fr: {
    seo: {
      title: "Bibliothèque d’agents IA prêts à l’emploi pour l’entreprise | Wonka AI",
      description:
        "Découvrez des agents IA prêts à l’emploi pour la finance, les ventes, le support, les RH, les opérations, le juridique et l’informatique. Connectés à Odoo, Microsoft 365, Salesforce et HubSpot. Importez-les dans WonkaChat.",
    },
    breadcrumbHome: "Accueil",
    breadcrumb: "Bibliothèque d’agents IA",
    hero: {
      eyebrow: "Bibliothèque d’agents IA",
      title: "Des agents IA prêts à l’emploi pour le travail que vos équipes répètent chaque semaine",
      body: "Chaque agent est présenté avec son fonctionnement, les outils qu’il connecte et une démonstration. Importez-le tel quel dans WonkaChat, ou laissez le Blueprint concevoir des agents autour de vos propres processus.",
      primaryCta: "Parcourir les agents",
      secondaryCta: "Concevoir des agents pour mon entreprise",
    },
    functions: {
      finance: "Finance et comptabilité",
      sales: "Ventes",
      support: "Service client",
      hr: "Ressources humaines",
      operations: "Opérations et logistique",
      legal: "Juridique et conformité",
      marketing: "Marketing",
      it: "Informatique",
    },
    sectors: {
      industry: "Industrie",
      construction: "BTP",
      "professional-services": "Services professionnels",
      retail: "Commerce et distribution",
      public: "Secteur public",
      finance: "Services financiers",
    },
    tiers: {
      Copilot: "Copilote",
      "Human in the loop": "Avec validation humaine",
      "Fully autonomous": "Autonome",
    },
    filters: {
      searchLabel: "Rechercher un agent",
      searchPlaceholder: "Factures, appels d’offres, accueil…",
      function: "Métier",
      sector: "Secteur",
      tool: "Outil",
      all: "Tous",
      reset: "Effacer les filtres",
      results: "{count} agents",
      resultsOne: "1 agent",
      empty: "Aucun agent ne correspond encore à ces filtres. Le Blueprint peut en concevoir un autour de votre processus.",
    },
    card: { open: "Voir l’agent" },
    blueprintBand: {
      eyebrow: "AI Agent Blueprint",
      title: "Obtenez en quelques minutes des agents conçus pour votre entreprise",
      body: "Indiquez votre site web. Le Blueprint analyse votre activité et propose des agents construits autour de vos vrais processus, prêts à importer dans WonkaChat.",
      cta: "Lancer mon Blueprint",
    },
    booking: {
      title: "Vous souhaitez les déployer avec nous ?",
      body: "Échangez avec un ingénieur IA Wonka sur vos processus, vos outils et les contrôles dont vous avez besoin.",
      cta: "Prendre rendez-vous",
    },
    detail: {
      backToLibrary: "Tous les agents",
      problem: "Le problème",
      steps: "Ce que fait l’agent",
      tools: "Outils connectés",
      prompt: "Exemple de demande",
      gain: "Ce qui change pour l’équipe",
      trigger: "Déclenchement",
      humanControl: "Contrôle humain",
      sectors: "Secteurs",
      film: "Voir une démonstration",
      filmNote: "Données de démonstration. Votre agent travaille sur vos outils et avec vos droits.",
      importCta: "Importer dans WonkaChat",
      importNote: "Crée cet agent dans votre espace WonkaChat. Vous vérifiez chaque paramètre avant l’enregistrement.",
      blueprintCta: "Personnaliser avec le Blueprint",
      bookCta: "Prendre rendez-vous",
      related: "Agents similaires",
      pricing: "Voir les tarifs",
      metaSuffix: "agent IA",
    },
    faq: {
      heading: "Questions sur la bibliothèque d’agents",
      items: [
        {
          question: "Puis-je utiliser ces agents tels quels ?",
          answer: "Oui. Chaque agent s’importe dans WonkaChat en un clic avec ses instructions, ses exemples de demandes et ses connecteurs. Vous connectez ensuite vos propres outils et ajustez les instructions à votre processus.",
        },
        {
          question: "Les agents agissent-ils sans validation humaine ?",
          answer: "Chaque agent indique son niveau d’autonomie. Les copilotes travaillent avec vous dans le chat, les agents avec validation humaine préparent le travail à valider, et les agents autonomes exécutent des tâches planifiées, en lecture seule ou contrôlées. Envoyer, publier ou modifier des données demande toujours une confirmation, sauf décision contraire de votre part.",
        },
        {
          question: "À quels outils les agents peuvent-ils se connecter ?",
          answer: "La bibliothèque utilise les connecteurs disponibles dans WonkaChat, comme Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Jira et Confluence. Les agents ne voient que ce que l’utilisateur connecté a le droit de voir.",
        },
        {
          question: "Et si mon processus est différent ?",
          answer: "Partez de l’agent le plus proche et adaptez-le, ou lancez l’AI Agent Blueprint : il conçoit des agents à partir de votre site et de vos processus en quelques minutes.",
        },
      ],
    },
  },
  nl: {
    seo: {
      title: "Bibliotheek met kant-en-klare AI-agents voor bedrijven | Wonka AI",
      description:
        "Ontdek kant-en-klare AI-agents voor financiën, verkoop, klantenservice, HR, operaties, juridische zaken en IT. Gekoppeld aan Odoo, Microsoft 365, Salesforce en HubSpot. Importeer ze in WonkaChat.",
    },
    breadcrumbHome: "Home",
    breadcrumb: "AI-agentbibliotheek",
    hero: {
      eyebrow: "AI-agentbibliotheek",
      title: "Kant-en-klare AI-agents voor het werk dat uw teams elke week herhalen",
      body: "Elke agent toont zijn werkwijze, de tools die hij koppelt en een demo. Importeer hem zoals hij is in WonkaChat, of laat de Blueprint agents ontwerpen rond uw eigen processen.",
      primaryCta: "Bekijk de agents",
      secondaryCta: "Agents ontwerpen voor mijn bedrijf",
    },
    functions: {
      finance: "Financiën en boekhouding",
      sales: "Verkoop",
      support: "Klantenservice",
      hr: "HR",
      operations: "Operaties en logistiek",
      legal: "Juridisch en compliance",
      marketing: "Marketing",
      it: "IT",
    },
    sectors: {
      industry: "Industrie en productie",
      construction: "Bouw",
      "professional-services": "Zakelijke dienstverlening",
      retail: "Retail en distributie",
      public: "Publieke sector",
      finance: "Financiële dienstverlening",
    },
    tiers: {
      Copilot: "Copiloot",
      "Human in the loop": "Met menselijke controle",
      "Fully autonomous": "Autonoom",
    },
    filters: {
      searchLabel: "Agents zoeken",
      searchPlaceholder: "Facturen, aanbestedingen, onthaal…",
      function: "Functie",
      sector: "Sector",
      tool: "Tool",
      all: "Alle",
      reset: "Filters wissen",
      results: "{count} agents",
      resultsOne: "1 agent",
      empty: "Nog geen agent voor deze filters. De Blueprint kan er een ontwerpen rond uw proces.",
    },
    card: { open: "Bekijk de agent" },
    blueprintBand: {
      eyebrow: "AI Agent Blueprint",
      title: "Krijg in enkele minuten agents op maat van uw bedrijf",
      body: "Geef uw website in. De Blueprint leest hoe uw bedrijf werkt en stelt agents voor rond uw echte processen, klaar om in WonkaChat te importeren.",
      cta: "Start mijn Blueprint",
    },
    booking: {
      title: "Wilt u ze samen met ons uitrollen?",
      body: "Bespreek uw processen, tools en de nodige controles met een AI-engineer van Wonka.",
      cta: "Plan een gesprek",
    },
    detail: {
      backToLibrary: "Alle agents",
      problem: "Het probleem",
      steps: "Wat de agent doet",
      tools: "Gekoppelde tools",
      prompt: "Voorbeeldprompt",
      gain: "Wat er verandert voor het team",
      trigger: "Wanneer hij start",
      humanControl: "Menselijke controle",
      sectors: "Sectoren",
      film: "Bekijk een demo",
      filmNote: "Demodata. Uw agent werkt met uw eigen tools en rechten.",
      importCta: "Importeren in WonkaChat",
      importNote: "Maakt deze agent aan in uw WonkaChat-werkruimte. U controleert elke instelling voordat ze wordt opgeslagen.",
      blueprintCta: "Personaliseren met de Blueprint",
      bookCta: "Plan een gesprek",
      related: "Gerelateerde agents",
      pricing: "Bekijk de prijzen",
      metaSuffix: "AI-agent",
    },
    faq: {
      heading: "Vragen over de agentbibliotheek",
      items: [
        {
          question: "Kan ik deze agents gebruiken zoals ze zijn?",
          answer: "Ja. Elke agent importeert u in één klik in WonkaChat, met instructies, voorbeeldprompts en koppelingen. Daarna verbindt u uw eigen tools en past u de instructies aan uw proces aan.",
        },
        {
          question: "Handelen de agents zonder menselijke goedkeuring?",
          answer: "Elke agent vermeldt zijn autonomieniveau. Copiloten werken met u samen in de chat, agents met menselijke controle bereiden werk voor ter goedkeuring, en autonome agents voeren geplande, alleen-lezen of gecontroleerde taken uit. Verzenden, publiceren of gegevens wijzigen vraagt altijd om bevestiging, tenzij u anders beslist.",
        },
        {
          question: "Met welke tools kunnen de agents verbinden?",
          answer: "De bibliotheek gebruikt koppelingen die beschikbaar zijn in WonkaChat, zoals Odoo, SharePoint, Outlook, Microsoft Teams, Salesforce, HubSpot, Jira en Confluence. Agents zien alleen wat de verbonden gebruiker mag zien.",
        },
        {
          question: "En als mijn proces anders is?",
          answer: "Vertrek van de agent die er het dichtst bij ligt en pas hem aan, of start de AI Agent Blueprint: die ontwerpt in enkele minuten agents op basis van uw eigen website en processen.",
        },
      ],
    },
  },
};

export function formatResultCount(copy: AgentLibraryCopy, count: number): string {
  return count === 1
    ? copy.filters.resultsOne
    : copy.filters.results.replace("{count}", String(count));
}
