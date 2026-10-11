"use client";

import { Player } from "@remotion/player";
import { useReducedMotion } from "motion/react";
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import {
  AGENT_FILM_FPS,
  AGENT_FILM_HEIGHT,
  AGENT_FILM_WIDTH,
  type AgentFilmSpec,
  agentFilmTimeline,
  buildAgentFilmSpec,
} from "@/lib/agent-film";
import { AgentFilm } from "./agent-film";

/** Live, in-browser demo film from a resolved spec. No server render. */
export function AgentFilmSpecPlayer({
  spec,
  playerKey,
}: {
  spec: AgentFilmSpec;
  playerKey?: string;
}) {
  const reducedMotion = useReducedMotion();
  const inputProps = useMemo(() => ({ spec }), [spec]);
  const { total } = agentFilmTimeline(spec);

  return (
    <Player
      key={playerKey}
      component={AgentFilm}
      inputProps={inputProps}
      durationInFrames={total}
      fps={AGENT_FILM_FPS}
      compositionWidth={AGENT_FILM_WIDTH}
      compositionHeight={AGENT_FILM_HEIGHT}
      autoPlay={!reducedMotion}
      initiallyMuted
      loop
      controls
      clickToPlay
      style={{ width: "100%", aspectRatio: `${AGENT_FILM_WIDTH} / ${AGENT_FILM_HEIGHT}` }}
    />
  );
}

/** Live, in-browser demo film of one blueprint agent. No server render. */
export default function AgentFilmPlayer({
  agent,
  locale,
}: {
  agent: AgentBlueprintAgent;
  locale: Locale;
}) {
  const spec = useMemo(() => buildAgentFilmSpec(agent, locale), [agent, locale]);
  return <AgentFilmSpecPlayer spec={spec} playerKey={agent.id} />;
}
