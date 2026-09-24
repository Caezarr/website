import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY, WONKA_CHAT_CONTENT_QUERY } from "@sanity/lib/queries";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ContactBlock } from "@/components/sections/contact-block";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { WorkspaceTrialCta } from "@/components/sections/workspace-trial-cta";
import { WorkspaceProductCarousel } from "@/components/sections/workspace-product-carousel";
import { WORKSPACE_CAPABILITY_CLUSTERS } from "@/lib/page-defaults/workspace-capabilities";
import { WORKSPACE_LOGO_STRIP } from "@/lib/page-defaults/workspace-logo-strip";
import { WORKSPACE_PRODUCTS } from "@/lib/page-defaults/workspace-products";
import { resolveWonkaChatContent } from "@/lib/page-defaults/resolve-pages";
import { resolveSectionHeader } from "@/lib/resolve-cms";
import { fetchPageDoc } from "@/lib/localized-content";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings, WonkaChatContent } from "@/lib/types";

const TRIAL_URL = "https://wonka.chat/register";

async function getPageContent() {
  const content = await fetchPageDoc<WonkaChatContent>(
    WONKA_CHAT_CONTENT_QUERY,
    "wonkaChatContent",
    "en",
  );

  return {
    content: resolveWonkaChatContent(content),
  };
}

export async function getWorkspacePageContent() {
  return getPageContent();
}

export async function WorkspacePage() {
  const [{ content }, { data: settings }] = await Promise.all([
    getPageContent(),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <main className="bg-background text-text">
      <ProductHero
        data={{
          ...content.hero,
          eyebrow: "Wonka Workspace",
          title: "The AI workspace for your entire organization.",
          subtitle:
            "Let your entire organization use AI in a safe and secure way. Optimize your work by connecting to your daily tools.",
          theme: "light",
          heroImage: null,
          fallbackHero: {
            src: "/images/workspace/wonka-workspace-header.png",
            alt: "Wonka Workspace product screenshot",
            width: 1024,
            height: 576,
          },
          secondaryLink: {
            label: "Talk to sales",
            href: meetingUrl,
          },
        }}
        meetingUrl={TRIAL_URL}
        meetingLabel="Start free trial"
        secondaryMeetingTrackType="wonka-chat"
      />
      <LogoStrip data={WORKSPACE_LOGO_STRIP} logoSize="lg" marquee />
      <WorkspaceProductCarousel data={WORKSPACE_PRODUCTS} />
      <CapabilityGrid id="capabilities" data={WORKSPACE_CAPABILITY_CLUSTERS} />
      <WorkspaceTrialCta href={TRIAL_URL} />
      <FaqSection data={content.faq} bordered={false} />
      <ContactBlock
        id="contact"
        data={{
          ...content.contact,
          header: resolveSectionHeader(content.contact.header, {
            eyebrow: null,
            heading: "Book a demo meeting.",
            body: null,
          }),
        }}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="wonka-chat"
        className="py-18 text-center md:py-24"
      />
    </main>
  );
}
