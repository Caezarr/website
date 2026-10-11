import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { ModelComparatorView, modelComparatorMetadata } from "@/views/model-comparator";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return modelComparatorMetadata(locale as Locale);
}

export default async function LocalizedModelComparatorPage({ params }: PageProps) {
  const { locale } = await params;
  return <ModelComparatorView locale={locale as Locale} />;
}
