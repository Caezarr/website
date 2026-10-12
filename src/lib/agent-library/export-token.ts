import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { Locale } from "@/i18n/config";

const big = (value: number) => BigInt(value);

/**
 * Signed, expiring WonkaChat import ids for a selection of library agents.
 *
 * WonkaChat only imports ids shaped `agent-blueprint.<uuid v4>`. A v4 uuid has
 * 122 free bits once the version nibble and the variant bits are fixed, so the
 * id is a stateless token packed into those bits (most significant first):
 *
 *   version 4 | locale 2 | count 2 | code 8 | code 8 | code 8 | expiry 20 | mac 70
 *
 * - version: token format, currently 1.
 * - locale: 0 en, 1 fr, 2 nl.
 * - count: number of agents, 1 to 3. Unused code slots are 0.
 * - code: stable agent code from the catalogue (1 to 255).
 * - expiry: last valid hour, counted in hours since 2026-01-01 UTC.
 * - mac: first 70 bits of HMAC-SHA256(secret, domain + payload).
 */

export const LIBRARY_EXPORT_TOKEN_VERSION = 1;
export const LIBRARY_EXPORT_MAX_AGENTS = 3;
export const LIBRARY_EXPORT_TTL_HOURS = 30 * 24;
export const LIBRARY_EXPORT_MAX_CODE = 255;

const ID_PREFIX = "agent-blueprint.";
const ID_PATTERN =
  /^agent-blueprint\.([0-9a-f]{8})-([0-9a-f]{4})-4([0-9a-f]{3})-([89ab][0-9a-f]{3})-([0-9a-f]{12})$/i;

const EPOCH_MS = Date.UTC(2026, 0, 1);
const HOUR_MS = 60 * 60 * 1000;

const CODE_BITS = big(8);
const EXPIRY_BITS = big(20);
const MAC_BITS = big(70);
const PAYLOAD_BYTES = 7;
const MAC_DOMAIN = Buffer.from("wonka-agent-library-export\u0000", "utf8");

const LOCALE_CODES: Record<Locale, number> = { en: 0, fr: 1, nl: 2 };
const LOCALES_BY_CODE: Record<number, Locale> = { 0: "en", 1: "fr", 2: "nl" };

const DEV_FALLBACK_SECRET = "dev-only-insecure-agent-library-export-secret";

export interface LibraryExportSelection {
  codes: number[];
  locale: Locale;
  expiresAt: Date;
}

export type LibraryExportDecodeResult =
  | ({ ok: true } & LibraryExportSelection)
  | { ok: false; reason: "format" | "signature" | "expired" };

const mask = (bits: bigint) => (big(1) << bits) - big(1);

function hourIndex(date: Date): number {
  return Math.floor((date.getTime() - EPOCH_MS) / HOUR_MS);
}

function payloadBytes(payload: bigint): Buffer {
  const bytes = Buffer.alloc(PAYLOAD_BYTES);
  let rest = payload;
  for (let index = PAYLOAD_BYTES - 1; index >= 0; index--) {
    bytes[index] = Number(rest & big(0xff));
    rest >>= big(8);
  }
  return bytes;
}

function macFor(payload: bigint, secret: string): bigint {
  const digest = createHmac("sha256", secret)
    .update(MAC_DOMAIN)
    .update(payloadBytes(payload))
    .digest();
  // First 72 bits, shifted down to the first 70.
  return BigInt(`0x${digest.subarray(0, 9).toString("hex")}`) >> big(2);
}

function macBuffer(mac: bigint): Buffer {
  return Buffer.from(mac.toString(16).padStart(18, "0"), "hex");
}

