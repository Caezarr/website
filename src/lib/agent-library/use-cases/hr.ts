import type { LibraryUseCase } from "../types";

export const HR_USE_CASES: LibraryUseCase[] = [
  {
    slug: "hr-policy-drafter",
    function: "hr",
    sectors: ["construction", "industry", "professional-services"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "HR policy drafter",
        description:
          "New topics require new internal policies, written from scratch with legal checks. The agent drafts the policy from your existing templates and the relevant legislation, with points to validate. HR publishes clear, compliant policies faster.",
      },
      fr: {
        name: "Rédaction de politiques RH",
        description:
          "Chaque nouveau sujet exige une nouvelle politique interne, rédigée à partir de zéro et vérifiée juridiquement. L'agent rédige la politique à partir de vos modèles existants et de la législation applicable, en indiquant les points à valider. Les ressources humaines publient plus vite des politiques claires et conformes.",
      },
      nl: {
        name: "Opsteller van HR-beleid",
        description:
          "Nieuwe thema's vragen nieuw intern beleid, van nul geschreven en juridisch nagekeken. De agent stelt het beleid op vanuit uw bestaande sjablonen en de relevante wetgeving, met de punten die nog gevalideerd moeten worden. HR publiceert sneller helder en conform beleid.",
      },
    },
  },
  {
    slug: "hr-sensitive-letter-drafter",
    function: "hr",
    sectors: ["construction", "industry", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Sensitive HR letter drafter",
        description:
          "Warnings, policy announcements and other sensitive HR letters must be legally sound and carefully worded. The agent drafts the letter from the employee record and the applicable rules, ready for HR review. Letters are correct and consistent while HR keeps control.",
      },
      fr: {
        name: "Rédaction de courriers RH sensibles",
        description:
          "Avertissements, annonces de politique interne et autres courriers RH sensibles doivent être juridiquement solides et soigneusement formulés. L'agent rédige le courrier à partir du dossier du salarié et des règles applicables, prêt à être relu par les RH. Les courriers sont justes et homogènes, et les RH gardent la main.",
      },
      nl: {
        name: "Opsteller van gevoelige HR-brieven",
        description:
          "Verwittigingen, beleidsaankondigingen en andere gevoelige HR-brieven moeten juridisch correct en zorgvuldig geformuleerd zijn. De agent stelt de brief op vanuit het personeelsdossier en de geldende regels, klaar voor nalezing door HR. Brieven zijn correct en consequent, en HR houdt de controle.",
      },
    },
  },
  {
    slug: "interview-question-preparer",
    function: "hr",
    sectors: ["professional-services", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Interview question preparer",
        description:
          "Interviewers prepare questions at the last minute and interviews vary from one candidate to another. The agent reads the role and the candidate's CV and prepares a tailored set of interview questions. Interviews are better prepared and more comparable.",
      },
      fr: {
        name: "Préparation des questions d'entretien",
        description:
          "Les recruteurs préparent leurs questions à la dernière minute et les entretiens varient d'un candidat à l'autre. L'agent lit la fiche de poste et le CV du candidat, et prépare une série de questions d'entretien sur mesure. Les entretiens sont mieux préparés et plus comparables.",
      },
      nl: {
        name: "Voorbereiding van sollicitatievragen",
        description:
          "Interviewers bereiden hun vragen op het laatste moment voor en gesprekken verschillen van kandidaat tot kandidaat. De agent leest de functie en het cv van de kandidaat en stelt een reeks gerichte interviewvragen op. Gesprekken zijn beter voorbereid en beter vergelijkbaar.",
      },
    },
  },
  {
    slug: "hr-mailbox-triage",
    function: "hr",
    sectors: ["industry", "retail", "professional-services"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "HR mailbox triage",
        description:
          "The HR mailbox mixes payroll, leave, contract and certificate requests, all sorted by hand. The agent classifies each request, routes it to the right HR handler and drafts answers to frequent questions. Employees get faster answers and HR handles the real cases.",
      },
      fr: {
        name: "Tri de la boîte mail RH",
        description:
          "La boîte mail RH mélange demandes de paie, de congés, de contrats et d'attestations, toutes triées à la main. L'agent classe chaque demande, l'oriente vers le bon gestionnaire RH et rédige les réponses aux questions fréquentes. Les salariés obtiennent des réponses plus rapides et les RH se consacrent aux vrais dossiers.",
      },
      nl: {
        name: "Sortering van de HR-mailbox",
        description:
          "De HR-mailbox mengt vragen over loon, verlof, contracten en attesten, die allemaal met de hand gesorteerd worden. De agent classificeert elke vraag, stuurt ze naar de juiste HR-medewerker en stelt antwoorden op veelgestelde vragen op. Medewerkers krijgen sneller antwoord en HR behandelt de echte dossiers.",
      },
    },
  },
  {
    slug: "hr-records-assistant",
    function: "hr",
    sectors: ["professional-services", "industry"],
    tools: ["Google Drive"],
    copy: {
      en: {
        name: "HR records assistant",
        description:
          "Questions such as which documents expire soon, which equipment is due for renewal or who is on long leave require searching many files. The agent answers these questions across employee files and HR systems and sends proactive reminders. HR stays ahead of deadlines.",
      },
      fr: {
        name: "Assistant dossiers du personnel",
        description:
          "Des questions comme quels documents expirent bientôt, quel équipement doit être renouvelé ou qui est en congé longue durée obligent à fouiller de nombreux dossiers. L'agent répond à ces questions à partir des dossiers du personnel et des outils RH, et envoie des rappels proactifs. Les RH gardent une longueur d'avance sur les échéances.",
      },
      nl: {
        name: "Assistent voor personeelsdossiers",
        description:
          "Vragen zoals welke documenten binnenkort vervallen, welk materiaal aan vervanging toe is of wie langdurig afwezig is, vereisen zoekwerk in veel bestanden. De agent beantwoordt deze vragen over personeelsdossiers en HR-systemen heen en verstuurt proactief herinneringen. HR blijft de deadlines voor.",
      },
    },
  },
  {
    slug: "job-posting-writer",
    function: "hr",
    sectors: ["professional-services", "industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Job posting writer",
        description:
          "Job ads are written from old postings and do not always reflect the role or attract the right people. The agent drafts a clear, attractive job posting from the role profile, adapted to the target audience. Vacancies are published faster with better quality ads.",
      },
      fr: {
        name: "Rédaction d'offres d'emploi",
        description:
          "Les offres d'emploi sont rédigées à partir d'anciennes annonces et ne reflètent pas toujours le poste ni n'attirent les bons profils. L'agent rédige une offre claire et attractive à partir de la fiche de poste, adaptée au public visé. Les postes sont publiés plus vite avec des annonces de meilleure qualité.",
      },
      nl: {
        name: "Opsteller van vacatureteksten",
        description:
          "Vacatures worden geschreven op basis van oude teksten en geven niet altijd de functie weer of trekken niet de juiste mensen aan. De agent stelt een heldere, aantrekkelijke vacaturetekst op vanuit het functieprofiel, afgestemd op de doelgroep. Vacatures worden sneller gepubliceerd, met betere teksten.",
      },
    },
  },
  {
    slug: "on-call-allowance-calculator",
    function: "hr",
    sectors: ["professional-services", "industry"],
    tools: [],
    copy: {
      en: {
        name: "On-call and allowance calculator",
        description:
          "On-call duties and evening or weekend allowances follow complex rules and are calculated by hand. The agent distributes duties according to the rules and calculates allowances per employee for payroll. Payroll inputs are correct and fair.",
      },
      fr: {
        name: "Calcul des astreintes et des indemnités",
        description:
          "Les astreintes et les indemnités de soirée ou de week-end obéissent à des règles complexes et sont calculées à la main. L'agent répartit les astreintes selon les règles et calcule les indemnités de chaque salarié pour la paie. Les éléments de paie sont justes et équitables.",
      },
      nl: {
        name: "Berekening van wachtdiensten en vergoedingen",
        description:
          "Wachtdiensten en vergoedingen voor avond- of weekendwerk volgen complexe regels en worden met de hand berekend. De agent verdeelt de diensten volgens de regels en berekent de vergoedingen per medewerker voor de loonverwerking. De gegevens voor de lonen zijn correct en billijk.",
      },
    },
  },
  {
    slug: "personal-training-path",
    function: "hr",
    sectors: ["retail", "industry"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Personal training path generator",
        description:
          "Training plans rarely combine an employee's history, legal requirements and the skills their role needs. The agent cross-checks these sources and proposes a personalised training path for each employee. Development plans are relevant and compliance training is never missed.",
      },
      fr: {
        name: "Générateur de parcours de formation individuels",
        description:
          "Les plans de formation croisent rarement l'historique du salarié, les obligations légales et les compétences requises par son poste. L'agent recoupe ces sources et propose un parcours de formation personnalisé pour chaque salarié. Les plans de développement sont pertinents et aucune formation obligatoire n'est oubliée.",
      },
      nl: {
        name: "Persoonlijk opleidingstraject",
        description:
          "Opleidingsplannen combineren zelden de historiek van een medewerker, de wettelijke verplichtingen en de vaardigheden die zijn functie vraagt. De agent kruist deze bronnen en stelt voor elke medewerker een persoonlijk opleidingstraject voor. Ontwikkelingsplannen zijn relevant en verplichte opleidingen worden nooit gemist.",
      },
    },
  },
  {
    slug: "shift-schedule-planner",
    function: "hr",
    sectors: ["professional-services", "retail", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Shift schedule planner",
        description:
          "Monthly rosters, replacements and availability are juggled by hand. The agent collects availability, proposes an optimal schedule and suggests replacements when someone drops out. Rosters are fair and published on time.",
      },
      fr: {
        name: "Planification des équipes",
        description:
          "Plannings mensuels, remplacements et disponibilités se gèrent à la main. L'agent recueille les disponibilités, propose un planning optimal et suggère des remplaçants en cas de désistement. Les plannings sont équitables et publiés à temps.",
      },
      nl: {
        name: "Planning van shiften en uurroosters",
        description:
          "Maandelijkse uurroosters, vervangingen en beschikbaarheden worden met de hand op elkaar afgestemd. De agent verzamelt beschikbaarheden, stelt een optimale planning voor en zoekt een vervanger wanneer iemand uitvalt. Uurroosters zijn billijk en op tijd gepubliceerd.",
      },
    },
  },
  {
    slug: "talent-pool-rematcher",
    function: "hr",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Talent pool rematcher",
        description:
          "Good past applicants are forgotten once a vacancy closes. The agent keeps a searchable pool of previous candidates and suggests matching profiles as soon as a new vacancy opens. Roles are filled faster from people who already showed interest.",
      },
      fr: {
        name: "Réactivation du vivier de candidats",
        description:
          "Les bons candidats passés sont oubliés une fois le poste pourvu. L'agent tient un vivier consultable des candidats précédents et suggère des profils correspondants dès qu'un nouveau poste s'ouvre. Les postes sont pourvus plus vite par des personnes qui ont déjà montré leur intérêt.",
      },
      nl: {
        name: "Opnieuw matchen uit de kandidatenpool",
        description:
          "Goede kandidaten van vroeger worden vergeten zodra een vacature gesloten is. De agent houdt een doorzoekbare pool van eerdere kandidaten bij en stelt passende profielen voor zodra een nieuwe vacature opengaat. Functies worden sneller ingevuld met mensen die al interesse toonden.",
      },
    },
  },
];
