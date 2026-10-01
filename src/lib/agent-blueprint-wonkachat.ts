import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import type { Locale } from "@/i18n/config";

/** Every agent is set up on the same WonkaChat model. */
export const WONKACHAT_MODEL = "GPT-5.6 Luna";

/** WonkaChat's agent description field is capped at 300 characters. */
const DESCRIPTION_MAX_LENGTH = 300;

/**
 * Blueprint tool names → WonkaChat connector names, as listed under
 * Tools → Connectors. Tools without a native connector map to null.
 */
const CONNECTORS: Record<string, string | null> = {
  Airtable: "Airtable",
  Asana: "Asana",
  "Azure AI": null,
  Box: "Box",
  Confluence: "Confluence",
  "Dynamics 365": "Dynamics 365",
  GitHub: "GitHub",
  "Google Drive": "Google Drive",
  HubSpot: "HubSpot",
  Jira: "Jira",
  "Microsoft Teams": "Microsoft Teams",
  Notion: "Notion",
  "Odoo ERP": "Odoo",
  OneDrive: "OneDrive",
  Outlook: "Outlook Mail",
  Salesforce: "Salesforce",
  SAP: null,
  SharePoint: "SharePoint",
  Slack: "Slack",
};

const TIER_PHRASE: Record<AgentBlueprintAgent["tier"], string> = {
  Copilot: "copilot",
  "Human in the loop": "human-in-the-loop",
  "Fully autonomous": "fully autonomous",
};

export interface WonkaChatSetup {
  name: string;
  description: string;
  model: string;
  connectors: string[];
  /** Tools from the blueprint that have no native WonkaChat connector. */
  unsupportedTools: string[];
  capabilities: string[];
  scheduling: string;
  conversationStarters: string[];
  instructions: string;
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}

function schedulingFor(agent: AgentBlueprintAgent, locale: Locale): string {
  const prompt = agent.workflow[0] ?? agent.mission;
  switch (agent.tier) {
    case "Fully autonomous":
      if (locale === "fr") return `Planification (Cron) : en semaine à 08 h. Consigne : « ${prompt} »`;
      if (locale === "nl") return `Planning (Cron): weekdagen om 08.00 uur. Prompt: “${prompt}”`;
      return `Schedule (Cron): Weekdays at 08:00. Prompt: "${prompt}"`;
    case "Human in the loop":
      if (locale === "fr") return `Événement externe : ${agent.trigger}. Consigne : « Traite cette demande liée à ${agent.process.toLowerCase()} : {{trigger data}} »`;
      if (locale === "nl") return `Externe gebeurtenis: ${agent.trigger}. Prompt: “Verwerk deze aanvraag voor ${agent.process.toLowerCase()}: {{trigger data}}”`;
      return `External event: ${agent.trigger}. Prompt: "Handle this ${agent.process.toLowerCase()} request: {{trigger data}}"`;
    default:
      return locale === "fr" ? "Aucune. Utilisé directement dans le chat." : locale === "nl" ? "Geen. Rechtstreeks in de chat gebruiken." : "None. Used directly in chat.";
  }
}

function fallbackStarters(agent: AgentBlueprintAgent, locale: Locale): string[] {
  if (locale === "fr") return [agent.workflow[0] ?? agent.mission, `Aide-moi pour ${agent.process.toLowerCase()}`, "De quoi as-tu besoin pour commencer ?"];
  if (locale === "nl") return [agent.workflow[0] ?? agent.mission, `Help me met ${agent.process.toLowerCase()}`, "Wat heb je nodig om te beginnen?"];
  return [
    agent.workflow[0] ?? agent.mission,
    `Help me with ${agent.process.toLowerCase()}`,
    "What do you need from me to start?",
  ];
}

