import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "sharedLinks", title: "Shared Links", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // --- Shared Links ---
    defineField({
      name: "sharedLinks",
      title: "Shared Links",
      type: "object",
      group: "sharedLinks",
      description:
        "Centralized URLs reused across CTAs site-wide. Update once here to change every button that points to it.",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "meetingUrl",
          title: "Schedule a call URL",
          type: "url",
          description:
            "Used by every meeting / contact CTA on the site (e.g. Schedule a call, Book a 30 min call, Let's talk, Become AI-native). Typically a Calendly or Cal.com link.",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
        }),
      ],
    }),

    // --- Navigation ---
    defineField({
      name: "navigation",
      title: "Navigation Items",
      type: "array",
      group: "navigation",
      validation: (Rule) => Rule.max(6),
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Nav Item",
          fields: [
            defineField({
              name: "itemType",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Link", value: "link" },
                  { title: "Dropdown", value: "dropdown" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "link",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "Required for links, optional for dropdowns (makes the dropdown title clickable).",
            }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              hidden: ({ parent }) => parent?.itemType !== "dropdown",
              of: [
                {
                  type: "object",
                  name: "navDropdownChild",
                  title: "Dropdown Item",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "string",
                      description: "Optional short description shown below the label in the dropdown.",
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "href" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "itemType" },
          },
        },
      ],
    }),
    defineField({
      name: "headerCta",
      title: "Header CTA Button",
      type: "ctaButton",
      group: "navigation",
      description: "Optional call-to-action button in the header (e.g. Login, Get Started).",
    }),

    // --- Footer ---
    defineField({
      name: "footerLinkGroups",
      title: "Footer Link Columns",
      type: "array",
      group: "footer",
      description: "Each group is a column in the footer (e.g. Product, Company, Connect).",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "object",
          name: "footerLinkGroup",
          title: "Link Group",
          fields: [
            defineField({
              name: "title",
              title: "Group Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "footerLink",
                  title: "Link",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "external",
                      title: "External Link",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "href" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
