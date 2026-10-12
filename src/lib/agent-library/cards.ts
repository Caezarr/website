import type { Locale } from "@/i18n/config";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import { AGENT_LIBRARY_COPY } from "./copy";
import type {
  AgentCardData,
  AgentCardTool,
  AgentFunction,
  AgentSector,
  LibraryAgent,
  LibraryUseCase,
} from "./types";

export function searchable(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function toCardTools(tools: string[]): AgentCardTool[] {
  return resolveConnectedTools(tools).map((tool) => ({
    name: tool.name,
    label: tool.name === "Odoo ERP" ? "Odoo" : tool.name,
    ...(tool.iconUrl ? { iconUrl: tool.iconUrl } : {}),
  }));
}

function tagText(
  locale: Locale,
  fn: AgentFunction,
  sectors: AgentSector[],
  tools: AgentCardTool[],
): string[] {
  const labels = AGENT_LIBRARY_COPY[locale];
  return [
    labels.functions[fn],
    ...sectors.map((sector) => labels.sectors[sector]),
    ...tools.map((tool) => tool.label),
  ];
}

export function toCardData(
  agent: LibraryAgent,
  locale: Locale,
  href: string,
): AgentCardData {
  const copy = agent.copy[locale];
  const labels = AGENT_LIBRARY_COPY[locale];
  const tools = toCardTools(agent.tools);
  return {
    kind: "agent",
    slug: agent.slug,
    href,
    name: copy.name,
    promise: copy.promise,
    function: agent.function,
    functionLabel: labels.functions[agent.function],
    sectors: agent.sectors,
    tools,
    tier: agent.tier,
    tierLabel: labels.tiers[agent.tier],
    searchText: searchable(
      [
        copy.problem,
        copy.process,
        ...copy.steps,
        ...tagText(locale, agent.function, agent.sectors, tools),
      ].join(" "),
    ),
  };
}

export function toUseCaseCardData(
  useCase: LibraryUseCase,
  locale: Locale,
  href: string,
): AgentCardData {
  const copy = useCase.copy[locale];
  const tools = toCardTools(useCase.tools);
  return {
    kind: "use-case",
    slug: useCase.slug,
    href,
    name: copy.name,
    promise: copy.description,
    function: useCase.function,
    functionLabel: AGENT_LIBRARY_COPY[locale].functions[useCase.function],
    sectors: useCase.sectors,
    tools,
    searchText: searchable(
      tagText(locale, useCase.function, useCase.sectors, tools).join(" "),
    ),
  };
}
