import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLibraryAgent, LIBRARY_AGENTS } from "@/lib/agent-library";
import { LibraryAgentView, libraryAgentMetadata } from "@/views/agent-library-agent";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LIBRARY_AGENTS.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getLibraryAgent(slug);
  if (!agent) notFound();
  return libraryAgentMetadata(agent, "en");
}

export default async function LibraryAgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = getLibraryAgent(slug);
  if (!agent) notFound();
  return <LibraryAgentView agent={agent} locale="en" />;
}
