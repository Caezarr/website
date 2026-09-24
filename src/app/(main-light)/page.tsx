import type { Metadata } from "next";
import {
  WorkspacePage,
  workspaceMetadata,
} from "@/components/pages/workspace-page";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return workspaceMetadata("en");
}

export default function HomePage() {
  return <WorkspacePage locale="en" />;
}
