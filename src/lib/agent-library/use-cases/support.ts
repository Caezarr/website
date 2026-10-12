import type { LibraryUseCase } from "../types";

export const SUPPORT_USE_CASES: LibraryUseCase[] = [
  {
    slug: "website-faq-chatbot",
    function: "support",
    sectors: ["retail", "public", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Website FAQ chatbot",
        description:
          "Customers ask the same questions again and again and wait for office hours to get an answer. The agent answers visitors on your website or customer portal from your FAQ, help centre and past answers, and hands over to a person when a case needs it. Customers get instant, consistent answers while the team focuses on the cases that need judgement.",
      },
      fr: {
        name: "Assistant conversationnel FAQ pour votre site",
        description:
          "Les clients posent sans cesse les mêmes questions et attendent les heures d'ouverture pour obtenir une réponse. L'agent répond aux visiteurs sur votre site ou votre portail client à partir de votre FAQ, de votre centre d'aide et des réponses déjà données, et passe la main à une personne quand le cas l'exige. Les clients obtiennent des réponses immédiates et cohérentes, et l'équipe se concentre sur les cas qui demandent du discernement.",
      },
      nl: {
        name: "FAQ-chatbot voor uw website",
        description:
          "Klanten stellen steeds dezelfde vragen en moeten wachten tot de kantooruren voor een antwoord. De agent beantwoordt bezoekers op uw website of klantenportaal op basis van uw FAQ, helpcentrum en eerdere antwoorden, en geeft door aan een medewerker wanneer een vraag dat vereist. Klanten krijgen meteen een eenduidig antwoord en het team focust op de gevallen die inschattingsvermogen vragen.",
      },
    },
  },
  {
    slug: "customer-feedback-analyst",
    function: "support",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Customer feedback and review analyst",
        description:
          "Surveys, online reviews and email tone say a lot about customer satisfaction, but they are scattered and rarely read together. The agent collects feedback forms, public reviews and client email sentiment, clusters the themes and flags early warning signs per account or site. Teams act on dissatisfaction before it turns into churn.",
      },
      fr: {
        name: "Analyse des avis et retours clients",
        description:
          "Enquêtes, avis en ligne et ton des e-mails en disent long sur la satisfaction client, mais ces signaux sont dispersés et rarement lus ensemble. L'agent rassemble formulaires de retour, avis publics et tonalité des e-mails clients, regroupe les thèmes et signale les signaux faibles par compte ou par site. Les équipes agissent sur l'insatisfaction avant qu'elle ne fasse partir des clients.",
      },
      nl: {
        name: "Analyse van klantenfeedback en reviews",
        description:
          "Enquêtes, online reviews en de toon van e-mails zeggen veel over klanttevredenheid, maar ze zijn verspreid en worden zelden samen gelezen. De agent verzamelt feedbackformulieren, publieke reviews en het sentiment in klantenmails, groepeert de thema's en signaleert vroege waarschuwingssignalen per klant of vestiging. Teams pakken ontevredenheid aan voor klanten afhaken.",
      },
    },
  },
  {
    slug: "complaint-handling-assistant",
    function: "support",
    sectors: ["industry", "retail", "construction"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Complaint handling assistant",
        description:
          "Complaints arrive by email in free text and each one needs the history, the root cause and a careful reply. The agent logs every complaint with its history, identifies the likely cause, finds similar past cases and drafts a reply based on your policy. Complaints are answered faster and more consistently, and simple cases go straight to the right handler.",
      },
      fr: {
        name: "Assistant de traitement des réclamations",
        description:
          "Les réclamations arrivent par e-mail en texte libre, et chacune exige l'historique, la cause et une réponse soignée. L'agent enregistre chaque réclamation avec son historique, identifie la cause probable, retrouve des cas similaires et rédige une réponse conforme à votre politique. Les réclamations sont traitées plus vite et de façon plus homogène, et les cas simples vont directement au bon interlocuteur.",
      },
      nl: {
        name: "Assistent voor klachtenbehandeling",
        description:
          "Klachten komen per e-mail binnen in vrije tekst en elke klacht vraagt de voorgeschiedenis, de grondoorzaak en een zorgvuldig antwoord. De agent registreert elke klacht met haar voorgeschiedenis, bepaalt de waarschijnlijke oorzaak, zoekt vergelijkbare eerdere gevallen en stelt een antwoord op volgens uw beleid. Klachten worden sneller en consequenter beantwoord en eenvoudige gevallen gaan rechtstreeks naar de juiste behandelaar.",
      },
    },
  },
  {
    slug: "help-center-article-builder",
    function: "support",
    sectors: ["retail", "industry", "professional-services"],
    tools: ["Confluence"],
    copy: {
      en: {
        name: "Help centre article builder",
        description:
          "The help centre falls behind because nobody turns solved tickets into articles, and outdated procedures stay online. The agent spots recurring answers in resolved tickets and incoming requests, drafts new articles and flags existing pages that are out of date. The knowledge base stays current and self-service keeps improving.",
      },
      fr: {
        name: "Rédaction d'articles pour le centre d'aide",
        description:
          "Le centre d'aide prend du retard car personne ne transforme les tickets résolus en articles, et des procédures obsolètes restent en ligne. L'agent repère les réponses récurrentes dans les tickets résolus et les demandes entrantes, rédige de nouveaux articles et signale les pages existantes devenues obsolètes. La base de connaissances reste à jour et l'autonomie des clients progresse.",
      },
      nl: {
        name: "Artikels voor het helpcentrum opstellen",
        description:
          "Het helpcentrum loopt achter omdat niemand opgeloste tickets omzet in artikels, en verouderde procedures blijven online staan. De agent herkent terugkerende antwoorden in opgeloste tickets en binnenkomende vragen, schrijft nieuwe artikels en signaleert bestaande pagina's die verouderd zijn. De kennisbank blijft actueel en de selfservice wordt steeds beter.",
      },
    },
  },
  {
    slug: "missing-information-chaser",
    function: "support",
    sectors: ["industry", "construction", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Missing information chaser",
        description:
          "Many inbound requests arrive without the details needed to act, such as a serial number, dimensions or a reference, and the team loses days asking for them. The agent checks each request against what is required and immediately asks the sender for what is missing. Requests reach the team complete, and turnaround time drops.",
      },
      fr: {
        name: "Relance des informations manquantes",
        description:
          "De nombreuses demandes arrivent sans les éléments nécessaires pour agir, comme un numéro de série, des dimensions ou une référence, et l'équipe perd des jours à les réclamer. L'agent vérifie chaque demande au regard des informations requises et demande immédiatement à l'expéditeur ce qui manque. Les demandes arrivent complètes et les délais de traitement diminuent.",
      },
      nl: {
        name: "Ontbrekende informatie opvragen",
        description:
          "Veel binnenkomende aanvragen missen de gegevens die nodig zijn om ermee aan de slag te gaan, zoals een serienummer, afmetingen of een referentie, en het team verliest dagen met navragen. De agent toetst elke aanvraag aan wat vereist is en vraagt de afzender meteen naar wat ontbreekt. Aanvragen komen volledig bij het team toe en de doorlooptijd daalt.",
      },
    },
  },
  {
    slug: "booking-communication-assistant",
    function: "support",
    sectors: ["professional-services", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Booking communication assistant",
        description:
          "Booking confirmations and follow-ups are written by hand for each customer and audience. The agent sends confirmations and personalised follow-ups adapted to each booking and customer type. Customers are well informed and the team saves time.",
      },
      fr: {
        name: "Assistant de communication sur les réservations",
        description:
          "Confirmations de réservation et relances sont rédigées à la main pour chaque client et chaque public. L'agent envoie des confirmations et des relances personnalisées, adaptées à chaque réservation et à chaque type de client. Les clients sont bien informés et l'équipe gagne du temps.",
      },
      nl: {
        name: "Assistent voor boekingscommunicatie",
        description:
          "Boekingsbevestigingen en opvolgberichten worden voor elke klant en doelgroep met de hand geschreven. De agent verstuurt bevestigingen en gepersonaliseerde opvolgberichten, afgestemd op elke boeking en elk type klant. Klanten zijn goed geïnformeerd en het team wint tijd.",
      },
    },
  },
  {
    slug: "change-request-to-task-list",
    function: "support",
    sectors: ["professional-services"],
    tools: ["Jira"],
    copy: {
      en: {
        name: "Change request to task list",
        description:
          "Clients describe change requests in long, unstructured messages that the team must decode before starting. The agent turns each request into a concise, step-by-step task list with open questions highlighted. Developers and project staff start work immediately and fewer details are missed.",
      },
      fr: {
        name: "Des demandes de modification aux listes de tâches",
        description:
          "Les clients décrivent leurs demandes de modification dans de longs messages non structurés que l'équipe doit décrypter avant de commencer. L'agent transforme chaque demande en liste de tâches concise, étape par étape, en mettant en évidence les questions ouvertes. Développeurs et équipes projet se mettent au travail immédiatement et moins de détails sont oubliés.",
      },
      nl: {
        name: "Van wijzigingsaanvraag naar takenlijst",
        description:
          "Klanten beschrijven wijzigingsaanvragen in lange, ongestructureerde berichten die het team eerst moet ontcijferen. De agent zet elke aanvraag om in een beknopte takenlijst, stap voor stap, met de open vragen gemarkeerd. Ontwikkelaars en projectmedewerkers starten meteen en er gaan minder details verloren.",
      },
    },
  },
  {
    slug: "customer-service-multi-system-copilot",
    function: "support",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "Customer service copilot across systems",
        description:
          "Answering one customer question often means checking the order system, the payment provider and the shop back office in turn. The agent looks up the case across connected systems and proposes a ready-to-send answer or the next action for the agent. Customer service resolves cases in one place, with fewer handovers.",
      },
      fr: {
        name: "Assistant service client multi-outils",
        description:
          "Répondre à une seule question client oblige souvent à consulter tour à tour le système de commandes, le prestataire de paiement et l'interface d'administration de la boutique. L'agent recherche le dossier dans tous les outils connectés et propose une réponse prête à envoyer ou la prochaine action au conseiller. Le service client résout les dossiers depuis un seul endroit, avec moins de transferts.",
      },
      nl: {
        name: "Copiloot voor klantendienst over systemen heen",
        description:
          "Eén klantvraag beantwoorden betekent vaak na elkaar het ordersysteem, de betaalprovider en de back-office van de webshop raadplegen. De agent zoekt het dossier op in alle gekoppelde systemen en stelt een antwoord voor dat klaar is om te versturen, of de volgende actie voor de medewerker. De klantendienst lost dossiers op één plek op, met minder overdrachten.",
      },
    },
  },
];
