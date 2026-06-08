import type { FaqItem } from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

export function ArticleSchema({ title, description, publishedAt, url, imageUrl }: ArticleSchemaProps) {
  const siteUrl = getSiteUrl();
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
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/opengraph-image.jpg` },
    },
    ...(imageUrl && { image: imageUrl }),
  };
  return (
    <script id="schema-article" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
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
    <script id="schema-faq" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
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
    <script id="schema-breadcrumb" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function DefinedTermSchema({ term, definition, url }: { term: string; definition: string; url: string }) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Wonka AI Glossary",
      url: `${siteUrl}/learn`,
    },
  };
  return (
    <script id="schema-defined-term" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function SoftwareAppSchema({ name, description, url, features }: {
  name: string; description: string; url: string; features: string[];
}) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    featureList: features,
    publisher: {
      "@type": "Organization",
      name: "Wonka AI",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      url,
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/OnlineOnly",
    },
  };
  return (
    <script id="schema-software-app" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
