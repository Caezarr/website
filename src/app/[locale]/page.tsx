import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  HOMEPAGE_CONTENT_QUERY,
  SITE_SETTINGS_QUERY,
} from "@sanity/lib/queries";
import type { HomepageContent, SiteSettings, Locale } from "@/lib/types";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { HomepageHeroExperiment } from "@/components/sections/homepage-hero-experiment";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Stats } from "@/components/sections/stats";
import { UseCases } from "@/components/sections/use-cases";
import { Security } from "@/components/sections/security";
import { HowToStart } from "@/components/sections/how-to-start";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: string }>;
}

async function getHomepageContent() {
  const { data } = await sanityFetch({ query: HOMEPAGE_CONTENT_QUERY });
  return data as HomepageContent | null;
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getHomepageContent();
  const path = `/${locale}`;
  return buildMetadata(content?.seo ?? null, {
    path,
    locale: locale as Locale,
    hreflang: "home",
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;
  const [content, settings] = await Promise.all([
    getHomepageContent(),
    getSiteSettings(),
  ]);

  const meetingUrl = resolveMeetingUrl(settings?.sharedLinks, "general");

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Content not found</p>
      </div>
    );
  }

  return (
    <>
      <HomepageHeroExperiment data={content.hero} />
      <Problem id="problem" items={content.problem} />
      <Solution id="solution" data={content.solution} />
      <HowItWorks id="how-it-works" data={content.howItWorks} />
      <Stats id="stats" />
      <UseCases id="use-cases" data={content.useCases} />
      <Security id="security" data={content.security} />
      <HowToStart id="how-to-start" data={content.howToStart} />
      <Testimonials id="testimonials" data={content.testimonials} />
      <Cta
        meetingUrl={meetingUrl}
        data={content.cta}
        meetingTrackType="general"
      />
    </>
  );
}
