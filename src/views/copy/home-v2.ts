import type { Locale } from "@/i18n/config";

export interface HomeV2Copy {
  seo: { title: string; description: string };
  award: { label: string; cta: string };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    videoCta: string;
    trustedBy: string;
    demoPrompt: string;
    demoAgentName: string;
    demoAgentTools: string;
    demoStatus: string;
  };
  results: {
    eyebrow: string;
    title: string;
    items: { metric: string; label: string; client: string }[];
  };
  how: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
    humanNote: string;
    mock: {
      describePrompt: string;
      fields: { label: string; value: string }[];
      connect: string;
      connected: string;
      modelTasks: { task: string; model: string }[];
      modelEu: string;
      shareTitle: string;
      shareTeams: string[];
    };
  };
  integrations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    everydayLabel: string;
    sectorLabel: string;
    sectors: { id: string; label: string }[];
    customTitle: string;
    customBody: string;
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { title: string; body: string }[];
    cta: string;
  };
  video: {
    eyebrow: string;
    title: string;
    body: string;
    play: string;
  };
  security: {
    eyebrow: string;
    title: string;
    columns: { title: string; items: string[] }[];
    models: string;
    cta: string;
  };
  finalCta: { title: string; subtitle: string };
}

const en: HomeV2Copy = {
  seo: {
    title: "WonkaChat | AI agents set up with you, inside your tools",
    description:
      "Describe a task, WonkaChat builds the agent, connects it to your tools and shares it with your teams. 35 AI consultants help you get it into production.",
  },
  award: {
    label: "#1 AI start-up of the year · Belgium Startup Awards 2026",
    cta: "See the winners",
  },
  hero: {
    title: "AI agents that work inside your tools. A team that sets them up with you.",
    subtitle:
      "Describe a task: WonkaChat builds the agent, connects it to your tools and shares it with your teams. Our consultants stay with you until it runs in production.",
    primaryCta: "Start free trial",
    secondaryCta: "Talk to a consultant",
    videoCta: "Watch WonkaChat in action",
    trustedBy: "They trust us",
    demoPrompt: "Sort supplier emails and draft the replies in Outlook",
    demoAgentName: "Supplier inbox assistant",
    demoAgentTools: "Outlook · Odoo · SharePoint",
    demoStatus: "Agent ready",
  },
  results: {
    eyebrow: "Results",
    title: "What our clients already gained.",
    items: [
      { metric: "−50%", label: "time spent on support emails, across 70+ employees", client: "N-allo (Engie)" },
      { metric: "1 per person", label: "personal WonkaChat for every employee, hours saved each week", client: "Itzu" },
      { metric: "35", label: "AI consultants in Belgium and France to get you live", client: "Wonka team" },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "From idea to agent in production, without writing a line of code.",
    steps: [
      { title: "Describe it, the agent builds itself.", body: "You know what you want to automate? That is enough. Write it in plain words and WonkaChat sets up the instructions, the tools and the name." },
      { title: "It works inside your tools.", body: "Outlook, SharePoint, Odoo, HubSpot and 70+ connectors. Your agent reads and acts where your work already happens." },
      { title: "The right model for every task.", body: "Writing, analysis, sensitive data: each task gets the model that fits it. GPT, Claude, Gemini or Mistral hosted in the EU, switch in one click." },
      { title: "Share it with the whole team.", body: "Publish the agent to a team or the whole company. Everyone uses the same agent, with the rights you choose." },
    ],
    humanNote: "A human approves before every sensitive action.",
    mock: {
      describePrompt: "Every morning, sort supplier emails and draft replies",
      fields: [
        { label: "Name", value: "Supplier inbox assistant" },
        { label: "Instructions", value: "Classify, summarise, draft a reply" },
        { label: "Tools", value: "Outlook, Odoo" },
      ],
      connect: "Connect",
      connected: "Connected",
      modelTasks: [
        { task: "HR data", model: "Mistral" },
        { task: "Client email", model: "Claude" },
        { task: "Excel analysis", model: "GPT" },
      ],
      modelEu: "Hosted in the EU",
      shareTitle: "Share agent",
      shareTeams: ["Finance", "Sales", "Customer support"],
    },
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Connected to the tools you already use. Even the ones of your industry.",
    subtitle: "70+ ready-made connectors, plus the business software of your sector.",
    everydayLabel: "Everyday tools",
    sectorLabel: "Your industry's tools",
    sectors: [
      { id: "finance", label: "Finance & accounting" },
      { id: "construction", label: "Construction" },
      { id: "hospitality", label: "Hospitality & rentals" },
      { id: "sales", label: "Sales & marketing" },
    ],
    customTitle: "Your tool is not on the list?",
    customBody: "We build the connector. Our team plugs WonkaChat into your business software.",
  },
  team: {
    eyebrow: "The team",
    title: "You are not alone with a piece of software.",
    subtitle:
      "35 AI consultants in Belgium and France set up your first agents with you, train your teams, then move on to the next use case.",
    steps: [
      { title: "Diagnostic", body: "We find the tasks that cost your teams the most time." },
      { title: "First agent live", body: "Built with you, plugged into your tools, in production." },
      { title: "Adoption", body: "Training, follow-up and the next use case." },
    ],
    cta: "Talk to a consultant",
  },
  video: {
    eyebrow: "Watch",
    title: "They say it better than we do.",
    body: "Pierre Colaiacovo, founder & CEO of Respace, on working with WonkaChat.",
    play: "Play video",
  },
  security: {
    eyebrow: "Security",
    title: "Your data stays yours.",
    columns: [
      { title: "Hosting", items: ["Azure West Europe by default", "EU data residency", "Encryption at rest and in transit"] },
      { title: "Control", items: ["Rights per team", "A human approves sensitive actions", "Your data never trains public models"] },
      { title: "Compliance", items: ["ISO 27001 certified", "GDPR compliant, DPA included", "NIS 2 compliant"] },
    ],
    models: "GPT, Claude, Gemini, Mistral: no lock-in with a single AI provider.",
    cta: "Security details",
  },
  finalCta: {
    title: "Your first agent in production. On your own or with us.",
    subtitle: "Start free today, or talk to a consultant about your use case.",
  },
};

const fr: HomeV2Copy = {
  seo: {
    title: "WonkaChat | Des agents IA mis en place avec vous, dans vos outils",
    description:
      "Décrivez une tâche, WonkaChat crée l'agent, le connecte à vos outils et le partage à vos équipes. 35 consultants IA vous accompagnent jusqu'à la production.",
  },
  award: {
    label: "Start-up IA n°1 de l'année · Belgium Startup Awards 2026",
    cta: "Voir les lauréats",
  },
  hero: {
    title: "Des agents IA qui travaillent dans vos outils. Une équipe qui les met en place avec vous.",
    subtitle:
      "Décrivez une tâche : WonkaChat crée l'agent, le connecte à vos outils et le partage à vos équipes. Nos consultants vous accompagnent jusqu'à ce qu'il tourne en production.",
    primaryCta: "Essai gratuit",
    secondaryCta: "Parler à un consultant",
    videoCta: "Voir WonkaChat en action",
    trustedBy: "Ils nous font confiance",
    demoPrompt: "Trie les mails fournisseurs et prépare les réponses dans Outlook",
    demoAgentName: "Assistant mails fournisseurs",
    demoAgentTools: "Outlook · Odoo · SharePoint",
    demoStatus: "Agent prêt",
  },
  results: {
    eyebrow: "Résultats",
    title: "Ce que nos clients ont déjà gagné.",
    items: [
      { metric: "−50 %", label: "de temps sur les mails support, pour plus de 70 employés", client: "N-allo (Engie)" },
      { metric: "1 par personne", label: "WonkaChat personnel pour chaque employé, des heures gagnées chaque semaine", client: "Itzu" },
      { metric: "35", label: "consultants IA en Belgique et en France pour vous mettre en production", client: "Équipe Wonka" },
    ],
  },
  how: {
    eyebrow: "Comment ça marche",
    title: "De l'idée à l'agent en production, sans écrire une ligne de code.",
    steps: [
      { title: "Décrivez, l'agent se crée.", body: "Vous savez ce que vous voulez automatiser ? Ça suffit. Écrivez-le simplement, WonkaChat règle les instructions, les outils et le nom." },
      { title: "Il travaille dans vos outils.", body: "Outlook, SharePoint, Odoo, HubSpot et plus de 70 connecteurs. Votre agent lit et agit là où votre travail se fait déjà." },
      { title: "Le bon modèle pour chaque tâche.", body: "Rédaction, analyse, données sensibles : chaque tâche a son modèle. GPT, Claude, Gemini ou Mistral hébergé en UE, en un clic." },
      { title: "Partagez-le à toute l'équipe.", body: "Publiez l'agent pour une équipe ou toute l'entreprise. Tout le monde utilise le même agent, avec les droits que vous choisissez." },
    ],
    humanNote: "Un humain valide avant chaque action sensible.",
    mock: {
      describePrompt: "Chaque matin, trie les mails fournisseurs et prépare les réponses",
      fields: [
        { label: "Nom", value: "Assistant mails fournisseurs" },
        { label: "Instructions", value: "Classer, résumer, rédiger la réponse" },
        { label: "Outils", value: "Outlook, Odoo" },
      ],
      connect: "Connecter",
      connected: "Connecté",
      modelTasks: [
        { task: "Données RH", model: "Mistral" },
        { task: "Mail client", model: "Claude" },
        { task: "Analyse Excel", model: "GPT" },
      ],
      modelEu: "Hébergé en UE",
      shareTitle: "Partager l'agent",
      shareTeams: ["Finance", "Ventes", "Service client"],
    },
  },
  integrations: {
    eyebrow: "Intégrations",
    title: "Connecté aux outils que vous utilisez déjà. Même ceux de votre secteur.",
    subtitle: "Plus de 70 connecteurs prêts à l'emploi, et les logiciels métier de votre secteur.",
    everydayLabel: "Outils du quotidien",
    sectorLabel: "Les outils de votre secteur",
    sectors: [
      { id: "finance", label: "Finance & compta" },
      { id: "construction", label: "BTP" },
      { id: "hospitality", label: "Hôtellerie & location" },
      { id: "sales", label: "Ventes & marketing" },
    ],
    customTitle: "Votre outil n'est pas dans la liste ?",
    customBody: "On construit le connecteur. Notre équipe branche WonkaChat sur vos logiciels métier.",
  },
  team: {
    eyebrow: "L'équipe",
    title: "Vous n'êtes pas seuls avec un logiciel.",
    subtitle:
      "35 consultants IA en Belgique et en France mettent en place vos premiers agents avec vous, forment vos équipes, puis passent au cas d'usage suivant.",
    steps: [
      { title: "Diagnostic", body: "On identifie les tâches qui coûtent le plus de temps à vos équipes." },
      { title: "Premier agent en production", body: "Construit avec vous, branché sur vos outils." },
      { title: "Adoption", body: "Formation, suivi et cas d'usage suivant." },
    ],
    cta: "Parler à un consultant",
  },
  video: {
    eyebrow: "En vidéo",
    title: "Ils en parlent mieux que nous.",
    body: "Pierre Colaiacovo, fondateur et CEO de Respace, raconte son quotidien avec WonkaChat.",
    play: "Lancer la vidéo",
  },
  security: {
    eyebrow: "Sécurité",
    title: "Vos données restent les vôtres.",
    columns: [
      { title: "Hébergement", items: ["Azure West Europe par défaut", "Données résidentes en UE", "Chiffrement au repos et en transit"] },
      { title: "Contrôle", items: ["Droits par équipe", "Un humain valide les actions sensibles", "Vos données n'entraînent jamais de modèles publics"] },
      { title: "Conformité", items: ["Certifié ISO 27001", "Conforme RGPD, DPA inclus", "Conforme NIS 2"] },
    ],
    models: "GPT, Claude, Gemini, Mistral : aucun enfermement chez un seul fournisseur d'IA.",
    cta: "Détails sécurité",
  },
  finalCta: {
    title: "Votre premier agent en production. Seul ou avec nous.",
    subtitle: "Commencez gratuitement aujourd'hui, ou parlez de votre cas d'usage à un consultant.",
  },
};

const nl: HomeV2Copy = {
  seo: {
    title: "WonkaChat | AI-agents samen met u opgezet, in uw tools",
    description:
      "Beschrijf een taak, WonkaChat bouwt de agent, koppelt hem aan uw tools en deelt hem met uw teams. 35 AI-consultants begeleiden u tot in productie.",
  },
  award: {
    label: "#1 AI-start-up van het jaar · Belgium Startup Awards 2026",
    cta: "Bekijk de winnaars",
  },
  hero: {
    title: "AI-agents die in uw tools werken. Een team dat ze samen met u opzet.",
    subtitle:
      "Beschrijf een taak: WonkaChat bouwt de agent, koppelt hem aan uw tools en deelt hem met uw teams. Onze consultants begeleiden u tot hij in productie draait.",
    primaryCta: "Gratis proberen",
    secondaryCta: "Spreek een consultant",
    videoCta: "Bekijk WonkaChat in actie",
    trustedBy: "Zij vertrouwen ons",
    demoPrompt: "Sorteer leveranciersmails en bereid de antwoorden voor in Outlook",
    demoAgentName: "Assistent leveranciersmails",
    demoAgentTools: "Outlook · Odoo · SharePoint",
    demoStatus: "Agent klaar",
  },
  results: {
    eyebrow: "Resultaten",
    title: "Wat onze klanten al wonnen.",
    items: [
      { metric: "−50%", label: "tijd op supportmails, voor meer dan 70 medewerkers", client: "N-allo (Engie)" },
      { metric: "1 per persoon", label: "persoonlijke WonkaChat voor elke medewerker, elke week uren bespaard", client: "Itzu" },
      { metric: "35", label: "AI-consultants in België en Frankrijk om u live te krijgen", client: "Wonka-team" },
    ],
  },
  how: {
    eyebrow: "Hoe het werkt",
    title: "Van idee tot agent in productie, zonder één regel code.",
    steps: [
      { title: "Beschrijf het, de agent bouwt zichzelf.", body: "U weet wat u wilt automatiseren? Dat volstaat. Schrijf het in gewone woorden, WonkaChat regelt instructies, tools en naam." },
      { title: "Hij werkt in uw tools.", body: "Outlook, SharePoint, Odoo, HubSpot en 70+ connectoren. Uw agent leest en handelt waar uw werk al gebeurt." },
      { title: "Het juiste model voor elke taak.", body: "Schrijven, analyse, gevoelige data: elke taak krijgt het model dat past. GPT, Claude, Gemini of Mistral gehost in de EU, met één klik." },
      { title: "Deel hem met het hele team.", body: "Publiceer de agent voor een team of het hele bedrijf. Iedereen gebruikt dezelfde agent, met de rechten die u kiest." },
    ],
    humanNote: "Een mens keurt elke gevoelige actie goed.",
    mock: {
      describePrompt: "Sorteer elke ochtend leveranciersmails en bereid antwoorden voor",
      fields: [
        { label: "Naam", value: "Assistent leveranciersmails" },
        { label: "Instructies", value: "Classificeren, samenvatten, antwoord opstellen" },
        { label: "Tools", value: "Outlook, Odoo" },
      ],
      connect: "Koppelen",
      connected: "Gekoppeld",
      modelTasks: [
        { task: "HR-data", model: "Mistral" },
        { task: "Klantmail", model: "Claude" },
        { task: "Excel-analyse", model: "GPT" },
      ],
      modelEu: "Gehost in de EU",
      shareTitle: "Agent delen",
      shareTeams: ["Finance", "Sales", "Klantenservice"],
    },
  },
  integrations: {
    eyebrow: "Integraties",
    title: "Gekoppeld aan de tools die u al gebruikt. Ook die van uw sector.",
    subtitle: "70+ kant-en-klare connectoren, plus de bedrijfssoftware van uw sector.",
    everydayLabel: "Dagelijkse tools",
    sectorLabel: "Tools van uw sector",
    sectors: [
      { id: "finance", label: "Finance & boekhouding" },
      { id: "construction", label: "Bouw" },
      { id: "hospitality", label: "Hospitality & verhuur" },
      { id: "sales", label: "Sales & marketing" },
    ],
    customTitle: "Staat uw tool er niet tussen?",
    customBody: "Wij bouwen de connector. Ons team koppelt WonkaChat aan uw bedrijfssoftware.",
  },
  team: {
    eyebrow: "Het team",
    title: "U staat er niet alleen voor met een stuk software.",
    subtitle:
      "35 AI-consultants in België en Frankrijk zetten uw eerste agents samen met u op, trainen uw teams en gaan dan door naar de volgende use case.",
    steps: [
      { title: "Diagnose", body: "We vinden de taken die uw teams de meeste tijd kosten." },
      { title: "Eerste agent live", body: "Samen met u gebouwd, gekoppeld aan uw tools, in productie." },
      { title: "Adoptie", body: "Training, opvolging en de volgende use case." },
    ],
    cta: "Spreek een consultant",
  },
  video: {
    eyebrow: "Video",
    title: "Zij zeggen het beter dan wij.",
    body: "Pierre Colaiacovo, oprichter en CEO van Respace, over werken met WonkaChat.",
    play: "Video afspelen",
  },
  security: {
    eyebrow: "Beveiliging",
    title: "Uw data blijft van u.",
    columns: [
      { title: "Hosting", items: ["Standaard Azure West Europe", "Dataresidentie in de EU", "Versleuteling in rust en onderweg"] },
      { title: "Controle", items: ["Rechten per team", "Een mens keurt gevoelige acties goed", "Uw data traint nooit publieke modellen"] },
      { title: "Compliance", items: ["ISO 27001-gecertificeerd", "GDPR-conform, DPA inbegrepen", "NIS 2-conform"] },
    ],
    models: "GPT, Claude, Gemini, Mistral: geen lock-in bij één AI-leverancier.",
    cta: "Details beveiliging",
  },
  finalCta: {
    title: "Uw eerste agent in productie. Alleen of samen met ons.",
    subtitle: "Start vandaag gratis, of bespreek uw use case met een consultant.",
  },
};

export const HOME_V2_COPY: Record<Locale, HomeV2Copy> = { en, fr, nl };
