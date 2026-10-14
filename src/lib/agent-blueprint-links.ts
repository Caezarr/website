import type { Locale } from "@/i18n/config";

/** Where visitors go to build and run their agents. */
export const BLUEPRINT_WONKACHAT_URL = "https://wonka.chat";

/**
 * Booking link of every meeting CTA on the blueprint pages: EN and FR book
 * directly with Gabriel (French calendar), NL with the Belgian team.
 */
export function blueprintMeetingUrl(locale: Locale): string {
  return locale === "nl"
    ? "https://bookings.cloud.microsoft/book/WonkaAI@meetwonka.com/?ismsaljsauthenabled"
    : "https://bookings.cloud.microsoft/book/WonkaAIFrance@meetwonka.com/?ismsaljsauthenabled";
}

/** WonkaChat page that imports a blueprint's agents in one click. */
export function wonkaChatImportUrl(
  wonkaChatUrl: string,
  assessmentId: string,
): string {
  return `${wonkaChatUrl.replace(/\/+$/, "")}/blueprint/${encodeURIComponent(assessmentId)}`;
}
