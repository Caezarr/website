import type { Metadata } from "next";
import {
  WorkspacePage,
  workspaceMetadata,
} from "@/components/pages/workspace-page";

export const dynamic = "force-static";

// Same page as the homepage: canonical points to `/`.
export function generateMetadata(): Promise<Metadata> {
  return workspaceMetadata("en");
}

export default function WorkspacePageRoute() {
  return <WorkspacePage locale="en" />;
}
