import Image from "next/image";
import { Section } from "@/components/ui/section";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import type { SecurityData } from "@/lib/types";

const DEFAULT_HEADING = "Your data is always yours.";

interface SecurityProps {
  id?: string;
  data?: SecurityData | null;
}

export function Security({ id, data }: SecurityProps) {
  const heading = data?.heading ?? DEFAULT_HEADING;

  return (
    <Section id={id} wide className="bg-background">
      <div className="relative overflow-hidden rounded-sm bg-blue-900 p-7.5 text-white md:p-12">
        <Image
          src="/images/security/banner-bg.avif"
          alt=""
          fill
          sizes="(min-width: 89rem) 89rem, 100vw"
          className="object-cover mix-blend-luminosity"
        />
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-5">
          <div className="flex max-w-[35.125rem] flex-col">
            <h2 className="type-h4">{heading}</h2>
          </div>
          <ul className="grid grid-cols-3">
            <li className="flex min-h-40 items-center justify-center border border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
              <BadgeGdpr className="size-16 md:size-31" />
            </li>
            <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
              <BadgeIso className="size-16 md:size-31" />
            </li>
            <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
              <BadgeNis2 className="size-16 md:size-31" />
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
