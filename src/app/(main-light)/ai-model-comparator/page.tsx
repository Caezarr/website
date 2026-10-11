import type { Metadata } from "next";
import { ModelComparatorView, modelComparatorMetadata } from "@/views/model-comparator";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return modelComparatorMetadata("en");
}

export default function ModelComparatorPage() {
  return <ModelComparatorView locale="en" />;
}
