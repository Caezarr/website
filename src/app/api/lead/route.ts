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
import { qualifyLead } from "@/lib/lead-qualification";

interface LeadPayload {
  email?: unknown;
  source?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
  analytics?: unknown;
}

const ANALYTICS_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "landing_page",
  "landing_path",
  "referrer",
  "posthog_distinct_id",
  "posthog_session_id",
] as const;

function sanitizeAnalytics(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  return Object.fromEntries(
    ANALYTICS_KEYS.flatMap((key) => {
      const item = input[key];
      return typeof item === "string" && item.trim() ? [[key, item.trim().slice(0, 2_000)]] : [];
    }),
  );
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
    const duplicate = await hasRecentDuplicateLead(client, email, payload.source);
    if (duplicate) {
      return Response.json(
        {
          ok: true,
          leadId: duplicate._id,
          lifecycleStage: duplicate.lifecycleStage || "lead",
          leadScore: duplicate.qualificationScore || 0,
        },
        { status: 201 },
      );
    }
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  try {
    const attribution = sanitizeAnalytics(payload.analytics);
    const qualification = qualifyLead(email, payload.source, attribution);
    const lead = await client.create({
      _type: "siteLead",
      email,
      submittedAt: new Date().toISOString(),
      source: payload.source,
      lifecycleStage: qualification.lifecycleStage,
      qualificationScore: qualification.score,
      qualificationSignals: qualification.signals,
      attribution,
      crmExportStatus: "ready",
      ...(clientIp ? { clientIp } : {}),
    });

    return Response.json(
      {
        ok: true,
        leadId: lead._id,
        lifecycleStage: qualification.lifecycleStage,
        leadScore: qualification.score,
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

}
