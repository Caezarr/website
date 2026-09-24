export interface FrenchComparison {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  summary: string;
  competitorFit: string;
  wonkaFit: string;
  differences: { criterion: string; competitor: string; wonka: string }[];
  pilot: { title: string; body: string }[];
  questions: { question: string; answer: string }[];
  sources: { label: string; url: string; note: string }[];
  reviewedAt: string;
}

export const FRENCH_COMPARISONS: FrenchComparison[] = [
  {
    slug: "wonka-ai-vs-chatgpt-enterprise",
    competitor: "ChatGPT",
    title: "Alternative ChatGPT entreprise : Wonka ou OpenAI ?",
    description:
      "Comparez Wonka et ChatGPT pour votre entreprise : modèles, intégrations ERP, gouvernance, accompagnement et méthode de test sur vos cas d'usage.",
    reviewedAt: "2026-09-24",
    summary:
      "Une alternative à ChatGPT en entreprise se choisit sur le travail à accomplir. Si vos équipes veulent surtout un assistant, évaluez l'offre professionnelle d'OpenAI. Si votre projet inclut les outils métier, plusieurs fournisseurs de modèles et un déploiement accompagné, évaluez aussi Wonka.",
    competitorFit:
      "Évaluez ChatGPT Business ou Enterprise lorsque vous souhaitez standardiser l'accès à ChatGPT. Distinguez ces offres des comptes personnels : le contrat, les contrôles et le traitement des données doivent être examinés pour l'offre exacte que vous achetez.",
    wonkaFit:
      "Évaluez Wonka lorsque votre besoin commence par un processus : retrouver une information dans SharePoint, exploiter un dossier Odoo, puis préparer une action à faire valider. Le choix du modèle est une partie du projet ; la connexion aux données, les droits et l'adoption en sont d'autres.",
    differences: [
      {
        criterion: "Point de départ",
        competitor:
          "L'offre ChatGPT adaptée à la taille et aux exigences de votre organisation.",
        wonka:
          "Un espace de travail multi-modèles associé aux intégrations et aux services Wonka.",
      },
      {
        criterion: "ERP et documents",
        competitor:
          "Faire démontrer les applications et les actions disponibles dans l'offre retenue.",
        wonka:
          "Évaluer la connexion Odoo et l'accès aux documents sur un périmètre métier précis.",
      },
      {
        criterion: "Déploiement",
        competitor:
          "Définir ce que votre équipe interne ou votre partenaire prend en charge.",
        wonka:
          "Associer le workspace à Start AI ou à un développement spécifique selon le besoin.",
      },
      {
        criterion: "Données et contrat",
        competitor:
          "Demander les conditions Business ou Enterprise : conservation, entraînement, résidence et sous-traitants.",
        wonka:
          "Vérifier le périmètre d'hébergement européen, les modèles choisis et les flux de chaque intégration.",
      },
    ],
    pilot: [
      {
        title: "Une réponse à partir d'un dossier client",
        body: "Fournissez les mêmes documents aux deux solutions. Vérifiez les sources, les omissions et le comportement lorsque le dossier ne contient pas la réponse.",
      },
      {
        title: "Un passage du document à l'ERP",
        body: "Demandez de préparer une mise à jour Odoo depuis un échange client. Notez ce qui est natif, ce qui exige une intégration et ce qui nécessite une validation humaine.",
      },
      {
        title: "Un compte sans autorisation",
        body: "Rejouez la recherche avec un collaborateur qui ne doit pas accéder au dossier. Le test doit porter sur les permissions réelles, pas seulement sur la qualité de rédaction.",
      },
    ],
    questions: [
      {
        question: "Wonka remplace-t-il obligatoirement ChatGPT ?",
        answer:
          "Non. Vous pouvez garder une offre ChatGPT pour certains usages et évaluer Wonka pour les workflows connectés. Comparez le coût et la complexité d'une coexistence avec ceux d'un outil unique.",
      },
      {
        question:
          "Faut-il comparer Wonka à ChatGPT personnel ou à ChatGPT Enterprise ?",
        answer:
          "À l'offre professionnelle réellement envisagée. Comparer un outil d'entreprise à un compte personnel sur la sécurité ou l'administration produirait une conclusion trompeuse.",
      },
      {
        question: "Comment comparer le prix de ChatGPT et de Wonka ?",
        answer:
          "Additionnez licences, consommation éventuelle, intégration, formation et temps d'administration pour le même nombre d'utilisateurs. Consultez les tarifs en vigueur et demandez un devis lorsque le périmètre est spécifique.",
      },
    ],
    sources: [
      {
        label: "OpenAI — offres ChatGPT",
        url: "https://openai.com/business/chatgpt-pricing/",
        note: "Conditions et tarifs à vérifier directement auprès d’OpenAI pour l’offre retenue. Aucun tarif ni inventaire de fonctions OpenAI n’est reproduit ici.",
      },
      {
        label: "OpenAI — confidentialité entreprise",
        url: "https://openai.com/enterprise-privacy/",
        note: "Référence contractuelle à consulter pour l’offre retenue.",
      },
    ],
  },
  {
    slug: "claude",
    competitor: "Claude",
    title: "Alternative Claude entreprise : comparez Wonka et Anthropic",
    description:
      "Wonka ou Claude pour votre entreprise ? Comparez l'écosystème Anthropic, le choix des modèles, les intégrations métier et l'accompagnement en France.",
    reviewedAt: "2026-09-24",
    summary:
      "Claude et Wonka répondent à des besoins qui peuvent se recouper. Claude propose un environnement centré sur l'écosystème Anthropic. Wonka propose un espace multi-modèles et un accompagnement pour connecter l'IA aux processus de votre entreprise. Le bon choix dépend du workflow à livrer.",
    competitorFit:
      "Claude mérite un test si votre organisation veut travailler dans l'écosystème Anthropic. Sa page entreprise présente Claude, Claude Code et une plateforme pour construire des applications et des agents. Évaluez séparément l'abonnement utilisateur et l'usage de l'API.",
    wonkaFit:
      "Wonka mérite un test si vous souhaitez choisir différents modèles selon les tâches, relier les données métier à un espace partagé et vous faire accompagner dans le déploiement. Vérifiez les modèles effectivement disponibles et leurs conditions de traitement des données au moment du pilote.",
    differences: [
      {
        criterion: "Écosystème",
        competitor:
          "Claude, Claude Code et Claude Platform dans l'écosystème Anthropic.",
        wonka:
          "Espace multi-modèles : choix à valider selon la tâche et les exigences de données.",
      },
      {
        criterion: "Construction d'agents",
        competitor:
          "Plateforme et outils de développement proposés par Anthropic.",
        wonka:
          "Agents liés aux outils métier, avec accompagnement ou développement spécifique selon le projet.",
      },
      {
        criterion: "Projet métier",
        competitor:
          "Évaluer les connecteurs et le travail de configuration nécessaires à votre cas d'usage.",
        wonka:
          "Partir d'un processus Odoo, documentaire ou opérationnel et définir le périmètre avec l'équipe Wonka.",
      },
      {
        criterion: "Budget",
        competitor:
          "Distinguer abonnements, usage de l'API et travail de mise en œuvre.",
        wonka:
          "Distinguer workspace, consommation, intégrations et services d'accompagnement.",
      },
    ],
    pilot: [
      {
        title: "Analyser un dossier documentaire",
        body: "Choisissez un contrat et ses annexes. Demandez une synthèse avec sources, puis une liste des informations manquantes. Faites relire le résultat par le métier concerné.",
      },
      {
        title: "Réutiliser le résultat dans un outil métier",
        body: "Demandez ensuite de préparer une action dans votre ERP ou CRM. Mesurez l'effort d'intégration, les contrôles et le nombre de manipulations humaines restantes.",
      },
      {
        title: "Changer de modèle sur la même tâche",
        body: "Si la flexibilité est importante, comparez la qualité, le coût et les contraintes de données de plusieurs modèles. Ne choisissez pas uniquement à partir d'un classement généraliste.",
      },
    ],
    questions: [
      {
        question: "Claude est-il seulement un chatbot ?",
        answer:
          "Non. La page entreprise d'Anthropic présente aussi Claude Code et une plateforme pour construire des applications et agents. Le périmètre dépend du produit et du contrat choisis.",
      },
      {
        question: "Une entreprise française peut-elle choisir Claude ?",
        answer:
          "La nationalité de l'entreprise cliente ne décide pas à elle seule du choix. Faites examiner le contrat, les flux de données, les sous-traitants, les accès et les besoins métier pour l'offre envisagée.",
      },
      {
        question: "Pourquoi évaluer une alternative multi-modèles à Claude ?",
        answer:
          "Pour tester différents fournisseurs sur vos tâches et garder une marge de choix. Cette flexibilité ne remplace pas la vérification de la qualité, du coût et des conditions de données de chaque modèle.",
      },
    ],
    sources: [
      {
        label: "Anthropic — Claude pour les entreprises",
        url: "https://claude.com/solutions/enterprise",
        note: "Consulté le 24 septembre 2026 : produits Claude, Claude Code et Claude Platform. Les capacités varient selon le produit et l'offre.",
      },
    ],
  },
  {
    slug: "dust",
    competitor: "Dust",
    title: "Alternative Dust AI : Wonka ou Dust pour votre entreprise ?",
    description:
      "Comparez Dust et Wonka pour vos agents IA : modèles, données, intégrations Odoo et SharePoint, gouvernance et déploiement auprès de vos équipes.",
    reviewedAt: "2026-09-24",
    summary:
      "Dust et Wonka permettent d'évaluer une IA multi-modèles connectée aux connaissances de l'entreprise. Pour choisir une alternative à Dust, comparez un workflow complet : les données accessibles, les actions réalisées, les contrôles et le travail nécessaire pour le déployer.",
    competitorFit:
      "Dust présente des agents partagés, des connecteurs, plusieurs fournisseurs de modèles et des contrôles de gouvernance. Son site décrit également des options de résidence des données aux États-Unis ou dans l'Union européenne. C'est une option à tester si vos équipes veulent construire et faire évoluer leurs agents.",
    wonkaFit:
      "Wonka est à évaluer lorsque vous recherchez à la fois un workspace IA et une équipe pour cadrer puis déployer vos cas d'usage. Si Odoo est central, faites tester le parcours de bout en bout : lecture du dossier, préparation de l'action, validation et résultat dans l'ERP.",
    differences: [
      {
        criterion: "Modèles",
        competitor:
          "Plusieurs fournisseurs de modèles, selon le catalogue Dust.",
        wonka:
          "Plusieurs modèles dans un espace partagé ; disponibilité à vérifier lors du pilote.",
      },
      {
        criterion: "Agents et gouvernance",
        competitor:
          "Agents partagés, permissions sur les données et outils, journaux d'audit annoncés.",
        wonka:
          "Agents métier et contrôle des accès ; définir les étapes qui exigent une validation humaine.",
      },
      {
        criterion: "Résidence des données",
        competitor:
          "Options États-Unis ou UE décrites sur le site ; périmètre à confirmer contractuellement.",
        wonka:
          "Hébergement européen présenté sur la page sécurité ; vérifier les flux de chaque modèle et connecteur.",
      },
      {
        criterion: "Intégration Odoo",
        competitor:
          "Demander une démonstration du connecteur ou de l'intégration spécifique applicable à votre version.",
        wonka:
          "Offre Odoo dédiée : tester les objets, droits et actions nécessaires à votre processus.",
      },
    ],
    pilot: [
      {
        title: "Relier le CRM aux documents",
        body: "Choisissez une opportunité commerciale et des documents SharePoint. Demandez un état du dossier avec les sources et les informations à confirmer avant d'envoyer une proposition.",
      },
      {
        title: "Préparer un devis Odoo",
        body: "Utilisez un environnement de test. Faites préparer un devis et observez les droits requis, la validation avant écriture, la gestion des erreurs et la traçabilité.",
      },
      {
        title: "Faire évoluer l'agent après livraison",
        body: "Confiez une modification de procédure à un utilisateur métier. Mesurez le temps nécessaire, les compétences demandées et les responsabilités de maintenance.",
      },
    ],
    questions: [
      {
        question: "Dust propose-t-il plusieurs modèles et des agents ?",
        answer:
          "Oui. Dust présente une plateforme multi-modèles avec des agents et des intégrations. Le choix avec Wonka doit donc porter sur vos workflows, vos données et votre mode de déploiement.",
      },
      {
        question: "Dust propose-t-il une résidence des données en Europe ?",
        answer:
          "Son site présente une option de résidence dans l'UE. Vérifiez le périmètre, les conditions de l'offre et les flux des modèles et outils retenus. Ne déduisez pas le traitement de toutes les données du seul lieu de stockage.",
      },
      {
        question: "Quelle alternative à Dust choisir pour Odoo ?",
        answer:
          "Wonka propose une offre dédiée à Odoo. Comparez-la à l'intégration que Dust peut proposer sur votre version et vos objets métier. Faites démontrer les actions et les permissions au lieu de compter les connecteurs.",
      },
    ],
    sources: [
      {
        label: "Dust — plateforme et gouvernance",
        url: "https://dust.tt/",
        note: "Consulté le 24 septembre 2026 : agents partagés, multi-modèles, gouvernance et options de résidence US/UE. Aucun prix n'est repris.",
      },
    ],
  },
  {
    slug: "langdock",
    competitor: "Langdock",
    title: "Alternative Langdock : comparez Wonka pour votre entreprise",
    description:
      "Wonka ou Langdock ? Comparez deux plateformes IA européennes sur vos workflows, modèles, intégrations, gouvernance et besoins d'accompagnement.",
    reviewedAt: "2026-09-24",
    summary:
      "Langdock et Wonka se positionnent sur l'adoption de l'IA en entreprise. Le caractère européen ou multi-modèles ne suffit pas à les départager. Comparez leur adéquation à votre SI, les conditions de déploiement et l'accompagnement nécessaire pour rendre vos équipes autonomes.",
    competitorFit:
      "Langdock présente une plateforme comprenant chat, agents, workflows, intégrations et API. Son site met en avant l'hébergement européen, la gouvernance et des options de déploiement personnalisé. Vérifiez les conditions d'accès à ces options pour la taille de votre organisation.",
    wonkaFit:
      "Wonka est à évaluer si vous souhaitez associer un outil partagé à un travail de cadrage, d'intégration et d'adoption. Pour une PME ou une ETI française, l'enjeu peut être d'obtenir un premier processus fiable avec Odoo et les outils documentaires, puis de l'étendre aux autres équipes.",
    differences: [
      {
        criterion: "Plateforme",
        competitor:
          "Chat multi-modèles, agents, workflows, intégrations et API.",
        wonka:
          "Workspace multi-modèles, agents connectés et services pour les projets spécifiques.",
      },
      {
        criterion: "Europe",
        competitor:
          "Hébergement européen annoncé ; options de déploiement selon les conditions de l'offre.",
        wonka:
          "Hébergement européen présenté sur la page sécurité ; périmètre à confirmer selon les modèles et connexions.",
      },
      {
        criterion: "Gouvernance",
        competitor:
          "Contrôles d'administration centralisés annoncés par Langdock.",
        wonka:
          "Contrôles d'accès et validation humaine à configurer pour le processus retenu.",
      },
      {
        criterion: "Accompagnement",
        competitor:
          "Vérifier le support, les partenaires et les engagements inclus dans votre offre.",
        wonka:
          "Cadrage Start AI et développements Wonka Build disponibles selon le projet.",
      },
    ],
    pilot: [
      {
        title: "Un déploiement pour deux métiers",
        body: "Choisissez par exemple les opérations et le support. Vérifiez si chaque équipe accède à ses seules sources et si les administrateurs peuvent expliquer les autorisations.",
      },
      {
        title: "Un workflow récurrent",
        body: "Testez une demande client jusqu'à sa préparation dans l'outil métier. Comparez les déclencheurs, les validations, les erreurs récupérables et le coût d'une modification.",
      },
      {
        title: "Un passage à l'échelle",
        body: "Demandez ce qui change avec davantage d'utilisateurs : conditions de licence, consommation, support et options de déploiement. Comparez des devis de même périmètre.",
      },
    ],
    questions: [
      {
        question: "Langdock propose-t-il déjà un hébergement européen ?",
        answer:
          "Oui, Langdock met en avant un hébergement européen. Ce n'est donc pas un critère différenciant suffisant pour choisir Wonka. Comparez les flux réels, le contrat et votre besoin de déploiement.",
      },
      {
        question: "Wonka est-il une entreprise française ?",
        answer:
          "Wonka AI est une entreprise belge qui accompagne aussi le marché français. Une présence commerciale en France ne signifie pas que l'éditeur ou tous les traitements de données sont français.",
      },
      {
        question: "Comment choisir entre Wonka et Langdock pour une PME ?",
        answer:
          "Testez le même processus métier, puis comparez le coût total, les intégrations, l'effort d'administration et l'accompagnement. Demandez quelles fonctions sont incluses dans l'offre correspondant à votre nombre d'utilisateurs.",
      },
    ],
    sources: [
      {
        label: "Langdock — plateforme IA",
        url: "https://langdock.com/",
        note: "Consulté le 24 septembre 2026 : chat, agents, workflows, API, gouvernance et hébergement européen. Les déploiements personnalisés sont soumis à conditions.",
      },
    ],
  },
];

export function frenchComparison(slug: string) {
  return FRENCH_COMPARISONS.find((comparison) => comparison.slug === slug);
}

export function comparisonPath(comparison: FrenchComparison) {
  return `/fr/vs/${comparison.slug}`;
}
