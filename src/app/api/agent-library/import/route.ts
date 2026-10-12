import { locales, type Locale } from "@/i18n/config";
import { getLibraryAgent } from "@/lib/agent-library";
import {
  encodeLibraryExportId,
  getLibraryExportSecret,
  LIBRARY_EXPORT_MAX_AGENTS,
} from "@/lib/agent-library/export-token";
import { isLibrarySlug } from "@/lib/agent-library/selection";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 1024;
const NO_STORE = { "Cache-Control": "no-store" };

function error(code: string, status: number) {
  return Response.json({ error: code }, { status, headers: NO_STORE });
}

/**
 * Issues a signed, expiring WonkaChat import id for 1 to 3 full library
 * agents. The id carries the selection itself, so nothing is stored.
 */
export async function POST(request: Request) {
  const secret = getLibraryExportSecret();
  if (!secret) return error("unavailable", 503);

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return error("unsupported_media_type", 415);
  }
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return error("payload_too_large", 413);

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return error("invalid_body", 400);
  }
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return error("payload_too_large", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return error("invalid_body", 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return error("invalid_body", 400);
  }
  const { slugs, locale, ...rest } = body as Record<string, unknown>;
  if (Object.keys(rest).length) return error("invalid_body", 400);
  if (typeof locale !== "string" || !(locales as readonly string[]).includes(locale)) {
    return error("invalid_locale", 400);
  }
  if (
    !Array.isArray(slugs) ||
    slugs.length < 1 ||
    slugs.length > LIBRARY_EXPORT_MAX_AGENTS ||
    !slugs.every(isLibrarySlug) ||
    new Set(slugs).size !== slugs.length
  ) {
    return error("invalid_selection", 400);
  }

  const codes = slugs.flatMap((slug) => getLibraryAgent(slug)?.code ?? []);
  if (codes.length !== slugs.length) return error("invalid_selection", 400);

  const id = encodeLibraryExportId({ codes, locale: locale as Locale }, secret);
  return Response.json({ id }, { headers: NO_STORE });
}
