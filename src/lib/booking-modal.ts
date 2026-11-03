import { getLocaleFromPathname } from "@/i18n/routes";
import { isBookingUrl, resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { MeetingContext } from "@/lib/shared-links-defaults";
import type { SharedLinks } from "@/lib/types";

export const BOOKING_COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-250",
  "251-1000",
  "1000+",
] as const;
export type BookingCompanySize = (typeof BOOKING_COMPANY_SIZES)[number];

export const BOOKING_NEEDS = [
  "workspace",
  "agents",
  "odoo",
  "training",
  "unsure",
] as const;
export type BookingNeed = (typeof BOOKING_NEEDS)[number];

export type BookingLinks = Pick<
  SharedLinks,
  | "meetingUrl"
  | "startAiMeetingUrl"
  | "wonkaBuildMeetingUrl"
  | "wonkaChatMeetingUrl"
  | "franceMeetingUrl"
>;

export function pickBookingLinks(
  sharedLinks: SharedLinks | null | undefined,
): BookingLinks | null {
  if (!sharedLinks) return null;
  return {
    meetingUrl: sharedLinks.meetingUrl ?? null,
    startAiMeetingUrl: sharedLinks.startAiMeetingUrl ?? null,
    wonkaBuildMeetingUrl: sharedLinks.wonkaBuildMeetingUrl ?? null,
    wonkaChatMeetingUrl: sharedLinks.wonkaChatMeetingUrl ?? null,
    franceMeetingUrl: sharedLinks.franceMeetingUrl ?? null,
  };
}

/** Calendar a qualification answer points to; `null` keeps the page's calendar. */
const NEED_TO_CONTEXT: Record<BookingNeed, MeetingContext | null> = {
  workspace: "wonka-chat",
  odoo: "wonka-chat",
  agents: "wonka-build",
  training: "start-ai",
  unsure: null,
};

function asSharedLinks(links: BookingLinks | null | undefined): SharedLinks | null {
  if (!links) return null;
  return {
    ...links,
    meetingLabel: null,
    startAiUrl: null,
    wonkaBuildUrl: null,
    wonkaChatUrl: null,
  };
}

function sameUrl(a: string, b: string): boolean {
  try {
    return new URL(a).href === new URL(b).href;
  } catch {
    return a === b;
  }
}

/** Host and path of a URL for analytics; empty when it cannot be parsed. */
export function bookingUrlParts(href: string): { host?: string; path?: string } {
  try {
    const url = new URL(href);
    return { host: url.hostname, path: url.pathname };
  } catch {
    return {};
  }
}

/**
 * Booking page opened from the modal (new tab and "Open the calendar" link).
 * French pages (`/fr/*`, `/france*`) always get the French calendar. Elsewhere
 * the CTA's own calendar is kept, unless it is the general team calendar and
 * the visitor's main need points to a product calendar.
 */
export function resolveBookingModalUrl({
  href,
  pathname,
  links,
  need,
}: {
  href: string;
  pathname: string | null | undefined;
  links?: BookingLinks | null;
  need?: BookingNeed | null;
}): string {
  const sharedLinks = asSharedLinks(links);
  const locale = getLocaleFromPathname(pathname);
  if (locale === "fr") return resolveMeetingUrl(sharedLinks, "france", "fr");

  const target = need ? NEED_TO_CONTEXT[need] : null;
  if (!target) return href;

  const isGeneralCalendar = sameUrl(
    href,
    resolveMeetingUrl(sharedLinks, "default", locale),
  );
  return isGeneralCalendar ? resolveMeetingUrl(sharedLinks, target, locale) : href;
}

export type BookingCalendar =
  | "france"
  | "wonka-chat"
  | "wonka-build"
  | "start-ai"
  | "team";

/** Which team calendar a resolved booking URL belongs to (for copy and analytics). */
export function identifyBookingCalendar({
  url,
  pathname,
  links,
}: {
  url: string;
  pathname: string | null | undefined;
  links?: BookingLinks | null;
}): BookingCalendar {
  const locale = getLocaleFromPathname(pathname);
  if (locale === "fr") return "france";
  const sharedLinks = asSharedLinks(links);
  if (sameUrl(url, resolveMeetingUrl(sharedLinks, "default", locale))) return "team";
  const candidates = ["wonka-chat", "wonka-build", "start-ai"] as const;
  return (
    candidates.find((context) =>
      sameUrl(url, resolveMeetingUrl(sharedLinks, context, locale)),
    ) ?? "team"
  );
}

export type BookingClickEvent = Pick<
  MouseEvent,
  "button" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey" | "defaultPrevented"
>;

export type BookingClickAnchor = {
  href: string;
  hasAttribute(name: string): boolean;
  getAttribute(name: string): string | null;
};

export const BOOKING_MODAL_OPT_OUT_ATTRIBUTE = "data-booking-modal";

/**
 * Only plain primary clicks on Bookings links open the modal. Modifier and
 * middle clicks keep the browser's native behaviour (new tab / window).
 */
export function shouldInterceptBookingClick(
  event: BookingClickEvent,
  anchor: BookingClickAnchor,
): boolean {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute(BOOKING_MODAL_OPT_OUT_ATTRIBUTE) === "off") return false;
  return isBookingUrl(anchor.href);
}
