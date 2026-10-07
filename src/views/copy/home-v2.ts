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
export type ModelId = "openai" | "claude" | "gemini" | "mistral";
export type SecurityTileId = "iso" | "gdpr" | "nis2" | "eu" | "encryption" | "sso";

export interface HomeV2Copy {
  seo: { title: string; description: string };
  award: { label: string };
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
    proofs: { metric: string; label: string; source: string; logo?: string }[];
    chapters: { id: ChapterId; title: string; body: string }[];
  };
  models: {
    eyebrow: string;
    title: string;
    body: string;
    auto: string;
    light: string;
    advanced: string;
    tasks: { task: string; model: ModelId; tier: "light" | "advanced" }[];
    costTitle: string;
    costAll: string;
    costRouted: string;
    costNote: string;
    costFoot: string;
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
    pageCta: string;
  };
  security: {
    eyebrow: string;
    title: string;
    tiles: { id: SecurityTileId; label: string }[];
    cta: string;
  };
  finalCta: { title: string; subtitle: string };
}

const NALLO = "/images/france/logos/n-allo.png";
const ITZU = "/images/france/logos/itzu.svg";

const en: HomeV2Copy = {
  seo: {
    title: "WonkaChat | AI agents set up with you, inside your tools",
    description:
      "Describe a task, WonkaChat builds the agent, connects it to your tools and shares it with your teams. 35 AI consultants help you get it into production.",
  },
  award: { label: "#1 AI start-up of the year · Belgium Startup Awards 2026" },
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
    eyebrow: "What changes",
    title: "Hours handed back to your teams, every week.",
    proofs: [
      { metric: "−50%", label: "time on support emails", source: "N-allo (Engie), 70+ employees", logo: NALLO },
      { metric: "100%", label: "of employees with their own WonkaChat", source: "Itzu", logo: ITZU },
      { metric: "200", label: "organisations taught us what AI changes at work", source: "Wonka" },
    ],
    chapters: [
      {
        id: "templates",
        title: "Useful from day one",
        body: "Start from proven agents for sales, finance or operations, already plugged into Gmail, Odoo or HubSpot. No blank page.",
      },
      {
        id: "team",
        title: "One person builds it, the whole team benefits",
        body: "Ask in plain words: WonkaChat finds the agent a colleague already built and runs it for you.",
      },
      {
        id: "triggers",
        title: "Your CRM fills itself after every call",
        body: "A call ends, an email lands: the agent starts, writes and updates HubSpot without anyone thinking about it.",
      },
      {
        id: "analytics",
        title: "You finally see what AI brings back",
        body: "Hours saved, runs, adoption per team: every agent is accountable.",
      },
    ],
  },
  models: {
    eyebrow: "Models",
    title: "The right model for every task. Not a token more.",
    body: "At company scale, sending every request to the most powerful model gets expensive. WonkaChat routes each task to the model that fits: power where it matters, light models everywhere else.",
    auto: "Auto routing",
    light: "Light",
    advanced: "Advanced",
    tasks: [
      { task: "Sort 2,000 incoming emails", model: "mistral", tier: "light" },
      { task: "Summarise a meeting", model: "gemini", tier: "light" },
      { task: "Analyse a sales Excel", model: "openai", tier: "advanced" },
      { task: "Write a commercial offer", model: "claude", tier: "advanced" },
    ],
    costTitle: "Token bill",
    costAll: "Everything on the most powerful model",
    costRouted: "Routed by WonkaChat",
    costNote: "Illustration",
    costFoot: "Advanced models only run the tasks that need them.",
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
        logo: NALLO,
        href: "/case-studies/n-allo",
      },
      {
        metric: "100%",
        label: "of employees have their own WonkaChat, saving hours every week",
        client: "Itzu",
        logo: ITZU,
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
    pageCta: "Meet the team",
  },
  security: {
    eyebrow: "Security",
    title: "Your data stays yours.",
    tiles: [
      { id: "eu", label: "Hosted in Europe" },
      { id: "encryption", label: "Encrypted at rest and in transit" },
      { id: "sso", label: "SSO with Entra ID" },
      { id: "iso", label: "ISO 27001" },
      { id: "gdpr", label: "GDPR" },
      { id: "nis2", label: "NIS 2" },
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
  award: { label: "Start-up IA n°1 de l'année · Belgium Startup Awards 2026" },
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
    eyebrow: "Ce qui change",
    title: "Des heures rendues à vos équipes, chaque semaine.",
    proofs: [
      { metric: "−50 %", label: "de temps sur les mails support", source: "N-allo (Engie), 70+ employés", logo: NALLO },
      { metric: "100 %", label: "des employés équipés de leur WonkaChat", source: "Itzu", logo: ITZU },
      { metric: "200", label: "organisations nous ont appris ce que l'IA change au travail", source: "Wonka" },
    ],
    chapters: [
      {
        id: "templates",
        title: "Utile dès le premier jour",
        body: "Partez d'agents éprouvés pour la vente, la finance ou les opérations, déjà branchés sur Gmail, Odoo ou HubSpot. Pas de page blanche.",
      },
      {
        id: "team",
        title: "Une personne le construit, toute l'équipe en profite",
        body: "Demandez simplement : WonkaChat retrouve l'agent qu'un collègue a déjà créé et le lance pour vous.",
      },
      {
        id: "triggers",
        title: "Le CRM se remplit tout seul après chaque appel",
        body: "Un appel se termine, un mail arrive : l'agent démarre, rédige et met à jour HubSpot sans que personne n'y pense.",
      },
      {
        id: "analytics",
        title: "Vous voyez enfin ce que l'IA rapporte",
        body: "Heures gagnées, exécutions, adoption par équipe : chaque agent rend des comptes.",
      },
    ],
  },
  models: {
    eyebrow: "Modèles",
    title: "Le bon modèle pour chaque tâche. Pas un token de plus.",
    body: "À l'échelle d'une entreprise, envoyer chaque demande au modèle le plus puissant coûte cher. WonkaChat oriente chaque tâche vers le modèle adapté : la puissance là où elle compte, des modèles légers partout ailleurs.",
    auto: "Routage automatique",
    light: "Léger",
    advanced: "Avancé",
    tasks: [
      { task: "Trier 2 000 mails entrants", model: "mistral", tier: "light" },
      { task: "Résumer une réunion", model: "gemini", tier: "light" },
      { task: "Analyser un Excel de ventes", model: "openai", tier: "advanced" },
      { task: "Rédiger une offre commerciale", model: "claude", tier: "advanced" },
    ],
    costTitle: "Facture de tokens",
    costAll: "Tout sur le modèle le plus puissant",
    costRouted: "Routé par WonkaChat",
    costNote: "Illustration",
    costFoot: "Les modèles avancés ne tournent que sur les tâches qui en ont besoin.",
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
        logo: NALLO,
        href: "/case-studies/n-allo",
      },
      {
        metric: "100 %",
        label: "des employés ont leur propre WonkaChat, des heures gagnées chaque semaine",
        client: "Itzu",
        logo: ITZU,
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
    pageCta: "Rencontrer l'équipe",
  },
  security: {
    eyebrow: "Sécurité",
    title: "Vos données restent les vôtres.",
    tiles: [
      { id: "eu", label: "Hébergé en Europe" },
      { id: "encryption", label: "Chiffré au repos et en transit" },
      { id: "sso", label: "SSO avec Entra ID" },
      { id: "iso", label: "ISO 27001" },
      { id: "gdpr", label: "RGPD" },
      { id: "nis2", label: "NIS 2" },
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
  award: { label: "#1 AI-start-up van het jaar · Belgium Startup Awards 2026" },
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
    eyebrow: "Wat er verandert",
    title: "Elke week uren terug voor uw teams.",
    proofs: [
      { metric: "−50%", label: "tijd op supportmails", source: "N-allo (Engie), 70+ medewerkers", logo: NALLO },
      { metric: "100%", label: "van de medewerkers met een eigen WonkaChat", source: "Itzu", logo: ITZU },
      { metric: "200", label: "organisaties leerden ons wat AI verandert op het werk", source: "Wonka" },
    ],
    chapters: [
      {
        id: "templates",
        title: "Nuttig vanaf dag één",
        body: "Start vanuit beproefde agents voor sales, finance of operations, al gekoppeld aan Gmail, Odoo of HubSpot. Geen blanco pagina.",
      },
      {
        id: "team",
        title: "Eén persoon bouwt hem, het hele team profiteert",
        body: "Vraag het gewoon: WonkaChat vindt de agent die een collega al bouwde en voert hem voor u uit.",
      },
      {
        id: "triggers",
        title: "Uw CRM vult zichzelf na elk gesprek",
        body: "Een gesprek eindigt, een mail komt binnen: de agent start, schrijft en werkt HubSpot bij zonder dat iemand eraan denkt.",
      },
      {
        id: "analytics",
        title: "U ziet eindelijk wat AI oplevert",
        body: "Bespaarde uren, uitvoeringen, adoptie per team: elke agent legt verantwoording af.",
      },
    ],
  },
  models: {
    eyebrow: "Modellen",
    title: "Het juiste model voor elke taak. Geen token te veel.",
    body: "Op bedrijfsschaal wordt elke vraag naar het krachtigste model sturen duur. WonkaChat stuurt elke taak naar het model dat past: kracht waar het telt, lichte modellen overal elders.",
    auto: "Automatische routing",
    light: "Licht",
    advanced: "Geavanceerd",
    tasks: [
      { task: "2.000 inkomende mails sorteren", model: "mistral", tier: "light" },
      { task: "Een vergadering samenvatten", model: "gemini", tier: "light" },
      { task: "Een sales-Excel analyseren", model: "openai", tier: "advanced" },
      { task: "Een commerciële offerte schrijven", model: "claude", tier: "advanced" },
    ],
    costTitle: "Tokenfactuur",
    costAll: "Alles op het krachtigste model",
    costRouted: "Gerouteerd door WonkaChat",
    costNote: "Illustratie",
    costFoot: "Geavanceerde modellen draaien alleen op de taken die ze nodig hebben.",
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
        logo: NALLO,
        href: "/case-studies/n-allo",
      },
      {
        metric: "100%",
        label: "van de medewerkers heeft een eigen WonkaChat, elke week uren bespaard",
        client: "Itzu",
        logo: ITZU,
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
    pageCta: "Ontmoet het team",
  },
  security: {
    eyebrow: "Beveiliging",
    title: "Uw data blijft van u.",
    tiles: [
      { id: "eu", label: "Gehost in Europa" },
      { id: "encryption", label: "Versleuteld in rust en tijdens transport" },
      { id: "sso", label: "SSO met Entra ID" },
      { id: "iso", label: "ISO 27001" },
      { id: "gdpr", label: "AVG" },
      { id: "nis2", label: "NIS 2" },
    ],
    cta: "Details beveiliging",
  },
  finalCta: {
    title: "Uw eerste agent in productie. Alleen of samen met ons.",
    subtitle: "Start vandaag gratis, of bespreek uw use case met een consultant.",
  },
};

export const HOME_V2_COPY: Record<Locale, HomeV2Copy> = { en, fr, nl };
