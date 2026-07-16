import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import type { HomepageCtaData } from "@/lib/types";

const DEFAULT_HEADING = "Your team is too good for this work.";
const DEFAULT_BODY = "Let's find out where Wonka AI can make a difference.";

interface CtaProps {
  id?: string;
  data?: HomepageCtaData | null;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
}

export function Cta({ id, data, meetingUrl, meetingLabel }: CtaProps) {
  const heading = data?.heading ?? DEFAULT_HEADING;
  const body = data?.body ?? DEFAULT_BODY;
  const ctaLabel = meetingLabel ?? DEFAULT_MEETING_LABEL;

  return (
    <Section
      id={id}
      data-theme="dark"
      fluid
      className="bg-black px-0 md:px-0 lg:px-0"
      containerClassName="relative overflow-hidden flex flex-col items-center px-6 md:px-12 py-15 md:py-22"
    >
      <Image
        src="/images/CTA/cta-bg.avif"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-80"
      />
      <div className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="type-h4 text-text xl:whitespace-nowrap">{heading}</h2>
        <p className="type-body max-w-[35.125rem] text-text opacity-80">{body}</p>
        <ButtonLink href={meetingUrl ?? "#"} variant="primary">
          {ctaLabel}
        </ButtonLink>
      </div>
    </Section>
  );
}
