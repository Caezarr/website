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
