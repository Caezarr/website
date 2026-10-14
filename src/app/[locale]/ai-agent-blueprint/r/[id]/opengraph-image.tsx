import {
  BLUEPRINT_OG_SIZE,
  renderBlueprintOgImage,
} from "@/lib/agent-blueprint-og-image";

export const revalidate = 3600;
export const alt = "Wonka AI agent blueprint";
export const size = BLUEPRINT_OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  return renderBlueprintOgImage(id);
}
