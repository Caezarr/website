"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  play?: boolean;
  x?: number;
  y?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  play,
  x = 0,
  y = 0,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, x, y };
  const target = reduce ? undefined : { opacity: 1, x: 0, y: 0 };
  const animate = play === false ? initial : target;

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