export function buildWonkaChatSetup(
  agent: AgentBlueprintAgent,
  locale: Locale = "en",
): WonkaChatSetup {
  const tools = resolveConnectedTools(agent.tools);
  const connectors = Array.from(
    new Set(
      tools.flatMap((tool) => {
        const connector = CONNECTORS[tool.name];
        return connector ? [connector] : [];
      }),
    ),
  );
  const unsupportedTools = tools
    .filter((tool) => !CONNECTORS[tool.name])
    .map((tool) => tool.name);

  const capabilities = [
    "File Search",
    ...(agent.tier === "Human in the loop" ? ["Questions"] : []),
  ];

  const starters = (
    agent.conversationStarters?.length === 3
      ? agent.conversationStarters
      : fallbackStarters(agent, locale)
  ).map((starter) => truncate(starter, 80));

  const tierPhrase = locale === "fr"
    ? { Copilot: "copilote", "Human in the loop": "avec validation humaine", "Fully autonomous": "autonome" }[agent.tier]
    : locale === "nl"
      ? { Copilot: "copiloot", "Human in the loop": "met menselijke controle", "Fully autonomous": "autonoom" }[agent.tier]
      : TIER_PHRASE[agent.tier];
  const instructions = [
    locale === "fr"
      ? `Tu es « ${agent.name} », un agent IA ${tierPhrase} pour le processus ${agent.process.toLowerCase()}.`
      : locale === "nl"
        ? `Je bent “${agent.name}”, een ${tierPhrase} AI-agent voor het proces ${agent.process.toLowerCase()}.`
        : `You are "${agent.name}", a ${tierPhrase} AI agent for our ${agent.process.toLowerCase()} process.`,
    "",
    `${locale === "fr" ? "Mission" : locale === "nl" ? "Opdracht" : "Mission"} : ${agent.mission}`,
    `${locale === "fr" ? "Déclencheur" : locale === "nl" ? "Trigger" : "Trigger"} : ${agent.trigger}`,
    agent.inputs.length ? `${locale === "fr" ? "Données d’entrée" : locale === "nl" ? "Invoer" : "Inputs"} : ${agent.inputs.join(", ")}` : null,
    "",
    locale === "fr" ? "Fonctionnement :" : locale === "nl" ? "Werkwijze:" : "How you work:",
    ...agent.workflow.map((step, index) => `${index + 1}. ${step}`),
    "",
    `${locale === "fr" ? "Validation humaine" : locale === "nl" ? "Menselijke controle" : "Human control"} : ${agent.humanControl}`,
    connectors.length ? `${locale === "fr" ? "Connecteurs à utiliser" : locale === "nl" ? "Te gebruiken koppelingen" : "Use these connectors"} : ${connectors.join(", ")}` : null,
    `${locale === "fr" ? "Résultat attendu" : locale === "nl" ? "Verwacht resultaat" : "Expected outcome"} : ${agent.expectedImpact}`,
    "",
    locale === "fr" ? "Règles :" : locale === "nl" ? "Regels:" : "Rules:",
    locale === "fr" ? "- Utilise uniquement les informations des outils connectés et des fichiers fournis." : locale === "nl" ? "- Gebruik alleen informatie uit gekoppelde tools en aangeleverde bestanden." : "- Only use information from the connected tools and the files you are given.",
    locale === "fr" ? "- Si une information manque ou reste incertaine, dis-le et pose une question au lieu de deviner." : locale === "nl" ? "- Ontbreekt informatie of is die onzeker, zeg dat dan en vraag door in plaats van te gokken." : "- If information is missing or uncertain, say so and ask instead of guessing.",
    locale === "fr" ? "- Avant d’envoyer, publier ou modifier quoi que ce soit, affiche un brouillon et demande confirmation." : locale === "nl" ? "- Toon een concept en vraag om bevestiging voordat je iets verzendt, publiceert of wijzigt." : "- Before sending, publishing or changing anything, show a draft and ask for confirmation.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return {
    name: agent.name,
    description: truncate(agent.mission, DESCRIPTION_MAX_LENGTH),
    model: WONKACHAT_MODEL,
    connectors,
    unsupportedTools,
    capabilities,
    scheduling: schedulingFor(agent, locale),
    conversationStarters: starters,
    instructions,
  };
}

/** Plain-text setup to paste into WonkaChat's "Create new agent" wizard. */
export function formatWonkaChatSetup(setup: WonkaChatSetup, locale: Locale = "en"): string {
  return [
    locale === "fr" ? "Créez un agent WonkaChat avec cette configuration." : locale === "nl" ? "Maak een WonkaChat-agent met deze configuratie." : "Create a WonkaChat agent with this setup.",
    "",
    `${locale === "fr" ? "Nom" : locale === "nl" ? "Naam" : "Name"} : ${setup.name}`,
    `${locale === "fr" ? "Description" : locale === "nl" ? "Beschrijving" : "Description"} : ${setup.description}`,
    `${locale === "fr" ? "Modèle" : locale === "nl" ? "Model" : "Model"} : ${setup.model}`,
    `${locale === "fr" ? "Connecteurs" : locale === "nl" ? "Koppelingen" : "Connectors"} : ${setup.connectors.length ? setup.connectors.join(", ") : locale === "fr" ? "Aucun" : locale === "nl" ? "Geen" : "None"}`,
    setup.unsupportedTools.length
      ? `${locale === "fr" ? "Non disponible comme connecteur (à connecter séparément)" : locale === "nl" ? "Niet beschikbaar als koppeling (apart verbinden)" : "Not available as a connector (connect separately)"} : ${setup.unsupportedTools.join(", ")}`
      : null,
    `${locale === "fr" ? "Capacités" : locale === "nl" ? "Mogelijkheden" : "Capabilities"} : ${setup.capabilities.join(", ")}`,
    `${locale === "fr" ? "Planification" : locale === "nl" ? "Planning" : "Scheduling"} : ${setup.scheduling}`,
    locale === "fr" ? "Exemples de demandes :" : locale === "nl" ? "Voorbeelden van prompts:" : "Conversation starters:",
    ...setup.conversationStarters.map((starter) => `- ${starter}`),
    "",
    locale === "fr" ? "Instructions :" : locale === "nl" ? "Instructies:" : "Instructions:",
    setup.instructions,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
