import { blueprintPdfResponse } from "@/lib/agent-blueprint-pdf-response";
import { blueprintPdfPath, parseBlueprintUuid } from "@/lib/agent-blueprint-share";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const uuid = parseBlueprintUuid(id);
  const url = new URL(request.url);
  // One cacheable URL per blueprint: query strings or casing cannot bypass the CDN.
  if (uuid && (uuid !== id || url.search)) {
    return Response.redirect(new URL(blueprintPdfPath(uuid), url), 308);
  }
  return blueprintPdfResponse(id);
}
