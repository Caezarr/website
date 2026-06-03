"use client";

import { useState } from "react";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const faqs = [
  { q: "Who is Start AI for?", a: "Belgian SMEs and scale-ups that want to move from AI experiments to a clear, company-wide strategy in weeks." },
  { q: "How much does it cost?", a: "Programs start at €15,000. Flemish SMEs can claim up to 70% back through the VLAIO KMO-portefeuille." },
  { q: "How much time is required from us?", a: "Roughly half a day per week for 2 to 3 key people. We do the heavy lifting between sessions." },
  { q: "What do we get at the end?", a: "A prioritized AI roadmap, a 90-day execution plan, and a leadership presentation ready to share." },
  { q: "How soon can we start?", a: "Most teams kick off within 2 weeks of the first call." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="block w-full py-5 text-left"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="type-body text-text">{q}</span>
        {open
          ? <MinusIcon className="h-4 w-4 shrink-0 text-text/50" />
          : <PlusIcon className="h-4 w-4 shrink-0 text-text/50" />}
      </div>
      {open && <p className="mt-3 type-paragraph-m text-text/65">{a}</p>}
    </button>
  );
}

export function FaqAccordion() {
  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i}>
          <div className="border-t border-dashed border-border" />
          <FaqItem {...f} />
        </div>
      ))}
      <div className="border-t border-dashed border-border" />
    </div>
  );
}
