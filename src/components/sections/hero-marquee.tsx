import Image from "next/image";

const LOGO_HEIGHT_PX = 24;

interface ProofItemData {
  message: string;
  logoSrc: string;
  logoAlt: string;
  logoIntrinsicWidth: number;
  logoIntrinsicHeight: number;
}

const PROOF_ITEMS: ProofItemData[] = [
  {
    message: "Scaled AI agents across their network.",
    logoSrc: "/images/hero/proof-1.svg",
    logoAlt: "PWC, Engie, Buildwise, Xerius",
    logoIntrinsicWidth: 287,
    logoIntrinsicHeight: 21,
  },
  {
    message: "Got fast-tracked to AI-native.",
    logoSrc: "/images/hero/proof-2.svg",
    logoAlt: "Luminus, Cambio, Zorgi, ODTH",
    logoIntrinsicWidth: 289,
    logoIntrinsicHeight: 24,
  },
  {
    message: "Deployed AI for all of their employees in weeks.",
    logoSrc: "/images/hero/proof-3.svg",
    logoAlt: "Luminus, Cambio, Zorgi, ODTH",
    logoIntrinsicWidth: 320,
    logoIntrinsicHeight: 26,
  },
];

function ProofItem({ item }: { item: ProofItemData }) {
  const width = Math.round(
    (item.logoIntrinsicWidth / item.logoIntrinsicHeight) * LOGO_HEIGHT_PX,
  );

  return (
    <div className="flex h-full shrink-0 items-center gap-5 border-r border-dashed border-border px-7 py-4">
      <p className="type-eyebrow whitespace-nowrap text-text/90">{item.message}</p>
      <Image
        src={item.logoSrc}
        alt={item.logoAlt}
        width={width}
        height={LOGO_HEIGHT_PX}
        className="block h-6 w-auto shrink-0"
        unoptimized
      />
    </div>
  );
}

export function HeroMarquee() {
  return (
    <div
      className="group/marquee relative w-full overflow-clip border-t border-dashed border-border bg-text/[0.06]"
      role="region"
      aria-label="Customer proof"
    >
      <div className="flex w-max animate-marquee items-stretch motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]">
        {PROOF_ITEMS.map((item, i) => (
          <ProofItem key={`a-${i}`} item={item} />
        ))}
        {PROOF_ITEMS.map((item, i) => (
          <ProofItem key={`b-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
