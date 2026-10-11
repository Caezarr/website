import type { Metadata } from "next";
import { AgentLibraryView, agentLibraryMetadata } from "@/views/agent-library";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return agentLibraryMetadata("en");
}

export default function AgentLibraryPage() {
  return <AgentLibraryView locale="en" />;
}
