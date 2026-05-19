import { defineType, defineField } from "sanity";

export const homepageContent = defineType({
  name: "homepageContent",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "solution", title: "Solution", default: true },
    { name: "useCases", title: "Use cases" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "solution",
      title: "Solution",
      type: "object",
      group: "solution",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "steps",
          title: "Steps",
          description:
            "Each step shows as a list item on the left and a card on the right. The list highlights the step whose card is in view.",
          type: "array",
          of: [
            {
              type: "object",
              name: "solutionStep",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "body" },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "useCases",
      title: "Use cases",
      type: "object",
      group: "useCases",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "industries",
          title: "Industries",
          description:
            "Each industry becomes a tab. The active tab's workflows are shown as cards below.",
          type: "array",
          of: [
            {
              type: "object",
              name: "industry",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "workflows",
                  title: "Workflows",
                  description: "Up to 3 cards per industry.",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      name: "workflow",
                      fields: [
                        defineField({
                          name: "title",
                          title: "Title",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "description",
                          title: "Description",
                          type: "text",
                          rows: 2,
                        }),
                        defineField({
                          name: "bullets",
                          title: "Bullet points",
                          type: "array",
                          of: [{ type: "string" }],
                        }),
                      ],
                      preview: {
                        select: { title: "title", subtitle: "description" },
                      },
                    },
                  ],
                  validation: (Rule) => Rule.max(3),
                }),
              ],
              preview: {
                select: { title: "label" },
              },
            },
          ],
          validation: (Rule) => Rule.max(5),
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
