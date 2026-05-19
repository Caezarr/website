// Shared CMS types

export interface SanityImageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asset: any;
  alt: string;
}

export interface CtaButtonData {
  label: string;
  href: string;
}

export interface SeoData {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
}

// Navigation types (from CMS siteSettings)

export interface NavDropdownChild {
  _key: string;
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  _key: string;
  itemType: "link" | "dropdown";
  label: string;
  href?: string;
  children?: NavDropdownChild[];
}

// Site Settings (fetched from Sanity)

export interface FooterLink {
  _key: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  _key: string;
  title: string;
  links: FooterLink[];
}

export interface SharedLinks {
  meetingUrl: string | null;
}

export interface SiteSettings {
  sharedLinks: SharedLinks | null;
  navigation: NavItem[] | null;
  headerCta: CtaButtonData | null;
  footerLinkGroups: FooterLinkGroup[] | null;
}

// Homepage content

export interface SanityImageWithDimensions extends SanityImageData {
  dimensions: { width: number; height: number } | null;
}

export interface SolutionStep {
  _key: string;
  title: string;
  body: string | null;
}

export interface SolutionData {
  steps: SolutionStep[] | null;
}

export interface UseCaseWorkflow {
  _key: string;
  title: string;
  description: string | null;
  bullets: string[] | null;
}

export interface UseCaseIndustry {
  _key: string;
  label: string;
  workflows: UseCaseWorkflow[] | null;
}

export interface UseCasesData {
  industries: UseCaseIndustry[] | null;
}

export interface HomepageContent {
  solution: SolutionData | null;
  useCases: UseCasesData | null;
  seo: SeoData | null;
}

// Legal page (Terms / Privacy singletons)

export interface LegalPageContent {
  title: string;
  lastUpdated: string | null;
  intro: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[] | null;
  seo: SeoData | null;
}

// Testimonial collection

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  companyLogo: SanityImageWithDimensions | null;
  portrait: SanityImageData | null;
}
