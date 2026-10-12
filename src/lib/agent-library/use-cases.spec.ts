import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import {
  AGENT_FUNCTIONS,
  AGENT_SECTORS,
  LIBRARY_AGENTS,
  LIBRARY_ENTRIES,
  LIBRARY_TOOLS,
  LIBRARY_USE_CASES,
  getLibraryEntry,
  libraryToolsInUse,
  relatedEntries,
} from "@/lib/agent-library";
import { toUseCaseCardData } from "@/lib/agent-library/cards";
import { AGENT_LIBRARY_COPY } from "@/lib/agent-library/copy";

describe("agent library use cases", () => {
  it("has the 164 validated use cases", () => {
    expect(LIBRARY_USE_CASES).toHaveLength(164);
  });

  it("uses unique, URL-safe slugs across agents and use cases", () => {
    const slugs = LIBRARY_ENTRIES.map(({ entry }) => entry.slug);
    expect(slugs).toHaveLength(LIBRARY_AGENTS.length + LIBRARY_USE_CASES.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("lists full agents before use cases", () => {
    const kinds = LIBRARY_ENTRIES.map(({ kind }) => kind);
    expect(kinds.lastIndexOf("agent")).toBeLessThan(kinds.indexOf("use-case"));
    expect(getLibraryEntry(LIBRARY_USE_CASES[0].slug)?.kind).toBe("use-case");
    expect(getLibraryEntry(LIBRARY_AGENTS[0].slug)?.kind).toBe("agent");
  });

  it("has no duplicate names across agents and use cases in any locale", () => {
    for (const locale of locales) {
      const names = LIBRARY_ENTRIES.map(({ entry }) => entry.copy[locale].name.toLowerCase());
      expect(new Set(names).size, locale).toBe(names.length);
    }
  });

  it.each(LIBRARY_USE_CASES.map((useCase) => [useCase.slug, useCase] as const))(
    "%s has valid tags, tools and copy",
    (_, useCase) => {
      expect(AGENT_FUNCTIONS).toContain(useCase.function);
      expect(useCase.sectors.length).toBeGreaterThan(0);
      expect(new Set(useCase.sectors).size).toBe(useCase.sectors.length);
      for (const sector of useCase.sectors) expect(AGENT_SECTORS).toContain(sector);
      expect(new Set(useCase.tools).size).toBe(useCase.tools.length);
      for (const tool of useCase.tools) {
        expect(LIBRARY_TOOLS).toContain(tool);
        expect(resolveConnectedTools([tool])[0]?.name).toBe(tool);
      }
      for (const locale of locales) {
        const copy = useCase.copy[locale];
        expect(copy, `${useCase.slug} ${locale}`).toBeDefined();
        expect(copy.name.trim().length).toBeGreaterThan(0);
        expect(copy.description.trim().length).toBeGreaterThan(0);
        expect(copy.name.length).toBeLessThanOrEqual(60);
      }
    },
  );

  it("follows the copy rules", () => {
    for (const useCase of LIBRARY_USE_CASES) {
      for (const locale of locales) {
        for (const text of Object.values(useCase.copy[locale])) {
          const label = `${useCase.slug} ${locale}`;
          expect(text, label).not.toMatch(/[—–]/);
          expect(text.replace(/\bB2B\b/g, ""), label).not.toMatch(/\d/);
          expect(text, label).not.toMatch(/https?:\/\/|www\.|@\w/);
          if (locale === "fr") expect(text, label).not.toMatch(/\bSI\b/);
        }
      }
    }
    for (const locale of locales) {
      const { card, useCase, filters } = AGENT_LIBRARY_COPY[locale];
      for (const text of [...Object.values(card), ...Object.values(useCase), filters.showMore]) {
        expect(text).not.toMatch(/[—–]/);
        if (locale === "fr") expect(text).not.toMatch(/\bSI\b/);
      }
    }
  });

  it("feeds the tool filter with every tool in use", () => {
    const tools = libraryToolsInUse();
    for (const useCase of LIBRARY_USE_CASES) {
      for (const tool of useCase.tools) expect(tools).toContain(tool);
    }
  });

  it("builds light cards without an autonomy level", () => {
    for (const locale of locales) {
      const card = toUseCaseCardData(LIBRARY_USE_CASES[0], locale, "/x");
      expect(card.kind).toBe("use-case");
      expect(card.tier).toBeUndefined();
      expect(card.promise).toBe(LIBRARY_USE_CASES[0].copy[locale].description);
    }
  });

  it("suggests related entries mixing agents and use cases", () => {
    for (const useCase of LIBRARY_USE_CASES) {
      const related = relatedEntries(useCase);
      expect(related).toHaveLength(3);
      expect(related.map(({ entry }) => entry.slug)).not.toContain(useCase.slug);
      expect(related.some(({ kind }) => kind === "agent")).toBe(true);
      expect(related.some(({ kind }) => kind === "use-case")).toBe(true);
    }
  });
});
