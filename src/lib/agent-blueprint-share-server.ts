import { cache } from "react";
import type { SanityClient } from "next-sanity";
import { getSanityWriteClient } from "@sanity/lib/write-client";
import {
  assessmentIdFromUuid,
  parseBlueprintUuid,
  SHARED_BLUEPRINT_PROJECTION,
  toSharedBlueprint,
  type SharedBlueprint,
  type SharedBlueprintDoc,
} from "@/lib/agent-blueprint-share";

export type SharedBlueprintLookup =
  | { status: "found"; blueprint: SharedBlueprint }
  | { status: "not_found" }
  | { status: "unavailable" };

/**
 * Reads a completed blueprint for public display. Assessment ids contain a
 * dot, so they are private in Sanity and only readable with the server token.
 */
export async function lookupSharedBlueprint(
  rawId: unknown,
  client: SanityClient | null = getSanityWriteClient(),
): Promise<SharedBlueprintLookup> {
  const uuid = parseBlueprintUuid(rawId);
  if (!uuid) return { status: "not_found" };
  if (!client) return { status: "unavailable" };

  let doc: SharedBlueprintDoc | null;
  try {
    doc = await client.fetch<SharedBlueprintDoc | null>(
      `*[_type == "agentBlueprintAssessment" && _id == $id][0]${SHARED_BLUEPRINT_PROJECTION}`,
      { id: assessmentIdFromUuid(uuid) },
    );
  } catch {
    return { status: "unavailable" };
  }

  const blueprint = toSharedBlueprint(uuid, doc);
  return blueprint ? { status: "found", blueprint } : { status: "not_found" };
}

/**
 * Deduped per request: the page and its metadata share one read. Throws when
 * Sanity is unreachable so ISR keeps serving the last good render instead of
 * caching a 404.
 */
export const getSharedBlueprint = cache(
  async (rawId: string): Promise<SharedBlueprint | null> => {
    const lookup = await lookupSharedBlueprint(rawId);
    if (lookup.status === "unavailable") {
      throw new Error("Shared blueprint lookup unavailable");
    }
    return lookup.status === "found" ? lookup.blueprint : null;
  },
);
