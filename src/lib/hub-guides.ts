import type { Locale } from "@/i18n/config";
import { itemPath } from "@/lib/locale-path";

export interface HubGuideLink {
  href: string;
  title: string;
  description: string;
}

const guides = {
  en: [
    ["dust-alternatives", "Dust.tt alternatives", "Compare enterprise AI search and agent platforms."],
    ["glean-alternatives", "Glean alternatives", "Review private AI search options for company knowledge."],
    ["langdock-alternatives", "Langdock alternatives", "Compare secure AI workspaces for European teams."],
    ["notebooklm-alternatives", "NotebookLM alternatives", "Evaluate document AI tools for enterprise workflows."],
    ["odoo-ai-agent", "Odoo AI agent", "See how AI agents can work across ERP processes."],
    ["why-microsoft-copilot-is-not-enough", "Why Copilot is not enough", "Understand where Microsoft Copilot needs a private AI layer."],
  ],
  fr: [
    ["alternatives-dust-tt", "Alternatives à Dust.tt", "Comparez les plateformes d'agents IA pour l'entreprise."],
    ["alternatives-glean", "Alternatives à Glean", "Évaluez les options de recherche IA privée pour la connaissance interne."],
    ["alternatives-langdock", "Alternatives à Langdock", "Comparez les espaces IA sécurisés pour équipes européennes."],
    ["alternatives-notebooklm", "Alternatives à NotebookLM", "Analysez les outils IA documentaires pour workflows d'entreprise."],
    ["odoo-agent-ia", "Agent IA Odoo", "Découvrez comment les agents IA travaillent dans l'ERP."],
    ["fr-microsoft-copilot-insuffisant", "Pourquoi Copilot ne suffit pas", "Comprenez quand une couche IA privée devient nécessaire."],
  ],
  nl: [
    ["dust-tt-alternatieven", "Dust.tt alternatieven", "Vergelijk AI-agentplatformen voor enterprise teams."],
    ["glean-alternatieven", "Glean alternatieven", "Bekijk private AI search voor bedrijfskennis."],
    ["langdock-alternatieven", "Langdock alternatieven", "Vergelijk veilige AI-workspaces voor Europese teams."],
    ["notebooklm-alternatieven", "NotebookLM alternatieven", "Evalueer document-AI voor enterprise workflows."],
    ["nl-odoo-ai-agent", "Odoo AI-agent", "Zie hoe AI-agents ERP-processen ondersteunen."],
    ["nl-microsoft-copilot-insuffisant", "Waarom Copilot niet genoeg is", "Begrijp wanneer een private AI-laag nodig is."],
  ],
} as const;

export function getHubGuideLinks(locale: Locale): HubGuideLink[] {
  return guides[locale].map(([slug, title, description]) => ({
    href: itemPath("blog", locale, slug),
    title,
    description,
  }));
}
