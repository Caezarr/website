import type { Locale } from "@/i18n/config";

export type SectorId =
  | "accounting"
  | "construction"
  | "hospitality"
  | "services"
  | "sales"
  | "marketing"
  | "retail"
  | "support";

export type ChapterId = "templates" | "team" | "triggers" | "analytics";

export interface HomeV2Copy {
  seo: { title: string; description: string };
  award: { label: string; cta: string };
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    videoCta: string;
    demoCaption: string;
    trustedBy: string;
  };
  platform: {
    eyebrow: string;
    title: string;
    chapters: { id: ChapterId; title: string; body: string }[];
  };
  models: {
    eyebrow: string;
    title: string;
    body: string;
    auto: string;
    tasks: { task: string; model: "openai" | "claude" | "gemini" | "mistral"; reason: string }[];
  };
  integrations: {
    eyebrow: string;
    title: string;
    body: string;
    sectors: { id: SectorId; label: string; pitch: string }[];
    everydayTitle: string;
    everydayCount: string;
    customTitle: string;
    customBody: string;
  };
  clients: {
    eyebrow: string;
    title: string;
    videoLabel: string;
    videoQuote: string;
    play: string;
    cases: { metric: string; label: string; client: string; logo: string; href: string }[];
    readCase: string;
  };
  team: {
    eyebrow: string;
    title: string;
    body: string;
    count: string;
    countLabel: string;
    steps: { title: string; body: string }[];
    cta: string;
  };
  security: {
    eyebrow: string;
    title: string;
    columns: { title: string; items: string[] }[];
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
    title: "AI agents that work inside your tools.",
    titleAccent: "And a team that sets them up with you.",
    subtitle:
      "Describe a task, WonkaChat builds the agent and connects it to your tools. Our consultants stay with you until it runs in production.",
    primaryCta: "Start free trial",
    secondaryCta: "Talk to a consultant",
    videoCta: "Hear it from a client",
    demoCaption: "One sentence. One agent, connected to Outlook and HubSpot.",
    trustedBy: "They trust us",
  },
  platform: {
    eyebrow: "The platform",
    title: "Everything AI needs to actually do the work.",
    chapters: [
      {
        id: "templates",
        title: "Start from a proven agent",
        body: "Pick from ready-made agents for sales, finance or operations, already connected to Gmail, Odoo or HubSpot.",
      },
      {
        id: "team",
        title: "Reuse your colleagues' agents",
        body: "Ask in plain words. WonkaChat finds the agent your team already built and runs it for you.",
      },
      {
        id: "triggers",
        title: "Triggered from where work happens",
        body: "A call ends, an email lands: the agent starts on its own and updates your CRM.",
      },
      {
        id: "analytics",
        title: "See what every agent brings back",
        body: "Runs, hours saved, active users: follow adoption agent by agent.",
      },
    ],
  },
  models: {
    eyebrow: "Models",
    title: "The right model for every task.",
    body: "Writing, analysis, sensitive data: each task has the model that fits it best. Switch in one click, or let Auto choose.",
    auto: "Auto picks for you",
    tasks: [
      { task: "Write a commercial offer", model: "claude", reason: "Nuanced writing" },
      { task: "Summarise HR files", model: "mistral", reason: "Sensitive data" },
      { task: "Analyse a sales Excel", model: "openai", reason: "Reasoning on data" },
      { task: "Read a 60-page tender", model: "gemini", reason: "Very long documents" },
    ],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Your tools. And the ones of your industry.",
    body: "WonkaChat plugs into the business software your teams use every day, not just the usual suspects.",
    sectors: [
      { id: "accounting", label: "Accounting firms", pitch: "Bookkeeping, invoices and client files." },
      { id: "construction", label: "Construction", pitch: "Quotes, sites and construction ERPs." },
      { id: "hospitality", label: "Short-term rentals", pitch: "Bookings, guests and housekeeping." },
      { id: "services", label: "Consulting & services", pitch: "Staffing, timesheets and projects." },
      { id: "sales", label: "Sales", pitch: "CRM, calls and pipeline." },
      { id: "marketing", label: "Marketing", pitch: "Social media, campaigns and ads." },
      { id: "retail", label: "E-commerce", pitch: "Orders, payments and stock." },
      { id: "support", label: "Customer support", pitch: "Tickets, chats and messages." },
    ],
    everydayTitle: "Plus everyday tools",
    everydayCount: "70+ connectors",
    customTitle: "Your tool is not listed?",
    customBody: "We build the connector for you.",
  },
  clients: {
    eyebrow: "Clients",
    title: "They say it better than we do.",
    videoLabel: "Pierre Colaiacovo · Founder & CEO, Respace",
    videoQuote: "How Respace works with WonkaChat every day.",
    play: "Play video",
    cases: [
      {
        metric: "−50%",
        label: "time spent on support emails, across 70+ employees",
        client: "N-allo (Engie)",
        logo: "/images/france/logos/n-allo.png",
        href: "/case-studies/n-allo",
      },
      {
        metric: "100%",
        label: "of employees have their own WonkaChat, saving hours every week",
        client: "Itzu",
        logo: "/images/france/logos/itzu.svg",
        href: "/case-studies/itzu",
      },
    ],
    readCase: "Read the case",
  },
  team: {
    eyebrow: "The team",
    title: "You are not left alone with a piece of software.",
    body: "Our AI consultants set up your first agents with you, train your teams, then move on to the next use case.",
    count: "35",
    countLabel: "AI consultants in Belgium and France",
    steps: [
      { title: "Diagnostic", body: "We find the tasks that cost your teams the most time." },
      { title: "First agent live", body: "Built with you, plugged into your tools." },
      { title: "Adoption", body: "Training, follow-up, next use case." },
    ],
    cta: "Talk to a consultant",
  },
  security: {
    eyebrow: "Security",
    title: "Your data stays yours.",
    columns: [
      { title: "Hosting", items: ["Azure West Europe (Microsoft Ireland) by default", "Encryption at rest (AES-256)", "Encryption in transit (TLS 1.2 or higher)"] },
      { title: "Access", items: ["Single Sign-On (SSO) via Azure AD / Entra ID", "Granular permission management per user and team", "Customer data is not used to train public AI models"] },
      { title: "Compliance", items: ["ISO 27001 certified", "GDPR compliant, DPA included", "NIS 2 compliant"] },
    ],
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
    title: "Des agents IA qui travaillent dans vos outils.",
    titleAccent: "Et une équipe qui les met en place avec vous.",
    subtitle:
      "Décrivez une tâche, WonkaChat crée l'agent et le connecte à vos outils. Nos consultants vous accompagnent jusqu'à ce qu'il tourne en production.",
    primaryCta: "Essai gratuit",
    secondaryCta: "Parler à un consultant",
    videoCta: "L'avis d'un client",
    demoCaption: "Une phrase. Un agent, connecté à Outlook et HubSpot.",
    trustedBy: "Ils nous font confiance",
  },
  platform: {
    eyebrow: "La plateforme",
    title: "Tout ce qu'il faut pour que l'IA fasse vraiment le travail.",
    chapters: [
      {
        id: "templates",
        title: "Partez d'un agent qui a fait ses preuves",
        body: "Des agents prêts pour la vente, la finance ou les opérations, déjà connectés à Gmail, Odoo ou HubSpot.",
      },
      {
        id: "team",
        title: "Réutilisez les agents de vos collègues",
        body: "Demandez simplement. WonkaChat trouve l'agent que votre équipe a déjà créé et le lance pour vous.",
      },
      {
        id: "triggers",
        title: "Déclenchés là où le travail se fait",
        body: "Un appel se termine, un mail arrive : l'agent démarre seul et met à jour votre CRM.",
      },
      {
        id: "analytics",
        title: "Voyez ce que chaque agent rapporte",
        body: "Exécutions, heures gagnées, utilisateurs actifs : suivez l'adoption agent par agent.",
      },
    ],
  },
  models: {
    eyebrow: "Modèles",
    title: "Le bon modèle pour chaque tâche.",
    body: "Rédaction, analyse, données sensibles : chaque tâche a le modèle qui lui convient. Changez en un clic, ou laissez Auto choisir.",
    auto: "Auto choisit pour vous",
    tasks: [
      { task: "Rédiger une offre commerciale", model: "claude", reason: "Rédaction nuancée" },
      { task: "Synthétiser des dossiers RH", model: "mistral", reason: "Données sensibles" },
      { task: "Analyser un Excel de ventes", model: "openai", reason: "Raisonnement sur données" },
      { task: "Lire un appel d'offres de 60 pages", model: "gemini", reason: "Documents très longs" },
    ],
  },
  integrations: {
    eyebrow: "Intégrations",
    title: "Vos outils. Et ceux de votre secteur.",
    body: "WonkaChat se branche sur les logiciels métier que vos équipes utilisent chaque jour, pas seulement sur les grands classiques.",
    sectors: [
      { id: "accounting", label: "Fiduciaires & compta", pitch: "Comptabilité, factures et dossiers clients." },
      { id: "construction", label: "BTP", pitch: "Devis, chantiers et ERP de construction." },
      { id: "hospitality", label: "Location courte durée", pitch: "Réservations, voyageurs et ménage." },
      { id: "services", label: "Conseil & services", pitch: "Staffing, temps passés et projets." },
      { id: "sales", label: "Ventes", pitch: "CRM, appels et pipeline." },
      { id: "marketing", label: "Marketing", pitch: "Réseaux sociaux, campagnes et pubs." },
      { id: "retail", label: "E-commerce", pitch: "Commandes, paiements et stock." },
      { id: "support", label: "Service client", pitch: "Tickets, chats et messages." },
    ],
    everydayTitle: "Et vos outils du quotidien",
    everydayCount: "70+ connecteurs",
    customTitle: "Votre outil n'est pas dans la liste ?",
    customBody: "On construit le connecteur pour vous.",
  },
  clients: {
    eyebrow: "Clients",
    title: "Ils en parlent mieux que nous.",
    videoLabel: "Pierre Colaiacovo · Fondateur & CEO, Respace",
    videoQuote: "Comment Respace travaille avec WonkaChat au quotidien.",
    play: "Lancer la vidéo",
    cases: [
      {
        metric: "−50 %",
        label: "de temps sur les mails support, pour plus de 70 employés",
        client: "N-allo (Engie)",
        logo: "/images/france/logos/n-allo.png",
        href: "/case-studies/n-allo",
      },
      {
        metric: "100 %",
        label: "des employés ont leur propre WonkaChat, des heures gagnées chaque semaine",
        client: "Itzu",
        logo: "/images/france/logos/itzu.svg",
        href: "/case-studies/itzu",
      },
    ],
    readCase: "Lire le cas",
  },
  team: {
    eyebrow: "L'équipe",
    title: "Vous n'êtes pas seuls avec un logiciel.",
    body: "Nos consultants IA mettent en place vos premiers agents avec vous, forment vos équipes, puis passent au cas d'usage suivant.",
    count: "35",
    countLabel: "consultants IA en Belgique et en France",
    steps: [
      { title: "Diagnostic", body: "On identifie les tâches qui coûtent le plus de temps à vos équipes." },
      { title: "Premier agent en production", body: "Construit avec vous, branché sur vos outils." },
      { title: "Adoption", body: "Formation, suivi, cas d'usage suivant." },
    ],
    cta: "Parler à un consultant",
  },
  security: {
    eyebrow: "Sécurité",
    title: "Vos données restent les vôtres.",
    columns: [
      { title: "Hébergement", items: ["Azure West Europe (Microsoft Irlande) par défaut", "Chiffrement au repos (AES-256)", "Chiffrement en transit (TLS 1.2 ou supérieur)"] },
      { title: "Accès", items: ["Authentification unique (SSO) via Azure AD / Entra ID", "Gestion fine des permissions par utilisateur et par équipe", "Les données clients ne servent pas à entraîner des modèles d'IA publics"] },
      { title: "Conformité", items: ["Certifié ISO 27001", "Conforme au RGPD, DPA inclus", "Conforme à NIS 2"] },
    ],
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
    title: "AI-agents die in uw tools werken.",
    titleAccent: "En een team dat ze samen met u opzet.",
    subtitle:
      "Beschrijf een taak, WonkaChat bouwt de agent en koppelt hem aan uw tools. Onze consultants begeleiden u tot hij in productie draait.",
    primaryCta: "Gratis proberen",
    secondaryCta: "Spreek een consultant",
    videoCta: "Hoor het van een klant",
    demoCaption: "Eén zin. Eén agent, gekoppeld aan Outlook en HubSpot.",
    trustedBy: "Zij vertrouwen ons",
  },
  platform: {
    eyebrow: "Het platform",
    title: "Alles wat AI nodig heeft om echt het werk te doen.",
    chapters: [
      {
        id: "templates",
        title: "Start vanuit een beproefde agent",
        body: "Kant-en-klare agents voor sales, finance of operations, al gekoppeld aan Gmail, Odoo of HubSpot.",
      },
      {
        id: "team",
        title: "Hergebruik de agents van uw collega's",
        body: "Vraag het gewoon. WonkaChat vindt de agent die uw team al bouwde en voert hem voor u uit.",
      },
      {
        id: "triggers",
        title: "Gestart waar het werk gebeurt",
        body: "Een gesprek eindigt, een mail komt binnen: de agent start vanzelf en werkt uw CRM bij.",
      },
      {
        id: "analytics",
        title: "Zie wat elke agent oplevert",
        body: "Uitvoeringen, bespaarde uren, actieve gebruikers: volg de adoptie per agent.",
      },
    ],
  },
  models: {
    eyebrow: "Modellen",
    title: "Het juiste model voor elke taak.",
    body: "Schrijven, analyse, gevoelige data: elke taak krijgt het model dat het best past. Wissel met één klik, of laat Auto kiezen.",
    auto: "Auto kiest voor u",
    tasks: [
      { task: "Een commerciële offerte schrijven", model: "claude", reason: "Genuanceerd schrijven" },
      { task: "HR-dossiers samenvatten", model: "mistral", reason: "Gevoelige data" },
      { task: "Een sales-Excel analyseren", model: "openai", reason: "Redeneren op data" },
      { task: "Een aanbesteding van 60 pagina's lezen", model: "gemini", reason: "Zeer lange documenten" },
    ],
  },
  integrations: {
    eyebrow: "Integraties",
    title: "Uw tools. En die van uw sector.",
    body: "WonkaChat koppelt aan de bedrijfssoftware die uw teams elke dag gebruiken, niet alleen aan de bekende namen.",
    sectors: [
      { id: "accounting", label: "Boekhoudkantoren", pitch: "Boekhouding, facturen en klantendossiers." },
      { id: "construction", label: "Bouw", pitch: "Offertes, werven en bouw-ERP's." },
      { id: "hospitality", label: "Kortetermijnverhuur", pitch: "Boekingen, gasten en schoonmaak." },
      { id: "services", label: "Consulting & diensten", pitch: "Staffing, timesheets en projecten." },
      { id: "sales", label: "Sales", pitch: "CRM, gesprekken en pipeline." },
      { id: "marketing", label: "Marketing", pitch: "Sociale media, campagnes en advertenties." },
      { id: "retail", label: "E-commerce", pitch: "Bestellingen, betalingen en voorraad." },
      { id: "support", label: "Klantenservice", pitch: "Tickets, chats en berichten." },
    ],
    everydayTitle: "En uw dagelijkse tools",
    everydayCount: "70+ connectoren",
    customTitle: "Staat uw tool er niet tussen?",
    customBody: "Wij bouwen de connector voor u.",
  },
  clients: {
    eyebrow: "Klanten",
    title: "Zij zeggen het beter dan wij.",
    videoLabel: "Pierre Colaiacovo · Oprichter & CEO, Respace",
    videoQuote: "Hoe Respace elke dag met WonkaChat werkt.",
    play: "Video afspelen",
    cases: [
      {
        metric: "−50%",
        label: "tijd op supportmails, voor meer dan 70 medewerkers",
        client: "N-allo (Engie)",
        logo: "/images/france/logos/n-allo.png",
        href: "/case-studies/n-allo",
      },
      {
        metric: "100%",
        label: "van de medewerkers heeft een eigen WonkaChat, elke week uren bespaard",
        client: "Itzu",
        logo: "/images/france/logos/itzu.svg",
        href: "/case-studies/itzu",
      },
    ],
    readCase: "Lees de case",
  },
  team: {
    eyebrow: "Het team",
    title: "U staat er niet alleen voor met een stuk software.",
    body: "Onze AI-consultants zetten uw eerste agents samen met u op, trainen uw teams en gaan dan door naar de volgende use case.",
    count: "35",
    countLabel: "AI-consultants in België en Frankrijk",
    steps: [
      { title: "Diagnose", body: "We vinden de taken die uw teams de meeste tijd kosten." },
      { title: "Eerste agent live", body: "Samen met u gebouwd, gekoppeld aan uw tools." },
      { title: "Adoptie", body: "Training, opvolging, volgende use case." },
    ],
    cta: "Spreek een consultant",
  },
  security: {
    eyebrow: "Beveiliging",
    title: "Uw data blijft van u.",
    columns: [
      { title: "Hosting", items: ["Standaard Azure West Europe (Microsoft Ierland)", "Versleuteling in rust (AES-256)", "Versleuteling tijdens transport (TLS 1.2 of hoger)"] },
      { title: "Toegang", items: ["Single Sign-On (SSO) via Azure AD / Entra ID", "Gedetailleerd rechtenbeheer per gebruiker en team", "Klantdata wordt niet gebruikt om publieke AI-modellen te trainen"] },
      { title: "Compliance", items: ["ISO 27001-gecertificeerd", "AVG-conform, DPA inbegrepen", "NIS 2-conform"] },
    ],
    cta: "Details beveiliging",
  },
  finalCta: {
    title: "Uw eerste agent in productie. Alleen of samen met ons.",
    subtitle: "Start vandaag gratis, of bespreek uw use case met een consultant.",
  },
};

export const HOME_V2_COPY: Record<Locale, HomeV2Copy> = { en, fr, nl };
