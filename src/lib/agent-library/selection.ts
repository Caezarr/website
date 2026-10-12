import type { Locale } from "@/i18n/config";

/** Visitor's "my team" list of library entries, kept in localStorage by slug. */
export const SELECTION_STORAGE_KEY = "wonka:agent-library:selection";
export const SELECTION_MAX_ENTRIES = 20;
/** WonkaChat imports at most 3 agents at a time (`.max(3)` in its schema). */
export const WONKACHAT_IMPORT_MAX_AGENTS = 3;

/** WonkaChat origin, same as the Blueprint import. */
export const WONKACHAT_ORIGIN = "https://wonka.chat";
/** WonkaChat signup, where use cases are created by hand. */
export const WONKACHAT_START_URL = `${WONKACHAT_ORIGIN}/register`;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX_LENGTH = 100;

export interface LibrarySelectionIndexEntry {
  slug: string;
  kind: "agent" | "use-case";
  name: string;
}

type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem" | "removeItem">;

export function isLibrarySlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= SLUG_MAX_LENGTH &&
    SLUG_PATTERN.test(value)
  );
}

/** Parses a stored list: unique valid slugs, capped, anything else ignored. */
export function parseSelection(raw: string | null | undefined): string[] {
  if (!raw) return [];
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter(isLibrarySlug))).slice(0, SELECTION_MAX_ENTRIES);
}

export function readSelection(storage: StorageReader | null | undefined): string[] {
  if (!storage) return [];
  try {
    return parseSelection(storage.getItem(SELECTION_STORAGE_KEY));
  } catch {
    return [];
  }
}

/** Saves the list. Returns false when storage is unavailable or full. */
export function writeSelection(
  storage: StorageWriter | null | undefined,
  slugs: string[],
): boolean {
  if (!storage) return false;
  try {
    if (slugs.length) storage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(slugs));
    else storage.removeItem(SELECTION_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export type SelectionToggleResult = {
  slugs: string[];
  action: "add" | "remove" | "full";
};

export function toggleSelection(slugs: string[], slug: string): SelectionToggleResult {
  if (slugs.includes(slug)) {
    return { slugs: slugs.filter((item) => item !== slug), action: "remove" };
  }
  if (slugs.length >= SELECTION_MAX_ENTRIES) return { slugs, action: "full" };
  return { slugs: [...slugs, slug], action: "add" };
}

/** WonkaChat page that imports a signed library selection in one click. */
export function wonkaChatImportUrl(id: string): string {
  return `${WONKACHAT_ORIGIN}/blueprint/${encodeURIComponent(id)}`;
}

export class LibraryImportError extends Error {
  constructor(readonly status: number) {
    super(`Library import failed with status ${status}`);
  }
}

/** Asks the site for a signed, expiring import id for 1 to 3 full agents. */
export async function requestLibraryImportId(
  slugs: string[],
  locale: Locale,
  fetcher: typeof fetch = fetch,
): Promise<string> {
  const response = await fetcher("/api/agent-library/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slugs, locale }),
  });
  if (!response.ok) throw new LibraryImportError(response.status);
  const data = (await response.json()) as { id?: unknown };
  if (typeof data.id !== "string") throw new LibraryImportError(502);
  return data.id;
}
