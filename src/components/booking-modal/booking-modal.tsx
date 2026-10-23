"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ButtonLink } from "@/components/ui/button";
import { useT } from "@/i18n/use-t";
import {
  getLeadAnalyticsContext,
  trackWebsiteEvent,
  WEBSITE_EVENTS,
} from "@/lib/analytics";
import {
  BOOKING_COMPANY_SIZES,
  BOOKING_MODAL_OPT_OUT_ATTRIBUTE,
  BOOKING_NEEDS,
  bookingUrlParts,
  identifyBookingCalendar,
  resolveBookingModalUrl,
  type BookingCompanySize,
  type BookingLinks,
  type BookingNeed,
} from "@/lib/booking-modal";
import { radius } from "@/lib/design-tokens";
import { qualifyBookingAnswers } from "@/lib/lead-qualification";
import { isBookingUrl } from "@/lib/resolve-meeting-url";
import { cn } from "@/lib/utils";
import type { BookingCtaContext } from "./booking-modal-provider";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2";

type Step = "qualify" | "calendar";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  href: string;
  links: BookingLinks | null;
  pathname: string;
  ctaContext: BookingCtaContext;
  finalFocus: RefObject<HTMLElement | null>;
}

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  renderLabel,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  renderLabel: (option: T) => string;
}) {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId} className="flex flex-col gap-3">
      <p id={labelId} className="type-paragraph-m-bold text-text">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cn(
                radius.full,
                FOCUS_RING,
                "border px-4 py-2 text-left type-paragraph-m transition-colors duration-[var(--ds-motion-duration-fast)]",
                selected
                  ? "border-accent bg-accent text-white"
                  : "border-border/30 bg-background text-text hover:border-border",
              )}
            >
              {renderLabel(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingModal({
  open,
  onOpenChange,
  href,
  links,
  pathname,
  ctaContext,
  finalFocus,
}: BookingModalProps) {
  const t = useT();
  const [step, setStep] = useState<Step>("qualify");
  const [companySize, setCompanySize] = useState<BookingCompanySize | null>(null);
  const [need, setNeed] = useState<BookingNeed | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);

  const bookingUrl = resolveBookingModalUrl({ href, pathname, links, need });
  const calendar = identifyBookingCalendar({ url: bookingUrl, pathname, links });

  const bookingProperties = (
    size: BookingCompanySize | null,
    mainNeed: BookingNeed | null,
  ) => {
    const resolved = resolveBookingModalUrl({ href, pathname, links, need: mainNeed });
    const qualification = qualifyBookingAnswers(
      { companySize: size, need: mainNeed },
      getLeadAnalyticsContext(),
    );
    const { host, path } = bookingUrlParts(resolved);
    return {
      url: resolved,
      properties: {
        ...ctaContext,
        company_size: size ?? undefined,
        main_need: mainNeed ?? undefined,
        lead_score: qualification.score,
        lifecycle_stage: qualification.lifecycleStage,
        lead_signals: qualification.signals,
        booking_calendar: identifyBookingCalendar({ url: resolved, pathname, links }),
        booking_host: host,
        booking_path: path,
        calendar_rerouted: resolved !== resolveBookingModalUrl({ href, pathname, links }),
      },
    };
  };

  /** Runs inside the click handler so the browser treats it as a user gesture. */
  const openCalendar = (size: BookingCompanySize | null, mainNeed: BookingNeed | null) => {
    const { url, properties } = bookingProperties(size, mainNeed);
    // Only ever open an allowlisted https Bookings URL.
    const popup = isBookingUrl(url) ? window.open(url, "_blank") : null;
    if (popup) popup.opener = null;
    trackWebsiteEvent(WEBSITE_EVENTS.BOOKING_CALENDAR_OPENED, {
      ...properties,
      popup_blocked: !popup,
    });
    setPopupBlocked(!popup);
    setStep("calendar");
  };

  const submitAnswers = (size: BookingCompanySize, mainNeed: BookingNeed) => {
    trackWebsiteEvent(
      WEBSITE_EVENTS.BOOKING_QUALIFIED,
      bookingProperties(size, mainNeed).properties,
    );
    openCalendar(size, mainNeed);
  };

  const selectSize = (size: BookingCompanySize) => {
    setCompanySize(size);
    if (need) submitAnswers(size, need);
  };

  const selectNeed = (mainNeed: BookingNeed) => {
    setNeed(mainNeed);
    if (companySize) submitAnswers(companySize, mainNeed);
  };

  const skip = () => {
    trackWebsiteEvent(
      WEBSITE_EVENTS.BOOKING_QUALIFICATION_SKIPPED,
      bookingProperties(companySize, need).properties,
    );
    openCalendar(companySize, need);
  };

  useEffect(() => {
    if (step === "calendar") confirmationHeadingRef.current?.focus();
  }, [step]);

  const fallbackLink = (reason: "direct_link" | "popup_blocked" | "reopen") => ({
    href: bookingUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    [BOOKING_MODAL_OPT_OUT_ATTRIBUTE]: "off",
    onClick: () => {
      trackWebsiteEvent(WEBSITE_EVENTS.BOOKING_FALLBACK_OPENED, {
        ...bookingProperties(companySize, need).properties,
        reason,
      });
      if (reason === "direct_link") {
        setPopupBlocked(false);
        setStep("calendar");
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[150] bg-black/60 transition-opacity duration-[var(--ds-motion-duration-normal)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          finalFocus={finalFocus}
          className={cn(
            "fixed inset-0 z-[151] flex flex-col overflow-hidden bg-background text-text",
            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[90dvh] sm:w-[calc(100%-2rem)] sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:border sm:border-border sm:shadow-subtle-hover",
            "sm:rounded-sm",
            "transition-opacity duration-[var(--ds-motion-duration-normal)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none",
          )}
        >
          <div className="flex items-center justify-between gap-4 border-b border-dashed border-border px-5 py-4 md:px-8">
            <p className="type-eyebrow text-text/60">
              {t("booking.step", { current: step === "qualify" ? 1 : 2, total: 2 })}
            </p>
            <Dialog.Close
              className={cn(
                FOCUS_RING,
                "type-paragraph-s text-text/60 underline underline-offset-4 transition-colors hover:text-text",
              )}
            >
              {t("booking.close")}
            </Dialog.Close>
          </div>

          {step === "qualify" ? (
            <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
              <div>
                <Dialog.Title className="type-h6 text-text">
                  {t("booking.qualify.title")}
                </Dialog.Title>
                <Dialog.Description className="mt-2 type-paragraph-m text-text/65">
                  {t("booking.qualify.body")}
                </Dialog.Description>
              </div>

              <ChipGroup
                label={`${t("booking.qualify.sizeLabel")} (${t("booking.qualify.sizeUnit")})`}
                options={BOOKING_COMPANY_SIZES}
                value={companySize}
                onChange={selectSize}
                renderLabel={(size) => t(`booking.sizes.${size}`)}
              />
              <ChipGroup
                label={t("booking.qualify.needLabel")}
                options={BOOKING_NEEDS}
                value={need}
                onChange={selectNeed}
                renderLabel={(option) => t(`booking.needs.${option}`)}
              />

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={skip}
                  className={cn(
                    FOCUS_RING,
                    "type-paragraph-m text-text/70 underline underline-offset-4 transition-colors hover:text-text",
                  )}
                >
                  {t("booking.qualify.skip")}
                </button>
                <ButtonLink variant="underline" {...fallbackLink("direct_link")}>
                  {t("booking.calendar.openInNewTab")}
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
              <div>
                <Dialog.Title
                  ref={confirmationHeadingRef}
                  tabIndex={-1}
                  className="type-h6 text-text outline-none"
                >
                  {t("booking.calendar.title")}
                </Dialog.Title>
                <Dialog.Description className="mt-2 type-paragraph-m text-text/65">
                  {t("booking.calendar.body", {
                    calendar: t(`booking.calendar.calendars.${calendar}`),
                  })}
                </Dialog.Description>
                {popupBlocked ? (
                  <p role="status" className="mt-4 type-paragraph-m text-text">
                    {t("booking.calendar.blocked")}
                  </p>
                ) : null}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-6 pt-2">
                <ButtonLink
                  variant="primary"
                  {...fallbackLink(popupBlocked ? "popup_blocked" : "reopen")}
                >
                  {t("booking.calendar.openCalendar")}
                </ButtonLink>
                <Dialog.Close
                  className={cn(
                    FOCUS_RING,
                    "type-paragraph-m text-text/70 underline underline-offset-4 transition-colors hover:text-text",
                  )}
                >
                  {t("booking.calendar.close")}
                </Dialog.Close>
              </div>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

