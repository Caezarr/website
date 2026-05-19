import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility and SEO",
    }),
  ],
  preview: {
    select: {
      alt: "alt",
      media: "asset",
    },
    prepare({ alt, media }) {
      return { title: alt || "No alt text", media };
    },
  },
});
