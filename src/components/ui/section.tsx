import { cn } from "@/lib/utils";

type SectionTag = "section" | "header" | "footer" | "main" | "div" | "nav" | "aside";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: SectionTag;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fluid?: boolean;
  wide?: boolean;
}

export function Section({
  as: Tag = "section",
  children,
  className,
  containerClassName,
  fluid = false,
  wide = false,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        wide ? "px-2" : "px-6 md:px-8 lg:px-12",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto w-full",
          !fluid && (wide ? "max-w-[89rem]" : "max-w-[84rem]"),
          containerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
