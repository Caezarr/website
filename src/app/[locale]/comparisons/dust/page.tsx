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
    path: "/vs/dust",
    title: "Dust AI alternative for French ETI | Wonka vs Dust",
    description:
      "Dust AI alternative for French ETI. Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.",
    hero: {
      awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
      title: "Dust alternative for IT and security leads of French ETI",
      subtitle:
        "Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.",
    },
    problem: [
      {
        tag: "h2" as const,
        content:
          "Compare a complete business workflow, not only the chat interface.",
      },
      {
        tag: "p" as const,
        content: "Dust and Wonka both offer enterprise AI workspaces. Start with the process your team needs to improve.",
      },
      {
        tag: "p" as const,
        content:
          "IT and security leads at French ETI know they need governance, data residency in Europe, and agents that act in your actual tools (Odoo, SharePoint) rather than just chat.",
      },
    ],
    ctaLabel: "45 min diagnostic",
    sectionICP: "For French ETI with Odoo and SharePoint",
    icpBullets: [
      "If you run Odoo as your ERP and SharePoint for documents, Wonka connects natively.",
      "Agents read Odoo context, suggest actions, and let ops teams validate before executing.",
      "SharePoint connection runs via Microsoft Graph API with your credentials.",
      "Dust offers connected, multi-model agents. Ask both vendors to demonstrate the Odoo objects and actions your workflow requires.",
    ],
    certHeading: "Certifications and compliance",
    certWonka:
      "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe.",
    certDust:
      "Dust describes SOC 2 Type II certification, governance controls and US or EU data residency. Confirm the scope and terms for your plan at dust.tt.",
    tableHeading: "Comparison table",
    table: {
      headers: ["Criteria", "Personal ChatGPT account (different scope)", "Dust", "Wonka"],
      rows: [
        [
          "Data location",
          "US (OpenAI)",
          "US or EU options",
          "Azure West Europe",
        ],
        [
          "Who uses agents",
          "Personal accounts",
          "Org workspace",
          "Org workspace",
        ],
        ["Odoo native", "No", "Custom MCP", "Yes"],
        ["SharePoint", "No", "Yes (connector)", "Yes (Graph API)"],
        ["ISO 27001", "N/A", "Verify current scope", "Certified"],
        [
          "Other compliance",
          "N/A",
          "SOC 2 Type II, GDPR, HIPAA",
          "GDPR, NIS 2, SOC 2 in progress",
        ],
        [
          "EU hosting",
          "No",
          "EU option; confirm terms",
          "Azure West Europe default",
        ],
        [
          "Time to first useful agent",
          "Immediate",
          "Varies",
          "45 min diagnostic + 1 week",
        ],
        [
          "Public pricing",
          "Not an enterprise quote",
          "See current Dust pricing",
          "See current Wonka pricing",
        ],
        ["Trial", "Limited free", "Check dust.tt", "7-day trial, no card"],
      ],
    },
    proofHeading: "Proof: Itzu and N-allo",
    proofs: [
      {
        title: "Itzu",
        text: "100% of employees on personal WonkaChat. Hours saved per person each week across HR and ops workflows.",
        link: "/case-studies",
        linkText: "Explore customer stories →",
      },
      {
        title: "N-allo (Engie)",
        text: "Team of over 70 people, 50% reduction in support email handling time. Never operated at 70% capacity.",
        link: "/case-studies",
        linkText: "Explore customer stories →",
      },
    ],
    awards:
      "#1 AI Start-up Belgium 2026 • Nvidia Inception • Microsoft for Startups • ~35 people",
    faqHeading: "FAQ for IT and security leads",
    faqs: [
      {
        q: "Does Wonka connect to Odoo natively?",
        a: "Yes. Wonka reads Odoo records, prepares actions (create quote, update delivery), and lets your ops team validate before execution. This is a native integration, not a generic API connector.",
      },
      {
        q: "Where is data processed?",
        a: "Azure West Europe by default. Confirm the data flows for the selected models and connectors. SOC 2 Type II in progress, ISO 27001 certified, GDPR and NIS 2 compliant.",
      },
      {
        q: "How long to deploy for a 50-person ETI?",
        a: "45-minute diagnostic, 3 agents scoped to your Odoo and SharePoint workflows. The delivery schedule depends on integrations, access and validation cycles.",
      },
      {
        q: "Can IT and security leads paste the compliance line?",
        a: "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe.",
      },
    ],
    linksHeading: "Internal links",
    links: [
      { href: "/france", text: "France" },
      { href: "/security", text: "Security" },
      { href: "/wonka-chat", text: "WonkaChat" },
      { href: "/integrations/odoo", text: "Odoo integration" },
      { href: "/integrations/sharepoint", text: "SharePoint integration" },
      { href: "/ai-agents", text: "AI agents" },
    ],
    securityHeading: "Your data stays yours.",
    ctaHeading:
      "45 min diagnostic. 3 agents ready for your Odoo and SharePoint.",
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
    return frenchComparisonMetadata(frenchComparison("dust")!);
  const c = content.en;
  return buildMetadata(
    { metaTitle: c.title, metaDescription: c.description, ogImage: null },
    {
      path: c.path,
      fallbackTitle: c.title,
      locale: "en",
      languages: {
        "en-US": `${getSiteUrl()}/vs/dust`,
        "x-default": `${getSiteUrl()}/vs/dust`,
      },
    },
  );
}

export default async function DustVsPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "fr") notFound();
  if (locale === "fr")
    return <FrenchComparisonView comparison={frenchComparison("dust")!} />;
  const c = content.en;
  const diagnosticUrl =
    "/france/diagnostic?utm_campaign=france&utm_source=vs-dust";
  const heroData: HeroData = c.hero;

  return (
    <>
      <Hero data={heroData} ctaHref={diagnosticUrl} ctaLabel={c.ctaLabel} />
      <Problem id="problem" items={c.problem} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="border-border bg-mid-gray mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.sectionICP}</h2>
          <ul className="type-body space-y-4">
            {c.icpBullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span className={i === 3 ? "text-text/40" : "text-green-600"}>
                  {i === 3 ? "~" : "✓"}
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border bg-background mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.certHeading}</h2>
          <p className="type-body mb-4 font-medium">{c.certWonka}</p>
          <p className="type-paragraph-m text-text/60">{c.certDust}</p>
        </div>

        <div className="border-border bg-mid-gray mb-12 rounded-lg border p-8">
          <h2 className="type-h4 mb-6">{c.tableHeading}</h2>
          <div className="border-border bg-background overflow-x-auto rounded-lg border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-border bg-text/[0.03] border-b">
                  {c.table.headers.map((h, i) => (
                    <th
                      key={i}
                      className={`type-paragraph-m-bold px-5 py-4 ${i > 0 && i < 3 ? "text-text/50" : i === 3 ? "text-accent" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.table.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i < c.table.rows.length - 1
                        ? "border-border border-b"
                        : ""
                    }
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`type-paragraph-m px-5 py-4 ${j > 0 ? "text-text/60" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="type-paragraph-m text-text/60 mt-6">{c.awards}</div>
        </div>

        <div className="border-border bg-mid-gray mb-12 rounded-lg border p-8">
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
