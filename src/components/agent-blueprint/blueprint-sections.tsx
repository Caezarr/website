import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FaqSchema } from "@/components/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import type { FaqItem } from "@/lib/types";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

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
