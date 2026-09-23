import type { Metadata } from "next";
import {
  getWorkspacePageContent,
  WorkspacePage,
} from "@/components/pages/workspace-page";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-static";

const pagePath = "/";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWorkspacePageContent();
  return buildMetadata(content.seo, {
    path: pagePath,
    fallbackTitle:
      WONKA_CHAT_DEFAULTS.seo.metaTitle ??
      "Discover Wonka Workspace | Wonka",
    hreflang: "home",
  });
}

export default function HomePage() {
  return <WorkspacePage />;
}
