const PRODUCTION_SITE_URL = "https://www.wonka-ai.com";

/** Canonicals must never inherit a deployment-specific Vercel hostname. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured) return PRODUCTION_SITE_URL;
  const url = new URL(configured);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials",
    );
  }
  if (url.hostname === "wonka-ai.com") return PRODUCTION_SITE_URL;
  return url.origin;
}

export function isIndexableEnvironment(): boolean {
  return (
    process.env.VERCEL_ENV !== "preview" && process.env.SEO_NOINDEX !== "true"
  );
}
