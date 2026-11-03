import { describe, expect, it } from "vitest";
import {
  BOOKING_NEEDS,
  identifyBookingCalendar,
  resolveBookingModalUrl,
  shouldInterceptBookingClick,
  type BookingClickEvent,
  type BookingLinks,
} from "@/lib/booking-modal";
import { qualifyBookingAnswers } from "@/lib/lead-qualification";
import { DEFAULT_MEETING_URLS } from "@/lib/shared-links-defaults";
import { isBookingUrl } from "@/lib/resolve-meeting-url";

const SANITY_LINKS: BookingLinks = {
  meetingUrl: "https://outlook.office.com/book/Custom@meetwonka.com/",
  startAiMeetingUrl: "https://outlook.office.com/book/CustomStartAI@meetwonka.com/",
  wonkaBuildMeetingUrl: null,
  wonkaChatMeetingUrl: "https://outlook.office.com/book/CustomChat@meetwonka.com/",
  franceMeetingUrl: "https://bookings.cloud.microsoft/book/CustomFrance@meetwonka.com/",
};

const FRENCH_PATHS = ["/fr", "/fr/start-ai", "/fr/lp/odoo", "/france", "/france/btp"];
const NON_FRENCH_PATHS = ["/", "/start-ai", "/nl/workspace", "/blog/some-post"];

describe("resolveBookingModalUrl", () => {
  it("keeps the HQ team calendar on an EN page without answers", () => {
    expect(
      resolveBookingModalUrl({ href: DEFAULT_MEETING_URLS.team, pathname: "/" }),
    ).toBe(DEFAULT_MEETING_URLS.team);
  });

  it("keeps a product calendar on its page whatever the answer", () => {
    for (const need of BOOKING_NEEDS) {
      expect(
        resolveBookingModalUrl({
          href: DEFAULT_MEETING_URLS.startAi,
          pathname: "/start-ai",
          need,
        }),
      ).toBe(DEFAULT_MEETING_URLS.startAi);
    }
  });

  it("routes the general calendar by main need outside France", () => {
    const href = DEFAULT_MEETING_URLS.team;
    expect(resolveBookingModalUrl({ href, pathname: "/", need: "workspace" })).toBe(
      DEFAULT_MEETING_URLS.wonkaChat,
    );
    expect(resolveBookingModalUrl({ href, pathname: "/", need: "odoo" })).toBe(
      DEFAULT_MEETING_URLS.wonkaChat,
    );
    expect(resolveBookingModalUrl({ href, pathname: "/", need: "agents" })).toBe(
      DEFAULT_MEETING_URLS.wonkaBuild,
    );
    expect(resolveBookingModalUrl({ href, pathname: "/nl", need: "training" })).toBe(
      DEFAULT_MEETING_URLS.startAi,
    );
    expect(resolveBookingModalUrl({ href, pathname: "/", need: "unsure" })).toBe(href);
  });

  it("uses the Sanity calendars when they are set", () => {
    expect(
      resolveBookingModalUrl({
        href: SANITY_LINKS.meetingUrl!,
        pathname: "/",
        links: SANITY_LINKS,
        need: "workspace",
      }),
    ).toBe(SANITY_LINKS.wonkaChatMeetingUrl);
    expect(
      resolveBookingModalUrl({
        href: SANITY_LINKS.meetingUrl!,
        pathname: "/",
        links: SANITY_LINKS,
        need: "agents",
      }),
    ).toBe(SANITY_LINKS.meetingUrl);
  });

  it("keeps unknown booking links (e.g. a personal calendar) untouched", () => {
    const href =
      "https://outlook.office.com/bookwithme/user/abc@meetwonka.com/meetingtype/x?anonymous";
    expect(
      resolveBookingModalUrl({ href, pathname: "/services/x", need: "workspace" }),
    ).toBe(href);
  });

  it("always uses the France calendar on French pages, in every path", () => {
    const hrefs = [
      DEFAULT_MEETING_URLS.team,
      DEFAULT_MEETING_URLS.wonkaChat,
      DEFAULT_MEETING_URLS.startAi,
      DEFAULT_MEETING_URLS.france,
    ];
    for (const pathname of FRENCH_PATHS) {
      for (const href of hrefs) {
        for (const need of [undefined, null, ...BOOKING_NEEDS]) {
          expect(resolveBookingModalUrl({ href, pathname, need })).toBe(
            DEFAULT_MEETING_URLS.france,
          );
          expect(
            resolveBookingModalUrl({ href, pathname, need, links: SANITY_LINKS }),
          ).toBe(SANITY_LINKS.franceMeetingUrl);
        }
      }
    }
  });

  it("never falls back to an HQ calendar for France when Sanity has no France URL", () => {
    const links: BookingLinks = { ...SANITY_LINKS, franceMeetingUrl: null };
    for (const pathname of FRENCH_PATHS) {
      expect(
        resolveBookingModalUrl({
          href: SANITY_LINKS.meetingUrl!,
          pathname,
          links,
          need: "workspace",
        }),
      ).toBe(DEFAULT_MEETING_URLS.france);
    }
  });

  it("does not treat non-French paths as French", () => {
    for (const pathname of NON_FRENCH_PATHS) {
      expect(
        resolveBookingModalUrl({ href: DEFAULT_MEETING_URLS.team, pathname }),
      ).toBe(DEFAULT_MEETING_URLS.team);
    }
    expect(
      resolveBookingModalUrl({ href: DEFAULT_MEETING_URLS.team, pathname: "/francesco" }),
    ).toBe(DEFAULT_MEETING_URLS.team);
  });
});

