"use client";

import { useEffect, useId, useState } from "react";
import { getPricingTierCatalog } from "@/lib/pricing-calculator";
import { formatEuro } from "@/lib/pricing-format";
import { useT, useUiLocale } from "@/i18n/use-t";
import { INTL_LOCALE } from "@/i18n/ui";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const TOGGLE_GRADIENT =
  "radial-gradient(ellipse 70% 110% at 65% 115%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)";

interface PricingBreakdownModalProps {
  open: boolean;
  onClose: () => void;
}

function BillingCycleToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (annual: boolean) => void;
}) {
  const t = useT();
  return (
    <div
      role="group"
      aria-label={t("pricing.billing.ariaLabel")}
      className={cn(radius.full, "inline-flex bg-light-gray p-1")}
    >
      <button
        type="button"
        aria-pressed={!annual}
        onClick={() => onChange(false)}
        className={cn(
          radius.full,
          "px-4 py-1.5 type-paragraph-m transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          !annual ? "bg-white text-text shadow-subtle" : "text-text/60",
        )}
      >
        {t("pricing.billing.monthly")}
      </button>
      <button
        type="button"
        aria-pressed={annual}
        onClick={() => onChange(true)}
        className={cn(
          radius.full,
          "flex items-center gap-1.5 px-3 py-1.5 type-paragraph-m transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          annual ? "bg-white text-text shadow-subtle" : "text-text/60",
        )}
      >
        {t("pricing.billing.annual")}
        <span
          className={cn(
            radius.full,
            "type-paragraph-s bg-blue-100 px-1.5 py-0.5 text-blue-700",
          )}
        >
          {t("pricing.billing.save")}
        </span>
      </button>
    </div>
  );
}

function AiModelsToggle({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const t = useT();
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <span id={`${id}-label`} className="type-paragraph-m-bold text-text">
          {t("pricing.breakdown.aiModels")}
        </span>
        <span
          className="inline-flex size-4 items-center justify-center rounded-full border border-border type-paragraph-s text-text/45"
          title={t("pricing.breakdown.aiModelsTooltip")}
          aria-hidden
        >
          i
        </span>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-light-gray transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      >
        {checked ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-blue-400"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ background: TOGGLE_GRADIENT }}
            />
          </>
        ) : null}
        <span
          aria-hidden
          className={cn(
            "relative inline-block size-4 rounded-full bg-white shadow-subtle transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
      <span className="type-paragraph-m text-text/70">
        {checked
          ? t("pricing.breakdown.included")
          : t("pricing.breakdown.notIncluded")}
      </span>
    </div>
  );
}

export function PricingBreakdownModal({
  open,
  onClose,
}: PricingBreakdownModalProps) {
  const t = useT();
  const locale = useUiLocale();
  const titleId = useId();
  const aiModelsToggleId = useId();
  const [annual, setAnnual] = useState(true);
  const [aiModelsIncluded, setAiModelsIncluded] = useState(true);
  const rows = getPricingTierCatalog(annual, aiModelsIncluded);

  // Reset toggles each time the modal opens (render-time adjustment, no effect).
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setAnnual(true);
      setAiModelsIncluded(true);
    }
  }

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
        aria-label={t("pricing.breakdown.closeAriaLabel")}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        className={cn(
          radius.sm,
          "relative z-10 w-full max-w-xl border border-border bg-background p-8 shadow-[0_4px_24px_rgba(0,0,0,0.12),_0_1px_1px_rgba(0,0,0,0.06)] md:p-10",
        )}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id={titleId} className="type-h6 text-text">
              {t("pricing.breakdown.title")}
            </h2>
            <p className="mt-2 type-paragraph-m text-text/65">
              {t("pricing.breakdown.body")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="type-paragraph-s text-text/60 underline underline-offset-4 transition-colors hover:text-text"
          >
            {t("pricing.breakdown.close")}
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <AiModelsToggle
            id={aiModelsToggleId}
            checked={aiModelsIncluded}
            onChange={setAiModelsIncluded}
          />
          <BillingCycleToggle annual={annual} onChange={setAnnual} />
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[20rem] border-collapse text-left">
            <thead>
              <tr className="bg-light-gray type-paragraph-s text-text/55">
                <th className="px-4 py-3 font-medium" />
                <th className="px-4 py-3 font-medium">
                  {t("pricing.breakdown.seatsColumn")}
                </th>
                <th className="px-4 py-3 font-medium">
                  {t("pricing.breakdown.priceColumn")}
                </th>
              </tr>
            </thead>
            <tbody className="type-paragraph-m text-text">
              {rows.map((row) => (
                <tr
                  key={row.labelKey + String(row.tierSeats)}
                  className="border-b border-dashed border-border"
                >
                  <td className="px-4 py-4">
                    {t(`pricing.breakdown.${row.labelKey}`)}
                  </td>
                  <td className="px-4 py-4 tabular-nums">
                    {typeof row.tierSeats === "number"
                      ? row.tierSeats.toLocaleString(INTL_LOCALE[locale])
                      : row.tierSeats}
                  </td>
                  <td className="px-4 py-4 tabular-nums">
                    {formatEuro(row.ratePerSeat, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
