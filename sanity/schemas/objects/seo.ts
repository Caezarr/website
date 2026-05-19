import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Page title shown in browser tab and search results. Keep under 60 characters.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description:
        "Short description shown in search results. Keep between 120-160 characters.",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description:
        "Image shown when the page is shared on social media. Recommended: 1200x630px. If not set, the default site image is used.",
      options: { hotspot: false },
    }),
  ],
});
