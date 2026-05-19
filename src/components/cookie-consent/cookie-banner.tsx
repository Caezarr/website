"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCookieConsent } from "./cookie-consent-provider";

export function CookieBanner() {
  const { acceptAll, rejectAll, openPreferences } = useCookieConsent();

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
      className="fixed right-4 bottom-4 left-4 z-[90] md:left-auto md:max-w-sm"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="rounded-2xl border border-dashed border-border bg-background p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08),_0_1px_1px_rgba(0,0,0,0.04)]">
        <p className="type-paragraph-s text-text/80">
          We use cookies to enhance your experience and analyse our website
          traffic.{" "}
          <Link
            href="/cookies"
            className="text-text underline underline-offset-4 hover:opacity-70"
          >
            Read our cookie policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="type-paragraph-s rounded-xl bg-text px-4 py-2 text-background transition-opacity hover:opacity-90"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="type-paragraph-s rounded-xl bg-light-gray px-4 py-2 text-text transition-opacity hover:opacity-80"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={openPreferences}
            className="type-paragraph-s ml-auto text-text/60 underline underline-offset-4 transition-colors hover:text-text"
          >
            Manage
          </button>
        </div>
      </div>
    </motion.div>
  );
}
