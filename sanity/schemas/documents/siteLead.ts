import { defineType, defineField } from "sanity";

const SOURCE_OPTIONS = [
  { title: "Start AI hero", value: "start-ai-hero" },
  { title: "WonkaChat hero", value: "wonka-chat-hero" },
  { title: "WonkaChat Odoo hero", value: "wonka-chat-odoo-hero" },
];

export const siteLead = defineType({
  name: "siteLead",
  title: "Site Lead",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where the lead was captured on the site.",
      options: { list: SOURCE_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "email",
      source: "source",
      submittedAt: "submittedAt",
    },
    prepare({ title, source, submittedAt }) {
      const sourceLabel =
        SOURCE_OPTIONS.find((option) => option.value === source)?.title ?? source;
      return {
        title: title ?? "Lead",
        subtitle: [
          sourceLabel,
          submittedAt
            ? new Date(submittedAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
