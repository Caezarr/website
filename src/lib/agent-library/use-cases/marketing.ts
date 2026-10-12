import type { LibraryUseCase } from "../types";

export const MARKETING_USE_CASES: LibraryUseCase[] = [
  {
    slug: "brand-voice-content-writer",
    function: "marketing",
    sectors: ["professional-services", "industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Brand-voice content writer",
        description:
          "Posts, articles and proposals are written in different styles by different people. The agent writes content in your tone of voice and expertise areas, from a short brief and your past material. Communication is consistent and content gets produced regularly.",
      },
      fr: {
        name: "Rédacteur de contenus à la voix de votre marque",
        description:
          "Publications, articles et propositions sont rédigés dans des styles différents selon les personnes. L'agent écrit dans votre ton et sur vos domaines d'expertise, à partir de quelques consignes et de vos contenus existants. Votre communication est cohérente et vos contenus sont produits régulièrement.",
      },
      nl: {
        name: "Contentschrijver in uw merkstem",
        description:
          "Posts, artikels en voorstellen worden door verschillende mensen in verschillende stijlen geschreven. De agent schrijft content in uw tone of voice en binnen uw expertisedomeinen, op basis van een korte briefing en uw bestaand materiaal. De communicatie is eenvormig en er komt regelmatig nieuwe content.",
      },
    },
  },
  {
    slug: "marketing-performance-report",
    function: "marketing",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Marketing performance report",
        description:
          "Reach, impressions, ads and web traffic are spread across platforms and compiled by hand into reports. The agent consolidates the data, explains the trends and adds recommendations. Marketing reports are ready on time and actionable.",
      },
      fr: {
        name: "Rapport de performance marketing",
        description:
          "Portée, impressions, publicités et trafic web sont dispersés entre plateformes et compilés à la main dans des rapports. L'agent consolide les données, explique les tendances et formule des recommandations. Vos rapports marketing sont prêts à temps et directement exploitables.",
      },
      nl: {
        name: "Rapport over marketingprestaties",
        description:
          "Bereik, impressies, advertenties en webverkeer zitten verspreid over platformen en worden met de hand in rapporten samengebracht. De agent consolideert de gegevens, verklaart de trends en voegt aanbevelingen toe. Marketingrapporten zijn op tijd klaar en bruikbaar om op te handelen.",
      },
    },
  },
  {
    slug: "seo-content-pipeline",
    function: "marketing",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "SEO content pipeline",
        description:
          "Publishing SEO content requires keyword research, expert writing, FAQs, metadata and publishing, usually done by different people. The agent chains these steps: it finds content gaps, drafts the article with FAQ and meta tags and places it as a draft in your CMS for review. You publish more search-optimised content with expert validation.",
      },
      fr: {
        name: "Chaîne de production de contenus SEO",
        description:
          "Publier des contenus optimisés pour le référencement naturel (SEO) demande recherche de mots-clés, rédaction experte, FAQ, métadonnées et mise en ligne, souvent répartis entre plusieurs personnes. L'agent enchaîne ces étapes : il repère les sujets manquants, rédige l'article avec FAQ et balises méta, puis le dépose en brouillon dans votre outil de gestion de contenu (CMS) pour relecture. Vous publiez davantage de contenus optimisés, validés par vos experts.",
      },
      nl: {
        name: "Pijplijn voor SEO-content",
        description:
          "SEO-content publiceren vraagt zoekwoordenonderzoek, deskundig schrijfwerk, FAQ's, metadata en publicatie, meestal door verschillende mensen. De agent schakelt deze stappen aan elkaar: hij vindt ontbrekende onderwerpen, schrijft het artikel met FAQ en metatags en plaatst het als concept in uw CMS ter nalezing. U publiceert meer content die geoptimaliseerd is voor zoekmachines, gevalideerd door een expert.",
      },
    },
  },
  {
    slug: "competitor-price-watch",
    function: "marketing",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Competitor offer and price watch",
        description:
          "Tracking competitors' offers, prices and promotions by visiting their sites is tedious and irregular. The agent monitors competitor websites, records prices and offers with evidence and produces comparison tables and alerts. Pricing and offer decisions rely on current market facts.",
      },
      fr: {
        name: "Veille sur les offres et prix des concurrents",
        description:
          "Suivre les offres, prix et promotions des concurrents en visitant leurs sites est fastidieux et irrégulier. L'agent surveille les sites concurrents, relève prix et offres avec preuves à l'appui, et produit tableaux comparatifs et alertes. Vos décisions de prix et d'offre reposent sur des faits de marché à jour.",
      },
      nl: {
        name: "Opvolging van aanbod en prijzen van concurrenten",
        description:
          "Het aanbod, de prijzen en promoties van concurrenten opvolgen door hun websites te bezoeken is tijdrovend en gebeurt onregelmatig. De agent bewaakt de websites van concurrenten, registreert prijzen en aanbiedingen met bewijs en maakt vergelijkingstabellen en meldingen. Beslissingen over prijzen en aanbod steunen op actuele marktgegevens.",
      },
    },
  },
  {
    slug: "event-communication-kit",
    function: "marketing",
    sectors: ["professional-services", "public"],
    tools: [],
    copy: {
      en: {
        name: "Event communication kit",
        description:
          "Each event or webinar needs invitations, landing page copy, social posts and a recap. The agent produces the full communication kit from the event brief or agenda. Events are promoted consistently across channels.",
      },
      fr: {
        name: "Kit de communication événementielle",
        description:
          "Chaque événement ou webinaire demande invitations, textes de page d'inscription, publications sur les réseaux sociaux et compte rendu. L'agent produit l'ensemble du kit de communication à partir de la note de cadrage ou du programme de l'événement. Vos événements sont promus de façon cohérente sur tous les canaux.",
      },
      nl: {
        name: "Communicatiekit voor evenementen",
        description:
          "Elk evenement of webinar vraagt uitnodigingen, teksten voor een landingspagina, posts voor sociale media en een terugblik. De agent maakt de volledige communicatiekit op basis van de briefing of het programma van het evenement. Evenementen worden consequent via alle kanalen gepromoot.",
      },
    },
  },
  {
    slug: "newsletter-builder",
    function: "marketing",
    sectors: ["professional-services", "retail", "public"],
    tools: [],
    copy: {
      en: {
        name: "Newsletter builder",
        description:
          "Every newsletter means collecting news, writing blocks and building a mobile-friendly email. The agent gathers relevant content, proposes the topics and produces the newsletter ready for review. Newsletters go out regularly with far less effort.",
      },
      fr: {
        name: "Création de lettres d'information",
        description:
          "Chaque lettre d'information impose de collecter l'actualité, de rédiger les rubriques et de monter un e-mail lisible sur mobile. L'agent rassemble les contenus pertinents, propose les sujets et produit la lettre prête à relire. Vos lettres d'information partent régulièrement, avec bien moins d'effort.",
      },
      nl: {
        name: "Nieuwsbriefbouwer",
        description:
          "Elke nieuwsbrief betekent nieuws verzamelen, blokken schrijven en een mobielvriendelijke e-mail opbouwen. De agent verzamelt relevante inhoud, stelt onderwerpen voor en levert een nieuwsbrief klaar voor nalezing. Nieuwsbrieven gaan regelmatig de deur uit met veel minder inspanning.",
      },
    },
  },
  {
    slug: "review-request-automation",
    function: "marketing",
    sectors: ["retail", "professional-services"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Post-service review request",
        description:
          "Asking happy customers for a review or feedback is easy to forget once a job or trip is closed. The agent detects completed cases, sends a personalised thank-you with a short survey or review link, and can suggest a relevant next offer. You collect more feedback and reviews without adding admin work.",
      },
      fr: {
        name: "Demande d'avis après la prestation",
        description:
          "Demander un avis ou un retour aux clients satisfaits s'oublie facilement une fois la mission ou le voyage terminé. L'agent repère les dossiers clos, envoie un remerciement personnalisé avec une courte enquête ou un lien vers un avis, et peut suggérer une offre complémentaire pertinente. Vous recueillez davantage de retours et d'avis sans charge administrative supplémentaire.",
      },
      nl: {
        name: "Reviewaanvraag na de dienstverlening",
        description:
          "Tevreden klanten om een review of feedback vragen raakt gemakkelijk vergeten zodra een opdracht of reis is afgesloten. De agent detecteert afgeronde dossiers, verstuurt een gepersonaliseerd bedankbericht met een korte enquête of reviewlink en kan een relevant vervolgaanbod voorstellen. U verzamelt meer feedback en reviews zonder extra administratie.",
      },
    },
  },
  {
    slug: "ad-copy-generator",
    function: "marketing",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Ad copy generator",
        description:
          "Writing and testing ad variants takes time and is often based on intuition. The agent generates ad texts and variants inspired by your best-performing campaigns and suggests optimisations. Campaigns are tested faster with more relevant variants.",
      },
      fr: {
        name: "Générateur de textes publicitaires",
        description:
          "Rédiger et tester des variantes publicitaires prend du temps et repose souvent sur l'intuition. L'agent génère textes et variantes en s'inspirant de vos campagnes les plus performantes, et suggère des optimisations. Vos campagnes sont testées plus vite avec des variantes plus pertinentes.",
      },
      nl: {
        name: "Generator van advertentieteksten",
        description:
          "Advertentievarianten schrijven en testen kost tijd en gebeurt vaak op buikgevoel. De agent genereert advertentieteksten en varianten, geïnspireerd op uw best presterende campagnes, en stelt optimalisaties voor. Campagnes worden sneller getest met relevantere varianten.",
      },
    },
  },
  {
    slug: "audience-overlap-analyst",
    function: "marketing",
    sectors: ["public", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Audience overlap analyst",
        description:
          "Organisations run several events or offers but do not know which audiences overlap. The agent analyses attendee and customer data to identify recurring profiles and cross-selling opportunities. Marketing targets each audience with the right offer.",
      },
      fr: {
        name: "Analyse du recoupement des publics",
        description:
          "Les organisations proposent plusieurs événements ou offres sans savoir quels publics se recoupent. L'agent analyse les données des participants et des clients pour identifier les profils récurrents et les opportunités de ventes croisées. Le marketing cible chaque public avec la bonne offre.",
      },
      nl: {
        name: "Analyse van overlappende doelgroepen",
        description:
          "Organisaties organiseren meerdere evenementen of aanbiedingen, maar weten niet welke doelgroepen overlappen. De agent analyseert deelnemers- en klantgegevens om terugkerende profielen en kansen voor cross-selling te vinden. Marketing benadert elke doelgroep met het juiste aanbod.",
      },
    },
  },
  {
    slug: "content-consistency-checker",
    function: "marketing",
    sectors: ["public", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Multi-channel content consistency checker",
        description:
          "The same programme or offer appears on the website, PDFs, social posts and signage, and versions drift apart. The agent compares all versions, flags inconsistencies and keeps a change log. Audiences always see correct information.",
      },
      fr: {
        name: "Contrôle de cohérence des contenus multicanaux",
        description:
          "Un même programme ou une même offre figure sur le site, dans des PDF, sur les réseaux sociaux et sur la signalétique, et les versions finissent par diverger. L'agent compare toutes les versions, signale les incohérences et tient un journal des modifications. Votre public voit toujours des informations exactes.",
      },
      nl: {
        name: "Controle op consistente content over alle kanalen",
        description:
          "Hetzelfde programma of aanbod staat op de website, in PDF's, in posts op sociale media en op signalisatie, en de versies lopen uit elkaar. De agent vergelijkt alle versies, signaleert inconsistenties en houdt een wijzigingslog bij. Het publiek ziet altijd correcte informatie.",
      },
    },
  },
  {
    slug: "discontinued-product-redirects",
    function: "marketing",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "Discontinued product redirects",
        description:
          "Discontinued products leave broken pages that hurt search ranking and customer experience. The agent detects end-of-life products in the catalogue and prepares redirects to the best alternative in every language. The webshop stays clean without manual work.",
      },
      fr: {
        name: "Redirections des produits arrêtés",
        description:
          "Les produits arrêtés laissent des pages cassées qui nuisent au référencement et à l'expérience client. L'agent repère les produits en fin de vie dans le catalogue et prépare des redirections vers la meilleure alternative, dans chaque langue. La boutique en ligne reste propre sans travail manuel.",
      },
      nl: {
        name: "Doorverwijzingen voor stopgezette producten",
        description:
          "Stopgezette producten laten dode pagina's achter die de positie in zoekmachines en de klantervaring schaden. De agent detecteert uitlopende producten in de catalogus en bereidt in elke taal doorverwijzingen naar het beste alternatief voor. De webshop blijft net zonder handwerk.",
      },
    },
  },
  {
    slug: "image-rights-request",
    function: "marketing",
    sectors: ["professional-services", "public"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Image rights request",
        description:
          "Using photos or visuals requires asking each rights holder for permission, which means many similar emails. The agent drafts and tracks the permission requests and records the answers. Rights are cleared before publication without manual chasing.",
      },
      fr: {
        name: "Demandes de droits sur les images",
        description:
          "Utiliser des photos ou des visuels exige l'autorisation de chaque ayant droit, ce qui implique de nombreux e-mails similaires. L'agent rédige et suit les demandes d'autorisation, et enregistre les réponses. Les droits sont obtenus avant publication sans relances manuelles.",
      },
      nl: {
        name: "Aanvraag van beeldrechten",
        description:
          "Foto's of beelden gebruiken vereist toestemming van elke rechthebbende, wat neerkomt op veel gelijkaardige e-mails. De agent stelt de toestemmingsaanvragen op, volgt ze op en registreert de antwoorden. De rechten zijn geregeld voor publicatie, zonder handmatig achter antwoorden aan te moeten.",
      },
    },
  },
  {
    slug: "market-research-synthesiser",
    function: "marketing",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Market research synthesiser",
        description:
          "Market studies require collecting, translating and summarising data from many public sources. The agent gathers the data from public statistics, reports and documents and produces a structured synthesis with sources. Analysts get a solid first draft in a fraction of the time.",
      },
      fr: {
        name: "Synthèse d'études de marché",
        description:
          "Les études de marché exigent de collecter, traduire et résumer des données issues de nombreuses sources publiques. L'agent rassemble les données issues des statistiques publiques, des rapports et des documents, et produit une synthèse structurée et sourcée. Les analystes disposent d'une première version solide en un temps record.",
      },
      nl: {
        name: "Synthese van marktonderzoek",
        description:
          "Marktstudies vragen gegevens verzamelen, vertalen en samenvatten uit veel publieke bronnen. De agent verzamelt de gegevens uit publieke statistieken, rapporten en documenten en maakt een gestructureerde synthese met bronvermelding. Analisten krijgen een stevig eerste ontwerp in een fractie van de tijd.",
      },
    },
  },
  {
    slug: "news-digest-curator",
    function: "marketing",
    sectors: ["professional-services", "public"],
    tools: [],
    copy: {
      en: {
        name: "Weekly news digest curator",
        description:
          "Keeping the team informed means reading many sources every week. The agent collects relevant articles from selected sources, filters out noise and prepares a draft digest with short summaries. The team stays informed without manual curation.",
      },
      fr: {
        name: "Revue de presse hebdomadaire",
        description:
          "Tenir l'équipe informée oblige à lire chaque semaine de nombreuses sources. L'agent collecte les articles pertinents dans des sources choisies, écarte le bruit et prépare une revue en brouillon avec de courts résumés. L'équipe reste informée sans veille manuelle.",
      },
      nl: {
        name: "Samensteller van de wekelijkse nieuwsselectie",
        description:
          "Het team op de hoogte houden betekent elke week heel wat bronnen lezen. De agent verzamelt relevante artikels uit geselecteerde bronnen, filtert de ruis weg en maakt een ontwerp van nieuwsoverzicht met korte samenvattingen. Het team blijft op de hoogte zonder handmatige selectie.",
      },
    },
  },
  {
    slug: "presentation-deck-builder",
    function: "marketing",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Presentation deck builder",
        description:
          "Client presentations are built slide by slide from meeting notes and a brand template. The agent turns notes into a structured deck in the client's or your brand layout. Presentations are ready faster and look consistent.",
      },
      fr: {
        name: "Création de présentations",
        description:
          "Les présentations clients sont construites diapositive par diapositive à partir de notes de réunion et d'un modèle de charte graphique. L'agent transforme les notes en présentation structurée, à la charte du client ou à la vôtre. Les présentations sont prêtes plus vite et restent homogènes.",
      },
      nl: {
        name: "Opbouw van presentaties",
        description:
          "Presentaties voor klanten worden slide per slide opgebouwd uit vergadernotities en een sjabloon in huisstijl. De agent zet notities om in een gestructureerde presentatie in de huisstijl van de klant of in uw eigen huisstijl. Presentaties zijn sneller klaar en zien er consistent uit.",
      },
    },
  },
  {
    slug: "promotion-performance-analyst",
    function: "marketing",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "Promotion performance analyst",
        description:
          "It is unclear which promotion mechanics actually work, so promotional plans repeat habits. The agent analyses promotion history by mechanic and category, scores performance and recommends the best combinations within your constraints. Promotions deliver more with the same budget.",
      },
      fr: {
        name: "Analyse de la performance des promotions",
        description:
          "On ne sait pas vraiment quels mécanismes promotionnels fonctionnent, si bien que les plans promotionnels reconduisent les habitudes. L'agent analyse l'historique des promotions par mécanisme et par catégorie, note leur performance et recommande les meilleures combinaisons selon vos contraintes. Vos promotions rapportent davantage à budget égal.",
      },
      nl: {
        name: "Analyse van promotieprestaties",
        description:
          "Het is onduidelijk welke promotiemechanismen echt werken, waardoor promotieplannen gewoontes herhalen. De agent analyseert de promotiehistoriek per mechanisme en categorie, scoort de prestaties en beveelt de beste combinaties aan binnen uw randvoorwaarden. Promoties leveren meer op met hetzelfde budget.",
      },
    },
  },
  {
    slug: "sales-funnel-designer",
    function: "marketing",
    sectors: ["retail", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Sales funnel designer",
        description:
          "Building a conversion funnel for each product line and audience takes long manual setup. The agent proposes the funnel structure, messages and sequences per target audience. Marketing launches new funnels faster.",
      },
      fr: {
        name: "Conception de tunnels de conversion",
        description:
          "Construire un tunnel de conversion pour chaque gamme de produits et chaque public demande un long paramétrage manuel. L'agent propose la structure du tunnel, les messages et les séquences pour chaque public cible. Le marketing lance de nouveaux tunnels plus vite.",
      },
      nl: {
        name: "Ontwerp van verkoopfunnels",
        description:
          "Een conversiefunnel opbouwen voor elke productlijn en doelgroep vraagt veel handmatig instelwerk. De agent stelt per doelgroep de structuur van de funnel, de boodschappen en de sequenties voor. Marketing lanceert sneller nieuwe funnels.",
      },
    },
  },
  {
    slug: "site-search-optimiser",
    function: "marketing",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "Site search optimiser",
        description:
          "Website search queries reveal what customers want and cannot find. The agent analyses search logs, spots failed searches and proposes fixes to synonyms, assortment and content placement. More visitors find what they came for.",
      },
      fr: {
        name: "Optimisation de la recherche sur votre site",
        description:
          "Les recherches effectuées sur votre site révèlent ce que les clients veulent et ne trouvent pas. L'agent analyse les journaux de recherche, repère les recherches infructueuses et propose des corrections sur les synonymes, l'assortiment et l'emplacement des contenus. Davantage de visiteurs trouvent ce qu'ils cherchaient.",
      },
      nl: {
        name: "Optimalisatie van de zoekfunctie op uw website",
        description:
          "Zoekopdrachten op uw website tonen wat klanten willen en niet vinden. De agent analyseert zoeklogs, spoort mislukte zoekopdrachten op en stelt verbeteringen voor aan synoniemen, assortiment en plaatsing van content. Meer bezoekers vinden waarvoor ze kwamen.",
      },
    },
  },
  {
    slug: "social-media-reply-assistant",
    function: "marketing",
    sectors: ["retail", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Social media reply assistant",
        description:
          "Comments and direct messages on social channels pile up and often contain the same product questions as the support inbox. The agent reads incoming messages, drafts on-brand answers from your product documentation and flags sensitive comments for a person. Community questions get fast, accurate answers without someone watching every channel.",
      },
      fr: {
        name: "Assistant de réponse sur les réseaux sociaux",
        description:
          "Commentaires et messages privés s'accumulent sur les réseaux sociaux et contiennent souvent les mêmes questions produit que la boîte du support. L'agent lit les messages entrants, rédige des réponses fidèles à votre marque à partir de votre documentation produit et signale les commentaires sensibles à une personne. Les questions de la communauté reçoivent des réponses rapides et exactes sans surveiller chaque canal en permanence.",
      },
      nl: {
        name: "Assistent voor antwoorden op sociale media",
        description:
          "Reacties en privéberichten op sociale kanalen stapelen zich op en bevatten vaak dezelfde productvragen als de supportmailbox. De agent leest binnenkomende berichten, stelt antwoorden in uw merkstem op uit uw productdocumentatie en signaleert gevoelige reacties aan een medewerker. Vragen uit de community krijgen snel een juist antwoord, zonder dat iemand elk kanaal moet bewaken.",
      },
    },
  },
  {
    slug: "sponsorship-request-screener",
    function: "marketing",
    sectors: ["retail", "industry"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Sponsorship request screener",
        description:
          "Sponsorship and partnership requests arrive by email and are assessed inconsistently. The agent scores each request on relevance, reach and audience, and drafts a structured reply. Requests are handled fairly and quickly.",
      },
      fr: {
        name: "Tri des demandes de parrainage",
        description:
          "Les demandes de parrainage et de partenariat arrivent par e-mail et sont évaluées de façon inégale. L'agent note chaque demande selon sa pertinence, sa portée et son public, et rédige une réponse structurée. Les demandes sont traitées équitablement et rapidement.",
      },
      nl: {
        name: "Screening van sponsoringaanvragen",
        description:
          "Aanvragen voor sponsoring en partnerschappen komen per e-mail binnen en worden niet consequent beoordeeld. De agent scoort elke aanvraag op relevantie, bereik en publiek en stelt een gestructureerd antwoord op. Aanvragen worden eerlijk en snel behandeld.",
      },
    },
  },
];
