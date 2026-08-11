import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { WONKA_CHAT_CONTENT_QUERY } from "@sanity/lib/queries";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { WorkspaceTrialCta } from "@/components/sections/workspace-trial-cta";
import { DEFAULT_WONKA_CHAT_SECURITY } from "@/lib/cms-sections";
import { AI_CHAT_CAPABILITY_CLUSTERS } from "@/lib/page-defaults/ai-chat-capability-grid";
import { resolveWonkaChatContent } from "@/lib/page-defaults/resolve-pages";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import { buildMetadata } from "@/lib/seo";
import type { WonkaChatContent } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/workspace/ai-chat";

async function getPageContent() {
  const { data } = await sanityFetch({ query: WONKA_CHAT_CONTENT_QUERY });

  return {
    content: resolveWonkaChatContent((data as WonkaChatContent | null) ?? null),
    rawContent: data as WonkaChatContent | null,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getPageContent();
  return buildMetadata(content.seo, {
    path: pagePath,
    fallbackTitle: WONKA_CHAT_DEFAULTS.seo.metaTitle ?? "AI Chat | Wonka",
  });
}

export default async function WorkspaceAiChatPage() {
  const { content, rawContent } = await getPageContent();

  return (
    <main className="bg-background text-text">
      <ProductHero
        data={{
          ...content.hero,
          eyebrow: "AI Chat",
          title: "Safe AI chat.",
          subtitle:
            "The best AI models, connected to your company knowledge, running in the EU.",
          theme: "light",
          heroImage: null,
          fallbackHero: {
            src: "/images/wonka-chat/wonka-ai-chat-header.png",
            alt: "Wonka AI chat workspace",
            width: 3840,
            height: 2160,
          },
        }}
        meetingUrl="https://wonka.chat/"
        meetingLabel="Start free trial"
      />
      <LogoStrip data={content.logoStrip} />
      <CapabilityGrid id="capabilities" data={AI_CHAT_CAPABILITY_CLUSTERS} />
      <FaqSection data={content.faq} variant="plain" bordered={false} />
      <Security
        id="security"
        data={rawContent?.security ?? null}
        defaults={DEFAULT_WONKA_CHAT_SECURITY}
      />
      <WorkspaceTrialCta />
    </main>
  );
}
