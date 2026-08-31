"use client";

import posthog from "posthog-js";

export const WEBSITE_EVENTS = {
  CTA_CLICKED: "website_cta_clicked",
  LEAD_STARTED: "website_lead_started",
  LEAD_SUBMITTED: "website_lead_submitted",
  DIAGNOSTIC_STARTED: "website_diagnostic_started",
  DIAGNOSTIC_COMPLETED: "website_diagnostic_completed",
  TRIAL_CLICKED: "website_trial_clicked",
} as const;

export type WebsiteEvent = (typeof WEBSITE_EVENTS)[keyof typeof WEBSITE_EVENTS];

const ALLOWED_EVENTS = new Set<string>(["$pageview", "$identify", "$set", ...Object.values(WEBSITE_EVENTS)]);
const ATTRIBUTION_STORAGE_KEY = "wonka:attribution";
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

type ConsentCategories = { analytics: boolean; marketing: boolean };

let initialized = false;
let currentConsent: ConsentCategories = { analytics: false, marketing: false };

function readAttribution(): Attribution {
  try {
    return JSON.parse(localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}

function captureAttribution(): Attribution {
  const stored = readAttribution();
  const params = new URLSearchParams(window.location.search);
  const next: Attribution = { ...stored };

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    if (value) next[key] = value.slice(0, 500);
  }
  next.landing_page ||= window.location.href.slice(0, 2_000);
  next.referrer ||= document.referrer.slice(0, 2_000);

  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Analytics remains usable when storage is unavailable.
  }
  return next;
}

export function initializeWebsiteAnalytics(consent: ConsentCategories): void {
  currentConsent = consent;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
  if (!key || !consent.analytics) {
    if (initialized) posthog.opt_out_capturing();
    return;
  }

  if (!initialized) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com",
      ui_host: "https://eu.posthog.com",
      defaults: "2026-01-30",
      autocapture: false,
      capture_pageview: "history_change",
      capture_pageleave: false,
      disable_session_recording: true,
      person_profiles: "identified_only",
      before_send: (event) => (event && ALLOWED_EVENTS.has(event.event) ? event : null),
      loaded: (client) => {
        client.register({
          source_app: "website",
          environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "unknown",
          event_version: 1,
          ...captureAttribution(),
        });
      },
    });
    initialized = true;
  } else {
    posthog.opt_in_capturing();
    posthog.register({ ...captureAttribution(), source_app: "website", event_version: 1 });
  }
}

export function trackWebsiteEvent(
  event: WebsiteEvent,
  properties: Record<string, unknown> = {},
): void {
  if (initialized && currentConsent.analytics && !posthog.has_opted_out_capturing()) {
    posthog.capture(event, properties);
    window.dataLayer?.push({ event, ...properties });
  }

  if (!currentConsent.marketing) return;
  const conversion =
    event === WEBSITE_EVENTS.DIAGNOSTIC_COMPLETED
      ? "Lead"
      : event === WEBSITE_EVENTS.TRIAL_CLICKED
        ? "StartTrial"
        : null;
  if (!conversion) return;
  window.fbq?.("track", conversion, properties);
  window.dataLayer?.push({ event: `ads_${conversion.toLowerCase()}`, ...properties });
}

export function getLeadAnalyticsContext(): Record<string, unknown> {
  const attribution = typeof window === "undefined" ? {} : captureAttribution();
  return {
    ...attribution,
    posthog_distinct_id: initialized ? posthog.get_distinct_id() : undefined,
    posthog_session_id: initialized ? posthog.get_session_id() : undefined,
    landing_path: window.location.pathname,
    analytics_consent: initialized && !posthog.has_opted_out_capturing(),
  };
}

export function markLeadQualified(properties: {
  lead_id: string;
  lifecycle_stage: "lead" | "mql";
  lead_score: number;
  lead_source: string;
}): void {
  if (!initialized || posthog.has_opted_out_capturing()) return;
  posthog.createPersonProfile();
  posthog.setPersonProperties(properties);
  trackWebsiteEvent(WEBSITE_EVENTS.LEAD_SUBMITTED, properties);
}

export function decorateWonkaChatUrl(href: string): string {
  const url = new URL(href, window.location.href);
  if (url.hostname !== "wonka.chat" && !url.hostname.endsWith(".wonka.chat")) return href;

  const attribution = captureAttribution();
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }

  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
  if (initialized && !posthog.has_opted_out_capturing()) {
    hash.set("ph_distinct_id", posthog.get_distinct_id());
    hash.set("ph_session_id", posthog.get_session_id());
  }
  url.hash = hash.toString();
  return url.toString();
}
