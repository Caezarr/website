import type { Locale } from "@/i18n/config";
import type { LandingPage } from "@/i18n/routes";
import type { LandingCopy } from "@/views/copy/landing-types";
import { AI_CONSULTANCY_COPY } from "@/views/copy/landing/ai-consultancy";
import { AI_FOR_BUSINESS_COPY } from "@/views/copy/landing/ai-for-business";
import { CHATGPT_FOR_BUSINESS_COPY } from "@/views/copy/landing/chatgpt-for-business";

/** Pages rendered by SeoLandingView (the KMO-portefeuille page has its own components). */
export type TemplateLandingPage = Exclude<LandingPage, "kmoPortefeuille">;

export const LANDING_COPY: Record<
  TemplateLandingPage,
  Record<Locale, LandingCopy>
> = {
  aiForBusiness: AI_FOR_BUSINESS_COPY,
  aiConsultancy: AI_CONSULTANCY_COPY,
  chatgptForBusiness: CHATGPT_FOR_BUSINESS_COPY,
};
