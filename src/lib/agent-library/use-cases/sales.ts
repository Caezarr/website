import type { LibraryUseCase } from "../types";

export const SALES_USE_CASES: LibraryUseCase[] = [
  {
    slug: "retail-sell-out-analyst",
    function: "sales",
    sectors: ["retail", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Retail sell-out analyst",
        description:
          "Suppliers receive sell-out data from retailers but rarely have time to analyse it store by store. The agent spots declining stores, zero sales and promotion effects, and proposes priority stores and promotional actions for the sales team. Field sales act where the upside is largest.",
      },
      fr: {
        name: "Analyse des ventes en magasin",
        description:
          "Les fournisseurs reçoivent des enseignes les données de ventes aux consommateurs, mais ont rarement le temps de les analyser magasin par magasin. L'agent repère les magasins en recul, les ruptures de ventes et les effets des promotions, et propose à l'équipe commerciale les magasins prioritaires et les actions promotionnelles. Les commerciaux terrain agissent là où le potentiel est le plus fort.",
      },
      nl: {
        name: "Analyse van sell-out in de retail",
        description:
          "Leveranciers ontvangen sell-outgegevens van retailers, maar hebben zelden tijd om die winkel per winkel te analyseren. De agent spoort winkels met dalende verkoop, nulverkopen en promotie-effecten op en stelt prioritaire winkels en promotieacties voor aan het verkoopteam. De buitendienst handelt waar het meeste te winnen valt.",
      },
    },
  },
  {
    slug: "specification-to-quote-converter",
    function: "sales",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Specification-to-quote converter",
        description:
          "Turning a long specification document into a priced proposal means extracting every item and pricing it by hand. The agent reads the specification, structures the items and prices them from your price base into a draft proposal. Estimators review and adjust instead of starting from a blank page.",
      },
      fr: {
        name: "Du cahier des charges au devis",
        description:
          "Transformer un long cahier des charges en proposition chiffrée oblige à en extraire chaque poste et à le chiffrer à la main. L'agent lit le cahier des charges, structure les postes et les chiffre à partir de votre base de prix dans une proposition en brouillon. Les chiffreurs relisent et ajustent au lieu de partir d'une page blanche.",
      },
      nl: {
        name: "Van lastenboek naar offerte",
        description:
          "Een lang lastenboek omzetten in een geprijsd voorstel betekent elke post eruit halen en met de hand prijzen. De agent leest het lastenboek, structureert de posten en prijst ze op basis van uw prijzendatabank in een conceptofferte. Calculatoren controleren en passen aan in plaats van met een leeg blad te beginnen.",
      },
    },
  },
  {
    slug: "tender-opportunity-watch",
    function: "sales",
    sectors: ["construction", "industry", "professional-services"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Tender opportunity watch",
        description:
          "Relevant public tenders are spread across platforms and are often found too late. The agent monitors procurement platforms, checks each tender against your capabilities and alerts the team well before the deadline. You see every relevant opportunity in time to prepare a strong bid.",
      },
      fr: {
        name: "Veille des appels d'offres",
        description:
          "Les appels d'offres publics pertinents sont dispersés sur de nombreuses plateformes et souvent repérés trop tard. L'agent surveille les plateformes de marchés publics, confronte chaque appel d'offres à vos capacités et alerte l'équipe bien avant la date limite. Vous voyez chaque opportunité pertinente à temps pour préparer une offre solide.",
      },
      nl: {
        name: "Opvolging van openbare aanbestedingen",
        description:
          "Relevante overheidsopdrachten zitten verspreid over verschillende platformen en worden vaak te laat gevonden. De agent bewaakt aanbestedingsplatformen, toetst elke opdracht aan uw mogelijkheden en verwittigt het team ruim voor de deadline. U ziet elke relevante opportuniteit op tijd om een sterke offerte voor te bereiden.",
      },
    },
  },
  {
    slug: "booking-options-recommender",
    function: "sales",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Booking options recommender",
        description:
          "Finding the right venue, provider or activity for a customer request depends on staff memory. The agent suggests the best options from your provider data based on location, preferences and availability. Staff respond faster with better proposals.",
      },
      fr: {
        name: "Recommandation d'options de réservation",
        description:
          "Trouver le bon lieu, le bon prestataire ou la bonne activité pour une demande client dépend de la mémoire des équipes. L'agent suggère les meilleures options à partir de vos données prestataires, selon la localisation, les préférences et les disponibilités. Vos équipes répondent plus vite avec de meilleures propositions.",
      },
      nl: {
        name: "Aanbevelingen voor boekingsopties",
        description:
          "De juiste locatie, leverancier of activiteit vinden voor een klantvraag hangt af van het geheugen van medewerkers. De agent stelt de beste opties voor uit uw leveranciersgegevens, op basis van locatie, voorkeuren en beschikbaarheid. Medewerkers antwoorden sneller met betere voorstellen.",
      },
    },
  },
  {
    slug: "building-permit-lead-finder",
    function: "sales",
    sectors: ["construction"],
    tools: [],
    copy: {
      en: {
        name: "Building permit lead finder",
        description:
          "New construction projects become public through permits and planning notices, but monitoring them is manual. The agent watches published permits and planning decisions and turns relevant projects into qualified leads. Sales reaches project owners before competitors.",
      },
      fr: {
        name: "Détection de prospects via les permis de construire",
        description:
          "Les nouveaux projets de construction deviennent publics à travers les permis et les avis d'urbanisme, mais leur suivi est manuel. L'agent surveille les permis publiés et les décisions d'urbanisme, et transforme les projets pertinents en prospects qualifiés. Vos commerciaux contactent les maîtres d'ouvrage avant la concurrence.",
      },
      nl: {
        name: "Leads uit omgevingsvergunningen",
        description:
          "Nieuwe bouwprojecten worden publiek via vergunningen en openbare onderzoeken, maar die opvolgen gebeurt met de hand. De agent bewaakt gepubliceerde vergunningen en beslissingen en zet relevante projecten om in gekwalificeerde leads. De verkoop bereikt bouwheren voor de concurrentie dat doet.",
      },
    },
  },
  {
    slug: "client-intake-summary",
    function: "sales",
    sectors: ["professional-services", "construction"],
    tools: ["Asana"],
    copy: {
      en: {
        name: "Client intake summary",
        description:
          "Intake meetings capture the client's needs, but notes are incomplete and next steps are unclear. The agent produces a structured intake report from the conversation, finds similar past references and creates the action plan in your project tool. Projects start with a clear, shared brief.",
      },
      fr: {
        name: "Synthèse de la réunion de lancement client",
        description:
          "Les réunions de découverte recueillent les besoins du client, mais les notes sont incomplètes et les prochaines étapes floues. L'agent produit un compte rendu structuré à partir de l'échange, retrouve des références passées similaires et crée le plan d'action dans votre outil de gestion de projet. Les projets démarrent avec un cadrage clair et partagé.",
      },
      nl: {
        name: "Samenvatting van het intakegesprek",
        description:
          "Intakegesprekken brengen de noden van de klant in kaart, maar de notities zijn onvolledig en de volgende stappen onduidelijk. De agent maakt een gestructureerd intakeverslag van het gesprek, zoekt vergelijkbare eerdere referenties en zet het actieplan klaar in uw projecttool. Projecten starten met een duidelijke, gedeelde briefing.",
      },
    },
  },
  {
    slug: "custom-itinerary-builder",
    function: "sales",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Custom itinerary builder",
        description:
          "Tailored trip or visit programmes are assembled by hand from old files and templates. The agent builds a draft itinerary with day plans and explanations from your existing modules and the customer's preferences. Travel advisors personalise faster.",
      },
      fr: {
        name: "Création d'itinéraires sur mesure",
        description:
          "Les programmes de voyage ou de visite sur mesure sont assemblés à la main à partir d'anciens dossiers et modèles. L'agent construit un itinéraire en brouillon, avec le déroulé de chaque journée et ses explications, à partir de vos modules existants et des préférences du client. Les conseillers voyage personnalisent plus vite.",
      },
      nl: {
        name: "Reisprogramma op maat",
        description:
          "Reis- of bezoekprogramma's op maat worden met de hand samengesteld uit oude bestanden en sjablonen. De agent bouwt een ontwerp van reisprogramma met dagplanning en toelichting op basis van uw bestaande modules en de voorkeuren van de klant. Reisadviseurs personaliseren sneller.",
      },
    },
  },
  {
    slug: "dormant-deal-reactivation",
    function: "sales",
    sectors: ["professional-services", "industry"],
    tools: ["HubSpot", "Salesforce"],
    copy: {
      en: {
        name: "Dormant deal reactivation",
        description:
          "Deals and contacts go cold when no one follows up after a few weeks. The agent spots opportunities with no recent activity and drafts a personalised email that picks up from the last conversation, for the account manager to send. More stalled deals come back to life.",
      },
      fr: {
        name: "Relance des opportunités en sommeil",
        description:
          "Les opportunités et les contacts refroidissent quand personne ne les relance après quelques semaines. L'agent repère les opportunités sans activité récente et rédige un e-mail personnalisé qui reprend là où la dernière conversation s'était arrêtée, que le chargé de compte n'a plus qu'à envoyer. Davantage d'affaires au point mort repartent.",
      },
      nl: {
        name: "Slapende deals opnieuw activeren",
        description:
          "Deals en contacten koelen af wanneer niemand na enkele weken opvolgt. De agent spoort opportuniteiten zonder recente activiteit op en stelt een gepersonaliseerde e-mail op die aansluit bij het laatste gesprek, zodat de accountmanager die kan versturen. Meer vastgelopen deals komen weer tot leven.",
      },
    },
  },
  {
    slug: "instant-price-estimate",
    function: "sales",
    sectors: ["professional-services", "retail", "industry"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Instant price estimate responder",
        description:
          "Many inbound enquiries simply ask how much a standard service or product would cost. The agent reads the request or calculator input, applies your price list and sends a professional estimate. Prospects get an answer immediately and sales focuses on complex deals.",
      },
      fr: {
        name: "Réponse instantanée aux demandes de prix",
        description:
          "De nombreuses demandes entrantes portent simplement sur le prix d'un service ou d'un produit standard. L'agent lit la demande ou les données saisies dans le simulateur, applique votre grille tarifaire et envoie une estimation professionnelle. Les prospects obtiennent une réponse immédiate et les commerciaux se concentrent sur les affaires complexes.",
      },
      nl: {
        name: "Onmiddellijke prijsraming",
        description:
          "Veel binnenkomende vragen gaan gewoon over wat een standaarddienst of standaardproduct zou kosten. De agent leest de aanvraag of de invoer van de rekenmodule, past uw prijslijst toe en verstuurt een professionele prijsraming. Prospecten krijgen meteen een antwoord en de verkoop focust op complexe deals.",
      },
    },
  },
  {
    slug: "proposal-from-meeting-notes",
    function: "sales",
    sectors: ["professional-services"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Proposal drafter from meeting notes",
        description:
          "After a discovery meeting, the proposal is written from scattered notes and an old template. The agent turns the meeting transcript into a structured proposal, matches it to your pricing tiers and asks for missing information. Proposals go out faster and are consistent.",
      },
      fr: {
        name: "Rédaction de propositions à partir des notes de réunion",
        description:
          "Après une réunion de découverte, la proposition est rédigée à partir de notes éparses et d'un vieux modèle. L'agent transforme la transcription de la réunion en proposition structurée, l'aligne sur vos niveaux de tarification et demande les informations manquantes. Les propositions partent plus vite et sont homogènes.",
      },
      nl: {
        name: "Voorstel opstellen vanuit vergadernotities",
        description:
          "Na een verkennend gesprek wordt het voorstel geschreven uit verspreide notities en een oud sjabloon. De agent zet de transcriptie van de meeting om in een gestructureerd voorstel, koppelt het aan uw prijsformules en vraagt naar ontbrekende informatie. Voorstellen gaan sneller de deur uit en zijn consistent.",
      },
    },
  },
  {
    slug: "prospect-list-shortlister",
    function: "sales",
    sectors: ["professional-services", "industry"],
    tools: ["HubSpot"],
    copy: {
      en: {
        name: "Prospect list shortlister",
        description:
          "Prospect lists arrive regularly but nobody has time to review them line by line. The agent filters each list against your target profile, produces a weekly shortlist with context and drafts a first personalised email per prospect. Sales spends time only on the best leads.",
      },
      fr: {
        name: "Présélection des listes de prospects",
        description:
          "Des listes de prospects arrivent régulièrement, mais personne n'a le temps de les passer en revue ligne par ligne. L'agent filtre chaque liste selon votre profil cible, produit chaque semaine une sélection commentée et rédige un premier e-mail personnalisé par prospect. Vos commerciaux ne consacrent leur temps qu'aux meilleurs prospects.",
      },
      nl: {
        name: "Selectie uit prospectlijsten",
        description:
          "Er komen regelmatig prospectlijsten binnen, maar niemand heeft tijd om ze lijn per lijn door te nemen. De agent filtert elke lijst op uw doelprofiel, maakt wekelijks een shortlist met context en stelt per prospect een eerste gepersonaliseerde e-mail op. De verkoop besteedt enkel tijd aan de beste leads.",
      },
    },
  },
  {
    slug: "sales-performance-analyst",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Sales performance analyst",
        description:
          "Sales statistics are compiled by hand from exports and emailed files, so trends appear late. The agent consolidates sales history into one view and answers questions on trends, products and customers. Management steers on current, reliable sales data.",
      },
      fr: {
        name: "Analyse de la performance commerciale",
        description:
          "Les statistiques commerciales sont compilées à la main à partir d'exports et de fichiers envoyés par e-mail, si bien que les tendances apparaissent tard. L'agent consolide l'historique des ventes dans une vue unique et répond aux questions sur les tendances, les produits et les clients. La direction pilote sur des données commerciales fiables et à jour.",
      },
      nl: {
        name: "Analyse van verkoopprestaties",
        description:
          "Verkoopstatistieken worden met de hand samengesteld uit exports en gemailde bestanden, waardoor trends laat zichtbaar worden. De agent brengt de verkoophistoriek samen in één overzicht en beantwoordt vragen over trends, producten en klanten. Het management stuurt bij op actuele, betrouwbare verkoopcijfers.",
      },
    },
  },
  {
    slug: "specification-split-by-trade",
    function: "sales",
    sectors: ["construction"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Specification split by trade",
        description:
          "Large specifications must be cut into the parts relevant to each trade or subcontractor before asking for prices. The agent splits the document by trade, summarises each part and prepares the price requests for each party. Subcontractors receive only what concerns them and reply faster.",
      },
      fr: {
        name: "Découpage du cahier des charges par corps de métier",
        description:
          "Les cahiers des charges volumineux doivent être découpés en parties propres à chaque corps de métier ou sous-traitant avant la consultation. L'agent découpe le document par corps de métier, résume chaque partie et prépare les demandes de prix pour chaque intervenant. Les sous-traitants reçoivent uniquement ce qui les concerne et répondent plus vite.",
      },
      nl: {
        name: "Lastenboek opsplitsen per vakgebied",
        description:
          "Grote lastenboeken moeten opgesplitst worden in de delen die relevant zijn voor elk vakgebied of elke onderaannemer, voor er prijzen gevraagd worden. De agent splitst het document per vakgebied, vat elk deel samen en bereidt de prijsaanvragen per partij voor. Onderaannemers krijgen enkel wat hen aanbelangt en antwoorden sneller.",
      },
    },
  },
  {
    slug: "tender-administrative-forms",
    function: "sales",
    sectors: ["construction", "professional-services", "public"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Tender administrative forms filler",
        description:
          "Every bid requires the same administrative forms and data, copied from previous files by hand. The agent extracts the requirements from the tender documents and pre-fills the forms with your company information. The team spends its time on the technical offer instead.",
      },
      fr: {
        name: "Remplissage des formulaires administratifs d'appels d'offres",
        description:
          "Chaque candidature exige les mêmes formulaires et données administratives, recopiés à la main depuis les dossiers précédents. L'agent extrait les exigences des documents de la consultation et préremplit les formulaires avec les informations de votre entreprise. L'équipe consacre son temps à l'offre technique.",
      },
      nl: {
        name: "Invullen van administratieve aanbestedingsformulieren",
        description:
          "Elke offerte voor een aanbesteding vraagt dezelfde administratieve formulieren en gegevens, die met de hand uit eerdere dossiers gekopieerd worden. De agent haalt de vereisten uit de aanbestedingsdocumenten en vult de formulieren vooraf in met uw bedrijfsgegevens. Het team besteedt zijn tijd aan de technische offerte.",
      },
    },
  },
  {
    slug: "website-quote-request-chatbot",
    function: "sales",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Website quote request assistant",
        description:
          "Visitors who want a quote often leave a vague message that the team must clarify by phone or email. The agent guides them on your website through the questions that matter for pricing and submits a complete, structured request to sales. Quote requests arrive ready to price and fewer prospects drop off.",
      },
      fr: {
        name: "Assistant de demande de devis sur votre site",
        description:
          "Les visiteurs qui veulent un devis laissent souvent un message vague que l'équipe doit clarifier par téléphone ou par e-mail. L'agent les guide sur votre site à travers les questions utiles au chiffrage et transmet aux commerciaux une demande complète et structurée. Les demandes de devis arrivent prêtes à chiffrer et moins de prospects abandonnent en route.",
      },
      nl: {
        name: "Assistent voor offerteaanvragen op uw website",
        description:
          "Bezoekers die een offerte willen, laten vaak een vaag bericht achter dat het team telefonisch of per e-mail moet verduidelijken. De agent begeleidt hen op uw website door de vragen die voor de prijs bepalend zijn en bezorgt een volledige, gestructureerde aanvraag aan de verkoop. Offerteaanvragen komen binnen klaar om te prijzen en minder prospecten haken af.",
      },
    },
  },
  {
    slug: "account-knowledge-memory",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Per-customer account memory",
        description:
          "Knowledge about each customer's preferences, substitutions and habits lives in the heads of a few people. The agent builds and maintains a profile per customer from orders and correspondence, and surfaces it whenever someone handles that account. Service stays personal even when the usual contact is absent.",
      },
      fr: {
        name: "Mémoire client par compte",
        description:
          "La connaissance des préférences, substitutions et habitudes de chaque client repose sur quelques personnes. L'agent constitue et tient à jour un profil par client à partir des commandes et des échanges, et le met à disposition de quiconque gère ce compte. Le service reste personnalisé même en l'absence de l'interlocuteur habituel.",
      },
      nl: {
        name: "Klantgeheugen per account",
        description:
          "Kennis over de voorkeuren, vervangproducten en gewoontes van elke klant zit in de hoofden van enkele mensen. De agent bouwt per klant een profiel op uit bestellingen en correspondentie, houdt het bij en toont het telkens iemand dat account behandelt. De service blijft persoonlijk, ook wanneer de vaste contactpersoon afwezig is.",
      },
    },
  },
  {
    slug: "b2b-customer-detector",
    function: "sales",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "B2B customer detector",
        description:
          "Professional buyers hide among consumer orders and miss the right offer and pricing. The agent analyses order behaviour to identify likely business customers and flags them for a dedicated approach. Sales converts hidden professional buyers into accounts.",
      },
      fr: {
        name: "Détection des clients B2B",
        description:
          "Des acheteurs professionnels se cachent parmi les commandes de particuliers et passent à côté de l'offre et des tarifs adaptés. L'agent analyse le comportement d'achat pour repérer les probables clients professionnels et les signale pour une approche dédiée. Vos commerciaux transforment ces acheteurs professionnels cachés en comptes clients.",
      },
      nl: {
        name: "Detectie van B2B-klanten",
        description:
          "Professionele kopers gaan verloren tussen bestellingen van particulieren en missen zo het juiste aanbod en de juiste prijzen. De agent analyseert het bestelgedrag om waarschijnlijke zakelijke klanten te herkennen en markeert ze voor een gerichte aanpak. De verkoop zet verborgen professionele kopers om in vaste klanten.",
      },
    },
  },
  {
    slug: "contract-renewal-outreach",
    function: "sales",
    sectors: ["professional-services", "finance"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Contract renewal outreach",
        description:
          "Contract end dates are buried in emails and documents, so renewal windows are missed. The agent detects end dates in incoming correspondence, records them and prepares targeted outreach before the term expires. Sales contacts customers at the right moment.",
      },
      fr: {
        name: "Relance avant renouvellement de contrat",
        description:
          "Les dates de fin de contrat sont noyées dans les e-mails et les documents, si bien que les fenêtres de renouvellement sont manquées. L'agent repère les dates d'échéance dans la correspondance entrante, les enregistre et prépare des relances ciblées avant l'expiration. Vos commerciaux contactent les clients au bon moment.",
      },
      nl: {
        name: "Contact bij contractverlenging",
        description:
          "Einddata van contracten zitten verstopt in e-mails en documenten, waardoor het moment voor verlenging gemist wordt. De agent detecteert einddata in binnenkomende correspondentie, registreert ze en bereidt gericht contact voor voor de termijn afloopt. De verkoop contacteert klanten op het juiste moment.",
      },
    },
  },
  {
    slug: "customer-specific-pricing",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Customer-specific price calculator",
        description:
          "Customer prices depend on purchase costs, volumes, margins and contract terms, and are recalculated by hand when costs change. The agent computes customer-specific prices from current purchase prices and rules, and tracks margin trends. Prices stay correct and margins under control.",
      },
      fr: {
        name: "Calcul des prix spécifiques par client",
        description:
          "Les prix clients dépendent des coûts d'achat, des volumes, des marges et des conditions contractuelles, et sont recalculés à la main quand les coûts changent. L'agent calcule les prix propres à chaque client à partir des prix d'achat actuels et de vos règles, et suit l'évolution des marges. Les prix restent justes et les marges maîtrisées.",
      },
      nl: {
        name: "Berekening van klantspecifieke prijzen",
        description:
          "Klantprijzen hangen af van aankoopkosten, volumes, marges en contractvoorwaarden, en worden met de hand herberekend wanneer de kosten wijzigen. De agent berekent klantspecifieke prijzen op basis van actuele aankoopprijzen en regels en volgt de evolutie van de marges op. Prijzen blijven correct en marges onder controle.",
      },
    },
  },
  {
    slug: "email-activity-dashboard",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Team email activity dashboard",
        description:
          "Sales managers have no view of email response times or where requests are piling up. The agent compiles statistics on sent and received emails, response delays and unanswered threads per team. Bottlenecks become visible and service levels can be managed.",
      },
      fr: {
        name: "Tableau de bord de l'activité e-mail des équipes",
        description:
          "Les responsables commerciaux n'ont aucune visibilité sur les délais de réponse aux e-mails ni sur les demandes qui s'accumulent. L'agent compile des statistiques sur les e-mails envoyés et reçus, les délais de réponse et les fils restés sans réponse, par équipe. Les goulets d'étranglement deviennent visibles et la qualité de service se pilote.",
      },
      nl: {
        name: "Dashboard van de e-mailactiviteit per team",
        description:
          "Salesmanagers hebben geen zicht op de antwoordtijden per e-mail of op waar aanvragen zich opstapelen. De agent stelt statistieken op over verzonden en ontvangen e-mails, antwoordtermijnen en onbeantwoorde conversaties per team. Knelpunten worden zichtbaar en het serviceniveau kan aangestuurd worden.",
      },
    },
  },
  {
    slug: "lookalike-customer-finder",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: ["Dynamics 365"],
    copy: {
      en: {
        name: "Lookalike customer finder",
        description:
          "Finding new customers in a region usually starts from a blank list. The agent analyses your best existing customers and finds similar companies in external company databases for the target area. Sales gets a focused list of high-fit prospects.",
      },
      fr: {
        name: "Recherche de clients similaires",
        description:
          "Trouver de nouveaux clients dans une région part généralement d'une liste vide. L'agent analyse vos meilleurs clients actuels et recherche des entreprises similaires dans des bases de données d'entreprises externes, sur la zone visée. Vos commerciaux disposent d'une liste ciblée de prospects à fort potentiel.",
      },
      nl: {
        name: "Zoeken naar gelijkaardige klanten",
        description:
          "Nieuwe klanten zoeken in een regio begint meestal met een lege lijst. De agent analyseert uw beste bestaande klanten en zoekt gelijkaardige bedrijven in externe bedrijvendatabanken voor de doelregio. De verkoop krijgt een gerichte lijst van prospecten die goed passen.",
      },
    },
  },
  {
    slug: "negotiation-brief",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Pricing negotiation brief",
        description:
          "Sales reps go into price negotiations without a clear view of the customer's history and margins. The agent prepares a short brief with purchase history, margin room and tailored arguments. Reps negotiate with confidence and protect margin.",
      },
      fr: {
        name: "Note de préparation aux négociations tarifaires",
        description:
          "Les commerciaux abordent les négociations de prix sans vision claire de l'historique du client ni des marges. L'agent prépare une note courte avec l'historique d'achat, la marge de manœuvre et des arguments sur mesure. Les commerciaux négocient en confiance et préservent la marge.",
      },
      nl: {
        name: "Briefing voor prijsonderhandelingen",
        description:
          "Verkopers gaan prijsonderhandelingen in zonder duidelijk zicht op de historiek en de marges van de klant. De agent bereidt een korte briefing voor met aankoophistoriek, marge-ruimte en gerichte argumenten. Verkopers onderhandelen met vertrouwen en beschermen hun marge.",
      },
    },
  },
  {
    slug: "product-bundle-suggestions",
    function: "sales",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "Product bundle suggestions",
        description:
          "Customers buy one product without knowing what complements it. The agent analyses purchase history and behaviour to propose relevant bundles for each customer. Average order value grows with useful recommendations.",
      },
      fr: {
        name: "Suggestions d'offres groupées",
        description:
          "Les clients achètent un produit sans savoir ce qui le complète. L'agent analyse l'historique et le comportement d'achat pour proposer des offres groupées pertinentes à chaque client. Le panier moyen progresse grâce à des recommandations utiles.",
      },
      nl: {
        name: "Voorstellen voor productbundels",
        description:
          "Klanten kopen één product zonder te weten wat het aanvult. De agent analyseert aankoophistoriek en gedrag om voor elke klant relevante bundels voor te stellen. De gemiddelde orderwaarde stijgt dankzij nuttige aanbevelingen.",
      },
    },
  },
  {
    slug: "public-record-lead-finder",
    function: "sales",
    sectors: ["professional-services", "finance"],
    tools: [],
    copy: {
      en: {
        name: "Public record lead finder",
        description:
          "Public court and hearing lists reveal companies that may need your services, but reading them is tedious. The agent extracts company names and case types from published lists, matches them against your client base and surfaces new opportunities. Business development gets a regular, qualified list of leads.",
      },
      fr: {
        name: "Détection de prospects dans les publications officielles",
        description:
          "Les rôles d'audience et listes publiques des tribunaux révèlent des entreprises susceptibles d'avoir besoin de vos services, mais leur lecture est fastidieuse. L'agent extrait les noms d'entreprises et les types d'affaires des listes publiées, les compare à votre base clients et fait remonter de nouvelles opportunités. Le développement commercial reçoit régulièrement une liste de prospects qualifiés.",
      },
      nl: {
        name: "Leads uit publieke registers",
        description:
          "Publieke rol- en zittingslijsten van rechtbanken tonen bedrijven die uw diensten mogelijk nodig hebben, maar ze doornemen is tijdrovend. De agent haalt bedrijfsnamen en soorten zaken uit de gepubliceerde lijsten, vergelijkt ze met uw klantenbestand en brengt nieuwe kansen aan het licht. Business development krijgt regelmatig een gekwalificeerde lijst met leads.",
      },
    },
  },
  {
    slug: "quote-pipeline-tracker",
    function: "sales",
    sectors: ["professional-services", "construction"],
    tools: [],
    copy: {
      en: {
        name: "Quote pipeline tracker",
        description:
          "Quotes are scattered across folders and versions, and nobody knows which are still waiting for an answer. The agent centralises quotes with their status and version, and alerts on deadlines and quotes without follow-up. The team follows up every quote on time.",
      },
      fr: {
        name: "Suivi du portefeuille de devis",
        description:
          "Les devis sont dispersés entre dossiers et versions, et personne ne sait lesquels attendent encore une réponse. L'agent centralise les devis avec leur statut et leur version, et alerte sur les échéances et les devis sans relance. L'équipe relance chaque devis à temps.",
      },
      nl: {
        name: "Opvolging van de offertepijplijn",
        description:
          "Offertes zitten verspreid over mappen en versies, en niemand weet welke nog op antwoord wachten. De agent centraliseert offertes met hun status en versie en verwittigt bij deadlines en offertes zonder opvolging. Het team volgt elke offerte op tijd op.",
      },
    },
  },
  {
    slug: "sales-offer-follow-up",
    function: "sales",
    sectors: ["industry", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Sales offer follow-up reminders",
        description:
          "Offers sent to customers go unanswered and nobody remembers to follow up. The agent watches sent offers and threads without reply, and drafts follow-up emails at the right moment. Fewer opportunities are lost through silence.",
      },
      fr: {
        name: "Rappels de relance des offres commerciales",
        description:
          "Les offres envoyées aux clients restent sans réponse et personne ne pense à relancer. L'agent surveille les offres envoyées et les échanges restés sans réponse, et rédige des e-mails de relance au bon moment. Moins d'opportunités se perdent dans le silence.",
      },
      nl: {
        name: "Herinneringen voor de opvolging van offertes",
        description:
          "Offertes naar klanten blijven onbeantwoord en niemand denkt eraan om op te volgen. De agent houdt verstuurde offertes en onbeantwoorde conversaties in het oog en stelt op het juiste moment opvolgmails op. Er gaan minder kansen verloren door stilte.",
      },
    },
  },
  {
    slug: "trade-show-lead-follow-up",
    function: "sales",
    sectors: ["industry"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Trade show lead follow-up",
        description:
          "Contacts collected at events end up in notebooks and follow-up visits are never planned. The agent captures event contacts, creates them in your CRM and schedules follow-up visits or calls in the sales calendar. More event leads turn into meetings.",
      },
      fr: {
        name: "Suivi des prospects rencontrés sur les salons",
        description:
          "Les contacts recueillis lors d'événements finissent dans des carnets et les visites de suivi ne sont jamais planifiées. L'agent saisit les contacts de l'événement, les crée dans votre CRM et planifie les visites ou appels de suivi dans l'agenda commercial. Davantage de prospects rencontrés sur les salons se transforment en rendez-vous.",
      },
      nl: {
        name: "Opvolging van beursleads",
        description:
          "Contacten die op evenementen verzameld worden, belanden in notitieboekjes en opvolgbezoeken worden nooit ingepland. De agent registreert de contacten van het evenement, maakt ze aan in uw CRM en plant opvolgbezoeken of telefoontjes in de verkoopagenda. Meer leads van evenementen leiden tot meetings.",
      },
    },
  },
];
