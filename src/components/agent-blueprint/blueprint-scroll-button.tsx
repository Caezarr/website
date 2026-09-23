"use client";

export const BLUEPRINT_INPUT_ID = "agent-blueprint-target";

/** Scrolls back to the hero form and focuses the website input. */
export function focusBlueprintInput() {
  const input = document.getElementById(BLUEPRINT_INPUT_ID);
  if (!(input instanceof HTMLInputElement)) return;
  input.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => input.focus({ preventScroll: true }), 350);
}
