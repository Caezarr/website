"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import {
  formatSelectionCount,
  type AgentLibraryCopy,
} from "@/lib/agent-library/copy";
import {
  type LibrarySelectionIndexEntry,
  SELECTION_MAX_ENTRIES,
  WONKACHAT_IMPORT_MAX_AGENTS,
  WONKACHAT_START_URL,
} from "@/lib/agent-library/selection";
import { trackWebsiteEvent, WEBSITE_EVENTS } from "@/lib/analytics";
import { meetingTrackProps } from "@/lib/meeting-track";
import { cn } from "@/lib/utils";
import {
  setLibrarySelection,
  toggleLibrarySelection,
  useLibraryImport,
  useLibrarySelection,
} from "./use-library-selection";

type Kind = LibrarySelectionIndexEntry["kind"];

/** "Add to my team" toggle shown on every card and detail page. */
export function LibrarySelectionToggle({
  slug,
  kind,
  name,
  labels,
  locale,
  placement,
  tone = "light",
  className,
}: {
  slug: string;
  kind: Kind;
  name: string;
  labels: AgentLibraryCopy["card"];
  locale?: Locale;
  placement: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const slugs = useLibrarySelection();
  const selected = slugs.includes(slug);
  const full = !selected && slugs.length >= SELECTION_MAX_ENTRIES;
  const label = selected ? labels.added : full ? labels.full : labels.add;

  const toggle = () => {
    const action = toggleLibrarySelection(slug);
    if (action === "full") return;
    trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_SELECTION_CHANGED, {
      action,
      kind: kind === "agent" ? "agent" : "use_case",
      agent: slug,
      count: slugs.length + (action === "add" ? 1 : -1),
      locale,
      placement,
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={full}
      aria-label={`${label}: ${name}`}
      className={cn(
        "type-paragraph-s relative z-10 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? "border-accent bg-accent text-white"
          : tone === "dark"
            ? "border-white/30 text-white hover:border-white"
            : "border-border/30 text-text hover:border-accent hover:text-accent",
        className,
      )}
    >
      <span aria-hidden className="inline-block w-3 text-center">
        {selected ? "✓" : "+"}
      </span>
      {label}
    </button>
  );
}

/** Imports one full agent into WonkaChat from its detail page. */
export function LibraryImportButton({
  slug,
  locale,
  placement,
  labels,
  children,
}: {
  slug: string;
  locale: Locale;
  placement: string;
  labels: AgentLibraryCopy["selection"];
  children: ReactNode;
}) {
  const { start, pending, failed } = useLibraryImport(locale, labels.sending);
  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="primary"
        disabled={pending}
        aria-busy={pending || undefined}
        onClick={() => {
          trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_IMPORT_CLICKED, {
            agent: slug,
            locale,
            placement,
          });
          void start([slug], placement);
        }}
      >
        {pending ? labels.sending : children}
      </Button>
      {failed ? (
        <p role="alert" className="type-paragraph-s text-current">
          {labels.error}
        </p>
      ) : null}
    </div>
  );
}

