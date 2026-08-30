import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import { headingClass } from "@/lib/design-tokens";
import { buildMetadata } from "@/lib/seo";
import type { SeoData } from "@/lib/types";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const pagePath = "/security";
const title = "Security & Compliance | Wonka AI";
const description = "ISO 27001 certified, GDPR compliant, NIS 2 compliant. Hosted in Azure West Europe (Microsoft Ireland). SOC 2 Type II in progress.";

const seo: SeoData = {
  metaTitle: title,
  metaDescription: description,
  ogImage: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, { path: pagePath, fallbackTitle: title });
}

const certificationItems = [
  {
    icon: BadgeIso,
    label: "ISO 27001 certified",
    detail: "Information security management system certified to ISO/IEC 27001.",
  },
  {
    icon: BadgeGdpr,
    label: "GDPR compliant",
    detail: "Full compliance with the General Data Protection Regulation. Data Processing Agreement available.",
  },
  {
    icon: BadgeNis2,
    label: "NIS 2 compliant",
    detail: "Compliant with the EU Network and Information Security Directive (NIS 2).",
  },
];

const securityFeatures = [
  {
    title: "Hosting",
    items: [
      "Azure West Europe (Microsoft Ireland) by default",
      "EU-based infrastructure with data residency controls",
      "Enterprise-grade Azure security and compliance",
    ],
  },
  {
    title: "Data governance",
    items: [
      "Customer data is not used to train public AI models",
      "Data Processing Agreement (DPA) included",
      "Role-based access control and audit logs",
    ],
  },
  {
    title: "Authentication & access",
    items: [
      "Single Sign-On (SSO) support via Azure AD / Entra ID",
      "Multi-factor authentication (MFA) available",
      "Granular permission management per user and team",
    ],
  },
  {
    title: "Compliance in progress",
    items: [
      "SOC 2 Type II audit in progress (not yet certified)",
      "Regular third-party security assessments",
      "Continuous monitoring and incident response procedures",
    ],
  },
];

export default function SecurityPage() {
  return (
    <main className="bg-background text-text">
      <Section className="py-16 pt-32 md:py-24 md:pt-40" containerClassName="max-w-[48rem]">
        <Eyebrow>Trust & compliance</Eyebrow>
        <h1 className={cn(headingClass.hero, "mt-5")}>Security at Wonka AI</h1>
        <p className="type-body mt-6 text-text/70">
          Wonka AI is built for European enterprises that handle sensitive data and require GDPR compliance,
          data residency controls and auditable access management.
        </p>
      </Section>

      <Section wide className="bg-background pb-16 md:pb-24">
        <Surface variant="panel" className="bg-blue-900 p-7.5 text-white md:p-12">
          <Image
            src="/images/security/banner-bg.avif"
            alt=""
            fill
            sizes="(min-width: 89rem) 89rem, 100vw"
            className="object-cover mix-blend-luminosity"
          />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-5">
            <div className="flex max-w-[35.125rem] flex-col gap-5">
              <h2 className={headingClass.section}>Certifications</h2>
              <p className={cn("type-body text-white/70")}>
                Wonka AI maintains ISO 27001 certification for information security management, full GDPR compliance
                and NIS 2 compliance. SOC 2 Type II audit is in progress.
              </p>
            </div>
            <ul className="grid grid-cols-3">
              <li className="flex min-h-40 items-center justify-center border border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
                <BadgeGdpr className="size-16 md:size-31" />
              </li>
              <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
                <BadgeIso className="size-16 md:size-31" />
              </li>
              <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
                <BadgeNis2 className="size-16 md:size-31" />
              </li>
            </ul>
          </div>
        </Surface>
      </Section>

      <Section className="py-16 md:py-24" containerClassName="max-w-[64rem]">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {certificationItems.map((cert) => {
            const Icon = cert.icon;
            return (
              <Surface key={cert.label} variant="card" className="p-6 md:p-7">
                <Icon className="size-12 text-accent" />
                <h3 className={cn(headingClass.card, "mt-5")}>{cert.label}</h3>
                <p className="type-paragraph-m mt-3 text-text/62">{cert.detail}</p>
              </Surface>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-dashed border-border bg-mid-gray py-16 md:py-24">
        <h2 className={cn(headingClass.section, "mb-12")}>Security practices</h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {securityFeatures.map((feature) => (
            <div key={feature.title}>
              <h3 className={cn(headingClass.subsection)}>{feature.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {feature.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="type-paragraph-m text-text/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border py-16 md:py-24" containerClassName="max-w-[48rem]">
        <h2 className={cn(headingClass.section)}>Important clarifications</h2>
        <div className="mt-8 flex flex-col gap-6 type-body text-text/70">
          <p>
            <strong className="text-text">Hosting default:</strong> Wonka AI is hosted in Azure West Europe
            (Microsoft Ireland) by default. This is not an on-premises deployment unless explicitly contracted.
          </p>
          <p>
            <strong className="text-text">SOC 2:</strong> SOC 2 Type II audit is in progress. Wonka AI is not yet SOC 2 certified.
          </p>
          <p>
            <strong className="text-text">Data usage:</strong> Customer data is not used to train public AI models.
            A Data Processing Agreement is available on request.
          </p>
        </div>
      </Section>
    </main>
  );
}
