import { createHash } from "node:crypto";
import { locales, type Locale } from "@/i18n/config";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import {
  buildWonkaChatExport,
  type WonkaChatExport,
} from "@/lib/agent-blueprint-wonkachat";
import { buildAgentFilmSpec, type AgentFilmSpec } from "@/lib/agent-film";
import { HREFLANG } from "@/lib/hreflang";
import { FINANCE_AGENTS } from "./agents/finance";
import { HR_AGENTS } from "./agents/hr";
import { IT_AGENTS } from "./agents/it";
import { LEGAL_AGENTS } from "./agents/legal";
import { MARKETING_AGENTS } from "./agents/marketing";
import { OPERATIONS_AGENTS } from "./agents/operations";
import { SALES_AGENTS } from "./agents/sales";
import { SUPPORT_AGENTS } from "./agents/support";
import { AGENT_LIBRARY_COPY } from "./copy";
import type { LibraryAgent } from "./types";

export * from "./types";

export const LIBRARY_AGENTS: LibraryAgent[] = [
  ...FINANCE_AGENTS,
  ...SALES_AGENTS,
  ...SUPPORT_AGENTS,
  ...OPERATIONS_AGENTS,
  ...HR_AGENTS,
  ...LEGAL_AGENTS,
  ...MARKETING_AGENTS,
  ...IT_AGENTS,
];

export const AGENT_LIBRARY_PATH = "/agent-library";

export function getLibraryAgent(slug: string): LibraryAgent | undefined {
  return LIBRARY_AGENTS.find((agent) => agent.slug === slug);
}

export function libraryIndexPath(locale: Locale): string {
  return locale === "en" ? AGENT_LIBRARY_PATH : `/${locale}${AGENT_LIBRARY_PATH}`;
}

export function libraryAgentPath(slug: string, locale: Locale): string {
  return `${libraryIndexPath(locale)}/${slug}`;
}

/** hreflang map (absolute URLs) for a library agent: same slug in every locale. */
export function libraryAgentLanguages(siteUrl: string, slug: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[HREFLANG[locale]] = `${siteUrl}${libraryAgentPath(slug, locale)}`;
  }
  languages["x-default"] = languages[HREFLANG.en];
  return languages;
}

/** Display name of a tool: "Odoo ERP" is shown as plain "Odoo". */
export function toolLabel(tool: string): string {
  return tool === "Odoo ERP" ? "Odoo" : tool;
}

/**
 * The library agent in the blueprint agent shape, so the film and the
 * WonkaChat export reuse the exact same code as a generated blueprint.
 */
export function toBlueprintAgent(
  agent: LibraryAgent,
  locale: Locale,
): AgentBlueprintAgent {
  const copy = agent.copy[locale];
  return {
    id: agent.slug,
    name: copy.name,
    tier: agent.tier,
    mission: copy.promise,
    whyNow: copy.problem,
    trigger: copy.trigger,
    inputs: [],
    tools: [...agent.tools],
    workflow: [...copy.steps],
    humanControl: copy.humanControl,
    expectedImpact: copy.gain,
    weeklyHoursSaved: { min: 0, max: 0 },
    effort: "Low",
    benchmarkPattern: "",
    process: copy.process,
    companySignal: "",
    conversationStarters: [copy.prompt, ...copy.starters],
    demo: {
      request: agent.tier === "Copilot" ? copy.prompt : copy.trigger,
      steps: copy.steps.map((action, index) => ({
        action,
        tool: agent.stepTools[index],
        finding: copy.findings[index] ?? "",
      })),
      deliverable: copy.deliverable,
    },
  };
}

/** Film spec for a library agent: closes on the qualitative gain, never on hours. */
export function buildLibraryFilmSpec(
  agent: LibraryAgent,
  locale: Locale,
): AgentFilmSpec {
  return {
    ...buildAgentFilmSpec(toBlueprintAgent(agent, locale), locale),
    hours: null,
    outcome: agent.copy[locale].gain,
  };
}

/**
 * Stable import id for a library agent in one locale. WonkaChat's one-click
 * import only accepts `agent-blueprint.<uuid>` ids, so library agents get a
 * deterministic uuid v4-shaped id derived from slug and locale. The export
 * route serves these from the static catalogue, never from Sanity.
 */
export function libraryBlueprintId(slug: string, locale: Locale): string {
  const hex = createHash("sha256")
    .update(`wonka-agent-library:${slug}:${locale}`)
    .digest("hex");
  const variant = ((parseInt(hex[16], 16) & 0x3) | 0x8).toString(16);
  return `agent-blueprint.${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

let idIndex: Map<string, { agent: LibraryAgent; locale: Locale }> | null = null;

export function findLibraryAgentByBlueprintId(
  id: string,
): { agent: LibraryAgent; locale: Locale } | null {
  if (!idIndex) {
    idIndex = new Map();
    for (const agent of LIBRARY_AGENTS) {
      for (const locale of locales) {
        idIndex.set(libraryBlueprintId(agent.slug, locale).toLowerCase(), {
          agent,
          locale,
        });
      }
    }
  }
  return idIndex.get(id.toLowerCase()) ?? null;
}

/** WonkaChat import payload for one library agent, same contract as a blueprint. */
export function buildLibraryWonkaChatExport(
  agent: LibraryAgent,
  locale: Locale,
): WonkaChatExport {
  const copy = agent.copy[locale];
  return buildWonkaChatExport(
    {
      sector: AGENT_LIBRARY_COPY[locale].functions[agent.function],
      headline: copy.promise,
      agents: [toBlueprintAgent(agent, locale)],
    },
    libraryBlueprintId(agent.slug, locale),
    locale,
  );
}

/** Agents to suggest next: same function first, then shared sectors and tools. */
export function relatedAgents(agent: LibraryAgent, count = 3): LibraryAgent[] {
  const score = (other: LibraryAgent) =>
    (other.function === agent.function ? 4 : 0) +
    other.sectors.filter((sector) => agent.sectors.includes(sector)).length +
    other.tools.filter((tool) => agent.tools.includes(tool)).length;
  return LIBRARY_AGENTS.filter((other) => other.slug !== agent.slug)
    .map((other, index) => ({ other, index, score: score(other) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, count)
    .map(({ other }) => other);
}

/** Tools used by at least one agent, in catalogue order of first use. */
export function libraryToolsInUse(): string[] {
  return Array.from(new Set(LIBRARY_AGENTS.flatMap((agent) => agent.tools)));
}

/** WonkaChat origin, same as the Blueprint import. */
export const WONKACHAT_ORIGIN = "https://wonka.chat";

/** WonkaChat page that imports this library agent in one click. */
export function libraryImportUrl(slug: string, locale: Locale): string {
  return `${WONKACHAT_ORIGIN}/blueprint/${encodeURIComponent(libraryBlueprintId(slug, locale))}`;
}
