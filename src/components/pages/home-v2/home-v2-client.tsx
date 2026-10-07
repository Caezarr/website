"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import { BulletIcon } from "@/components/ui/icons/bullet";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type {
  HomeV2Copy,
  SectorId,
  SecurityTileId,
} from "@/views/copy/home-v2";

const TRIAL_URL = "https://wonka.chat/register";
const BG = "/brand/backgrounds/16x9";
const LOGO = "/images/home/logos";
const MCP = "/images/mcp-integrations";
const EASE = [0.22, 1, 0.36, 1] as const;
const round = (n: number) => Math.round(n * 100) / 100;

const CLIENT_LOGOS = [
  { src: "/images/france/logos/engie.svg", alt: "Engie" },
  { src: "/images/france/logos/pwc.svg", alt: "PwC" },
  { src: "/images/france/logos/luminus.svg", alt: "Luminus" },
  { src: "/images/france/logos/itzu.svg", alt: "Itzu" },
  { src: "/images/france/logos/n-allo.png", alt: "N-allo" },
  { src: "/images/home/logos/clients/cambio.png", alt: "Cambio" },
  { src: "/images/france/logos/buildwise.svg", alt: "Buildwise" },
  { src: "/images/home/logos/clients/xerius.png", alt: "Xerius" },
  { src: "/images/france/logos/zorgi.svg", alt: "Zorgi" },
  { src: "/images/home/logos/clients/odth.png", alt: "ODTH" },
  { src: "/images/workspace/logos/senitas.png", alt: "Senitas" },
  { src: "/images/workspace/logos/haelvoet.png", alt: "Haelvoet" },
  { src: "/images/workspace/logos/gerantis.png", alt: "Gerantis" },
  { src: "/images/workspace/logos/ingenium-group.png", alt: "Ingenium Group" },
  { src: "/images/workspace/logos/respace.png", alt: "Respace" },
];

type Tool = { name: string; src?: string };

const SECTOR_TOOLS: Record<SectorId, Tool[]> = {
  accounting: [
    { name: "Odoo", src: `${LOGO}/odoo.svg` },
    { name: "Horus", src: `${LOGO}/horus.png` },
    { name: "QuickBooks", src: `${LOGO}/quickbooks.png` },
    { name: "Zoho Books", src: `${LOGO}/zoho-books.png` },
    { name: "Outlook", src: `${LOGO}/outlook.svg` },
    { name: "SharePoint", src: `${LOGO}/sharepoint.svg` },
  ],
  construction: [
    { name: "Sage", src: "/images/btp-integrations/sage.png" },
    { name: "Obat", src: "/images/btp-integrations/obat-wordmark.png" },
    { name: "ProGBat", src: "/images/btp-integrations/progbat-wordmark.png" },
    { name: "Costructor", src: "/images/btp-integrations/costructor.png" },
    { name: "Graneet", src: "/images/btp-integrations/graneet.png" },
    { name: "Outlook", src: `${LOGO}/outlook.svg` },
  ],
  hospitality: [
    { name: "Hostaway", src: `${LOGO}/hostaway.png` },
    { name: "Breezeway", src: `${LOGO}/breezeway.png` },
    { name: "WhatsApp", src: `${MCP}/whatsapp.webp` },
    { name: "Gmail", src: `${LOGO}/gmail.svg` },
    { name: "Odoo", src: `${LOGO}/odoo.svg` },
  ],
  services: [
    { name: "Stafiz", src: `${LOGO}/stafiz.png` },
    { name: "Odoo", src: `${LOGO}/odoo.svg` },
    { name: "Teams", src: `${LOGO}/teams.svg` },
    { name: "SharePoint", src: `${LOGO}/sharepoint.svg` },
    { name: "Jira", src: `${LOGO}/jira.svg` },
  ],
  sales: [
    { name: "Pipedrive", src: `${LOGO}/pipedrive.png` },
    { name: "HubSpot", src: `${LOGO}/hubspot.svg` },
    { name: "Salesforce", src: `${LOGO}/salesforce.svg` },
    { name: "Leexi", src: `${LOGO}/leexi.svg` },
    { name: "Attio", src: `${LOGO}/attio.svg` },
    { name: "Close", src: `${LOGO}/close.svg` },
  ],
  marketing: [
    { name: "Instagram", src: `${LOGO}/instagram.png` },
    { name: "Facebook", src: `${LOGO}/facebook.png` },
    { name: "Meta Ads", src: `${MCP}/meta-ads.jpg` },
    { name: "Google Ads", src: `${MCP}/google-ads.png` },
    { name: "Brevo", src: `${MCP}/brevo.jpg` },
    { name: "Klaviyo", src: `${LOGO}/klaviyo.svg` },
  ],
  retail: [
    { name: "Shopify", src: `${MCP}/shopify.jpg` },
    { name: "Stripe", src: `${MCP}/stripe.webp` },
    { name: "Square", src: `${MCP}/square.svg` },
    { name: "Klaviyo", src: `${LOGO}/klaviyo.svg` },
    { name: "WhatsApp", src: `${MCP}/whatsapp.webp` },
  ],
  support: [
    { name: "Zendesk", src: `${MCP}/zendesk.svg` },
    { name: "Intercom", src: `${MCP}/intercom.png` },
    { name: "WhatsApp", src: `${MCP}/whatsapp.webp` },
    { name: "Outlook", src: `${LOGO}/outlook.svg` },
    { name: "Gmail", src: `${LOGO}/gmail.svg` },
  ],
};

