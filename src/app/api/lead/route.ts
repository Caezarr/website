import {
  getClientIp,
  hasRecentDuplicateLead,
  isRateLimited,
  isTurnstileRequired,
  normalizeLeadEmail,
  verifyTurnstileToken,
} from "@/lib/lead-api";
import { isLeadSource } from "@/lib/lead-capture";
import { getSanityWriteClient } from "@sanity/lib/write-client";

interface LeadPayload {
  email?: unknown;
  source?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const email = normalizeLeadEmail(payload.email);
  if (!email) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isLeadSource(payload.source)) {
    return Response.json({ error: "Invalid lead source." }, { status: 400 });
  }

  if (isTurnstileRequired()) {
    const valid = await verifyTurnstileToken(payload.turnstileToken);
    if (!valid) {
      return Response.json({ error: "Verification failed. Please try again." }, { status: 403 });
    }
  }

  const client = getSanityWriteClient();
  if (!client) {
    return Response.json(
      { error: "Lead capture is not configured. Missing SANITY_API_WRITE_TOKEN." },
      { status: 503 },
    );
  }

  const clientIp = getClientIp(request);
  if (clientIp) {
    try {
      if (await isRateLimited(client, clientIp)) {
        return Response.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 },
        );
      }
    } catch {
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }
  }

  try {
    if (await hasRecentDuplicateLead(client, email, payload.source)) {
      return Response.json({ ok: true }, { status: 201 });
    }
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  try {
    await client.create({
      _type: "siteLead",
      email,
      submittedAt: new Date().toISOString(),
      source: payload.source,
      ...(clientIp ? { clientIp } : {}),
    });
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
