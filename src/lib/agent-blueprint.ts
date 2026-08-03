import { EMAIL_PATTERN } from "@/lib/lead-api";

export const AGENT_TIERS = [
  "Copilot",
  "Human in the loop",
  "Fully autonomous",
] as const;

export type AgentTier = (typeof AGENT_TIERS)[number];

export interface AgentBlueprintAgent {
  id: string;
  name: string;
  tier: AgentTier;
  mission: string;
  whyNow: string;
  trigger: string;
  inputs: string[];
  tools: string[];
  workflow: string[];
  humanControl: string;
  expectedImpact: string;
  effort: "Low" | "Medium" | "High";
  benchmarkPattern: string;
}

export interface AgentBlueprintResult {
  sector: string;
  headline: string;
  summary: string;
  signals: string[];
  agents: AgentBlueprintAgent[];
  sources: Array<{ title: string; url: string }>;
}

export interface CompanyContext {
  sector: string;
  operatingModel: string;
  summary: string;
  departments: string[];
  priorities: string[];
  likelyTools: string[];
  benchmarkQuery: string;
  confidence: number;
}

export interface CompanyResearch extends CompanyContext {
  privateIdentifiers: string[];
}

export interface BenchmarkPattern {
  useCase: string;
  description: string;
}

export interface NormalizedTarget {
  domain: string;
  website: string;
  email: string | null;
}

const DOMAIN_PATTERN =
  /^(?=.{4,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function normalizeTarget(value: unknown): NormalizedTarget | null {
  if (typeof value !== "string") return null;
  const input = value.trim().toLowerCase();
  if (!input || input.length > 320) return null;

  const email = EMAIL_PATTERN.test(input) ? input : null;
  const candidate = email ? input.split("@").at(-1) : input;
  if (!candidate) return null;

  let hostname: string;
  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:\/\//i.test(candidate) ? candidate : `https://${candidate}`,
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    hostname = url.hostname.replace(/^www\./, "").replace(/\.$/, "");
  } catch {
    return null;
  }

  if (!DOMAIN_PATTERN.test(hostname) || hostname.endsWith(".local")) return null;

  return {
    domain: hostname,
    website: `https://${hostname}`,
    email,
  };
}

export function isAgentBlueprintResult(value: unknown): value is Omit<AgentBlueprintResult, "sources"> {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AgentBlueprintResult>;
  return (
    typeof candidate.sector === "string" &&
    typeof candidate.headline === "string" &&
    typeof candidate.summary === "string" &&
    Array.isArray(candidate.signals) &&
    candidate.signals.every((item) => typeof item === "string") &&
    Array.isArray(candidate.agents) &&
    candidate.agents.length === 3 &&
    candidate.agents.every(isAgentBlueprintAgent)
  );
}

function redactText(value: string, identifiers: string[]): string {
  return identifiers
    .filter((identifier) => identifier.trim().length >= 3)
    .sort((a, b) => b.length - a.length)
    .reduce((text, identifier) => {
      const escaped = identifier
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(escaped, "gi"), "the company");
    }, value)
    .replace(/\bthe company(?:\s+the company)+\b/gi, "the company");
}

export function anonymizeCompanyResearch(
  research: CompanyResearch,
  domain: string,
): { context: CompanyContext; identifiers: string[] } {
  const identifiers = Array.from(
    new Set([
      ...research.privateIdentifiers,
      domain,
      domain.split(".")[0] ?? "",
    ]),
  );
  const redact = (value: string) => redactText(value, identifiers);

  return {
    identifiers,
    context: {
      sector: redact(research.sector),
      operatingModel: redact(research.operatingModel),
      summary: redact(research.summary),
      departments: research.departments.map(redact),
      priorities: research.priorities.map(redact),
      likelyTools: research.likelyTools.map(redact),
      benchmarkQuery: redact(research.benchmarkQuery),
      confidence: research.confidence,
    },
  };
}

export function anonymizeBlueprint(
  result: Omit<AgentBlueprintResult, "sources">,
  identifiers: string[],
): Omit<AgentBlueprintResult, "sources"> {
  const redact = (value: string) => redactText(value, identifiers);
  return {
    sector: redact(result.sector),
    headline: redact(result.headline),
    summary: redact(result.summary),
    signals: result.signals.map(redact),
    agents: result.agents.map((agent) => ({
      ...agent,
      name: redact(agent.name),
      mission: redact(agent.mission),
      whyNow: redact(agent.whyNow),
      trigger: redact(agent.trigger),
      inputs: agent.inputs.map(redact),
      tools: agent.tools.map(redact),
      workflow: agent.workflow.map(redact),
      humanControl: redact(agent.humanControl),
      expectedImpact: redact(agent.expectedImpact),
      benchmarkPattern: redact(agent.benchmarkPattern),
    })),
  };
}

function isAgentBlueprintAgent(value: unknown): value is AgentBlueprintAgent {
  if (!value || typeof value !== "object") return false;
  const agent = value as Partial<AgentBlueprintAgent>;
  return (
    typeof agent.id === "string" &&
    typeof agent.name === "string" &&
    AGENT_TIERS.includes(agent.tier as AgentTier) &&
    typeof agent.mission === "string" &&
    typeof agent.whyNow === "string" &&
    typeof agent.trigger === "string" &&
    Array.isArray(agent.inputs) &&
    agent.inputs.every((item) => typeof item === "string") &&
    Array.isArray(agent.tools) &&
    agent.tools.every((item) => typeof item === "string") &&
    Array.isArray(agent.workflow) &&
    agent.workflow.every((item) => typeof item === "string") &&
    typeof agent.humanControl === "string" &&
    typeof agent.expectedImpact === "string" &&
    ["Low", "Medium", "High"].includes(agent.effort ?? "") &&
    typeof agent.benchmarkPattern === "string"
  );
}
