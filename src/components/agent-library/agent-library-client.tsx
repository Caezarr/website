"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { AgentFilmSpec } from "@/lib/agent-film";
import { trackWebsiteEvent, WEBSITE_EVENTS } from "@/lib/analytics";
import { AGENT_FILM_HEIGHT, AGENT_FILM_WIDTH } from "@/lib/agent-film";

const AgentFilmSpecPlayer = dynamic(
  () =>
    import("@/components/agent-blueprint/agent-film/agent-film-player").then(
      (mod) => mod.AgentFilmSpecPlayer,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-black/90"
        style={{ aspectRatio: `${AGENT_FILM_WIDTH} / ${AGENT_FILM_HEIGHT}` }}
      />
    ),
  },
);

/** Demo film of a library agent; also records the detail page view. */
export function LibraryAgentFilm({
  spec,
  slug,
  agentFunction,
  locale,
}: {
  spec: AgentFilmSpec;
  slug: string;
  agentFunction: string;
  locale: Locale;
}) {
  useEffect(() => {
    trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_AGENT_VIEWED, {
      agent: slug,
      function: agentFunction,
      locale,
    });
  }, [slug, agentFunction, locale]);

  return <AgentFilmSpecPlayer spec={spec} playerKey={`${slug}-${locale}`} />;
}

/** One-click import: WonkaChat fetches the agent's export from our API. */
export function LibraryImportButton({
  href,
  slug,
  locale,
  placement,
  children,
}: {
  href: string;
  slug: string;
  locale: Locale;
  placement: string;
  children: ReactNode;
}) {
  return (
    <ButtonLink
      href={href}
      variant="primary"
      data-track="wonkachat_start"
      data-library-cta="import_wonkachat"
      onClick={() =>
        trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_IMPORT_CLICKED, {
          agent: slug,
          locale,
          placement,
        })
      }
    >
      {children}
    </ButtonLink>
  );
}

export function LibraryBlueprintLink({
  href,
  slug,
  locale,
  placement,
  variant = "underline",
  children,
}: {
  href: string;
  slug?: string;
  locale: Locale;
  placement: string;
  variant?: "primary" | "primaryOutline" | "underline" | "text";
  children: ReactNode;
}) {
  const track = () =>
    trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_BLUEPRINT_CLICKED, {
      agent: slug,
      locale,
      placement,
    });
  if (variant === "text") {
    return (
      <Link
        href={href}
        onClick={track}
        className="type-paragraph-m-bold text-current underline underline-offset-4"
      >
        {children}
      </Link>
    );
  }
  return (
    <ButtonLink href={href} variant={variant} onClick={track}>
      {children}
    </ButtonLink>
  );
}
