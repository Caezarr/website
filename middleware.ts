import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const config = {
  // Only intercept content hub routes — never the homepage, legal pages, or studio
  matcher: [
    '/(fr|nl)(.*)',
    '/blog(.*)',
    '/glossaire(.*)',
    '/comparaisons(.*)',
    '/connecteurs(.*)',
    '/cas-clients(.*)',
  ],
};