const EVERYDAY_TOOLS: Tool[][] = [
  [
    { name: "Outlook", src: `${LOGO}/outlook.svg` },
    { name: "Teams", src: `${LOGO}/teams.svg` },
    { name: "SharePoint", src: `${LOGO}/sharepoint.svg` },
    { name: "OneDrive", src: `${LOGO}/onedrive.svg` },
    { name: "Gmail", src: `${LOGO}/gmail.svg` },
    { name: "Google Drive", src: `${LOGO}/googledrive.svg` },
    { name: "Google Sheets", src: `${LOGO}/googlesheets.svg` },
    { name: "Google Calendar", src: `${LOGO}/googlecalendar.svg` },
    { name: "Slack", src: `${LOGO}/slack.svg` },
    { name: "Notion", src: `${LOGO}/notion.svg` },
    { name: "Confluence", src: `${MCP}/confluence.svg` },
    { name: "Dropbox", src: `${MCP}/dropbox.svg` },
  ],
  [
    { name: "HubSpot", src: `${LOGO}/hubspot.svg` },
    { name: "Salesforce", src: `${LOGO}/salesforce.svg` },
    { name: "Jira", src: `${LOGO}/jira.svg` },
    { name: "Asana", src: `${LOGO}/asana.svg` },
    { name: "monday.com", src: `${LOGO}/mondaydotcom.svg` },
    { name: "Linear", src: `${MCP}/linear.svg` },
    { name: "Trello", src: `${MCP}/trello.svg` },
    { name: "Airtable", src: `${MCP}/airtable.svg` },
    { name: "Zoom", src: `${MCP}/zoom.svg` },
    { name: "Miro", src: `${MCP}/miro.png` },
    { name: "Canva", src: `${MCP}/canva.png` },
    { name: "GitHub", src: `${MCP}/github.svg` },
  ],
];

const TEAM_PHOTOS = [
  "cedric-gilissen",
  "antoine-percy",
  "florian-de-boeck",
  "bilal-errahil",
  "nathan-de-witte",
].map((slug) => `/images/team/${slug}.jpg`);

const MODEL_META = {
  openai: { name: "GPT", vendor: "OpenAI", src: `${LOGO}/model-openai.svg` },
  claude: {
    name: "Claude",
    vendor: "Anthropic",
    src: `${LOGO}/model-claude.svg`,
  },
  gemini: { name: "Gemini", vendor: "Google", src: `${LOGO}/model-gemini.png` },
  mistral: {
    name: "Mistral",
    vendor: "Mistral AI",
    src: `${LOGO}/model-mistral.png`,
  },
} as const;
type ModelId = keyof typeof MODEL_META;
const MODEL_ORDER: ModelId[] = ["openai", "claude", "gemini", "mistral"];

