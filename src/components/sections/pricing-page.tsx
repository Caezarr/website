"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { PricingBreakdownModal } from "@/components/sections/pricing-breakdown-modal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { calculatePricing } from "@/lib/pricing-calculator";
import { formatEuro } from "@/lib/pricing-format";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const MIN_SEATS = 1;
const MAX_SEATS = 1000;
const EXPERT_SEAT_LIST_MONTHLY = 97;
const SEAT_PRESETS = [25, 100, 250] as const;

function clampSeats(value: number) {
  if (!Number.isFinite(value)) return MIN_SEATS;
  return Math.min(MAX_SEATS, Math.max(MIN_SEATS, Math.round(value)));
}

const TOGGLE_GRADIENT =
  "radial-gradient(ellipse 70% 110% at 65% 115%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)";

const priceAmountClass =
  "font-sans text-[1.875rem] leading-none md:text-[2.125rem] lg:text-[2.375rem]";

const pricingCtaClassName =
  "h-[2.6875rem] min-w-[9.5rem] px-[1.125rem] type-paragraph-m-bold";

interface PricingPageProps {
  bookingHref: string;
}

function PriceDisplay({
  amount,
  className,
  inverted = false,
}: {
  amount: number;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <p
      className={cn(
        priceAmountClass,
        "tabular-nums",
        inverted ? "text-white" : "text-text",
        className,
      )}
    >
      {formatEuro(amount)}
    </p>
  );
}

function PricingTierBlock({
  amount,
  seatLabel,
  billingNote,
  description,
  inverted = false,
}: {
  amount: number;
  seatLabel: string;
  billingNote: string;
  description?: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <PriceDisplay amount={amount} inverted={inverted} />
      <p
        className={cn(
          "type-paragraph-m-bold",
          inverted ? "text-white" : "text-text",
        )}
      >
        {seatLabel}
      </p>
      {description ? (
        <p
          className={cn(
            "type-paragraph-m",
            inverted ? "text-white/70" : "text-text/70",
          )}
        >
          {description}
        </p>
      ) : null}
      <p
        className={cn(
          "type-paragraph-m",
          inverted ? "text-white/70" : "text-text/70",
        )}
      >
        {billingNote}
      </p>
    </div>
  );
}

function PricingOrDivider({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="relative mb-3 py-3">
      <div
        className={cn(
          "border-t border-dashed",
          inverted ? "border-white/25" : "border-border",
        )}
      />
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 type-paragraph-s",
          inverted
            ? "bg-blue-400 text-white/70"
            : "bg-background text-text/60",
        )}
      >
        or
      </span>
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="type-paragraph-m text-text/70"
      >
        {label}
      </label>
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
    </div>
  );
}

function SeatPresetButtons({
  seats,
  onSelect,
}: {
  seats: number;
  onSelect: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {SEAT_PRESETS.map((preset) => {
        const selected = seats === preset;

        return (
          <button
            key={preset}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(preset)}
            className={cn(
              radius.full,
              "min-w-[2.25rem] px-2 py-1 type-paragraph-s tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
              selected
                ? "bg-text text-white"
                : "bg-light-gray text-text/60 hover:text-text",
            )}
          >
            {preset}
          </button>
        );
      })}
    </div>
  );
}

function BillingCycleToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (annual: boolean) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className={cn(radius.full, "inline-flex bg-light-gray p-1")}
    >
      <button
        type="button"
        aria-pressed={!annual}
        onClick={() => onChange(false)}
        className={cn(
          radius.full,
          "px-4 py-1.5 type-paragraph-m transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          !annual
            ? "bg-white text-text shadow-subtle"
            : "text-text/60",
        )}
      >
        Monthly
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
        Annual
        <span
          className={cn(
            radius.full,
            "type-paragraph-s bg-blue-100 px-1.5 py-0.5 text-blue-700",
          )}
        >
          Save 20%
        </span>
      </button>
    </div>
  );
}

