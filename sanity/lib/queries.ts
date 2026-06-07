import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    sharedLinks {
      meetingUrl
    },
    navigation[] {
      _key,
      itemType,
      label,
      href,
      children[] {
        _key,
        label,
        href,
        description
      }
    },
    headerCta {
      label,
      href
    },
    footerLinkGroups[] {
      _key,
      title,
      links[] {
        _key,
        label,
        href,
        external
      }
    }
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    quote,
    authorName,
    authorRole,
    companyLogo {
      ...,
      "alt": coalesce(alt, ""),
      "dimensions": asset->metadata.dimensions { width, height }
    },
    portrait {
      ...,
      "alt": coalesce(alt, "")
    }
  }
`);

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && _id == $id][0] {
    title,
    lastUpdated,
    intro,
    body,
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const HOMEPAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "homepageContent"][0] {
    solution {
      steps[] {
        _key,
        title,
        body
      }
    },
    useCases {
      industries[] {
        _key,
        label,
        workflows[] {
          _key,
          title,
          description,
          bullets
        }
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

// ─── Content Hub Queries ──────────────────────────────────────────

const CONTENT_FIELDS = `
  _id,
  language,
  slug,
  tags,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url
  }
`;

const FAQ_FIELDS = `
  faq[] {
    question,
    answer
  }
`;

const IMAGE_FIELDS = `
  ...,
  "alt": coalesce(alt, "")
`;

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && language == $language] | order(publishedAt desc) {
    ${CONTENT_FIELDS},
    title,
    publishedAt,
    excerpt,
    category,
    coverImage { ${IMAGE_FIELDS} }
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    title,
    publishedAt,
    excerpt,
    category,
    coverImage { ${IMAGE_FIELDS} },
    body,
    ${FAQ_FIELDS}
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost"] { slug, language }
`);

export const GLOSSARY_TERMS_QUERY = defineQuery(`
  *[_type == "glossaryTerm" && language == $language] | order(term asc) {
    ${CONTENT_FIELDS},
    term,
    shortDefinition
  }
`);

export const GLOSSARY_TERM_QUERY = defineQuery(`
  *[_type == "glossaryTerm" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    term,
    shortDefinition,
    body,
    ${FAQ_FIELDS}
  }
`);

export const GLOSSARY_SLUGS_QUERY = defineQuery(`
  *[_type == "glossaryTerm"] { slug, language }
`);

export const COMPARISON_PAGES_QUERY = defineQuery(`
  *[_type == "comparisonPage" && language == $language] | order(_createdAt desc) {
    ${CONTENT_FIELDS},
    title,
    competitor,
    excerpt
  }
`);

export const COMPARISON_PAGE_QUERY = defineQuery(`
  *[_type == "comparisonPage" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    title,
    competitor,
    excerpt,
    body,
    ${FAQ_FIELDS}
  }
`);

export const COMPARISON_SLUGS_QUERY = defineQuery(`
  *[_type == "comparisonPage"] { slug, language }
`);

export const CONNECTOR_PAGES_QUERY = defineQuery(`
  *[_type == "connectorPage" && language == $language] | order(toolName asc) {
    ${CONTENT_FIELDS},
    toolName,
    tagline,
    description,
    toolLogo { ${IMAGE_FIELDS} }
  }
`);

export const CONNECTOR_PAGE_QUERY = defineQuery(`
  *[_type == "connectorPage" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    toolName,
    tagline,
    description,
    useCases[] {
      title,
      description,
      prompt
    },
    toolLogo { ${IMAGE_FIELDS} },
    ${FAQ_FIELDS}
  }
`);

export const CONNECTOR_SLUGS_QUERY = defineQuery(`
  *[_type == "connectorPage"] { slug, language }
`);

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && language == $language] | order(publishedAt desc) {
    ${CONTENT_FIELDS},
    clientName,
    sector,
    headline,
    excerpt,
    results,
    publishedAt,
    clientLogo { ${IMAGE_FIELDS} }
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && language == $language][0] {
    ${CONTENT_FIELDS},
    clientName,
    sector,
    headline,
    excerpt,
    results,
    publishedAt,
    body,
    clientLogo { ${IMAGE_FIELDS} },
    ${FAQ_FIELDS}
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy"] { slug, language }
`);

// ─── Related Content Queries ──────────────────────────────────────

export const RELATED_GLOSSARY_TERMS_QUERY = defineQuery(`
  *[_type == "glossaryTerm" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(_createdAt desc)[0..2] {
    _id,
    term,
    slug,
    shortDefinition
  }
`);

export const RELATED_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    excerpt,
    category
  }
`);

export const RELATED_CONNECTOR_PAGES_QUERY = defineQuery(`
  *[_type == "connectorPage" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(toolName asc)[0..3] {
    _id,
    toolName,
    slug,
    tagline,
    toolLogo { ${IMAGE_FIELDS} }
  }
`);

export const RELATED_COMPARISON_PAGES_QUERY = defineQuery(`
  *[_type == "comparisonPage" && language == $language && slug.current != $slug && count((tags[])[@ in $tags]) > 0] | order(_createdAt desc)[0..2] {
    _id,
    title,
    slug,
    competitor,
    excerpt
  }
`);

export const MEETING_URL_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].sharedLinks.meetingUrl
`);

// All slugs for sitemap generation
export const ALL_CONTENT_SLUGS_QUERY = defineQuery(`
  {
    "blogPosts": *[_type == "blogPost"] { slug, language },
    "glossaryTerms": *[_type == "glossaryTerm"] { slug, language },
    "comparisons": *[_type == "comparisonPage"] { slug, language },
    "connectors": *[_type == "connectorPage"] { slug, language },
    "caseStudies": *[_type == "caseStudy"] { slug, language }
  }
`);
