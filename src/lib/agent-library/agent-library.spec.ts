import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { AGENT_TIERS } from "@/lib/agent-blueprint";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import { agentFilmTimeline } from "@/lib/agent-film";
import {
  AGENT_FUNCTIONS,
  AGENT_SECTORS,
  LIBRARY_AGENTS,
  LIBRARY_TOOLS,
  LIBRARY_USE_CASES,
  buildLibraryFilmSpec,
  buildLibrarySelectionExport,
  getLibraryAgentByCode,
  libraryAgentPath,
  librarySelectionIndex,
  relatedAgents,
} from "@/lib/agent-library";
import { AGENT_LIBRARY_COPY } from "@/lib/agent-library/copy";

const allStrings = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(allStrings)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(allStrings)
        : [];

describe("agent library catalogue", () => {
  it("has a curated catalogue of 55 to 70 agents", () => {
    expect(LIBRARY_AGENTS.length).toBeGreaterThanOrEqual(55);
    expect(LIBRARY_AGENTS.length).toBeLessThanOrEqual(70);
  });

  it("uses unique, URL-safe slugs", () => {
    const slugs = LIBRARY_AGENTS.map((agent) => agent.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("covers every business function and includes Odoo agents", () => {
    for (const fn of AGENT_FUNCTIONS) {
      expect(LIBRARY_AGENTS.filter((agent) => agent.function === fn).length, fn).toBeGreaterThanOrEqual(3);
    }
    expect(LIBRARY_AGENTS.filter((agent) => agent.tools.includes("Odoo ERP")).length).toBeGreaterThanOrEqual(20);
  });

  it("gives every sector filter enough agents", () => {
    for (const sector of AGENT_SECTORS) {
      expect(LIBRARY_AGENTS.filter((agent) => agent.sectors.includes(sector)).length, sector).toBeGreaterThanOrEqual(8);
    }
  });

  it("has no duplicate agent names in any locale", () => {
    for (const locale of locales) {
      const names = LIBRARY_AGENTS.map((agent) => agent.copy[locale].name.toLowerCase());
      expect(new Set(names).size, locale).toBe(names.length);
    }
  });

  it.each(LIBRARY_AGENTS.map((agent) => [agent.slug, agent] as const))(
    "%s has valid tags and tools",
    (_, agent) => {
      expect(AGENT_FUNCTIONS).toContain(agent.function);
      expect(AGENT_TIERS).toContain(agent.tier);
      expect(agent.sectors.length).toBeGreaterThan(0);
      for (const sector of agent.sectors) expect(AGENT_SECTORS).toContain(sector);
      expect(new Set(agent.tools).size).toBe(agent.tools.length);
      for (const tool of agent.tools) {
        expect(LIBRARY_TOOLS).toContain(tool);
        expect(resolveConnectedTools([tool])[0]?.name).toBe(tool);
        expect(agent.stepTools).toContain(tool);
      }
      for (const tool of agent.stepTools) expect(agent.tools).toContain(tool);
    },
  );

  it.each(LIBRARY_AGENTS.map((agent) => [agent.slug, agent] as const))(
    "%s has complete copy in every locale",
    (_, agent) => {
      for (const locale of locales) {
        const copy = agent.copy[locale];
        expect(copy, `${agent.slug} ${locale}`).toBeDefined();
        for (const text of allStrings(copy)) expect(text.trim().length).toBeGreaterThan(0);
        expect(copy.name.length).toBeLessThanOrEqual(60);
        expect(copy.trigger.length).toBeLessThanOrEqual(200);
        expect(copy.steps.length).toBe(agent.stepTools.length);
        expect(copy.findings.length).toBe(copy.steps.length);
        expect(copy.steps.length).toBeGreaterThanOrEqual(3);
        expect(copy.starters).toHaveLength(2);
        expect(copy.deliverable.sections.length).toBeGreaterThan(0);
      }
    },
  );

  it("follows the copy rules", () => {
    for (const agent of LIBRARY_AGENTS) {
      for (const locale of locales) {
        for (const text of allStrings(agent.copy[locale])) {
          expect(text, `${agent.slug} ${locale}`).not.toMatch(/[—–]/);
          expect(text, `${agent.slug} ${locale}`).not.toMatch(/https?:\/\/|www\.|@\w/);
          expect(text, `${agent.slug} ${locale}: no numeric gain claims`).not.toMatch(/\d\s?%/);
        }
        expect(agent.copy[locale].gain).not.toMatch(/\d/);
      }
      for (const text of allStrings(agent.copy.fr)) expect(text).not.toMatch(/\bSI\b/);
    }
    for (const locale of locales) {
      for (const text of allStrings(AGENT_LIBRARY_COPY[locale])) expect(text).not.toMatch(/[—–]/);
    }
  });

  it("builds a valid film for every agent and locale", () => {
    for (const agent of LIBRARY_AGENTS) {
      for (const locale of locales) {
        const spec = buildLibraryFilmSpec(agent, locale);
        expect(spec.hours).toBeNull();
        expect(spec.outcome).toBe(agent.copy[locale].gain);
        expect(spec.steps).toHaveLength(agent.stepTools.length);
        spec.steps.forEach((step, index) => {
          expect(step.tool.name).toBe(agent.stepTools[index]);
          expect(step.finding).toBe(agent.copy[locale].findings[index]);
        });
        expect(spec.start.kind).toBe(agent.tier === "Copilot" ? "message" : "event");
        expect(spec.deliverable.sections.length).toBeGreaterThan(0);
        expect(agentFilmTimeline(spec).total).toBeGreaterThan(0);
      }
    }
  });
});

describe("agent library WonkaChat import", () => {
  it("gives every agent a unique, explicit code that fits the signed id", () => {
    const codes = LIBRARY_AGENTS.map((agent) => agent.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) {
      expect(Number.isInteger(code)).toBe(true);
      expect(code).toBeGreaterThanOrEqual(1);
      expect(code).toBeLessThanOrEqual(255);
    }
    for (const agent of LIBRARY_AGENTS) expect(getLibraryAgentByCode(agent.code)).toBe(agent);
  });

  it("builds a selection export WonkaChat accepts", () => {
    const id = "agent-blueprint.123e4567-e89b-42d3-a456-426614174000";
    for (const agent of LIBRARY_AGENTS) {
      for (const locale of locales) {
        const payload = buildLibrarySelectionExport([agent], locale, id);
        expect(payload.version).toBe(1);
        expect(payload.blueprintId).toBe(id);
        expect(payload.locale).toBe(locale);
        expect(payload.agents).toHaveLength(1);
        const [exported] = payload.agents;
        expect(exported.key).toBe(agent.slug);
        expect(exported.name.length).toBeLessThanOrEqual(60);
        expect(exported.description.length).toBeLessThanOrEqual(300);
        expect(exported.instructions.length).toBeLessThanOrEqual(8000);
        expect(exported.conversationStarters.length).toBeLessThanOrEqual(4);
        for (const starter of exported.conversationStarters) expect(starter.length).toBeLessThanOrEqual(80);
        expect(exported.connectors.length).toBe(agent.tools.length);
        expect(exported.tier).toBe(agent.tier);
        expect(Boolean(exported.schedule)).toBe(agent.tier === "Fully autonomous");
        expect(Boolean(exported.trigger)).toBe(agent.tier === "Human in the loop");
        if (exported.trigger) expect(exported.trigger.event.length).toBeLessThanOrEqual(200);
      }
    }
    const team = LIBRARY_AGENTS.slice(0, 3);
    const payload = buildLibrarySelectionExport(team, "fr", id);
    expect(payload.agents.map((agent) => agent.key)).toEqual(team.map((agent) => agent.slug));
  });

  it("never puts instructions in the selection index sent to the browser", () => {
    for (const locale of locales) {
      const index = librarySelectionIndex(locale);
      expect(index).toHaveLength(LIBRARY_AGENTS.length + LIBRARY_USE_CASES.length);
      for (const entry of index) expect(Object.keys(entry).sort()).toEqual(["kind", "name", "slug"]);
    }
  });
});

describe("agent library navigation", () => {
  it("localizes paths with the same slug", () => {
    expect(libraryAgentPath("x", "en")).toBe("/agent-library/x");
    expect(libraryAgentPath("x", "fr")).toBe("/fr/agent-library/x");
    expect(libraryAgentPath("x", "nl")).toBe("/nl/agent-library/x");
  });

  it("suggests related agents without the agent itself", () => {
    for (const agent of LIBRARY_AGENTS) {
      const related = relatedAgents(agent);
      expect(related).toHaveLength(3);
      expect(related.map((other) => other.slug)).not.toContain(agent.slug);
    }
  });
});