function toUuid(bits: bigint): string {
  const high = bits >> big(74);
  const middle = (bits >> big(62)) & mask(big(12));
  const low = bits & mask(big(62));
  const value = (high << big(80)) | (big(4) << big(76)) | (middle << big(64)) | (big(2) << big(62)) | low;
  const hex = value.toString(16).padStart(32, "0");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function fromUuidParts(match: RegExpExecArray): bigint {
  const [, first, second, third, fourth, fifth] = match;
  const value = BigInt(`0x${first}${second}4${third}${fourth}${fifth}`);
  const high = value >> big(80);
  const middle = (value >> big(64)) & mask(big(12));
  const low = value & mask(big(62));
  return (high << big(74)) | (middle << big(62)) | low;
}

/** Packs a selection of agent codes into a signed WonkaChat import id. */
export function encodeLibraryExportId(
  input: { codes: number[]; locale: Locale; now?: Date },
  secret: string,
): string {
  const { codes, locale, now = new Date() } = input;
  if (!secret) throw new Error("Missing export secret");
  if (codes.length < 1 || codes.length > LIBRARY_EXPORT_MAX_AGENTS) {
    throw new Error("A library export holds 1 to 3 agents");
  }
  for (const code of codes) {
    if (!Number.isInteger(code) || code < 1 || code > LIBRARY_EXPORT_MAX_CODE) {
      throw new Error(`Invalid agent code: ${code}`);
    }
  }
  const expiry = hourIndex(now) + LIBRARY_EXPORT_TTL_HOURS;
  if (expiry < 0 || expiry > Number(mask(EXPIRY_BITS))) {
    throw new Error("Export expiry out of range");
  }

  let payload = BigInt(LIBRARY_EXPORT_TOKEN_VERSION);
  payload = (payload << big(2)) | BigInt(LOCALE_CODES[locale]);
  payload = (payload << big(2)) | BigInt(codes.length);
  for (let slot = 0; slot < LIBRARY_EXPORT_MAX_AGENTS; slot++) {
    payload = (payload << CODE_BITS) | BigInt(codes[slot] ?? 0);
  }
  payload = (payload << EXPIRY_BITS) | BigInt(expiry);

  return `${ID_PREFIX}${toUuid((payload << MAC_BITS) | macFor(payload, secret))}`;
}

/**
 * Verifies a library import id: format, signature (constant time), then
 * expiry. Random ids (real Blueprint assessments) fail the signature check.
 */
export function decodeLibraryExportId(
  id: string,
  secret: string,
  now: Date = new Date(),
): LibraryExportDecodeResult {
  const match = ID_PATTERN.exec(id);
  if (!match || !secret) return { ok: false, reason: "format" };

  const bits = fromUuidParts(match);
  const payload = bits >> MAC_BITS;
  const mac = bits & mask(MAC_BITS);
  if (!timingSafeEqual(macBuffer(mac), macBuffer(macFor(payload, secret)))) {
    return { ok: false, reason: "signature" };
  }

  const expiry = Number(payload & mask(EXPIRY_BITS));
  const codeSlots = Array.from({ length: LIBRARY_EXPORT_MAX_AGENTS }, (_, slot) =>
    Number(
      (payload >> (EXPIRY_BITS + CODE_BITS * BigInt(LIBRARY_EXPORT_MAX_AGENTS - 1 - slot))) &
        mask(CODE_BITS),
    ),
  );
  const head = payload >> (EXPIRY_BITS + CODE_BITS * BigInt(LIBRARY_EXPORT_MAX_AGENTS));
  const count = Number(head & big(3));
  const locale = LOCALES_BY_CODE[Number((head >> big(2)) & big(3))];
  const version = Number(head >> big(4));

  const codes = codeSlots.slice(0, count);
  if (
    version !== LIBRARY_EXPORT_TOKEN_VERSION ||
    !locale ||
    count < 1 ||
    codes.some((code) => code < 1) ||
    codeSlots.slice(count).some((code) => code !== 0)
  ) {
    return { ok: false, reason: "format" };
  }
  if (hourIndex(now) > expiry) return { ok: false, reason: "expired" };

  return {
    ok: true,
    codes,
    locale,
    expiresAt: new Date(EPOCH_MS + (expiry + 1) * HOUR_MS),
  };
}

let warnedAboutFallback = false;

/**
 * Secret that signs library import ids. Production without a secret returns
 * null (the import is switched off); development uses an obvious fallback.
 */
export function getLibraryExportSecret(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const secret = env.AGENT_LIBRARY_EXPORT_SECRET?.trim();
  if (secret) return secret;
  if (env.NODE_ENV === "production") return null;
  if (!warnedAboutFallback) {
    warnedAboutFallback = true;
    console.warn(
      "[agent-library] AGENT_LIBRARY_EXPORT_SECRET is not set: using an insecure development-only secret.",
    );
  }
  return DEV_FALLBACK_SECRET;
}

function safeEqual(a: string, b: string): boolean {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

/**
 * Optional server-to-server auth for library exports: when
 * WONKACHAT_EXPORT_TOKEN is set, WonkaChat must send it as a bearer token.
 */
export function isAuthorizedLibraryExportRequest(
  headers: Headers,
  expected: string | undefined = process.env.WONKACHAT_EXPORT_TOKEN,
): boolean {
  const token = expected?.trim();
  if (!token) return true;
  const match = /^Bearer\s+(\S+)$/i.exec(headers.get("authorization")?.trim() ?? "");
  return Boolean(match && safeEqual(match[1], token));
}
