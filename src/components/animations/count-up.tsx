"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  play?: boolean;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  play,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!play || !ref.current) return;
    const el = ref.current;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [play, from, to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${from}${suffix}`}
    </span>
  );
}
