"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";

interface ServiceCard {
  tagline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const CARDS: ServiceCard[] = [
  {
    tagline: "Know AI matters, but not where to start?",
    body: "We analyze your processes, map where AI creates real value, and build your roadmap with concrete actions.",
    ctaLabel: "Discover Start AI",
    ctaHref: "/start-ai",
  },
  {
    tagline: "Repetitive work no tool seems to solve?",
    body: "We build custom AI applications that fit your systems and run in your day-to-day work.",
    ctaLabel: "Discover Wonka Build",
    ctaHref: "/ai-agents",
  },
  {
    tagline: "Ready to give your whole team AI?",
    body: "One place for everyone to work with AI, connected to your company's tools and data.",
    ctaLabel: "Discover WonkaChat",
    ctaHref: "/wonka-chat",
  },
];

export function HowItWorks({ id = "how-it-works" }: { id?: string }) {
  const headingId = `${id}-heading`;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const cardsRef = useRef<HTMLUListElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <Section id={id} className="py-20 md:py-30" aria-labelledby={headingId}>
      <div className="flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          <FadeIn play={headerInView}>
            <Eyebrow>What we do</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <h2
              id={headingId}
              className="type-h4 max-w-[44.875rem] text-center text-text"
            >
              Everything you need
              <br />
              to make AI work.
            </h2>
          </FadeIn>
        </div>

        <ul ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <li key={card.tagline} className="h-full">
              <FadeIn
                play={cardsInView}
                delay={i * 0.12}
                className="relative isolate flex h-full min-h-[22rem] flex-col overflow-hidden rounded-sm bg-blue-400 p-6 md:min-h-[24rem] md:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 110% at 65% 115%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)",
                  }}
                />
                <h3 className="relative shrink-0 type-h6 text-white">{card.tagline}</h3>
                <div className="relative min-h-6 flex-1" aria-hidden />
                <div className="relative flex flex-col gap-6">
                  <p className="type-body text-white opacity-80">{card.body}</p>
                  <ButtonLink
                    href={card.ctaHref}
                    variant="secondary"
                    className="type-paragraph-m-bold relative h-[2.6875rem] self-start px-[1.125rem] text-black [&>svg:first-of-type_path]:fill-light-gray"
                  >
                    {card.ctaLabel}
                  </ButtonLink>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
