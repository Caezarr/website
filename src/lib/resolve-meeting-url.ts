import { DEFAULT_MEETING_URLS, type MeetingContext } from "@/lib/shared-links-defaults";
import type { Locale } from "@/i18n/config";
import type { SharedLinks } from "@/lib/types";

/**
 * Booking link for a meeting CTA. French pages always book with the French
 * team, whatever the page context; other locales use the context's calendar.
 */
export function resolveMeetingUrl(
  sharedLinks: SharedLinks | null | undefined,
  context: MeetingContext = "default",
  locale?: Locale,
): string {
  if (locale === "fr") context = "france";
  switch (context) {
    case "start-ai":
      return (
        sharedLinks?.startAiMeetingUrl ??
        sharedLinks?.meetingUrl ??
        DEFAULT_MEETING_URLS.startAi
      );
    case "wonka-build":
      return (
        sharedLinks?.wonkaBuildMeetingUrl ??
        sharedLinks?.meetingUrl ??
        DEFAULT_MEETING_URLS.wonkaBuild
      );
    case "wonka-chat":
      return (
        sharedLinks?.wonkaChatMeetingUrl ??
        sharedLinks?.meetingUrl ??
        DEFAULT_MEETING_URLS.wonkaChat
      );
    case "france":
      // France must have its own URL set in Sanity or env var; never fall back to HQ
      return (
        sharedLinks?.franceMeetingUrl ??
        DEFAULT_MEETING_URLS.france
      );
    default:
      return sharedLinks?.meetingUrl ?? DEFAULT_MEETING_URLS.team;
  }
}

/** For routes that only fetch the team meeting URL scalar from Sanity. */
export function resolveTeamMeetingUrl(
  teamUrl: string | null | undefined,
  locale?: Locale,
): string {
  if (locale === "fr") return DEFAULT_MEETING_URLS.france;
  return teamUrl ?? DEFAULT_MEETING_URLS.team;
}

const BOOKING_HOSTS = new Set(["outlook.office.com", "bookings.cloud.microsoft"]);

/** True for Microsoft Bookings links (the team calendars): https, exact host, /book path. */
export function isBookingUrl(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    const url = new URL(href);
    return (
      url.protocol === "https:" &&
      BOOKING_HOSTS.has(url.hostname) &&
      url.pathname.startsWith("/book")
    );
  } catch {
    return false;
  }
}