function PricingFeatureList({
  items,
  inverted = false,
}: {
  items: string[];
  inverted?: boolean;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              inverted ? "bg-white/15 text-white" : "bg-blue-100 text-blue-700",
            )}
          >
            <svg
              className="size-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="m2.25 6.25 2.25 2.25 5.25-5.25" />
            </svg>
          </span>
          <span
            className={cn(
              "type-paragraph-m",
              inverted ? "text-white/85" : "text-text/80",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PricingCard({
  title,
  badge,
  children,
  className,
  emphasized = false,
  inverted = false,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  emphasized?: boolean;
  inverted?: boolean;
}) {
  return (
    <Surface
      variant="card"
      className={cn(
        "flex h-full flex-col p-6",
        emphasized &&
          "border border-blue-400 bg-blue-400 text-white",
        inverted && "border border-black bg-black text-white",
        !emphasized &&
          !inverted &&
          "border border-dashed border-border bg-background",
        className,
      )}
    >
      <div className="flex min-h-6 items-center justify-between gap-3">
        <h2
          className={cn(
            "type-paragraph-m-bold",
            emphasized || inverted ? "text-white" : "text-text",
          )}
        >
          {title}
        </h2>
        {badge ? (
          <span
            className={cn(
              radius.full,
              "type-eyebrow px-2.5 py-1",
              emphasized || inverted
                ? "bg-white/15 text-white"
                : "bg-blue-100 text-blue-700",
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-1 flex-col gap-4">{children}</div>
    </Surface>
  );
}

export function PricingPage({ bookingHref }: PricingPageProps) {
  const seatsInputId = useId();
  const aiModelsToggleId = useId();
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [seats, setSeats] = useState(MIN_SEATS);
  const [seatsInput, setSeatsInput] = useState(String(MIN_SEATS));
  const [annual, setAnnual] = useState(true);
  const [aiModelsIncluded, setAiModelsIncluded] = useState(true);

  const pricing = calculatePricing(seats, annual, aiModelsIncluded);
  const expertPerSeatMonth = annual
    ? EXPERT_SEAT_LIST_MONTHLY * 0.8
    : EXPERT_SEAT_LIST_MONTHLY;

  const includedItems = aiModelsIncluded
    ? [
        "Secure AI chat grounded in company knowledge",
        "Approved tools and data connections",
        "Governance and audit logs",
        "EU-hosted AI models with usage included",
      ]
    : [
        "Secure AI chat grounded in company knowledge",
        "Approved tools and data connections",
        "Governance and audit logs",
        "Your own model API key and provider billing",
      ];

  return (
    <Section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          align="center"
          heading="One workspace. Pricing that scales with your team."
          body="Choose your team size and usage level. Every paid seat includes the controls needed to use AI safely at work."
          headingAs="h1"
          headingRole="hero"
        />
      </div>

      <Surface
        variant="card"
        className="mx-auto mt-10 max-w-5xl border border-dashed border-border bg-white p-6"
      >
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 md:justify-start">
          <p className="type-paragraph-m-bold text-text">Build your plan</p>
          <button
            type="button"
            onClick={() => setBreakdownOpen(true)}
            className="type-paragraph-m text-text/60 underline underline-offset-4 transition-colors hover:text-text"
          >
            View pricing breakdown
          </button>
        </div>
        <div className="mt-5 flex flex-col items-center gap-6 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-6">
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 md:justify-start">
              <label
                htmlFor={seatsInputId}
                className="type-paragraph-m text-text/70"
              >
                Seats
              </label>
              <input
                id={seatsInputId}
                type="text"
                inputMode="numeric"
                value={seatsInput}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value !== "" && !/^\d+$/.test(value)) return;

                  setSeatsInput(value);
                  if (value !== "") {
                    setSeats(clampSeats(Number(value)));
                  }
                }}
                onBlur={() => {
                  if (seatsInput === "") {
                    setSeats(MIN_SEATS);
                    setSeatsInput(String(MIN_SEATS));
                    return;
                  }

                  const parsed = clampSeats(Number(seatsInput));
                  setSeats(parsed);
                  setSeatsInput(String(parsed));
                }}
                className={cn(
                  radius.sm,
                  "w-24 border border-dashed border-border bg-background px-2 py-1.5 text-center type-paragraph-m tabular-nums text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                )}
              />
              <SeatPresetButtons
                seats={seats}
                onSelect={(value) => {
                  const next = clampSeats(value);
                  setSeats(next);
                  setSeatsInput(String(next));
                }}
              />
            </div>

          <div className="flex shrink-0 justify-center lg:justify-start">
              <BillingCycleToggle annual={annual} onChange={setAnnual} />
            </div>

            <div className="flex shrink-0 justify-center lg:justify-start">
              <Toggle
              id={aiModelsToggleId}
              label="AI models included"
              checked={aiModelsIncluded}
              onChange={setAiModelsIncluded}
              />
            </div>
        </div>
      </Surface>

      <PricingBreakdownModal
        open={breakdownOpen}
        onClose={() => setBreakdownOpen(false)}
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <PricingCard
          title="Free trial"
          badge="7 days"
          className="order-1 bg-light-gray"
        >
          <p className={cn(priceAmountClass, "text-text")}>Free</p>
          <p className="type-paragraph-m text-text/70">
            Test Wonka with a real company use case. No credit card required.
          </p>
          <div className="mt-4 border-t border-dashed border-border pt-5">
            <p className="type-eyebrow text-text/55">
              Included in your trial
            </p>
            <div className="mt-4">
              <PricingFeatureList
                items={[
                  "Full AI Workspace access",
                  "Secure AI chat with company knowledge",
                  "€5 in included AI usage",
                ]}
              />
            </div>
          </div>
          <div className="mt-auto flex justify-start pt-6">
            <ButtonLink
              href={bookingHref}
              variant="secondary"
              className={pricingCtaClassName}
            >
              Get started
            </ButtonLink>
          </div>
        </PricingCard>

        <PricingCard
          title="AI Workspace"
          badge="Recommended"
          emphasized
          className="order-2"
        >
          <div className="flex flex-col gap-3">
            <PricingTierBlock
              amount={pricing.perSeatMonth}
              seatLabel="Standard seat"
              billingNote="Per user / month (excl. VAT)"
              inverted
            />

            <div
              className={cn(
                "transition-opacity",
                !aiModelsIncluded && "pointer-events-none opacity-40",
              )}
              aria-hidden={!aiModelsIncluded}
            >
              <PricingOrDivider inverted />

              <PricingTierBlock
                amount={expertPerSeatMonth}
                seatLabel="Expert seat"
                billingNote="Per user / month (excl. VAT)"
                inverted
                description={
                  <>5× more included model usage than Standard.</>
                }
              />
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-white/25 pt-5">
            <p className="type-eyebrow text-white/65">
              Everything your team needs
            </p>
            <div className="mt-4">
              <PricingFeatureList items={includedItems} inverted />
            </div>
          </div>

          <div className="mt-auto flex justify-start pt-6">
            <ButtonLink
              href={bookingHref}
              variant="secondary"
              className={pricingCtaClassName}
            >
              Get started
            </ButtonLink>
          </div>
        </PricingCard>

        <PricingCard
          title="Enterprise"
          badge="1,000+ seats"
          inverted
          className="order-3"
        >
          <p className={cn(priceAmountClass, "text-white")}>Custom</p>
          <p className="type-paragraph-m text-white/70">
            Dedicated infrastructure and deployment for complex organisations.
          </p>
          <div className="mt-4 border-t border-dashed border-white/25 pt-5">
            <p className="type-eyebrow text-white/65">
              Built for your environment
            </p>
            <div className="mt-4">
              <PricingFeatureList
                inverted
                items={[
                  "Everything in AI Workspace",
                  "Managed cloud, own cloud, or on-premise",
                  "Deployment tailored to security requirements",
                  "Volume pricing for large teams",
                ]}
              />
            </div>
          </div>
          <div className="mt-auto flex justify-start pt-6">
            <ButtonLink
              href={bookingHref}
              variant="secondary"
              className={pricingCtaClassName}
            >
              Talk to sales
            </ButtonLink>
          </div>
        </PricingCard>
      </div>
    </Section>
  );
}
