import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { HomeV2Page, homeV2Metadata } from "@/components/pages/home-v2/home-v2-page";

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
  return homeV2Metadata(locale as Locale);
}

export default async function LocalizedHomeV2({ params }: PageProps) {
  const { locale } = await params;
  return <HomeV2Page locale={locale as Locale} />;
}
