import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { AgentTier } from "@/lib/agent-blueprint";
import type { AgentLibraryCopy } from "@/lib/agent-library/copy";
import type { AgentCardData, AgentCardTool } from "@/lib/agent-library/types";
import { cn } from "@/lib/utils";
import { LibrarySelectionToggle } from "./agent-library-selection";

export type { AgentCardData, AgentCardTool };

const tierDot: Record<AgentTier, string> = {
  Copilot: "bg-blue-400",
  "Human in the loop": "bg-orange-300",
  "Fully autonomous": "bg-green-300",
};

/** Tool icon. `decorative` when the tool name is already written next to it. */
export function ToolLogo({
  tool,
  size = 20,
  decorative = false,
}: {
  tool: AgentCardTool;
  size?: number;
  decorative?: boolean;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-xs border border-border/15 bg-white"
      style={{ width: `${(size + 8) / 16}rem`, height: `${(size + 8) / 16}rem` }}
      title={decorative ? undefined : tool.label}
      aria-hidden={decorative || undefined}
    >
      {tool.iconUrl ? (
        <Image src={tool.iconUrl} alt={decorative ? "" : tool.label} width={size} height={size} className="object-contain" />
      ) : (
        <span className="type-paragraph-s text-black" {...(decorative ? {} : { role: "img", "aria-label": tool.label })}>
          {tool.label.charAt(0)}
        </span>
      )}
    </span>
  );
}

export function AgentCard({
  agent,
  labels,
  locale,
  placement = "card",
  className,
  onClick,
}: {
  agent: AgentCardData;
  labels: AgentLibraryCopy["card"];
  locale?: Locale;
  placement?: string;
  className?: string;
  onClick?: () => void;
}) {
  const useCase = agent.kind === "use-case";
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-sm border border-border/20 bg-background p-6 transition-colors hover:border-accent focus-within:border-accent",
        useCase && "border-dashed",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="type-eyebrow text-text/45">{agent.functionLabel}</p>
        {useCase ? (
          <span className="type-paragraph-s rounded-full border border-border/20 px-2.5 text-text/55">
            {labels.useCase}
          </span>
        ) : agent.tier ? (
          <span className="type-paragraph-s inline-flex items-center gap-1.5 text-text/55">
            <span aria-hidden className={cn("size-1.5 rounded-full", tierDot[agent.tier])} />
            {agent.tierLabel}
          </span>
        ) : null}
      </div>
      <h3 className="type-h6 mt-4 group-hover:text-accent">
        <Link
          href={agent.href}
          onClick={onClick}
          className="after:absolute after:inset-0 after:rounded-sm focus-visible:outline-none"
        >
          {agent.name}
        </Link>
      </h3>
      <p className={cn("type-paragraph-m mt-3 text-text/62", useCase && "line-clamp-3")}>
        {agent.promise}
      </p>
      <div className="mt-auto flex flex-col gap-4 pt-6">
        {agent.tools.length ? (
          <div className="flex items-center gap-1.5">
            {agent.tools.map((tool) => (
              <ToolLogo key={tool.name} tool={tool} />
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <span
            aria-hidden
            className="type-paragraph-m-bold text-text/70 underline-offset-4 group-hover:underline"
          >
            {useCase ? labels.openUseCase : labels.open}
          </span>
          <LibrarySelectionToggle
            slug={agent.slug}
            kind={agent.kind}
            name={agent.name}
            labels={labels}
            locale={locale}
            placement={placement}
          />
        </div>
      </div>
    </article>
  );
}
