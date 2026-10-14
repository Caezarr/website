import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SharedBlueprintView } from "@/components/agent-blueprint/shared-blueprint-view";
import type { Locale } from "@/i18n/config";
import { blueprintText as t } from "@/lib/agent-blueprint-copy";
import {
  BLUEPRINT_WONKACHAT_URL,
  blueprintMeetingUrl,
} from "@/lib/agent-blueprint-links";
import {
  parseBlueprintUuid,
  sharedBlueprintPath,
} from "@/lib/agent-blueprint-share";
import { getSharedBlueprint } from "@/lib/agent-blueprint-share-server";
import { getSiteUrl } from "@/lib/site-url";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  nl: "nl_BE",
};

/** Metadata follows the blueprint's own language, whatever the URL prefix. */
export async function sharedAgentBlueprintMetadata(
  id: string,
): Promise<Metadata> {
  const uuid = parseBlueprintUuid(id);
  const blueprint = uuid ? await getSharedBlueprint(uuid) : null;
  if (!uuid || !blueprint) {
    return { robots: { index: false, follow: false } };
  }

  const pageLocale = blueprint.locale;
  const url = `${getSiteUrl()}${sharedBlueprintPath(uuid, pageLocale)}`;
  const title = `${blueprint.result.sector || t(pageLocale, "AI agent blueprint")} · ${t(pageLocale, "AI agent blueprint")} | Wonka AI`;
  const description = blueprint.result.headline;

  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Wonka AI",
      locale: OG_LOCALE[pageLocale],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Public page of a completed blueprint. Content stays anonymised exactly as
 * on the result screen; the UI follows the language the blueprint was
 * written in, so a link opened under another locale is redirected.
 */
export async function SharedAgentBlueprintPage({
  id,
  locale,
}: {
  id: string;
  locale: Locale;
}) {
  const uuid = parseBlueprintUuid(id);
  if (!uuid) notFound();
  const blueprint = await getSharedBlueprint(uuid);
  if (!blueprint) notFound();
  if (blueprint.locale !== locale || id !== uuid) {
    redirect(sharedBlueprintPath(uuid, blueprint.locale));
  }

  return (
    <div lang={locale}>
      <SharedBlueprintView
        blueprint={blueprint}
        locale={locale}
        meetingUrl={blueprintMeetingUrl(locale)}
        wonkaChatUrl={BLUEPRINT_WONKACHAT_URL}
      />
    </div>
  );
}
