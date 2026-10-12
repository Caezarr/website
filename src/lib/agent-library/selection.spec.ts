import { describe, expect, it } from "vitest";
import {
  parseSelection,
  readSelection,
  requestLibraryImportId,
  SELECTION_MAX_ENTRIES,
  SELECTION_STORAGE_KEY,
  toggleSelection,
  wonkaChatImportUrl,
  writeSelection,
} from "./selection";

const throwing = {
  getItem: () => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("QuotaExceededError");
  },
  removeItem: () => {
    throw new Error("SecurityError");
  },
};

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

describe("library selection storage", () => {
  it("tolerates missing or throwing storage", () => {
    expect(readSelection(null)).toEqual([]);
    expect(readSelection(throwing)).toEqual([]);
    expect(writeSelection(null, ["a"])).toBe(false);
    expect(writeSelection(throwing, ["a"])).toBe(false);
    expect(writeSelection(throwing, [])).toBe(false);
  });

  it("round-trips through storage and clears the key when empty", () => {
    const storage = memoryStorage();
    expect(writeSelection(storage, ["odoo-quote-builder", "x"])).toBe(true);
    expect(readSelection(storage)).toEqual(["odoo-quote-builder", "x"]);
    expect(writeSelection(storage, [])).toBe(true);
    expect(storage.data.has(SELECTION_STORAGE_KEY)).toBe(false);
  });

  it("ignores corrupt values, duplicates and bad slugs, and caps the list", () => {
    expect(parseSelection("{")).toEqual([]);
    expect(parseSelection('{"a":1}')).toEqual([]);
    expect(parseSelection('["a","a","B","../x",3,"b-c"]')).toEqual(["a", "b-c"]);
    const many = JSON.stringify(Array.from({ length: 40 }, (_, index) => `s${index}`));
    expect(parseSelection(many)).toHaveLength(SELECTION_MAX_ENTRIES);
  });

  it("toggles entries and refuses to grow past the cap", () => {
    expect(toggleSelection([], "a")).toEqual({ slugs: ["a"], action: "add" });
    expect(toggleSelection(["a", "b"], "a")).toEqual({ slugs: ["b"], action: "remove" });
    const full = Array.from({ length: SELECTION_MAX_ENTRIES }, (_, index) => `s${index}`);
    expect(toggleSelection(full, "new").action).toBe("full");
    expect(toggleSelection(full, "s0").action).toBe("remove");
  });
});

describe("library import request", () => {
  it("posts the slugs and builds the WonkaChat URL from the returned id", async () => {
    let body = "";
    const fetcher = (async (_url: string, init?: RequestInit) => {
      body = String(init?.body);
      return Response.json({ id: "agent-blueprint.x" });
    }) as typeof fetch;
    const id = await requestLibraryImportId(["a", "b"], "fr", fetcher);
    expect(JSON.parse(body)).toEqual({ slugs: ["a", "b"], locale: "fr" });
    expect(wonkaChatImportUrl(id)).toBe("https://wonka.chat/blueprint/agent-blueprint.x");
  });

  it("throws on server errors", async () => {
    const fetcher = (async () => Response.json({ error: "unavailable" }, { status: 503 })) as typeof fetch;
    await expect(requestLibraryImportId(["a"], "en", fetcher)).rejects.toThrow();
  });
});
