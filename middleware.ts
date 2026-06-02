import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/config';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Locale-prefixed paths (fr/nl)
    '/(fr|nl)(.*)',
    // English content hub paths
    '/(blog|connectors|glossary|comparisons|case-studies)(.*)',
    // Localized path variants (FR/NL without prefix — needed for routing resolution)
    '/(connecteurs|connectoren|glossaire|woordenlijst|comparaisons|vergelijkingen|cas-clients|klantcases)(.*)',
  ],
};
