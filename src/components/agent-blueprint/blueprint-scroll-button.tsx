"use client";

import { Button } from "@/components/ui/button";

export const BLUEPRINT_INPUT_ID = "agent-blueprint-target";

/** Scrolls back to the hero form and focuses the website input. */
export function focusBlueprintInput() {
  const input = document.getElementById(BLUEPRINT_INPUT_ID);
  if (!(input instanceof HTMLInputElement)) return;
  input.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => input.focus({ preventScroll: true }), 350);
}

export function BlueprintScrollButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="button"
      className={className}
      data-track="blueprint_scroll_to_form"
      onClick={focusBlueprintInput}
    >
      {children}
    </Button>
  );
}
