import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { radius } from "@/lib/design-tokens";

export type SurfaceVariant = "card" | "panel" | "callout" | "pill";

const surfaceRadius: Record<SurfaceVariant, string> = {
  card: radius.sm,
  panel: radius.sm,
  callout: radius.xs,
  pill: radius.full,
};

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  children: React.ReactNode;
}

/** Rounded container using homepage radius tokens. */
export function Surface({
  variant = "card",
  className,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <div
      className={cn(
        surfaceRadius[variant],
        variant === "panel" && "relative overflow-hidden",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

interface WidePanelProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  sectionClassName?: string;
}

/** Full-bleed wide section with inner rounded-sm panel (stats / security pattern). */
export function WidePanel({
  children,
  className,
  innerClassName,
  sectionClassName,
}: WidePanelProps) {
  return (
    <Section wide className={sectionClassName}>
      <Surface variant="panel" className={cn(className, innerClassName)}>
        {children}
      </Surface>
    </Section>
  );
}
