import { PageLayout } from "@/components/layout/page-layout";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout headerVariant="inline-light">{children}</PageLayout>;
}