function SelectionGroup({
  title,
  entries,
  basePath,
  removeLabel,
  onRemove,
}: {
  title: string;
  entries: LibrarySelectionIndexEntry[];
  basePath: string;
  removeLabel: string;
  onRemove: (entry: LibrarySelectionIndexEntry) => void;
}) {
  if (!entries.length) return null;
  return (
    <div>
      <h3 className="type-eyebrow text-white/50">
        {title} ({entries.length})
      </h3>
      <ul className="mt-2 divide-y divide-dashed divide-white/15">
        {entries.map((entry) => (
          <li key={entry.slug} className="flex items-center justify-between gap-3 py-2">
            <Link
              href={`${basePath}/${entry.slug}`}
              className="type-paragraph-m min-w-0 truncate text-white/85 underline-offset-4 hover:underline"
            >
              {entry.name}
            </Link>
            <button
              type="button"
              onClick={() => onRemove(entry)}
              aria-label={removeLabel.replace("{name}", entry.name)}
              className="type-paragraph-m flex size-8 shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span aria-hidden>×</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Floating "my team" tray: the visitor's list, grouped into agents ready to
 * import and use cases to design, with the actions that fit the list.
 */
export function LibrarySelectionTray({
  entries,
  basePath,
  locale,
  labels,
  blueprintHref,
  meetingUrl,
  importEnabled,
}: {
  entries: LibrarySelectionIndexEntry[];
  basePath: string;
  locale: Locale;
  labels: AgentLibraryCopy["selection"];
  blueprintHref: string;
  meetingUrl: string;
  importEnabled: boolean;
}) {
  const slugs = useLibrarySelection();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { start, pending, failed } = useLibraryImport(locale, labels.sending);

  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const selected = slugs.flatMap((slug) => bySlug.get(slug) ?? []);
  const ready = selected.filter((entry) => entry.kind === "agent");
  const ideas = selected.filter((entry) => entry.kind === "use-case");
  const tooMany = ready.length > WONKACHAT_IMPORT_MAX_AGENTS;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!selected.length) return null;

  const countLabel = formatSelectionCount(labels, selected.length);
  const summary = { agents: ready.length, use_cases: ideas.length, locale };

  const remove = (entry: LibrarySelectionIndexEntry) => {
    setLibrarySelection(slugs.filter((slug) => slug !== entry.slug));
    trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_SELECTION_CHANGED, {
      action: "remove",
      kind: entry.kind === "agent" ? "agent" : "use_case",
      agent: entry.slug,
      count: selected.length - 1,
      locale,
      placement: "tray",
    });
  };

  const clear = () => {
    setLibrarySelection([]);
    trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_SELECTION_CHANGED, {
      action: "clear",
      count: 0,
      locale,
      placement: "tray",
    });
  };

  const toggleOpen = () => {
    if (!open) trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_TRAY_OPENED, summary);
    setOpen(!open);
  };

  return (
    <aside
      aria-label={labels.label}
      data-theme="dark"
      className="fixed inset-x-4 bottom-4 z-20 mx-auto max-w-[32rem] rounded-sm border border-white/15 bg-black text-white shadow-subtle-hover md:inset-x-auto md:right-6 md:bottom-6 md:w-[30rem]"
    >
      <p className="sr-only" aria-live="polite">
        {countLabel}
      </p>
      {open ? (
        <div
          id={panelId}
          className="flex max-h-[min(60vh,32rem)] flex-col gap-5 overflow-y-auto border-b border-dashed border-white/15 p-4 md:p-5"
        >
          <SelectionGroup
            title={labels.ready}
            entries={ready}
            basePath={basePath}
            removeLabel={labels.remove}
            onRemove={remove}
          />
          <SelectionGroup
            title={labels.ideas}
            entries={ideas}
            basePath={basePath}
            removeLabel={labels.remove}
            onRemove={remove}
          />

          {ready.length && importEnabled ? (
            <div className="flex flex-col items-start gap-2">
              <Button
                type="button"
                variant="primaryOutline"
                disabled={tooMany || pending}
                aria-busy={pending || undefined}
                aria-describedby={`${panelId}-send-note`}
                onClick={() => void start(ready.map((entry) => entry.slug), "tray")}
              >
                {pending ? labels.sending : labels.send}
              </Button>
              <p id={`${panelId}-send-note`} className="type-paragraph-s text-white/60">
                {tooMany ? labels.sendLimit : labels.sendNote}
              </p>
              {failed ? (
                <p role="alert" className="type-paragraph-s text-white">
                  {labels.error}
                </p>
              ) : null}
            </div>
          ) : null}

          {ideas.length ? (
            <div className="flex flex-col items-start gap-2">
              <a
                href={WONKACHAT_START_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWebsiteEvent(
                    WEBSITE_EVENTS.AGENT_LIBRARY_CREATE_IN_WONKACHAT_CLICKED,
                    summary,
                  )
                }
                className="type-paragraph-m-bold text-white underline underline-offset-4 hover:text-white/80"
              >
                {labels.createIdeas}
              </a>
              <p className="type-paragraph-s text-white/60">{labels.ideasNote}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-white/15 pt-4">
            <a
              href={meetingUrl}
              {...(/^https?:\/\//.test(meetingUrl)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="type-paragraph-s text-white/70 underline underline-offset-4 hover:text-white"
              {...meetingTrackProps("general")}
            >
              {labels.book}
            </a>
            <button
              type="button"
              onClick={clear}
              className="type-paragraph-s text-white/70 underline underline-offset-4 hover:text-white"
            >
              {labels.clear}
            </button>
          </div>
          {selected.length >= SELECTION_MAX_ENTRIES ? (
            <p className="type-paragraph-s text-white/60">{labels.fullNote}</p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 p-3 md:p-4">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={toggleOpen}
          className="type-paragraph-m-bold inline-flex min-h-10 items-center gap-2 rounded-xs px-1 text-white focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className="type-paragraph-s inline-flex size-6 items-center justify-center rounded-full bg-accent text-white">
            {selected.length}
          </span>
          <span>{countLabel}</span>
          <span className="sr-only">, {open ? labels.hide : labels.show}</span>
          <span aria-hidden className={cn("text-white/60 transition-transform", open && "rotate-180")}>
            ▴
          </span>
        </button>
        <ButtonLink
          href={blueprintHref}
          variant="primary"
          className="w-full sm:w-auto"
          onClick={() =>
            trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_TEAM_DESIGN_CLICKED, {
              ...summary,
              placement: "tray",
            })
          }
        >
          {labels.designCta}
        </ButtonLink>
      </div>
    </aside>
  );
}
