"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import type { Locale } from "@/i18n/config";
import { trackWebsiteEvent, WEBSITE_EVENTS } from "@/lib/analytics";
import { headingClass } from "@/lib/design-tokens";
import { meetingTrackProps } from "@/lib/meeting-track";
import {
  PRIORITY_IDS,
  TASK_IDS,
  type ComparatorModel,
  type ContextClass,
  type PriorityId,
  type TaskId,
} from "@/lib/model-comparator/models";
import { rankModels, type Reason, type RankedModel } from "@/lib/model-comparator/rank";
import { cn } from "@/lib/utils";
import { MODEL_COMPARATOR_COPY, type ModelComparatorCopy } from "@/views/copy/model-comparator";

const TRIAL_URL = "https://wonka.chat/register";
const CONTEXT_ORDER: Record<ContextClass, number> = { standard: 1, large: 2, veryLarge: 3 };

type SortKey = "match" | "name" | TaskId | "speed" | "cost" | "context" | "sovereignty";
type SortDir = "asc" | "desc";
interface SortState {
  key: SortKey;
  dir: SortDir;
}

const DEFAULT_SORT: SortState = { key: "match", dir: "desc" };
const ASC_FIRST = new Set<SortKey>(["name", "cost"]);
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-component-focus-ring-color)] focus-visible:ring-offset-2";

function lowerFirst(text: string): string {
  return /^\p{Lu}\p{Ll}/u.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

function reasonLabel(reason: Reason, copy: ModelComparatorCopy): string {
  if (reason.kind === "task") {
    return copy.reasonTask.replace("{task}", lowerFirst(copy.tasks[reason.task]));
  }
  return copy.reasons[reason.kind];
}

function sortValue(entry: RankedModel, key: SortKey, rankIndex: number): number | string {
  const { model } = entry;
  switch (key) {
    case "match":
      return -rankIndex;
    case "name":
      return model.name;
    case "speed":
      return model.speed;
    case "cost":
      return model.cost;
    case "context":
      return CONTEXT_ORDER[model.context];
    case "sovereignty":
      return model.sovereignty;
    default:
      return model.scores[key];
  }
}

function sortEntries(ranked: RankedModel[], sort: SortState): RankedModel[] {
  const factor = sort.dir === "asc" ? 1 : -1;
  return ranked
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => {
      const va = sortValue(a.entry, sort.key, a.index);
      const vb = sortValue(b.entry, sort.key, b.index);
      const diff =
        typeof va === "string" && typeof vb === "string"
          ? va.localeCompare(vb)
          : (va as number) - (vb as number);
      return diff * factor || a.index - b.index;
    })
    .map(({ entry }) => entry);
}

function toggle<T>(list: readonly T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          className={cn("h-2 w-2.5 rounded-xs", step <= score ? "bg-accent" : "bg-text/15")}
        />
      ))}
    </span>
  );
}

function Chip({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 type-paragraph-m transition-colors",
        "has-focus-visible:ring-2 has-focus-visible:ring-[var(--ds-component-focus-ring-color)] has-focus-visible:ring-offset-2",
        checked
          ? "border-accent bg-accent text-white"
          : "border-border bg-background text-text hover:border-accent",
      )}
    >
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {checked ? (
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none">
          <path
            d="M3 8.5 6.5 12 13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {children}
    </label>
  );
}

interface ModelComparatorProps {
  locale: Locale;
  meetingUrl: string;
  meetingLabel: string;
  pricingHref: string;
}

