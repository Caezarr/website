import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'nl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/connectors': {
      en: '/connectors',
      fr: '/connecteurs',
      nl: '/connectoren',
    },
    '/connectors/[slug]': {
      en: '/connectors/[slug]',
      fr: '/connecteurs/[slug]',
      nl: '/connectoren/[slug]',
    },
    '/glossary': {
      en: '/glossary',
      fr: '/glossaire',
      nl: '/woordenlijst',
    },
    '/glossary/[slug]': {
      en: '/glossary/[slug]',
      fr: '/glossaire/[slug]',
      nl: '/woordenlijst/[slug]',
    },
    '/comparisons': {
      en: '/comparisons',
      fr: '/comparaisons',
      nl: '/vergelijkingen',
    },
    '/comparisons/[slug]': {
      en: '/comparisons/[slug]',
      fr: '/comparaisons/[slug]',
      nl: '/vergelijkingen/[slug]',
    },
    '/case-studies': {
      en: '/case-studies',
      fr: '/cas-clients',
      nl: '/klantcases',
    },
    '/case-studies/[slug]': {
      en: '/case-studies/[slug]',
      fr: '/cas-clients/[slug]',
      nl: '/klantcases/[slug]',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
