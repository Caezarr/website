"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  BookIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentsIcon,
  DocumentTextIcon,
  HomeIcon,
  LinkIcon,
  LockIcon,
  UsersIcon,
} from "@sanity/icons";
import { documentInternationalization } from "@sanity/document-internationalization";
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
              .title("Blog")
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList("blogPost")
                  .title("Blog Posts")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
              ),
            S.listItem()
              .title("Glossary")
              .icon(BookIcon)
              .child(
                S.documentTypeList("glossaryTerm").title("Glossary Terms"),
              ),
            S.listItem()
              .title("Comparisons")
              .icon(ComposeIcon)
              .child(
                S.documentTypeList("comparisonPage").title("Comparison Pages"),
              ),
            S.listItem()
              .title("Connectors")
              .icon(LinkIcon)
              .child(
                S.documentTypeList("connectorPage").title("Connector Pages"),
              ),
            S.listItem()
              .title("Case Studies")
              .icon(UsersIcon)
              .child(
                S.documentTypeList("caseStudy").title("Case Studies"),
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
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "fr", title: "Français" },
        { id: "nl", title: "Nederlands" },
      ],
      schemaTypes: [
        "blogPost",
        "glossaryTerm",
        "comparisonPage",
        "connectorPage",
        "caseStudy",
      ],
    }),
  ],
  schema: { types: schemaTypes },
});
