import { DEFAULT_TESTIMONIALS_HEADER } from "@/lib/testimonials-defaults";
import {
  DEFAULT_USE_CASES,
  DEFAULT_WONKA_CHAT_SECURITY,
  resolveSecuritySection,
  resolveUseCasesSection,
} from "@/lib/cms-sections";
import { START_AI_DEFAULTS } from "@/lib/page-defaults/start-ai";
import { WONKA_BUILD_DEFAULTS } from "@/lib/page-defaults/wonka-build";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import {
  hasSanityImage,
  resolveItems,
  resolveOptionalString,
  resolveSectionHeader,
} from "@/lib/resolve-cms";
import type { SeoData, UseCasesData } from "@/lib/types";
import type {
  CardGridData,
  ContactSectionData,
  ContactSectionResolved,
  DeliverablesPanelData,
  FaqSectionData,
  FeatureItem,
  FeatureItemResolved,
  IndustriesSectionData,
  LogoStripData,
  LogoStripResolved,
  NumberedCardsCmsData,
  NumberedCardsData,
  ProductHeroData,
  ProductHeroResolved,
  PromoPanelData,
  PromoPanelResolved,
  SectionHeaderData,
  SplitContentData,
  SplitContentResolved,
  StickyFeaturesData,
  StickyFeaturesResolved,
  StartAiContent,
  WonkaBuildContent,
  WonkaChatContent,
} from "@/lib/types/page-sections";

export interface StartAiResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  phases: NumberedCardsData;
  deliverables: DeliverablesPanelData & { heading: string | null };
  industries: IndustriesSectionData & { header: SectionHeaderData };
  whyNow: CardGridData & { header: SectionHeaderData };
  promo: PromoPanelResolved;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData & { header: SectionHeaderData };
  seo: SeoData;
}

export interface WonkaBuildResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  phases: NumberedCardsData;
  deliverables: DeliverablesPanelData & { heading: string | null };
  industries: IndustriesSectionData & { header: SectionHeaderData };
  whyNow: CardGridData & { header: SectionHeaderData };
  promo: PromoPanelResolved;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData & { header: SectionHeaderData };
  seo: SeoData;
}

export interface WonkaChatResolvedContent {
  hero: ProductHeroResolved;
  logoStrip: LogoStripResolved;
  problem: SplitContentResolved;
  overview: SectionHeaderData;
  features: StickyFeaturesResolved;
  useCases: UseCasesData;
  security: ReturnType<typeof resolveSecuritySection>;
  testimonials: SectionHeaderData;
  contact: ContactSectionResolved;
  faq: FaqSectionData & { header: SectionHeaderData };
  seo: SeoData;
}

function resolveHeroTheme(
  cms: ProductHeroData | null | undefined,
  defaults: ProductHeroResolved,
): "dark" | "light" {
  const defaultTheme = defaults.theme ?? "light";
  const cmsTheme = cms?.theme;

  if (!cmsTheme) return defaultTheme;

  if (cmsTheme === "light") {
    const hasLightHero =
      hasSanityImage(cms?.heroImage) || Boolean(defaults.fallbackHero?.src);
    return hasLightHero ? "light" : defaultTheme;
  }

  return cmsTheme;
}

function resolveHero(
  cms: ProductHeroData | null | undefined,
  defaults: ProductHeroResolved,
): ProductHeroResolved {
  return {
    eyebrow: resolveOptionalString(cms?.eyebrow, defaults.eyebrow),
    title: resolveOptionalString(cms?.title, defaults.title),
    subtitle: resolveOptionalString(cms?.subtitle, defaults.subtitle),
    secondaryText: resolveOptionalString(
      cms?.secondaryText,
      defaults.secondaryText,
    ),
    theme: resolveHeroTheme(cms, defaults),
    backgroundImage: cms?.backgroundImage ?? null,
    heroImage: cms?.heroImage ?? null,
    secondaryLink: cms?.secondaryLink ?? defaults.secondaryLink,
    fallbackBackground: defaults.fallbackBackground,
    fallbackHero: defaults.fallbackHero,
  };
}

function resolvePromoVariant(
  cms: PromoPanelData | null | undefined,
  defaults: PromoPanelResolved,
): "gradient" | "darkImage" {
  const defaultVariant = defaults.variant ?? "gradient";
  const cmsVariant = cms?.variant;

  if (!cmsVariant) return defaultVariant;

  if (cmsVariant === "gradient" && defaultVariant === "darkImage") {
    const hasDarkImage =
      hasSanityImage(cms?.backgroundImage) ||
      Boolean(defaults.fallbackBackground?.src);
    if (hasDarkImage) return "darkImage";
  }

  return cmsVariant;
}

