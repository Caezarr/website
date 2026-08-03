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
    label: "Researching the company",
    detail: "Reading public signals, business model and market context",
  },
  {
    label: "Searching the benchmark",
    detail: "Matching against 570 real-world generative AI use cases",
  },
  {
    label: "Designing your agent team",
    detail: "Ranking workflows by fit, impact and autonomy",
  },
  {
    label: "Adding controls & tools",
    detail: "Mapping triggers, connectors and human validation",
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

function AgentGlyph({ index }: { index: number }) {
  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.07]">
      <span className="absolute inset-1 rounded-full border border-dashed border-white/20" />
      <SparkIcon className="size-5 text-blue-400" />
      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-white type-paragraph-s text-black">
        {index + 1}
      </span>
    </div>
  );
}

function FoundryPreview({ activeStage = -1 }: { activeStage?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative min-h-[25rem] overflow-hidden rounded-sm border border-white/12 bg-[#111c18] p-5 md:min-h-[29rem] md:p-7">
      <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-4">
        <span className="type-eyebrow text-white/45">Agent foundry</span>
        <span className="flex items-center gap-2 type-paragraph-s text-green-300">
          <span className="size-1.5 rounded-full bg-green-400" />
          Private analysis
        </span>
      </div>

      <div className="relative mt-8 grid gap-4">
        <div className="absolute bottom-6 left-7 top-6 w-px bg-white/12" />
        {[
          ["Company signal", "Public web"],
          ["Benchmark match", "570 use cases"],
          ["Agent architecture", "3 control levels"],
        ].map(([label, detail], index) => {
          const isActive = activeStage >= index || activeStage === -1;
          return (
            <motion.div
              key={label}
              initial={reducedMotion ? false : { opacity: 0, x: 14 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: activeStage === -1 ? index * 0.16 : 0 }}
              className="relative z-10 grid grid-cols-[3.5rem_1fr] items-center gap-4"
            >
              <AgentGlyph index={index} />
              <div className="rounded-sm border border-white/10 bg-black/25 p-4">
                <p className="type-paragraph-m-bold text-white">{label}</p>
                <p className="mt-1 type-paragraph-s text-white/45">{detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-0 right-0 flex items-end gap-1 p-4">
        {[28, 46, 36, 62, 50].map((height, index) => (
          <motion.span
            key={height}
            className="w-1 rounded-full bg-blue-400/60"
            animate={reducedMotion ? undefined : { height: [8, height, 8] }}
            transition={{
              duration: 1.8,
              delay: index * 0.14,
              repeat: Infinity,
            }}
            style={{ height: 8 }}
          />
        ))}
      </div>
    </div>
  );
}

function LoadingPanel({ activeStage }: { activeStage: number }) {
  return (
    <div aria-live="polite">
      <FoundryPreview activeStage={activeStage} />
      <div className="mt-5 grid gap-2">
        {progressStages.map((stage, index) => (
          <div
            key={stage.label}
            className={cn(
              "flex items-start gap-3 rounded-sm border px-4 py-3 transition-colors",
              index === activeStage
                ? "border-blue-400/50 bg-blue-400/10"
                : index < activeStage
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-transparent opacity-35",
            )}
          >
            <span
              className={cn(
                "mt-1 size-2 shrink-0 rounded-full",
                index < activeStage
                  ? "bg-green-400"
                  : index === activeStage
                    ? "animate-pulse bg-blue-400"
                    : "bg-white/30",
              )}
            />
            <div>
              <p className="type-paragraph-m-bold text-white">{stage.label}</p>
              <p className="type-paragraph-s text-white/45">{stage.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const logoDevToken =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ?? "pk_W2OQu1QTRouRcByKgmxjCA";

function ToolLogo({ tool }: { tool: ConnectedTool }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-[0.3rem] border border-black/8 bg-white">
      {failed ? (
        <span className="type-paragraph-s font-semibold text-text/65">
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
          {index > 0 ? <span className="h-px w-3 bg-border" /> : null}
          <span className="inline-flex min-h-9 items-center gap-2 rounded-sm border border-border bg-background px-2 py-1 type-paragraph-s text-text/75">
            <ToolLogo tool={tool} />
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function AgentCard({
  agent,
  index,
  locked,
}: {
  agent: AgentBlueprintAgent;
  index: number;
  locked: boolean;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-sm border border-border bg-white"
    >
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-border p-5 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
            <SparkIcon className="size-4" />
          </div>
          <div>
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 type-paragraph-s",
                tierStyles[agent.tier],
              )}
            >
              {agent.tier}
            </span>
            <h3 className="mt-3 type-h6">{agent.name}</h3>
          </div>
        </div>
        <span className="type-eyebrow text-text/30">0{index + 1}</span>
      </div>

      <div
        className={cn(
          "grid gap-7 p-5 md:grid-cols-[1fr_0.85fr] md:p-7",
          locked && "select-none blur-[7px]",
        )}
        aria-hidden={locked}
      >
        <div>
          <p className="type-body">{agent.mission}</p>
          <p className="mt-4 type-paragraph-m text-text/55">{agent.whyNow}</p>
          <div className="mt-6">
            <p className="type-eyebrow text-text/35">Example integrations</p>
            <div className="mt-3">
              <ToolChain tools={agent.tools} />
            </div>
          </div>
        </div>
        <div className="rounded-sm bg-mid-gray p-5">
          <p className="type-eyebrow text-text/35">Workflow</p>
          <ol className="mt-4 space-y-3">
            {agent.workflow.map((step, stepIndex) => (
              <li key={step} className="flex gap-3 type-paragraph-s text-text/70">
                <span className="text-blue-600">0{stepIndex + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-5 border-t border-dashed border-border pt-4">
            <p className="type-paragraph-s text-text/50">Human control</p>
            <p className="mt-1 type-paragraph-m-bold">{agent.humanControl}</p>
          </div>
        </div>
      </div>

      {locked ? (
        <div className="absolute inset-x-0 bottom-0 top-[8rem] flex items-center justify-center bg-white/55 p-6 backdrop-blur-[2px]">
          <div className="rounded-sm border border-border bg-white px-5 py-4 text-center shadow-subtle">
            <p className="type-paragraph-m-bold">Unlock the full architecture</p>
            <p className="mt-1 type-paragraph-s text-text/55">
              Add your work email below to reveal tools, workflow and controls.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 border-t border-dashed border-border">
        <div className="p-4 md:px-7">
          <p className="type-paragraph-s text-text/40">Expected impact</p>
          <p className="mt-1 type-paragraph-m-bold">{agent.expectedImpact}</p>
        </div>
        <div className="border-l border-dashed border-border p-4 md:px-7">
          <p className="type-paragraph-s text-text/40">Build effort</p>
          <p className="mt-1 type-paragraph-m-bold">{agent.effort}</p>
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
      onSubmit={submit}
      className="rounded-sm border border-blue-300 bg-blue-100 p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-7"
    >
      <div>
        <p className="type-h6">Reveal your complete agent team.</p>
        <p className="mt-2 type-paragraph-m text-text/60">
          Add your work email. We’ll keep the blueprint anonymous.
        </p>
      </div>
      <div className="mt-5 flex min-w-0 gap-2 md:mt-0 md:w-[27rem]">
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
          className="min-w-0 flex-1 rounded-sm border border-blue-300 bg-white px-4 py-3 type-paragraph-m outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Unlocking…" : "Unlock"}
        </Button>
      </div>
      {state === "error" ? (
        <p className="mt-2 type-paragraph-s text-blue-900 md:hidden">
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
    <section id="blueprint-results" className="border-t border-dashed border-border bg-light-gray">
      <div className="mx-auto max-w-[84rem] px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-8 border-b border-dashed border-border pb-12 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <span className="type-eyebrow text-blue-700">Blueprint ready</span>
            <p className="mt-4 type-paragraph-m text-text/50">
              Anonymous profile · {response.result.sector}
            </p>
          </div>
          <div>
            <h2 className="type-h4">{response.result.headline}</h2>
            <p className="mt-5 max-w-3xl type-body text-text/65">
              {response.result.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {response.result.signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-border bg-white px-3 py-1.5 type-paragraph-s text-text/65"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5">
          {response.result.agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={index}
              locked={!unlocked && index > 0}
            />
          ))}
        </div>

        {!unlocked ? (
          <div className="mt-6">
            <UnlockForm
              assessmentId={response.assessmentId}
              onUnlocked={() => setUnlocked(true)}
            />
          </div>
        ) : null}

        {response.result.sources.length > 0 ? (
          <div className="mt-10 border-t border-dashed border-border pt-7">
            <p className="type-eyebrow text-text/35">Public signals reviewed</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {response.result.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-paragraph-s text-text/55 underline decoration-border underline-offset-4 hover:text-text"
                >
                  {source.title}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-14 rounded-sm bg-black px-6 py-10 text-white md:flex md:items-center md:justify-between md:gap-10 md:px-10">
          <div>
            <p className="type-eyebrow text-white/40">From blueprint to production</p>
            <h2 className="mt-4 max-w-2xl type-h4 text-white">
              Validate the first agent with a Wonka advisor.
            </h2>
          </div>
          <ButtonLink
            href={meetingUrl}
            onClick={trackDemoClick}
            data-track="meeting"
            data-meeting-type="general"
            className="mt-7 shrink-0 md:mt-0"
          >
            Book a demo
          </ButtonLink>
        </div>
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
      setActiveStage((current) => Math.min(current + 1, progressStages.length - 1));
    }, 3_200);
    return () => window.clearInterval(interval);
  }, [state]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileResetKey((key) => key + 1);
  }, []);

  const progressLabel = useMemo(
    () => progressStages[activeStage]?.label ?? progressStages[0].label,
    [activeStage],
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (turnstileEnabled && !turnstileToken) {
      setError("Please complete the verification check.");
      setState("error");
      return;
    }

    const form = event.currentTarget;
    const target = (form.elements.namedItem("target") as HTMLInputElement).value;
    const anonymous = (form.elements.namedItem("anonymous") as HTMLInputElement)
      .checked;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;

    setActiveStage(0);
    setState("loading");

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
      window.setTimeout(() => {
        document
          .getElementById("blueprint-results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setError("We could not build the blueprint right now. Please try again.");
      setState("error");
      if (turnstileEnabled) resetTurnstile();
    }
  }

  return (
    <>
      <section className="overflow-hidden border-b border-dashed border-white/15 bg-black text-white">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <div className="self-center">
            <span className="type-eyebrow text-blue-300">AI Agent Blueprint</span>
            <h1 className="mt-6 max-w-3xl type-h2 text-white">
              Discover the agents your business should build next.
            </h1>
            <p className="mt-6 max-w-xl type-body text-white/62">
              We research your company, compare it with 570 real AI use cases,
              and design a private agent team for your industry.
            </p>

            <form onSubmit={submit} className="mt-9 max-w-xl">
              <label htmlFor={`${formId}-target`} className="type-paragraph-m-bold">
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
                  className="min-w-0 flex-1 rounded-sm border border-white/20 bg-white/10 px-4 py-3 type-paragraph-m text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={state === "loading"}
                  className="h-[3.25rem]"
                >
                  {state === "loading" ? progressLabel : "Design my agents"}
                </Button>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-3 type-paragraph-s text-white/55">
                <input
                  name="anonymous"
                  type="checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 size-4 accent-blue-400"
                />
                <span>
                  Keep my output anonymous. Company and benchmark client names
                  will never appear in the blueprint.
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
                <p role="alert" className="mt-4 type-paragraph-s text-orange-300">
                  {error}
                </p>
              ) : null}
              <p className="mt-4 type-paragraph-s text-white/35">
                Public web research only. By continuing, you agree to our{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </form>

            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-white/10">
              {[
                ["570", "use cases"],
                ["3", "agent levels"],
                ["100%", "anonymous"],
              ].map(([value, label]) => (
                <div key={label} className="bg-black p-4">
                  <p className="type-h6 text-white">{value}</p>
                  <p className="mt-1 type-paragraph-s text-white/35">{label}</p>
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
      ) : (
        <section className="bg-background px-6 py-16 text-text md:px-8 md:py-24 lg:px-12">
          <div className="mx-auto grid max-w-[84rem] gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="type-eyebrow text-text/40">How it works</span>
              <h2 className="mt-5 type-h4">Evidence first. Agents second.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
              {[
                [
                  "01",
                  "Research",
                  "Public signals reveal the operating model, priorities and likely systems.",
                ],
                [
                  "02",
                  "Benchmark",
                  "Azure AI Search finds the closest patterns in a private use-case library.",
                ],
                [
                  "03",
                  "Architecture",
                  "Three agents emerge with tools, triggers, controls and expected impact.",
                ],
              ].map(([number, title, body]) => (
                <article key={number} className="bg-background p-6 md:p-7">
                  <p className="type-eyebrow text-text/30">{number}</p>
                  <h3 className="mt-8 type-h6">{title}</h3>
                  <p className="mt-3 type-paragraph-m text-text/55">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
