import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FaqSchema } from "@/components/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import type { FaqItem } from "@/lib/types";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { AgentTier } from "@/lib/agent-blueprint";
import { BlueprintScrollButton } from "./blueprint-scroll-button";

interface SampleTool {
  name: string;
  src: string;
}

const sampleTools = {
  sharePoint: { name: "SharePoint", src: "/images/visual/sharepoint.svg" },
  outlook: { name: "Outlook", src: "/images/visual/outlook.svg" },
  teams: { name: "Teams", src: "/images/visual/teams.svg" },
  odoo: { name: "Odoo", src: "/images/visual/odoo.png" },
  word: { name: "Word", src: "/images/visual/word.svg" },
  pdf: { name: "PDF", src: "/images/visual/pdf.svg" },
} satisfies Record<string, SampleTool>;

const sampleAgents: Array<{
  name: string;
  tier: AgentTier;
  mission: string;
  hours: string;
  tools: SampleTool[];
}> = [
  {
    name: "Tender response copilot",
    tier: "Copilot",
    mission:
      "Reads the tender file, pulls past answers and drafts a compliant first response.",
    hours: "6–9h",
    tools: [sampleTools.sharePoint, sampleTools.word, sampleTools.pdf],
  },
  {
    name: "Supplier invoice matcher",
    tier: "Human in the loop",
    mission:
      "Matches invoices to purchase orders and flags only the exceptions for approval.",
    hours: "8–12h",
    tools: [sampleTools.odoo, sampleTools.outlook],
  },
  {
    name: "Site report autopilot",
    tier: "Fully autonomous",
    mission:
      "Turns daily site notes into a weekly client report, filed and shared on schedule.",
    hours: "4–6h",
    tools: [sampleTools.sharePoint, sampleTools.teams],
  },
];

const tierDot: Record<AgentTier, string> = {
  Copilot: "bg-blue-500",
  "Human in the loop": "bg-orange-300",
  "Fully autonomous": "bg-green-500",
};

const deliverables = [
  "Mission and trigger for every agent",
  "Step-by-step workflow",
  "The tools it plugs into",
  "Where a human stays in control",
  "Hours returned to the team each week",
  "Build effort, so you know where to start",
];

