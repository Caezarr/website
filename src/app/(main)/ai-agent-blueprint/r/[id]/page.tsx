import type { Metadata } from "next";
import {
  SharedAgentBlueprintPage,
  sharedAgentBlueprintMetadata,
} from "@/views/shared-agent-blueprint";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return sharedAgentBlueprintMetadata(id);
}

export default async function SharedAgentBlueprintRoute({ params }: PageProps) {
  const { id } = await params;
  return <SharedAgentBlueprintPage id={id} locale="en" />;
}
