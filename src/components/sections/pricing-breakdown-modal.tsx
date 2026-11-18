"use client";

import { useEffect, useId, useState } from "react";
import {
  ControlField,
  SeatsControl,
} from "@/components/sections/pricing-seats-control";
import { SegmentedControl } from "@/components/sections/pricing-segmented-control";
import { calculateBreakdown } from "@/lib/pricing-calculator";
import {
  PLAN_ORDER,
  PLANS,
  PRICING_COPY,
  type Billing,
  type ModelAccess,
  type PlanId,
} from "@/lib/pricing.config";
import { formatEuro } from "@/lib/pricing-format";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const copy = PRICING_COPY.breakdown;

interface PricingBreakdownModalProps {
  open: boolean;
  onClose: () => void;
  seats: number;
  onSeatsChange: (seats: number) => void;
  billing: Billing;
  access: ModelAccess;
}

function bandLabel(from: number, to: number | null) {
  return to === null ? `${from.toLocaleString("en")}+` : `${from}-${to}`;
}

export function PricingBreakdownModal({
  open,
  onClose,
  seats,
  onSeatsChange,
  billing,
  access,
}: PricingBreakdownModalProps) {
  const titleId = useId();
  const [plan, setPlan] = useState<PlanId>("chat");
  const { rows, total } = calculateBreakdown(plan, seats, billing, access);
  const billingLabel =
    billing === "annual"
      ? PRICING_COPY.controls.annual
      : PRICING_COPY.controls.monthly;

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label={copy.closeAriaLabel}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        className={cn(
          radius.sm,
          "relative z-10 max-h-full w-full max-w-2xl overflow-y-auto border border-border bg-background p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12),_0_1px_1px_rgba(0,0,0,0.06)] md:p-10",
        )}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id={titleId} className="type-h6 text-text">
              {copy.title}
            </h2>
            <p className="mt-2 type-paragraph-m text-text/65">{copy.body}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="type-paragraph-s text-text/60 underline underline-offset-4 transition-colors hover:text-text"
          >
            {copy.close}
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <ControlField label={copy.planAriaLabel} className="items-start lg:items-start">
            <SegmentedControl<PlanId>
              label={copy.planAriaLabel}
              value={plan}
              onChange={setPlan}
              options={PLAN_ORDER.map((id) => ({ value: id, label: PLANS[id].name }))}
            />
          </ControlField>
          <SeatsControl
            seats={seats}
            onChange={onSeatsChange}
            className="items-start lg:items-start"
          />
        </div>
        <p className="mt-4 type-paragraph-s text-text/55">
          {copy.billingSummary(billingLabel)}
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[26rem] border-collapse text-left">
            <thead>
              <tr className="bg-surface-muted type-paragraph-s text-text/55">
                <th className="px-4 py-3 font-medium">{copy.bandColumn}</th>
                <th className="px-4 py-3 text-right font-medium">{copy.seatsColumn}</th>
                <th className="px-4 py-3 text-right font-medium">{copy.priceColumn}</th>
                <th className="px-4 py-3 text-right font-medium">{copy.subtotalColumn}</th>
              </tr>
            </thead>
            <tbody className="type-paragraph-m text-text">
              {rows.map((row) => (
                <tr
                  key={row.from}
                  className={cn(
                    "border-b border-dashed border-border",
                    row.seatsInBand === 0 && "text-text/40",
                  )}
                >
                  <td className="px-4 py-4 tabular-nums">
                    {access === "byok" ? copy.flatBand : bandLabel(row.from, row.to)}
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums">
                    {row.seatsInBand.toLocaleString("en")}
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums">
                    {formatEuro(row.pricePerSeat)}
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums">
                    {formatEuro(row.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="type-paragraph-m-bold text-text">
                <td className="px-4 py-4" colSpan={3}>
                  {copy.total}
                </td>
                <td className="px-4 py-4 text-right tabular-nums">
                  {formatEuro(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {access === "byok" ? (
          <p className="mt-4 type-paragraph-s text-text/55">{copy.byokNote}</p>
        ) : null}
      </div>
    </div>
  );
}
