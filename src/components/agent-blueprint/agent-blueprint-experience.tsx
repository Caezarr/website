"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  isTurnstileEnabled,
  TurnstileWidget,
} from "@/components/turnstile-widget";
import {
  AwardBadge,
  BackedBy,
  HERO_BG_IMAGE,
} from "@/components/sections/hero";
import { HeroMarquee } from "@/components/sections/hero-marquee";
import { Button, ButtonLink } from "@/components/ui/button";
import { headingClass } from "@/lib/design-tokens";
import type {
  AgentBlueprintAgent,
  AgentBlueprintResult,
  BlueprintStage,
  BlueprintStreamEvent,
} from "@/lib/agent-blueprint";
import {
  type ConnectedTool,
  resolveConnectedTools,
} from "@/lib/agent-blueprint-tools";
import { cn } from "@/lib/utils";
import {
  BLUEPRINT_INPUT_ID,
  focusBlueprintInput,
} from "./blueprint-scroll-button";

type ExperienceState = "idle" | "loading" | "result" | "error";

interface BlueprintApiResponse {
  assessmentId: string;
  result: AgentBlueprintResult;
}

const progressStages: Array<{
  stage: BlueprintStage;
  label: string;
  detail: string;
  progress: [number, number];
}> = [
  {
    stage: "crawl",
    label: "Reading your website",
    detail: "Services, products, sectors, careers and customer pages",
    progress: [4, 16],
  },
  {
    stage: "research",
    label: "Mapping how your company works",
    detail: "Offerings, value chain, hiring signals and regulation",
    progress: [16, 52],
  },
  {
    stage: "benchmark",
    label: "Matching 570 real use cases",
    detail: "One search per high-potential process",
    progress: [52, 60],
  },
  {
    stage: "design",
    label: "Designing your three agents",
    detail: "Workflows, integrations, controls and time saved",
    progress: [60, 96],
  },
];

const heroReassurance = [
  "Free",
  "No sign-up",
  "Anonymous by default",
  "About a minute",
];

function isNdjson(response: Response) {
  return (response.headers.get("content-type") ?? "").includes(
    "application/x-ndjson",
  );
}

async function readBlueprintStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (event: BlueprintStreamEvent) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const lines = buffer.split("\n");
    buffer = done ? "" : (lines.pop() ?? "");
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        onEvent(JSON.parse(line) as BlueprintStreamEvent);
      } catch {
        // Ignore a malformed line rather than dropping the whole blueprint.
      }
    }
    if (done) break;
  }
}

/**
 * Autocomplete is off on the website inputs because recent Chrome paints an
 * opaque autofill background with !important. This keeps text readable if a
 * browser or password manager fills the field anyway.
 */
const autofillReset =
  "autofill:[-webkit-text-fill-color:var(--color-white)] autofill:[caret-color:var(--color-white)] autofill:[transition:background-color_9999s_ease-out_0s]";

/** 52 weeks / 12 months / 8h working day. */
function hoursPerWeekToDaysPerMonth(hours: number) {
  return Math.round(((hours * 52) / 12 / 8) * 10) / 10;
}

const tierStyles: Record<AgentBlueprintAgent["tier"], string> = {
  Copilot: "bg-blue-100 text-blue-900",
  "Human in the loop": "bg-orange-300 text-black",
  "Fully autonomous": "bg-green-200 text-green-900",
};

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2.5c.55 5.45 4.05 8.95 9.5 9.5-5.45.55-8.95 4.05-9.5 9.5C11.45 16.05 7.95 12.55 2.5 12 7.95 11.45 11.45 7.95 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

type FoundryMode = "idle" | "loading" | "result";

const idleTiers = [
  ["Copilot", "Works side by side with your team"],
  ["Human in the loop", "Acts, then asks for approval"],
  ["Fully autonomous", "Runs scheduled, controlled workflows"],
] as const;

