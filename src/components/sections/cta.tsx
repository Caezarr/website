import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

interface CtaProps {
  id?: string;
  meetingUrl?: string | null;
}

export function Cta({ id, meetingUrl }: CtaProps) {
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
        <h2 className="type-h4 text-text xl:whitespace-nowrap">
          Your team is too good for this work.
        </h2>
        <p className="type-body max-w-[35.125rem] text-text opacity-80">
          Let&apos;s find out what they should stop doing. One call. No prep
          needed.
        </p>
        <ButtonLink href={meetingUrl ?? "#"} variant="primary">
          Let&apos;s talk
        </ButtonLink>
      </div>
    </Section>
  );
}
