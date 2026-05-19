"use client";

import { useCookieConsent } from "./cookie-consent-provider";

export function CookieSettingsLink({ className }: { className?: string }) {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className ?? "text-text/60 transition-colors hover:text-text"}
    >
      Cookie settings
    </button>
  );
}
