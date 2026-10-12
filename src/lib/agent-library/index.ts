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
import { decodeLibraryExportId, getLibraryExportSecret } from "./export-token";
import type { LibraryAgent, LibraryEntry, LibraryUseCase } from "./types";
import type { LibrarySelectionIndexEntry } from "./selection";
import { LIBRARY_USE_CASES } from "./use-cases";

export * from "./types";
export type { LibrarySelectionIndexEntry } from "./selection";

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

export { LIBRARY_USE_CASES };

export const AGENT_LIBRARY_PATH = "/agent-library";

export function getLibraryAgent(slug: string): LibraryAgent | undefined {
  return LIBRARY_AGENTS.find((agent) => agent.slug === slug);
}

export function getLibraryUseCase(slug: string): LibraryUseCase | undefined {
  return LIBRARY_USE_CASES.find((useCase) => useCase.slug === slug);
}

/** Every library entry: full agents first, then use cases, in display order. */
export const LIBRARY_ENTRIES: LibraryEntry[] = [
  ...LIBRARY_AGENTS.map((entry) => ({ kind: "agent" as const, entry })),
  ...LIBRARY_USE_CASES.map((entry) => ({ kind: "use-case" as const, entry })),
];

export function getLibraryEntry(slug: string): LibraryEntry | undefined {
  return LIBRARY_ENTRIES.find(({ entry }) => entry.slug === slug);
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

let codeIndex: Map<number, LibraryAgent> | null = null;

/** Full agent by its stable import code. */
export function getLibraryAgentByCode(code: number): LibraryAgent | undefined {
  codeIndex ??= new Map(LIBRARY_AGENTS.map((agent) => [agent.code, agent]));
  return codeIndex.get(code);
}

/**
 * WonkaChat import payload for a selection of 1 to 3 library agents, same
 * contract as a blueprint. `id` is the signed selection id it is served under.
 */
export function buildLibrarySelectionExport(
  agents: LibraryAgent[],
  locale: Locale,
  id: string,
): WonkaChatExport {
  const labels = AGENT_LIBRARY_COPY[locale];
  const [first] = agents;
  const sameFunction = agents.every((agent) => agent.function === first.function);
  return buildWonkaChatExport(
    {
      sector: sameFunction ? labels.functions[first.function] : labels.breadcrumb,
      headline:
        agents.length === 1
          ? first.copy[locale].promise
          : agents.map((agent) => agent.copy[locale].name).join(", "),
      agents: agents.map((agent) => toBlueprintAgent(agent, locale)),
    },
    id,
    locale,
  );
}

export type LibraryExportResolution =
  | { status: "ok"; payload: WonkaChatExport }
  | { status: "expired" }
  | null;

/**
 * Resolves a signed library selection id to its export. Null when the id is
 * not a library id (or the secret is missing), so the caller can fall back to
 * Blueprint assessments.
 */
export function resolveLibraryExport(
  id: string,
  secret: string | null,
  now: Date = new Date(),
): LibraryExportResolution {
  if (!secret) return null;
  const decoded = decodeLibraryExportId(id, secret, now);
  if (!decoded.ok) return decoded.reason === "expired" ? { status: "expired" } : null;
  const agents = decoded.codes.map(getLibraryAgentByCode);
  if (agents.some((agent) => !agent)) return null;
  return {
    status: "ok",
    payload: buildLibrarySelectionExport(agents as LibraryAgent[], decoded.locale, id),
  };
}

/** Whether pages offer the WonkaChat import (false in production without a secret). */
export function isLibraryImportEnabled(): boolean {
  return getLibraryExportSecret() !== null;
}

/** Compact catalogue the selection tray uses to name and link entries. */
export function librarySelectionIndex(locale: Locale): LibrarySelectionIndexEntry[] {
  return LIBRARY_ENTRIES.map(({ kind, entry }) => ({
    slug: entry.slug,
    kind,
    name: entry.copy[locale].name,
  }));
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

/**
 * Entries to suggest next to a use case, full agents and use cases mixed:
 * same function first, then shared sectors and tools.
 */
export function relatedEntries(useCase: LibraryUseCase, count = 3): LibraryEntry[] {
  const score = ({ entry }: LibraryEntry) =>
    (entry.function === useCase.function ? 4 : 0) +
    entry.sectors.filter((sector) => useCase.sectors.includes(sector)).length +
    entry.tools.filter((tool) => useCase.tools.includes(tool)).length;
  const ranked = LIBRARY_ENTRIES.filter(({ entry }) => entry.slug !== useCase.slug)
    .map((item, index) => ({ item, index, score: score(item) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item);
  const picked = new Set<LibraryEntry>(
    [
      ranked.find((item) => item.kind === "agent"),
      ranked.find((item) => item.kind === "use-case"),
    ].filter((item): item is LibraryEntry => Boolean(item)),
  );
  for (const item of ranked) {
    if (picked.size >= count) break;
    picked.add(item);
  }
  return ranked.filter((item) => picked.has(item)).slice(0, count);
}

/** Tools used by at least one entry, in catalogue order of first use. */
export function libraryToolsInUse(): string[] {
  return Array.from(new Set(LIBRARY_ENTRIES.flatMap(({ entry }) => entry.tools)));
}

export { WONKACHAT_ORIGIN, wonkaChatImportUrl } from "./selection";
