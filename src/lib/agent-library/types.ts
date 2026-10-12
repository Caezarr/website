import type { Locale } from "@/i18n/config";
import type { AgentTier } from "@/lib/agent-blueprint";

export const AGENT_FUNCTIONS = [
  "finance",
  "sales",
  "support",
  "hr",
  "operations",
  "legal",
  "marketing",
  "it",
] as const;

export type AgentFunction = (typeof AGENT_FUNCTIONS)[number];

export const AGENT_SECTORS = [
  "industry",
  "construction",
  "professional-services",
  "retail",
  "public",
  "finance",
] as const;

export type AgentSector = (typeof AGENT_SECTORS)[number];

/**
 * Tools a library agent can connect, named exactly as `resolveConnectedTools`
 * returns them, so the film icons and the WonkaChat connector mapping work.
 */
export const LIBRARY_TOOLS = [
  "Odoo ERP",
  "SharePoint",
  "Outlook",
  "Microsoft Teams",
  "OneDrive",
  "Salesforce",
  "HubSpot",
  "Dynamics 365",
  "Jira",
  "Confluence",
  "Slack",
  "Google Drive",
  "Notion",
  "Airtable",
  "Asana",
  "GitHub",
  "Box",
] as const;

export type LibraryTool = (typeof LIBRARY_TOOLS)[number];

/** Localized copy of one library agent. Steps and findings are aligned. */
export interface LibraryAgentCopy {
  name: string;
  /** One-line promise shown on cards and as the meta description lead. */
  promise: string;
  /** The recurring work this agent takes over, as the team lives it. */
  problem: string;
  /** Short noun phrase for the process, used in the WonkaChat instructions. */
  process: string;
  /** What the agent does, in order. One tool call per step in the film. */
  steps: string[];
  /** What each step finds in the demo run (same length as `steps`). */
  findings: string[];
  trigger: string;
  humanControl: string;
  /** Qualitative gain. Never a number. */
  gain: string;
  /** Example prompt a user types to the agent. */
  prompt: string;
  /** Two more conversation starters for WonkaChat. */
  starters: [string, string];
  deliverable: {
    kind: string;
    title: string;
    sections: Array<{ heading: string; body: string }>;
  };
}

export interface LibraryAgent {
  slug: string;
  /**
   * Stable numeric code (1 to 255) carried in signed WonkaChat import ids.
   * Never reuse or renumber a code: links already shared would point to
   * another agent. New agents take the next free number.
   */
  code: number;
  function: AgentFunction;
  sectors: AgentSector[];
  tier: AgentTier;
  /** Connected tools, most important first. */
  tools: LibraryTool[];
  /** Tool used by each step of the demo run (same length as `steps`). */
  stepTools: LibraryTool[];
  copy: Record<Locale, LibraryAgentCopy>;
}

/** Localized copy of one lightweight use case. */
export interface LibraryUseCaseCopy {
  name: string;
  /** Problem, what the agent does and what changes, in a few sentences. */
  description: string;
}

/** Lightweight library entry: a validated use case without demo run or import. */
export interface LibraryUseCase {
  slug: string;
  function: AgentFunction;
  sectors: AgentSector[];
  /** Connected tools, most important first. May be empty. */
  tools: LibraryTool[];
  copy: Record<Locale, LibraryUseCaseCopy>;
}

export type LibraryEntry =
  | { kind: "agent"; entry: LibraryAgent }
  | { kind: "use-case"; entry: LibraryUseCase };

export interface AgentCardTool {
  name: string;
  label: string;
  iconUrl?: string;
}

/** Serializable card data, shaped on the server for the client filters. */
export interface AgentCardData {
  kind: "agent" | "use-case";
  slug: string;
  href: string;
  name: string;
  promise: string;
  function: AgentFunction;
  functionLabel: string;
  sectors: AgentSector[];
  tools: AgentCardTool[];
  /** Autonomy level, full agents only. */
  tier?: AgentTier;
  tierLabel?: string;
  /** Lowercased, accent-free text the search box matches on top of name and promise. */
  searchText: string;
}
