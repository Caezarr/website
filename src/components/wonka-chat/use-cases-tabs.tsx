"use client";

import { useState } from "react";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const useCaseTabs = [
  {
    key: "sales",
    label: "Sales",
    workflows: [
      {
        title: "Lead follow-up",
        description: "A lead comes in. It's logged and answered before it goes cold.",
        items: ["Captured from form or email", "Opportunity created in CRM", "Follow-up sent with the right info or meeting link"],
      },
      {
        title: "Sales order processing",
        description: "Order arrives. It's entered and confirmed without retyping.",
        items: ["Details extracted from email or attachment", "Order created in ERP, planning updated", "Team notified, confirmation sent"],
      },
      {
        title: "Sales intelligence dashboard",
        description: "A custom application that gives the sales team live visibility into pipeline, account activity, and next best actions without switching between five tools.",
        items: ["Built around your CRM and data sources", "Surfaces priority accounts and signals", "Accessible to the whole team, not just the analysts"],
      },
    ],
  },
  {
    key: "ops",
    label: "Operations",
    workflows: [
      {
        title: "Order intake",
        description: "Incoming orders parsed and routed without manual entry.",
        items: ["Extracted from email or PDF", "Validated against rules", "Pushed into ERP automatically"],
      },
      {
        title: "Planning updates",
        description: "Changes reflected across systems the moment they happen.",
        items: ["Status synced across tools", "Stakeholders notified", "Exceptions flagged for review"],
      },
      {
        title: "Operations dashboard",
        description: "A single live view of throughput, blockers and next actions across teams.",
        items: ["Built on your operational data", "Surfaces bottlenecks in real time", "Shared across operations and leadership"],
      },
    ],
  },
  {
    key: "hr",
    label: "HR",
    workflows: [
      {
        title: "Policy answers",
        description: "Employees get accurate answers in seconds, sourced from your handbook.",
        items: ["Trained on internal HR documents", "Answers cite the source", "Escalates complex cases to HR"],
      },
      {
        title: "Onboarding assistant",
        description: "New hires guided through their first weeks without manual handholding.",
        items: ["Personalised checklist per role", "Reminders for documents and trainings", "HR notified on progress"],
      },
      {
        title: "People dashboard",
        description: "A custom view that gives HR live visibility into headcount, requests and key milestones.",
        items: ["Built around your HRIS data", "Surfaces upcoming reviews and contracts", "Accessible to managers and HR"],
      },
    ],
  },
  {
    key: "support",
    label: "Support",
    workflows: [
      {
        title: "Ticket triage",
        description: "Every incoming request classified and routed in seconds.",
        items: ["Captured from email, chat or form", "Categorised and prioritised", "Assigned to the right team"],
      },
      {
        title: "Reply drafting",
        description: "Agents start from a draft, not a blank page.",
        items: ["Pulls answers from your knowledge base", "Matches tone and policy", "Reviewed before sending"],
      },
      {
        title: "Support insights dashboard",
        description: "A live view of volume, satisfaction and recurring issues across channels.",
        items: ["Built on your ticket data", "Surfaces top themes and trends", "Shared with support and product"],
      },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    workflows: [
      {
        title: "Invoice processing",
        description: "Incoming invoices captured, validated and ready for approval.",
        items: ["Extracted from email or PDF", "Matched against orders", "Routed for approval automatically"],
      },
      {
        title: "Expense reports",
        description: "Reports compiled and checked without chasing receipts.",
        items: ["Receipts parsed and categorised", "Policy checks applied", "Flagged items raised for review"],
      },
      {
        title: "Finance dashboard",
        description: "A custom view that gives finance live visibility into cash, AR and key KPIs.",
        items: ["Built around your accounting data", "Surfaces overdue and risk items", "Accessible to finance and leadership"],
      },
    ],
  },
];

export function WonkaChatUseCasesTabs() {
  const [active, setActive] = useState(0);
  const tab = useCaseTabs[active];

  return (
    <div>
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2 className="type-h3">
          The work that used to wait
          <br />
          <span className="text-text/55">now doesn&apos;t. Across teams.</span>
        </h2>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {useCaseTabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 type-eyebrow transition-colors ${
                i === active
                  ? "bg-blue-100 text-blue-600"
                  : "bg-mid-gray text-text/55 hover:bg-mid-gray hover:text-text/80"
              }`}
            >
              {i === active && (
                <span aria-hidden className="inline-block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-blue-600" />
              )}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-dashed border-border" />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tab.workflows.map((w, i) => (
          <article key={w.title} className="flex flex-col rounded-2xl bg-mid-gray p-8">
            <span className="inline-flex w-fit items-center rounded-md bg-text px-2.5 py-1 type-eyebrow text-white">
              Workflow {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 type-h6">{w.title}</h3>
            <p className="mt-6 type-paragraph-m text-text/70">{w.description}</p>
            <ul className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
              {w.items.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-dashed border-border pb-3 type-paragraph-s text-text/75 last:border-b-0 last:pb-0">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-text/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
