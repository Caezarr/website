import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { getLibraryAgent, LIBRARY_AGENTS } from "@/lib/agent-library";
import { LibraryAgentView, libraryAgentMetadata } from "@/views/agent-library-agent";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.flatMap((locale) =>
    LIBRARY_AGENTS.map((agent) => ({ locale, slug: agent.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const agent = getLibraryAgent(slug);
  if (!agent) notFound();
  return libraryAgentMetadata(agent, locale as Locale);
}

export default async function LocalizedLibraryAgentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const agent = getLibraryAgent(slug);
  if (!agent) notFound();
  return <LibraryAgentView agent={agent} locale={locale as Locale} />;
}
