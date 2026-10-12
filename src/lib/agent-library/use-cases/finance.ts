import type { LibraryUseCase } from "../types";

export const FINANCE_USE_CASES: LibraryUseCase[] = [
  {
    slug: "receivables-file-payment-tracker",
    function: "finance",
    sectors: ["professional-services", "finance"],
    tools: [],
    copy: {
      en: {
        name: "Receivables file payment tracker",
        description:
          "Payments and instalment plans on open receivables are tracked by hand, so balances and next steps lag behind. The agent registers incoming payments, updates the remaining balance and schedule, flags missed instalments and drafts the client update. Every file stays current without manual recalculation.",
      },
      fr: {
        name: "Suivi des paiements sur dossiers de créances",
        description:
          "Les paiements et les échéanciers des créances ouvertes sont suivis à la main, si bien que soldes et prochaines étapes sont toujours en retard. L'agent enregistre les paiements reçus, met à jour le solde restant et l'échéancier, signale les échéances impayées et rédige le point à envoyer au client. Chaque dossier reste à jour sans recalcul manuel.",
      },
      nl: {
        name: "Opvolging van betalingen op openstaande dossiers",
        description:
          "Betalingen en afbetalingsplannen op openstaande vorderingen worden met de hand opgevolgd, waardoor saldi en volgende stappen achterlopen. De agent registreert binnenkomende betalingen, werkt het resterende saldo en de planning bij, signaleert gemiste afbetalingen en stelt de update voor de klant op. Elk dossier blijft actueel zonder handmatig herberekenen.",
      },
    },
  },
  {
    slug: "billable-items-to-invoice",
    function: "finance",
    sectors: ["professional-services", "construction", "finance"],
    tools: ["Odoo ERP"],
    copy: {
      en: {
        name: "Billable items to invoice",
        description:
          "Billable work is spread across work orders, delivery notes, messages and case milestones, so invoicing is slow and items get missed. The agent detects billable events, links them to the right customer and invoice line, and prepares invoices for approval. Billing is faster and complete.",
      },
      fr: {
        name: "Des prestations facturables aux factures",
        description:
          "Les prestations facturables sont dispersées entre bons d'intervention, bons de livraison, messages et étapes de dossier : la facturation est lente et des éléments passent à la trappe. L'agent repère les événements facturables, les rattache au bon client et à la bonne ligne de facture, et prépare les factures pour validation. La facturation est plus rapide et complète.",
      },
      nl: {
        name: "Van factureerbare prestaties naar factuur",
        description:
          "Factureerbaar werk zit verspreid over werkbonnen, leveringsbonnen, berichten en mijlpalen in dossiers, waardoor facturatie traag verloopt en posten vergeten worden. De agent detecteert factureerbare prestaties, koppelt ze aan de juiste klant en factuurlijn en bereidt facturen voor ter goedkeuring. De facturatie gaat sneller en is volledig.",
      },
    },
  },
  {
    slug: "kpi-anomaly-alerts",
    function: "finance",
    sectors: ["professional-services", "retail", "industry"],
    tools: [],
    copy: {
      en: {
        name: "KPI anomaly alerts",
        description:
          "Deviations in revenue, average ticket or key indicators are only spotted at month end. The agent watches the main KPIs across sites or units, detects unusual movements and explains the likely cause. Managers react while there is still time to correct.",
      },
      fr: {
        name: "Alertes sur les indicateurs clés (KPI)",
        description:
          "Les écarts de chiffre d'affaires, de panier moyen ou d'indicateurs clés ne sont repérés qu'en fin de mois. L'agent surveille les principaux indicateurs clés de performance (KPI) par site ou par entité, détecte les variations inhabituelles et en explique la cause probable. Les responsables réagissent quand il est encore temps de corriger.",
      },
      nl: {
        name: "Meldingen bij afwijkende KPI's",
        description:
          "Afwijkingen in omzet, gemiddeld ticket of kernindicatoren worden pas op het einde van de maand opgemerkt. De agent bewaakt de belangrijkste KPI's per vestiging of afdeling, detecteert ongewone bewegingen en verklaart de waarschijnlijke oorzaak. Managers grijpen in wanneer er nog tijd is om bij te sturen.",
      },
    },
  },
  {
    slug: "multi-site-performance-benchmark",
    function: "finance",
    sectors: ["professional-services", "public", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Multi-site performance benchmark",
        description:
          "Comparing sites, branches or regions on costs, staffing and returns means building ad hoc spreadsheets each time. The agent benchmarks units on key ratios such as staffing mix, investment returns and policy outcomes, and explains the main differences. Leaders see which practices to replicate.",
      },
      fr: {
        name: "Comparaison des performances entre sites",
        description:
          "Comparer sites, agences ou régions sur les coûts, les effectifs et la rentabilité oblige à construire à chaque fois des tableurs ad hoc. L'agent compare les entités sur des ratios clés comme la répartition des effectifs, le rendement des investissements ou les résultats des politiques menées, et explique les principaux écarts. Les dirigeants voient quelles pratiques reproduire.",
      },
      nl: {
        name: "Prestatievergelijking tussen vestigingen",
        description:
          "Vestigingen, filialen of regio's vergelijken op kosten, personeel en rendement betekent telkens opnieuw losse rekenbladen opbouwen. De agent vergelijkt eenheden op kernratio's zoals personeelsmix, rendement op investeringen en beleidsresultaten, en verklaart de belangrijkste verschillen. Leidinggevenden zien welke werkwijzen navolging verdienen.",
      },
    },
  },
  {
    slug: "financial-forecast-builder",
    function: "finance",
    sectors: ["industry", "professional-services", "retail"],
    tools: ["Odoo ERP"],
    copy: {
      en: {
        name: "Financial forecast builder",
        description:
          "Forecasts are rebuilt in spreadsheets every period from accounting exports and stock and sales data. The agent consolidates the data, updates the forecast and highlights trends and changes in assumptions. Management gets an up-to-date outlook without manual rework.",
      },
      fr: {
        name: "Élaboration des prévisions financières",
        description:
          "Les prévisions sont refaites sur tableur à chaque période à partir des exports comptables et des données de stock et de ventes. L'agent consolide les données, met à jour les prévisions et met en évidence les tendances et les changements d'hypothèses. La direction dispose d'une vision à jour sans retraitement manuel.",
      },
      nl: {
        name: "Opbouw van financiële prognoses",
        description:
          "Prognoses worden elke periode opnieuw opgebouwd in rekenbladen op basis van boekhoudexports en voorraad- en verkoopgegevens. De agent consolideert de gegevens, werkt de prognose bij en brengt trends en gewijzigde aannames in beeld. Het management krijgt een actueel vooruitzicht zonder handmatig herwerk.",
      },
    },
  },
  {
    slug: "financial-statement-normaliser",
    function: "finance",
    sectors: ["finance", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Financial statement normaliser",
        description:
          "Balance sheets and income statements arrive as PDFs and spreadsheets in different formats and charts of accounts. The agent converts them into one standard structure, maps accounts consistently and flags coding inconsistencies. Analysts compare entities on a clean, uniform basis.",
      },
      fr: {
        name: "Normalisation des états financiers",
        description:
          "Bilans et comptes de résultat arrivent en PDF ou en tableur, dans des formats et des plans comptables différents. L'agent les convertit dans une structure standard unique, aligne les comptes de façon cohérente et signale les incohérences d'imputation. Les analystes comparent les entités sur une base propre et homogène.",
      },
      nl: {
        name: "Normalisatie van jaarrekeningen",
        description:
          "Balansen en resultatenrekeningen komen binnen als PDF's en rekenbladen in verschillende formaten en rekeningstelsels. De agent zet ze om naar één standaardstructuur, koppelt rekeningen consequent en signaleert inconsistenties in de codering. Analisten vergelijken entiteiten op een zuivere, eenvormige basis.",
      },
    },
  },
  {
    slug: "periodic-management-report",
    function: "finance",
    sectors: ["professional-services", "industry", "retail"],
    tools: ["Odoo ERP"],
    copy: {
      en: {
        name: "Periodic management report",
        description:
          "Each quarter, finance compiles revenue, staff costs and margins per site or business unit into reports by hand. The agent collects the data, produces the report per entity with commentary and recommendations, and sends it to managers. Reports are on time and consistent.",
      },
      fr: {
        name: "Rapport de gestion périodique",
        description:
          "Chaque trimestre, la direction financière compile à la main le chiffre d'affaires, la masse salariale et les marges par site ou par activité. L'agent collecte les données, produit le rapport par entité avec commentaires et recommandations, et l'envoie aux responsables. Les rapports sont livrés à temps et homogènes.",
      },
      nl: {
        name: "Periodiek managementrapport",
        description:
          "Elk kwartaal brengt finance omzet, personeelskosten en marges per vestiging of bedrijfsonderdeel met de hand samen in rapporten. De agent verzamelt de gegevens, maakt het rapport per entiteit met commentaar en aanbevelingen en bezorgt het aan de verantwoordelijken. Rapporten zijn op tijd klaar en consistent.",
      },
    },
  },
  {
    slug: "stock-data-reconciliation",
    function: "finance",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Stock data reconciliation across systems",
        description:
          "Stock quantities and values differ between systems and reports, and checking them is manual. The agent compares the sources, explains the discrepancies and notifies accounting when thresholds are exceeded. Stock figures can be trusted at closing.",
      },
      fr: {
        name: "Rapprochement des données de stock entre outils",
        description:
          "Les quantités et valeurs de stock diffèrent d'un outil et d'un rapport à l'autre, et leur vérification est manuelle. L'agent compare les sources, explique les écarts et prévient la comptabilité en cas de dépassement des seuils. Les chiffres de stock sont fiables à la clôture.",
      },
      nl: {
        name: "Afstemming van voorraadgegevens tussen systemen",
        description:
          "Voorraadhoeveelheden en waarden verschillen tussen systemen en rapporten, en de controle gebeurt met de hand. De agent vergelijkt de bronnen, verklaart de verschillen en verwittigt de boekhouding wanneer drempels overschreden worden. Bij de afsluiting zijn de voorraadcijfers betrouwbaar.",
      },
    },
  },
  {
    slug: "supplier-invoice-capture-coding",
    function: "finance",
    sectors: ["professional-services", "industry", "construction"],
    tools: ["Odoo ERP"],
    copy: {
      en: {
        name: "Supplier invoice capture and coding",
        description:
          "Supplier invoices are read and keyed in by hand, and each line must be coded to the right account or cost centre. The agent reads incoming invoices, recognises the supplier and category, proposes the account and cost centre, and prepares the entry for posting. Accounting keys in less and codes more consistently.",
      },
      fr: {
        name: "Saisie et imputation des factures fournisseurs",
        description:
          "Les factures fournisseurs sont lues et saisies à la main, et chaque ligne doit être imputée au bon compte ou au bon centre de coûts. L'agent lit les factures reçues, reconnaît le fournisseur et la catégorie, propose le compte et le centre de coûts, et prépare l'écriture à comptabiliser. La comptabilité saisit moins et impute de façon plus homogène.",
      },
      nl: {
        name: "Inlezen en boeken van aankoopfacturen",
        description:
          "Aankoopfacturen worden met de hand gelezen en ingevoerd, en elke lijn moet aan de juiste rekening of kostenplaats gekoppeld worden. De agent leest binnenkomende facturen, herkent leverancier en categorie, stelt rekening en kostenplaats voor en bereidt de boeking voor. De boekhouding tikt minder in en boekt consequenter.",
      },
    },
  },
  {
    slug: "valuation-and-target-scoring",
    function: "finance",
    sectors: ["finance", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Valuation and acquisition target scoring",
        description:
          "Preparing a valuation or scoring an acquisition target starts with hours of data preparation. The agent reads the financial documents, normalises the figures, adds operational indicators and prepares a baseline valuation, forecast and score. Analysts spend their time on judgement and negotiation.",
      },
      fr: {
        name: "Valorisation et notation de cibles d'acquisition",
        description:
          "Préparer une valorisation ou évaluer une cible d'acquisition commence par des heures de préparation des données. L'agent lit les documents financiers, normalise les chiffres, ajoute des indicateurs opérationnels et prépare une valorisation de référence, des prévisions et une note. Les analystes consacrent leur temps au jugement et à la négociation.",
      },
      nl: {
        name: "Waardering en scoring van overnamekandidaten",
        description:
          "Een waardering voorbereiden of een overnamekandidaat scoren begint met uren datavoorbereiding. De agent leest de financiële documenten, normaliseert de cijfers, voegt operationele indicatoren toe en bereidt een basiswaardering, prognose en score voor. Analisten besteden hun tijd aan inschatting en onderhandeling.",
      },
    },
  },
  {
    slug: "billing-run-checker",
    function: "finance",
    sectors: ["professional-services", "finance"],
    tools: [],
    copy: {
      en: {
        name: "Billing run checker",
        description:
          "Before invoices go out, test runs must be checked line by line against billing rules. The agent checks each draft invoice against your rules and flags anomalies before sending. Fewer wrong invoices reach customers.",
      },
      fr: {
        name: "Contrôle des campagnes de facturation",
        description:
          "Avant l'envoi des factures, les tests de facturation doivent être vérifiés ligne par ligne au regard des règles de facturation. L'agent contrôle chaque facture en brouillon selon vos règles et signale les anomalies avant l'envoi. Moins de factures erronées parviennent aux clients.",
      },
      nl: {
        name: "Controle van facturatierondes",
        description:
          "Voor facturen vertrekken, moeten testrondes lijn per lijn gecontroleerd worden aan de hand van de facturatieregels. De agent toetst elke conceptfactuur aan uw regels en signaleert afwijkingen voor verzending. Minder foute facturen bereiken de klant.",
      },
    },
  },
  {
    slug: "failed-direct-debit-follow-up",
    function: "finance",
    sectors: ["professional-services", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Failed direct debit follow-up",
        description:
          "Rejected direct debits arrive as a list from the bank and each customer must be contacted by hand. The agent processes the rejection list, updates the customer records and sends a personalised payment request. Failed payments are recovered faster with no manual follow-up.",
      },
      fr: {
        name: "Suivi des prélèvements rejetés",
        description:
          "Les prélèvements rejetés arrivent sous forme de liste envoyée par la banque, et chaque client doit être contacté à la main. L'agent traite la liste des rejets, met à jour les fiches clients et envoie une demande de paiement personnalisée. Les impayés sont recouvrés plus vite, sans relance manuelle.",
      },
      nl: {
        name: "Opvolging van mislukte domiciliëringen",
        description:
          "Geweigerde domiciliëringen komen als lijst van de bank en elke klant moet met de hand gecontacteerd worden. De agent verwerkt de lijst met weigeringen, werkt de klantgegevens bij en verstuurt een gepersonaliseerd betalingsverzoek. Mislukte betalingen worden sneller gerecupereerd zonder handmatige opvolging.",
      },
    },
  },
  {
    slug: "financial-storytelling-presenter",
    function: "finance",
    sectors: ["finance", "industry", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Financial results storyteller",
        description:
          "Shareholders and external partners struggle to understand raw financial tables. The agent turns the figures into a clear narrative and presentation with the key messages and supporting charts. Stakeholders understand performance and decisions faster.",
      },
      fr: {
        name: "Mise en récit des résultats financiers",
        description:
          "Actionnaires et partenaires externes peinent à comprendre des tableaux financiers bruts. L'agent transforme les chiffres en récit clair et en présentation, avec les messages clés et les graphiques à l'appui. Les parties prenantes comprennent plus vite la performance et les décisions.",
      },
      nl: {
        name: "Financiële resultaten helder verteld",
        description:
          "Aandeelhouders en externe partners hebben moeite om ruwe financiële tabellen te begrijpen. De agent zet de cijfers om in een helder verhaal en een presentatie met de kernboodschappen en ondersteunende grafieken. Stakeholders begrijpen prestaties en beslissingen sneller.",
      },
    },
  },
  {
    slug: "freight-invoice-audit",
    function: "finance",
    sectors: ["industry", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Freight invoice audit",
        description:
          "Transport invoices often combine several shipments, and checking rates and surcharges by hand is error-prone. The agent matches each invoice line to the shipment and the agreed rates and flags overcharges. You pay only what was agreed.",
      },
      fr: {
        name: "Contrôle des factures de transport",
        description:
          "Les factures de transport regroupent souvent plusieurs expéditions, et vérifier tarifs et surcharges à la main est source d'erreurs. L'agent rapproche chaque ligne de facture de l'expédition et des tarifs convenus, et signale les surfacturations. Vous ne payez que ce qui a été convenu.",
      },
      nl: {
        name: "Controle van transportfacturen",
        description:
          "Transportfacturen bundelen vaak meerdere zendingen, en tarieven en toeslagen met de hand controleren is foutgevoelig. De agent koppelt elke factuurlijn aan de zending en de afgesproken tarieven en signaleert te hoge aanrekeningen. U betaalt enkel wat afgesproken is.",
      },
    },
  },
  {
    slug: "funding-call-watch",
    function: "finance",
    sectors: ["public", "professional-services"],
    tools: [],
    copy: {
      en: {
        name: "Funding call watch",
        description:
          "Grants and calls for projects appear on many sites with tight deadlines. The agent monitors funding programmes, matches calls to your projects and sends an alert with the key criteria and dates. You apply to more relevant calls on time.",
      },
      fr: {
        name: "Veille des appels à projets et subventions",
        description:
          "Subventions et appels à projets sont publiés sur de nombreux sites, avec des délais serrés. L'agent surveille les programmes de financement, rapproche les appels de vos projets et envoie une alerte avec les critères et dates clés. Vous répondez à temps à davantage d'appels pertinents.",
      },
      nl: {
        name: "Opvolging van subsidieoproepen",
        description:
          "Subsidies en projectoproepen verschijnen op veel websites, met krappe deadlines. De agent bewaakt financieringsprogramma's, koppelt oproepen aan uw projecten en stuurt een melding met de belangrijkste criteria en data. U dient op tijd in voor meer relevante oproepen.",
      },
    },
  },
  {
    slug: "invoice-approval-router",
    function: "finance",
    sectors: ["construction", "industry"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Invoice approval router",
        description:
          "Incoming invoices are printed and passed around for approval, and nobody knows where one is stuck. The agent sends each invoice to the right approver, follows up on pending approvals and passes approved invoices to accounting. Invoices are approved on time and the status is always clear.",
      },
      fr: {
        name: "Circuit de validation des factures",
        description:
          "Les factures reçues sont imprimées et circulent de main en main pour validation, et personne ne sait où l'une d'elles est bloquée. L'agent envoie chaque facture au bon valideur, relance les validations en attente et transmet les factures approuvées à la comptabilité. Les factures sont validées à temps et leur statut est toujours clair.",
      },
      nl: {
        name: "Goedkeuringsflow voor facturen",
        description:
          "Binnenkomende facturen worden afgedrukt en doorgegeven ter goedkeuring, en niemand weet waar er één blijft hangen. De agent stuurt elke factuur naar de juiste goedkeurder, volgt openstaande goedkeuringen op en bezorgt goedgekeurde facturen aan de boekhouding. Facturen worden op tijd goedgekeurd en de status is altijd duidelijk.",
      },
    },
  },
  {
    slug: "payment-confirmation-sender",
    function: "finance",
    sectors: ["professional-services", "retail"],
    tools: ["Outlook"],
    copy: {
      en: {
        name: "Payment confirmation sender",
        description:
          "Customers expect a confirmation when their payment is received, but sending it by hand is low-value work. The agent detects received payments and sends a personalised thank-you confirmation. Customers are reassured and finance saves time.",
      },
      fr: {
        name: "Envoi des confirmations de paiement",
        description:
          "Les clients attendent une confirmation à réception de leur paiement, mais l'envoyer à la main est une tâche à faible valeur. L'agent repère les paiements reçus et envoie une confirmation de remerciement personnalisée. Les clients sont rassurés et la direction financière gagne du temps.",
      },
      nl: {
        name: "Versturen van betalingsbevestigingen",
        description:
          "Klanten verwachten een bevestiging wanneer hun betaling ontvangen is, maar die met de hand versturen levert weinig op. De agent detecteert ontvangen betalingen en verstuurt een gepersonaliseerde bevestiging met dankwoord. Klanten zijn gerustgesteld en finance wint tijd.",
      },
    },
  },
  {
    slug: "regulator-inquiry-responder",
    function: "finance",
    sectors: ["finance", "industry"],
    tools: [],
    copy: {
      en: {
        name: "Regulator inquiry response preparer",
        description:
          "Supervisory authorities ask for explanations and figures on specific transactions with short deadlines. The agent gathers the supporting documents and figures and drafts a structured answer for review. Responses are complete and delivered on time.",
      },
      fr: {
        name: "Préparation des réponses aux autorités de contrôle",
        description:
          "Les autorités de contrôle demandent des explications et des chiffres sur des opérations précises, dans des délais courts. L'agent rassemble les pièces justificatives et les chiffres, et rédige une réponse structurée à relire. Les réponses sont complètes et remises à temps.",
      },
      nl: {
        name: "Voorbereiding van antwoorden aan toezichthouders",
        description:
          "Toezichthoudende overheden vragen binnen korte termijnen uitleg en cijfers over specifieke transacties. De agent verzamelt de bewijsstukken en cijfers en stelt een gestructureerd antwoord op ter nalezing. Antwoorden zijn volledig en op tijd.",
      },
    },
  },
  {
    slug: "revenue-leakage-detector",
    function: "finance",
    sectors: ["professional-services", "retail"],
    tools: [],
    copy: {
      en: {
        name: "Revenue leakage detector",
        description:
          "Services delivered but not billed, or incomplete bundles, quietly reduce revenue. The agent compares delivered services with invoices, flags missing items and estimates their impact. Revenue that was being lost is recovered.",
      },
      fr: {
        name: "Détection des pertes de chiffre d'affaires",
        description:
          "Des prestations réalisées mais non facturées, ou des offres groupées incomplètes, grèvent discrètement le chiffre d'affaires. L'agent compare les prestations réalisées aux factures, signale les éléments manquants et estime leur impact. Le chiffre d'affaires qui vous échappait est récupéré.",
      },
      nl: {
        name: "Detectie van omzetlekken",
        description:
          "Diensten die geleverd maar niet gefactureerd zijn, of onvolledige pakketten, doen de omzet ongemerkt dalen. De agent vergelijkt geleverde diensten met facturen, signaleert ontbrekende posten en raamt hun impact. Omzet die verloren ging, wordt teruggewonnen.",
      },
    },
  },
];
