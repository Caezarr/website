"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { headingClass } from "@/lib/design-tokens";

const LOGO_ASSETS = [
  { src: "/images/hero/proof-1.svg", alt: "Engie, Buildwise, Xerius" },
  { src: "/images/hero/proof-2.svg", alt: "Luminus, Cambio, Zorgi, ODTH" },
  { src: "/images/hero/proof-3.svg", alt: "Client logos" },
];

const CYCLE_DURATION = 3000;

export function TrustedBy({ id }: { id?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LOGO_ASSETS.length);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id={id} className="py-16 md:py-20">
      <div className="flex flex-col items-center gap-10">
        <h2 className={cn(headingClass.section, "text-center")}>
          Ils nous font confiance
        </h2>

        <div className="relative h-[8rem] w-full max-w-[56rem] overflow-hidden">
          {LOGO_ASSETS.map((logo, i) => (
            <div
              key={logo.src}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
                i === activeIndex ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={896}
                height={128}
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>

        <p className="type-paragraph-m text-center text-text/60">
          #1 AI Start-Up of the Year, Belgium Startup Awards 2026
        </p>
      </div>
    </Section>
  );
}
