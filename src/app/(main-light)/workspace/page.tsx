import type { Metadata } from "next";
import {
  getWorkspacePageContent,
  WorkspacePage,
} from "@/components/pages/workspace-page";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const pagePath = "/workspace";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWorkspacePageContent();
  const metadata = buildMetadata(content.seo, {
    path: pagePath,
    fallbackTitle:
      WONKA_CHAT_DEFAULTS.seo.metaTitle ??
      "Discover Wonka Workspace | Wonka",
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: getSiteUrl(),
    },
  };
}

export default function WorkspacePageRoute() {
  return <WorkspacePage />;
}
