import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const siteUrl = getSiteUrl();

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => {
    // Use fr-FR (not fr-BE) to match buildMetadata and sitemap conventions
    alternateLanguages[l === 'en' ? 'en-US' : l === 'fr' ? 'fr-FR' : 'nl-BE'] =
      l === 'en' ? siteUrl : `${siteUrl}/${l}`;
  });

  return {
    robots: { index: true, follow: true },
    alternates: {
      // No canonical at layout level — each page sets its own
      languages: {
        ...alternateLanguages,
        'x-default': siteUrl,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
