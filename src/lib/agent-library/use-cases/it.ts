import type { LibraryUseCase } from "../types";

export const IT_USE_CASES: LibraryUseCase[] = [
  {
    slug: "ask-your-data-assistant",
    function: "it",
    sectors: ["professional-services", "retail", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Ask-your-data assistant",
        description:
          "Business questions on revenue, costs or operations require a data analyst and manual exports. The agent connects to your operational databases and answers questions in natural language with tables and explanations. Managers get answers in minutes without waiting for a report.",
      },
      fr: {
        name: "Assistant pour interroger vos données",
        description:
          "Les questions sur le chiffre d'affaires, les coûts ou l'activité exigent un analyste de données et des exports manuels. L'agent se connecte à vos bases de données opérationnelles et répond en langage naturel, avec tableaux et explications. Les responsables obtiennent leurs réponses en quelques minutes, sans attendre un rapport.",
      },
      nl: {
        name: "Assistent om vragen te stellen aan uw data",
        description:
          "Zakelijke vragen over omzet, kosten of operaties vragen een data-analist en handmatige exports. De agent maakt verbinding met uw operationele databanken en beantwoordt vragen in gewone taal, met tabellen en uitleg. Managers krijgen binnen enkele minuten een antwoord zonder op een rapport te wachten.",
      },
    },
  },
  {
    slug: "master-data-quality-watch",
    function: "it",
    sectors: ["retail", "professional-services", "public"],
    tools: [],
    copy: {
      en: {
        name: "Master data quality watch",
        description:
          "Duplicate, inconsistent or missing data in customer, product or measurement databases breaks reports and processes. The agent detects anomalies, deduplicates records, proposes corrections and keeps a remediation list. Data stays reliable for every team.",
      },
      fr: {
        name: "Contrôle qualité des données de référence",
        description:
          "Des données en double, incohérentes ou manquantes dans les bases clients, produits ou mesures faussent les rapports et bloquent les processus. L'agent détecte les anomalies, supprime les doublons, propose des corrections et tient une liste des actions correctives. Les données restent fiables pour toutes les équipes.",
      },
      nl: {
        name: "Bewaking van de kwaliteit van stamgegevens",
        description:
          "Dubbele, inconsistente of ontbrekende gegevens in klanten-, product- of meetdatabanken verstoren rapporten en processen. De agent spoort afwijkingen op, ontdubbelt records, stelt correcties voor en houdt een lijst met verbeteracties bij. De data blijft betrouwbaar voor elk team.",
      },
    },
  },
  {
    slug: "bi-metric-guide",
    function: "it",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "BI metric guide",
        description:
          "Business users do not know which metric or measure to use and keep asking the BI team. The agent explains available KPIs and calculations and turns business questions into the right existing measures. The BI team spends less time on repetitive questions.",
      },
      fr: {
        name: "Guide des indicateurs décisionnels",
        description:
          "Les utilisateurs métier ne savent pas quel indicateur ou quelle mesure utiliser et sollicitent sans cesse l'équipe d'informatique décisionnelle (BI). L'agent explique les indicateurs clés et les calculs disponibles, et traduit les questions métier en mesures existantes adaptées. L'équipe BI passe moins de temps sur les questions répétitives.",
      },
      nl: {
        name: "Gids voor BI-indicatoren",
        description:
          "Zakelijke gebruikers weten niet welke indicator of meetwaarde ze moeten gebruiken en blijven het BI-team vragen stellen. De agent legt de beschikbare KPI's en berekeningen uit en vertaalt zakelijke vragen naar de juiste bestaande meetwaarden. Het BI-team besteedt minder tijd aan repetitieve vragen.",
      },
    },
  },
];
