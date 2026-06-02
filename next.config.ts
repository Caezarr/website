import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // EN: /connectors/* → /connecteurs/*
      { source: '/connectors/:path*', destination: '/connecteurs/:path*', permanent: true },
      // FR: /fr/connectors/* → /fr/connecteurs/*
      { source: '/fr/connectors/:path*', destination: '/fr/connecteurs/:path*', permanent: true },
      // NL: /nl/connectors/* → /nl/connecteurs/*
      { source: '/nl/connectors/:path*', destination: '/nl/connecteurs/:path*', permanent: true },
      // Same for comparisons/comparaisons
      { source: '/comparisons/:path*', destination: '/comparaisons/:path*', permanent: true },
      { source: '/fr/comparisons/:path*', destination: '/fr/comparaisons/:path*', permanent: true },
      { source: '/nl/comparisons/:path*', destination: '/nl/comparaisons/:path*', permanent: true },
      // case-studies → cas-clients
      { source: '/case-studies/:path*', destination: '/cas-clients/:path*', permanent: true },
      { source: '/fr/case-studies/:path*', destination: '/fr/cas-clients/:path*', permanent: true },
      { source: '/nl/case-studies/:path*', destination: '/nl/cas-clients/:path*', permanent: true },
    ];
  },
};

export default withNextIntl(config);
