import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import {
  decodeLibraryExportId,
  encodeLibraryExportId,
  getLibraryExportSecret,
  isAuthorizedLibraryExportRequest,
  LIBRARY_EXPORT_TTL_HOURS,
} from "./export-token";

/** Same contract as the export route and WonkaChat's import. */
const BLUEPRINT_ID_PATTERN =
  /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const SECRET = "not-a-real-secret-token-test";
const NOW = new Date("2026-10-12T10:30:00Z");
const HOUR = 60 * 60 * 1000;

function flipHex(id: string, index: number): string {
  const chars = id.split("");
  chars[index] = chars[index] === "0" ? "1" : "0";
  return chars.join("");
}

describe("library export token", () => {
  it("round-trips codes and locale in a valid uuid v4 id", () => {
    for (const locale of locales) {
      for (const codes of [[1], [255, 2], [7, 42, 60]]) {
        const id = encodeLibraryExportId({ codes, locale, now: NOW }, SECRET);
        expect(id).toMatch(BLUEPRINT_ID_PATTERN);
        const decoded = decodeLibraryExportId(id, SECRET, NOW);
        expect(decoded).toMatchObject({ ok: true, codes, locale });
      }
    }
  });

  it("expires after the TTL", () => {
    const id = encodeLibraryExportId({ codes: [3], locale: "en", now: NOW }, SECRET);
    const almost = new Date(NOW.getTime() + (LIBRARY_EXPORT_TTL_HOURS - 1) * HOUR);
    const after = new Date(NOW.getTime() + (LIBRARY_EXPORT_TTL_HOURS + 2) * HOUR);
    expect(decodeLibraryExportId(id, SECRET, almost).ok).toBe(true);
    expect(decodeLibraryExportId(id, SECRET, after)).toEqual({ ok: false, reason: "expired" });
  });

  it("rejects tampered ids", () => {
    const id = encodeLibraryExportId({ codes: [1, 2], locale: "fr", now: NOW }, SECRET);
    // Every free hex digit, skipping the prefix, dashes and the version nibble.
    const prefix = "agent-blueprint.".length;
    for (let index = prefix; index < id.length; index++) {
      const offset = index - prefix;
      if ([8, 13, 14, 18, 19, 23].includes(offset)) continue;
      const tampered = flipHex(id, index);
      if (!BLUEPRINT_ID_PATTERN.test(tampered)) continue;
      expect(decodeLibraryExportId(tampered, SECRET, NOW).ok).toBe(false);
    }
  });

  it("rejects ids signed with another secret, and random assessment ids", () => {
    const id = encodeLibraryExportId({ codes: [9], locale: "nl", now: NOW }, SECRET);
    expect(decodeLibraryExportId(id, "another-secret", NOW)).toEqual({ ok: false, reason: "signature" });
    expect(decodeLibraryExportId(id, "", NOW).ok).toBe(false);
    for (let run = 0; run < 50; run++) {
      const random = `agent-blueprint.${crypto.randomUUID()}`;
      expect(decodeLibraryExportId(random, SECRET, NOW).ok).toBe(false);
    }
    expect(decodeLibraryExportId("agent-blueprint.not-a-uuid", SECRET, NOW).ok).toBe(false);
  });

  it("refuses invalid selections", () => {
    const encode = (codes: number[]) => () =>
      encodeLibraryExportId({ codes, locale: "en", now: NOW }, SECRET);
    expect(encode([])).toThrow();
    expect(encode([1, 2, 3, 4])).toThrow();
    expect(encode([0])).toThrow();
    expect(encode([256])).toThrow();
    expect(encode([1.5])).toThrow();
  });
});

describe("library export secret and auth", () => {
  it("has no secret in production without the env var", () => {
    expect(getLibraryExportSecret({ NODE_ENV: "production" })).toBeNull();
    expect(getLibraryExportSecret({ NODE_ENV: "production", AGENT_LIBRARY_EXPORT_SECRET: " s3cret " })).toBe("s3cret");
    expect(getLibraryExportSecret({ NODE_ENV: "development" })).toMatch(/^dev-only/);
  });

  it("only requires a bearer token when one is configured", () => {
    const headers = (value?: string) => new Headers(value ? { Authorization: value } : {});
    expect(isAuthorizedLibraryExportRequest(headers(), undefined)).toBe(true);
    expect(isAuthorizedLibraryExportRequest(headers(), "")).toBe(true);
    expect(isAuthorizedLibraryExportRequest(headers(), "token-1")).toBe(false);
    expect(isAuthorizedLibraryExportRequest(headers("Bearer token-2"), "token-1")).toBe(false);
    expect(isAuthorizedLibraryExportRequest(headers("token-1"), "token-1")).toBe(false);
    expect(isAuthorizedLibraryExportRequest(headers("Bearer token-1"), "token-1")).toBe(true);
    expect(isAuthorizedLibraryExportRequest(headers("bearer token-1"), "token-1")).toBe(true);
  });
});
