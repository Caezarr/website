import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const redirects = async () => [
  // EN: old → new
  { source: '/glossary', destination: '/learn', permanent: true },
  { source: '/glossary/:slug*', destination: '/learn/:slug*', permanent: true },
  { source: '/comparisons', destination: '/vs', permanent: true },
  { source: '/comparisons/:slug*', destination: '/vs/:slug*', permanent: true },
  { source: '/connectors', destination: '/integrations', permanent: true },
  { source: '/connectors/:slug*', destination: '/integrations/:slug*', permanent: true },
  // FR: old → new
  { source: '/fr/glossaire', destination: '/fr/apprendre', permanent: true },
  { source: '/fr/glossaire/:slug*', destination: '/fr/apprendre/:slug*', permanent: true },
  { source: '/fr/comparaisons', destination: '/fr/vs', permanent: true },
  { source: '/fr/comparaisons/:slug*', destination: '/fr/vs/:slug*', permanent: true },
  { source: '/fr/connecteurs', destination: '/fr/integrations', permanent: true },
  { source: '/fr/connecteurs/:slug*', destination: '/fr/integrations/:slug*', permanent: true },
  // NL: old → new
  { source: '/nl/woordenlijst', destination: '/nl/leren', permanent: true },
  { source: '/nl/woordenlijst/:slug*', destination: '/nl/leren/:slug*', permanent: true },
  { source: '/nl/vergelijkingen', destination: '/nl/vs', permanent: true },
  { source: '/nl/vergelijkingen/:slug*', destination: '/nl/vs/:slug*', permanent: true },
  { source: '/nl/connectoren', destination: '/nl/integrations', permanent: true },
  { source: '/nl/connectoren/:slug*', destination: '/nl/integrations/:slug*', permanent: true },
];

const headers = async () => [
  {
    source: '/fr/:path*',
    headers: [{ key: 'Content-Language', value: 'fr-FR' }],
  },
  {
    source: '/nl/:path*',
    headers: [{ key: 'Content-Language', value: 'nl-BE' }],
  },
];

const config: NextConfig = {
  redirects,
  headers,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    qualities: [75, 90],
  },
};

export default withNextIntl(config);
