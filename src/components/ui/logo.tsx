import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("block h-[1.1875rem] w-[5.375rem] shrink-0 bg-current [mask:url('/wonka-logo.svg')_center/contain_no-repeat]", className)}
      aria-hidden
    />
  );
}
