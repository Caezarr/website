import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import type { HeroData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/vs/langdock";
const title = "Langdock alternative for ETI: Odoo agents, Azure West Europe";
const description = "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock. Data in Azure West Europe. ISO 27001, GDPR, NIS 2.";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: title,
      metaDescription: description,
      ogImage: null,
    },
    { path: pagePath, fallbackTitle: title },
  );
}

const heroData: HeroData = {
  awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
  title: "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock",
  subtitle: "Data in Azure West Europe. ISO 27001, GDPR, NIS 2. 45 min diagnostic with Gabriel.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "Langdock is the search term. ChatGPT perso remains the real competitor.",
  },
  {
    tag: "p",
    content: "Your team already uses ChatGPT on personal accounts.",
  },
  {
    tag: "p",
    content: "IT and security leads at ETI know they need governance, European data residency, and agents that act in your actual business tools.",
  },
];

export default async function LangdockVsPage() {
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=vs-langdock";

  return (
    <>
      <Hero
        data={heroData}
        ctaHref={diagnosticUrl}
        ctaLabel="45 min diagnostic"
      />
      <Problem id="problem" items={problemItems} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">Native Odoo integration vs generic connectors</h2>
          <ul className="space-y-4 type-body">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>Wonka connects natively to Odoo as your ERP. Agents read context, prepare actions, and let ops teams validate before executing.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>SharePoint runs via Microsoft Graph API with your credentials.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-text/40">~</span>
              <span>Langdock connector coverage: check existing wonka-ai.com content and /blog/wonka-vs-langdock for current public information.</span>
            </li>
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">Certifications you can paste</h2>
          <p className="type-body font-medium">
            ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).
          </p>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">Proven with French mid-market teams</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">Itzu</h3>
              <p className="type-paragraph-m text-text/70">100% of employees on personal WonkaChat across HR and ops.</p>
              <a href="/case-studies/itzu" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Read case study →</a>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">N-allo (Engie)</h3>
              <p className="type-paragraph-m text-text/70">Over 70 people, 50% reduction in support email time.</p>
              <a href="/case-studies/n-allo" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Read case study →</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 type-paragraph-m text-text/60">
            <span>#1 AI Start-up Belgium 2026</span>
            <span>•</span>
            <span>Nvidia Inception</span>
            <span>•</span>
            <span>Microsoft for Startups</span>
            <span>•</span>
            <span>~35 people</span>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">45-minute diagnostic</h2>
          <p className="type-body mb-4">
            Diagnostic with Gabriel identifies 3 agents ready for your Odoo and SharePoint workflows. Trial agents within one week.
          </p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Does Wonka connect to Odoo natively?</h3>
              <p className="type-paragraph-m text-text/60">Yes. Native integration reads Odoo records, prepares actions, and lets your team validate before execution. Not a generic API wrapper.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Where is data hosted?</h3>
              <p className="type-paragraph-m text-text/60">Azure West Europe (Microsoft Ireland). ISO 27001 certified, GDPR compliant, NIS 2 compliant, SOC 2 Type II in progress.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">How long to first agent for a 50-person company?</h3>
              <p className="type-paragraph-m text-text/60">45-minute diagnostic, 3 agents scoped to your tools. Trial live within one week. Full deployment 4-8 weeks depending on validation.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="type-h4 mb-4">Internal links</h2>
          <div className="flex flex-wrap justify-center gap-4 type-paragraph-m">
            <a href="/france" className="text-accent hover:underline">France</a>
            <span className="text-text/30">•</span>
            <a href="/security" className="text-accent hover:underline">Security</a>
            <span className="text-text/30">•</span>
            <a href="/wonka-chat" className="text-accent hover:underline">WonkaChat</a>
            <span className="text-text/30">•</span>
            <a href="/wonka-chat/odoo" className="text-accent hover:underline">Odoo</a>
            <span className="text-text/30">•</span>
            <a href="/integrations" className="text-accent hover:underline">Integrations</a>
            <span className="text-text/30">•</span>
            <a href="/ai-agents" className="text-accent hover:underline">AI agents</a>
          </div>
        </div>
      </section>

      <Stats id="stats" />
      <div className="pb-20 md:pb-24">
        <Security
          id="security"
          data={{
            eyebrow: null,
            heading: "Your data stays yours.",
            body: null,
          }}
        />
      </div>
      <Cta
        id="get-started"
        data={{
          heading: "45 min diagnostic. 3 agents ready for your tools.",
          body: "Sector, tools, data, blocker, role. Two minutes. You see the result before talking to anyone.",
        }}
        meetingUrl={diagnosticUrl}
        meetingLabel="Start diagnostic"
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
