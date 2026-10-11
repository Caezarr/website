import assert from "node:assert/strict";
import test from "node:test";
import type { SanityClient } from "next-sanity";
import type { AgentBlueprintResult } from "@/lib/agent-blueprint";
import {
  assessmentIdFromUuid,
  parseBlueprintUuid,
  shareableResult,
  sharedBlueprintPath,
  toSharedBlueprint,
  uuidFromAssessmentId,
} from "@/lib/agent-blueprint-share";
import { lookupSharedBlueprint } from "@/lib/agent-blueprint-share-server";
import { blueprintPdfResponse } from "@/lib/agent-blueprint-pdf-response";
import { pdfSafeText } from "@/lib/agent-blueprint-pdf";
import { sanitizeLeadBlueprintId } from "@/lib/lead-api";
import { blueprintMeetingUrl } from "@/lib/agent-blueprint-links";
import { GET as pdfRoute } from "@/app/api/agent-blueprint/[id]/pdf/route";

const UUID = "3f2b8c1e-9a4d-4c6b-8e2f-1a2b3c4d5e6f";

const result: AgentBlueprintResult = {
  sector: "Industrial maintenance services",
  headline: "Three agents to shorten the quote cycle",
  summary: "The company answers many tenders by hand.",
  signals: ["Hiring two estimators"],
  agents: [
    {
      id: "quote-drafter",
      name: "Quote drafter",
      tier: "Human in the loop",
      mission: "Drafts quotes from tender files.",
      whyNow: "Tender volume is growing.",
      trigger: "New tender in the inbox",
      inputs: ["Tender file"],
      tools: ["Outlook", "SharePoint"],
      workflow: ["Reads the tender", "Prices the lines", "Drafts the quote"],
      humanControl: "An estimator approves every quote",
      expectedImpact: "Quotes sent in 2 days instead of 5",
      weeklyHoursSaved: { min: 6, max: 10 },
      effort: "Medium",
      benchmarkPattern: "Tender response automation",
      process: "Tender response",
      companySignal: "The careers page lists estimator roles.",
    },
  ],
  sources: [{ title: "Public source 1", url: "https://acme-industrie.example/about" }],
};

const completedDoc = {
  status: "completed",
  locale: "fr",
  completedAt: new Date().toISOString(),
  sector: result.sector,
  headline: result.headline,
  summary: result.summary,
  wonkachatExport: JSON.stringify({ agents: [] }),
  shareResult: JSON.stringify({ ...result }),
  // Must never leave the server, even if a query ever returned them.
  targetDomain: "acme-industrie.example",
  clientIp: "203.0.113.7",
};

function fakeClient(
  doc: unknown,
  onQuery?: (query: string, params: Record<string, unknown>) => void,
): SanityClient {
  return {
    fetch: async (query: string, params: Record<string, unknown>) => {
      onQuery?.(query, params);
      return doc;
    },
  } as unknown as SanityClient;
}

test("accepts only strict UUID v4 ids", () => {
  assert.equal(parseBlueprintUuid(UUID), UUID);
  assert.equal(parseBlueprintUuid(UUID.toUpperCase()), UUID);
  assert.equal(parseBlueprintUuid(` ${UUID} `), UUID);
  for (const invalid of [
    `agent-blueprint.${UUID}`,
    "3f2b8c1e-9a4d-1c6b-8e2f-1a2b3c4d5e6f", // v1
    "3f2b8c1e-9a4d-4c6b-7e2f-1a2b3c4d5e6f", // bad variant
    `${UUID}/../secrets`,
    `${UUID}x`,
    "",
    null,
    42,
  ]) {
    assert.equal(parseBlueprintUuid(invalid), null, String(invalid));
  }
});

test("maps between public UUIDs and Sanity assessment ids", () => {
  assert.equal(assessmentIdFromUuid(UUID), `agent-blueprint.${UUID}`);
  assert.equal(uuidFromAssessmentId(`agent-blueprint.${UUID}`), UUID);
  assert.equal(uuidFromAssessmentId(UUID), null);
  assert.equal(uuidFromAssessmentId("agent-blueprint.not-a-uuid"), null);
  assert.equal(sharedBlueprintPath(UUID, "en"), `/ai-agent-blueprint/r/${UUID}`);
  assert.equal(sharedBlueprintPath(UUID, "fr"), `/fr/ai-agent-blueprint/r/${UUID}`);
});

test("shares a completed blueprint without sources, domain or IP", () => {
  const shared = toSharedBlueprint(UUID, completedDoc);
  assert.ok(shared);
  assert.equal(shared.locale, "fr");
  assert.equal(shared.importAvailable, true);
  assert.equal(shared.result.agents[0]?.workflow.length, 3);
  const serialized = JSON.stringify(shared);
  assert.ok(!serialized.includes("acme-industrie"));
  assert.ok(!serialized.includes("203.0.113.7"));
  assert.ok(!("sources" in shared.result));
});

test("never shares processing, failed or missing blueprints", () => {
  assert.equal(toSharedBlueprint(UUID, null), null);
  assert.equal(toSharedBlueprint(UUID, { ...completedDoc, status: "processing" }), null);
  assert.equal(toSharedBlueprint(UUID, { ...completedDoc, status: "failed" }), null);
});