export function SampleBlueprint() {
  return (
    <Section
      id="example-blueprint"
      // The illustrative example is redundant once a real blueprint exists.
      className="bg-background scroll-mt-16 group-data-[state=result]/blueprint:hidden"
      containerClassName="grid gap-12 py-18 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16"
    >
      <div className="flex flex-col items-start gap-6">
        <Eyebrow>What you get</Eyebrow>
        <h2 className={cn(headingClass.section, "max-w-[18ch]")}>
          A concrete plan, not another AI slide deck.
        </h2>
        <p className="type-body text-text/65 max-w-md">
          Each blueprint gives you three agents sized to your business, from a
          copilot your team uses on day one to a workflow that runs on its own.
        </p>
        <ul className="border-border grid w-full max-w-md gap-3 border-t border-dashed pt-6">
          {deliverables.map((item) => (
            <li
              key={item}
              className="type-paragraph-m text-text/75 flex items-start gap-3"
            >
              <span
                aria-hidden
                className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[0.6rem] text-blue-700"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <BlueprintScrollButton className="mt-2">
          Get my free blueprint
        </BlueprintScrollButton>
      </div>

      <div className="relative">
        <div className="border-border bg-light-gray overflow-hidden rounded-sm border">
          <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b border-dashed bg-white px-5 py-4 md:px-6">
            <div>
              <span className="type-eyebrow text-blue-700">
                Example blueprint
              </span>
              <p className="type-paragraph-m-bold mt-1">
                Construction company · 250 employees
              </p>
            </div>
            <div className="text-right">
              <p className="type-h5 text-blue-700">18–27h</p>
              <p className="type-paragraph-s text-text/45">saved every week</p>
            </div>
          </div>

          <ol className="bg-border grid gap-px">
            {sampleAgents.map((agent, index) => (
              <li
                key={agent.name}
                className="grid gap-4 bg-white px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center md:px-6"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="type-eyebrow text-text/35">
                      Agent 0{index + 1}
                    </span>
                    <span className="text-text/20">·</span>
                    <span className="type-paragraph-s text-text/55 flex items-center gap-1.5">
                      <span
                        aria-hidden
                        className={cn(
                          "size-1.5 rounded-full",
                          tierDot[agent.tier],
                        )}
                      />
                      {agent.tier}
                    </span>
                  </div>
                  <p className="type-paragraph-m-bold mt-2">{agent.name}</p>
                  <p className="type-paragraph-s text-text/55 mt-1 max-w-md">
                    {agent.mission}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex -space-x-1.5">
                    {agent.tools.map((tool) => (
                      <span
                        key={tool.name}
                        title={tool.name}
                        className="flex size-8 items-center justify-center rounded-full border border-black/8 bg-white p-1.5 shadow-sm"
                      >
                        <Image
                          src={tool.src}
                          alt={tool.name}
                          width={20}
                          height={20}
                          className="size-5 object-contain"
                        />
                      </span>
                    ))}
                  </div>
                  <p className="type-paragraph-m-bold text-blue-700">
                    {agent.hours}
                    <span className="type-paragraph-s text-text/40 font-normal">
                      {" "}
                      / week
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="border-border flex items-center justify-between gap-4 border-t border-dashed px-5 py-4 md:px-6">
            <p className="type-paragraph-s text-text/45">
              Illustrative example. Yours is built from your own website.
            </p>
            <span className="type-paragraph-s text-text/35 hidden sm:inline">
              ≈ 1 min
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

const steps = [
  {
    title: "We read your website",
    body: "Services, products, sectors, careers and customer pages, plus public sources like job posts and news. We map what you sell, how work flows and where it repeats.",
  },
  {
    title: "We match 570 real use cases",
    body: "Each high-potential process is matched separately against an anonymised benchmark of enterprise AI projects, so every agent builds on a pattern that already works.",
  },
  {
    title: "Get three agents, then build one",
    body: "Pick the agent with the best return. A Wonka engineer validates the scope with you and ships it in weeks.",
  },
];

export function BlueprintSteps() {
  return (
    <section className="bg-mid-gray border-border border-y border-dashed">
      <Section containerClassName="py-18 md:py-24">
        <SectionHeader
          eyebrow={<Eyebrow>How it works</Eyebrow>}
          heading={"From website to agent team\nin three steps."}
        />
        <ol className="border-border mt-12 grid rounded-sm border border-dashed md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "flex min-h-[14rem] flex-col justify-between gap-8 p-7.5",
                index > 0 &&
                  "border-border border-t border-dashed md:border-t-0 md:border-l",
              )}
            >
              <span className="type-h4 text-blue-600 tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className={headingClass.card}>{step.title}</h3>
                <p className="type-paragraph-m text-text/65 mt-3">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </section>
  );
}

const BLUEPRINT_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is the blueprint really free?",
    answer:
      "Yes. No sign-up, no email and no credit card. Enter a website and you get the full blueprint on screen.",
  },
  {
    question: "What information do you use about my company?",
    answer:
      "Only public web information about the domain you enter. We never ask for internal documents, and the result never shows your company name or any benchmark client name.",
  },
  {
    question: "Where do the 570 use cases come from?",
    answer:
      "From an anonymised benchmark of enterprise AI projects. Client names and mission details are removed before any pattern is used.",
  },
  {
    question: "How reliable are the time-saving estimates?",
    answer:
      "They are directional, based on recurring tasks in comparable projects. On a scoping call we validate them against your real volumes before anything is built.",
  },
  {
    question: "Which tools can the agents connect to?",
    answer:
      "Microsoft 365 (Outlook, SharePoint, Teams), Odoo, SAP, Dynamics, Salesforce, HubSpot, Jira and more. Every blueprint lists the integrations each agent needs.",
  },
  {
    question: "What happens after I get my blueprint?",
    answer:
      "Nothing, unless you want it to. If an agent looks worth building, book a 30-minute call and a Wonka engineer turns it into a scoped delivery plan.",
  },
];

export function BlueprintFaq() {
  return (
    <>
      <FaqSchema items={BLUEPRINT_FAQ_ITEMS} />
      <FaqSection
        data={{
          header: {
            eyebrow: "FAQ",
            heading: "Questions before you try it",
            body: null,
          },
          items: BLUEPRINT_FAQ_ITEMS,
        }}
      />
    </>
  );
}
