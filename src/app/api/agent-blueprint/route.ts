import {
  getClientIp,
  isTurnstileRequired,
  normalizeLeadEmail,
  verifyTurnstileToken,
} from "@/lib/lead-api";
import {
  anonymizeBlueprint,
  anonymizeCompanyResearch,
  normalizeTarget,
} from "@/lib/agent-blueprint";
import { isAgentBlueprintRateLimited } from "@/lib/agent-blueprint-rate-limit";
import { researchCompany, designAgents } from "@/lib/agent-blueprint-requesty";
import { searchBenchmark } from "@/lib/agent-blueprint-search";
import { getSanityWriteClient } from "@sanity/lib/write-client";

interface CreatePayload {
  target?: unknown;
  anonymous?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
}

interface UpdatePayload {
  assessmentId?: unknown;
  email?: unknown;
  event?: unknown;
  website?: unknown;
}

const ASSESSMENT_ID_PATTERN =
  /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function publicError(status = 500) {
  return Response.json(
    { error: "We could not build the blueprint right now. Please try again." },
    { status },
  );
}

export async function POST(request: Request) {
  let payload: CreatePayload;
  try {
    payload = (await request.json()) as CreatePayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const target = normalizeTarget(payload.target);
  if (!target) {
    return Response.json(
      { error: "Enter a valid company website or work email." },
      { status: 400 },
    );
  }

  if (payload.anonymous !== true) {
    return Response.json(
      { error: "Confirm anonymous output before starting." },
      { status: 400 },
    );
  }

  if (isTurnstileRequired()) {
    const valid = await verifyTurnstileToken(payload.turnstileToken);
    if (!valid) {
      return Response.json(
        { error: "Verification failed. Please try again." },
        { status: 403 },
      );
    }
  }

  const client = getSanityWriteClient();
  if (!client) return publicError(503);

  const clientIp = getClientIp(request);
  if (clientIp) {
    try {
      if (await isAgentBlueprintRateLimited(client, clientIp)) {
        return Response.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 },
        );
      }
    } catch {
      return publicError();
    }
  }

  const assessmentId = `agent-blueprint.${crypto.randomUUID()}`;
  const now = new Date().toISOString();

  try {
    await client.create({
      _id: assessmentId,
      _type: "agentBlueprintAssessment",
      targetDomain: target.domain,
      ...(target.email
        ? { submittedEmail: target.email, emailCapturedAt: now }
        : {}),
      anonymous: true,
      status: "processing",
      submittedAt: now,
      requestyModel: process.env.REQUESTY_AGENT_BLUEPRINT_MODEL?.trim(),
      ...(clientIp ? { clientIp } : {}),
    });
  } catch {
    return publicError();
  }

  try {
    const research = await researchCompany(target.domain, assessmentId);
    const { context, identifiers } = anonymizeCompanyResearch(
      research.value,
      target.domain,
    );
    const benchmark = await searchBenchmark(context);
    if (benchmark.length < 3) {
      throw new Error("Not enough benchmark matches");
    }

    const blueprint = await designAgents(context, benchmark, assessmentId);
    const result = {
      ...anonymizeBlueprint(blueprint.value, identifiers),
      sources: research.sources.map((source, index) => ({
        title: `Public source ${index + 1}`,
        url: source.url,
      })),
    };
    const completedAt = new Date().toISOString();
    const responseIds = [research.responseId, blueprint.responseId].filter(
      (value): value is string => Boolean(value),
    );
    const requestCost = [research.cost, blueprint.cost]
      .filter((value): value is number => typeof value === "number")
      .reduce((sum, cost) => sum + cost, 0);

    await client
      .patch(assessmentId)
      .set({
        status: "completed",
        sector: result.sector,
        headline: result.headline,
        summary: result.summary,
        agents: result.agents.map((agent) => ({
          _key: agent.id,
          name: agent.name,
          tier: agent.tier,
          mission: agent.mission,
          tools: agent.tools,
          expectedImpact: agent.expectedImpact,
          weeklyHoursSaved: agent.weeklyHoursSaved,
          effort: agent.effort,
        })),
        sources: result.sources.map((source, index) => ({
          _key: `source-${index + 1}`,
          ...source,
        })),
        completedAt,
        requestyResponseIds: responseIds,
        ...(requestCost > 0 ? { requestCost } : {}),
      })
      .unset(["errorCode"])
      .commit();

    return Response.json(
      {
        assessmentId,
        emailCaptured: Boolean(target.email),
        result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Agent blueprint generation failed", {
      assessmentId,
      error: error instanceof Error ? error.message : "unknown",
    });
    await client
      .patch(assessmentId)
      .set({
        status: "failed",
        errorCode: "generation_failed",
        completedAt: new Date().toISOString(),
      })
      .commit()
      .catch(() => undefined);
    return publicError();
  }
}

export async function PATCH(request: Request) {
  let payload: UpdatePayload;
  try {
    payload = (await request.json()) as UpdatePayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  if (
    typeof payload.assessmentId !== "string" ||
    !ASSESSMENT_ID_PATTERN.test(payload.assessmentId)
  ) {
    return Response.json({ error: "Invalid assessment." }, { status: 400 });
  }

  const client = getSanityWriteClient();
  if (!client) return publicError(503);

  const now = new Date().toISOString();
  if (payload.event === "demo_clicked") {
    await client
      .patch(payload.assessmentId)
      .setIfMissing({ demoClickedAt: now })
      .commit()
      .catch(() => undefined);
    return Response.json({ ok: true });
  }

  const email = normalizeLeadEmail(payload.email);
  if (!email) {
    return Response.json(
      { error: "Enter a valid work email." },
      { status: 400 },
    );
  }

  try {
    await client
      .patch(payload.assessmentId)
      .set({
        submittedEmail: email,
        emailCapturedAt: now,
      })
      .commit();
  } catch {
    return publicError();
  }

  return Response.json({ ok: true });
}
