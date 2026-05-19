"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  CogIcon,
  CommentIcon,
  DocumentsIcon,
  DocumentTextIcon,
  HomeIcon,
  LockIcon,
} from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "wonka",
  title: "Wonka Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Pages")
              .icon(DocumentsIcon)
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Homepage")
                      .icon(HomeIcon)
                      .child(
                        S.document()
                          .schemaType("homepageContent")
                          .documentId("homepageContent"),
                      ),
                    S.divider(),
                    S.listItem()
                      .title("Terms of Use")
                      .icon(DocumentTextIcon)
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("termsPage"),
                      ),
                    S.listItem()
                      .title("Privacy Policy")
                      .icon(LockIcon)
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("privacyPage"),
                      ),
                    S.listItem()
                      .title("Cookie Policy")
                      .icon(DocumentTextIcon)
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("cookiePolicyPage"),
                      ),
                  ]),
              ),
            S.listItem()
              .title("Testimonials")
              .icon(CommentIcon)
              .schemaType("testimonial")
              .child(
                S.documentTypeList("testimonial")
                  .title("Testimonials")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            S.divider(),
            S.listItem()
              .title("Site Settings")
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