export function ModelComparator({ locale, meetingUrl, meetingLabel, pricingHref }: ModelComparatorProps) {
  const copy = MODEL_COMPARATOR_COPY[locale];
  const [tasks, setTasks] = useState<TaskId[]>([]);
  const [priorities, setPriorities] = useState<PriorityId[]>([]);
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const interacted = useRef(false);

  const ranked = useMemo(() => rankModels({ tasks, priorities }), [tasks, priorities]);
  const sorted = useMemo(() => sortEntries(ranked, sort), [ranked, sort]);
  const topModelId = ranked[0]?.model.id;
  const tasksHintId = useId();
  const prioritiesHintId = useId();

  useEffect(() => {
    if (!interacted.current) return;
    const timer = window.setTimeout(() => {
      trackWebsiteEvent(WEBSITE_EVENTS.MODEL_COMPARATOR_USED, {
        tasks,
        priorities,
        top_model: topModelId,
        locale,
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [tasks, priorities, topModelId, locale]);

  const onTask = (task: TaskId) => {
    interacted.current = true;
    setTasks((current) => toggle(current, task));
  };
  const onPriority = (priority: PriorityId) => {
    interacted.current = true;
    setPriorities((current) => toggle(current, priority));
  };
  const onReset = () => {
    setTasks([]);
    setPriorities([]);
    setSort(DEFAULT_SORT);
  };
  const onSort = (key: SortKey) => {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: ASC_FIRST.has(key) ? "asc" : "desc" },
    );
  };
  const trackCta = (cta: "trial" | "meeting" | "pricing") => () =>
    trackWebsiteEvent(WEBSITE_EVENTS.MODEL_COMPARATOR_CTA_CLICKED, {
      cta,
      tasks,
      priorities,
      top_model: topModelId,
      locale,
    });

  const taskSummary = tasks.length
    ? tasks.map((task) => lowerFirst(copy.tasks[task])).join(", ")
    : copy.results.allTasks;
  const scoreLabel = (score: number) => `${score} ${copy.table.scoreOutOf}`;

  const columns: { key: SortKey; label: string }[] = [
    ...TASK_IDS.map((task) => ({ key: task as SortKey, label: copy.tasks[task] })),
    { key: "speed", label: copy.table.speed },
    { key: "cost", label: copy.table.cost },
    { key: "context", label: copy.table.context },
    { key: "sovereignty", label: copy.table.sovereignty },
  ];
  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "match", label: copy.results.heading },
    { key: "name", label: copy.table.model },
    ...columns,
  ];

  const ariaSort = (key: SortKey) =>
    sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined;

  const sortButton = (column: { key: SortKey; label: string }) => (
    <button
      type="button"
      onClick={() => onSort(column.key)}
      className={cn(
        "inline-flex items-start gap-1 text-left type-paragraph-s text-text/70 hover:text-text",
        sort.key === column.key && "text-text",
        FOCUS_RING,
      )}
    >
      <span>{column.label}</span>
      <span aria-hidden className="text-text/40">
        {sort.key === column.key ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </button>
  );

  return (
    <>
      <Section className="pb-12 md:pb-16" containerClassName="max-w-5xl">
        <Surface variant="card" className="border border-border bg-mid-gray p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className={headingClass.card}>{copy.picker.heading}</h2>
            <button
              type="button"
              onClick={onReset}
              className={cn("type-paragraph-m text-text/60 underline underline-offset-2 hover:text-text", FOCUS_RING)}
            >
              {copy.picker.reset}
            </button>
          </div>

          <fieldset className="mt-6" aria-describedby={tasksHintId}>
            <legend className="type-paragraph-m-bold">{copy.picker.tasksLabel}</legend>
            <p id={tasksHintId} className="mt-1 type-paragraph-s text-text/60">
              {copy.picker.tasksHint}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {TASK_IDS.map((task) => (
                <Chip key={task} checked={tasks.includes(task)} onChange={() => onTask(task)}>
                  {copy.tasks[task]}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8" aria-describedby={prioritiesHintId}>
            <legend className="type-paragraph-m-bold">{copy.picker.prioritiesLabel}</legend>
            <p id={prioritiesHintId} className="mt-1 type-paragraph-s text-text/60">
              {copy.picker.prioritiesHint}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PRIORITY_IDS.map((priority) => (
                <Chip
                  key={priority}
                  checked={priorities.includes(priority)}
                  onChange={() => onPriority(priority)}
                >
                  {copy.priorities[priority]}
                </Chip>
              ))}
            </div>
          </fieldset>
        </Surface>

        <div className="mt-10">
          <h2 className={headingClass.subsection}>{copy.results.heading}</h2>
          <p className="mt-2 type-paragraph-m text-text/60">
            {copy.results.forTasks} {taskSummary}
          </p>
          <p role="status" className="sr-only">
            {ranked[0] ? copy.results.announce.replace("{model}", ranked[0].model.name) : null}
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {ranked.slice(0, 3).map((entry, index) => (
              <li key={entry.model.id}>
                <Surface
                  variant="card"
                  className={cn(
                    "flex h-full flex-col border p-5",
                    index === 0 ? "border-accent" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="type-eyebrow text-text/50">
                      {index === 0 ? copy.results.bestPick : `#${index + 1}`}
                    </span>
                    <span className="type-paragraph-m-bold text-accent">
                      {copy.results.match.replace("{n}", String(entry.match))}
                    </span>
                  </div>
                  <h3 className={cn(headingClass.card, "mt-3")}>{entry.model.name}</h3>
                  <p className="type-paragraph-s text-text/60">{entry.model.provider}</p>
                  {entry.reasons.length ? (
                    <div className="mt-4">
                      <p className="type-paragraph-s text-text/50">{copy.results.why}</p>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {entry.reasons.map((reason) => (
                          <li
                            key={reason.kind === "task" ? reason.task : reason.kind}
                            className="flex items-start gap-2 type-paragraph-m text-text/80"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                            {reasonLabel(reason, copy)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <p className="mt-4 type-paragraph-s text-text/60">{entry.model.strengths[locale]}</p>
                </Surface>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        id="comparison"
        className="border-t border-dashed border-border py-12 md:py-16"
      >
        <h2 className={headingClass.section}>{copy.table.heading}</h2>
        <p className="mt-4 max-w-2xl type-body text-text/65">{copy.table.body}</p>

        <div className="mt-8 hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{copy.table.caption}</caption>
            <thead>
              <tr className="border-b border-border align-bottom">
                <th scope="col" aria-sort={ariaSort("name")} className="py-3 pr-4">
                  {sortButton({ key: "name", label: copy.table.model })}
                </th>
                <th scope="col" aria-sort={ariaSort("match")} className="px-2 py-3">
                  {sortButton({ key: "match", label: copy.table.match })}
                </th>
                {columns.map((column) => (
                  <th key={column.key} scope="col" aria-sort={ariaSort(column.key)} className="px-2 py-3">
                    {sortButton(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => (
                <ModelRow key={entry.model.id} entry={entry} copy={copy} scoreLabel={scoreLabel} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 lg:hidden">
          <label className="flex flex-col gap-2 type-paragraph-m-bold">
            {copy.table.sortHint}
            <select
              value={sort.key}
              onChange={(event) => {
                const key = event.target.value as SortKey;
                setSort({ key, dir: ASC_FIRST.has(key) ? "asc" : "desc" });
              }}
              className={cn(
                "rounded-xs border border-border bg-background px-3 py-2 type-paragraph-m font-normal",
                FOCUS_RING,
              )}
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((entry) => (
            <li key={entry.model.id}>
              <ModelCard entry={entry} copy={copy} locale={locale} scoreLabel={scoreLabel} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="model-comparator-cta" wide className="pb-12 md:pb-16">
        <Surface variant="panel" className="bg-blue-900 p-7.5 text-white md:p-12">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow className="text-white/70">{copy.cta.eyebrow}</Eyebrow>
            <h2 className={headingClass.section}>{copy.cta.heading}</h2>
            <p className="type-body text-white/75">{copy.cta.body}</p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <ButtonLink
                id="model-comparator-trial"
                href={TRIAL_URL}
                variant="primary"
                onClick={trackCta("trial")}
              >
                {copy.cta.trial}
              </ButtonLink>
              <ButtonLink
                id="model-comparator-meeting"
                href={meetingUrl}
                variant="secondary"
                onClick={trackCta("meeting")}
                {...meetingTrackProps(locale === "fr" ? "france" : "wonka-chat")}
              >
                {meetingLabel}
              </ButtonLink>
              <Link
                href={pricingHref}
                onClick={trackCta("pricing")}
                className={cn(
                  "type-paragraph-m-bold text-white underline underline-offset-2 hover:no-underline",
                  FOCUS_RING,
                )}
              >
                {copy.cta.pricing}
              </Link>
            </div>
          </div>
        </Surface>
      </Section>
    </>
  );
}

function ModelRow({
  entry,
  copy,
  scoreLabel,
}: {
  entry: RankedModel;
  copy: ModelComparatorCopy;
  scoreLabel: (score: number) => string;
}) {
  const { model } = entry;
  return (
    <tr className="border-b border-dashed border-border align-middle">
      <th scope="row" className="py-4 pr-4 font-normal">
        <span className="block type-paragraph-m-bold">{model.name}</span>
        <span className="block type-paragraph-s text-text/60">{model.provider}</span>
      </th>
      <td className="px-2 py-4 type-paragraph-m-bold text-accent">{entry.match}</td>
      {TASK_IDS.map((task) => (
        <td key={task} className="px-2 py-4">
          <ScoreBar score={model.scores[task]} label={scoreLabel(model.scores[task])} />
        </td>
      ))}
      <td className="px-2 py-4 type-paragraph-s">{copy.speedLabels[model.speed]}</td>
      <td className="px-2 py-4 type-paragraph-s">{copy.costLabels[model.cost]}</td>
      <td className="px-2 py-4 type-paragraph-s">{copy.contextLabels[model.context]}</td>
      <td className="px-2 py-4">
        <ScoreBar score={model.sovereignty} label={scoreLabel(model.sovereignty)} />
      </td>
    </tr>
  );
}

function ModelCard({
  entry,
  copy,
  locale,
  scoreLabel,
}: {
  entry: RankedModel;
  copy: ModelComparatorCopy;
  locale: Locale;
  scoreLabel: (score: number) => string;
}) {
  const model: ComparatorModel = entry.model;
  return (
    <Surface variant="card" className="flex h-full flex-col border border-border p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={headingClass.card}>{model.name}</h3>
          <p className="type-paragraph-s text-text/60">
            {model.provider} · {copy.hqLabels[model.providerHq]}
            {model.openWeight ? ` · ${copy.openWeight}` : ""}
          </p>
        </div>
        <span className="type-paragraph-m-bold text-accent lg:hidden">
          {copy.results.match.replace("{n}", String(entry.match))}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 type-paragraph-s">
        <div>
          <dt className="text-text/50">{copy.table.speed}</dt>
          <dd>{copy.speedLabels[model.speed]}</dd>
        </div>
        <div>
          <dt className="text-text/50">{copy.table.cost}</dt>
          <dd>{copy.costLabels[model.cost]}</dd>
        </div>
        <div>
          <dt className="text-text/50">{copy.table.context}</dt>
          <dd>{copy.contextLabels[model.context]}</dd>
        </div>
      </dl>

      <dl className="mt-4 flex flex-col gap-2 lg:hidden">
        {TASK_IDS.map((task) => (
          <div key={task} className="flex items-center justify-between gap-3">
            <dt className="type-paragraph-s text-text/70">{copy.tasks[task]}</dt>
            <dd>
              <ScoreBar score={model.scores[task]} label={scoreLabel(model.scores[task])} />
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3">
          <dt className="type-paragraph-s text-text/70">{copy.table.sovereignty}</dt>
          <dd>
            <ScoreBar score={model.sovereignty} label={scoreLabel(model.sovereignty)} />
          </dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-dashed border-border pt-4">
        <p className="type-paragraph-s text-text/50">{copy.table.strengths}</p>
        <p className="mt-1 type-paragraph-m text-text/80">{model.strengths[locale]}</p>
        <p className="mt-3 type-paragraph-s text-text/50">{copy.table.hosting}</p>
        <p className="mt-1 type-paragraph-m text-text/80">{model.hosting[locale]}</p>
      </div>
    </Surface>
  );
}
