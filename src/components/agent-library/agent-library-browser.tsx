"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackWebsiteEvent, WEBSITE_EVENTS } from "@/lib/analytics";
import { formatResultCount, type AgentLibraryCopy } from "@/lib/agent-library/copy";
import {
  AGENT_FUNCTIONS,
  AGENT_SECTORS,
  type AgentFunction,
  type AgentSector,
} from "@/lib/agent-library/types";
import type { Locale } from "@/i18n/config";
import { AgentCard, type AgentCardData } from "./agent-card";

/** Cards rendered in full before "Show more"; the rest stay in the HTML as plain links. */
const PAGE_SIZE = 36;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function FilterSelect<T extends string>({
  label,
  value,
  options,
  allLabel,
  onChange,
}: {
  label: string;
  value: T | "";
  options: Array<{ value: T; label: string }>;
  allLabel: string;
  onChange: (value: T | "") => void;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="type-eyebrow text-text/45">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T | "")}
        className="type-paragraph-m h-11 w-full rounded-xs border border-border/30 bg-background px-3 text-text focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Search and filters over the full, server-rendered list of agents and use
 * cases. Every entry is linked in the HTML so crawlers see the whole
 * catalogue; past the first page, entries render as hidden plain links until
 * "Show more" turns them into cards.
 */
export function AgentLibraryBrowser({
  agents,
  tools,
  copy,
  locale,
}: {
  agents: AgentCardData[];
  tools: Array<{ name: string; label: string }>;
  copy: AgentLibraryCopy;
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [fn, setFn] = useState<AgentFunction | "">("");
  const [sector, setSector] = useState<AgentSector | "">("");
  const [tool, setTool] = useState("");
  const searchId = useId();

  const haystacks = useMemo(
    () => agents.map((agent) => `${normalize(`${agent.name} ${agent.promise}`)} ${agent.searchText}`),
    [agents],
  );

  const filtered = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return agents.filter(
      (agent, index) =>
        (!fn || agent.function === fn) &&
        (!sector || agent.sectors.includes(sector)) &&
        (!tool || agent.tools.some((item) => item.name === tool)) &&
        words.every((word) => haystacks[index].includes(word)),
    );
  }, [agents, haystacks, query, fn, sector, tool]);

  // Only track real filter changes: not the initial render, and not React's
  // dev-mode effect replay with unchanged filters.
  const filterKey = JSON.stringify([query.trim(), fn, sector, tool]);
  const [page, setPage] = useState({ key: filterKey, limit: PAGE_SIZE });
  const limit = page.key === filterKey ? page.limit : PAGE_SIZE;
  const showMore = () => setPage({ key: filterKey, limit: limit + PAGE_SIZE });
  const trackedKey = useRef(filterKey);
  useEffect(() => {
    if (filterKey === trackedKey.current) return;
    const timer = window.setTimeout(() => {
      trackedKey.current = filterKey;
      trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_FILTER, {
        locale,
        function: fn || undefined,
        sector: sector || undefined,
        tool: tool || undefined,
        has_query: Boolean(query.trim()),
        query_length: query.trim().length,
        results: filtered.length,
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [filterKey, query, fn, sector, tool, filtered.length, locale]);

  const hasFilter = Boolean(query || fn || sector || tool);
  const reset = () => {
    setQuery("");
    setFn("");
    setSector("");
    setTool("");
  };

  return (
    <div>
      <div className="grid gap-4 rounded-sm border border-border/20 bg-light-gray p-4 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:p-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={searchId} className="type-eyebrow text-text/45">
            {copy.filters.searchLabel}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.filters.searchPlaceholder}
            autoComplete="off"
            className="type-paragraph-m h-11 w-full rounded-xs border border-border/30 bg-background px-3 text-text placeholder:text-text/40 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
        <FilterSelect
          label={copy.filters.function}
          value={fn}
          allLabel={copy.filters.all}
          options={AGENT_FUNCTIONS.map((value) => ({ value, label: copy.functions[value] }))}
          onChange={setFn}
        />
        <FilterSelect
          label={copy.filters.sector}
          value={sector}
          allLabel={copy.filters.all}
          options={AGENT_SECTORS.map((value) => ({ value, label: copy.sectors[value] }))}
          onChange={setSector}
        />
        <FilterSelect
          label={copy.filters.tool}
          value={tool}
          allLabel={copy.filters.all}
          options={tools.map((item) => ({ value: item.name, label: item.label }))}
          onChange={setTool}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="type-paragraph-m text-text/60" aria-live="polite">
          {formatResultCount(copy, filtered.length)}
        </p>
        {hasFilter ? (
          <button
            type="button"
            onClick={reset}
            className="type-paragraph-m text-text/70 underline underline-offset-4 hover:text-text"
          >
            {copy.filters.reset}
          </button>
        ) : null}
      </div>

      {filtered.length ? (
        <>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((agent, index) =>
              index < limit ? (
                <li key={agent.slug}>
                  <AgentCard agent={agent} labels={copy.card} />
                </li>
              ) : (
                <li key={agent.slug} hidden>
                  <Link href={agent.href} prefetch={false} tabIndex={-1}>
                    {agent.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
          {filtered.length > limit ? (
            <div className="mt-10 flex justify-center">
              <Button type="button" variant="secondary" onClick={showMore}>
                {copy.filters.showMore}
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <p className="type-body mt-10 max-w-2xl text-text/60">{copy.filters.empty}</p>
      )}
    </div>
  );
}
