import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { getLibraryEntry, LIBRARY_ENTRIES } from "@/lib/agent-library";
import { LibraryAgentView, libraryAgentMetadata } from "@/views/agent-library-agent";
import { LibraryUseCaseView, libraryUseCaseMetadata } from "@/views/agent-library-use-case";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.flatMap((locale) =>
    LIBRARY_ENTRIES.map(({ entry }) => ({ locale, slug: entry.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getLibraryEntry(slug);
  if (!item) notFound();
  return item.kind === "agent"
    ? libraryAgentMetadata(item.entry, locale as Locale)
    : libraryUseCaseMetadata(item.entry, locale as Locale);
}

export default async function LocalizedLibraryAgentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const item = getLibraryEntry(slug);
  if (!item) notFound();
  return item.kind === "agent" ? (
    <LibraryAgentView agent={item.entry} locale={locale as Locale} />
  ) : (
    <LibraryUseCaseView useCase={item.entry} locale={locale as Locale} />
  );
}
