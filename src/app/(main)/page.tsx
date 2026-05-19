import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { HOMEPAGE_CONTENT_QUERY, SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { HomepageContent, SiteSettings } from "@/lib/types";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Visual } from "@/components/sections/visual";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Stats } from "@/components/sections/stats";
import { UseCases } from "@/components/sections/use-cases";
import { Security } from "@/components/sections/security";
import { HowToStart } from "@/components/sections/how-to-start";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export const dynamic = "force-static";

async function getHomepageContent() {
  const { data } = await sanityFetch({ query: HOMEPAGE_CONTENT_QUERY });
  return data as HomepageContent | null;
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomepageContent();
  return buildMetadata(content?.seo ?? null, { path: "/" });
}

export default async function Home() {
  const [content, settings] = await Promise.all([
    getHomepageContent(),
    getSiteSettings(),
  ]);
  const meetingUrl = settings?.sharedLinks?.meetingUrl ?? null;
  return (
    <>
      <Hero meetingUrl={meetingUrl} />
      <Problem id="problem" />
      <Visual />
      <Solution id="solution" data={content?.solution ?? null} />
      <Stats id="stats" />
      <HowItWorks id="how-it-works" />
      <UseCases id="use-cases" data={content?.useCases ?? null} />
      <HowToStart id="how-to-start" meetingUrl={meetingUrl} />
      <Security id="security" />
      <Testimonials id="testimonials" />
      <Cta id="get-started" meetingUrl={meetingUrl} />
    </>
  );
}
