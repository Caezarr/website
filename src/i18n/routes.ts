import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { HREFLANG } from "@/lib/hreflang";

/**
 * Commercial pages published in every locale. The slug is shared across
 * locales: EN lives at the root (`/start-ai`), FR/NL are prefixed
 * (`/fr/start-ai`, `/nl/start-ai`). Home is `/`, `/fr`, `/nl`.
 */
export const COMMERCIAL_PATHS = {
  home: "/",
  startAi: "/start-ai",
  wonkaBuild: "/wonka-build",
  aiAgents: "/ai-agents",
  wonkaChat: "/wonka-chat",
  wonkaChatOdoo: "/wonka-chat/odoo",
  aiChat: "/workspace/ai-chat",
  security: "/security",
  pricing: "/pricing",
  contact: "/contact",
} as const;

export type CommercialPage = keyof typeof COMMERCIAL_PATHS;

/** Locales that get a prefixed copy of the commercial pages. */
export const TRANSLATED_LOCALES = ["fr", "nl"] as const satisfies readonly Locale[];

const COMMERCIAL_PATH_SET = new Set<string>(Object.values(COMMERCIAL_PATHS));

/** Content hubs whose first segment changes per locale (see locale-path.ts). */
const HUB_SEGMENTS: Record<string, Record<Locale, string>> = {
  blog: { en: "blog", fr: "blog", nl: "blog" },
  integrations: { en: "integrations", fr: "integrations", nl: "integrations" },
  learn: { en: "learn", fr: "apprendre", nl: "leren" },
  vs: { en: "vs", fr: "vs", nl: "vs" },
  "case-studies": { en: "case-studies", fr: "cas-clients", nl: "klantcases" },
};

export function commercialPath(page: CommercialPage, locale: Locale): string {
  const path = COMMERCIAL_PATHS[page];
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  const first = pathname?.split("/")[1];
  return first === "fr" || first === "nl" ? first : "en";
}

/** Strip the locale prefix: `/fr/start-ai` → `/start-ai`, `/nl` → `/`. */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale === "en") return pathname;
  const rest = pathname.slice(locale.length + 1);
  return rest === "" ? "/" : rest;
}

/**
 * Map an internal EN href to its equivalent in `locale`. Only pages that
 * exist in that locale are rewritten (commercial pages and content hubs);
 * everything else (legal pages, anchors, external URLs) is returned as-is.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(.*)$/);
  const path = match?.[1] || "/";
  const suffix = match?.[2] ?? "";

  if (COMMERCIAL_PATH_SET.has(path)) {
    return `${path === "/" ? `/${locale}` : `/${locale}${path}`}${suffix}`;
  }

  const [, first, ...rest] = path.split("/");
  const segments = HUB_SEGMENTS[first];
  if (segments) {
    return `/${locale}/${[segments[locale], ...rest].join("/")}${suffix}`;
  }

  return href;
}

/** Find the commercial page a pathname belongs to, if any. */
export function commercialPageFromPathname(pathname: string): CommercialPage | null {
  const path = stripLocale(pathname);
  const entry = Object.entries(COMMERCIAL_PATHS).find(([, p]) => p === path);
  return (entry?.[0] as CommercialPage | undefined) ?? null;
}

/** hreflang map (absolute URLs) for a commercial page. */
export function commercialLanguages(
  siteUrl: string,
  page: CommercialPage,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const path = commercialPath(page, locale);
    languages[HREFLANG[locale]] = path === "/" ? siteUrl : `${siteUrl}${path}`;
  }
  languages["x-default"] = languages[HREFLANG.en];
  return languages;
}
