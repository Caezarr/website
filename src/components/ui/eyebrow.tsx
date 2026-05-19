import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Eyebrow({ children, className, ...rest }: EyebrowProps) {
  return (
    <span
      className={cn(
        "type-eyebrow border-x border-dashed border-border px-3 text-text",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
