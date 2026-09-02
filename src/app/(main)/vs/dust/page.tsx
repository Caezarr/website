import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import type { HeroData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/vs/dust";
const title = "Dust AI alternative for French ETI | Wonka vs Dust";
const description = "Dust AI alternative for French ETI. Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.";

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
  title: "Dust alternative for IT and security leads of French ETI",
  subtitle: "Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "Dust is the search term. ChatGPT perso remains the real competitor.",
  },
  {
    tag: "p",
    content: "Your team already uses ChatGPT on personal accounts.",
  },
  {
    tag: "p",
    content: "IT and security leads at French ETI know they need governance, data residency in Europe, and agents that act in your actual tools (Odoo, SharePoint) rather than just chat.",
  },
];

export default async function DustVsPage() {
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=vs-dust";
  const registerUrl = "https://wonka.chat/register";

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
          <h2 className="type-h4 mb-6">For French ETI with Odoo and SharePoint</h2>
          <ul className="space-y-4 type-body">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>If you run Odoo as your ERP and SharePoint for documents, Wonka connects natively.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>Agents read Odoo context, suggest actions, and let ops teams validate before executing.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>SharePoint connection runs via Microsoft Graph API with your credentials.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-text/40">~</span>
              <span>Dust offers 66 public connectors including SharePoint, Salesforce, Slack, Notion, ServiceNow, but NOT Odoo. Custom MCP connectors possible but require development effort.</span>
            </li>
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">Certifications and compliance</h2>
          <p className="type-body mb-4 font-medium">
            ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).
          </p>
          <p className="type-paragraph-m text-text/60">
            Dust: SOC 2 Type II certified, GDPR, HIPAA enablement. ISO 27001 not listed on their public security page as of August 2026.
          </p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">Comparison table</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-background">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-text/[0.03]">
                  <th className="px-5 py-4 type-paragraph-m-bold">Criteria</th>
                  <th className="px-5 py-4 type-paragraph-m-bold text-text/50">ChatGPT perso</th>
                  <th className="px-5 py-4 type-paragraph-m-bold text-text/50">Dust</th>
                  <th className="px-5 py-4 type-paragraph-m-bold text-accent">Wonka</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Data location</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">US (OpenAI)</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Cloud, multi-region</td>
                  <td className="px-5 py-4 type-paragraph-m">Azure West Europe</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Who uses agents</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Personal accounts</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Org workspace</td>
                  <td className="px-5 py-4 type-paragraph-m">Org workspace</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Odoo native</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">No</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Custom MCP</td>
                  <td className="px-5 py-4 type-paragraph-m">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">SharePoint</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">No</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Yes (connector)</td>
                  <td className="px-5 py-4 type-paragraph-m">Yes (Graph API)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">ISO 27001</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">N/A</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Not listed publicly</td>
                  <td className="px-5 py-4 type-paragraph-m">Certified</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Other compliance</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">N/A</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">SOC 2 Type II, GDPR, HIPAA</td>
                  <td className="px-5 py-4 type-paragraph-m">GDPR, NIS 2, SOC 2 in progress</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">EU hosting</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">No</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Multi-region option</td>
                  <td className="px-5 py-4 type-paragraph-m">Azure West Europe default</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Time to first useful agent</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Immediate</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Varies</td>
                  <td className="px-5 py-4 type-paragraph-m">45 min diagnostic + 1 week</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4 type-paragraph-m">Public pricing</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">$20/month</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Pro $24/seat/year, Max $120</td>
                  <td className="px-5 py-4 type-paragraph-m">21,60 € HT/user/month</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 type-paragraph-m">Trial</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Limited free</td>
                  <td className="px-5 py-4 type-paragraph-m text-text/60">Check dust.tt</td>
                  <td className="px-5 py-4 type-paragraph-m">7-day trial, no card</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">Proof: Itzu and N-allo</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">Itzu</h3>
              <p className="type-paragraph-m text-text/70">100% of employees on personal WonkaChat. Hours saved per person each week across HR and ops workflows.</p>
              <a href="/case-studies/itzu" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Read case study →</a>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">N-allo (Engie)</h3>
              <p className="type-paragraph-m text-text/70">Team of over 70 people, 50% reduction in support email handling time. Never operated at 70% capacity.</p>
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
          <h2 className="type-h4 mb-6">FAQ for IT and security leads</h2>
          <div className="space-y-6">
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Does Wonka connect to Odoo natively?</h3>
              <p className="type-paragraph-m text-text/60">Yes. Wonka reads Odoo records, prepares actions (create quote, update delivery), and lets your ops team validate before execution. This is a native integration, not a generic API connector.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Where is data processed?</h3>
              <p className="type-paragraph-m text-text/60">Azure West Europe (Microsoft Ireland) by default. Your data never leaves European infrastructure. SOC 2 Type II in progress, ISO 27001 certified, GDPR and NIS 2 compliant.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">How long to deploy for a 50-person ETI?</h3>
              <p className="type-paragraph-m text-text/60">45-minute diagnostic, 3 agents scoped to your Odoo and SharePoint workflows. Trial agents live within one week. Full rollout depends on validation cycles, typically 4-8 weeks.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Can IT and security leads paste the compliance line?</h3>
              <p className="type-paragraph-m text-text/60">ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).</p>
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
            <a href="/integrations/odoo" className="text-accent hover:underline">Odoo integration</a>
            <span className="text-text/30">•</span>
            <a href="/integrations/sharepoint" className="text-accent hover:underline">SharePoint integration</a>
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
          heading: "45 min diagnostic. 3 agents ready for your Odoo and SharePoint.",
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
