"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";

const ITEMS = [
  "Assess AI readiness of your people",
  "Audit your tech stack for AI-accessibility",
  "Introduce AI agents in your processes",
  "Deploy a secure AI system connected to your data & tools",
  "Share AI agents with your team",
  "Level up your people",
  "Map processes across all agents",
  "Set security and guardrails",
  "Connect your AI to your tools",
];

const WINDOW = 5;
const CYCLE_MS = 2200;
const OPACITIES = [0.3, 0.65, 1, 0.65, 0.3] as const;

function CheckItem({
  text,
  featured = false,
  small = false,
}: {
  text: string;
  featured?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-border bg-white shadow-subtle",
        featured ? "px-4 py-3" : "px-3 py-2",
        small && "px-2.5 py-1.5",
      )}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-100">
        <CheckmarkIcon className="h-3 w-3 text-green-700" />
      </div>
      <span
        className={cn(
          "text-text leading-snug",
          featured ? "text-sm font-semibold" : "text-xs",
          small && "text-xs",
        )}
      >
        {text}
      </span>
    </div>
  );
}

export function CardFourVisual() {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const seed = window.setTimeout(() => {
      setMounted(true);
      if (reduced) return;
      const id = window.setInterval(() => {
        setOffset((o) => (o + 1) % ITEMS.length);
      }, CYCLE_MS);
      return () => window.clearInterval(id);
    }, 120);
    return () => window.clearTimeout(seed);
  }, [reduced]);

  const visibleItems = Array.from(
    { length: WINDOW },
    (_, i) => ITEMS[(offset + i) % ITEMS.length],
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ghost — left center */}
      <div
        className="absolute left-[-3%] top-[42%] w-[30%] -translate-y-1/2 opacity-40 blur-[2.5px]"
        aria-hidden
      >
        <CheckItem text={ITEMS[(offset + 5) % ITEMS.length]} small />
      </div>

      {/* Ghost — right top */}
      <div
        className="absolute right-[-3%] top-[18%] w-[30%] opacity-40 blur-[2.5px]"
        aria-hidden
      >
        <CheckItem text={ITEMS[(offset + 6) % ITEMS.length]} small />
      </div>

      {/* Ghost — right bottom */}
      <div
        className="absolute right-[-3%] top-[68%] w-[30%] opacity-40 blur-[2.5px]"
        aria-hidden
      >
        <CheckItem text={ITEMS[(offset + 7) % ITEMS.length]} small />
      </div>

      {/* Center column */}
      <div className="absolute inset-0 flex items-center justify-center px-[4%]">
        <div className="flex w-[62%] flex-col gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: OPACITIES[i], y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                <CheckItem text={text} featured={i === 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
