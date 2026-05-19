"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

interface Topic {
  question: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const TOPICS: Topic[] = [
  {
    question: "No AI strategy yet?",
    body: "No idea where to begin. We show you what's possible, map where AI creates real value, build the business cases, and create your AI policy.",
    ctaLabel: "Start AI",
    ctaHref: "#",
  },
  {
    question: "Already using AI but it's not working for everyone?",
    body: "Fragmented, inconsistent, stuck with a few people. We audit what's working, identify what's missing, and build the structure to make it work across the whole organisation.",
    ctaLabel: "WonkaChat",
    ctaHref: "#",
  },
  {
    question: "Ready to deploy but don't know where to start?",
    body: "You know AI works. You just need the right use cases, the right setup, and someone to make sure it sticks. We get your first workflow running in days.",
    ctaLabel: "WonkaBuild",
    ctaHref: "#",
  },
];

const OUTCOMES: string[] = [
  "A clear picture of where AI creates real value in your organisation",
  "Prioritised business cases with ROI calculations",
  "An AI policy built for your organisation",
  "A roadmap of what to implement, in what order, and why",
];

interface HowToStartProps {
  id?: string;
  meetingUrl?: string | null;
}

export function HowToStart({ id, meetingUrl }: HowToStartProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <Section
      id={id}
      className="pt-15 pb-20 md:pb-30"
      aria-labelledby="how-to-start-heading"
    >
      <div className="flex flex-col gap-16 md:gap-20">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          <FadeIn play={headerInView}>
            <Eyebrow>How to start</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <h2
              id="how-to-start-heading"
              className="type-h4 max-w-[44.875rem] text-center text-text"
            >
              Start somewhere.
              <br />
              Scale it. Never go back.
            </h2>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.2}>
            <p className="type-body max-w-[35.125rem] text-center text-text opacity-80">
              Most companies know AI matters. Few know where it creates real value
              for them specifically. Start AI gives you the clarity, the business
              cases, and the roadmap to move forward with confidence.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-3.5">
          <div
            data-theme="dark"
            className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-xs bg-black p-7 lg:h-[32.5rem] lg:gap-0"
          >
            <Image
              src="/images/how-to-start/how-to-start-bg.avif"
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="pointer-events-none object-cover opacity-90"
            />

            <div className="relative flex flex-col items-start gap-6">
              <h3 className="type-h5 max-w-[44.875rem] text-text">
                30 minutes.
                <br />
                You&apos;ll know if it makes sense.
              </h3>
              <ButtonLink href={meetingUrl ?? "#"} variant="primary">
                Schedule a call
              </ButtonLink>
            </div>

            <ul className="relative flex flex-col gap-6 lg:flex-row lg:gap-6">
              {TOPICS.map((topic, i) => (
                <li
                  key={i}
                  className={cn(
                    "flex flex-1 flex-col gap-3 lg:min-w-0 lg:justify-center lg:border-t-0 lg:pt-0",
                    i > 0 && "border-t border-dashed border-white/40 pt-6",
                  )}
                >
                  <div className="lg:border-b lg:border-dashed lg:border-white/40 lg:pb-3">
                    <p className="type-body text-text">{topic.question}</p>
                  </div>
                  <p className="type-paragraph-m text-text opacity-80">
                    {topic.body}
                  </p>
                  <ButtonLink
                    href={topic.ctaHref}
                    variant="underline"
                    className="self-start"
                  >
                    {topic.ctaLabel}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 rounded-sm border border-border bg-light-gray px-7 py-10 lg:flex-row lg:items-stretch lg:gap-6">
            <h3 className="type-h5 flex-1 text-text">
              In all three cases,
              <br />
              you walk away with
            </h3>
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {OUTCOMES.map((outcome, i) => (
                <li
                  key={i}
                  className={cn(
                    "flex items-center gap-2.5",
                    i < OUTCOMES.length - 1 &&
                      "border-b border-dashed border-border pb-2",
                  )}
                >
                  <CheckmarkIcon className="size-2.5 shrink-0 text-text" />
                  <span className="type-paragraph-m text-text">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h3 className="type-h5 max-w-[44.875rem] text-center text-text">
            What comes next
          </h3>
          <p className="type-body max-w-[35.125rem] text-center text-text opacity-80">
            The business cases we build together become the foundation for your
            first Wonka Build or WonkaChat deployment.
          </p>
          <ButtonLink href={meetingUrl ?? "#"} variant="primary" className="mt-3">
            Book a 30 min call
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
