"use client";

import { useState, type CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ConnectedTool } from "@/lib/agent-blueprint-tools";
import {
  agentFilmTimeline,
  type AgentFilmSpec,
  type FilmTimeline,
} from "@/lib/agent-film";
import { cn } from "@/lib/utils";

/**
 * Frame-driven demo of one blueprint agent: trigger → tool calls →
 * deliverable → human check. Every value comes from `spec`; nothing here
 * reads the clock, so the Player and a server render show the same frames.
 * Sizes are in px because the Player scales the 1280×720 canvas as a whole.
 */

const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0 → 1 over `duration` frames starting at `from`. */
function progress(frame: number, from: number, duration: number) {
  return interpolate(frame, [from, from + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

function rise(p: number, distance = 24): CSSProperties {
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` };
}

const tierStyles: Record<AgentFilmSpec["tier"], string> = {
  Copilot: "bg-blue-100 text-blue-900",
  "Human in the loop": "bg-orange-300 text-black",
  "Fully autonomous": "bg-green-200 text-green-900",
};

const logoDevToken =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "pk_W2OQu1QTRouRcByKgmxjCA";

function ToolIcon({ tool, size = 28 }: { tool: ConnectedTool; size?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-black/8 bg-white"
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span className="text-text/65 text-[13px] font-semibold">
          {tool.name.charAt(0)}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- rendered inside the Remotion canvas
        <img
          src={
            tool.iconUrl ??
            `https://img.logo.dev/${tool.domain}?token=${logoDevToken}&size=64&format=png`
          }
          alt=""
          className="size-full object-contain p-[3px]"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

function TierPill({ spec, className }: { spec: AgentFilmSpec; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[13px] font-medium",
        tierStyles[spec.tier],
        className,
      )}
    >
      {spec.labels.tier}
    </span>
  );
}

function Spinner() {
  const frame = useCurrentFrame();
  return (
    <span
      className="block size-4 rounded-full border-2 border-blue-200 border-t-blue-600"
      style={{ transform: `rotate(${frame * 14}deg)` }}
    />
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-4", className)} aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Intro({ spec, frame, timeline }: SceneProps) {
  const { from, duration } = timeline.scenes.intro;
  const enter = progress(frame, from, 18);
  const exit = progress(frame, from + duration - 14, 14);
  if (frame >= from + duration) return null;
  return (
    <AbsoluteFill
      className="bg-light-gray z-20 items-center justify-center px-24 text-center"
      style={{ opacity: 1 - exit }}
    >
      <div style={rise(enter)}>
        <TierPill spec={spec} />
      </div>
      <h2
        className="mt-5 font-serif text-[60px] leading-[1.05] font-normal tracking-[-0.03em] text-black"
        style={rise(progress(frame, from + 6, 20))}
      >
        {spec.agentName}
      </h2>
      <p
        className="text-text/60 mt-4 max-w-[760px] text-[22px] leading-snug"
        style={rise(progress(frame, from + 14, 20))}
      >
        {spec.mission}
      </p>
    </AbsoluteFill>
  );
}

interface SceneProps {
  spec: AgentFilmSpec;
  frame: number;
  timeline: FilmTimeline;
}

function StartMessage({ spec, frame, timeline }: SceneProps) {
  const { from } = timeline.scenes.start;
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - from - 8, fps, config: { damping: 18 } });
  if (frame < from) return null;

  if (spec.start.kind === "message") {
    // The text is typed in the Composer first, then lands here once sent.
    if (frame < from + 62) return null;
    return (
      <div className="flex justify-end" style={rise(progress(frame, from + 62, 12), 12)}>
        <div className="max-w-[420px] rounded-[14px] rounded-br-[4px] bg-black px-4 py-3 text-[15px] leading-snug text-white">
          {spec.start.text}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-3 rounded-[12px] border border-blue-200 bg-blue-50 p-3"
      style={{ opacity: pop, transform: `scale(${0.94 + 0.06 * pop})`, transformOrigin: "top left" }}
    >
      <ToolIcon tool={spec.start.tool} size={32} />
      <div className="min-w-0">
        <p className="text-[12px] font-medium tracking-wide text-blue-700 uppercase">
          {spec.labels.newEvent} · {spec.start.tool.name}
        </p>
        <p className="mt-0.5 text-[15px] leading-snug text-black">{spec.start.text}</p>
      </div>
    </div>
  );
}

function Composer({ spec, frame, timeline }: SceneProps) {
  const { from } = timeline.scenes.start;
  const isMessage = spec.start.kind === "message";
  const typed =
    isMessage && frame < from + 62
      ? spec.start.text.slice(
          0,
          Math.round(
            interpolate(frame, [from + 6, from + 54], [0, spec.start.text.length], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          ),
        )
      : "";
  const caret = typed && Math.floor(frame / 8) % 2 === 0;
  return (
    <div className="border-border flex items-center gap-3 rounded-[14px] border bg-white px-4 py-3">
      <p className={cn("min-w-0 flex-1 truncate text-[15px]", typed ? "text-black" : "text-text/35")}>
        {typed || `${spec.agentName}…`}
        {caret ? <span className="ml-px inline-block h-[18px] w-px translate-y-[3px] bg-black" /> : null}
      </p>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full text-white",
          typed ? "bg-blue-600" : "bg-black/15",
        )}
      >
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
          <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

function Trace({ spec, frame, timeline }: SceneProps) {
  if (frame < timeline.scenes.steps.from) return null;
  return (
    <div className="flex gap-3" style={rise(progress(frame, timeline.scenes.steps.from, 12), 12)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered inside the Remotion canvas */}
        <img src="/images/brand/wonka-logo-mark-white-transparent.png" alt="" className="h-3.5" />
      </span>
      <ol className="border-border min-w-0 flex-1 divide-y divide-dashed divide-black/10 rounded-[12px] border bg-white">
        {spec.steps.map((step, index) => {
          const start = timeline.stepStarts[index];
          if (frame < start) return null;
          const complete = frame >= start + timeline.stepDuration - 10;
          return (
            <li
              key={`${step.action}-${index}`}
              className="flex items-start gap-3 px-3 py-2.5"
              style={rise(progress(frame, start, 10), 8)}
            >
              <ToolIcon tool={step.tool} size={26} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium text-black">{step.action}</p>
                {step.finding ? (
                  <p
                    className="text-text/55 truncate text-[13px]"
                    style={{ opacity: progress(frame, start + timeline.stepDuration - 10, 8) }}
                  >
                    {step.finding}
                  </p>
                ) : null}
              </div>
              <span className="flex h-[26px] items-center">
                {complete ? <Check className="text-green-600" /> : <Spinner />}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ToolsPane({ spec, frame, timeline }: SceneProps) {
  const activeIndex = timeline.stepStarts.findLastIndex((start) => frame >= start);
  const active =
    frame < timeline.scenes.deliverable.from && activeIndex >= 0
      ? spec.steps[activeIndex]?.tool.name
      : undefined;
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-8">
      {spec.tools.map((tool, index) => {
        const isActive = tool.name === active;
        return (
          <div
            key={tool.name}
            className={cn(
              "flex items-center gap-3 rounded-[12px] border bg-white px-3 py-2.5 transition-none",
              isActive ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" : "border-border",
            )}
            style={rise(progress(frame, timeline.scenes.start.from + index * 5, 14), 10)}
          >
            <ToolIcon tool={tool} size={30} />
            <span className="flex-1 text-[15px] font-medium text-black">{tool.name}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[12px]",
                isActive ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800",
              )}
            >
              {isActive ? spec.labels.running : "MCP"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Deliverable({ spec, frame, timeline }: SceneProps) {
  const { from } = timeline.scenes.deliverable;
  const { from: approvalFrom } = timeline.scenes.approval;
  const clickAt = approvalFrom + 44;
  const approved = frame >= clickAt;
  const cursorP = progress(frame, approvalFrom + 12, 30);
  return (
    <div className="flex h-full flex-col gap-3 p-6" style={rise(progress(frame, from, 16), 20)}>
      <article className="border-border min-h-0 flex-1 overflow-hidden rounded-[12px] border bg-white p-5">
        <span className="bg-light-gray text-text/60 rounded-full px-2.5 py-1 text-[12px] font-medium">
          {spec.deliverable.kind}
        </span>
        <h3 className="mt-3 font-serif text-[26px] leading-tight font-normal tracking-[-0.02em] text-black">
          {spec.deliverable.title}
        </h3>
        <div className="mt-3 flex flex-col gap-3">
          {spec.deliverable.sections.map((section, index) => (
            <section
              key={section.heading}
              style={rise(progress(frame, from + 30 + index * 24, 14), 10)}
            >
              <h4 className="text-[12px] font-semibold tracking-wide text-blue-700 uppercase">
                {section.heading}
              </h4>
              <p className="text-text/75 mt-0.5 line-clamp-2 text-[14px] leading-snug">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
      {frame >= approvalFrom ? (
        <div
          className="relative flex items-center gap-3 rounded-[12px] border border-green-600/40 bg-green-50 px-4 py-3"
          style={rise(progress(frame, approvalFrom, 12), 10)}
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-green-100 text-green-800">
            <Check />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium tracking-wide text-green-800 uppercase">
              {spec.labels.humanCheck}
            </p>
            <p className="truncate text-[14px] text-black">{spec.humanControl}</p>
          </div>
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium text-white",
              approved ? "bg-green-600" : "bg-black",
            )}
            style={{ transform: `scale(${frame >= clickAt - 3 && frame < clickAt + 3 ? 0.94 : 1})` }}
          >
            {approved ? <Check /> : null}
            {approved ? spec.labels.actionDone : spec.labels.action}
          </span>
          {frame < clickAt + 20 ? (
            <svg
              viewBox="0 0 24 24"
              className="absolute size-6 drop-shadow"
              style={{
                right: interpolate(cursorP, [0, 1], [260, 40]),
                top: interpolate(cursorP, [0, 1], [-60, 26]),
              }}
              aria-hidden
            >
              <path d="M5 3l14 8-6 1.5L10 19z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Outro({ spec, frame, timeline }: SceneProps) {
  const { from } = timeline.scenes.outro;
  if (frame < from) return null;
  const enter = progress(frame, from, 18);
  return (
    <AbsoluteFill
      className="z-20 items-center justify-center bg-black px-24 text-center text-white"
      style={{ opacity: enter }}
    >
      <p
        className="font-serif text-[112px] leading-none font-normal tracking-[-0.03em] text-blue-300 lining-nums tabular-nums"
        style={rise(progress(frame, from + 6, 20))}
      >
        {spec.hours.min}–{spec.hours.max}h
      </p>
      <p className="mt-3 text-[22px] text-white/70" style={rise(progress(frame, from + 12, 20))}>
        {spec.labels.hours}
      </p>
      <div className="mt-10 flex items-center gap-2" style={rise(progress(frame, from + 22, 20))}>
        {spec.tools.map((tool) => (
          <ToolIcon key={tool.name} tool={tool} size={34} />
        ))}
      </div>
      <p className="mt-4 text-[16px] text-white/55" style={rise(progress(frame, from + 28, 20))}>
        {spec.labels.builtWith}
      </p>
    </AbsoluteFill>
  );
}

export function AgentFilm({ spec }: { spec: AgentFilmSpec }) {
  const frame = useCurrentFrame();
  const timeline = agentFilmTimeline(spec);
  const props = { spec, frame, timeline };
  const showDeliverable = frame >= timeline.scenes.deliverable.from;
  const windowIn = progress(frame, timeline.scenes.intro.duration - 14, 22);

  return (
    <AbsoluteFill className="bg-light-gray font-sans">
      <AbsoluteFill className="items-center justify-center">
        <div
          className="border-border flex h-[640px] w-[1200px] flex-col overflow-hidden rounded-[18px] border bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]"
          style={{ opacity: windowIn, transform: `scale(${0.96 + 0.04 * windowIn})` }}
        >
          <header className="border-border flex items-center gap-3 border-b px-5 py-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element -- rendered inside the Remotion canvas */}
              <img src="/images/brand/wonka-logo-mark-white-transparent.png" alt="" className="h-3.5" />
            </span>
            <p className="truncate text-[16px] font-semibold text-black">{spec.agentName}</p>
            <TierPill spec={spec} className="px-2.5 py-0.5 text-[12px]" />
            <div className="ml-auto flex items-center gap-1.5">
              {spec.tools.map((tool) => (
                <ToolIcon key={tool.name} tool={tool} size={24} />
              ))}
            </div>
          </header>
          <div className="flex min-h-0 flex-1">
            <div className="flex w-[54%] min-w-0 flex-col gap-4 p-6">
              <div className="flex min-h-0 flex-1 flex-col gap-4">
                <StartMessage {...props} />
                <Trace {...props} />
              </div>
              <Composer {...props} />
            </div>
            <div className="border-border bg-light-gray/60 min-w-0 flex-1 border-l border-dashed">
              {showDeliverable ? <Deliverable {...props} /> : <ToolsPane {...props} />}
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <span className="text-text/45 absolute bottom-3 left-5 z-30 text-[12px]">
        {spec.labels.demoData}
      </span>
      <Intro {...props} />
      <Outro {...props} />
    </AbsoluteFill>
  );
}
