import { getSanityWriteClient } from "@sanity/lib/write-client";
import { isWonkaChatExportExpired } from "@/lib/agent-blueprint-wonkachat";
import { resolveLibraryExport } from "@/lib/agent-library";
import {
  getLibraryExportSecret,
  isAuthorizedLibraryExportRequest,
} from "@/lib/agent-library/export-token";

export const dynamic = "force-dynamic";

/** Matches the contract shared with WonkaChat's blueprint import. */
const BLUEPRINT_ID_PATTERN =
  /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const NO_STORE = { "Cache-Control": "no-store" };
/** Library exports carry full agent instructions: never cached by a CDN. */
const LIBRARY_NO_STORE = { "Cache-Control": "private, no-store" };

function notFound() {
  return Response.json(
    { error: "not_found" },
    { status: 404, headers: NO_STORE },
  );
}

interface AssessmentExportDoc {
  status?: string;
  completedAt?: string;
  wonkachatExport?: string;
}

/**
 * Structured agent setup for WonkaChat's one-click import. The assessment id
 * is an unguessable uuid, so it doubles as the capability to read the export.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!BLUEPRINT_ID_PATTERN.test(id)) return notFound();

  // Agent library selections are signed, expiring ids issued by
  // POST /api/agent-library/import: the selection is decoded from the id and
  // served from code, never read from Sanity. Random assessment ids fail the
  // 70-bit signature check and fall through to Sanity below.
  const library = resolveLibraryExport(id, getLibraryExportSecret());
  if (library) {
    if (library.status === "expired") return notFound();
    if (!isAuthorizedLibraryExportRequest(request.headers)) return notFound();
    return Response.json(library.payload, { headers: LIBRARY_NO_STORE });
  }

  // Assessments are written (and only readable) with the server-side token:
  // ids with a dot are private in Sanity, never exposed to the public client.
  const client = getSanityWriteClient();
  if (!client) {
    return Response.json(
      { error: "unavailable" },
      { status: 503, headers: NO_STORE },
    );
  }

  let doc: AssessmentExportDoc | undefined;
  try {
    doc = await client.getDocument<AssessmentExportDoc>(id);
  } catch {
    return Response.json(
      { error: "unavailable" },
      { status: 503, headers: NO_STORE },
    );
  }

  if (doc?.status !== "completed" || !doc.wonkachatExport) return notFound();
  // The id is a capability URL that can leak: exports stop being importable after a while.
  if (isWonkaChatExportExpired(doc.completedAt)) return notFound();

  let payload: unknown;
  try {
    payload = JSON.parse(doc.wonkachatExport);
  } catch {
    return notFound();
  }

  return Response.json(payload, { headers: NO_STORE });
}
