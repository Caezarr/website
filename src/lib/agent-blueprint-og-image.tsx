import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { SanityClient } from "next-sanity";
import { getSanityWriteClient } from "@sanity/lib/write-client";
import { blueprintText as t } from "@/lib/agent-blueprint-copy";
import { weeklyHoursSaved } from "@/lib/agent-blueprint-share";
import { lookupSharedBlueprint } from "@/lib/agent-blueprint-share-server";
import { BLUEPRINT_BRAND as brand } from "@/lib/brand-colors";

export const BLUEPRINT_OG_SIZE = { width: 1200, height: 630 };

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}

async function logoDataUri(): Promise<string | null> {
  try {
    const data = await readFile(
      join(process.cwd(), "public/images/brand/wonka-logo-white.png"),
    );
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * Social card of a shared blueprint: sector, headline and the first three
 * agents. Only anonymised fields; unknown ids get a generic card.
 */
export async function renderBlueprintOgImage(
  id: string,
  client: SanityClient | null = getSanityWriteClient(),
): Promise<ImageResponse> {
  const [lookup, logo] = await Promise.all([
    lookupSharedBlueprint(id, client),
    logoDataUri(),
  ]);
  const blueprint = lookup.status === "found" ? lookup.blueprint : null;
  const locale = blueprint?.locale ?? "en";
  const agents = blueprint?.result.agents.slice(0, 3) ?? [];
  const hours = blueprint ? weeklyHoursSaved(blueprint.result) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.black,
          color: brand.white,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={174} height={40} alt="" />
          ) : (
            <span style={{ fontSize: 34, fontWeight: 600 }}>wonka</span>
          )}
          <span
            style={{
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: brand.blue300,
            }}
          >
            {t(locale, "AI agent blueprint")}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {blueprint?.result.sector ? (
            <span style={{ fontSize: 24, color: brand.blue300 }}>
              {truncate(blueprint.result.sector, 70)}
            </span>
          ) : null}
          <span
            style={{
              marginTop: 16,
              fontSize: 50,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {truncate(
              blueprint?.result.headline ??
                t(locale, "Generate the blueprint for your company"),
              110,
            )}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "18px 20px",
                borderRadius: 8,
                border: `1px solid ${brand.darkGray}`,
                background: index === 0 ? brand.blue900 : "transparent",
              }}
            >
              <span style={{ fontSize: 15, color: brand.blue300 }}>
                {`Agent 0${index + 1} · ${agent.weeklyHoursSaved.min}–${agent.weeklyHoursSaved.max}h`}
              </span>
              <span style={{ marginTop: 8, fontSize: 24, lineHeight: 1.2 }}>
                {truncate(agent.name, 48)}
              </span>
            </div>
          ))}
          {hours ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: 170,
              }}
            >
              <span style={{ fontSize: 44, color: brand.green300 }}>
                {`${hours.min}–${hours.max}h`}
              </span>
              <span style={{ fontSize: 18, color: brand.midGray }}>
                {t(locale, "saved / week")}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    ),
    BLUEPRINT_OG_SIZE,
  );
}
