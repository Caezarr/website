import Script from "next/script";
import type { FaqItem } from "@/lib/types";

// ─── Article JSON-LD ──────────────────────────────────────────────
interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

export function ArticleSchema({ title, description, publishedAt, url, imageUrl }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    url,
    publisher: {
      "@type": "Organization",
      name: "Wonka AI",
      url: "https://wonka-ai.com",
      logo: { "@type": "ImageObject", url: "https://wonka-ai.com/opengraph-image.jpg" },
    },
    ...(imageUrl && { image: imageUrl }),
  };
  return (
    <Script
      id="schema-article"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ JSON-LD ──────────────────────────────────────────────────
interface FaqSchemaProps {
  items: FaqItem[];
}

export function FaqSchema({ items }: FaqSchemaProps) {
  if (!items.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <Script
      id="schema-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Breadcrumb JSON-LD ───────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── DefinedTerm JSON-LD (for glossary) ──────────────────────────
interface DefinedTermSchemaProps {
  term: string;
  definition: string;
  url: string;
}

export function DefinedTermSchema({ term, definition, url }: DefinedTermSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Wonka AI Glossary",
      url: "https://wonka-ai.com/glossaire",
    },
  };
  return (
    <Script
      id="schema-defined-term"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── SoftwareApplication JSON-LD (for connector pages) ───────────
interface SoftwareAppSchemaProps {
  name: string;
  description: string;
  url: string;
  features: string[];
}

export function SoftwareAppSchema({ name, description, url, features }: SoftwareAppSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    featureList: features,
    offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/OnlineOnly" },
  };
  return (
    <Script
      id="schema-software-app"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
