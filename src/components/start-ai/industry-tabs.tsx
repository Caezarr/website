"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m22 8-6 4 6 4V8z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}

const industries = [
  {
    key: "Logistics & Transport",
    body: "Transport and logistics teams often operate under high pressure, where growth quickly exposes bottlenecks in planning, processing and communication.",
    items: [
      "Identify operational bottlenecks slowing down growth",
      "Explore AI support for planning, processing and internal communication",
      "Reduce manual follow-up and repetitive coordination work",
      "Improve scalability without adding unnecessary complexity",
    ],
    logos: ["ODTH", "Katoen Natie"],
  },
  {
    key: "Healthcare",
    body: "Healthcare organisations deal with sensitive information, high administrative pressure and teams that need fast access to reliable knowledge.",
    items: [
      "Identify administrative workflows where AI can reduce workload",
      "Explore safe AI support for documentation and knowledge access",
      "Define responsible AI guidelines for sensitive environments",
      "Improve efficiency while keeping data security and control central",
    ],
    logos: ["Zorgi", "Cambio"],
  },
  {
    key: "Finance",
    body: "Finance teams work in document-heavy, reporting-driven and compliance-sensitive environments where accuracy and control are essential.",
    items: [
      "Map reporting, review and compliance-heavy workflows",
      "Explore AI support for document analysis and internal knowledge use",
      "Identify opportunities to speed up repetitive expert work",
      "Define governance for secure and responsible AI adoption",
    ],
    logos: ["PwC", "Xerius"],
  },
  {
    key: "Legal",
    body: "Legal teams lose valuable time on repetitive research, drafting, review and document-heavy workflows, while human judgement must remain central.",
    items: [
      "Identify repetitive research and document tasks",
      "Explore AI support for summarisation, drafting and review",
      "Define clear boundaries for responsible AI use",
      "Free up experts for more strategic and high-value work",
    ],
    logos: ["Eubelius", "Monard Law"],
  },
  {
    key: "Manufacturing",
    body: "Manufacturing environments often rely on process knowledge, manual checks, reporting flows and operational decision-making across teams.",
    items: [
      "Identify quality, reporting and process bottlenecks",
      "Explore AI support for documentation and operational knowledge sharing",
      "Reduce manual checks and repetitive reporting tasks",
      "Prioritise AI opportunities based on impact and feasibility",
    ],
    logos: ["Buildwise", "Engie"],
  },
  {
    key: "Public Sector",
    body: "Public organisations can use AI to improve internal efficiency and service delivery, while maintaining transparency, governance and public trust.",
    items: [
      "Identify administrative and citizen-service bottlenecks",
      "Explore AI support for internal knowledge access and document flows",
      "Define responsible use guidelines and governance principles",
      "Prioritise low-risk, high-value AI opportunities with public impact",
    ],
    logos: ["Stad Gent", "VLAIO"],
  },
  {
    key: "All Industries",
    body: "AI opportunities are not limited to one sector. Wherever teams deal with repetitive work, scattered knowledge, slow processes or complex information, Start AI can help uncover value.",
    items: [
      "Discover where AI can create measurable impact",
      "Validate opportunities before investing in implementation",
      "Choose the right platform and governance approach",
      "Build a roadmap tailored to your organisation",
    ],
    logos: ["Luminus", "Wonka"],
  },
];

export function IndustryTabs({ meetingUrl }: { meetingUrl: string | null }) {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {industries.map((ind, i) => (
          <button
            key={ind.key}
            type="button"
            onClick={() => setActive(i)}
            className={
              "rounded-full px-5 py-2 type-paragraph-s transition-colors " +
              (i === active
                ? "bg-black text-white"
                : "bg-white text-text/70 hover:text-text border border-border")
            }
          >
            {ind.key}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 rounded-lg border border-border bg-white p-8 md:grid-cols-2 md:gap-14 md:p-12">
        <div className="flex flex-col">
          <h3 className="type-h5 leading-tight">{current.key}</h3>
          <p className="mt-4 max-w-md type-body text-text/60">{current.body}</p>
          <div className="mt-8">
            <ButtonLink href={meetingUrl ?? "#contact"} variant="primary">
              <VideoIcon className="h-4 w-4" />
              Schedule a call
            </ButtonLink>
          </div>
          <div className="mt-auto pt-10">
            <p className="type-eyebrow text-text/40">Clients in this industry</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
              {current.logos.map((l) => (
                <span key={l} className="type-h6 text-text/40">{l}</span>
              ))}
            </div>
          </div>
        </div>
        <ul className="md:border-l md:border-dashed md:border-border md:pl-10">
          {current.items.map((item, i) => (
            <li key={item}>
              {i === 0 && <div className="border-t border-dashed border-border" />}
              <div className="flex items-baseline gap-4 py-4">
                <span className="font-mono type-eyebrow text-text/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="type-body leading-snug">{item}</span>
              </div>
              <div className="border-t border-dashed border-border" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
