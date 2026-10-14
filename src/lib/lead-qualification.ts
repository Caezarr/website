import type { BookingCompanySize, BookingNeed } from "@/lib/booking-modal";
import type { LeadSource } from "@/lib/lead-capture";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
]);

export type LeadLifecycleStage = "lead" | "mql";

export type LeadQualification = {
  lifecycleStage: LeadLifecycleStage;
  score: number;
  signals: string[];
};

export function qualifyLead(
  email: string,
  source: LeadSource,
  attribution: Record<string, string>,
): LeadQualification {
  const signals: string[] = [];
  let score = 0;
  const domain = email.split("@")[1] || "";

  if (!FREE_EMAIL_DOMAINS.has(domain)) {
    score += 25;
    signals.push("business_email");
  }

  const sourceScores: Record<LeadSource, number> = {
    "start-ai-hero": 20,
    "start-ai-flanders-hero": 25,
    "wonka-chat-hero": 25,
    "wonka-chat-odoo-hero": 30,
    "france-diagnostic": 35,
  };
  score += sourceScores[source];
  signals.push(`intent:${source}`);

  if (attribution.utm_campaign) {
    score += 10;
    signals.push("campaign_attributed");
  }
  if (["cpc", "paid", "paid_social"].includes(attribution.utm_medium?.toLowerCase())) {
    score += 10;
    signals.push("paid_high_intent");
  }

  return {
    lifecycleStage: score >= 50 ? "mql" : "lead",
    score,
    signals,
  };
}

/**
 * Booking-modal answers, scored on the same scale as `qualifyLead` (MQL at
 * 50). Asking for a call is already high intent; company size and a concrete
 * need raise the score.
 */
export function qualifyBookingAnswers(
  answers: { companySize: BookingCompanySize | null; need: BookingNeed | null },
  attribution: Record<string, unknown> = {},
): LeadQualification {
  const signals = ["intent:booking-modal"];
  let score = 30;

  const sizeScores: Record<BookingCompanySize, number> = {
    "1-10": 0,
    "11-50": 15,
    "51-250": 25,
    "251-1000": 25,
    "1000+": 20,
  };
  if (answers.companySize) {
    score += sizeScores[answers.companySize];
    signals.push(`company_size:${answers.companySize}`);
  }
  if (answers.need && answers.need !== "unsure") {
    score += 10;
    signals.push(`need:${answers.need}`);
  }
  if (typeof attribution.utm_campaign === "string" && attribution.utm_campaign) {
    score += 10;
    signals.push("campaign_attributed");
  }
  const medium =
    typeof attribution.utm_medium === "string" ? attribution.utm_medium.toLowerCase() : "";
  if (["cpc", "paid", "paid_social"].includes(medium)) {
    score += 10;
    signals.push("paid_high_intent");
  }

  return {
    lifecycleStage: score >= 50 ? "mql" : "lead",
    score,
    signals,
  };
}
