"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { trackWebsiteEvent, WEBSITE_EVENTS } from "@/lib/analytics";
import {
  bookingUrlParts,
  shouldInterceptBookingClick,
  type BookingLinks,
} from "@/lib/booking-modal";
import { getLocaleFromPathname } from "@/i18n/routes";
import { BookingModal } from "./booking-modal";

export type BookingCtaContext = {
  cta_context: string;
  cta_id?: string;
  placement: string;
  landing?: string;
  page_path: string;
  locale: string;
};

type OpenBookingOptions = {
  href: string;
  trigger?: HTMLElement | null;
  context?: Partial<BookingCtaContext>;
};

type BookingModalContextValue = {
  openBooking: (options: OpenBookingOptions) => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

/** Open the booking modal from a custom control (no-op outside the provider). */
export function useBookingModal(): BookingModalContextValue {
  return useContext(BookingModalContext) ?? { openBooking: () => {} };
}

function readCtaContext(anchor: HTMLAnchorElement, pathname: string) {
  const tracked = anchor.closest<HTMLElement>("[data-track]");
  return {
    cta_context: tracked?.dataset.meetingType || "general",
    cta_id: anchor.id || undefined,
    placement: anchor.closest<HTMLElement>("[id]")?.id || "unknown",
    landing: anchor.closest<HTMLElement>("[data-landing]")?.dataset.landing,
    page_path: pathname,
    locale: getLocaleFromPathname(pathname),
  } satisfies BookingCtaContext;
}

/**
 * Bookings links stay real `<a href>` (no-JS, middle-click and cmd-click open
 * Microsoft Bookings natively). Plain left-clicks open the qualification +
 * calendar modal instead. Add `data-booking-modal="off"` to opt a link out.
 */
export function BookingModalProvider({
  links,
  children,
}: {
  links: BookingLinks | null;
  children: React.ReactNode;
}) {
  const parent = useContext(BookingModalContext);
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<{
    id: number;
    href: string;
    context: BookingCtaContext;
  } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const sessionCounter = useRef(0);

  const openBooking = useCallback(
    ({ href, trigger, context }: OpenBookingOptions) => {
      const full: BookingCtaContext = {
        cta_context: "general",
        placement: "unknown",
        page_path: pathname,
        locale: getLocaleFromPathname(pathname),
        ...context,
      };
      triggerRef.current = trigger ?? null;
      sessionCounter.current += 1;
      setSession({ id: sessionCounter.current, href, context: full });
      setOpen(true);
      trackWebsiteEvent(WEBSITE_EVENTS.BOOKING_MODAL_OPENED, {
        ...full,
        destination_host: bookingUrlParts(href).host,
      });
    },
    [pathname],
  );

  useEffect(() => {
    if (parent) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || !shouldInterceptBookingClick(event, anchor)) return;
      event.preventDefault();
      openBooking({
        href: anchor.href,
        trigger: anchor,
        context: readCtaContext(anchor, pathname),
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openBooking, parent, pathname]);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  if (parent) return <>{children}</>;

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      {session ? (
        <BookingModal
          key={session.id}
          open={open}
          onOpenChange={setOpen}
          href={session.href}
          links={links}
          pathname={pathname}
          ctaContext={session.context}
          finalFocus={triggerRef}
        />
      ) : null}
    </BookingModalContext.Provider>
  );
}

