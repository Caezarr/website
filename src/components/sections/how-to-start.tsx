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

const OUTCOMES: string[] = [
  "A sense of what's realistic to achieve, and how fast.",
  "A clear next step, whether that's Start AI, Wonka Build, or WonkaChat.",
  "Answers to your specific AI questions.",
  "No obligation, no pressure. Just a clearer picture about AI.",
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
              Not sure how to get started?
            </h2>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.2}>
            <p className="type-body max-w-[35.125rem] text-center text-text opacity-80">
              That&apos;s exactly why we talk.
              <br />
              Book a 30-minute call. Tell us how you work, and we&apos;ll tell you
              where AI would actually make a difference, and where it wouldn&apos;t.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-3.5">
          <div
            data-theme="dark"
            className="relative overflow-hidden rounded-xs bg-black p-7"
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
                Book a 30 min call
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col gap-8 rounded-sm border border-border bg-light-gray px-7 py-10 lg:flex-row lg:items-stretch lg:gap-6">
            <h3 className="type-h5 flex-1 text-text">
              You walk away with
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
      </div>
    </Section>
  );
}
