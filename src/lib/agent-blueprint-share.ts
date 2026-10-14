import type { Locale } from "@/i18n/config";
import {
  AGENT_TIERS,
  isAgentBlueprintResult,
  type AgentBlueprintAgent,
  type AgentBlueprintResult,
  type AgentTier,
} from "@/lib/agent-blueprint";
import { isWonkaChatExportExpired } from "@/lib/agent-blueprint-wonkachat";

/** Public id of a blueprint: the UUID v4 part of `agent-blueprint.<uuid>`. */
export const BLUEPRINT_UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ASSESSMENT_PREFIX = "agent-blueprint.";

/** Returns the lowercased UUID when `value` is a strict UUID v4, else null. */
export function parseBlueprintUuid(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const candidate = value.trim();
  return BLUEPRINT_UUID_PATTERN.test(candidate) ? candidate.toLowerCase() : null;
}

export function assessmentIdFromUuid(uuid: string): string {
  return `${ASSESSMENT_PREFIX}${uuid}`;
}

/** UUID part of a Sanity assessment id, or null when it is not one. */
export function uuidFromAssessmentId(assessmentId: string): string | null {
  if (!assessmentId.startsWith(ASSESSMENT_PREFIX)) return null;
  return parseBlueprintUuid(assessmentId.slice(ASSESSMENT_PREFIX.length));
}

