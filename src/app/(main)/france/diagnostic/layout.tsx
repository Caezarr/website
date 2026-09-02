import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    metaTitle: "Diagnostic IA entreprise | Wonka France",
    metaDescription:
      "5 questions, 3 agents IA prêts pour vos outils. Diagnostic gratuit pour ETI françaises. Odoo, SharePoint, Azure West Europe.",
    ogImage: null,
  },
  {
    path: "/france/diagnostic",
    fallbackTitle: "Diagnostic IA entreprise | Wonka France",
  },
);

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
