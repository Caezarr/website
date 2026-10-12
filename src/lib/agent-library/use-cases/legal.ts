import type { LibraryUseCase } from "../types";

export const LEGAL_USE_CASES: LibraryUseCase[] = [
  {
    slug: "litigation-file-assistant",
    function: "legal",
    sectors: ["professional-services"],
    tools: ["Outlook", "SharePoint"],
    copy: {
      en: {
        name: "Litigation file assistant",
        description:
          "Preparing a contested file means analysing arguments, assembling documents and coordinating hearings across many emails. The agent drafts a structured response from the file and past cases, builds a complete, ordered document bundle and keeps hearing dates and outcomes up to date. Lawyers spend their time on the argument, not the admin.",
      },
      fr: {
        name: "Assistant pour dossiers contentieux",
        description:
          "Préparer un dossier contentieux suppose d'analyser les arguments, de rassembler les pièces et d'organiser les audiences au fil de nombreux e-mails. L'agent rédige une réponse structurée à partir du dossier et des affaires passées, constitue un bordereau de pièces complet et ordonné, et tient à jour les dates d'audience et les décisions. Les avocats se consacrent à l'argumentation, pas à l'administratif.",
      },
      nl: {
        name: "Assistent voor geschillendossiers",
        description:
          "Een betwist dossier voorbereiden betekent argumenten analyseren, stukken verzamelen en zittingen afstemmen via talloze e-mails. De agent stelt een gestructureerd antwoord op uit het dossier en eerdere zaken, bundelt alle stukken volledig en in volgorde, en houdt zittingsdata en uitspraken up-to-date. Advocaten besteden hun tijd aan de argumentatie, niet aan de administratie.",
      },
    },
  },
  {
    slug: "claim-escalation-assistant",
    function: "legal",
    sectors: ["professional-services", "finance"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Claim deadline and escalation assistant",
        description:
          "Unpaid claims move through notices, deadlines and escalation steps that are easy to miss. The agent monitors deadlines, sends reminders, requests missing documents and prepares the file for the next stage, including insolvency filings, for human approval. No claim stalls or misses a deadline.",
      },
      fr: {
        name: "Assistant échéances et relances de créances",
        description:
          "Les créances impayées passent par des mises en demeure, des délais et des étapes de recouvrement faciles à manquer. L'agent surveille les échéances, envoie les relances, réclame les pièces manquantes et prépare le dossier pour l'étape suivante, y compris les déclarations en procédure collective, soumises à validation humaine. Aucune créance ne reste bloquée ni ne laisse passer un délai.",
      },
      nl: {
        name: "Assistent voor termijnen en escalatie van vorderingen",
        description:
          "Onbetaalde vorderingen doorlopen aanmaningen, termijnen en escalatiestappen die gemakkelijk over het hoofd worden gezien. De agent bewaakt de termijnen, verstuurt herinneringen, vraagt ontbrekende stukken op en bereidt het dossier voor op de volgende fase, inclusief aangiftes van schuldvordering bij faillissement, ter goedkeuring door een medewerker. Geen enkele vordering blijft hangen of mist een termijn.",
      },
    },
  },
  {
    slug: "regulation-qa-assistant",
    function: "legal",
    sectors: ["public", "construction", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Regulation Q&A assistant",
        description:
          "Staff regularly need to know what a regulation, standard or guideline says for a specific case, and searching official texts is slow. The agent answers questions from the applicable regulations, standards and internal guidelines, always citing the source and stating its limits. Teams get reliable answers quickly while final decisions stay with the expert.",
      },
      fr: {
        name: "Assistant questions-réponses réglementaires",
        description:
          "Vos équipes ont souvent besoin de savoir ce qu'une réglementation, une norme ou une directive prévoit dans un cas précis, et chercher dans les textes officiels prend du temps. L'agent répond à partir des réglementations, normes et règles internes applicables, en citant toujours la source et en précisant ses limites. Les équipes obtiennent vite des réponses fiables, et la décision finale reste à l'expert.",
      },
      nl: {
        name: "Vraag-en-antwoordassistent over regelgeving",
        description:
          "Medewerkers moeten regelmatig weten wat een regelgeving, norm of richtlijn voorschrijft voor een concreet geval, en zoeken in officiële teksten gaat traag. De agent beantwoordt vragen op basis van de geldende regelgeving, normen en interne richtlijnen, vermeldt altijd de bron en geeft zijn grenzen aan. Teams krijgen snel betrouwbare antwoorden, terwijl de eindbeslissing bij de expert blijft.",
      },
    },
  },
  {
    slug: "document-summary-and-risk-reader",
    function: "legal",
    sectors: ["professional-services", "public", "finance"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Document summary and risk reader",
        description:
          "Long contracts, studies and incoming documents must be read before anyone can decide what to do. The agent summarises each document, extracts key clauses, deadlines and risks, and flags inconsistencies with related quotes or orders. Decision makers get the essentials in minutes and route documents to the right person.",
      },
      fr: {
        name: "Synthèse de documents et détection des risques",
        description:
          "Contrats longs, études et documents entrants doivent être lus avant de savoir quoi en faire. L'agent résume chaque document, en extrait les clauses clés, les échéances et les risques, et signale les incohérences avec les devis ou commandes associés. Les décideurs ont l'essentiel en quelques minutes et transmettent chaque document à la bonne personne.",
      },
      nl: {
        name: "Samenvatting en risicoanalyse van documenten",
        description:
          "Lange contracten, studies en inkomende documenten moeten gelezen worden voor iemand kan beslissen wat er moet gebeuren. De agent vat elk document samen, haalt de belangrijkste clausules, termijnen en risico's eruit en signaleert inconsistenties met de bijhorende offertes of bestellingen. Beslissers hebben de kern binnen enkele minuten en sturen documenten naar de juiste persoon.",
      },
    },
  },
  {
    slug: "trademark-clearance-assistant",
    function: "legal",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Trademark clearance and classification assistant",
        description:
          "Checking whether a brand name is available, classifying goods and services and preparing a protection proposal takes many manual searches. The agent searches the relevant registers, proposes the classification, summarises conflicts from watch alerts and drafts the protection advice. Attorneys review a ready file instead of starting from scratch.",
      },
      fr: {
        name: "Assistant recherche d'antériorité et classement de marques",
        description:
          "Vérifier la disponibilité d'un nom de marque, classer les produits et services et préparer une proposition de protection exige de nombreuses recherches manuelles. L'agent interroge les registres pertinents, propose le classement, synthétise les conflits issus des alertes de surveillance et rédige l'avis de protection. Les conseils en propriété industrielle relisent un dossier prêt au lieu de partir de zéro.",
      },
      nl: {
        name: "Assistent voor merkonderzoek en classificatie",
        description:
          "Nagaan of een merknaam beschikbaar is, waren en diensten classificeren en een beschermingsvoorstel opstellen vraagt heel wat handmatig zoekwerk. De agent doorzoekt de relevante registers, stelt de classificatie voor, vat conflicten uit bewakingsmeldingen samen en stelt het beschermingsadvies op. Merkengemachtigden controleren een kant-en-klaar dossier in plaats van van nul te beginnen.",
      },
    },
  },
  {
    slug: "case-file-setup",
    function: "legal",
    sectors: ["professional-services"],
    tools: ["SharePoint", "Outlook"],
    copy: {
      en: {
        name: "New case file setup",
        description:
          "Opening a new client file means acknowledging receipt, creating the folder, entering data and checking the documents received. The agent handles the intake: it acknowledges the request, creates and names the file, fills in client data and lists missing documents. Files are opened the same day and complete from the start.",
      },
      fr: {
        name: "Ouverture de nouveaux dossiers",
        description:
          "Ouvrir un dossier client suppose d'accuser réception, de créer le dossier, de saisir les données et de vérifier les pièces reçues. L'agent prend en charge cette ouverture : il accuse réception de la demande, crée et nomme le dossier, renseigne les données du client et liste les pièces manquantes. Les dossiers sont ouverts le jour même et complets dès le départ.",
      },
      nl: {
        name: "Opstart van een nieuw dossier",
        description:
          "Een nieuw klantendossier openen betekent ontvangst bevestigen, de map aanmaken, gegevens invoeren en de ontvangen stukken nakijken. De agent neemt de intake voor zijn rekening: hij bevestigt de aanvraag, maakt het dossier aan en geeft het een naam, vult de klantgegevens in en lijst de ontbrekende stukken op. Dossiers worden dezelfde dag geopend en zijn van bij de start volledig.",
      },
    },
  },
  {
    slug: "contract-drafting-from-intake",
    function: "legal",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Contract drafting from intake form",
        description:
          "Standard contracts such as mandates or employment agreements are filled in by copying data from emails and forms. The agent takes the intake data, selects the right clauses and produces a personalised draft contract for review. Drafts are ready faster and with fewer copy-paste errors.",
      },
      fr: {
        name: "Rédaction de contrats depuis un formulaire",
        description:
          "Les contrats types, comme les mandats ou les contrats de travail, sont remplis en recopiant des données issues d'e-mails et de formulaires. L'agent reprend les données collectées, sélectionne les bonnes clauses et produit un projet de contrat personnalisé à relire. Les projets sont prêts plus vite, avec moins d'erreurs de copier-coller.",
      },
      nl: {
        name: "Contract opstellen vanuit een intakeformulier",
        description:
          "Standaardcontracten zoals mandaten of arbeidsovereenkomsten worden ingevuld door gegevens te kopiëren uit e-mails en formulieren. De agent neemt de intakegegevens, kiest de juiste clausules en maakt een gepersonaliseerd ontwerpcontract ter nalezing. Ontwerpen zijn sneller klaar en bevatten minder kopieerfouten.",
      },
    },
  },
  {
    slug: "document-approval-routing",
    function: "legal",
    sectors: ["professional-services", "construction"],
    tools: ["SharePoint", "Outlook"],
    copy: {
      en: {
        name: "Document approval routing",
        description:
          "Documents needing review or signature move from desk to desk and their status is unclear. The agent prepares the document with the right cover page, routes it to the correct reviewer and tracks approval until signature. Approvals move faster and nothing waits forgotten.",
      },
      fr: {
        name: "Circuit de validation des documents",
        description:
          "Les documents à relire ou à signer passent de bureau en bureau et leur statut reste flou. L'agent prépare le document avec la bonne page de garde, l'envoie au bon relecteur et suit la validation jusqu'à la signature. Les validations avancent plus vite et rien ne reste oublié.",
      },
      nl: {
        name: "Goedkeuringsflow voor documenten",
        description:
          "Documenten die nagelezen of ondertekend moeten worden, gaan van bureau naar bureau en hun status is onduidelijk. De agent bereidt het document voor met het juiste voorblad, stuurt het naar de juiste nalezer en volgt de goedkeuring op tot de ondertekening. Goedkeuringen verlopen sneller en niets blijft vergeten liggen.",
      },
    },
  },
  {
    slug: "permit-decision-analyst",
    function: "legal",
    sectors: ["public"],
    tools: [],
    copy: {
      en: {
        name: "Permit decision pattern analyst",
        description:
          "Patterns in how permits are granted or refused across areas are invisible without analysis. The agent analyses historical decisions, highlights deviations and compares policies. Policy makers align practices on evidence.",
      },
      fr: {
        name: "Analyse des décisions d'autorisation",
        description:
          "Sans analyse, impossible de voir comment les autorisations sont accordées ou refusées d'un territoire à l'autre. L'agent analyse les décisions passées, met en évidence les écarts et compare les pratiques. Les décideurs publics harmonisent leurs pratiques sur des bases objectives.",
      },
      nl: {
        name: "Analyse van patronen in vergunningsbeslissingen",
        description:
          "Patronen in hoe vergunningen per gebied worden verleend of geweigerd, blijven onzichtbaar zonder analyse. De agent analyseert historische beslissingen, brengt afwijkingen in beeld en vergelijkt het gevoerde beleid. Beleidsmakers stemmen hun praktijk af op feiten.",
      },
    },
  },
  {
    slug: "regulatory-watch-briefing",
    function: "legal",
    sectors: ["professional-services", "public"],
    tools: [],
    copy: {
      en: {
        name: "Regulatory and case-law watch",
        description:
          "New legislation and court decisions affect clients, but tracking them is manual and often late. The agent monitors relevant sources, summarises changes and judgements, adds them to the internal knowledge base and drafts client-facing updates. Experts stay current and can advise clients proactively.",
      },
      fr: {
        name: "Veille réglementaire et jurisprudentielle",
        description:
          "Les nouvelles lois et décisions de justice concernent vos clients, mais leur suivi est manuel et souvent tardif. L'agent surveille les sources pertinentes, résume les évolutions et les décisions, les ajoute à la base de connaissances interne et rédige des notes d'information pour les clients. Les experts restent à jour et conseillent leurs clients de façon proactive.",
      },
      nl: {
        name: "Opvolging van regelgeving en rechtspraak",
        description:
          "Nieuwe wetgeving en rechterlijke uitspraken raken klanten, maar ze opvolgen gebeurt met de hand en vaak te laat. De agent bewaakt relevante bronnen, vat wijzigingen en uitspraken samen, voegt ze toe aan de interne kennisbank en stelt updates voor klanten op. Experts blijven bij en kunnen klanten proactief adviseren.",
      },
    },
  },
  {
    slug: "acquisition-target-due-diligence",
    function: "legal",
    sectors: ["finance", "professional-services"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Acquisition due diligence red-flag review",
        description:
          "Reviewing the legal and financial documents of an acquisition target takes days before any red flag appears. The agent reads the data room, lists missing documents and inconsistencies, and summarises the main risks. Deal teams focus their review on what matters.",
      },
      fr: {
        name: "Audit d'acquisition : détection des signaux d'alerte",
        description:
          "Examiner les documents juridiques et financiers d'une cible d'acquisition prend des jours avant qu'un signal d'alerte n'apparaisse. L'agent parcourt la salle de données, liste les documents manquants et les incohérences, et synthétise les principaux risques. Les équipes d'acquisition concentrent leur examen sur l'essentiel.",
      },
      nl: {
        name: "Due diligence van overnames op rode vlaggen",
        description:
          "De juridische en financiële documenten van een overnamekandidaat doornemen duurt dagen voor er een eerste rode vlag opduikt. De agent leest de dataroom, lijst ontbrekende documenten en inconsistenties op en vat de belangrijkste risico's samen. Dealteams richten hun review op wat ertoe doet.",
      },
    },
  },
  {
    slug: "clause-drafting-from-precedents",
    function: "legal",
    sectors: ["professional-services"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Clause drafting from precedents",
        description:
          "Lawyers write new clauses by searching for a similar one they used before and adapting it. The agent finds the closest precedent clauses in your library and proposes an adapted version for the current matter. Drafting is faster and wording stays consistent with the firm's standards.",
      },
      fr: {
        name: "Rédaction de clauses à partir de précédents",
        description:
          "Les avocats rédigent de nouvelles clauses en cherchant une clause similaire déjà utilisée puis en l'adaptant. L'agent retrouve les clauses les plus proches dans votre bibliothèque et propose une version adaptée au dossier en cours. La rédaction est plus rapide et les formulations restent conformes aux standards du cabinet.",
      },
      nl: {
        name: "Clausules opstellen op basis van precedenten",
        description:
          "Advocaten schrijven nieuwe clausules door een gelijkaardige clausule op te zoeken die ze eerder gebruikten en die aan te passen. De agent zoekt de meest gelijkende precedenten in uw bibliotheek en stelt een aangepaste versie voor het lopende dossier voor. Het opstellen gaat sneller en de formulering blijft in lijn met de standaarden van het kantoor.",
      },
    },
  },
  {
    slug: "client-registry-change-watch",
    function: "legal",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Client registry change watch",
        description:
          "Changes in a client's legal entity, name or address go unnoticed and portfolios fall out of date. The agent monitors public company registries for changes affecting your clients and flags dormant accounts that need contact. The firm keeps client records current and spots opportunities to re-engage.",
      },
      fr: {
        name: "Veille sur les changements au registre des sociétés",
        description:
          "Les changements de forme juridique, de dénomination ou d'adresse d'un client passent inaperçus et les portefeuilles deviennent obsolètes. L'agent surveille les registres publics des sociétés pour repérer les changements concernant vos clients et signale les comptes inactifs à recontacter. Le cabinet garde des fiches clients à jour et repère les occasions de renouer le contact.",
      },
      nl: {
        name: "Opvolging van wijzigingen in klantgegevens",
        description:
          "Wijzigingen in de rechtsvorm, naam of het adres van een klant blijven onopgemerkt en portefeuilles raken verouderd. De agent bewaakt de publieke ondernemingsregisters op wijzigingen bij uw klanten en signaleert slapende accounts die een contact nodig hebben. Het kantoor houdt klantgegevens actueel en ziet kansen om klanten opnieuw aan te spreken.",
      },
    },
  },
  {
    slug: "decision-history-search",
    function: "legal",
    sectors: ["professional-services", "public"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Decision history search",
        description:
          "Past decisions, votes and resolutions are buried in years of minutes, which makes follow-up and compliance checks slow. The agent indexes historical minutes and answers questions on what was decided, when and by whom, with the source. Managers verify past decisions in seconds.",
      },
      fr: {
        name: "Recherche dans l'historique des décisions",
        description:
          "Décisions, votes et résolutions passés sont enfouis dans des années de procès-verbaux, ce qui ralentit le suivi et les contrôles de conformité. L'agent indexe les procès-verbaux et répond aux questions sur ce qui a été décidé, quand et par qui, avec la source. Les responsables vérifient une décision passée en quelques secondes.",
      },
      nl: {
        name: "Zoeken in de beslissingshistoriek",
        description:
          "Eerdere beslissingen, stemmingen en besluiten zitten verstopt in jaren aan notulen, wat opvolging en conformiteitscontroles vertraagt. De agent indexeert historische notulen en beantwoordt vragen over wat, wanneer en door wie beslist werd, met de bron erbij. Leidinggevenden verifiëren eerdere beslissingen in enkele seconden.",
      },
    },
  },
  {
    slug: "permit-precheck-assistant",
    function: "legal",
    sectors: ["public"],
    tools: [],
    copy: {
      en: {
        name: "Permit application pre-check",
        description:
          "Many permit criteria are objective but still checked by hand for every application. The agent checks applications against the measurable rules and prepares a pre-assessment for the official. Officials focus on the judgement calls.",
      },
      fr: {
        name: "Pré-instruction des demandes d'autorisation",
        description:
          "De nombreux critères d'autorisation sont objectifs mais restent vérifiés à la main pour chaque demande. L'agent contrôle les demandes au regard des règles mesurables et prépare une pré-évaluation pour l'agent instructeur. Les instructeurs se concentrent sur les points qui demandent une appréciation.",
      },
      nl: {
        name: "Voorafgaande controle van vergunningsaanvragen",
        description:
          "Veel vergunningscriteria zijn objectief, maar worden toch voor elke aanvraag met de hand gecontroleerd. De agent toetst aanvragen aan de meetbare regels en bereidt een voorafgaande beoordeling voor de dossierbehandelaar voor. Ambtenaren richten zich op de punten die een inschatting vragen.",
      },
    },
  },
  {
    slug: "similar-case-finder",
    function: "legal",
    sectors: ["public", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Similar case finder",
        description:
          "Officials assessing a new file want to know how similar cases were decided. The agent finds comparable past decisions and summarises them as advisory input. Decisions are better informed and more consistent.",
      },
      fr: {
        name: "Recherche de dossiers similaires",
        description:
          "Les agents qui instruisent un nouveau dossier veulent savoir comment des cas similaires ont été tranchés. L'agent retrouve des décisions passées comparables et les résume à titre consultatif. Les décisions sont mieux éclairées et plus cohérentes.",
      },
      nl: {
        name: "Zoeken naar vergelijkbare dossiers",
        description:
          "Ambtenaren die een nieuw dossier beoordelen, willen weten hoe in vergelijkbare gevallen beslist werd. De agent zoekt vergelijkbare eerdere beslissingen en vat ze samen als adviserende input. Beslissingen zijn beter onderbouwd en consistenter.",
      },
    },
  },
];
