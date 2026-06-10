"use client";

import { useState } from "react";
import { StarIcon } from "@/components/ui/icons/star-icon";

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

const testimonials = [
  {
    name: "Elise De Smet",
    role: "COO, Luminus",
    initials: "ED",
    quote: "WonkaChat replaced four different AI tools and gave us one secure place to work.",
    sub: "Our team finally has consistent answers, and IT finally has visibility into how AI is used.",
  },
  {
    name: "Dirk Gevers",
    role: "CEO, Cambio",
    initials: "DG",
    quote: "Onboarding new hires used to take weeks. With WonkaChat it takes hours.",
    sub: "They ask questions, the agent answers — and we kept all our data inside Europe.",
  },
  {
    name: "Sofie Claes",
    role: "CTO, ODTH",
    initials: "SC",
    quote: "The first AI tool our entire company actually uses every day.",
    sub: "It connects the tools we already have, so people get real work done without switching context.",
  },
];

export function WonkaChatTestimonialsSlider() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-8">
      <div className="flex shrink-0 flex-row gap-3 md:flex-col">
        {testimonials.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial from ${p.name}`}
            className={`relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all md:h-24 md:w-24 ${
              i === active
                ? "border-black scale-105 shadow-subtle-hover"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <div className="flex h-full w-full items-center justify-center bg-black type-h5 text-white">
              {p.initials}
            </div>
          </button>
        ))}
      </div>
      <figure className="relative flex-1 overflow-hidden rounded-3xl bg-mid-gray p-8 md:p-12">
        <QuoteIcon className="absolute right-6 top-6 h-24 w-24 text-text/[0.04] md:h-32 md:w-32" />
        <blockquote className="relative type-h5 text-text">{t.quote}</blockquote>
        <p className="relative mt-5 max-w-xl type-paragraph-m text-text/65">{t.sub}</p>
        <div className="relative mt-8 border-t border-dashed border-border" />
        <figcaption className="relative mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="type-body font-medium text-text">{t.name}</div>
            <div className="type-paragraph-s text-text/55">{t.role}</div>
          </div>
          <div className="flex items-center gap-1 text-text">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
