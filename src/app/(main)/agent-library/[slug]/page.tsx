import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLibraryEntry, LIBRARY_ENTRIES } from "@/lib/agent-library";
import { LibraryAgentView, libraryAgentMetadata } from "@/views/agent-library-agent";
import { LibraryUseCaseView, libraryUseCaseMetadata } from "@/views/agent-library-use-case";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LIBRARY_ENTRIES.map(({ entry }) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getLibraryEntry(slug);
  if (!item) notFound();
  return item.kind === "agent"
    ? libraryAgentMetadata(item.entry, "en")
    : libraryUseCaseMetadata(item.entry, "en");
}

export default async function LibraryAgentPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getLibraryEntry(slug);
  if (!item) notFound();
  return item.kind === "agent" ? (
    <LibraryAgentView agent={item.entry} locale="en" />
  ) : (
    <LibraryUseCaseView useCase={item.entry} locale="en" />
  );
}
