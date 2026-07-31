import { isLeadSource } from "@/lib/lead-capture";
import { getSanityWriteClient } from "@sanity/lib/write-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadPayload {
  email?: unknown;
  source?: unknown;
  website?: unknown;
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) return null;
  return email;
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

  const email = normalizeEmail(payload.email);
  if (!email) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isLeadSource(payload.source)) {
    return Response.json({ error: "Invalid lead source." }, { status: 400 });
  }

  const client = getSanityWriteClient();
  if (!client) {
    return Response.json(
      { error: "Lead capture is not configured. Missing SANITY_API_WRITE_TOKEN." },
      { status: 503 },
    );
  }

  try {
    await client.create({
      _type: "siteLead",
      email,
      submittedAt: new Date().toISOString(),
      source: payload.source,
    });
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
