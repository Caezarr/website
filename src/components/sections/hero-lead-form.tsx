"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { radius } from "@/lib/design-tokens";
import { LEAD_FORM_COPY, type LeadSource } from "@/lib/lead-capture";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

interface HeroLeadFormProps {
  source: LeadSource;
  theme?: "dark" | "light";
}

export function HeroLeadForm({ source, theme = "dark" }: HeroLeadFormProps) {
  const formId = useId();
  const emailId = `${formId}-email`;
  const copy = LEAD_FORM_COPY[source];
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDark = theme === "dark";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p
        className={cn(
          "type-paragraph-m",
          isDark ? "text-white/90" : "text-text/80",
        )}
      >
        {copy.successMessage}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col items-stretch gap-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          disabled={state === "loading"}
          className={cn(
            "min-w-0 flex-1 border px-4 py-3 type-paragraph-m focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60",
            radius.sm,
            isDark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/50"
              : "border-border bg-background text-text placeholder:text-text/40",
          )}
        />
        <Button type="submit" variant="primary" disabled={state === "loading"}>
          {state === "loading" ? "Sending…" : copy.submitLabel}
        </Button>
      </div>

      <input
        tabIndex={-1}
        autoComplete="off"
        name="website"
        type="text"
        aria-hidden
        className="hidden"
      />

      {state === "error" && errorMessage ? (
        <p className={cn("type-paragraph-s", isDark ? "text-white/80" : "text-text/70")}>
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
