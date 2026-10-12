import type { LibraryUseCase } from "../types";

export const OPERATIONS_USE_CASES: LibraryUseCase[] = [
  {
    slug: "template-document-generator",
    function: "operations",
    sectors: ["professional-services", "public", "construction"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Template document generator",
        description:
          "Reports, letters, quality plans and standard documents are rebuilt by hand from old files each time. The agent fills your approved templates from structured data and notes, in your house style. Documents are produced faster and look consistent across the organisation.",
      },
      fr: {
        name: "Générateur de documents à partir de modèles",
        description:
          "Rapports, courriers, plans qualité et documents types sont refaits à la main à partir d'anciens fichiers. L'agent complète vos modèles validés à partir de données structurées et de notes, dans le style de votre maison. Les documents sont produits plus vite et restent homogènes dans toute l'organisation.",
      },
      nl: {
        name: "Documentgenerator op basis van sjablonen",
        description:
          "Rapporten, brieven, kwaliteitsplannen en standaarddocumenten worden telkens opnieuw met de hand opgebouwd uit oude bestanden. De agent vult uw goedgekeurde sjablonen in op basis van gestructureerde gegevens en notities, in uw huisstijl. Documenten zijn sneller klaar en zien er in de hele organisatie eenvormig uit.",
      },
    },
  },
  {
    slug: "email-writing-assistant",
    function: "operations",
    sectors: ["professional-services", "industry", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Professional email writing assistant",
        description:
          "Writing clear, correct and well-toned emails takes time, especially for sensitive topics or in a second language. The agent drafts or proofreads emails from a few notes and past correspondence, checks tone and language, and adapts to the recipient. Outgoing communication becomes faster, clearer and more consistent across the team.",
      },
      fr: {
        name: "Assistant de rédaction d'e-mails professionnels",
        description:
          "Rédiger des e-mails clairs, corrects et au bon ton prend du temps, surtout sur des sujets sensibles ou dans une langue étrangère. L'agent rédige ou relit vos e-mails à partir de quelques notes et des échanges précédents, vérifie le ton et la langue, et s'adapte au destinataire. Vos courriers sortants deviennent plus rapides, plus clairs et plus homogènes dans toute l'équipe.",
      },
      nl: {
        name: "Assistent voor professionele e-mails",
        description:
          "Heldere, correcte e-mails in de juiste toon schrijven kost tijd, zeker bij gevoelige onderwerpen of in een tweede taal. De agent stelt e-mails op of leest ze na op basis van enkele notities en eerdere correspondentie, controleert toon en taal en past zich aan de ontvanger aan. Uitgaande communicatie wordt sneller, duidelijker en eenvormiger binnen het team.",
      },
    },
  },
  {
    slug: "document-translation-assistant",
    function: "operations",
    sectors: ["professional-services", "public", "industry"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Document translation assistant",
        description:
          "Contracts, reports and procedures must be available in several languages, and manual translation is slow and breaks the layout. The agent translates documents with your terminology while keeping their formatting, and flags passages that need a native review. Teams publish multilingual documents quickly and consistently.",
      },
      fr: {
        name: "Assistant de traduction de documents",
        description:
          "Contrats, rapports et procédures doivent exister en plusieurs langues, et la traduction manuelle est lente et casse la mise en page. L'agent traduit vos documents avec votre terminologie en conservant leur mise en forme, et signale les passages à faire relire par un locuteur natif. Vos équipes publient des documents multilingues rapidement et de façon cohérente.",
      },
      nl: {
        name: "Assistent voor documentvertaling",
        description:
          "Contracten, rapporten en procedures moeten in meerdere talen beschikbaar zijn, en handmatig vertalen is traag en verstoort de opmaak. De agent vertaalt documenten met uw terminologie, behoudt de opmaak en markeert passages die een nalezing door een moedertaalspreker vragen. Teams publiceren snel en consequent meertalige documenten.",
      },
    },
  },
  {
    slug: "project-archive-search",
    function: "operations",
    sectors: ["construction", "professional-services", "industry"],
    tools: ["SharePoint", "Google Drive", "Odoo ERP"],
    copy: {
      en: {
        name: "Past project archive search",
        description:
          "Know-how from past projects sits in archived folders and in the heads of a few experienced people. The agent indexes past project files and summaries and answers questions such as which solution, condition or design was used before, with links to the source. Teams stop reinventing the wheel and new staff become autonomous faster.",
      },
      fr: {
        name: "Recherche dans les archives de projets",
        description:
          "Le savoir-faire des projets passés dort dans des dossiers archivés et dans la tête de quelques collaborateurs expérimentés. L'agent indexe les dossiers et synthèses des projets passés et répond à des questions comme : quelle solution, quelle condition ou quelle conception a déjà été retenue, avec le lien vers la source. Les équipes cessent de réinventer la roue et les nouveaux arrivants deviennent autonomes plus vite.",
      },
      nl: {
        name: "Zoeken in het archief van eerdere projecten",
        description:
          "De knowhow uit eerdere projecten zit in gearchiveerde mappen en in de hoofden van enkele ervaren mensen. De agent indexeert oude projectbestanden en samenvattingen en beantwoordt vragen zoals welke oplossing, voorwaarde of uitvoering al eerder gebruikt werd, met een link naar de bron. Teams vinden het warm water niet opnieuw uit en nieuwe medewerkers werken sneller zelfstandig.",
      },
    },
  },
  {
    slug: "delivery-route-planner",
    function: "operations",
    sectors: ["construction", "industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Delivery and field visit planner",
        description:
          "Planning trucks, deliveries or technician visits means juggling traffic, restrictions, availability and locations every day. The agent proposes daily routes and schedules that respect these constraints and replans when something changes. Fewer kilometres, better punctuality and less planning time.",
      },
      fr: {
        name: "Planification des livraisons et des tournées",
        description:
          "Planifier camions, livraisons ou interventions de techniciens oblige chaque jour à jongler entre trafic, restrictions, disponibilités et adresses. L'agent propose des tournées et des plannings quotidiens qui respectent ces contraintes et replanifie dès qu'un imprévu survient. Moins de kilomètres, plus de ponctualité et moins de temps passé à planifier.",
      },
      nl: {
        name: "Planner voor leveringen en bezoeken op het terrein",
        description:
          "Vrachtwagens, leveringen of technicibezoeken plannen betekent elke dag jongleren met verkeer, beperkingen, beschikbaarheden en locaties. De agent stelt dagelijkse routes en planningen voor die met deze beperkingen rekening houden en herplant wanneer er iets wijzigt. Minder kilometers, meer stiptheid en minder planningswerk.",
      },
    },
  },
  {
    slug: "document-classification-filing",
    function: "operations",
    sectors: ["professional-services", "industry", "public"],
    tools: ["SharePoint", "Google Drive"],
    copy: {
      en: {
        name: "Document classification and filing",
        description:
          "Scans, PDFs and emails are saved with random names in shared folders, so documents are hard to find and audits are painful. The agent reads each document, classifies it, extracts key metadata and files it with a consistent name in the right folder. Everything is findable and traceable without manual sorting.",
      },
      fr: {
        name: "Classement et archivage des documents",
        description:
          "Scans, PDF et e-mails sont enregistrés sous des noms aléatoires dans des dossiers partagés : les documents sont difficiles à retrouver et les audits pénibles. L'agent lit chaque document, le classe, en extrait les métadonnées clés et le range sous un nom cohérent dans le bon dossier. Tout est retrouvable et traçable, sans tri manuel.",
      },
      nl: {
        name: "Documenten classificeren en klasseren",
        description:
          "Scans, PDF's en e-mails worden met willekeurige namen in gedeelde mappen opgeslagen, waardoor documenten moeilijk terug te vinden zijn en audits pijnlijk verlopen. De agent leest elk document, classificeert het, haalt de belangrijkste metadata eruit en klasseert het met een consistente naam in de juiste map. Alles is vindbaar en traceerbaar zonder handmatig sorteren.",
      },
    },
  },
  {
    slug: "email-to-case-file-linker",
    function: "operations",
    sectors: ["professional-services", "public"],
    tools: ["Outlook", "SharePoint"],
    copy: {
      en: {
        name: "Email-to-case file linker",
        description:
          "Emails and attachments about an open case sit in personal mailboxes, so the case file is never complete. The agent reads each incoming message, matches it to the right open case and files it with the responsible person notified. Case files stay complete and anyone can pick up a file when a colleague is away.",
      },
      fr: {
        name: "Rattachement des e-mails aux dossiers",
        description:
          "Les e-mails et pièces jointes liés à un dossier en cours restent dans des boîtes personnelles, si bien que le dossier n'est jamais complet. L'agent lit chaque message entrant, l'associe au bon dossier ouvert, l'y classe et prévient la personne responsable. Les dossiers restent complets et chacun peut reprendre celui d'un collègue absent.",
      },
      nl: {
        name: "E-mails koppelen aan het juiste dossier",
        description:
          "E-mails en bijlagen over een lopend dossier blijven in persoonlijke mailboxen zitten, waardoor het dossier nooit volledig is. De agent leest elk binnenkomend bericht, koppelt het aan het juiste lopende dossier, klasseert het en verwittigt de verantwoordelijke. Dossiers blijven volledig en iedereen kan een dossier overnemen wanneer een collega afwezig is.",
      },
    },
  },
  {
    slug: "expert-report-drafter",
    function: "operations",
    sectors: ["professional-services", "public"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Expert report drafter",
        description:
          "Recurring expert deliverables such as reports, dossiers or publications reuse the same structure and wording, yet are written from scratch every time. The agent drafts new deliverables from meeting notes and your past documents, reusing approved formulations and terminology. Experts spend their time on analysis rather than on repetitive writing.",
      },
      fr: {
        name: "Rédacteur de rapports d'expertise",
        description:
          "Rapports, dossiers ou publications récurrents reprennent la même structure et les mêmes formulations, mais sont rédigés à partir de zéro à chaque fois. L'agent rédige les nouveaux livrables à partir de vos notes de réunion et de vos documents passés, en réutilisant les formulations et la terminologie validées. Les experts consacrent leur temps à l'analyse plutôt qu'à la rédaction répétitive.",
      },
      nl: {
        name: "Opsteller van expertiserapporten",
        description:
          "Terugkerende expertisedocumenten zoals rapporten, dossiers of publicaties gebruiken dezelfde structuur en formuleringen, maar worden telkens van nul geschreven. De agent stelt nieuwe documenten op uit vergadernotities en uw eerdere documenten, met hergebruik van goedgekeurde formuleringen en terminologie. Experts besteden hun tijd aan analyse in plaats van aan repetitief schrijfwerk.",
      },
    },
  },
  {
    slug: "document-completeness-validator",
    function: "operations",
    sectors: ["professional-services", "public", "construction"],
    tools: [],
    copy: {
      en: {
        name: "Submitted document validator",
        description:
          "Documents submitted by clients or applicants are often incomplete or inconsistent, discovered only during processing. The agent checks each submission against a checklist for completeness, format and consistency and lists what is missing. Files are complete before anyone starts working on them.",
      },
      fr: {
        name: "Contrôle des documents déposés",
        description:
          "Les documents transmis par les clients ou les demandeurs sont souvent incomplets ou incohérents, ce qu'on ne découvre qu'en cours de traitement. L'agent vérifie chaque dépôt au regard d'une liste de contrôle (complétude, format, cohérence) et liste ce qui manque. Les dossiers sont complets avant que quiconque ne commence à les traiter.",
      },
      nl: {
        name: "Controle van ingediende documenten",
        description:
          "Documenten die klanten of aanvragers indienen zijn vaak onvolledig of inconsistent, wat pas tijdens de verwerking aan het licht komt. De agent toetst elke indiening aan een checklist op volledigheid, formaat en samenhang en lijst op wat ontbreekt. Dossiers zijn volledig voor iemand eraan begint.",
      },
    },
  },
  {
    slug: "estimator-copilot",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Estimator copilot",
        description:
          "Work preparers and estimators rebuild each estimate from memory and old spreadsheets. The agent supports them with historical project data, current labour and material costs, risk checklists and planning suggestions. Estimates are faster, more accurate and less dependent on one person.",
      },
      fr: {
        name: "Assistant du métreur et du chiffreur",
        description:
          "Préparateurs et chiffreurs refont chaque estimation de mémoire et à partir d'anciens tableurs. L'agent les épaule avec l'historique des projets, les coûts actuels de main-d'œuvre et de matériaux, des listes de contrôle des risques et des suggestions de planning. Les chiffrages sont plus rapides, plus justes et moins dépendants d'une seule personne.",
      },
      nl: {
        name: "Copiloot voor calculatoren",
        description:
          "Werkvoorbereiders en calculatoren bouwen elke raming opnieuw op uit het geheugen en oude rekenbladen. De agent ondersteunt hen met historische projectgegevens, actuele loon- en materiaalkosten, risicochecklists en planningssuggesties. Ramingen zijn sneller klaar, nauwkeuriger en minder afhankelijk van één persoon.",
      },
    },
  },
  {
    slug: "operations-onboarding-coach",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Operations onboarding coach",
        description:
          "New staff learn processes and machine settings by asking colleagues or reading paper notes. The agent answers questions on procedures and settings, links to training material and logs recurring errors. Newcomers become autonomous faster and fewer mistakes repeat.",
      },
      fr: {
        name: "Coach d'accueil des nouveaux arrivants en production",
        description:
          "Les nouveaux collaborateurs apprennent les procédures et les réglages machines en interrogeant leurs collègues ou en lisant des notes papier. L'agent répond aux questions sur les procédures et les réglages, renvoie vers les supports de formation et consigne les erreurs récurrentes. Les nouveaux arrivants deviennent autonomes plus vite et les erreurs se répètent moins.",
      },
      nl: {
        name: "Coach voor het onthaal van nieuwe medewerkers",
        description:
          "Nieuwe medewerkers leren processen en machine-instellingen door collega's te vragen of papieren notities te lezen. De agent beantwoordt vragen over procedures en instellingen, verwijst naar opleidingsmateriaal en registreert terugkerende fouten. Nieuwkomers werken sneller zelfstandig en dezelfde fouten komen minder vaak terug.",
      },
    },
  },
  {
    slug: "order-intake-from-email",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: ["Odoo ERP", "Outlook"],
    copy: {
      en: {
        name: "Order intake from email",
        description:
          "Customer orders arrive by email as PDFs, spreadsheets or plain text and are retyped into the ERP. The agent identifies the customer and products, checks the data and creates the draft order for validation. Orders are entered faster and with fewer errors.",
      },
      fr: {
        name: "Saisie des commandes reçues par e-mail",
        description:
          "Les commandes clients arrivent par e-mail, en PDF, en tableur ou en texte libre, et sont ressaisies dans l'ERP. L'agent identifie le client et les produits, contrôle les données et crée la commande en brouillon pour validation. Les commandes sont saisies plus vite et avec moins d'erreurs.",
      },
      nl: {
        name: "Bestellingen invoeren vanuit e-mail",
        description:
          "Bestellingen van klanten komen per e-mail binnen als PDF, rekenblad of gewone tekst en worden opnieuw ingetikt in het ERP. De agent herkent de klant en de producten, controleert de gegevens en maakt een conceptbestelling aan ter validatie. Bestellingen worden sneller en met minder fouten ingevoerd.",
      },
    },
  },
  {
    slug: "product-data-enrichment",
    function: "operations",
    sectors: ["retail"],
    tools: [],
    copy: {
      en: {
        name: "Product data enrichment",
        description:
          "Product records have missing or wrong data such as dimensions or identifiers, which blocks listings. The agent finds missing data from reliable sources, requests the rest from suppliers, and updates the product database with an audit trail after validation. The catalogue becomes complete and reliable.",
      },
      fr: {
        name: "Enrichissement des fiches produits",
        description:
          "Les fiches produits comportent des données manquantes ou erronées, comme les dimensions ou les identifiants, ce qui bloque leur mise en ligne. L'agent retrouve les données manquantes auprès de sources fiables, réclame le reste aux fournisseurs et met à jour la base produits après validation, avec une traçabilité complète. Le catalogue devient complet et fiable.",
      },
      nl: {
        name: "Verrijking van productgegevens",
        description:
          "Productfiches bevatten ontbrekende of foute gegevens zoals afmetingen of identificatiecodes, wat publicatie blokkeert. De agent zoekt ontbrekende gegevens op in betrouwbare bronnen, vraagt de rest op bij leveranciers en werkt na validatie de productdatabank bij met een volledig auditspoor. De catalogus wordt volledig en betrouwbaar.",
      },
    },
  },
  {
    slug: "project-dossier-builder",
    function: "operations",
    sectors: ["construction", "professional-services"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Project dossier builder",
        description:
          "Project information is spread across meetings, emails and handovers, so no one has the full picture. The agent collects it into one structured dossier with an overview sheet, a follow-up list and a timeline of client interactions. Everyone works from the same up-to-date project file.",
      },
      fr: {
        name: "Constitution du dossier de projet",
        description:
          "Les informations d'un projet sont dispersées entre réunions, e-mails et passations, si bien que personne n'a la vision d'ensemble. L'agent les rassemble dans un dossier structuré unique, avec une fiche de synthèse, une liste de suivi et une chronologie des échanges avec le client. Tout le monde travaille sur le même dossier à jour.",
      },
      nl: {
        name: "Opbouw van projectdossiers",
        description:
          "Projectinformatie zit verspreid over vergaderingen, e-mails en overdrachten, waardoor niemand het volledige beeld heeft. De agent brengt alles samen in één gestructureerd dossier met een overzichtsfiche, een opvolgingslijst en een tijdlijn van de contacten met de klant. Iedereen werkt vanuit hetzelfde actuele projectdossier.",
      },
    },
  },
  {
    slug: "staff-to-client-matching",
    function: "operations",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Consultant-to-client matching",
        description:
          "Assigning the right consultant or technician to a client depends on skills, ambitions, location and history, and is done from memory. The agent matches people to client assignments on these criteria and explains each proposal. Assignments fit better and travel time drops.",
      },
      fr: {
        name: "Affectation des consultants aux clients",
        description:
          "Affecter le bon consultant ou le bon technicien à un client dépend des compétences, des aspirations, de la localisation et de l'historique, et se fait de mémoire. L'agent associe les personnes aux missions clients selon ces critères et justifie chaque proposition. Les affectations sont plus pertinentes et les temps de trajet diminuent.",
      },
      nl: {
        name: "Consultants koppelen aan klanten",
        description:
          "De juiste consultant of technicus toewijzen aan een klant hangt af van vaardigheden, ambities, locatie en voorgeschiedenis, en gebeurt uit het hoofd. De agent koppelt mensen aan klantopdrachten op basis van deze criteria en licht elk voorstel toe. Toewijzingen sluiten beter aan en de reistijd daalt.",
      },
    },
  },
  {
    slug: "supplier-price-list-updater",
    function: "operations",
    sectors: ["retail", "industry"],
    tools: ["Odoo ERP"],
    copy: {
      en: {
        name: "Supplier price list updater",
        description:
          "Supplier prices arrive in emails, portals and price lists in different formats, and internal prices are updated by hand. The agent consolidates purchase prices, detects changes and updates your internal price lists and product descriptions. Prices stay current and margins protected.",
      },
      fr: {
        name: "Mise à jour des tarifs fournisseurs",
        description:
          "Les prix fournisseurs arrivent par e-mail, via des portails ou dans des tarifs aux formats variés, et les prix internes sont mis à jour à la main. L'agent consolide les prix d'achat, détecte les changements et met à jour vos tarifs internes et descriptions produits. Les prix restent à jour et vos marges sont protégées.",
      },
      nl: {
        name: "Bijwerken van leveranciersprijslijsten",
        description:
          "Leveranciersprijzen komen binnen via e-mails, portalen en prijslijsten in verschillende formaten, en interne prijzen worden met de hand bijgewerkt. De agent consolideert de aankoopprijzen, detecteert wijzigingen en werkt uw interne prijslijsten en productomschrijvingen bij. Prijzen blijven actueel en marges beschermd.",
      },
    },
  },
  {
    slug: "travel-document-checker",
    function: "operations",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Travel document checker",
        description:
          "Missing or expired travel documents cause last-minute problems before departure. The agent lists the documents required per destination from official sources and checks before departure that each traveller's documents are present and valid. Departures happen without surprises.",
      },
      fr: {
        name: "Vérification des documents de voyage",
        description:
          "Des documents de voyage manquants ou périmés provoquent des problèmes de dernière minute avant le départ. L'agent liste les documents exigés pour chaque destination à partir des sources officielles et vérifie avant le départ que ceux de chaque voyageur sont présents et valides. Les départs se déroulent sans mauvaise surprise.",
      },
      nl: {
        name: "Controle van reisdocumenten",
        description:
          "Ontbrekende of vervallen reisdocumenten zorgen voor problemen op het laatste moment voor vertrek. De agent lijst per bestemming de vereiste documenten op uit officiële bronnen en controleert voor vertrek of de documenten van elke reiziger aanwezig en geldig zijn. Vertrekken verlopen zonder verrassingen.",
      },
    },
  },
  {
    slug: "case-assignment-router",
    function: "operations",
    sectors: ["professional-services", "construction"],
    tools: ["Microsoft Teams"],
    copy: {
      en: {
        name: "Case and project assignment",
        description:
          "New files and projects are assigned by hand, often to whoever is least busy rather than the best fit. The agent reads each new file, proposes the right owner and team based on content and workload, and notifies everyone of their role. Work is distributed fairly and starts without delay.",
      },
      fr: {
        name: "Attribution des dossiers et des projets",
        description:
          "Les nouveaux dossiers et projets sont attribués à la main, souvent à la personne la moins chargée plutôt qu'à la plus compétente. L'agent lit chaque nouveau dossier, propose le bon responsable et la bonne équipe selon le contenu et la charge de travail, et informe chacun de son rôle. Le travail est réparti équitablement et démarre sans délai.",
      },
      nl: {
        name: "Toewijzing van dossiers en projecten",
        description:
          "Nieuwe dossiers en projecten worden met de hand toegewezen, vaak aan wie het minst druk is in plaats van aan wie het best past. De agent leest elk nieuw dossier, stelt de juiste verantwoordelijke en het juiste team voor op basis van inhoud en werklast, en brengt iedereen op de hoogte van zijn rol. Het werk wordt eerlijk verdeeld en start zonder vertraging.",
      },
    },
  },
  {
    slug: "client-project-status-report",
    function: "operations",
    sectors: ["construction", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Client project status report",
        description:
          "Clients ask for regular progress updates and project managers compile them by hand. The agent produces a clear status report from project data, tasks and interactions, highlighting progress, budget and risks. Clients stay informed without extra reporting work.",
      },
      fr: {
        name: "Point d'avancement projet pour le client",
        description:
          "Les clients demandent des points d'avancement réguliers, que les chefs de projet compilent à la main. L'agent produit un état d'avancement clair à partir des données du projet, des tâches et des échanges, en mettant en avant l'avancement, le budget et les risques. Les clients restent informés sans travail de suivi supplémentaire.",
      },
      nl: {
        name: "Statusrapport van projecten voor klanten",
        description:
          "Klanten vragen regelmatig een stand van zaken en projectleiders stellen die met de hand samen. De agent maakt een helder statusrapport op basis van projectgegevens, taken en contactmomenten, met aandacht voor voortgang, budget en risico's. Klanten blijven op de hoogte zonder extra rapportagewerk.",
      },
    },
  },
  {
    slug: "complaint-register-analyst",
    function: "operations",
    sectors: ["industry", "construction", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Complaint register analyst",
        description:
          "The complaint register holds valuable signals, but nobody has time to analyse it beyond a few manual pivots. The agent reads the register, groups complaints by cause, product and team, and highlights recurring issues and their cost impact. Management sees where quality really breaks down and which corrective actions matter most.",
      },
      fr: {
        name: "Analyse du registre des réclamations",
        description:
          "Le registre des réclamations contient des signaux précieux, mais personne n'a le temps d'aller au-delà de quelques tableaux croisés manuels. L'agent lit le registre, regroupe les réclamations par cause, produit et équipe, et met en évidence les problèmes récurrents et leur coût. La direction voit où la qualité décroche vraiment et quelles actions correctives comptent le plus.",
      },
      nl: {
        name: "Analyse van het klachtenregister",
        description:
          "Het klachtenregister bevat waardevolle signalen, maar niemand heeft tijd om het verder te analyseren dan enkele handmatige draaitabellen. De agent leest het register, groepeert klachten per oorzaak, product en team en brengt terugkerende problemen en hun kostenimpact in beeld. Het management ziet waar de kwaliteit echt tekortschiet en welke corrigerende acties het meest opleveren.",
      },
    },
  },
  {
    slug: "fleet-cost-analyst",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Fleet cost analyst",
        description:
          "Distance, fuel and costs per vehicle are tracked in spreadsheets without real analysis. The agent analyses usage and cost per vehicle and type and highlights where to act. Fleet decisions are based on facts.",
      },
      fr: {
        name: "Analyse des coûts de la flotte",
        description:
          "Kilométrage, carburant et coûts par véhicule sont suivis dans des tableurs sans véritable analyse. L'agent analyse l'utilisation et le coût par véhicule et par type, et indique où agir. Vos décisions sur la flotte reposent sur des faits.",
      },
      nl: {
        name: "Analyse van wagenparkkosten",
        description:
          "Afgelegde afstand, brandstof en kosten per voertuig worden in rekenbladen bijgehouden zonder echte analyse. De agent analyseert gebruik en kosten per voertuig en type en toont waar u moet ingrijpen. Beslissingen over het wagenpark steunen op feiten.",
      },
    },
  },
  {
    slug: "handover-inspection-report",
    function: "operations",
    sectors: ["construction"],
    tools: [],
    copy: {
      en: {
        name: "Handover inspection report from photos",
        description:
          "At the end of works, inspection reports are written by hand from site photos and notes. The agent compiles a structured handover report from the photos, the completed works checklist and contractor details. Reports are ready right after the visit.",
      },
      fr: {
        name: "Procès-verbal de réception à partir de photos",
        description:
          "En fin de travaux, les procès-verbaux de réception sont rédigés à la main à partir des photos et des notes de chantier. L'agent établit un procès-verbal structuré à partir des photos, de la liste de contrôle des travaux réalisés et des coordonnées des entreprises intervenantes. Les procès-verbaux sont prêts dès la fin de la visite.",
      },
      nl: {
        name: "Opleveringsverslag op basis van foto's",
        description:
          "Op het einde van de werken worden opleveringsverslagen met de hand geschreven op basis van werffoto's en notities. De agent stelt een gestructureerd opleveringsverslag samen uit de foto's, de checklist van uitgevoerde werken en de gegevens van de aannemer. Verslagen zijn klaar meteen na het bezoek.",
      },
    },
  },
  {
    slug: "inbox-digest-and-follow-up",
    function: "operations",
    sectors: ["professional-services", "industry"],
    tools: ["Outlook", "SharePoint"],
    copy: {
      en: {
        name: "Inbox digest and follow-up suggestions",
        description:
          "Busy managers receive more email than they can read and lose track of what they promised to do. The agent summarises incoming and outgoing threads, extracts expected actions, suggests follow-ups and files messages in the right folder. People start the day knowing what matters and nothing slips through.",
      },
      fr: {
        name: "Synthèse de la boîte mail et suggestions de relance",
        description:
          "Les managers reçoivent plus d'e-mails qu'ils ne peuvent en lire et perdent de vue ce qu'ils ont promis de faire. L'agent résume les fils entrants et sortants, extrait les actions attendues, suggère des relances et classe les messages dans le bon dossier. Chacun commence la journée en sachant ce qui compte, et rien ne passe entre les mailles.",
      },
      nl: {
        name: "Overzicht van de inbox en opvolgingsvoorstellen",
        description:
          "Drukbezette managers krijgen meer e-mails dan ze kunnen lezen en verliezen uit het oog wat ze beloofd hebben. De agent vat inkomende en uitgaande conversaties samen, haalt verwachte acties eruit, stelt opvolging voor en klasseert berichten in de juiste map. Mensen starten de dag met zicht op wat belangrijk is en niets glipt erdoor.",
      },
    },
  },
  {
    slug: "material-consumption-tracker",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Material consumption tracker",
        description:
          "Consumption of key materials per project is tracked in spreadsheets and anomalies go unnoticed. The agent consolidates consumption by project, compares it with expectations and alerts on unusual usage. Waste and overruns are caught early.",
      },
      fr: {
        name: "Suivi de la consommation de matériaux",
        description:
          "La consommation des principaux matériaux par projet est suivie dans des tableurs et les anomalies passent inaperçues. L'agent consolide les consommations par projet, les compare aux prévisions et alerte en cas d'usage inhabituel. Gaspillages et dépassements sont repérés tôt.",
      },
      nl: {
        name: "Opvolging van materiaalverbruik",
        description:
          "Het verbruik van belangrijke materialen per project wordt in rekenbladen bijgehouden en afwijkingen blijven onopgemerkt. De agent consolideert het verbruik per project, vergelijkt het met de verwachtingen en verwittigt bij ongewoon verbruik. Verspilling en overschrijdingen worden vroeg opgemerkt.",
      },
    },
  },
  {
    slug: "order-confirmation-workflow",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: ["Odoo ERP"],
    copy: {
      en: {
        name: "Order confirmation and dispatch documents",
        description:
          "Each confirmed order triggers a confirmation, preparation instructions, a delivery note and status updates, mostly done by hand. The agent sends the confirmation, triggers preparation, generates the delivery note and keeps the order status updated. Orders flow without manual coordination.",
      },
      fr: {
        name: "Confirmation de commande et documents d'expédition",
        description:
          "Chaque commande confirmée entraîne une confirmation, des instructions de préparation, un bon de livraison et des mises à jour de statut, le plus souvent à la main. L'agent envoie la confirmation, déclenche la préparation, génère le bon de livraison et tient le statut de la commande à jour. Les commandes s'enchaînent sans coordination manuelle.",
      },
      nl: {
        name: "Orderbevestiging en verzenddocumenten",
        description:
          "Elke bevestigde bestelling brengt een bevestiging, voorbereidingsinstructies, een leveringsbon en statusupdates met zich mee, meestal met de hand. De agent verstuurt de bevestiging, zet de voorbereiding in gang, maakt de leveringsbon aan en houdt de status van de bestelling bij. Bestellingen lopen vlot zonder handmatige coördinatie.",
      },
    },
  },
  {
    slug: "paper-form-digitiser",
    function: "operations",
    sectors: ["industry"],
    tools: [],
    copy: {
      en: {
        name: "Paper form digitiser",
        description:
          "Stock sheets, production sheets and price grids are still filled in on paper and retyped later. The agent reads photos or scans of these forms, structures the data in spreadsheets and flags anomalies. Data is available the same day and transcription errors disappear.",
      },
      fr: {
        name: "Numérisation des formulaires papier",
        description:
          "Fiches de stock, fiches de production et grilles tarifaires sont encore remplies sur papier puis ressaisies. L'agent lit les photos ou scans de ces formulaires, structure les données dans des tableurs et signale les anomalies. Les données sont disponibles le jour même et les erreurs de saisie disparaissent.",
      },
      nl: {
        name: "Digitalisering van papieren formulieren",
        description:
          "Voorraadfiches, productiefiches en prijsroosters worden nog op papier ingevuld en later overgetikt. De agent leest foto's of scans van deze formulieren, structureert de gegevens in rekenbladen en signaleert afwijkingen. De gegevens zijn dezelfde dag beschikbaar en overtypfouten verdwijnen.",
      },
    },
  },
  {
    slug: "periodic-inspection-tracker",
    function: "operations",
    sectors: ["professional-services", "industry", "public"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Periodic inspection and maintenance tracker",
        description:
          "Mandatory inspections and maintenance for installations are tracked in calendars and spreadsheets. The agent tracks every obligation, sends reminders before due dates and checks that certificates are received. Compliance is maintained without last-minute rushes.",
      },
      fr: {
        name: "Suivi des contrôles et maintenances périodiques",
        description:
          "Les contrôles obligatoires et la maintenance des installations sont suivis dans des agendas et des tableurs. L'agent suit chaque obligation, envoie des rappels avant les échéances et vérifie la réception des certificats. La conformité est assurée sans course de dernière minute.",
      },
      nl: {
        name: "Opvolging van periodieke keuringen en onderhoud",
        description:
          "Verplichte keuringen en onderhoud van installaties worden opgevolgd in agenda's en rekenbladen. De agent volgt elke verplichting op, verstuurt herinneringen voor de vervaldatum en controleert of de attesten ontvangen zijn. U blijft in orde zonder haastwerk op het laatste moment.",
      },
    },
  },
  {
    slug: "plan-discrepancy-checker",
    function: "operations",
    sectors: ["construction"],
    tools: [],
    copy: {
      en: {
        name: "Drawing discrepancy checker",
        description:
          "Architectural, structural and quantity documents do not always agree, and revisions change drawings without notice. The agent compares documents and plan versions, lists discrepancies and changes, and flags them before work starts. Errors are caught on paper instead of on site.",
      },
      fr: {
        name: "Détection des incohérences entre plans",
        description:
          "Plans d'architecte, plans de structure et métrés ne concordent pas toujours, et les révisions modifient les plans sans prévenir. L'agent compare les documents et les versions de plans, liste les écarts et les modifications, et les signale avant le démarrage des travaux. Les erreurs sont détectées sur le papier plutôt que sur le chantier.",
      },
      nl: {
        name: "Controle op tegenstrijdigheden in plannen",
        description:
          "Architectuur-, stabiliteits- en meetstaatdocumenten zijn niet altijd met elkaar in overeenstemming, en revisies wijzigen plannen zonder aankondiging. De agent vergelijkt documenten en planversies, lijst tegenstrijdigheden en wijzigingen op en signaleert ze voor de werken starten. Fouten worden op papier opgemerkt in plaats van op de werf.",
      },
    },
  },
  {
    slug: "product-label-compliance-check",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Product label compliance checker",
        description:
          "Food and product labels must be checked against regulatory lists before printing, which is slow and error-prone. The agent checks each label against the applicable registers and rules and flags missing or incorrect information. Labels are validated faster and recalls are avoided.",
      },
      fr: {
        name: "Contrôle de conformité des étiquettes produits",
        description:
          "Les étiquettes alimentaires et produits doivent être vérifiées au regard des listes réglementaires avant impression, ce qui est lent et source d'erreurs. L'agent contrôle chaque étiquette au regard des registres et règles applicables, et signale les mentions manquantes ou erronées. Les étiquettes sont validées plus vite et les rappels de produits évités.",
      },
      nl: {
        name: "Conformiteitscontrole van productetiketten",
        description:
          "Voedings- en productetiketten moeten voor het drukken getoetst worden aan reglementaire lijsten, wat traag en foutgevoelig is. De agent toetst elk etiket aan de toepasselijke registers en regels en signaleert ontbrekende of foute informatie. Etiketten worden sneller gevalideerd en terugroepacties worden vermeden.",
      },
    },
  },
  {
    slug: "production-planner",
    function: "operations",
    sectors: ["industry"],
    tools: ["Dynamics 365"],
    copy: {
      en: {
        name: "Production planning assistant",
        description:
          "Production plans depend on sales forecasts, equipment, materials and staff, and must be rebuilt when constraints change. The agent converts the sales outlook into production needs and proposes a schedule that is updated daily. Production stays aligned with demand.",
      },
      fr: {
        name: "Assistant de planification de la production",
        description:
          "Les plans de production dépendent des prévisions de ventes, des équipements, des matières et du personnel, et doivent être refaits dès que les contraintes changent. L'agent traduit les prévisions de ventes en besoins de production et propose un planning mis à jour chaque jour. La production reste alignée sur la demande.",
      },
      nl: {
        name: "Assistent voor productieplanning",
        description:
          "Productieplannen hangen af van verkoopprognoses, machines, materialen en personeel, en moeten opnieuw opgebouwd worden wanneer de randvoorwaarden wijzigen. De agent zet de verkoopvooruitzichten om in productiebehoeften en stelt een planning voor die dagelijks wordt bijgewerkt. De productie blijft afgestemd op de vraag.",
      },
    },
  },
  {
    slug: "request-intake-encoder",
    function: "operations",
    sectors: ["construction", "industry", "professional-services"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Request intake encoder",
        description:
          "Requests for quotes or projects arrive by email and paper forms and are encoded by hand into the register or CRM. The agent extracts the key data, checks completeness and records the request in your system. Requests are logged consistently and handled sooner.",
      },
      fr: {
        name: "Enregistrement des demandes entrantes",
        description:
          "Les demandes de devis ou de projets arrivent par e-mail et sur formulaire papier, puis sont saisies à la main dans le registre ou le CRM. L'agent extrait les données clés, vérifie qu'elles sont complètes et enregistre la demande dans votre outil. Les demandes sont consignées de façon homogène et traitées plus tôt.",
      },
      nl: {
        name: "Registratie van binnenkomende aanvragen",
        description:
          "Aanvragen voor offertes of projecten komen binnen via e-mail en papieren formulieren en worden met de hand in het register of CRM ingevoerd. De agent haalt de kerngegevens eruit, controleert de volledigheid en registreert de aanvraag in uw systeem. Aanvragen worden eenvormig geregistreerd en sneller behandeld.",
      },
    },
  },
  {
    slug: "research-library-assistant",
    function: "operations",
    sectors: ["public", "professional-services"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Research library assistant",
        description:
          "Studies, reports and research PDFs are scattered across drives and paper archives, so researchers repeat searches. The agent digitises and indexes the library and answers questions with precise references to the source documents. Research is faster and builds on everything the organisation already knows.",
      },
      fr: {
        name: "Assistant de bibliothèque documentaire",
        description:
          "Études, rapports et PDF de recherche sont dispersés entre disques partagés et archives papier, si bien que les chercheurs refont les mêmes recherches. L'agent numérise et indexe le fonds documentaire, et répond aux questions avec des références précises aux documents sources. La recherche va plus vite et s'appuie sur tout ce que l'organisation sait déjà.",
      },
      nl: {
        name: "Assistent voor de onderzoeksbibliotheek",
        description:
          "Studies, rapporten en onderzoeks-PDF's zitten verspreid over schijven en papieren archieven, waardoor onderzoekers dezelfde opzoekingen herhalen. De agent digitaliseert en indexeert de bibliotheek en beantwoordt vragen met precieze verwijzingen naar de brondocumenten. Onderzoek gaat sneller en bouwt voort op alles wat de organisatie al weet.",
      },
    },
  },
  {
    slug: "site-safety-incident-analyst",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Safety incident analyst",
        description:
          "Incident reports are filed but rarely analysed together to prevent the next one. The agent classifies incidents by type and severity, combines them with site conditions and rules, and sends prevention recommendations and risk briefings. Prevention advisors act on patterns before accidents repeat.",
      },
      fr: {
        name: "Analyse des incidents de sécurité",
        description:
          "Les rapports d'incident sont classés mais rarement analysés ensemble pour éviter le suivant. L'agent classe les incidents par type et par gravité, les croise avec les conditions de chantier et les règles, et diffuse des recommandations de prévention et des notes sur les risques. Les conseillers en prévention agissent sur les tendances avant que les accidents ne se répètent.",
      },
      nl: {
        name: "Analyse van veiligheidsincidenten",
        description:
          "Incidentmeldingen worden geregistreerd, maar zelden samen geanalyseerd om het volgende incident te voorkomen. De agent classificeert incidenten volgens type en ernst, combineert ze met de omstandigheden en regels op de werf en bezorgt preventieaanbevelingen en risicobriefings. Preventieadviseurs handelen op basis van patronen voor ongevallen zich herhalen.",
      },
    },
  },
  {
    slug: "supplier-availability-outreach",
    function: "operations",
    sectors: ["professional-services", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Supplier availability outreach",
        description:
          "Checking availability and options with many partners or venues means sending and chasing similar emails. The agent sends structured requests, collects the replies and records the information in your database. Teams get up-to-date availability without manual chasing.",
      },
      fr: {
        name: "Demandes de disponibilité aux fournisseurs",
        description:
          "Vérifier disponibilités et options auprès de nombreux partenaires ou lieux oblige à envoyer et relancer des e-mails similaires. L'agent envoie des demandes structurées, collecte les réponses et enregistre les informations dans votre base de données. Les équipes disposent de disponibilités à jour sans relances manuelles.",
      },
      nl: {
        name: "Beschikbaarheid opvragen bij leveranciers",
        description:
          "Beschikbaarheid en opties nagaan bij veel partners of locaties betekent gelijkaardige e-mails versturen en opvolgen. De agent verstuurt gestructureerde aanvragen, verzamelt de antwoorden en registreert de informatie in uw databank. Teams hebben actuele beschikbaarheden zonder handmatig achter antwoorden aan te moeten.",
      },
    },
  },
  {
    slug: "technical-datasheet-pack",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Technical datasheet pack builder",
        description:
          "Quotes and projects need the right technical datasheets attached, gathered by hand each time. The agent identifies which sheets are required, attaches the available ones and lists those still to request. Offers and project files are complete.",
      },
      fr: {
        name: "Constitution des dossiers de fiches techniques",
        description:
          "Devis et projets doivent être accompagnés des bonnes fiches techniques, rassemblées à la main à chaque fois. L'agent identifie les fiches requises, joint celles qui sont disponibles et liste celles qu'il reste à demander. Offres et dossiers de projet sont complets.",
      },
      nl: {
        name: "Bundel met technische fiches",
        description:
          "Offertes en projecten moeten vergezeld zijn van de juiste technische fiches, die telkens met de hand verzameld worden. De agent bepaalt welke fiches nodig zijn, voegt de beschikbare toe en lijst op welke nog opgevraagd moeten worden. Offertes en projectdossiers zijn volledig.",
      },
    },
  },
  {
    slug: "traffic-data-analyst",
    function: "operations",
    sectors: ["public"],
    tools: [],
    copy: {
      en: {
        name: "Traffic count analyst",
        description:
          "Traffic counts produce large raw datasets that are turned into graphs and reports by hand. The agent analyses volumes, speeds and peak times, detects patterns and produces standard reports and charts. Mobility studies move faster.",
      },
      fr: {
        name: "Analyse des comptages routiers",
        description:
          "Les comptages routiers produisent de gros volumes de données brutes, transformés à la main en graphiques et en rapports. L'agent analyse les volumes, les vitesses et les heures de pointe, détecte les tendances et produit rapports et graphiques standards. Les études de mobilité avancent plus vite.",
      },
      nl: {
        name: "Analyse van verkeerstellingen",
        description:
          "Verkeerstellingen leveren grote ruwe datasets op die met de hand omgezet worden in grafieken en rapporten. De agent analyseert volumes, snelheden en piekmomenten, herkent patronen en maakt standaardrapporten en grafieken. Mobiliteitsstudies verlopen sneller.",
      },
    },
  },
  {
    slug: "traffic-fine-attribution",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Traffic fine driver attribution",
        description:
          "Each traffic fine requires finding which driver used the vehicle at that time across several systems. The agent cross-checks planning and vehicle data to identify the driver and assembles the evidence for recovery. Fines are attributed correctly in minutes.",
      },
      fr: {
        name: "Désignation du conducteur pour les amendes",
        description:
          "Chaque amende impose de retrouver, dans plusieurs outils, quel conducteur utilisait le véhicule au moment de l'infraction. L'agent croise les données de planning et de véhicule pour identifier le conducteur et rassemble les justificatifs pour la refacturation. Les amendes sont attribuées correctement en quelques minutes.",
      },
      nl: {
        name: "Verkeersboetes toewijzen aan de juiste bestuurder",
        description:
          "Bij elke verkeersboete moet in verschillende systemen opgezocht worden welke bestuurder het voertuig op dat moment gebruikte. De agent kruist planning- en voertuiggegevens om de bestuurder te identificeren en bundelt het bewijs voor de terugvordering. Boetes worden binnen enkele minuten correct toegewezen.",
      },
    },
  },
  {
    slug: "call-script-template-filler",
    function: "operations",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Call script template filler",
        description:
          "Each new client of an answering or contact service needs scripts filled in from their documents and meeting notes. The agent drafts the scripts in your system format from the client's material. New clients go live faster.",
      },
      fr: {
        name: "Préparation des scripts d'appel",
        description:
          "Chaque nouveau client d'un service de permanence téléphonique ou de centre de contact exige des scripts remplis à partir de ses documents et des notes de réunion. L'agent rédige les scripts au format de votre outil à partir des éléments fournis par le client. Les nouveaux clients démarrent plus vite.",
      },
      nl: {
        name: "Invullen van belscripts",
        description:
          "Elke nieuwe klant van een telefoon- of contactcenterdienst vraagt scripts die ingevuld worden op basis van zijn documenten en vergadernotities. De agent stelt de scripts op in het formaat van uw systeem, vanuit het materiaal van de klant. Nieuwe klanten zijn sneller live.",
      },
    },
  },
  {
    slug: "catalogue-harmonisation",
    function: "operations",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Service catalogue harmonisation",
        description:
          "After mergers or growth, each site names and prices the same services differently. The agent maps services, codes and prices across sites and proposes a harmonised catalogue. Reporting and pricing become comparable.",
      },
      fr: {
        name: "Harmonisation du catalogue de services",
        description:
          "Après des fusions ou une phase de croissance, chaque site nomme et facture différemment les mêmes services. L'agent met en correspondance services, codes et prix entre les sites et propose un catalogue harmonisé. Suivi et tarification deviennent comparables.",
      },
      nl: {
        name: "Harmonisatie van de dienstencatalogus",
        description:
          "Na fusies of groei benoemt en prijst elke vestiging dezelfde diensten anders. De agent brengt diensten, codes en prijzen over alle vestigingen in kaart en stelt een geharmoniseerde catalogus voor. Rapportering en prijszetting worden vergelijkbaar.",
      },
    },
  },
  {
    slug: "certification-label-tracker",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Certification label usage tracker",
        description:
          "Using a sustainability or quality certification label requires evidence for each product and material. The agent tracks label use, links the supporting evidence and prepares the audit report. Audits are straightforward and claims stay compliant.",
      },
      fr: {
        name: "Suivi de l'utilisation des labels de certification",
        description:
          "Utiliser un label de durabilité ou de qualité exige des preuves pour chaque produit et chaque matériau. L'agent suit l'usage du label, rattache les justificatifs et prépare le rapport d'audit. Les audits se passent simplement et les allégations restent conformes.",
      },
      nl: {
        name: "Opvolging van het gebruik van certificatielabels",
        description:
          "Een duurzaamheids- of kwaliteitslabel gebruiken vereist bewijs voor elk product en materiaal. De agent volgt het gebruik van het label op, koppelt de bewijsstukken en bereidt het auditrapport voor. Audits verlopen vlot en claims blijven conform.",
      },
    },
  },
  {
    slug: "compliance-certificate-generator",
    function: "operations",
    sectors: ["public", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Compliance certificate generator",
        description:
          "Certificates and inspection reports are written by hand from scanned documents and findings. The agent extracts the data from documents and drafts the certificate or report for expert validation. Experts sign more certificates in less time.",
      },
      fr: {
        name: "Générateur de certificats de conformité",
        description:
          "Certificats et rapports de contrôle sont rédigés à la main à partir de documents scannés et de constats. L'agent extrait les données des documents et rédige le certificat ou le rapport pour validation par l'expert. Les experts signent davantage de certificats en moins de temps.",
      },
      nl: {
        name: "Generator van conformiteitsattesten",
        description:
          "Attesten en keuringsverslagen worden met de hand geschreven op basis van gescande documenten en vaststellingen. De agent haalt de gegevens uit de documenten en stelt het attest of verslag op ter validatie door een expert. Experts ondertekenen meer attesten in minder tijd.",
      },
    },
  },
  {
    slug: "customs-document-check",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Customs document checker",
        description:
          "Customs documents must match shipment records exactly, and errors cause delays at the border. The agent checks completeness, numbers and declared contents against the shipment. Shipments clear customs without surprises.",
      },
      fr: {
        name: "Contrôle des documents douaniers",
        description:
          "Les documents douaniers doivent correspondre exactement aux données d'expédition, et la moindre erreur provoque des retards à la frontière. L'agent vérifie la complétude, les numéros et le contenu déclaré au regard de l'expédition. Les envois passent la douane sans mauvaise surprise.",
      },
      nl: {
        name: "Controle van douanedocumenten",
        description:
          "Douanedocumenten moeten exact overeenkomen met de zendingsgegevens, en fouten zorgen voor vertraging aan de grens. De agent controleert volledigheid, nummers en aangegeven inhoud ten opzichte van de zending. Zendingen gaan zonder verrassingen door de douane.",
      },
    },
  },
  {
    slug: "datasheet-customiser",
    function: "operations",
    sectors: ["industry"],
    tools: [],
    copy: {
      en: {
        name: "Datasheet customiser",
        description:
          "Standard technical datasheets must be adapted to each client's constraints before delivery. The agent adapts the standard sheet to the client requirements and produces a ready-to-send document for review. Customised documentation is delivered faster.",
      },
      fr: {
        name: "Personnalisation des fiches techniques",
        description:
          "Les fiches techniques standards doivent être adaptées aux contraintes de chaque client avant livraison. L'agent adapte la fiche standard aux exigences du client et produit un document prêt à envoyer, à relire. La documentation personnalisée est livrée plus vite.",
      },
      nl: {
        name: "Technische fiches op maat",
        description:
          "Standaard technische fiches moeten voor levering aangepast worden aan de randvoorwaarden van elke klant. De agent past de standaardfiche aan de vereisten van de klant aan en levert een document klaar om te versturen, ter nalezing. Documentatie op maat wordt sneller geleverd.",
      },
    },
  },
  {
    slug: "email-history-search",
    function: "operations",
    sectors: ["professional-services"],
    tools: ["Outlook", "SharePoint"],
    copy: {
      en: {
        name: "Email history search assistant",
        description:
          "When a colleague is away, finding what was said to a client means digging through mailboxes and folders. The agent searches email history and related documents in natural language and summarises the thread for a given client or asset. Anyone can answer a client with full context.",
      },
      fr: {
        name: "Assistant de recherche dans l'historique des e-mails",
        description:
          "Quand un collègue est absent, retrouver ce qui a été dit à un client oblige à fouiller boîtes mail et dossiers. L'agent recherche dans l'historique des e-mails et les documents associés en langage naturel, et résume les échanges pour un client ou un bien donné. Chacun peut répondre à un client en ayant tout le contexte.",
      },
      nl: {
        name: "Zoekassistent voor e-mailhistoriek",
        description:
          "Wanneer een collega afwezig is, betekent terugvinden wat er tegen een klant gezegd werd graven in mailboxen en mappen. De agent doorzoekt de e-mailhistoriek en bijhorende documenten in gewone taal en vat de conversatie samen voor een bepaalde klant of een bepaald object. Iedereen kan een klant met volledige context antwoorden.",
      },
    },
  },
  {
    slug: "esg-report-drafter",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "ESG report drafter",
        description:
          "Sustainability reporting requires collecting data across departments and writing to a regulatory format. The agent gathers the indicators, checks gaps and drafts the report sections. Reporting is on time with less effort.",
      },
      fr: {
        name: "Rédaction du rapport ESG",
        description:
          "Le reporting extra-financier sur les critères environnementaux, sociaux et de gouvernance (ESG) exige de collecter des données dans tous les services et de rédiger selon un format réglementaire. L'agent rassemble les indicateurs, vérifie les manques et rédige les sections du rapport. Le rapport est prêt à temps, avec moins d'effort.",
      },
      nl: {
        name: "Opsteller van ESG-rapporten",
        description:
          "Duurzaamheidsrapportering vraagt gegevens verzamelen over alle afdelingen heen en schrijven volgens een reglementair formaat. De agent verzamelt de indicatoren, controleert op leemtes en stelt de hoofdstukken van het rapport op. De rapportering is op tijd klaar met minder inspanning.",
      },
    },
  },
  {
    slug: "fuel-card-anomaly-detector",
    function: "operations",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Fuel card anomaly detector",
        description:
          "Fuel card misuse is hard to see in long transaction lists. The agent flags suspicious patterns such as volumes above tank capacity, refuelling when the vehicle was not in use or unusual frequency. Abuse is detected quickly with clear evidence.",
      },
      fr: {
        name: "Détection d'anomalies sur les cartes carburant",
        description:
          "Les abus de cartes carburant sont difficiles à repérer dans de longues listes de transactions. L'agent signale les comportements suspects, comme des volumes supérieurs à la capacité du réservoir, des pleins alors que le véhicule n'était pas utilisé ou une fréquence inhabituelle. Les abus sont détectés rapidement, preuves à l'appui.",
      },
      nl: {
        name: "Detectie van afwijkingen op tankkaarten",
        description:
          "Misbruik van tankkaarten is moeilijk te zien in lange lijsten met transacties. De agent signaleert verdachte patronen zoals volumes boven de tankinhoud, tankbeurten wanneer het voertuig niet in gebruik was of een ongewone frequentie. Misbruik wordt snel opgespoord met duidelijk bewijs.",
      },
    },
  },
  {
    slug: "inspection-report-generator",
    function: "operations",
    sectors: ["public", "construction"],
    tools: [],
    copy: {
      en: {
        name: "Inspection report generator",
        description:
          "Inspection findings and photos are turned into reports by hand in a fixed format. The agent produces a standardised report with photos and findings from the inspection data. Reports are uniform and delivered faster.",
      },
      fr: {
        name: "Générateur de rapports de contrôle",
        description:
          "Les constats et photos de contrôle sont transformés à la main en rapports au format imposé. L'agent produit un rapport standardisé, avec photos et constats, à partir des données du contrôle. Les rapports sont homogènes et livrés plus vite.",
      },
      nl: {
        name: "Generator van inspectieverslagen",
        description:
          "Vaststellingen en foto's van inspecties worden met de hand omgezet in verslagen volgens een vast formaat. De agent maakt een gestandaardiseerd verslag met foto's en vaststellingen op basis van de inspectiegegevens. Verslagen zijn eenvormig en sneller klaar.",
      },
    },
  },
  {
    slug: "item-reference-matcher",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Item reference matcher",
        description:
          "Customer and supplier item numbers must be linked to your own references by manual lookup. The agent matches references automatically and asks only about uncertain cases. Order and invoice processing no longer stalls on lookups.",
      },
      fr: {
        name: "Correspondance des références articles",
        description:
          "Les références articles des clients et des fournisseurs doivent être rattachées aux vôtres par recherche manuelle. L'agent établit automatiquement les correspondances et ne vous sollicite que pour les cas incertains. Le traitement des commandes et des factures ne bloque plus sur ces recherches.",
      },
      nl: {
        name: "Koppeling van artikelreferenties",
        description:
          "Artikelnummers van klanten en leveranciers moeten via handmatig opzoekwerk aan uw eigen referenties gekoppeld worden. De agent koppelt referenties automatisch en vraagt enkel bij twijfelgevallen om bevestiging. De verwerking van bestellingen en facturen loopt niet langer vast op opzoekwerk.",
      },
    },
  },
  {
    slug: "lab-report-checker",
    function: "operations",
    sectors: ["industry"],
    tools: [],
    copy: {
      en: {
        name: "Lab report checker",
        description:
          "Laboratory results must be checked against product and safety specifications before release. The agent compares each report to the specification and flags results out of tolerance. Quality releases are faster and safer.",
      },
      fr: {
        name: "Contrôle des rapports de laboratoire",
        description:
          "Les résultats de laboratoire doivent être comparés aux spécifications produit et sécurité avant libération. L'agent compare chaque rapport à la spécification et signale les résultats hors tolérance. Les libérations qualité sont plus rapides et plus sûres.",
      },
      nl: {
        name: "Controle van labo-rapporten",
        description:
          "Laboresultaten moeten voor vrijgave getoetst worden aan de product- en veiligheidsspecificaties. De agent vergelijkt elk rapport met de specificatie en signaleert resultaten buiten de tolerantie. Kwaliteitsvrijgaves verlopen sneller en veiliger.",
      },
    },
  },
  {
    slug: "product-specification-compiler",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Product specification compiler",
        description:
          "Customers and authorities require technical specifications with origin, ingredients and compliance data for each product. The agent compiles the specification from supplier and internal data and flags missing items. Specifications are complete and consistent.",
      },
      fr: {
        name: "Compilation des fiches de spécifications produits",
        description:
          "Clients et autorités exigent pour chaque produit des spécifications techniques précisant l'origine, la composition et les données de conformité. L'agent compile la fiche à partir des données fournisseurs et internes, et signale les éléments manquants. Les spécifications sont complètes et cohérentes.",
      },
      nl: {
        name: "Samenstellen van productspecificaties",
        description:
          "Klanten en overheden vragen voor elk product technische specificaties met oorsprong, ingrediënten en conformiteitsgegevens. De agent stelt de specificatie samen uit leveranciers- en interne gegevens en signaleert wat ontbreekt. Specificaties zijn volledig en consistent.",
      },
    },
  },
  {
    slug: "project-carbon-estimator",
    function: "operations",
    sectors: ["construction", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Project carbon footprint estimator",
        description:
          "Clients increasingly ask for the carbon impact of a project at the quote stage. The agent estimates the footprint from the planned materials and work and adds it to the offer. Sustainability becomes part of the proposal.",
      },
      fr: {
        name: "Estimation de l'empreinte carbone d'un projet",
        description:
          "Les clients demandent de plus en plus l'impact carbone d'un projet dès le stade du devis. L'agent estime l'empreinte à partir des matériaux et travaux prévus et l'intègre à l'offre. La durabilité devient un élément de la proposition.",
      },
      nl: {
        name: "Raming van de koolstofvoetafdruk van projecten",
        description:
          "Klanten vragen steeds vaker de klimaatimpact van een project al in de offertefase. De agent raamt de voetafdruk op basis van de geplande materialen en werken en voegt die toe aan de offerte. Duurzaamheid wordt een vast onderdeel van het voorstel.",
      },
    },
  },
  {
    slug: "project-schedule-optimiser",
    function: "operations",
    sectors: ["construction", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Project schedule optimiser",
        description:
          "Project schedules are updated by hand and rarely reflect the latest progress and capacity. The agent updates the schedule from actual progress and resources and proposes adjustments. Project managers keep a realistic plan with little effort.",
      },
      fr: {
        name: "Optimisation du planning de projet",
        description:
          "Les plannings de projet sont mis à jour à la main et reflètent rarement l'avancement réel et les capacités disponibles. L'agent met à jour le planning selon l'avancement effectif et les ressources, et propose des ajustements. Les chefs de projet gardent un planning réaliste sans effort.",
      },
      nl: {
        name: "Optimalisatie van projectplanningen",
        description:
          "Projectplanningen worden met de hand bijgewerkt en weerspiegelen zelden de laatste voortgang en capaciteit. De agent werkt de planning bij op basis van de werkelijke voortgang en middelen en stelt bijsturingen voor. Projectleiders houden met weinig moeite een realistische planning aan.",
      },
    },
  },
  {
    slug: "request-event-tracker",
    function: "operations",
    sectors: ["professional-services", "public"],
    tools: [],
    copy: {
      en: {
        name: "Request and incident tracker",
        description:
          "Incidents, works requests and changes arrive through many channels and their status is unknown. The agent records each request as a tracked event, assigns it to the right person and keeps a full history. Nothing is forgotten and anyone can report status.",
      },
      fr: {
        name: "Suivi des demandes et des incidents",
        description:
          "Incidents, demandes de travaux et modifications arrivent par de multiples canaux et leur statut reste inconnu. L'agent enregistre chaque demande comme un événement suivi, l'attribue à la bonne personne et conserve un historique complet. Rien n'est oublié et chacun peut faire le point sur l'état d'avancement.",
      },
      nl: {
        name: "Opvolging van aanvragen en incidenten",
        description:
          "Incidenten, werkaanvragen en wijzigingen komen via veel kanalen binnen en hun status is onbekend. De agent registreert elke aanvraag als opgevolgde melding, wijst ze toe aan de juiste persoon en houdt de volledige historiek bij. Niets wordt vergeten en iedereen kan de status meedelen.",
      },
    },
  },
  {
    slug: "stock-health-alerts",
    function: "operations",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Stock health alerts",
        description:
          "Stock analysis across markets or warehouses is done by hand every month, so issues are spotted late. The agent normalises stock data, compares it with reality and sales, and alerts the commercial team about overstock and shortages. Stock decisions are made on time.",
      },
      fr: {
        name: "Alertes sur l'état des stocks",
        description:
          "L'analyse des stocks par marché ou par entrepôt se fait à la main chaque mois, si bien que les problèmes sont repérés tard. L'agent normalise les données de stock, les confronte à la réalité et aux ventes, et alerte l'équipe commerciale en cas de surstock ou de rupture. Les décisions sur les stocks sont prises à temps.",
      },
      nl: {
        name: "Meldingen over de gezondheid van de voorraad",
        description:
          "Voorraadanalyses over markten of magazijnen heen gebeuren elke maand met de hand, waardoor problemen laat opvallen. De agent normaliseert de voorraadgegevens, vergelijkt ze met de werkelijkheid en de verkoop en verwittigt het commerciële team bij overstock en tekorten. Beslissingen over voorraad vallen op tijd.",
      },
    },
  },
  {
    slug: "supplier-contract-terms-database",
    function: "operations",
    sectors: ["retail", "industry"],
    tools: ["SharePoint"],
    copy: {
      en: {
        name: "Supplier and carrier contract database",
        description:
          "Prices, surcharges and conditions are buried in contract PDFs, so comparing suppliers or carriers is slow. The agent extracts the key terms from every contract into a structured comparison table. Purchasing and logistics compare conditions in minutes.",
      },
      fr: {
        name: "Base des contrats fournisseurs et transporteurs",
        description:
          "Prix, surcharges et conditions sont enfouis dans des contrats en PDF, si bien que comparer fournisseurs ou transporteurs prend du temps. L'agent extrait les conditions clés de chaque contrat dans un tableau comparatif structuré. Achats et logistique comparent les conditions en quelques minutes.",
      },
      nl: {
        name: "Databank van contracten met leveranciers en vervoerders",
        description:
          "Prijzen, toeslagen en voorwaarden zitten verstopt in contracten in PDF, waardoor leveranciers of vervoerders vergelijken traag gaat. De agent haalt de kernvoorwaarden uit elk contract en zet ze in een gestructureerde vergelijkingstabel. Aankoop en logistiek vergelijken voorwaarden in enkele minuten.",
      },
    },
  },
  {
    slug: "supplier-dispute-resolver",
    function: "operations",
    sectors: ["retail", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Supplier dispute resolver",
        description:
          "Disputes with suppliers require reviewing contracts, orders, receipts and history before proposing a solution. The agent gathers the facts, analyses the dispute and drafts a resolution proposal and supplier report. Disputes are settled faster with a documented position.",
      },
      fr: {
        name: "Résolution des litiges fournisseurs",
        description:
          "Les litiges avec les fournisseurs exigent d'examiner contrats, commandes, réceptions et historique avant de proposer une solution. L'agent rassemble les faits, analyse le litige et rédige une proposition de résolution ainsi qu'un rapport fournisseur. Les litiges se règlent plus vite, sur une position documentée.",
      },
      nl: {
        name: "Oplossen van geschillen met leveranciers",
        description:
          "Geschillen met leveranciers vragen dat contracten, bestellingen, ontvangsten en historiek nagekeken worden voor een oplossing kan worden voorgesteld. De agent verzamelt de feiten, analyseert het geschil en stelt een oplossingsvoorstel en een leveranciersrapport op. Geschillen worden sneller geregeld met een gedocumenteerd standpunt.",
      },
    },
  },
  {
    slug: "supplier-quality-review-check",
    function: "operations",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Supplier quality review check",
        description:
          "Selected hotels or providers can lose quality between booking and delivery. The agent checks recent public reviews before each service date and flags providers that no longer meet your standards. Customers keep receiving the expected quality.",
      },
      fr: {
        name: "Contrôle qualité des prestataires par les avis",
        description:
          "Les hôtels ou prestataires sélectionnés peuvent perdre en qualité entre la réservation et la prestation. L'agent consulte les avis publics récents avant chaque date de prestation et signale les prestataires qui ne répondent plus à vos exigences. Vos clients continuent de bénéficier de la qualité attendue.",
      },
      nl: {
        name: "Kwaliteitscontrole van leveranciers via reviews",
        description:
          "Geselecteerde hotels of dienstverleners kunnen aan kwaliteit inboeten tussen de boeking en de uitvoering. De agent controleert recente publieke reviews voor elke dienstdatum en signaleert leveranciers die niet langer aan uw normen voldoen. Klanten blijven de verwachte kwaliteit krijgen.",
      },
    },
  },
  {
    slug: "system-alert-router",
    function: "operations",
    sectors: ["professional-services", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "System notification router",
        description:
          "Automated notifications from business systems land in a shared mailbox and wait until someone notices them. The agent reads each notification, works out what it concerns and forwards it to the person who must act. Time-sensitive alerts are handled quickly instead of getting lost.",
      },
      fr: {
        name: "Aiguillage des notifications système",
        description:
          "Les notifications automatiques des outils métier arrivent dans une boîte partagée et attendent que quelqu'un les remarque. L'agent lit chaque notification, détermine ce qu'elle concerne et la transmet à la personne qui doit agir. Les alertes urgentes sont traitées rapidement au lieu de se perdre.",
      },
      nl: {
        name: "Doorsturen van systeemmeldingen",
        description:
          "Automatische meldingen van bedrijfssystemen komen in een gedeelde mailbox terecht en blijven liggen tot iemand ze opmerkt. De agent leest elke melding, bepaalt waarover ze gaat en stuurt ze door naar de persoon die moet handelen. Dringende meldingen worden snel behandeld in plaats van verloren te gaan.",
      },
    },
  },
  {
    slug: "toolbox-talk-generator",
    function: "operations",
    sectors: ["construction"],
    tools: [],
    copy: {
      en: {
        name: "Toolbox talk and risk sheet generator",
        description:
          "Safety briefings and workstation risk sheets must match each day's tasks, materials and team. The agent generates the toolbox talk and risk sheets from the planned work. Briefings are relevant and always ready.",
      },
      fr: {
        name: "Générateur de quarts d'heure sécurité et fiches de risques",
        description:
          "Les causeries sécurité et les fiches de risques au poste de travail doivent correspondre aux tâches, aux matériaux et à l'équipe de chaque jour. L'agent génère le quart d'heure sécurité et les fiches de risques à partir des travaux prévus. Les points sécurité sont pertinents et toujours prêts.",
      },
      nl: {
        name: "Generator van toolboxmeetings en risicofiches",
        description:
          "Veiligheidsbriefings en werkpostfiches moeten afgestemd zijn op de taken, materialen en ploeg van de dag. De agent genereert de toolboxmeeting en de risicofiches op basis van het geplande werk. Briefings zijn relevant en altijd klaar.",
      },
    },
  },
  {
    slug: "training-video-indexer",
    function: "operations",
    sectors: ["professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Training video indexer",
        description:
          "Recorded trainings are long and nobody can find the moment where a topic is explained. The agent transcribes each video, splits it into topics and makes it searchable by keyword or concept with direct links to the right timestamp. Users find the answer in seconds instead of rewatching whole sessions.",
      },
      fr: {
        name: "Indexation des vidéos de formation",
        description:
          "Les formations enregistrées sont longues et personne ne retrouve le moment où un sujet est expliqué. L'agent transcrit chaque vidéo, la découpe par thème et la rend consultable par mot-clé ou par notion, avec un lien direct vers le bon passage. Les utilisateurs trouvent la réponse en quelques secondes au lieu de revoir des sessions entières.",
      },
      nl: {
        name: "Indexering van opleidingsvideo's",
        description:
          "Opgenomen opleidingen zijn lang en niemand vindt het moment terug waarop een onderwerp uitgelegd wordt. De agent transcribeert elke video, deelt ze op per onderwerp en maakt ze doorzoekbaar op trefwoord of begrip, met rechtstreekse links naar het juiste tijdstip. Gebruikers vinden het antwoord in enkele seconden in plaats van volledige sessies te herbekijken.",
      },
    },
  },
  {
    slug: "vacant-property-monitor",
    function: "operations",
    sectors: ["public"],
    tools: [],
    copy: {
      en: {
        name: "Vacant property monitor",
        description:
          "Identifying and following up vacant properties requires cross-checking registers in spreadsheets. The agent detects likely vacant properties from register data, prioritises them and tracks follow-up. Local authorities act faster on vacancy.",
      },
      fr: {
        name: "Suivi des logements et biens vacants",
        description:
          "Identifier et suivre les biens vacants oblige à croiser des registres dans des tableurs. L'agent repère les biens probablement vacants à partir des données des registres, les priorise et suit les actions engagées. Les collectivités agissent plus vite contre la vacance.",
      },
      nl: {
        name: "Opvolging van leegstaande panden",
        description:
          "Leegstaande panden opsporen en opvolgen vraagt registers kruisen in rekenbladen. De agent detecteert waarschijnlijk leegstaande panden op basis van registergegevens, prioriteert ze en volgt de opvolging bij. Lokale besturen pakken leegstand sneller aan.",
      },
    },
  },
];