export interface HomeV2Links {
  meetingUrl: string;
  securityUrl: string;
  teamUrl: string;
}

/* ───────────────────────── primitives ───────────────────────── */

function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-text font-serif text-[2.4rem] leading-[1.04] tracking-[-0.01em] md:text-[3.4rem]">
        {title}
      </h2>
      {body && (
        <p className="type-paragraph-l text-text/70 max-w-2xl">{body}</p>
      )}
    </Reveal>
  );
}

function ToolTile({ tool, size = "md" }: { tool: Tool; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "border-border flex shrink-0 items-center justify-center rounded-sm border bg-white",
        size === "sm" ? "size-12" : "size-14 md:size-16",
      )}
      title={tool.name}
    >
      {tool.src ? (
        <Image
          src={tool.src}
          alt={tool.name}
          width={40}
          height={40}
          className={cn(
            "object-contain",
            size === "sm" ? "size-6" : "size-7 md:size-8",
          )}
        />
      ) : (
        <span className="font-serif text-xl" aria-label={tool.name}>
          {tool.name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

/** Autoplays only while visible, so off-screen clips cost nothing. */
function ClipVideo({
  src,
  poster,
  className,
  loop = true,
  onTime,
  onEnded,
}: {
  src: string;
  poster: string;
  className?: string;
  loop?: boolean;
  onTime?: (progress: number) => void;
  onEnded?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduce) {
      // React does not reflect `muted` as an attribute, so set it before play() or autoplay is refused.
      video.muted = true;
      void video.play().catch(() => undefined);
    } else video.pause();
  }, [inView, reduce, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload="metadata"
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (onTime && v.duration) onTime(v.currentTime / v.duration);
      }}
      onEnded={onEnded}
    />
  );
}

/** Counts the number part of a metric up when it scrolls into view, keeping its sign and unit. */
function CountUpMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !target || reduce) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, target]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {prefix}
      {reduce ? target : n}
      {suffix}
    </span>
  );
}

