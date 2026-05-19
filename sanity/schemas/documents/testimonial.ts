import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first in the carousel.",
      type: "number",
      validation: (Rule) => Rule.required(),
      initialValue: 0,
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Author role",
      description: "e.g. Project manager at Engie",
      type: "string",
    }),
    defineField({
      name: "companyLogo",
      title: "Company logo",
      description: "Small logo shown above the quote. SVG recommended.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      description: "Image of the person speaking, shown in the carousel card.",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "authorRole",
      media: "portrait",
    },
  },
});
