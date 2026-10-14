import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { SanityClient } from "next-sanity";
import { getSanityWriteClient } from "@sanity/lib/write-client";
import {
  BLUEPRINT_WONKACHAT_URL,
  blueprintMeetingUrl,
  wonkaChatImportUrl,
} from "@/lib/agent-blueprint-links";
import {
  blueprintPdfFilename,
  renderBlueprintPdf,
} from "@/lib/agent-blueprint-pdf";
import {
  assessmentIdFromUuid,
  sharedBlueprintPath,
} from "@/lib/agent-blueprint-share";
import { lookupSharedBlueprint } from "@/lib/agent-blueprint-share-server";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Completed blueprints never change, so the CDN keeps each PDF for a day:
 * only the first download of a blueprint renders it. Kept short enough that
 * the WonkaChat import link disappears soon after the export expires.
 */
export const PDF_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

async function readLogo(): Promise<Buffer | null> {
  try {
    return await readFile(
      join(process.cwd(), "public/images/brand/wonka-logo-black.png"),
    );
  } catch {
    return null;
  }
}

/**
 * GET /api/agent-blueprint/[id]/pdf: branded PDF of a completed blueprint.
 * 404 for malformed, unknown, processing or failed ids.
 */
export async function blueprintPdfResponse(
  id: unknown,
  client: SanityClient | null = getSanityWriteClient(),
): Promise<Response> {
  const lookup = await lookupSharedBlueprint(id, client);
  if (lookup.status === "not_found") {
    return Response.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
  }
  if (lookup.status === "unavailable") {
    return Response.json({ error: "unavailable" }, { status: 503, headers: NO_STORE });
  }

  const { blueprint } = lookup;
  const locale = blueprint.locale;

  let pdf: Buffer;
  try {
    pdf = await renderBlueprintPdf(
      blueprint,
      {
        meetingUrl: blueprintMeetingUrl(locale),
        wonkaChatUrl: blueprint.importAvailable
          ? wonkaChatImportUrl(
              BLUEPRINT_WONKACHAT_URL,
              assessmentIdFromUuid(blueprint.uuid),
            )
          : BLUEPRINT_WONKACHAT_URL,
        importAvailable: blueprint.importAvailable,
        shareUrl: `${getSiteUrl()}${sharedBlueprintPath(blueprint.uuid, locale)}`,
      },
      await readLogo(),
    );
  } catch (error) {
    console.error("Agent blueprint PDF failed", {
      id: blueprint.uuid,
      error: error instanceof Error ? error.message : "unknown",
    });
    return Response.json({ error: "server_error" }, { status: 500, headers: NO_STORE });
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${blueprintPdfFilename(locale)}"`,
      "Content-Length": String(pdf.byteLength),
      "Cache-Control": PDF_CACHE_CONTROL,
      "X-Robots-Tag": "noindex",
    },
  });
}