function VideoModal({
  youtubeId,
  title,
  closeLabel,
  onClose,
}: {
  youtubeId: string;
  title: string;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="type-paragraph-s absolute -top-10 right-0 text-white/80 underline-offset-4 hover:underline"
        >
          {closeLabel} ✕
        </button>
        <div className="aspect-video overflow-hidden rounded-sm bg-black">
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── award ───────────────────────── */

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="relative z-10 h-3.5 w-5"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 14 L3 3 L8 9 L12 2 L16 9 L21 3 L22 14 Z"
        stroke="#e8c477"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwardTag({ copy }: { copy: HomeV2Copy["award"] }) {
  return (
    <div
      className="award-marble-badge relative flex items-center gap-2 overflow-hidden rounded-full border border-[#c9962c]/75 px-4 py-1.5 text-white backdrop-blur-md"
      style={{ animation: "award-glow 3s ease-in-out infinite" }}
    >
      <CrownIcon />
      <span className="relative z-10 h-4 w-px bg-gradient-to-b from-transparent via-[#d7a23c]/80 to-transparent" />
      <span className="relative z-10 text-[0.66rem] font-medium tracking-[0.14em] uppercase md:text-xs">
        {copy.label}
      </span>
    </div>
  );
}

/* ───────────────────────── hero ───────────────────────── */

function Hero({
  copy,
  award,
  links,
}: {
  copy: HomeV2Copy["hero"];
  award: HomeV2Copy["award"];
  links: HomeV2Links;
}) {
  const reduce = useReducedMotion();
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section
      data-theme="dark"
      className="bg-background text-text relative isolate flex min-h-svh w-full flex-col overflow-hidden"
    >
      <Image
        src={`${BG}/wonka-bg-hills-1920x1080.webp`}
        alt=""
        fill
        priority
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="from-background/40 via-background/10 to-background/50 absolute inset-0 -z-10 bg-gradient-to-b" />

      <div className="flex flex-1 items-center justify-center px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
          <Reveal>
            <AwardTag copy={award} />
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-text font-serif text-[2.6rem] leading-[1.03] tracking-[-0.015em] text-balance md:text-[4.4rem]">
              {copy.title}
              <span className="text-text/65 block">{copy.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body text-text/90 max-w-[36rem]">
              {copy.subtitle}
            </p>
          </Reveal>
          <Reveal
            delay={0.24}
            className="mt-2 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href={TRIAL_URL} variant="primary">
              {copy.primaryCta}
            </ButtonLink>
            <ButtonLink href={links.meetingUrl} variant="secondary">
              {copy.secondaryCta}
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <div className="border-border bg-text/[0.06] border-t border-dashed">
        <p className="type-eyebrow border-border text-text/80 border-b border-dashed py-3 text-center">
          {copy.trustedBy}
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            className="flex w-max items-center"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 55, ease: "linear", repeat: Infinity }}
          >
            {logos.map((logo, i) => (
              <span
                key={`${logo.alt}-${i}`}
                className="border-border flex h-16 items-center border-r border-dashed px-10"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={36}
                  className="h-7 w-auto max-w-[130px] object-contain brightness-0 invert"
                />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── clients ───────────────────────── */

function Clients({ copy }: { copy: HomeV2Copy["clients"] }) {
  const [open, setOpen] = useState(false);
  const video = copy.video;

  return (
    <section id="clients" className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />

        {/* Video testimonial, laid out like the site's testimonial card */}
        <Reveal className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="border-border flex flex-col gap-6 border-b border-dashed pb-8">
              <Image
                src={video.logo}
                alt={video.client}
                width={140}
                height={32}
                className="h-7 w-auto self-start object-contain"
              />
              <blockquote className="type-h5 text-text">
                {video.quote}
              </blockquote>
              {video.stat && (
                <p className="flex items-baseline gap-3">
                  <span className="text-text font-serif text-5xl leading-none lining-nums">
                    <CountUpMetric value={video.stat.value} />
                  </span>
                  <span className="type-paragraph-m text-text/70">
                    {video.stat.label}
                  </span>
                </p>
              )}
            </div>
            <p className="flex items-center gap-3">
              <BulletIcon className="text-accent-dark h-[0.625rem] w-[0.4375rem] shrink-0" />
              <span className="type-paragraph-m text-text">{video.person}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={copy.play}
            className="group relative aspect-video overflow-hidden rounded-sm bg-black lg:col-span-7"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt=""
              className="size-full object-cover"
            />
            <span className="absolute inset-0 bg-black/10" />
            <span className="absolute top-1/2 left-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black">
              <svg
                viewBox="0 0 12 12"
                className="ml-1 size-5 fill-current"
                aria-hidden
              >
                <path d="M3 1.5v9l7.5-4.5z" />
              </svg>
            </span>
          </button>
        </Reveal>

        {/* Case cards: one sentence on what we did, one key number */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {copy.cases.map((c, i) => (
            <Reveal key={c.client} delay={0.08 * i} className="h-full">
              <article className="bg-mid-gray flex h-full flex-col justify-between gap-10 rounded-sm p-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <p className="type-h6 text-text max-w-sm">{c.headline}</p>
                  <p className="shrink-0 text-right">
                    <span
                      className={cn(
                        "text-text block font-serif leading-none lining-nums",
                        /\d/.test(c.metric)
                          ? "text-5xl md:text-6xl"
                          : "text-3xl md:text-4xl",
                      )}
                    >
                      <CountUpMetric value={c.metric} />
                    </span>
                    <span className="type-paragraph-s text-text/65 mt-2 block max-w-[10rem]">
                      {c.metricLabel}
                    </span>
                  </p>
                </div>
                <div className="border-border flex items-center justify-between border-t border-dashed pt-5">
                  <Image
                    src={c.logo}
                    alt={c.client}
                    width={110}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                  <ButtonLink href={c.href} variant="underline">
                    {copy.readCase}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <VideoModal
            youtubeId={video.youtubeId}
            title={video.quote}
            closeLabel={copy.close}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────────── platform film ───────────────────────── */

function Platform({
  copy,
  locale,
}: {
  copy: HomeV2Copy["platform"];
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const chapter = copy.chapters[active];
  const select = useCallback((i: number) => {
    setActive(i);
    setProgress(0);
  }, []);
  const next = useCallback(
    () => select((active + 1) % copy.chapters.length),
    [active, copy.chapters.length, select],
  );

  return (
    <section
      data-theme="dark"
      className="bg-background text-text py-20 md:py-30"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <ol className="divide-border border-border order-2 flex flex-col divide-y divide-dashed border-y border-dashed lg:order-1 lg:col-span-5">
            {copy.chapters.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className="w-full py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={cn(
                          "type-eyebrow tabular-nums",
                          isActive ? "text-accent" : "text-text/35",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "type-h6 transition-colors",
                          isActive ? "text-text" : "text-text/45",
                        )}
                      >
                        {c.title}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="block overflow-hidden pl-9"
                        >
                          <span className="type-paragraph-m text-text/70 block pt-3">
                            {c.body}
                          </span>
                          <span className="bg-text/10 mt-5 block h-px w-full overflow-hidden">
                            <span
                              className="block h-full bg-blue-400"
                              style={{ width: `${progress * 100}%` }}
                            />
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="border-border relative aspect-video overflow-hidden rounded-sm border border-dashed bg-[#18231f]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${chapter.id}-${locale}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  <ClipVideo
                    src={`/videos/home/${locale}/${chapter.id}.mp4`}
                    poster={`/videos/home/${locale}/${chapter.id}.jpg`}
                    className="size-full object-cover"
                    loop={false}
                    onTime={setProgress}
                    onEnded={next}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── models ───────────────────────── */

function Models({ copy }: { copy: HomeV2Copy["models"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % copy.tasks.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [inView, reduce, copy.tasks.length]);

  const task = copy.tasks[index];

  return (
    <section className="bg-background py-20 md:py-30">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7" delay={0.05}>
            <div className="bg-mid-gray flex h-full flex-col justify-center rounded-sm p-6 md:p-10">
              <div className="border-border flex items-center gap-3 rounded-sm border bg-white px-4 py-3.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xs bg-black">
                  <Image
                    src={`${LOGO}/wonka-logo-mark-white-transparent.png`}
                    alt=""
                    width={18}
                    height={18}
                    className="size-4 object-contain"
                  />
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={task.task}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="type-paragraph-m text-text min-w-0 flex-1 truncate"
                  >
                    {task.task}
                  </motion.span>
                </AnimatePresence>
                <span className="type-paragraph-s border-border text-text/70 hidden items-center gap-1.5 rounded-full border px-3 py-0.5 sm:flex">
                  <span className="text-accent">✦</span> {copy.auto}
                </span>
              </div>

              <div
                className="border-text/25 relative mx-auto my-4 h-12 w-px overflow-hidden border-l border-dashed"
                aria-hidden
              >
                <motion.span
                  key={index}
                  className="absolute inset-x-[-1px] top-0 h-6 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
                  initial={{ y: -24 }}
                  animate={{ y: 48 }}
                  transition={{ duration: 0.7, ease: "easeIn" }}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MODEL_ORDER.map((id) => {
                  const meta = MODEL_META[id];
                  const selected = id === task.model;
                  return (
                    <div
                      key={id}
                      className={cn(
                        "relative flex items-center gap-3 rounded-sm border bg-white p-4 transition-colors duration-500",
                        selected ? "border-blue-400" : "border-border",
                      )}
                    >
                      <span className="border-border flex size-10 shrink-0 items-center justify-center rounded-xs border bg-white">
                        <Image
                          src={meta.src}
                          alt={meta.vendor}
                          width={24}
                          height={24}
                          className="size-6 object-contain"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="type-paragraph-m text-text block truncate">
                          {meta.name}
                        </span>
                        <span className="type-paragraph-s text-text/55 block truncate">
                          {meta.vendor}
                        </span>
                      </span>
                      {selected && (
                        <span className="type-paragraph-s ml-auto shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                          {task.tier === "light" ? copy.light : copy.advanced}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-5" delay={0.12}>
            <SavingsCard copy={copy} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// WonkaChat prod tokenConfig, $ per million tokens: Claude Opus 5 vs GPT-5.6 Luna, 3 tokens read per token written.
const HEAVY_TASK_COST = 3 * 5.5 + 27.5;
const LIGHT_TASK_COST = 3 * 0.22 + 1.32;

function SavingsCard({ copy }: { copy: HomeV2Copy["models"] }) {
  const [share, setShare] = useState(70);
  const savings = Math.round(share * (1 - LIGHT_TASK_COST / HEAVY_TASK_COST));

  return (
    <div
      data-theme="dark"
      className="bg-background text-text flex h-full flex-col gap-8 rounded-sm p-7 md:p-10"
    >
      <div>
        <p className="font-serif text-[5.5rem] leading-none tracking-[-0.03em] lining-nums md:text-[7rem]">
          −{savings}
          <span className="text-blue-400">%</span>
        </p>
        <p className="type-paragraph-l text-text/80 mt-3">{copy.saveLabel}</p>
      </div>

      <label className="block">
        <span className="type-paragraph-s text-text/65 flex items-baseline justify-between gap-4">
          {copy.sliderLabel}
          <span className="text-text font-serif text-2xl lining-nums tabular-nums">
            {share}%
          </span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          className="mt-4 w-full cursor-pointer accent-blue-400"
        />
      </label>

      <div className="border-border mt-auto space-y-3 border-t border-dashed pt-6">
        <p className="type-h6 text-text lining-nums">{copy.ratio}</p>
        <p className="type-paragraph-s text-text/45">{copy.source}</p>
      </div>
    </div>
  );
}

/* ───────────────────────── integrations ───────────────────────── */

function WonkaAppIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-sm bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700",
        className,
      )}
    >
      <Image
        src={`${LOGO}/wonka-logo-mark-white-transparent.png`}
        alt="WonkaChat"
        width={64}
        height={64}
        className="size-1/2 object-contain"
      />
    </span>
  );
}

function Constellation({ sector }: { sector: SectorId }) {
  const reduce = useReducedMotion();
  const nodes: Tool[] = [...SECTOR_TOOLS[sector], { name: "+" }];
  const radius = 38;
  const position = (i: number) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    // Rounded so server and client render identical attribute strings.
    return {
      x: round(50 + Math.cos(angle) * radius),
      y: round(50 + Math.sin(angle) * radius),
    };
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div
        className="border-border absolute inset-[12%] rounded-full border border-dashed"
        aria-hidden
      />
      <div
        className="border-border absolute inset-[30%] rounded-full border border-dashed"
        aria-hidden
      />

      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        {nodes.map((tool, i) => {
          const { x, y } = position(i);
          return (
            <motion.line
              key={`${sector}-${tool.name}-line`}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke="var(--color-blue-400)"
              strokeWidth={0.35}
              strokeDasharray="1.2 1.6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.85,
                strokeDashoffset: reduce ? 0 : [0, -11],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.05 * i },
                strokeDashoffset: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          );
        })}
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <WonkaAppIcon className="size-20 md:size-24" />
      </div>

      {nodes.map((tool, i) => {
        const { x, y } = position(i);
        const isCustom = tool.name === "+";
        return (
          <motion.div
            key={`${sector}-${tool.name}`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05 * i, ease: EASE }}
          >
            {isCustom ? (
              <span className="border-text/30 bg-background text-text/50 flex size-14 items-center justify-center rounded-sm border border-dashed font-serif text-2xl md:size-16">
                +
              </span>
            ) : (
              <ToolTile tool={tool} />
            )}
            {!isCustom && (
              <span className="type-paragraph-s text-text/70 hidden whitespace-nowrap sm:block">
                {tool.name}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function ToolRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const reduce = useReducedMotion();
  const row = [...tools, ...tools];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] py-2">
      <motion.div
        className="flex w-max gap-4"
        animate={
          reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {row.map((tool, i) => (
          <ToolTile key={`${tool.name}-${i}`} tool={tool} size="sm" />
        ))}
      </motion.div>
    </div>
  );
}

function Integrations({ copy }: { copy: HomeV2Copy["integrations"] }) {
  const [sector, setSector] = useState<SectorId>(copy.sectors[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Cycle sectors on its own until the visitor picks one.
  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => {
      setSector((current) => {
        const i = copy.sectors.findIndex((s) => s.id === current);
        return copy.sectors[(i + 1) % copy.sectors.length].id;
      });
    }, 3200);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce, copy.sectors]);

  return (
    <section className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div
          ref={ref}
          className="mt-14 grid items-center gap-10 lg:grid-cols-12"
        >
          <ul className="border-border grid grid-cols-2 border-t border-dashed lg:col-span-5 lg:grid-cols-1">
            {copy.sectors.map((s) => {
              const isActive = s.id === sector;
              return (
                <li key={s.id} className="border-border border-b border-dashed">
                  <button
                    type="button"
                    onClick={() => {
                      setSector(s.id);
                      setPaused(true);
                    }}
                    className="w-full py-3.5 text-left lg:py-4"
                  >
                    <span className="flex items-center gap-3">
                      <BulletIcon
                        className={cn(
                          "h-[0.625rem] w-[0.4375rem] shrink-0 transition-colors",
                          isActive ? "text-accent" : "text-text/20",
                        )}
                      />
                      <span
                        className={cn(
                          "type-h6 transition-colors",
                          isActive ? "text-text" : "text-text/40",
                        )}
                      >
                        {s.label}
                      </span>
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="type-paragraph-s text-text/60 mt-1 hidden pl-[1.2rem] lg:block"
                      >
                        {s.pitch}
                      </motion.span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="lg:col-span-7">
            <Constellation sector={sector} />
            <p className="type-paragraph-s text-text/60 mt-4 text-center">
              <span className="text-text">{copy.customTitle}</span>{" "}
              {copy.customBody}
            </p>
          </div>
        </div>

        <div className="bg-mid-gray mt-16 rounded-sm p-6 md:p-10">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <p className="type-h5 text-text">{copy.everydayTitle}</p>
            <span className="type-paragraph-s border-text/30 text-text rounded-full border border-dashed px-4 py-1">
              {copy.everydayCount}
            </span>
          </div>
          <ToolRow tools={EVERYDAY_TOOLS[0]} />
          <ToolRow tools={EVERYDAY_TOOLS[1]} reverse />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── team / workflow ───────────────────────── */

function Team({
  copy,
  links,
}: {
  copy: HomeV2Copy["team"];
  links: HomeV2Links;
}) {
  return (
    <section className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow={copy.eyebrow}
            title={copy.title}
            body={copy.body}
          />
          <Reveal
            delay={0.1}
            className="flex flex-col items-start gap-5 lg:items-end"
          >
            <p className="flex items-baseline gap-3">
              <span className="text-text font-serif text-7xl leading-none lining-nums">
                {copy.count}
              </span>
              <span className="type-paragraph-s text-text/65 max-w-[11rem]">
                {copy.countLabel}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <span className="flex -space-x-3">
                {TEAM_PHOTOS.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={96}
                    height={120}
                    className="border-background size-11 rounded-full border-2 object-cover object-top"
                  />
                ))}
              </span>
              <ButtonLink href={links.teamUrl} variant="underline">
                {copy.pageCta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <ol className="border-border md:divide-border mt-14 grid border-y border-dashed md:grid-cols-3 md:divide-x md:divide-dashed">
          {copy.steps.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "flex flex-col gap-4 py-8 md:px-8 md:py-10",
                i > 0 && "border-border border-t border-dashed md:border-t-0",
                i === 0 && "md:pl-0",
              )}
            >
              <Reveal delay={0.1 * i} className="flex flex-col gap-4">
                <span className="type-eyebrow text-accent tabular-nums">
                  0{i + 1}
                </span>
                <p className="type-h5 text-text">{step.title}</p>
                <p className="type-paragraph-m text-text/70">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10">
          <ButtonLink href={links.meetingUrl} variant="primary">
            {copy.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── security ───────────────────────── */

function SecurityVisual({ id }: { id: SecurityTileId }) {
  if (id === "iso" || id === "gdpr" || id === "nis2") {
    const Badge =
      id === "iso" ? BadgeIso : id === "gdpr" ? BadgeGdpr : BadgeNis2;
    return (
      <span className="flex size-16 items-center justify-center rounded-full bg-black">
        <Badge className="size-12" />
      </span>
    );
  }
  if (id === "eu")
    return (
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
        <circle cx="32" cy="32" r="31" fill="var(--color-blue-800)" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={round(32 + Math.cos(a) * 18)}
              cy={round(32 + Math.sin(a) * 18)}
              r="2.6"
              fill="#f7c948"
            />
          );
        })}
      </svg>
    );
  if (id === "encryption")
    return (
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
        <circle cx="32" cy="32" r="31" fill="var(--color-black)" />
        <rect
          x="21"
          y="29"
          width="22"
          height="17"
          rx="4"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        />
        <path
          d="M25 29v-5a7 7 0 0 1 14 0v5"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        />
        <circle cx="32" cy="37.5" r="2.2" fill="var(--color-blue-400)" />
      </svg>
    );
  return (
    <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
      <circle cx="32" cy="32" r="31" fill="var(--color-blue-100)" />
      <path
        d="M32 17l12 5v9c0 8-5.2 13.6-12 16-6.8-2.4-12-8-12-16v-9z"
        fill="none"
        stroke="var(--color-blue-600)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 32.5l4 4 7.5-8"
        fill="none"
        stroke="var(--color-blue-600)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Security({
  copy,
  links,
}: {
  copy: HomeV2Copy["security"];
  links: HomeV2Links;
}) {
  return (
    <section className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="border-border flex flex-col justify-between gap-6 border-b border-dashed pb-10 md:flex-row md:items-end">
          <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />
          <Reveal>
            <ButtonLink href={links.securityUrl} variant="underline">
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {copy.tiles.map((tile, i) => (
            <li
              key={tile.id}
              className="border-border flex flex-col items-center gap-5 border-b border-dashed px-4 py-10 text-center [&:not(:last-child)]:border-r"
            >
              <Reveal
                delay={0.06 * i}
                className="flex flex-col items-center gap-5"
              >
                <SecurityVisual id={tile.id} />
                <span className="type-paragraph-l text-text">{tile.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── final CTA ───────────────────────── */

function FinalCta({
  copy,
  hero,
  links,
}: {
  copy: HomeV2Copy["finalCta"];
  hero: HomeV2Copy["hero"];
  links: HomeV2Links;
}) {
  return (
    <section
      data-theme="dark"
      className="bg-background text-text relative isolate overflow-hidden"
    >
      <Image
        src={`${BG}/wonka-bg-snowy-mountain-1920x1080.webp`}
        alt=""
        fill
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="from-background/20 via-background/20 to-background/60 absolute inset-0 -z-10 bg-gradient-to-b" />
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-7 px-6 py-28 text-center">
        <Reveal>
          <h2 className="text-text font-serif text-[2.6rem] leading-[1.03] text-balance md:text-[4.2rem]">
            {copy.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="type-body text-text/85">{copy.subtitle}</p>
        </Reveal>
        <Reveal
          delay={0.16}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <ButtonLink href={TRIAL_URL} variant="primary">
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href={links.meetingUrl} variant="secondary">
            {hero.secondaryCta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── page ───────────────────────── */

export function HomeV2Client({
  copy,
  links,
  locale,
}: {
  copy: HomeV2Copy;
  links: HomeV2Links;
  locale: Locale;
}) {
  return (
    <main className="bg-background text-text">
      <Hero copy={copy.hero} award={copy.award} links={links} />
      <Clients copy={copy.clients} />
      <Platform copy={copy.platform} locale={locale} />
      <Models copy={copy.models} />
      <Integrations copy={copy.integrations} />
      <Team copy={copy.team} links={links} />
      <Security copy={copy.security} links={links} />
      <FinalCta copy={copy.finalCta} hero={copy.hero} links={links} />
    </main>
  );
}
