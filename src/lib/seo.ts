import type { Metadata } from "next";
import type { SeoData } from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";

const HOME_TITLE = "Wonka AI – Private Enterprise AI, Deployed on Your Infrastructure";
const DEFAULT_DESCRIPTION =
  "Wonka AI deploys a private LLM inside your enterprise — connected to SharePoint, Salesforce, Slack and more, with full data sovereignty and GDPR compliance.";
const SITE_NAME = "Wonka AI";
const DEFAULT_OG_IMAGE = "/opengraph-image.jpg";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  nl: "nl_BE",
};

export interface BuildMetadataOptions {
  path: string;
  fallbackTitle?: string;
  locale?: string;
}

export function buildMetadata(
  seo: SeoData | null,
  options: BuildMetadataOptions,
): Metadata {
  const { path, fallbackTitle, locale = "en" } = options;
  const isHome = path === "/";

  const cmsTitle = seo?.metaTitle;
  const title: Metadata["title"] = cmsTitle
    ? { absolute: cmsTitle }
    : isHome
      ? { absolute: HOME_TITLE }
      : (fallbackTitle ?? SITE_NAME);

  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  const ogTitle = cmsTitle || (isHome ? HOME_TITLE : fallbackTitle ? `${fallbackTitle} – ${SITE_NAME}` : SITE_NAME);
  const customOgImage = seo?.ogImage || undefined;
  const ogLocale = OG_LOCALE[locale] ?? "en_US";

  return {
    title,
    description,
    alternates: {
      canonical: `${getSiteUrl()}${path}`,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      url: `${getSiteUrl()}${path}`,
      locale: ogLocale,
      images: [{ url: customOgImage ?? DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [customOgImage ?? DEFAULT_OG_IMAGE],
    },
  };
}
