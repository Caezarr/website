import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/agent-blueprint/[id]/wonkachat/route";
import { LIBRARY_AGENTS, LIBRARY_USE_CASES } from "@/lib/agent-library";
import { POST } from "./route";

const SECRET = "not-a-real-secret-route-test";

function post(body: unknown, headers: Record<string, string> = {}) {
  return POST(
    new Request("http://localhost/api/agent-library/import", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

function get(id: string, headers: Record<string, string> = {}) {
  return GET(new Request(`http://localhost/api/agent-blueprint/${id}/wonkachat`, { headers }), {
    params: Promise.resolve({ id }),
  });
}

async function issue(slugs: string[], locale = "en"): Promise<string> {
  const response = await post({ slugs, locale });
  expect(response.status).toBe(200);
  return ((await response.json()) as { id: string }).id;
}

describe("POST /api/agent-library/import", () => {
  beforeEach(() => {
    vi.stubEnv("AGENT_LIBRARY_EXPORT_SECRET", SECRET);
    vi.stubEnv("WONKACHAT_EXPORT_TOKEN", "");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("issues a signed id for 1 to 3 full agents", async () => {
    const id = await issue(LIBRARY_AGENTS.slice(0, 3).map((agent) => agent.slug), "nl");
    expect(id).toMatch(
      /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it("rejects more than 3 agents, use cases, unknown slugs and bad bodies", async () => {
    const slugs = LIBRARY_AGENTS.slice(0, 4).map((agent) => agent.slug);
    expect((await post({ slugs, locale: "en" })).status).toBe(400);
    expect((await post({ slugs: [], locale: "en" })).status).toBe(400);
    expect((await post({ slugs: [LIBRARY_USE_CASES[0].slug], locale: "en" })).status).toBe(400);
    expect((await post({ slugs: ["nope"], locale: "en" })).status).toBe(400);
    expect((await post({ slugs: [slugs[0], slugs[0]], locale: "en" })).status).toBe(400);
    expect((await post({ slugs: [slugs[0]], locale: "de" })).status).toBe(400);
    expect((await post({ slugs: [slugs[0]], locale: "en", extra: 1 })).status).toBe(400);
    expect((await post("not json")).status).toBe(400);
    expect((await post(["array"])).status).toBe(400);
    expect((await post({ slugs: [slugs[0]], locale: "en", pad: "x".repeat(2000) })).status).toBe(413);
    expect(
      (await post({ slugs: [slugs[0]], locale: "en" }, { "Content-Type": "text/plain" })).status,
    ).toBe(415);
  });

  it("is unavailable in production without a secret", async () => {
    vi.stubEnv("AGENT_LIBRARY_EXPORT_SECRET", "");
    vi.stubEnv("NODE_ENV", "production");
    expect((await post({ slugs: [LIBRARY_AGENTS[0].slug], locale: "en" })).status).toBe(503);
  });
});

describe("GET /api/agent-blueprint/[id]/wonkachat for library selections", () => {
  beforeEach(() => {
    vi.stubEnv("AGENT_LIBRARY_EXPORT_SECRET", SECRET);
    vi.stubEnv("WONKACHAT_EXPORT_TOKEN", "");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("serves the selected agents without public caching", async () => {
    const team = LIBRARY_AGENTS.slice(5, 7);
    const id = await issue(team.map((agent) => agent.slug), "fr");
    const response = await get(id);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    const payload = (await response.json()) as { blueprintId: string; locale: string; agents: Array<{ key: string }> };
    expect(payload.blueprintId).toBe(id);
    expect(payload.locale).toBe("fr");
    expect(payload.agents.map((agent) => agent.key)).toEqual(team.map((agent) => agent.slug));
  });

  it("requires the bearer token when WONKACHAT_EXPORT_TOKEN is set", async () => {
    const id = await issue([LIBRARY_AGENTS[0].slug]);
    vi.stubEnv("WONKACHAT_EXPORT_TOKEN", "server-token");
    expect((await get(id)).status).toBe(404);
    expect((await get(id, { Authorization: "Bearer wrong" })).status).toBe(404);
    expect((await get(id, { Authorization: "Bearer server-token" })).status).toBe(200);
  });

  it("does not serve a selection signed with another secret", async () => {
    const id = await issue([LIBRARY_AGENTS[0].slug]);
    vi.stubEnv("AGENT_LIBRARY_EXPORT_SECRET", "rotated-secret-0123456789");
    vi.stubEnv("SANITY_API_WRITE_TOKEN", "");
    expect([404, 503]).toContain((await get(id)).status);
  });
});
