import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified },
    { url: `${siteUrl}/ai-agents`, lastModified },
    { url: `${siteUrl}/terms`, lastModified },
    { url: `${siteUrl}/privacy`, lastModified },
    { url: `${siteUrl}/cookies`, lastModified },
  ];
}