describe("identifyBookingCalendar", () => {
  it("names the calendar shown on the confirmation step", () => {
    const resolve = (need: (typeof BOOKING_NEEDS)[number], pathname = "/") =>
      identifyBookingCalendar({
        url: resolveBookingModalUrl({ href: DEFAULT_MEETING_URLS.team, pathname, need }),
        pathname,
      });
    expect(resolve("workspace")).toBe("wonka-chat");
    expect(resolve("agents")).toBe("wonka-build");
    expect(resolve("training")).toBe("start-ai");
    expect(resolve("unsure")).toBe("team");
    for (const pathname of FRENCH_PATHS) {
      for (const need of BOOKING_NEEDS) expect(resolve(need, pathname)).toBe("france");
    }
  });
});

function click(overrides: Partial<BookingClickEvent> = {}): BookingClickEvent {
  return {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    defaultPrevented: false,
    ...overrides,
  };
}

function anchor(href: string, attributes: Record<string, string> = {}) {
  return {
    href,
    hasAttribute: (name: string) => name in attributes,
    getAttribute: (name: string) => attributes[name] ?? null,
  };
}

describe("shouldInterceptBookingClick", () => {
  const booking = anchor(DEFAULT_MEETING_URLS.team);

  it("intercepts a plain left click on a Bookings link", () => {
    expect(shouldInterceptBookingClick(click(), booking)).toBe(true);
    expect(
      shouldInterceptBookingClick(click(), anchor(DEFAULT_MEETING_URLS.france)),
    ).toBe(true);
    expect(
      shouldInterceptBookingClick(click(), anchor(DEFAULT_MEETING_URLS.team, { target: "_blank" })),
    ).toBe(true);
  });

  it("lets modifier, middle and right clicks through", () => {
    for (const modifier of ["metaKey", "ctrlKey", "shiftKey", "altKey"] as const) {
      expect(shouldInterceptBookingClick(click({ [modifier]: true }), booking)).toBe(false);
    }
    expect(shouldInterceptBookingClick(click({ button: 1 }), booking)).toBe(false);
    expect(shouldInterceptBookingClick(click({ button: 2 }), booking)).toBe(false);
  });

  it("ignores clicks already handled elsewhere", () => {
    expect(shouldInterceptBookingClick(click({ defaultPrevented: true }), booking)).toBe(
      false,
    );
  });

  it("ignores non-booking links (trial, WonkaChat signup, internal pages)", () => {
    for (const href of [
      "https://wonka.chat/register",
      "https://www.wonka-ai.com/start-ai",
      "/fr/workspace",
    ]) {
      expect(shouldInterceptBookingClick(click(), anchor(href))).toBe(false);
    }
  });

  it("respects the opt-out attribute and download links", () => {
    expect(
      shouldInterceptBookingClick(
        click(),
        anchor(DEFAULT_MEETING_URLS.team, { "data-booking-modal": "off" }),
      ),
    ).toBe(false);
    expect(
      shouldInterceptBookingClick(click(), anchor(DEFAULT_MEETING_URLS.team, { download: "" })),
    ).toBe(false);
  });
});

describe("qualifyBookingAnswers", () => {
  it("scores on the same MQL scale as qualifyLead", () => {
    expect(qualifyBookingAnswers({ companySize: "51-250", need: "odoo" })).toMatchObject({
      lifecycleStage: "mql",
      score: 65,
    });
    expect(qualifyBookingAnswers({ companySize: "1-10", need: "unsure" })).toMatchObject({
      lifecycleStage: "lead",
      score: 30,
    });
    expect(
      qualifyBookingAnswers(
        { companySize: "1-10", need: "unsure" },
        { utm_campaign: "x", utm_medium: "cpc" },
      ).lifecycleStage,
    ).toBe("mql");
  });
});

describe("isBookingUrl", () => {
  it("accepts the Bookings calendars", () => {
    expect(isBookingUrl("https://outlook.office.com/book/WonkaAI@meetwonka.com/")).toBe(true);
    expect(isBookingUrl("https://bookings.cloud.microsoft/book/WonkaAIFrance@meetwonka.com/")).toBe(true);
    expect(
      isBookingUrl("https://outlook.office.com/bookwithme/user/abc@meetwonka.com/meetingtype/x"),
    ).toBe(true);
  });

  it("rejects anything that only mentions a Bookings host", () => {
    expect(isBookingUrl("javascript:alert(1)//outlook.office.com/book")).toBe(false);
    expect(isBookingUrl("http://outlook.office.com/book/WonkaAI@meetwonka.com/")).toBe(false);
    expect(isBookingUrl("https://evil.example/outlook.office.com/book")).toBe(false);
    expect(isBookingUrl("https://outlook.office.com.evil.example/book")).toBe(false);
    expect(isBookingUrl("https://outlook.office.com/mail")).toBe(false);
    expect(isBookingUrl("/book")).toBe(false);
    expect(isBookingUrl(null)).toBe(false);
  });
});
