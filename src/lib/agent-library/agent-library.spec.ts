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
  buildLibraryFilmSpec,
  buildLibraryWonkaChatExport,
  findLibraryAgentByBlueprintId,
  libraryAgentPath,
  libraryBlueprintId,
  libraryImportUrl,
  relatedAgents,
} from "@/lib/agent-library";
import { AGENT_LIBRARY_COPY } from "@/lib/agent-library/copy";

/** Same contract as the export route and WonkaChat's import. */
const BLUEPRINT_ID_PATTERN =
  /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const allStrings = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(allStrings)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(allStrings)
        : [];

describe("agent library catalogue", () => {
  it("has a curated catalogue of 24 to 30 agents", () => {
    expect(LIBRARY_AGENTS.length).toBeGreaterThanOrEqual(24);
    expect(LIBRARY_AGENTS.length).toBeLessThanOrEqual(30);
  });

  it("uses unique, URL-safe slugs", () => {
    const slugs = LIBRARY_AGENTS.map((agent) => agent.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("covers every business function and includes Odoo agents", () => {
    for (const fn of AGENT_FUNCTIONS) {
      expect(LIBRARY_AGENTS.some((agent) => agent.function === fn)).toBe(true);
    }
    expect(LIBRARY_AGENTS.filter((agent) => agent.tools.includes("Odoo ERP")).length).toBeGreaterThanOrEqual(5);
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
  it("derives stable, unique ids that match the import contract", () => {
    const ids = LIBRARY_AGENTS.flatMap((agent) =>
      locales.map((locale) => libraryBlueprintId(agent.slug, locale)),
    );
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(BLUEPRINT_ID_PATTERN);
    const first = LIBRARY_AGENTS[0];
    expect(libraryBlueprintId(first.slug, "fr")).toBe(libraryBlueprintId(first.slug, "fr"));
  });

  it("resolves ids back to the agent and locale, and ignores unknown ids", () => {
    for (const agent of LIBRARY_AGENTS) {
      for (const locale of locales) {
        const found = findLibraryAgentByBlueprintId(libraryBlueprintId(agent.slug, locale));
        expect(found?.agent.slug).toBe(agent.slug);
        expect(found?.locale).toBe(locale);
      }
    }
    expect(
      findLibraryAgentByBlueprintId("agent-blueprint.123e4567-e89b-42d3-a456-426614174000"),
    ).toBeNull();
  });

  it("builds an export WonkaChat accepts", () => {
    for (const agent of LIBRARY_AGENTS) {
      for (const locale of locales) {
        const payload = buildLibraryWonkaChatExport(agent, locale);
        expect(payload.version).toBe(1);
        expect(payload.blueprintId).toBe(libraryBlueprintId(agent.slug, locale));
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
  });

  it("links to WonkaChat's blueprint import page", () => {
    const agent = LIBRARY_AGENTS[0];
    expect(libraryImportUrl(agent.slug, "nl")).toBe(
      `https://wonka.chat/blueprint/${libraryBlueprintId(agent.slug, "nl")}`,
    );
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
