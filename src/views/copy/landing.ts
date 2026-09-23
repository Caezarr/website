import type { Locale } from "@/i18n/config";
import type { LandingPage } from "@/i18n/routes";
import type { LandingCopy } from "@/views/copy/landing-types";
import { AI_CONSULTANCY_COPY } from "@/views/copy/landing/ai-consultancy";
import { AI_FOR_BUSINESS_COPY } from "@/views/copy/landing/ai-for-business";
import { CHATGPT_FOR_BUSINESS_COPY } from "@/views/copy/landing/chatgpt-for-business";
import { KMO_PORTEFEUILLE_COPY } from "@/views/copy/landing/kmo-portefeuille";

/** Copy per landing page; a page only has copy for the locales in LANDING_PATHS. */
export const LANDING_COPY: Record<LandingPage, Partial<Record<Locale, LandingCopy>>> = {
  aiForBusiness: AI_FOR_BUSINESS_COPY,
  aiConsultancy: AI_CONSULTANCY_COPY,
  chatgptForBusiness: CHATGPT_FOR_BUSINESS_COPY,
  kmoPortefeuille: KMO_PORTEFEUILLE_COPY,
};
