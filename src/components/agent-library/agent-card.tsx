import Image from "next/image";
import Link from "next/link";
import type { AgentTier } from "@/lib/agent-blueprint";
import type { AgentCardData, AgentCardTool } from "@/lib/agent-library/types";
import { cn } from "@/lib/utils";

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
  openLabel,
  className,
  onClick,
}: {
  agent: AgentCardData;
  openLabel: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={agent.href}
      onClick={onClick}
      className={cn(
        "group flex h-full flex-col rounded-sm border border-border/20 bg-background p-6 transition-colors hover:border-accent focus-visible:border-accent",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="type-eyebrow text-text/45">{agent.functionLabel}</p>
        <span className="type-paragraph-s inline-flex items-center gap-1.5 text-text/55">
          <span aria-hidden className={cn("size-1.5 rounded-full", tierDot[agent.tier])} />
          {agent.tierLabel}
        </span>
      </div>
      <h3 className="type-h6 mt-4 group-hover:text-accent">{agent.name}</h3>
      <p className="type-paragraph-m mt-3 text-text/62">{agent.promise}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <div className="flex items-center gap-1.5">
          {agent.tools.map((tool) => (
            <ToolLogo key={tool.name} tool={tool} />
          ))}
        </div>
        <span className="type-paragraph-m-bold text-text/70 underline-offset-4 group-hover:underline">
          {openLabel}
        </span>
      </div>
    </Link>
  );
}