function FoundryPanel({
  mode,
  stageIndex,
  insights,
  agents,
  selectedIndex,
  onSelect,
}: {
  mode: FoundryMode;
  stageIndex: number;
  insights: string[];
  agents: AgentBlueprintAgent[] | null;
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const reducedMotion = useReducedMotion();
  const isLoading = mode === "loading";
  const stage = progressStages[Math.max(stageIndex, 0)] ?? progressStages[0]!;
  const creepKey = `${mode}-${stageIndex}`;
  const [creepState, setCreepState] = useState({ key: creepKey, value: 0 });
  const creep = creepState.key === creepKey ? creepState.value : 0;

  // Model calls take a while; creep within the current stage's range so the
  // bar never looks frozen, without ever reaching the next stage.
  useEffect(() => {
    if (!isLoading) return;
    const interval = window.setInterval(
      () =>
        setCreepState((current) => ({
          key: creepKey,
          value: Math.min(
            (current.key === creepKey ? current.value : 0) + 0.04,
            0.92,
          ),
        })),
      900,
    );
    return () => window.clearInterval(interval);
  }, [creepKey, isLoading]);

  const [from, to] = stage.progress;
  const progress =
    mode === "result"
      ? 100
      : isLoading
        ? Math.round(from + (to - from) * creep)
        : 6;
  const totalHours = agents?.reduce(
    (total, agent) => ({
      min: total.min + agent.weeklyHoursSaved.min,
      max: total.max + agent.weeklyHoursSaved.max,
    }),
    { min: 0, max: 0 },
  );

  return (
    <div
      id="agent-foundry"
      className="scroll-mt-24 overflow-hidden rounded-sm border border-white/20 bg-black/55 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-4 border-b border-dashed border-white/15 px-5 py-4 md:px-6">
        <div className="min-w-0">
          <span className="type-eyebrow text-white/45">
            {mode === "result" ? "Blueprint ready" : "Agent foundry"}
          </span>
          <p className="type-paragraph-m-bold mt-1 text-white">
            {mode === "result"
              ? "Your agent team is ready"
              : isLoading
                ? stage.label
                : "Your agent team will appear here"}
          </p>
        </div>
        {mode === "result" && totalHours ? (
          <div className="shrink-0 text-right">
            <p className="type-h6 text-blue-300 tabular-nums">
              {totalHours.min}–{totalHours.max}h
            </p>
            <p className="type-paragraph-s text-white/45">saved / week</p>
          </div>
        ) : (
          <span className="type-paragraph-s flex shrink-0 items-center gap-2 text-green-300">
            <motion.span
              className="size-2 rounded-full bg-green-400"
              animate={
                isLoading && !reducedMotion
                  ? { opacity: [0.35, 1, 0.35] }
                  : undefined
              }
              transition={{ duration: 1.3, repeat: Infinity }}
            />
            Private
          </span>
        )}
      </div>

      <div className="px-5 py-5 md:px-6 md:py-6">
        <div className="h-1 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className={cn(
              "h-full rounded-full",
              mode === "result" ? "bg-green-400" : "bg-blue-400",
            )}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
          />
        </div>

        {isLoading ? (
          <div className="mt-5">
            <ol className="grid grid-cols-4 gap-2">
              {progressStages.map((item, index) => (
                <li
                  key={item.stage}
                  className={cn(
                    "type-paragraph-s border-t pt-2 transition-colors",
                    index < stageIndex
                      ? "border-green-300/60 text-green-300"
                      : index === stageIndex
                        ? "border-blue-300 text-white"
                        : "border-white/12 text-white/30",
                  )}
                >
                  {index < stageIndex ? "✓ " : ""}
                  {["Website", "Operations", "Benchmark", "Agents"][index]}
                </li>
              ))}
            </ol>

            <div className="mt-5 min-h-[15.5rem] rounded-sm border border-white/12 bg-white/[0.03] p-4">
              <p className="type-eyebrow text-white/40">What we are finding</p>
              <ul className="mt-3 grid gap-2.5">
                {insights.slice(-6).map((insight) => (
                  <motion.li
                    key={insight}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="type-paragraph-s flex gap-2.5 text-white/80"
                  >
                    <span aria-hidden className="text-blue-300">
                      ›
                    </span>
                    <span>{insight}</span>
                  </motion.li>
                ))}
                <li className="type-paragraph-s flex gap-2.5 text-white/40">
                  <motion.span
                    aria-hidden
                    className="text-blue-300"
                    animate={
                      reducedMotion ? undefined : { opacity: [0.2, 1, 0.2] }
                    }
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    ●
                  </motion.span>
                  {stage.detail}…
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {(mode === "result" && agents
              ? agents.map((agent) => [agent.tier, agent.name] as const)
              : idleTiers
            ).map(([tier, detail], index) => {
              const agent = mode === "result" ? agents?.[index] : undefined;
              const isSelected = Boolean(agent) && selectedIndex === index;
              const content = (
                <>
                  <div
                    className={cn(
                      "relative flex size-10 items-center justify-center rounded-full border",
                      agent
                        ? "border-green-300/30 bg-green-300/15 text-green-300"
                        : "border-white/15 bg-white/[0.06] text-blue-300",
                    )}
                  >
                    {agent ? (
                      <span aria-hidden>✓</span>
                    ) : (
                      <SparkIcon className="size-4" />
                    )}
                  </div>
                  <div className="relative min-w-0">
                    <p
                      className={cn(
                        agent
                          ? "type-paragraph-s text-white/50"
                          : "type-paragraph-m-bold text-white/85",
                      )}
                    >
                      {tier}
                    </p>
                    <p
                      className={cn(
                        "mt-1",
                        agent
                          ? "type-paragraph-m-bold text-white"
                          : "type-paragraph-s text-white/55",
                      )}
                    >
                      {detail}
                    </p>
                  </div>
                  <span className="type-paragraph-s relative text-right text-white/55">
                    {agent
                      ? `${agent.weeklyHoursSaved.min}–${agent.weeklyHoursSaved.max}h/w`
                      : `0${index + 1}`}
                  </span>
                </>
              );
              const rowClass = cn(
                "relative grid min-h-[5.4rem] w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 overflow-hidden rounded-sm border px-4 py-3 text-left",
                agent
                  ? isSelected
                    ? "border-blue-300/60 bg-blue-400/[0.12]"
                    : "border-white/15 bg-white/[0.05] transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                  : "border-white/12 bg-white/[0.04]",
              );

              return agent ? (
                <motion.button
                  key={agent.id}
                  type="button"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.12 }}
                  onClick={() => onSelect(index)}
                  className={cn(
                    rowClass,
                    "focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none",
                  )}
                >
                  {content}
                </motion.button>
              ) : (
                <div key={tier} className={rowClass}>
                  {content}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-dashed border-white/12 pt-4">
          {mode === "result" ? (
            <>
              <p className="type-paragraph-s text-white/50">
                Tap an agent for its workflow and integrations
              </p>
              <button
                type="button"
                onClick={() => onSelect(selectedIndex)}
                className="type-paragraph-s shrink-0 text-blue-300 underline-offset-4 hover:underline"
              >
                Full blueprint <span aria-hidden>↓</span>
              </button>
            </>
          ) : (
            <>
              <p className="type-paragraph-s text-white/50">
                {isLoading
                  ? "Built from your own website, not a template"
                  : "Website → operations → benchmark → agents"}
              </p>
              <p className="type-paragraph-s shrink-0 text-white/65">
                {isLoading ? `${progress}%` : "≈ 1 min"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const logoDevToken =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "pk_W2OQu1QTRouRcByKgmxjCA";

function ToolLogo({ tool }: { tool: ConnectedTool }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[0.4rem] border border-black/8 bg-white">
      {failed ? (
        <span className="type-paragraph-s text-text/65 font-semibold">
          {tool.name.charAt(0)}
        </span>
      ) : (
        <Image
          src={
            tool.iconUrl ??
            `https://img.logo.dev/${tool.domain}?token=${logoDevToken}&size=48&format=png`
          }
          alt=""
          width={32}
          height={32}
          unoptimized
          className="size-8 object-contain p-1"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

function ToolChain({ tools }: { tools: string[] }) {
  const connectedTools = resolveConnectedTools(tools);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {connectedTools.map((tool) => (
        <div
          key={tool.name}
          className="border-border bg-light-gray flex min-h-12 items-center gap-2.5 rounded-sm border px-2.5 py-2"
        >
          <ToolLogo tool={tool} />
          <span className="type-paragraph-s text-text/70 min-w-0 truncate">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function AgentDetailPanel({
  agent,
  index,
  meetingUrl,
  onBook,
}: {
  agent: AgentBlueprintAgent;
  index: number;
  meetingUrl: string;
  onBook: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      key={agent.id}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      id="agent-detail-panel"
      className="border-border scroll-mt-20 overflow-hidden rounded-sm border bg-white"
    >
      <div className="border-border flex flex-col gap-5 border-b border-dashed p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
            <SparkIcon className="size-4" />
          </div>
          <div>
            <span
              className={cn(
                "type-paragraph-s inline-flex rounded-full px-2.5 py-1",
                tierStyles[agent.tier],
              )}
            >
              {agent.tier}
            </span>
            <h3 className="type-h5 mt-2">{agent.name}</h3>
          </div>
        </div>
        <div className="flex items-end gap-2 sm:text-right">
          <span className="type-h4 text-blue-700">
            {agent.weeklyHoursSaved.min}–{agent.weeklyHoursSaved.max}h
          </span>
          <span className="type-paragraph-s text-text/45 pb-1">
            saved / week
          </span>
        </div>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
        <div>
          <p className="type-eyebrow text-text/35">{agent.process}</p>
          <p className="type-body mt-2">{agent.mission}</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-blue-200">
            <div className="bg-blue-100 p-4">
              <p className="type-eyebrow text-blue-700">What we saw</p>
              <p className="type-paragraph-m text-text/75 mt-2">
                {agent.companySignal}
              </p>
            </div>
            <div className="bg-blue-100 p-4">
              <p className="type-eyebrow text-blue-700">Why now</p>
              <p className="type-paragraph-m text-text/75 mt-2">
                {agent.whyNow}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="type-eyebrow text-text/35">Suggested stack</p>
              <p className="type-paragraph-s text-text/35">
                Example integrations
              </p>
            </div>
            <div className="mt-3">
              <ToolChain tools={agent.tools} />
            </div>
          </div>
        </div>
        <div className="bg-mid-gray rounded-sm p-5">
          <div className="flex items-center justify-between">
            <p className="type-eyebrow text-text/35">How it works</p>
            <span className="type-eyebrow text-text/25">
              Agent 0{index + 1}
            </span>
          </div>
          <ol className="mt-4 space-y-3">
            {agent.workflow.map((step, stepIndex) => (
              <li
                key={step}
                className="type-paragraph-s text-text/70 flex gap-3"
              >
                <span className="text-blue-600">0{stepIndex + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="border-border mt-5 border-t border-dashed pt-4">
            <p className="type-paragraph-s text-text/50">Human control</p>
            <p className="type-paragraph-m-bold mt-1">{agent.humanControl}</p>
          </div>
        </div>
      </div>

      <div className="border-border grid border-t border-dashed sm:grid-cols-[1fr_1fr_auto]">
        <div className="p-4 md:px-6">
          <p className="type-paragraph-s text-text/40">Business impact</p>
          <p className="type-paragraph-m-bold mt-1">{agent.expectedImpact}</p>
        </div>
        <div className="border-border border-t border-dashed p-4 sm:border-t-0 sm:border-l md:px-6">
          <p className="type-paragraph-s text-text/40">Build effort</p>
          <p className="type-paragraph-m-bold mt-1">{agent.effort}</p>
        </div>
        <div className="border-border flex items-center border-t border-dashed p-4 sm:border-t-0 sm:border-l md:px-6">
          <ButtonLink
            href={meetingUrl}
            onClick={onBook}
            data-track="meeting"
            data-meeting-type="general"
            data-blueprint-cta="agent_detail"
            variant="secondary"
          >
            Scope this agent
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}

function BlueprintResults({
  response,
  meetingUrl,
  wonkaChatUrl,
  onReset,
  selectedAgentIndex,
  onSelectAgent,
}: {
  response: BlueprintApiResponse;
  meetingUrl: string;
  wonkaChatUrl: string;
  onReset: () => void;
  selectedAgentIndex: number;
  onSelectAgent: (index: number, scroll: boolean) => void;
}) {
  const selectedAgent = response.result.agents[selectedAgentIndex];
  const firstAgent = response.result.agents[0];
  const weeklySavings = useMemo(
    () =>
      response.result.agents.reduce(
        (total, agent) => ({
          min: total.min + agent.weeklyHoursSaved.min,
          max: total.max + agent.weeklyHoursSaved.max,
        }),
        { min: 0, max: 0 },
      ),
    [response.result.agents],
  );

  const trackDemoClick = useCallback(() => {
    void fetch("/api/agent-blueprint", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assessmentId: response.assessmentId,
        event: "demo_clicked",
      }),
      keepalive: true,
    });
  }, [response.assessmentId]);

  const impactTiles = [
    {
      value: `${weeklySavings.min}–${weeklySavings.max}h`,
      label: "returned to the team every week",
    },
    {
      value: `${hoursPerWeekToDaysPerMonth(weeklySavings.min)}–${hoursPerWeekToDaysPerMonth(weeklySavings.max)}`,
      label: "working days freed up every month",
    },
    {
      value: String(response.result.agents.length),
      label: "agents, from copilot to autonomous",
    },
  ];

  return (
    <section
      id="blueprint-results"
      className="border-border bg-light-gray scroll-mt-16 border-t border-dashed"
    >
      <div className="mx-auto max-w-[84rem] px-6 py-10 md:px-8 md:py-14 lg:px-12">
        <div className="border-border border-b border-dashed pb-8">
          <span className="type-eyebrow text-blue-700">
            Your blueprint is ready
          </span>
          <h2 className={cn(headingClass.section, "mt-3 max-w-5xl")}>
            {response.result.headline}
          </h2>
          <p className="type-paragraph-m text-text/55 mt-3 max-w-4xl">
            {response.result.summary}
          </p>
          {response.result.signals.length ? (
            <div className="mt-6">
              <p className="type-eyebrow text-text/40">
                What shaped your blueprint
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {response.result.signals.map((signal) => (
                  <li
                    key={signal}
                    className="type-paragraph-s border-border text-text/70 rounded-full border bg-white px-3 py-1.5"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <ul className="border-border mt-7 grid overflow-hidden rounded-sm border border-dashed bg-white sm:grid-cols-3">
            {impactTiles.map((tile, index) => (
              <li
                key={tile.label}
                className={cn(
                  "p-5 md:px-6",
                  index > 0 &&
                    "border-border border-t border-dashed sm:border-t-0 sm:border-l",
                )}
              >
                <p className="type-h4 text-blue-700 tabular-nums">
                  {tile.value}
                </p>
                <p className="type-paragraph-s text-text/55 mt-1">
                  {tile.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="type-paragraph-m-bold">
                Choose an agent to explore
              </p>
              <p className="type-paragraph-s text-text/45 mt-1">
                Compare the workflow, integrations and weekly time saved.
              </p>
            </div>
            <p className="type-paragraph-s text-text/35 hidden sm:block">
              {selectedAgentIndex + 1} of {response.result.agents.length}
            </p>
          </div>

          <div
            className="border-border bg-border mt-3 flex snap-x gap-px overflow-x-auto rounded-sm border sm:grid sm:grid-cols-3 sm:overflow-visible"
            role="tablist"
            aria-label="Recommended agents"
          >
            {response.result.agents.map((agent, index) => {
              const isSelected = selectedAgentIndex === index;
              return (
                <button
                  key={agent.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectAgent(index, window.innerWidth < 1024)}
                  className={cn(
                    "group relative min-w-[15rem] flex-1 snap-start p-4 text-left transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:min-w-0",
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white hover:bg-blue-100",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "type-eyebrow",
                        isSelected ? "text-blue-300" : "text-text/35",
                      )}
                    >
                      Agent 0{index + 1}
                      {index === 0 ? " · Start here" : ""}
                    </span>
                    <span className="type-paragraph-s">
                      {agent.weeklyHoursSaved.min}–{agent.weeklyHoursSaved.max}
                      h/w
                    </span>
                  </div>
                  <p className="type-paragraph-m-bold mt-3 min-h-10">
                    {agent.name}
                  </p>
                  <p
                    className={cn(
                      "type-paragraph-s mt-1",
                      isSelected ? "text-white/50" : "text-text/45",
                    )}
                  >
                    {agent.tier}
                  </p>
                  <div
                    className={cn(
                      "type-paragraph-s mt-4 flex items-center justify-between border-t pt-3",
                      isSelected
                        ? "border-white/12 text-blue-300"
                        : "border-border text-text/55",
                    )}
                  >
                    <span>{isSelected ? "Viewing now" : "View details"}</span>
                    <span aria-hidden>{isSelected ? "●" : "→"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {selectedAgent ? (
                <AgentDetailPanel
                  key={selectedAgent.id}
                  agent={selectedAgent}
                  index={selectedAgentIndex}
                  meetingUrl={meetingUrl}
                  onBook={trackDemoClick}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div
          data-theme="dark"
          className="bg-background text-text relative isolate mt-6 overflow-hidden rounded-sm"
        >
          <Image
            src="/images/CTA/cta-bg.avif"
            alt=""
            fill
            sizes="(min-width: 84rem) 84rem, 100vw"
            className="-z-10 object-cover opacity-70"
          />
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="type-eyebrow text-blue-300">Next step</span>
              <h3 className={cn(headingClass.subsection, "mt-3 max-w-[24ch]")}>
                {firstAgent
                  ? `Build “${firstAgent.name}” first and get ${firstAgent.weeklyHoursSaved.min}–${firstAgent.weeklyHoursSaved.max}h back every week.`
                  : "Turn this blueprint into your first live agent."}
              </h3>
              <ul className="mt-6 grid gap-2.5">
                {[
                  "30-minute call with a Wonka AI engineer",
                  "Validate volumes, integrations and ROI",
                  "Leave with a scoped delivery plan",
                ].map((item) => (
                  <li
                    key={item}
                    className="type-paragraph-m text-text/80 flex items-center gap-3"
                  >
                    <span aria-hidden className="text-green-300">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <ButtonLink
                href={wonkaChatUrl}
                data-track="wonkachat_start"
                data-blueprint-cta="results_panel"
              >
                Use my agents now
              </ButtonLink>
              <Link
                href={meetingUrl}
                onClick={trackDemoClick}
                data-track="meeting"
                data-meeting-type="general"
                data-blueprint-cta="results_panel_call"
                className="type-paragraph-m text-text/80 hover:text-text underline underline-offset-4"
              >
                Book a 30 min call
              </Link>
              <p className="type-paragraph-s text-text/50 lg:text-right">
                Backed by Nvidia Inception and Microsoft for Startups.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="type-paragraph-s text-text/40 max-w-3xl">
            Time savings are directional estimates based on recurring tasks in
            the benchmark. Validate them against real volumes before investment.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="type-paragraph-s text-text/60 hover:text-text underline underline-offset-4"
          >
            Try another company
          </button>
        </div>
      </div>
    </section>
  );
}

function StickyBar({
  state,
  weeklySavings,
  meetingUrl,
  wonkaChatUrl,
  onBook,
  formInView,
}: {
  state: ExperienceState;
  weeklySavings: { min: number; max: number } | null;
  meetingUrl: string;
  wonkaChatUrl: string;
  onBook: () => void;
  formInView: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const hasResult = state === "result" && weeklySavings;
  const visible = !formInView && state !== "loading";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reducedMotion ? false : { y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          data-theme="dark"
          className="bg-background/85 text-text fixed inset-x-2 bottom-2 z-40 mx-auto flex max-w-[52rem] items-center justify-between gap-4 rounded-sm border border-white/15 py-2.5 pr-2.5 pl-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:pl-5"
        >
          <p className="type-paragraph-s text-text/80 min-w-0">
            {hasResult ? (
              <>
                <span className="text-text font-medium">
                  {weeklySavings.min}–{weeklySavings.max}h/week
                </span>
                <span className="hidden sm:inline">
                  {" "}
                  identified for your team
                </span>
              </>
            ) : (
              <>
                <span className="text-text font-medium">
                  Free AI agent blueprint
                </span>
                <span className="hidden sm:inline">
                  {" "}
                  · ready in about a minute
                </span>
              </>
            )}
          </p>
          {hasResult ? (
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={meetingUrl}
                onClick={onBook}
                data-track="meeting"
                data-meeting-type="general"
                data-blueprint-cta="sticky_bar_call"
                className="type-paragraph-s text-text/70 hover:text-text hidden underline underline-offset-4 sm:inline"
              >
                Book a 30 min call
              </Link>
              <ButtonLink
                href={wonkaChatUrl}
                data-track="wonkachat_start"
                data-blueprint-cta="sticky_bar"
              >
                Use my agents
              </ButtonLink>
            </div>
          ) : (
            <Button
              type="button"
              onClick={focusBlueprintInput}
              data-track="blueprint_scroll_to_form"
              className="shrink-0"
            >
              Get mine
            </Button>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function AgentBlueprintExperience({
  meetingUrl,
  wonkaChatUrl,
  children,
}: {
  meetingUrl: string;
  wonkaChatUrl: string;
  children?: React.ReactNode;
}) {
  const formId = useId();
  const reducedMotion = useReducedMotion();
  const turnstileEnabled = isTurnstileEnabled();
  const heroFormRef = useRef<HTMLFormElement>(null);
  const footerFormRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ExperienceState>("idle");
  const [response, setResponse] = useState<BlueprintApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [insights, setInsights] = useState<string[]>([]);
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [formsInView, setFormsInView] = useState<Set<Element>>(new Set());

  useEffect(() => {
    const forms = [heroFormRef.current, footerFormRef.current].filter(
      (form): form is HTMLFormElement => form !== null,
    );
    const observer = new IntersectionObserver((entries) => {
      setFormsInView((current) => {
        const next = new Set(current);
        for (const entry of entries) {
          if (entry.isIntersecting) next.add(entry.target);
          else next.delete(entry.target);
        }
        return next;
      });
    });
    forms.forEach((form) => observer.observe(form));
    return () => observer.disconnect();
  }, []);

  // Results land in the hero panel; on small screens that panel sits below
  // the form, so bring it into view once the agents are in.
  useEffect(() => {
    if (state !== "result" || !response) return;
    if (window.innerWidth >= 1024) return;
    const timeout = window.setTimeout(() => {
      document.getElementById("agent-foundry")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 120);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, response, state]);

  const selectAgent = useCallback(
    (index: number, scroll = true) => {
      setSelectedAgentIndex(index);
      if (!scroll) return;
      window.setTimeout(() => {
        document.getElementById("agent-detail-panel")?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 80);
    },
    [reducedMotion],
  );

  const weeklySavings = useMemo(
    () =>
      response?.result.agents.reduce(
        (total, agent) => ({
          min: total.min + agent.weeklyHoursSaved.min,
          max: total.max + agent.weeklyHoursSaved.max,
        }),
        { min: 0, max: 0 },
      ) ?? null,
    [response],
  );

  const trackDemoClick = useCallback(() => {
    if (!response) return;
    void fetch("/api/agent-blueprint", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assessmentId: response.assessmentId,
        event: "demo_clicked",
      }),
      keepalive: true,
    });
  }, [response]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileResetKey((key) => key + 1);
  }, []);

  const resetExperience = useCallback(() => {
    setResponse(null);
    setError(null);
    setState("idle");
    const input = document.getElementById(BLUEPRINT_INPUT_ID);
    if (input instanceof HTMLInputElement) input.value = "";
    focusBlueprintInput();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (turnstileEnabled && !turnstileToken) {
      setError("Please complete the verification check.");
      setState("error");
      return;
    }

    const form = event.currentTarget;
    const target = (form.elements.namedItem("target") as HTMLInputElement)
      .value;
    const anonymous = (form.elements.namedItem("anonymous") as HTMLInputElement)
      .checked;
    const website = (form.elements.namedItem("website") as HTMLInputElement)
      .value;

    setStageIndex(0);
    setInsights([]);
    setSelectedAgentIndex(0);
    setResponse(null);
    setState("loading");
    window.setTimeout(() => {
      document.getElementById("agent-foundry")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 80);

    const fail = (message?: string) => {
      setError(
        message ??
          "We could not build the blueprint right now. Please try again.",
      );
      setState("error");
      if (turnstileEnabled) resetTurnstile();
    };

    try {
      const apiResponse = await fetch("/api/agent-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          anonymous,
          website,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });

      // Validation errors (bad domain, rate limit…) come back as plain JSON.
      if (!apiResponse.body || !isNdjson(apiResponse)) {
        const data = (await apiResponse.json().catch(() => null)) as {
          error?: string;
        } | null;
        fail(data?.error);
        return;
      }

      let finished = false;
      await readBlueprintStream(apiResponse.body, (streamEvent) => {
        switch (streamEvent.type) {
          case "stage":
            setStageIndex(
              Math.max(
                0,
                progressStages.findIndex(
                  (item) => item.stage === streamEvent.stage,
                ),
              ),
            );
            break;
          case "insight":
            setInsights((current) =>
              current.includes(streamEvent.text)
                ? current
                : [...current, streamEvent.text],
            );
            break;
          case "result":
            finished = true;
            setResponse({
              assessmentId: streamEvent.assessmentId,
              result: streamEvent.result,
            });
            setState("result");
            break;
          case "error":
            finished = true;
            fail(streamEvent.error);
            break;
        }
      });
      if (!finished) fail();
    } catch {
      fail();
    }
  }

  /** The closing CTA hands its value to the hero form so Turnstile runs once. */
  function submitFromFooter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = (
      event.currentTarget.elements.namedItem("footerTarget") as HTMLInputElement
    ).value;
    const heroInput = document.getElementById(BLUEPRINT_INPUT_ID);
    if (!(heroInput instanceof HTMLInputElement) || !heroFormRef.current) {
      return;
    }
    heroInput.value = value;
    heroFormRef.current.requestSubmit();
  }

  const isLoading = state === "loading";

  return (
    <>
      <section
        data-theme="dark"
        className="bg-background text-text relative isolate flex min-h-svh flex-col overflow-hidden"
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={HERO_BG_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="from-background/80 via-background/45 to-background/70 absolute inset-0 bg-gradient-to-r" />
        </div>

        <div className="mx-auto grid w-full max-w-[84rem] flex-1 gap-10 px-6 pt-28 pb-14 md:px-8 md:pt-36 md:pb-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14 lg:px-12">
          <div className="flex flex-col items-start">
            <AwardBadge />
            <h1
              className={cn(
                headingClass.hero,
                "mt-7 max-w-[16ch] text-balance",
              )}
            >
              See the 3 AI agents your company should build first.
            </h1>
            <p className="type-body text-text/80 mt-6 max-w-xl">
              Enter your website. We read your pages, map how your company
              actually works, match it against 570 real enterprise AI projects
              and design three agents built around your own processes, with the
              hours each one gives back every week.
            </p>

            <form
              ref={heroFormRef}
              onSubmit={submit}
              className="mt-9 w-full max-w-xl"
            >
              <label htmlFor={BLUEPRINT_INPUT_ID} className="sr-only">
                Company website
              </label>
              <div className="flex flex-col gap-2 rounded-sm border border-white/20 bg-black/35 p-2 backdrop-blur-md focus-within:border-blue-300/70 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-1 px-3">
                  <span
                    aria-hidden
                    className="type-paragraph-m text-text/35 select-none"
                  >
                    https://
                  </span>
                  <input
                    id={BLUEPRINT_INPUT_ID}
                    name="target"
                    type="text"
                    required
                    disabled={isLoading}
                    inputMode="url"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="yourcompany.com"
                    className={cn(
                      "type-paragraph-m text-text placeholder:text-text/35 min-w-0 flex-1 bg-transparent py-3 outline-none disabled:opacity-50",
                      autofillReset,
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-[3.25rem] shrink-0"
                >
                  {isLoading ? "Building agents…" : "Build my agent team"}
                </Button>
              </div>

              <ul className="type-paragraph-s text-text/70 mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {heroReassurance.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <span aria-hidden className="text-green-300">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <label className="type-paragraph-s text-text/55 mt-4 flex cursor-pointer items-start gap-3">
                <input
                  name="anonymous"
                  type="checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 size-4 accent-blue-400"
                />
                <span>
                  Keep the blueprint anonymous. No company or benchmark client
                  name will appear.
                </span>
              </label>

              <TurnstileWidget
                resetKey={turnstileResetKey}
                onToken={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
                onError={() => {
                  setError("Verification failed. Please try again.");
                  setState("error");
                }}
              />

              <input
                id={`${formId}-website`}
                tabIndex={-1}
                autoComplete="off"
                name="website"
                type="text"
                aria-hidden
                className="hidden"
              />

              {state === "error" && error ? (
                <p
                  role="alert"
                  className="type-paragraph-s mt-4 text-orange-300"
                >
                  {error}
                </p>
              ) : null}
              <p className="type-paragraph-s text-text/45 mt-4">
                Public web research only. By continuing, you agree to our{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </form>

            <div className="mt-8">
              <BackedBy />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={
                isLoading
                  ? "loading"
                  : state === "result"
                    ? "result"
                    : "preview"
              }
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="self-center"
            >
              <FoundryPanel
                mode={
                  isLoading
                    ? "loading"
                    : state === "result" && response
                      ? "result"
                      : "idle"
                }
                stageIndex={stageIndex}
                insights={insights}
                agents={response?.result.agents ?? null}
                selectedIndex={selectedAgentIndex}
                onSelect={selectAgent}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <HeroMarquee />
      </section>

      {state === "result" && response ? (
        <BlueprintResults
          response={response}
          meetingUrl={meetingUrl}
          wonkaChatUrl={wonkaChatUrl}
          onReset={resetExperience}
          selectedAgentIndex={selectedAgentIndex}
          onSelectAgent={selectAgent}
        />
      ) : null}

      {children}

      <section
        data-theme="dark"
        className="bg-background text-text relative isolate overflow-hidden"
      >
        <Image
          src="/images/CTA/cta-bg.avif"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-10 object-cover opacity-80"
        />
        <div className="mx-auto flex max-w-[84rem] flex-col items-center px-6 py-16 text-center md:px-12 md:py-24">
          <h2 className={cn(headingClass.section, "max-w-[22ch] text-balance")}>
            Your team is too good for repetitive work.
          </h2>
          <p className="type-body text-text/80 mt-5 max-w-[35rem]">
            Find out which three agents would take it off their plate. Free,
            ready in about a minute.
          </p>
          <form
            ref={footerFormRef}
            onSubmit={submitFromFooter}
            className="mt-8 flex w-full max-w-xl flex-col gap-2 rounded-sm border border-white/20 bg-black/35 p-2 text-left backdrop-blur-md focus-within:border-blue-300/70 sm:flex-row sm:items-center"
          >
            <label htmlFor={`${formId}-footer`} className="sr-only">
              Company website
            </label>
            <input
              id={`${formId}-footer`}
              name="footerTarget"
              type="text"
              required
              disabled={isLoading}
              inputMode="url"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="yourcompany.com"
              className={cn(
                "type-paragraph-m text-text placeholder:text-text/35 min-w-0 flex-1 bg-transparent px-3 py-3 outline-none disabled:opacity-50",
                autofillReset,
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-[3.25rem] shrink-0"
            >
              Build my agent team
            </Button>
          </form>
          <p className="type-paragraph-s text-text/55 mt-5">
            Prefer to talk first?{" "}
            <Link
              href={meetingUrl}
              data-track="meeting"
              data-meeting-type="general"
              data-blueprint-cta="footer_link"
              className="text-text underline underline-offset-4"
            >
              Book a 30 min call
            </Link>
          </p>
        </div>
      </section>

      <StickyBar
        state={state}
        weeklySavings={weeklySavings}
        meetingUrl={meetingUrl}
        wonkaChatUrl={wonkaChatUrl}
        onBook={trackDemoClick}
        formInView={formsInView.size > 0}
      />
    </>
  );
}