function resolvePromo(
  cms: PromoPanelData | null | undefined,
  defaults: PromoPanelResolved,
): PromoPanelResolved {
  return {
    eyebrow: resolveOptionalString(cms?.eyebrow, defaults.eyebrow),
    heading: resolveOptionalString(cms?.heading, defaults.heading),
    body: resolveOptionalString(cms?.body, defaults.body),
    variant: resolvePromoVariant(cms, defaults),
    backgroundImage: cms?.backgroundImage ?? null,
    showCta: cms?.showCta ?? defaults.showCta,
    fallbackBackground: defaults.fallbackBackground,
  };
}

function resolveLogoStrip(
  cms: LogoStripData | null | undefined,
  defaults: LogoStripResolved,
): LogoStripResolved {
  return {
    logos: cms?.logos ?? null,
    proofLines: resolveItems(cms?.proofLines, defaults.proofLines ?? []),
    fallbackLogos: defaults.fallbackLogos,
  };
}

function resolveFeatures(
  cms: StickyFeaturesData | null | undefined,
  defaults: StickyFeaturesResolved,
): StickyFeaturesResolved {
  const cmsFeatures = cms?.features;
  const features: FeatureItemResolved[] = cmsFeatures?.length
    ? cmsFeatures.map((item) => attachFeatureFallback(item, defaults.features))
    : defaults.features;

  return {
    header: resolveSectionHeader(cms?.header, defaults.header),
    showCta: cms?.showCta ?? defaults.showCta,
    features,
  };
}

function attachFeatureFallback(
  item: FeatureItem,
  defaults: FeatureItemResolved[],
): FeatureItemResolved {
  const fallback =
    defaults.find((d) => d._key === item._key) ??
    defaults.find((d) => d.title === item.title);

  return {
    ...item,
    fallbackImage: fallback?.fallbackImage ?? null,
  };
}

function resolveSeo(
  cms: SeoData | null | undefined,
  defaults: SeoData,
): SeoData {
  return {
    metaTitle: resolveOptionalString(cms?.metaTitle, defaults.metaTitle),
    metaDescription: resolveOptionalString(
      cms?.metaDescription,
      defaults.metaDescription,
    ),
    ogImage: cms?.ogImage ?? defaults.ogImage,
  };
}

function resolveContact(
  cms: ContactSectionData | null | undefined,
  defaults: ContactSectionResolved,
): ContactSectionResolved {
  return {
    header: resolveSectionHeader(cms?.header, defaults.header!),
    portrait: cms?.portrait ?? null,
    personName: resolveOptionalString(
      cms?.personName,
      defaults.personName,
    ),
    personRole: resolveOptionalString(cms?.personRole, defaults.personRole),
    fallbackPortrait: defaults.fallbackPortrait,
  };
}

function resolveNumberedCards(
  cms: NumberedCardsCmsData | null | undefined,
  defaults: NumberedCardsData,
): NumberedCardsData {
  const legacyHeader = (
    cms as (NumberedCardsCmsData & { header?: SectionHeaderData | null }) | null
  )?.header;

  return {
    header: resolveSectionHeader(
      {
        eyebrow: cms?.eyebrow ?? legacyHeader?.eyebrow ?? null,
        heading: cms?.heading ?? legacyHeader?.heading ?? null,
        body: cms?.body ?? legacyHeader?.body ?? null,
        supplemental: null,
      },
      defaults.header,
    ),
    items: resolveItems(cms?.items, defaults.items),
  };
}

