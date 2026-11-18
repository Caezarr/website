"use client";

import { useId, useState } from "react";
import { SegmentedControl } from "@/components/sections/pricing-segmented-control";
import { clampSeats } from "@/lib/pricing-calculator";
import { PRICING_COPY, SEAT_PRESETS } from "@/lib/pricing.config";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export function ControlField({
  label,
  labelFor,
  className,
  children,
}: {
  label: string;
  labelFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const LabelTag = labelFor ? "label" : "p";
  return (
    <div className={cn("flex flex-col items-center gap-2 lg:items-start", className)}>
      <LabelTag
        {...(labelFor ? { htmlFor: labelFor } : {})}
        className="type-paragraph-s text-text/60"
      >
        {label}
      </LabelTag>
      {children}
    </div>
  );
}

export function SeatsControl({
  seats,
  onChange,
  className,
}: {
  seats: number;
  onChange: (seats: number) => void;
  className?: string;
}) {
  const inputId = useId();
  const [draft, setDraft] = useState(String(seats));
  const [prevSeats, setPrevSeats] = useState(seats);
  if (seats !== prevSeats) {
    setPrevSeats(seats);
    setDraft(String(seats));
  }

  return (
    <ControlField
      label={PRICING_COPY.controls.seats}
      labelFor={inputId}
      className={className}
    >
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={(event) => {
            const value = event.target.value;
            if (value !== "" && !/^\d+$/.test(value)) return;
            setDraft(value);
            if (value !== "") onChange(clampSeats(Number(value)));
          }}
          onBlur={() => setDraft(String(seats))}
          className={cn(
            radius.sm,
            "border-border bg-background type-paragraph-m text-text h-[2.375rem] w-20 border border-dashed px-2 text-center tabular-nums focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none",
          )}
        />
        <SegmentedControl<string>
          label={PRICING_COPY.controls.seats}
          value={String(seats)}
          options={SEAT_PRESETS.map((preset) => ({
            value: String(preset),
            label: String(preset),
          }))}
          onChange={(value) => onChange(Number(value))}
        />
      </div>
    </ControlField>
  );
}
