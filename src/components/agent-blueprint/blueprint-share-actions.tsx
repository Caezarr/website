"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  isTurnstileEnabled,
  TurnstileWidget,
} from "@/components/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { headingClass, radius } from "@/lib/design-tokens";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { blueprintText as t } from "@/lib/agent-blueprint-copy";
import {
  blueprintPdfPath,
  sharedBlueprintPath,
  uuidFromAssessmentId,
} from "@/lib/agent-blueprint-share";
import {
  getLeadAnalyticsContext,
  markLeadQualified,
  trackWebsiteEvent,
  WEBSITE_EVENTS,
} from "@/lib/analytics";
import { isLeadErrorCode, type LeadSource } from "@/lib/lead-capture";
import { cn } from "@/lib/utils";

const PDF_LEAD_SOURCE: LeadSource = "agent-blueprint-pdf";

export type BlueprintSurface = "owner" | "shared";

type ShareChannel = "copy" | "native" | "linkedin";

/** Clipboard API first; hidden-textarea fallback for older or locked-down browsers. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function startDownload(href: string, filename = "") {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/** File name from a Content-Disposition header, if any. */
function attachmentName(header: string | null): string {
  return header?.match(/filename="([^"]+)"/)?.[1] ?? "";
}

/**
 * Fetches the PDF first so a failed render shows an error instead of
 * downloading a JSON error body.
 */
async function downloadPdf(href: string): Promise<boolean> {
  const response = await fetch(href);
  if (!response.ok) return false;
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  startDownload(
    objectUrl,
    attachmentName(response.headers.get("Content-Disposition")),
  );
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  return true;
}

const subscribeNever = () => () => {};

