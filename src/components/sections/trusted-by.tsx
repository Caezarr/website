"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { headingClass } from "@/lib/design-tokens";

function NvidiaLogo() {
  return (
    <svg
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
    >
      <path
        d="M1.85283 5.16593C1.85283 5.16593 3.49248 2.74676 6.76631 2.49648V1.61881C3.14013 1.91003 0 4.98123 0 4.98123C0 4.98123 1.77852 10.1226 6.76631 10.5934V9.66046C3.10603 9.19998 1.85283 5.16593 1.85283 5.16593ZM6.76631 7.80515V8.65951C3.99995 8.16632 3.23208 5.29067 3.23208 5.29067C3.23208 5.29067 4.56032 3.81926 6.76631 3.58064V4.51813C6.76463 4.51813 6.76347 4.51762 6.76208 4.51762C5.60426 4.37868 4.69977 5.46029 4.69977 5.46029C4.69977 5.46029 5.20673 7.28114 6.76631 7.80515ZM6.76631 0V1.61881C6.87276 1.61065 6.9792 1.60373 7.08624 1.60008C11.2088 1.46114 13.8949 4.98123 13.8949 4.98123C13.8949 4.98123 10.8098 8.73266 7.59568 8.73266C7.3011 8.73266 7.02532 8.70534 6.76631 8.65943V9.66046C6.9878 9.68858 7.21746 9.70512 7.45709 9.70512C10.4481 9.70512 12.6111 8.17761 14.7055 6.36973C15.0528 6.64784 16.4744 7.32442 16.7667 7.62059C14.7752 9.28785 10.1341 10.6318 7.50292 10.6318C7.2493 10.6318 7.00573 10.6165 6.76631 10.5934V12H18.1348V0H6.76631ZM6.76631 3.58064V2.49648C6.87166 2.48912 6.97782 2.48351 7.08624 2.48009C10.0508 2.38697 11.9957 5.02764 11.9957 5.02764C11.9957 5.02764 9.895 7.94519 7.6426 7.94519C7.31844 7.94519 7.02787 7.89309 6.76631 7.80515V4.51813C7.92041 4.65759 8.15262 5.16739 8.84647 6.32405L10.3896 5.02284C10.3896 5.02284 9.26315 3.54545 7.3642 3.54545C7.15779 3.54538 6.96026 3.55988 6.76631 3.58064Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
    >
      <path d="M0.521729 0.521729H5.73912V5.73912H0.521729V0.521729Z" fill="currentColor" />
      <path d="M6.26099 0.521729H11.4784V5.73912H6.26099V0.521729Z" fill="currentColor" />
      <path d="M0.521729 6.26086H5.73912V11.4783H0.521729V6.26086Z" fill="currentColor" />
      <path d="M6.26099 6.26086H11.4784V11.4783H6.26099V6.26086Z" fill="currentColor" />
    </svg>
  );
}

type ClientLogo =
  | { id: string; type: "component"; component: React.ComponentType }
  | { id: string; type: "svg"; src: string; alt: string }
  | { id: string; type: "image"; src: string; alt: string };

const CLIENT_LOGOS: ClientLogo[] = [
  { id: "nvidia", type: "component", component: NvidiaLogo },
  { id: "microsoft", type: "component", component: MicrosoftLogo },
  { id: "pwc", type: "svg", src: "/images/france/logos/pwc.svg", alt: "PwC" },
  { id: "luminus", type: "svg", src: "/images/france/logos/luminus.svg", alt: "Luminus" },
  { id: "cambio", type: "image", src: "/images/france/logos/cambio.png", alt: "Cambio" },
  { id: "odth", type: "image", src: "/images/france/logos/odth.png", alt: "ODTH" },
];

const GRID_SIZE = CLIENT_LOGOS.length;
const SWAP_INTERVAL = 1500;
const FADE_DURATION = 800;

export function TrustedBy({ id }: { id?: string }) {
  const [visibleIndices, setVisibleIndices] = useState<number[]>(() =>
    Array.from({ length: GRID_SIZE }, (_, i) => i),
  );
  const [swapping, setSwapping] = useState<number | null>(null);

  useEffect(() => {
    if (GRID_SIZE >= CLIENT_LOGOS.length) return;

    const interval = setInterval(() => {
      if (swapping !== null) return;

      const slotIndex = Math.floor(Math.random() * GRID_SIZE);
      const hiddenIndices = CLIENT_LOGOS.map((_, i) => i).filter(
        (i) => !visibleIndices.includes(i),
      );

      if (hiddenIndices.length === 0) return;

      const newLogoIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];

      setSwapping(slotIndex);

      setTimeout(() => {
        setVisibleIndices((prev) => {
          const next = [...prev];
          next[slotIndex] = newLogoIndex;
          return next;
        });

        setTimeout(() => {
          setSwapping(null);
        }, FADE_DURATION);
      }, FADE_DURATION);
    }, SWAP_INTERVAL);

    return () => clearInterval(interval);
  }, [visibleIndices, swapping]);

  return (
    <Section id={id} className="py-16 md:py-20">
      <div className="flex flex-col items-center gap-10">
        <h2 className={cn(headingClass.section, "text-center")}>
          Ils nous font confiance
        </h2>

        <div className="grid w-full max-w-[56rem] grid-cols-3 grid-rows-2 border-l border-border">
          {visibleIndices.map((logoIndex, slotIndex) => {
            const logo = CLIENT_LOGOS[logoIndex];
            const isSwapping = swapping === slotIndex;

            return (
              <div
                key={slotIndex}
                className="relative flex min-h-[6rem] items-center justify-center border-r border-b border-border p-4 transition-opacity duration-[800ms]"
                style={{ opacity: isSwapping ? 0 : 1 }}
              >
                {logo.type === "component" ? (
                  <div className="flex h-8 w-20 items-center justify-center text-text">
                    <logo.component />
                  </div>
                ) : logo.type === "svg" ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={32}
                    className="h-auto max-h-8 w-auto max-w-full object-contain"
                  />
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={32}
                    className="h-auto max-h-8 w-auto max-w-full object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>

        <p className="type-paragraph-m text-center text-text/60">
          #1 AI Start-Up of the Year, Belgium Startup Awards 2026
        </p>
      </div>
    </Section>
  );
}