export function sharedBlueprintPath(uuid: string, locale: Locale): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/ai-agent-blueprint/r/${uuid}`;
}

export function blueprintPdfPath(uuid: string): string {
  return `/api/agent-blueprint/${uuid}/pdf`;
}

/** What a shared page, its OG image and the PDF may show: never sources, domain or IP. */
export type ShareableBlueprintResult = Omit<AgentBlueprintResult, "sources">;

export interface SharedBlueprint {
  uuid: string;
  locale: Locale;
  result: ShareableBlueprintResult;
  /** WonkaChat's one-click import stays readable for a limited time. */
  importAvailable: boolean;
}

/** Fields read from Sanity for a shared blueprint. Never targetDomain or clientIp. */
export const SHARED_BLUEPRINT_PROJECTION = `{
  status,
  locale,
  completedAt,
  sector,
  headline,
  summary,
  agents[]{_key, name, tier, mission, tools, expectedImpact, weeklyHoursSaved, effort},
  wonkachatExport,
  shareResult
}`;

export interface SharedBlueprintDoc {
  status?: string;
  locale?: string;
  completedAt?: string;
  sector?: string;
  headline?: string;
  summary?: string;
  agents?: Array<{
    _key?: string;
    name?: string;
    tier?: string;
    mission?: string;
    tools?: string[];
    expectedImpact?: string;
    weeklyHoursSaved?: { min?: number; max?: number };
    effort?: string;
  }>;
  wonkachatExport?: string;
  shareResult?: string;
}

/**
 * Copies only the known agent fields, so anything else the model or a stored
 * document carries never reaches a public page.
 */
function shareableAgent(agent: AgentBlueprintAgent): AgentBlueprintAgent {
  return {
    id: agent.id,
    name: agent.name,
    tier: agent.tier,
    mission: agent.mission,
    whyNow: agent.whyNow,
    trigger: agent.trigger,
    inputs: agent.inputs,
    tools: agent.tools,
    workflow: agent.workflow,
    humanControl: agent.humanControl,
    expectedImpact: agent.expectedImpact,
    weeklyHoursSaved: {
      min: agent.weeklyHoursSaved.min,
      max: agent.weeklyHoursSaved.max,
    },
    effort: agent.effort,
    benchmarkPattern: agent.benchmarkPattern,
    process: agent.process,
    companySignal: agent.companySignal,
    ...(agent.conversationStarters
      ? { conversationStarters: agent.conversationStarters }
      : {}),
    ...(agent.demo ? { demo: agent.demo } : {}),
  };
}

/** The completed result as stored for sharing: the on-screen result without sources. */
export function shareableResult(
  result: AgentBlueprintResult | ShareableBlueprintResult,
): ShareableBlueprintResult {
  return {
    sector: result.sector,
    headline: result.headline,
    summary: result.summary,
    signals: result.signals,
    agents: result.agents.map(shareableAgent),
  };
}

function toLocale(value: unknown): Locale {
  return value === "fr" || value === "nl" ? value : "en";
}

function parseJson(value: string | undefined): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

interface ExportAgentHints {
  conversationStarters?: unknown;
  trigger?: { event?: unknown } | null;
}

function nonNegative(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : 0;
}

/**
 * Blueprints completed before `shareResult` existed only kept a summary of
 * each agent. Rebuild what the result screen needs; empty fields are hidden.
 */
function legacyResult(doc: SharedBlueprintDoc): ShareableBlueprintResult | null {
  const exported = parseJson(doc.wonkachatExport) as {
    agents?: ExportAgentHints[];
  } | null;
  const agents: AgentBlueprintAgent[] = (doc.agents ?? [])
    .filter((agent) => typeof agent?.name === "string" && agent.name.trim())
    .slice(0, 3)
    .map((agent, index) => {
      const hints = exported?.agents?.[index];
      const min = nonNegative(agent.weeklyHoursSaved?.min);
      const max = Math.max(min, nonNegative(agent.weeklyHoursSaved?.max));
      const starters = Array.isArray(hints?.conversationStarters)
        ? hints.conversationStarters.filter(
            (item): item is string => typeof item === "string",
          )
        : undefined;
      return {
        id: agent._key || `agent-${index + 1}`,
        name: agent.name!.trim(),
        tier: AGENT_TIERS.includes(agent.tier as AgentTier)
          ? (agent.tier as AgentTier)
          : "Copilot",
        mission: agent.mission ?? "",
        whyNow: "",
        trigger:
          typeof hints?.trigger?.event === "string" ? hints.trigger.event : "",
        inputs: [],
        tools: Array.isArray(agent.tools)
          ? agent.tools.filter((tool): tool is string => typeof tool === "string")
          : [],
        workflow: [],
        humanControl: "",
        expectedImpact: agent.expectedImpact ?? "",
        weeklyHoursSaved: { min, max },
        effort:
          agent.effort === "Low" || agent.effort === "High"
            ? agent.effort
            : "Medium",
        benchmarkPattern: "",
        process: "",
        companySignal: "",
        ...(starters?.length ? { conversationStarters: starters } : {}),
      };
    });

  if (!agents.length || !doc.headline) return null;
  return {
    sector: doc.sector ?? "",
    headline: doc.headline,
    summary: doc.summary ?? "",
    signals: [],
    agents,
  };
}

/**
 * Maps a Sanity assessment to what may be shown publicly. Null unless the
 * blueprint completed: processing, failed and unknown ids all 404.
 */
export function toSharedBlueprint(
  uuid: string,
  doc: SharedBlueprintDoc | null | undefined,
  now: Date = new Date(),
): SharedBlueprint | null {
  if (!doc || doc.status !== "completed") return null;

  const stored = parseJson(doc.shareResult);
  const result = isAgentBlueprintResult(stored)
    ? shareableResult(stored)
    : legacyResult(doc);
  if (!result) return null;

  return {
    uuid,
    locale: toLocale(doc.locale),
    result,
    importAvailable:
      Boolean(doc.wonkachatExport) &&
      !isWonkaChatExportExpired(doc.completedAt, now),
  };
}

/** Sum of the weekly hours each agent gives back. */
export function weeklyHoursSaved(result: Pick<ShareableBlueprintResult, "agents">) {
  return result.agents.reduce(
    (total, agent) => ({
      min: total.min + agent.weeklyHoursSaved.min,
      max: total.max + agent.weeklyHoursSaved.max,
    }),
    { min: 0, max: 0 },
  );
}