test("rebuilds blueprints completed before shareResult existed", () => {
  const shared = toSharedBlueprint(UUID, {
    status: "completed",
    locale: "nl",
    completedAt: "2020-01-01T00:00:00.000Z",
    sector: "Logistics",
    headline: "Two agents for planning",
    summary: "",
    agents: [
      {
        _key: "planner",
        name: "Route planner",
        tier: "Fully autonomous",
        mission: "Plans routes.",
        tools: ["Odoo ERP"],
        expectedImpact: "Fewer empty kilometres",
        weeklyHoursSaved: { min: 3, max: 5 },
        effort: "Low",
      },
    ],
    wonkachatExport: JSON.stringify({
      agents: [{ conversationStarters: ["Plan tomorrow"], trigger: null }],
    }),
  });
  assert.ok(shared);
  assert.equal(shared.importAvailable, false);
  assert.equal(shared.result.agents[0]?.name, "Route planner");
  assert.deepEqual(shared.result.agents[0]?.workflow, []);
  assert.deepEqual(shared.result.agents[0]?.conversationStarters, ["Plan tomorrow"]);
});

test("lookup rejects bad ids before querying and never selects private fields", async () => {
  let queried = false;
  const invalid = await lookupSharedBlueprint(
    "agent-blueprint.not-a-uuid",
    fakeClient(completedDoc, () => {
      queried = true;
    }),
  );
  assert.deepEqual(invalid, { status: "not_found" });
  assert.equal(queried, false);

  let query = "";
  let params: Record<string, unknown> = {};
  const found = await lookupSharedBlueprint(
    UUID,
    fakeClient(completedDoc, (q, p) => {
      query = q;
      params = p;
    }),
  );
  assert.equal(found.status, "found");
  assert.equal(params.id, `agent-blueprint.${UUID}`);
  assert.ok(!query.includes("clientIp"));
  assert.ok(!query.includes("targetDomain"));
});

test("lookup reports Sanity outages separately from unknown ids", async () => {
  const failing = {
    fetch: async () => {
      throw new Error("down");
    },
  } as unknown as SanityClient;
  assert.deepEqual(await lookupSharedBlueprint(UUID, failing), {
    status: "unavailable",
  });
  assert.deepEqual(await lookupSharedBlueprint(UUID, null), {
    status: "unavailable",
  });
});

test("PDF route rejects malformed and non-completed ids", async () => {
  const malformed = await blueprintPdfResponse("../../etc", fakeClient(completedDoc));
  assert.equal(malformed.status, 404);

  for (const status of ["processing", "failed"]) {
    const response = await blueprintPdfResponse(
      UUID,
      fakeClient({ ...completedDoc, status }),
    );
    assert.equal(response.status, 404, status);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  }

  const unknown = await blueprintPdfResponse(UUID, fakeClient(null));
  assert.equal(unknown.status, 404);
});

test("PDF route renders a completed blueprint", async () => {
  const response = await blueprintPdfResponse(UUID, fakeClient(completedDoc));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "application/pdf");
  assert.match(
    response.headers.get("Content-Disposition") ?? "",
    /attachment; filename="wonka-plan-agents-ia\.pdf"/,
  );
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), "%PDF-");
});

test("PDF text keeps accents and drops glyphs the PDF fonts cannot draw", () => {
  assert.equal(pdfSafeText("Économie → 5 h ≥ prévu 🚀"), "Économie -> 5 h >= prévu");
  assert.equal(pdfSafeText("l’entreprise – 3–5 h…"), "l’entreprise – 3–5 h…");
});

test("lead blueprintId keeps only a strict UUID", () => {
  assert.equal(sanitizeLeadBlueprintId(UUID), UUID);
  assert.equal(sanitizeLeadBlueprintId(UUID.toUpperCase()), UUID);
  assert.equal(sanitizeLeadBlueprintId(`agent-blueprint.${UUID}`), undefined);
  assert.equal(sanitizeLeadBlueprintId("<script>"), undefined);
  assert.equal(sanitizeLeadBlueprintId({ id: UUID }), undefined);
  assert.equal(sanitizeLeadBlueprintId(undefined), undefined);
});

test("shareable result keeps only known fields, never sources or extra agent keys", () => {
  const leaky = {
    ...result,
    targetDomain: "acme-industrie.example",
    agents: result.agents.map((agent) => ({
      ...agent,
      companyName: "Acme Industrie",
    })),
  };
  const serialized = JSON.stringify(shareableResult(leaky));
  assert.ok(!serialized.includes("acme-industrie"));
  assert.ok(!serialized.includes("Acme Industrie"));
  assert.ok(!serialized.includes("sources"));

  const stored = toSharedBlueprint(UUID, {
    ...completedDoc,
    shareResult: JSON.stringify(leaky),
  });
  assert.ok(stored);
  assert.ok(!JSON.stringify(stored).includes("Acme Industrie"));
});

test("blueprint booking links keep French visitors on the French calendar", () => {
  assert.match(blueprintMeetingUrl("fr"), /WonkaAIFrance@/);
  assert.match(blueprintMeetingUrl("en"), /WonkaAIFrance@/);
  assert.match(blueprintMeetingUrl("nl"), /WonkaAI@/);
});

test("PDF route redirects query strings and casing to one cacheable URL", async () => {
  const params = (id: string) => ({ params: Promise.resolve({ id }) });
  const busted = await pdfRoute(
    new Request(`https://wonka.test/api/agent-blueprint/${UUID}/pdf?v=1`),
    params(UUID),
  );
  assert.equal(busted.status, 308);
  assert.equal(
    busted.headers.get("Location"),
    `https://wonka.test/api/agent-blueprint/${UUID}/pdf`,
  );

  const upper = await pdfRoute(
    new Request(`https://wonka.test/api/agent-blueprint/${UUID.toUpperCase()}/pdf`),
    params(UUID.toUpperCase()),
  );
  assert.equal(upper.status, 308);
});
