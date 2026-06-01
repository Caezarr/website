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

// ─── Content Hub Types ───────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  language: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: SanityImageData | null;
  category: string;
  tags: string[] | null;
  body: unknown[];
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface GlossaryTerm {
  _id: string;
  language: string;
  term: string;
  slug: { current: string };
  shortDefinition: string;
  body: unknown[];
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface ComparisonPage {
  _id: string;
  language: string;
  title: string;
  slug: { current: string };
  competitor: string;
  excerpt: string;
  body: unknown[];
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface UseCase {
  title: string;
  description: string;
  prompt: string;
}

export interface ConnectorPage {
  _id: string;
  language: string;
  toolName: string;
  slug: { current: string };
  tagline: string;
  description: string;
  useCases: UseCase[];
  toolLogo: SanityImageData | null;
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}

export interface CaseStudy {
  _id: string;
  language: string;
  clientName: string;
  slug: { current: string };
  sector: string;
  headline: string;
  excerpt: string;
  results: string[];
  body: unknown[];
  clientLogo: SanityImageData | null;
  publishedAt: string | null;
  tags: string[] | null;
  faq: FaqItem[] | null;
  seo: SeoData | null;
}
