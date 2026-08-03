import type { Metadata } from "next";
import { AgentBlueprintExperience } from "@/components/agent-blueprint/agent-blueprint-experience";
import { BreadcrumbSchema } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings } from "@/lib/types";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";

export const dynamic = "force-static";

const pagePath = "/ai-agent-blueprint";
const title = "Free AI Agent Blueprint for Your Company | Wonka AI";
const description =
  "Get three anonymous AI agent recommendations for your company, grounded in 570 real-world enterprise AI use cases.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${getSiteUrl()}${pagePath}` },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}${pagePath}`,
    type: "website",
    siteName: "Wonka AI",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function AgentBlueprintPage() {
  const siteUrl = getSiteUrl();
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const meetingUrl = resolveMeetingUrl(
    (settings as SiteSettings | null)?.sharedLinks,
    "default",
  );

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          {
            name: "AI Agent Blueprint",
            url: `${siteUrl}${pagePath}`,
          },
        ]}
      />
      <AgentBlueprintExperience meetingUrl={meetingUrl} />
    </main>
  );
}

