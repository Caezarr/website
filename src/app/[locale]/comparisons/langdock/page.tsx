import { frenchComparison } from "@/lib/french-comparisons";
import {
  FrenchComparisonView,
  frenchComparisonMetadata,
} from "@/views/french-comparison";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { HeroData } from "@/lib/types";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return [{ locale: "en" as const }, { locale: "fr" as const }];
}

const content = {
  en: {
    path: "/vs/langdock",
    title: "Langdock alternative for ETI: Odoo agents, Azure West Europe",
    description:
      "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock. Data in Azure West Europe. ISO 27001, GDPR, NIS 2.",
    hero: {
      awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
      title:
        "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock",
      subtitle:
        "Data in Azure West Europe. ISO 27001, GDPR, NIS 2. 45 min diagnostic with Gabriel.",
    },
    problem: [
      {
        tag: "h2" as const,
        content:
          "Compare the workflow, governance and rollout your organization needs.",
      },
      {
        tag: "p" as const,
        content: "Your team already uses ChatGPT on personal accounts.",
      },
      {
        tag: "p" as const,
        content:
          "IT and security leads at ETI know they need governance, European data residency, and agents that act in your actual business tools.",
      },
    ],
    ctaLabel: "45 min diagnostic",
    icpHeading: "Native Odoo integration vs generic connectors",
    icpBullets: [
      "Wonka connects natively to Odoo as your ERP. Agents read context, prepare actions, and let ops teams validate before executing.",
      "SharePoint runs via Microsoft Graph API with your credentials.",
      "Langdock offers multi-model chat, agents, workflows, integrations and European hosting. Confirm the requirements of your plan directly at langdock.com.",
    ],
    certHeading: "Security and deployment",
    certText:
      "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe.",
    proofHeading: "Customer references",
    proofs: [
      {
        title: "Itzu",
        text: "100% of employees on personal WonkaChat across HR and ops.",
        link: "/case-studies",
        linkText: "Explore customer stories →",
      },
      {
        title: "N-allo (Engie)",
        text: "Over 70 people, 50% reduction in support email time.",
        link: "/case-studies",
        linkText: "Explore customer stories →",
      },
    ],
    awards:
      "#1 AI Start-up Belgium 2026 • Nvidia Inception • Microsoft for Startups • ~35 people",
    diagHeading: "45-minute diagnostic",
    diagText:
      "Diagnostic with Gabriel identifies 3 agents ready for your Odoo and SharePoint workflows. Delivery depends on your integrations and validation requirements.",
    faqHeading: "FAQ",
    faqs: [
      {
        q: "Does Wonka connect to Odoo natively?",
        a: "Yes. Native integration reads Odoo records, prepares actions, and lets your team validate before execution. Not a generic API wrapper.",
      },
      {
        q: "Where is data hosted?",
        a: "Azure West Europe. ISO 27001 certified, GDPR compliant, NIS 2 compliant, SOC 2 Type II in progress.",
      },
      {
        q: "How long to first agent for a 50-person company?",
        a: "45-minute diagnostic, 3 agents scoped to your tools. Agree a delivery schedule after validating the integration scope and access requirements.",
      },
    ],
    linksHeading: "Internal links",
    links: [
      { href: "/france", text: "France" },
      { href: "/security", text: "Security" },
      { href: "/wonka-chat", text: "WonkaChat" },
      { href: "/wonka-chat/odoo", text: "Odoo" },
      { href: "/integrations", text: "Integrations" },
      { href: "/ai-agents", text: "AI agents" },
    ],
    securityHeading: "Your data stays yours.",
    ctaHeading: "45 min diagnostic. 3 agents ready for your tools.",
    ctaBody:
      "Sector, tools, data, blocker, role. Two minutes. You see the result before talking to anyone.",
    ctaLabelFinal: "Start diagnostic",
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "fr") notFound();
  if (locale === "fr")
    return frenchComparisonMetadata(frenchComparison("langdock")!);
  const c = content.en;
  return buildMetadata(
    { metaTitle: c.title, metaDescription: c.description, ogImage: null },
    {
      path: c.path,
      fallbackTitle: c.title,
      locale: "en",
      languages: {
        "en-US": `${getSiteUrl()}/vs/langdock`,
        "x-default": `${getSiteUrl()}/vs/langdock`,
      },
    },
  );
}

export default async function LangdockVsPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "fr") notFound();
  if (locale === "fr")
    return <FrenchComparisonView comparison={frenchComparison("langdock")!} />;
  const c = content.en;
  const diagnosticUrl =
    "/france/diagnostic?utm_campaign=france&utm_source=vs-langdock";
  const heroData: HeroData = c.hero;

  return (
    <>
      <Hero data={heroData} ctaHref={diagnosticUrl} ctaLabel={c.ctaLabel} />
      <Problem id="problem" items={c.problem} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="border-border bg-mid-gray mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.icpHeading}</h2>
          <ul className="type-body space-y-4">
            {c.icpBullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span className={i === 2 ? "text-text/40" : "text-green-600"}>
                  {i === 2 ? "~" : "✓"}
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border bg-background mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.certHeading}</h2>
          <p className="type-body font-medium">{c.certText}</p>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">{c.proofHeading}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {c.proofs.map((proof, i) => (
              <div
                key={i}
                className="border-border bg-background rounded-lg border p-6"
              >
                <h3 className="type-h6 mb-3">{proof.title}</h3>
                <p className="type-paragraph-m text-text/70">{proof.text}</p>
                <a
                  href={proof.link}
                  className="type-paragraph-m-bold text-accent mt-4 inline-block hover:underline"
                >
                  {proof.linkText}
                </a>
              </div>
            ))}
          </div>
          <div className="type-paragraph-m text-text/60 mt-6 flex flex-wrap gap-4">
            {c.awards}
          </div>
        </div>

        <div className="border-border bg-mid-gray mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.diagHeading}</h2>
          <p className="type-body mb-4">{c.diagText}</p>
        </div>

        <div className="border-border bg-background mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.faqHeading}</h2>
          <div className="space-y-6">
            {c.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="type-paragraph-m-bold mb-2">{faq.q}</h3>
                <p className="type-paragraph-m text-text/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="type-h4 mb-4">{c.linksHeading}</h2>
          <div className="type-paragraph-m flex flex-wrap justify-center gap-4">
            {c.links.map((link, i) => (
              <span key={i} className="contents">
                <a href={link.href} className="text-accent hover:underline">
                  {link.text}
                </a>
                {i < c.links.length - 1 && (
                  <span className="text-text/30">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Stats id="stats" />
      <div className="pb-20 md:pb-24">
        <Security
          id="security"
          data={{ eyebrow: null, heading: c.securityHeading, body: null }}
        />
      </div>
      <Cta
        id="get-started"
        data={{ heading: c.ctaHeading, body: c.ctaBody }}
        meetingUrl={diagnosticUrl}
        meetingLabel={c.ctaLabelFinal}
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