function ShareLinks({ uuid, locale }: { uuid: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const [manualUrl, setManualUrl] = useState<string | null>(null);
  const manualInput = useRef<HTMLInputElement>(null);
  const canNativeShare = useSyncExternalStore(
    subscribeNever,
    () => typeof navigator.share === "function",
    () => false,
  );

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2_000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    manualInput.current?.select();
  }, [manualUrl]);

  const shareUrl = useCallback(
    () => `${window.location.origin}${sharedBlueprintPath(uuid, locale)}`,
    [locale, uuid],
  );

  const track = (channel: ShareChannel) =>
    trackWebsiteEvent(WEBSITE_EVENTS.BLUEPRINT_SHARED, { channel, locale });

  /** Copies the link, or shows it selected when the browser blocks the clipboard. */
  const copyLink = async () => {
    const url = shareUrl();
    if (await copyText(url)) {
      setManualUrl(null);
      setCopied(true);
      track("copy");
    } else {
      setManualUrl(url);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-track="blueprint_share_copy"
          onClick={copyLink}
        >
          {copied ? `✓ ${t(locale, "Link copied")}` : t(locale, "Copy link")}
        </Button>
        {canNativeShare ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-track="blueprint_share_native"
            onClick={async () => {
              try {
                await navigator.share({
                  title: t(locale, "Shared AI agent blueprint"),
                  url: shareUrl(),
                });
                track("native");
              } catch (error) {
                // Dismissing the share sheet is not a failure.
                if (error instanceof DOMException && error.name === "AbortError") {
                  return;
                }
                await copyLink();
              }
            }}
          >
            {t(locale, "Share")}
          </Button>
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-track="blueprint_share_linkedin"
          onClick={() => {
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl())}`,
              "_blank",
              "noopener,noreferrer,width=600,height=640",
            );
            track("linkedin");
          }}
        >
          {t(locale, "Share on LinkedIn")}
        </Button>
      </div>
      <p className="sr-only" role="status">
        {copied ? t(locale, "Link copied") : ""}
      </p>
      {manualUrl ? (
        <input
          ref={manualInput}
          type="text"
          readOnly
          value={manualUrl}
          aria-label={t(locale, "Link to share")}
          onFocus={(event) => event.currentTarget.select()}
          className={cn(
            "type-paragraph-s border-border bg-background text-text w-full min-w-0 border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none",
            radius.xs,
          )}
        />
      ) : null}
    </div>
  );
}

type PdfFormState = "idle" | "loading" | "success" | "error";

function PdfForm({
  uuid,
  locale,
  surface,
}: {
  uuid: string;
  locale: Locale;
  surface: BlueprintSurface;
}) {
  const formId = useId();
  const turnstileEnabled = isTurnstileEnabled();
  const leadT = getT(locale);
  const [state, setState] = useState<PdfFormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const started = useRef(false);
  const pdfHref = blueprintPdfPath(uuid);

  const fail = useCallback((message: string) => {
    setError(message);
    setState("error");
    setTurnstileToken(null);
    setTurnstileResetKey((key) => key + 1);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (turnstileEnabled && !turnstileToken) {
      setError(t(locale, "Please complete the verification check."));
      setState("error");
      return;
    }

    const form = event.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";

    setState("loading");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value("email"),
          firstName: value("firstName"),
          source: PDF_LEAD_SOURCE,
          blueprintId: uuid,
          website: value("website"),
          analytics: getLeadAnalyticsContext(),
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          code?: string;
        } | null;
        fail(
          isLeadErrorCode(data?.code)
            ? leadT(`leadForm.errors.${data.code}`)
            : leadT("leadForm.errors.generic"),
        );
        return;
      }

      const result = (await response.json().catch(() => null)) as {
        leadId?: string;
        lifecycleStage?: "lead" | "mql";
        leadScore?: number;
      } | null;
      if (result?.leadId) {
        markLeadQualified({
          lead_id: result.leadId,
          lifecycle_stage: result.lifecycleStage ?? "lead",
          lead_score: result.leadScore ?? 0,
          lead_source: PDF_LEAD_SOURCE,
        });
      }
      trackWebsiteEvent(WEBSITE_EVENTS.BLUEPRINT_PDF_REQUESTED, {
        locale,
        surface,
      });
      if (!(await downloadPdf(pdfHref))) {
        fail(leadT("leadForm.errors.generic"));
        return;
      }
      setState("success");
    } catch {
      fail(leadT("leadForm.errors.generic"));
    }
  }

  if (state === "success") {
    return (
      <p className="type-paragraph-m text-text/85" role="status">
        <span aria-hidden className="text-green-300">
          ✓{" "}
        </span>
        {t(locale, "Your PDF is downloading.")}{" "}
        <a
          href={pdfHref}
          download
          className="text-text underline underline-offset-4"
        >
          {t(locale, "Download again")}
        </a>
      </p>
    );
  }

  const inputClass = cn(
    "type-paragraph-m w-full min-w-0 border border-transparent bg-white px-3 py-2.5 text-black placeholder:text-black/40 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-60",
    radius.xs,
  );

  return (
    <form
      onSubmit={submit}
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        trackWebsiteEvent(WEBSITE_EVENTS.LEAD_STARTED, {
          lead_source: PDF_LEAD_SOURCE,
          surface,
        });
      }}
      className="flex flex-col gap-3"
    >
      <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
        <label htmlFor={`${formId}-email`} className="sr-only">
          {t(locale, "Work email")}
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t(locale, "you@company.com")}
          disabled={state === "loading"}
          className={inputClass}
        />
        <label htmlFor={`${formId}-first-name`} className="sr-only">
          {t(locale, "First name (optional)")}
        </label>
        <input
          id={`${formId}-first-name`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={100}
          placeholder={t(locale, "First name (optional)")}
          disabled={state === "loading"}
          className={inputClass}
        />
        <Button
          type="submit"
          disabled={state === "loading"}
          data-track="blueprint_pdf_submit"
          data-blueprint-cta={`${surface}_pdf_submit`}
          className="w-full shrink-0 lg:w-auto"
        >
          {state === "loading"
            ? t(locale, "Preparing…")
            : t(locale, "Get the PDF")}
        </Button>
      </div>

      <TurnstileWidget
        key={turnstileResetKey}
        onToken={setTurnstileToken}
        onExpire={() => setTurnstileToken(null)}
        onError={() => fail(leadT("leadForm.errors.verification_failed"))}
        language={locale}
      />

      <input
        tabIndex={-1}
        autoComplete="off"
        name="website"
        type="text"
        aria-hidden
        className="hidden"
      />

      {state === "error" && error ? (
        <p role="alert" className="type-paragraph-s text-orange-300">
          {error}
        </p>
      ) : null}
      <p className="type-paragraph-s text-text/55">
        {t(locale, "We may follow up by email about this blueprint. See our")}{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          {t(locale, "privacy policy")}
        </Link>
        .
      </p>
    </form>
  );
}

function PdfPreview() {
  return (
    <div aria-hidden className="relative w-16 shrink-0 md:w-28">
      <div
        className={cn(
          "absolute inset-0 translate-x-2 -translate-y-2 rotate-3 bg-blue-200/30",
          radius.xs,
        )}
      />
      <div
        className={cn(
          "relative flex aspect-[3/4] flex-col gap-1.5 bg-white p-2 shadow-lg md:gap-2 md:p-3",
          radius.xs,
        )}
      >
        <span className="h-1 w-1/2 rounded-full bg-blue-700 md:h-1.5" />
        <span className="h-0.5 w-full rounded-full bg-mid-gray/40 md:h-1" />
        <span className="h-0.5 w-4/5 rounded-full bg-mid-gray/40 md:h-1" />
        <span className="mt-1 grid grid-cols-3 gap-1">
          <span className="aspect-square rounded-xs bg-blue-100" />
          <span className="aspect-square rounded-xs bg-blue-100" />
          <span className="aspect-square rounded-xs bg-blue-100" />
        </span>
        <span className="h-0.5 w-full rounded-full bg-mid-gray/40 md:h-1" />
        <span className="h-0.5 w-3/5 rounded-full bg-mid-gray/40 md:h-1" />
        <span className="type-eyebrow absolute right-1 bottom-1 rounded-xs bg-blue-700 px-1 text-white md:right-2 md:bottom-2 md:px-1.5">
          PDF
        </span>
      </div>
    </div>
  );
}

/** Prominent email capture for the branded PDF, shown on owner and shared views. */
/** Anchor of the PDF card, targeted by the "PDF" shortcut in the hero panel. */
export const BLUEPRINT_PDF_CARD_ID = "blueprint-pdf";

export function BlueprintPdfCard({
  assessmentId,
  locale,
  surface,
}: {
  assessmentId: string;
  locale: Locale;
  surface: BlueprintSurface;
}) {
  const uuid = uuidFromAssessmentId(assessmentId);
  if (!uuid) return null;

  return (
    <Surface
      id={BLUEPRINT_PDF_CARD_ID}
      variant="panel"
      data-theme="dark"
      data-blueprint-surface={surface}
      className="text-text mt-6 scroll-mt-28 bg-blue-900 p-5 sm:p-6 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <div className="flex items-start gap-4 md:contents">
          <PdfPreview />
          <div className="min-w-0 md:hidden">
            <PdfCardHeading locale={locale} surface={surface} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="hidden md:block">
            <PdfCardHeading locale={locale} surface={surface} />
          </div>
          <div className="mt-5">
            <PdfForm uuid={uuid} locale={locale} surface={surface} />
          </div>
        </div>
      </div>
    </Surface>
  );
}

function PdfCardHeading({
  locale,
  surface,
}: {
  locale: Locale;
  surface: BlueprintSurface;
}) {
  return (
    <>
      <span className="type-eyebrow text-blue-300">
        {t(locale, "Free PDF")}
      </span>
      <h3 className={cn(headingClass.subsection, "mt-2 text-balance")}>
        {t(
          locale,
          surface === "shared"
            ? "Get this blueprint as a PDF"
            : "Get your blueprint as a PDF",
        )}
      </h3>
      <p className="type-paragraph-m text-text/75 mt-2 max-w-2xl">
        {t(
          locale,
          "Every agent, workflow and time saving in one branded PDF, ready to forward to your manager or leadership team.",
        )}
      </p>
    </>
  );
}

/** Secondary share row, owner view only. */
export function BlueprintShareRow({
  assessmentId,
  locale,
}: {
  assessmentId: string;
  locale: Locale;
}) {
  const uuid = uuidFromAssessmentId(assessmentId);
  if (!uuid) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
      <div className="min-w-0">
        <p className="type-paragraph-m-bold">
          {t(locale, "Share this blueprint")}
        </p>
        <p className="type-paragraph-s text-text/55 mt-1 max-w-xl">
          {t(
            locale,
            "Send it to a colleague or your manager. The link shows the same anonymous blueprint, never your company name.",
          )}
        </p>
      </div>
      <div className="md:shrink-0">
        <ShareLinks uuid={uuid} locale={locale} />
      </div>
    </div>
  );
}
