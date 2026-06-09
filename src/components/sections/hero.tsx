import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { HeroMarquee } from "./hero-marquee";

export const HERO_BG_IMAGE = "/images/hero-bg.avif";

interface HeroProps {
  meetingUrl?: string | null;
}

function NvidiaInceptionLogo() {
  return (
    <svg
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
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
      aria-hidden
      className="shrink-0"
    >
      <path d="M0.521729 0.521729H5.73912V5.73912H0.521729V0.521729Z" fill="currentColor" />
      <path d="M6.26099 0.521729H11.4784V5.73912H6.26099V0.521729Z" fill="currentColor" />
      <path d="M0.521729 6.26086H5.73912V11.4783H0.521729V6.26086Z" fill="currentColor" />
      <path d="M6.26099 6.26086H11.4784V11.4783H6.26099V6.26086Z" fill="currentColor" />
    </svg>
  );
}

function BackedBy() {
  return (
    <p className="type-eyebrow flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 text-text/60">
      <span>Backed by</span>
      <NvidiaInceptionLogo />
      <span>Nvidia Inception and</span>
      <MicrosoftLogo />
      <span>Microsoft for Startups.</span>
    </p>
  );
}

function AwardLaurelIcon() {
  return (
    <svg
      width="58"
      height="36"
      viewBox="0 0 58 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-9 w-[3.625rem] shrink-0"
    >
      <defs>
        <linearGradient id="award-gold" x1="8" y1="3" x2="50" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff0b0" />
          <stop offset="0.36" stopColor="#d29a27" />
          <stop offset="0.72" stopColor="#f7cd62" />
          <stop offset="1" stopColor="#a66e12" />
        </linearGradient>
      </defs>
      <g stroke="url(#award-gold)" strokeWidth="1" strokeLinecap="round" opacity="0.85">
        <path d="M18.8 28C13.9 24.7 11.6 20.2 11.8 15.5C12 10.9 14.6 6.9 18.2 4.1" />
        <path d="M39.2 28C44.1 24.7 46.4 20.2 46.2 15.5C46 10.9 43.4 6.9 39.8 4.1" />
      </g>
      <g fill="url(#award-gold)" filter="drop-shadow(0 0 5px rgba(246, 190, 65, 0.35))">
        <ellipse cx="15" cy="24.6" rx="1.05" ry="3.05" transform="rotate(-55 15 24.6)" />
        <ellipse cx="12.9" cy="21.2" rx="1.05" ry="2.9" transform="rotate(-68 12.9 21.2)" />
        <ellipse cx="11.9" cy="17.4" rx="1" ry="2.8" transform="rotate(-83 11.9 17.4)" />
        <ellipse cx="12.5" cy="13.3" rx="1" ry="2.75" transform="rotate(-104 12.5 13.3)" />
        <ellipse cx="14.3" cy="9.5" rx="0.95" ry="2.65" transform="rotate(-125 14.3 9.5)" />
        <ellipse cx="17.1" cy="6.2" rx="0.9" ry="2.55" transform="rotate(-146 17.1 6.2)" />
        <ellipse cx="43" cy="24.6" rx="1.05" ry="3.05" transform="rotate(55 43 24.6)" />
        <ellipse cx="45.1" cy="21.2" rx="1.05" ry="2.9" transform="rotate(68 45.1 21.2)" />
        <ellipse cx="46.1" cy="17.4" rx="1" ry="2.8" transform="rotate(83 46.1 17.4)" />
        <ellipse cx="45.5" cy="13.3" rx="1" ry="2.75" transform="rotate(104 45.5 13.3)" />
        <ellipse cx="43.7" cy="9.5" rx="0.95" ry="2.65" transform="rotate(125 43.7 9.5)" />
        <ellipse cx="40.9" cy="6.2" rx="0.9" ry="2.55" transform="rotate(146 40.9 6.2)" />
      </g>
      <text
        x="29"
        y="23"
        textAnchor="middle"
        fill="url(#award-gold)"
        fontSize="17"
        fontWeight="900"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
      >
        1
      </text>
    </svg>
  );
}

export function Hero({ meetingUrl }: HeroProps) {
  return (
    <section
      data-theme="dark"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-background text-text"
    >
      <FadeIn duration={0.6} aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={HERO_BG_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/40" />
      </FadeIn>

      <div className="flex flex-1 items-center justify-center px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <FadeIn delay={0.05}>
            <div
              className="award-marble-badge relative flex max-w-[min(92vw,47rem)] items-center gap-3 overflow-hidden rounded-full border border-[#c9962c]/90 px-4 py-2 text-white backdrop-blur-md md:gap-5 md:px-5"
              style={{ animation: "award-glow 3s ease-in-out infinite" }}
            >
              <span className="relative z-10 flex items-center">
                <AwardLaurelIcon />
              </span>
              <span className="relative z-10 h-8 w-px shrink-0 bg-gradient-to-b from-transparent via-[#d7a23c] to-transparent" aria-hidden />
              <span className="type-eyebrow relative z-10 text-left text-[0.68rem] leading-4 tracking-[0.12em] text-white/92 md:text-[0.75rem] md:leading-5">
                #1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="type-h3 max-w-[14ch] text-balance">
              Leave no human behind.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="type-body max-w-[27.125rem] text-text/90">
              Your whole team working at full potential.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <ButtonLink href={meetingUrl ?? "#"} variant="primary" className="mt-2">
              Become AI-native
            </ButtonLink>
          </FadeIn>
          <FadeIn delay={0.5}>
            <BackedBy />
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.6}>
        <HeroMarquee />
      </FadeIn>
    </section>
  );
}