export function resolveStartAiContent(
  cms: StartAiContent | null,
): StartAiResolvedContent {
  const d = START_AI_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    phases: resolveNumberedCards(cms?.phases, d.phases),
    deliverables: {
      heading: resolveOptionalString(
        cms?.deliverables?.heading,
        d.deliverables.heading,
      ),
      items: resolveItems(
        cms?.deliverables?.items,
        d.deliverables.items ?? [],
      ),
    },
    industries: {
      header: resolveSectionHeader(
        cms?.industries?.header,
        d.industries.header!,
      ),
      industries: resolveItems(
        cms?.industries?.industries,
        d.industries.industries ?? [],
      ),
    },
    whyNow: {
      header: resolveSectionHeader(cms?.whyNow?.header, d.whyNow.header!),
      cards: resolveItems(cms?.whyNow?.cards, d.whyNow.cards ?? []),
    },
    promo: resolvePromo(cms?.promo, d.promo),
    testimonials: resolveSectionHeader(
      cms?.testimonials,
      d.testimonials ?? DEFAULT_TESTIMONIALS_HEADER,
    ),
    contact: resolveContact(cms?.contact, d.contact),
    faq: {
      header: resolveSectionHeader(cms?.faq?.header, d.faq.header!),
      items: resolveItems(cms?.faq?.items, d.faq.items ?? []),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}

export function resolveWonkaBuildContent(
  cms: WonkaBuildContent | null,
): WonkaBuildResolvedContent {
  const d = WONKA_BUILD_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    phases: resolveNumberedCards(cms?.phases, d.phases),
    deliverables: {
      heading: resolveOptionalString(
        cms?.deliverables?.heading,
        d.deliverables.heading,
      ),
      items: resolveItems(
        cms?.deliverables?.items,
        d.deliverables.items ?? [],
      ),
    },
    industries: {
      header: resolveSectionHeader(
        cms?.industries?.header,
        d.industries.header!,
      ),
      industries: resolveItems(
        cms?.industries?.industries,
        d.industries.industries ?? [],
      ),
    },
    whyNow: {
      header: resolveSectionHeader(cms?.whyNow?.header, d.whyNow.header!),
      cards: resolveItems(cms?.whyNow?.cards, d.whyNow.cards ?? []),
    },
    promo: resolvePromo(cms?.promo, d.promo),
    testimonials: resolveSectionHeader(
      cms?.testimonials,
      d.testimonials ?? DEFAULT_TESTIMONIALS_HEADER,
    ),
    contact: resolveContact(cms?.contact, d.contact),
    faq: {
      header: resolveSectionHeader(cms?.faq?.header, d.faq.header!),
      items: resolveItems(cms?.faq?.items, d.faq.items ?? []),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}

function resolveSplitContent(
  cms: SplitContentData | null | undefined,
  defaults: SplitContentResolved,
): SplitContentResolved {
  const legacyHeader = (
    cms as (SplitContentData & { header?: SectionHeaderData | null }) | null
  )?.header;

  const eyebrow = cms?.eyebrow ?? legacyHeader?.eyebrow ?? null;
  const heading = cms?.heading ?? legacyHeader?.heading ?? null;
  let body = cms?.body ?? legacyHeader?.body ?? null;

  if (legacyHeader?.supplemental?.trim()) {
    const supplemental = legacyHeader.supplemental.trim();
    if (body?.trim() && !body.includes(supplemental)) {
      body = `${body.trim()}\n\n${supplemental}`;
    } else if (!body?.trim()) {
      body = supplemental;
    }
  }

  return {
    header: resolveSectionHeader(
      { eyebrow, heading, body, supplemental: null },
      defaults.header,
    ),
    image: cms?.image ?? null,
    fallbackImage: defaults.fallbackImage,
  };
}

export function resolveWonkaChatContent(
  cms: WonkaChatContent | null,
  homepageUseCases?: UseCasesData | null,
): WonkaChatResolvedContent {
  const d = WONKA_CHAT_DEFAULTS;

  return {
    hero: resolveHero(cms?.hero, d.hero),
    logoStrip: resolveLogoStrip(cms?.logoStrip, d.logoStrip),
    problem: resolveSplitContent(cms?.problem, d.problem),
    overview: resolveSectionHeader(cms?.overview, d.overview),
    features: resolveFeatures(cms?.features, d.features),
    useCases: resolveUseCasesSection(
      cms?.useCases,
      homepageUseCases,
      DEFAULT_USE_CASES,
    ),
    security: resolveSecuritySection(
      cms?.security,
      DEFAULT_WONKA_CHAT_SECURITY,
    ),
    testimonials: resolveSectionHeader(
      cms?.testimonials,
      d.testimonials ?? DEFAULT_TESTIMONIALS_HEADER,
    ),
    contact: resolveContact(cms?.contact, d.contact),
    faq: {
      header: resolveSectionHeader(cms?.faq?.header, d.faq.header!),
      items: resolveItems(cms?.faq?.items, d.faq.items ?? []),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}
