import { cn } from "@/lib/utils";

const TRAPEZOID_PATH =
  "M0.444336 4C0.444571 1.91137 2.23602 0.273112 4.31641 0.458984L430.316 38.5332C432.15 38.6971 433.556 40.2341 433.556 42.0752V433.179C433.556 435.02 432.15 436.557 430.316 436.721L4.31641 474.795C2.23602 474.981 0.444571 473.343 0.444336 471.254V4Z";

interface TiltCardProps {
  variant?: "trapezoid" | "rectangle";
  mirror?: boolean;
  fillClassName?: string;
  strokeClassName?: string;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

export function TiltCard({
  variant = "trapezoid",
  mirror = false,
  fillClassName,
  strokeClassName,
  className,
  contentClassName,
  children,
}: TiltCardProps) {
  return (
    <div className={cn("relative aspect-[434/476] [container-type:inline-size]", className)}>
      {variant === "trapezoid" ? (
        <svg
          viewBox="0 0 434 476"
          aria-hidden
          className={cn(
            "absolute inset-0 size-full",
            mirror && "-scale-x-100",
          )}
        >
          <path
            d={TRAPEZOID_PATH}
            className={cn(fillClassName, strokeClassName)}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-[0.25rem] border border-border",
            fillClassName,
          )}
        />
      )}
      {children ? (
        <div className={cn("relative size-full", contentClassName)}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
