"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  isTurnstileEnabled,
  TurnstileWidget,
} from "@/components/turnstile-widget";
import { Button, ButtonLink } from "@/components/ui/button";
import type {
  AgentBlueprintAgent,
  AgentBlueprintResult,
} from "@/lib/agent-blueprint";
import {
  type ConnectedTool,
  resolveConnectedTools,
} from "@/lib/agent-blueprint-tools";
import { cn } from "@/lib/utils";

type ExperienceState = "idle" | "loading" | "result" | "error";

interface BlueprintApiResponse {
  assessmentId: string;
  emailCaptured: boolean;
  result: AgentBlueprintResult;
}

const progressStages = [
  {
    label: "Reading company signals",
    detail: "Business model, priorities and public context",
  },
  {
    label: "Matching 570 use cases",
    detail: "Finding the closest proven workflow patterns",
  },
  {
    label: "Building the first agent",
    detail: "Defining its mission, trigger and expected value",
  },
  {
    label: "Assembling the agent team",
    detail: "Balancing copilot, approval and autonomous work",
  },
  {
    label: "Connecting tools & controls",
    detail: "Adding integrations, guardrails and time estimates",
  },
];

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

function FoundryPreview({ activeStage = -1 }: { activeStage?: number }) {
  const reducedMotion = useReducedMotion();
  const isLoading = activeStage >= 0;
  const progress = [16, 36, 60, 80, 94][Math.max(activeStage, 0)] ?? 16;
  const agentStates = [
    activeStage >= 2 ? (activeStage >= 3 ? "ready" : "building") : "waiting",
    activeStage >= 3 ? (activeStage >= 4 ? "ready" : "building") : "waiting",
    activeStage >= 3 ? (activeStage >= 4 ? "ready" : "building") : "waiting",
  ] as const;

  return (
    <div
      id="agent-foundry"
      className="scroll-mt-24 overflow-hidden rounded-sm border border-white/12 bg-[#111c18]"
      aria-live={isLoading ? "polite" : undefined}
    >
      <div className="flex items-center justify-between border-b border-dashed border-white/15 px-5 py-4 md:px-6">
        <div>
          <span className="type-eyebrow text-white/40">Agent foundry</span>
          <p className="type-paragraph-m-bold mt-1 text-white">
            {isLoading
              ? progressStages[activeStage]?.label
              : "Your agent team will appear here"}
          </p>
        </div>
        <span className="type-paragraph-s flex items-center gap-2 text-green-300">
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
      </div>

      <div className="px-5 py-5 md:px-6 md:py-6">
        <div className="h-1 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-blue-400"
            initial={false}
            animate={{ width: isLoading ? `${progress}%` : "8%" }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="mt-6 grid gap-3">
          {[
            ["Copilot", "Works side by side with your team"],
            ["Human in the loop", "Acts, then asks for approval"],
            ["Autonomous", "Runs scheduled, controlled workflows"],
          ].map(([tier, detail], index) => {
            const agentState = isLoading ? agentStates[index] : "waiting";
            return (
              <motion.div
                key={tier}
                initial={false}
                animate={{ opacity: agentState === "waiting" ? 0.38 : 1 }}
                className={cn(
                  "relative grid min-h-[5.4rem] grid-cols-[2.75rem_1fr_auto] items-center gap-3 overflow-hidden rounded-sm border px-4 py-3",
                  agentState === "ready"
                    ? "border-green-300/25 bg-green-300/[0.06]"
                    : agentState === "building"
                      ? "border-blue-400/40 bg-blue-400/[0.08]"
                      : "border-white/10 bg-black/20",
                )}
              >
                {agentState === "building" && !reducedMotion ? (
                  <motion.span
                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent"
                    animate={{ x: [-120, 520] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : null}
                <div
                  className={cn(
                    "relative flex size-10 items-center justify-center rounded-full border",
                    agentState === "ready"
                      ? "border-green-300/30 bg-green-300/15 text-green-300"
                      : "border-white/12 bg-white/[0.05] text-blue-300",
                  )}
                >
                  {agentState === "ready" ? (
                    <span aria-hidden>✓</span>
                  ) : (
                    <SparkIcon className="size-4" />
                  )}
                </div>
                <div className="relative">
                  <p className="type-paragraph-m-bold text-white">{tier}</p>
                  <p className="type-paragraph-s mt-1 text-white/45">
                    {detail}
                  </p>
                </div>
                <span className="type-paragraph-s relative text-white/40">
                  {agentState === "ready"
                    ? "Ready"
                    : agentState === "building"
                      ? "Building…"
                      : `0${index + 1}`}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-dashed border-white/12 pt-4">
          <p className="type-paragraph-s text-white/40">
            {isLoading
              ? progressStages[activeStage]?.detail
              : "Research → benchmark → agent architecture"}
          </p>
          <p className="type-paragraph-s text-white/60">
            {isLoading ? `${progress}%` : "≈ 30 sec"}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingPanel({ activeStage }: { activeStage: number }) {
  return <FoundryPreview activeStage={activeStage} />;
}

const logoDevToken =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "pk_W2OQu1QTRouRcByKgmxjCA";

function ToolLogo({ tool }: { tool: ConnectedTool }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-[0.3rem] border border-black/8 bg-white">
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
          width={24}
          height={24}
          unoptimized
          className="size-6 object-contain p-[3px]"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

function ToolChain({ tools }: { tools: string[] }) {
  const connectedTools = resolveConnectedTools(tools);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {connectedTools.map((tool, index) => (
        <div key={tool.name} className="flex items-center gap-2">
          {index > 0 ? <span className="bg-border h-px w-3" /> : null}
          <span className="border-border bg-background type-paragraph-s text-text/75 inline-flex min-h-9 items-center gap-2 rounded-sm border px-2 py-1">
            <ToolLogo tool={tool} />
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
}: {
  agent: AgentBlueprintAgent;
  index: number;
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
          <p className="type-body">{agent.mission}</p>
          <div className="mt-5 rounded-sm bg-blue-50 p-4">
            <p className="type-eyebrow text-blue-700/55">Why this one</p>
            <p className="type-paragraph-m text-text/65 mt-2">{agent.whyNow}</p>
          </div>
          <div className="mt-5">
            <p className="type-eyebrow text-text/35">Example integrations</p>
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

      <div className="border-border grid grid-cols-2 border-t border-dashed">
        <div className="p-4 md:px-6">
          <p className="type-paragraph-s text-text/40">Business impact</p>
          <p className="type-paragraph-m-bold mt-1">{agent.expectedImpact}</p>
        </div>
        <div className="border-border border-l border-dashed p-4 md:px-6">
          <p className="type-paragraph-s text-text/40">Build effort</p>
          <p className="type-paragraph-m-bold mt-1">{agent.effort}</p>
        </div>
      </div>
    </motion.article>
  );
}

function UnlockForm({
  assessmentId,
  onUnlocked,
}: {
  assessmentId: string;
  onUnlocked: () => void;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    try {
      const response = await fetch("/api/agent-blueprint", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId, email }),
      });
      if (!response.ok) {
        setState("error");
        return;
      }
      onUnlocked();
    } catch {
      setState("error");
    }
  }

  return (
    <form
      id="blueprint-unlock"
      onSubmit={submit}
      className="scroll-mt-20 rounded-sm border border-blue-300 bg-blue-100 p-4 md:flex md:items-center md:justify-between md:gap-8 md:px-5"
    >
      <div>
        <p className="type-paragraph-m-bold">Unlock agents 02 and 03</p>
        <p className="type-paragraph-s text-text/60 mt-1">
          Add your work email. The blueprint stays anonymous.
        </p>
      </div>
      <div className="mt-4 flex min-w-0 gap-2 md:mt-0 md:w-[25rem]">
        <label className="sr-only" htmlFor="blueprint-unlock-email">
          Work email
        </label>
        <input
          id="blueprint-unlock-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@company.com"
          className="type-paragraph-m min-w-0 flex-1 rounded-sm border border-blue-300 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Unlocking…" : "Unlock"}
        </Button>
      </div>
      {state === "error" ? (
        <p className="type-paragraph-s mt-2 text-blue-900 md:hidden">
          Please enter a valid work email.
        </p>
      ) : null}
    </form>
  );
}

function BlueprintResults({
  response,
  meetingUrl,
}: {
  response: BlueprintApiResponse;
  meetingUrl: string;
}) {
  const [unlocked, setUnlocked] = useState(response.emailCaptured);
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const selectedAgent = response.result.agents[selectedAgentIndex];
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

  return (
    <section
      id="blueprint-results"
      className="border-border bg-light-gray scroll-mt-16 border-t border-dashed"
    >
      <div className="mx-auto max-w-[84rem] px-6 py-10 md:px-8 md:py-12 lg:px-12">
        <div className="border-border grid gap-6 border-b border-dashed pb-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="type-eyebrow text-blue-700">Blueprint ready</span>
            <h2 className="type-h4 mt-3 max-w-4xl">
              {response.result.headline}
            </h2>
            <p className="type-paragraph-m text-text/55 mt-3 max-w-3xl">
              {response.result.summary}
            </p>
          </div>
          <div className="min-w-[15rem] rounded-sm bg-black px-5 py-4 text-white">
            <p className="type-eyebrow text-white/40">
              Estimated time recovered
            </p>
            <p className="type-h3 mt-2 text-white">
              {weeklySavings.min}–{weeklySavings.max}h
            </p>
            <p className="type-paragraph-s text-white/45">
              per week, across the team
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[20rem_1fr]">
          <div
            className="flex snap-x gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Recommended agents"
          >
            {response.result.agents.map((agent, index) => {
              const isLocked = !unlocked && index > 0;
              const isSelected = selectedAgentIndex === index;
              return (
                <button
                  key={agent.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (isLocked) {
                      document
                        .getElementById("blueprint-unlock")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      return;
                    }
                    setSelectedAgentIndex(index);
                    if (window.innerWidth < 1024) {
                      window.setTimeout(() => {
                        document
                          .getElementById("agent-detail-panel")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }, 80);
                    }
                  }}
                  className={cn(
                    "group min-w-[15rem] flex-1 snap-start rounded-sm border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none lg:min-w-0",
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-border hover:border-text/35 bg-white",
                    isLocked && "opacity-60",
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
                    </span>
                    <span className="type-paragraph-s">
                      {isLocked
                        ? "Locked"
                        : `${agent.weeklyHoursSaved.min}–${agent.weeklyHoursSaved.max}h/w`}
                    </span>
                  </div>
                  <p className="type-paragraph-m-bold mt-3">{agent.name}</p>
                  <p
                    className={cn(
                      "type-paragraph-s mt-1",
                      isSelected ? "text-white/50" : "text-text/45",
                    )}
                  >
                    {agent.tier}
                  </p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedAgent ? (
              <AgentDetailPanel
                key={selectedAgent.id}
                agent={selectedAgent}
                index={selectedAgentIndex}
              />
            ) : null}
          </AnimatePresence>
        </div>

        {!unlocked ? (
          <div className="mt-4">
            <UnlockForm
              assessmentId={response.assessmentId}
              onUnlocked={() => setUnlocked(true)}
            />
          </div>
        ) : null}

        <div className="mt-5 rounded-sm bg-[#0f2119] px-5 py-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 md:px-6">
          <div>
            <p className="type-paragraph-m-bold text-white">
              Which agent should you build first?
            </p>
            <p className="type-paragraph-s mt-1 text-white/45">
              Validate the estimate, integrations and delivery scope with Wonka.
            </p>
          </div>
          <ButtonLink
            href={meetingUrl}
            onClick={trackDemoClick}
            data-track="meeting"
            data-meeting-type="general"
            className="mt-4 shrink-0 sm:mt-0"
          >
            Book a demo
          </ButtonLink>
        </div>

        <p className="type-paragraph-s text-text/38 mt-4">
          Time savings are directional estimates based on recurring tasks in the
          benchmark. Validate them against real volumes before investment.
        </p>
      </div>
    </section>
  );
}

export function AgentBlueprintExperience({
  meetingUrl,
}: {
  meetingUrl: string;
}) {
  const formId = useId();
  const reducedMotion = useReducedMotion();
  const turnstileEnabled = isTurnstileEnabled();
  const [state, setState] = useState<ExperienceState>("idle");
  const [response, setResponse] = useState<BlueprintApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  useEffect(() => {
    if (state !== "loading") return;
    const interval = window.setInterval(() => {
      setActiveStage((current) =>
        Math.min(current + 1, progressStages.length - 1),
      );
    }, 4_200);
    return () => window.clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state !== "result" || !response) return;
    const timeout = window.setTimeout(() => {
      document.getElementById("blueprint-results")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 120);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, response, state]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileResetKey((key) => key + 1);
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

    setActiveStage(0);
    setState("loading");
    window.setTimeout(() => {
      document.getElementById("agent-foundry")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 80);

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
      const data = (await apiResponse.json().catch(() => null)) as
        | BlueprintApiResponse
        | { error?: string }
        | null;

      if (!apiResponse.ok || !data || !("result" in data)) {
        setError(
          data && "error" in data && data.error
            ? data.error
            : "We could not build the blueprint right now. Please try again.",
        );
        setState("error");
        if (turnstileEnabled) resetTurnstile();
        return;
      }

      setResponse(data);
      setState("result");
    } catch {
      setError("We could not build the blueprint right now. Please try again.");
      setState("error");
      if (turnstileEnabled) resetTurnstile();
    }
  }

  return (
    <>
      <section className="min-h-[92svh] overflow-hidden border-b border-dashed border-white/15 bg-black text-white">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-6 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16 lg:min-h-[92svh] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12">
          <div className="self-center">
            <span className="type-eyebrow text-blue-300">
              AI Agent Blueprint
            </span>
            <h1 className="type-h2 mt-6 max-w-3xl text-white">
              Enter your company. Watch your agent team take shape.
            </h1>
            <p className="type-body mt-6 max-w-xl text-white/62">
              In about 30 seconds, we research the business, match 570 real use
              cases and build three practical agents with a weekly time-saving
              estimate.
            </p>

            <form onSubmit={submit} className="mt-9 max-w-xl">
              <label
                htmlFor={`${formId}-target`}
                className="type-paragraph-m-bold"
              >
                Company website or work email
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id={`${formId}-target`}
                  name="target"
                  type="text"
                  required
                  disabled={state === "loading"}
                  placeholder="company.com or you@company.com"
                  className="type-paragraph-m min-w-0 flex-1 rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={state === "loading"}
                  className="h-[3.25rem]"
                >
                  {state === "loading"
                    ? "Building agents…"
                    : "Build my agent team"}
                </Button>
              </div>

              <label className="type-paragraph-s mt-4 flex cursor-pointer items-start gap-3 text-white/55">
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
              <p className="type-paragraph-s mt-4 text-white/35">
                Public web research only. By continuing, you agree to our{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </form>

            <div className="type-paragraph-s mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-white/40">
              {[
                "Public company signals",
                "570 benchmark use cases",
                "3 agents with controls",
              ].map((label, index) => (
                <div key={label} className="flex items-center gap-3">
                  {index > 0 ? <span className="text-white/15">→</span> : null}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={state === "loading" ? "loading" : "preview"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="self-center"
            >
              {state === "loading" ? (
                <LoadingPanel activeStage={activeStage} />
              ) : (
                <FoundryPreview />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {state === "result" && response ? (
        <BlueprintResults response={response} meetingUrl={meetingUrl} />
      ) : null}
    </>
  );
}
