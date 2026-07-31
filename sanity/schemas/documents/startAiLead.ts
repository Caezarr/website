import { defineType, defineField } from "sanity";

export const startAiLead = defineType({
  name: "startAiLead",
  title: "Start AI Lead",
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
      initialValue: "start-ai-hero",
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
      subtitle: "submittedAt",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Lead",
        subtitle: subtitle
          ? new Date(subtitle).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : undefined,
      };
    },
  },
});
