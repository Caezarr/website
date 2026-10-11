import type { Locale } from "@/i18n/config";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import { AGENT_LIBRARY_COPY } from "./copy";
import type { AgentCardData, LibraryAgent } from "./types";

export function searchable(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function toCardData(
  agent: LibraryAgent,
  locale: Locale,
  href: string,
): AgentCardData {
  const copy = agent.copy[locale];
  const labels = AGENT_LIBRARY_COPY[locale];
  const tools = resolveConnectedTools(agent.tools).map((tool) => ({
    name: tool.name,
    label: tool.name === "Odoo ERP" ? "Odoo" : tool.name,
    ...(tool.iconUrl ? { iconUrl: tool.iconUrl } : {}),
  }));
  return {
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
        copy.name,
        copy.promise,
        copy.problem,
        copy.process,
        ...copy.steps,
        labels.functions[agent.function],
        ...agent.sectors.map((sector) => labels.sectors[sector]),
        ...tools.map((tool) => tool.label),
      ].join(" "),
    ),
  };
}
