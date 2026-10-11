import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import {
  LAST_REVIEWED,
  MODELS,
  PRIORITY_IDS,
  TASK_IDS,
  type PriorityId,
  type TaskId,
} from "@/lib/model-comparator/models";
import { rankModels, type ReasonCode } from "@/lib/model-comparator/rank";
import { formatReviewMonth, MODEL_COMPARATOR_COPY } from "@/views/copy/model-comparator";

const REASON_CODES: ReasonCode[] = [
  "fast",
  "lowCost",
  "midCost",
  "euProvider",
  "openWeight",
  "veryLargeContext",
];

function ids(tasks: TaskId[] = [], priorities: PriorityId[] = []): string[] {
  return rankModels({ tasks, priorities }).map((entry) => entry.model.id);
}

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, shape(child)]),
    );
  }
  return typeof value;
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("model data", () => {
  it("has unique ids", () => {
    expect(new Set(MODELS.map((model) => model.id)).size).toBe(MODELS.length);
  });

  it.each(MODELS.map((model) => [model.id, model] as const))(
    "%s scores every task between 1 and 5",
    (_id, model) => {
      expect(Object.keys(model.scores).sort()).toEqual([...TASK_IDS].sort());
      for (const task of TASK_IDS) {
        expect(Number.isInteger(model.scores[task])).toBe(true);
        expect(model.scores[task]).toBeGreaterThanOrEqual(1);
        expect(model.scores[task]).toBeLessThanOrEqual(5);
      }
      expect(model.sovereignty).toBeGreaterThanOrEqual(1);
      expect(model.sovereignty).toBeLessThanOrEqual(5);
      expect([1, 2, 3]).toContain(model.speed);
      expect([1, 2, 3]).toContain(model.cost);
    },
  );

  it("has localized strengths and hosting notes for every locale", () => {
    for (const model of MODELS) {
      for (const locale of locales) {
        expect(model.strengths[locale].trim()).not.toBe("");
        expect(model.hosting[locale].trim()).not.toBe("");
      }
    }
  });

  it("keeps hosting notes to jurisdiction and options, not routing claims", () => {
    for (const model of MODELS.filter((entry) => !entry.openWeight)) {
      expect(model.hosting.en).toContain("EU hosting options exist");
      expect(model.hosting.en).not.toMatch(/hosted in|with hosting in|offered through/i);
    }
  });

  it("never states exact prices", () => {
    const text = MODELS.flatMap(strings).join(" ");
    expect(text).not.toMatch(/\d\s?€|€\s?\d/);
  });

  it("has a valid review date", () => {
    expect(LAST_REVIEWED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(LAST_REVIEWED))).toBe(false);
    expect(formatReviewMonth("2026-10-11", "en")).toBe("October 2026");
    expect(formatReviewMonth("2026-10-11", "fr")).toBe("octobre 2026");
    expect(formatReviewMonth("2026-10-11", "nl")).toBe("oktober 2026");
  });
});

describe("page copy", () => {
  const en = MODEL_COMPARATOR_COPY.en;

  it("has the same keys in every locale", () => {
    for (const locale of locales) {
      expect(shape(MODEL_COMPARATOR_COPY[locale])).toEqual(shape(en));
      expect(MODEL_COMPARATOR_COPY[locale].faq.items).toHaveLength(en.faq.items.length);
      expect(MODEL_COMPARATOR_COPY[locale].methodology.items).toHaveLength(
        en.methodology.items.length,
      );
    }
  });

  it("has a non-empty string for every task, priority, reason and field", () => {
    for (const locale of locales) {
      const copy = MODEL_COMPARATOR_COPY[locale];
      for (const task of TASK_IDS) expect(copy.tasks[task]).toBeTruthy();
      for (const priority of PRIORITY_IDS) expect(copy.priorities[priority]).toBeTruthy();
      for (const code of REASON_CODES) expect(copy.reasons[code]).toBeTruthy();
      for (const text of strings(copy)) expect(text.trim()).not.toBe("");
      expect(copy.results.match).toContain("{n}");
      expect(copy.reasonTask).toContain("{task}");
      expect(copy.hero.reviewed).toContain("{date}");
      expect(copy.results.announce).toContain("{model}");
    }
  });

  it("follows the French copy rules", () => {
    const text = strings(MODEL_COMPARATOR_COPY.fr).join("\n");
    expect(text).not.toContain("—");
    expect(text).not.toMatch(/\bSI\b/);
  });
});

describe("rankModels", () => {
  it("returns every model once with a 0–100 match", () => {
    const ranked = rankModels({ tasks: ["coding"], priorities: ["cost", "speed"] });
    expect(ranked.map((entry) => entry.model.id).sort()).toEqual(
      MODELS.map((model) => model.id).sort(),
    );
    for (const entry of ranked) {
      expect(entry.match).toBeGreaterThanOrEqual(0);
      expect(entry.match).toBeLessThanOrEqual(100);
    }
  });

  it("is deterministic regardless of input order", () => {
    const input = { tasks: ["writing", "translation"] as TaskId[], priorities: ["cost"] as PriorityId[] };
    const first = rankModels(input).map((entry) => entry.model.id);
    const reversed = rankModels(input, [...MODELS].reverse()).map((entry) => entry.model.id);
    expect(reversed).toEqual(first);
    expect(rankModels(input).map((entry) => entry.model.id)).toEqual(first);
  });

  it("treats no selected task as all tasks", () => {
    expect(ids([])).toEqual(ids([...TASK_IDS]));
  });

  it("ranks by quality by default", () => {
    expect(ids()).toEqual([
      "openai-gpt",
      "anthropic-claude",
      "google-gemini",
      "mistral-large",
      "meta-llama",
      "mistral-small",
    ]);
  });

  it("puts a European provider first when sovereignty matters", () => {
    expect(ids([], ["sovereignty"])[0]).toBe("mistral-large");
    const mistral = rankModels({ tasks: [], priorities: ["sovereignty"] }).find(
      (entry) => entry.model.id === "mistral-large",
    );
    expect(mistral?.reasons).toContainEqual({ kind: "euProvider" });
  });

  it("moves cheaper models up when cost matters", () => {
    const byQuality = ids();
    const byCost = ids([], ["cost"]);
    const cheapest = MODELS.filter((model) => model.cost === 1).map((model) => model.id);
    expect(cheapest).toContain(byCost[0]);
    expect(byCost.indexOf("mistral-small")).toBeLessThan(byQuality.indexOf("mistral-small"));
    expect(byCost.indexOf("openai-gpt")).toBeGreaterThan(byQuality.indexOf("openai-gpt"));
  });

  it("moves fast models up when speed matters", () => {
    const bySpeed = ids([], ["speed"]);
    expect(bySpeed.slice(0, 2).sort()).toEqual(["meta-llama", "mistral-small"]);
  });

  it("follows the selected tasks", () => {
    expect(ids(["translation"]).slice(0, 2).sort()).toEqual(["mistral-large", "openai-gpt"]);
    expect(ids(["fastChat"])[0]).toBe("mistral-small");
  });

  it("explains recommendations with the strongest selected tasks", () => {
    const [top] = rankModels({ tasks: ["summarising"], priorities: [] });
    expect(top.reasons[0]).toEqual({ kind: "task", task: "summarising" });
  });
});
