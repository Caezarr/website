import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/page-layout";
import {
  SharedAgentBlueprintPage,
  sharedAgentBlueprintMetadata,
} from "@/views/shared-agent-blueprint";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  if (locale !== "fr" && locale !== "nl") notFound();
  return sharedAgentBlueprintMetadata(id);
}

export default async function LocalizedSharedAgentBlueprintRoute({
  params,
}: PageProps) {
  const { locale, id } = await params;
  if (locale !== "fr" && locale !== "nl") notFound();

  return (
    <PageLayout locale={locale}>
      <SharedAgentBlueprintPage id={id} locale={locale} />
    </PageLayout>
  );
}
