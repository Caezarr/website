import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexableEnvironment } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: !isIndexableEnvironment()
      ? [{ userAgent: "*", disallow: "/" }]
      : [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/studio", "/api/"],
          },
        ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
