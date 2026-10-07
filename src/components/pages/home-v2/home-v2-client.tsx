"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type {
  HomeV2Copy,
  SectorId,
  SecurityTileId,
} from "@/views/copy/home-v2";

const TRIAL_URL = "https://wonka.chat/register";
const YOUTUBE_ID = "Qv_65poIhig";
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
  { src: "/images/france/logos/cambio.png", alt: "Cambio" },
  { src: "/images/france/logos/buildwise.svg", alt: "Buildwise" },
  { src: "/images/france/logos/xerius.png", alt: "Xerius" },
  { src: "/images/france/logos/zorgi.svg", alt: "Zorgi" },
  { src: "/images/france/logos/odth.png", alt: "ODTH" },
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

const TEAM_PHOTOS = [1, 2, 3].map((n) => `/images/home/team/member-${n}.jpg`);

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

function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase",
        tone === "light" ? "text-white/70" : "text-light-brown",
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          tone === "light" ? "bg-white/40" : "bg-black/25",
        )}
      />
      {children}
    </p>
  );
}

function PrimaryCta({
  children,
  href,
  tone = "dark",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "dark" | "light";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5",
        tone === "dark"
          ? "bg-black text-white shadow-[0_12px_30px_-12px_rgba(14,26,22,0.6)] hover:bg-black/90"
          : "bg-white text-black shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)]",
      )}
    >
      {children}
      <span className="transition group-hover:translate-x-0.5">→</span>
    </a>
  );
}

function GhostCta({
  children,
  href,
  tone = "light",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "dark" | "light";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-medium backdrop-blur-md transition duration-300 hover:-translate-y-0.5",
        tone === "light"
          ? "border-white/40 bg-white/10 text-white hover:bg-white/20"
          : "border-black/15 bg-white text-black hover:border-black/30",
      )}
    >
      {children}
    </a>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
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
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl space-y-5", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "font-serif text-[2.4rem] leading-[1.02] tracking-[-0.01em] md:text-[3.6rem]",
          tone === "light" ? "text-white" : "text-black",
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            "max-w-2xl text-base md:text-lg",
            tone === "light" ? "text-white/70" : "text-black/65",
          )}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}

function ToolTile({ tool, size = "md" }: { tool: Tool; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center border border-black/[0.06] bg-white shadow-[0_8px_24px_-12px_rgba(14,26,22,0.25)]",
        size === "sm" ? "size-12 rounded-xl" : "size-14 rounded-2xl md:size-16",
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
        <span className="font-serif text-xl text-black" aria-label={tool.name}>
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
  locale,
  onWatch,
}: {
  copy: HomeV2Copy["hero"];
  award: HomeV2Copy["award"];
  links: HomeV2Links;
  locale: Locale;
  onWatch: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale: bgScale, y: bgY }}
      >
        <Image
          src={`${BG}/wonka-bg-hills-1920x1080.webp`}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/80" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-32 pb-20 text-center md:pt-40">
        <Reveal>
          <AwardTag copy={award} />
        </Reveal>
        <Reveal delay={0.08} className="mt-8">
          <h1 className="mx-auto max-w-5xl font-serif text-[2.6rem] leading-[1.02] tracking-[-0.015em] text-white md:text-[4.6rem]">
            {copy.title}
            <span className="block text-white/60">{copy.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16} className="mt-6">
          <p className="mx-auto max-w-2xl text-base text-white/85 md:text-lg">
            {copy.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-col items-center gap-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryCta href={TRIAL_URL} tone="light">
              {copy.primaryCta}
            </PrimaryCta>
            <GhostCta href={links.meetingUrl}>{copy.secondaryCta}</GhostCta>
          </div>
          <button
            type="button"
            onClick={onWatch}
            className="group inline-flex items-center gap-3 text-sm text-white/85"
          >
            <span className="relative flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
              <svg
                viewBox="0 0 12 12"
                className="size-3 fill-white"
                aria-hidden
              >
                <path d="M3 1.5v9l7.5-4.5z" />
              </svg>
            </span>
            <span className="underline-offset-4 group-hover:underline">
              {copy.videoCta}
            </span>
          </button>
        </Reveal>

        <motion.div
          style={reduce ? undefined : { y: frameY }}
          className="mt-16 w-full"
        >
          <Reveal delay={0.3} y={60}>
            <div className="relative mx-auto max-w-5xl">
              <div
                className="absolute -inset-x-10 top-10 -bottom-10 rounded-[3rem] bg-blue-400/25 blur-3xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 text-xs text-white/50">WonkaChat</span>
                </div>
                <ClipVideo
                  src={`/videos/home/${locale}/describe.mp4`}
                  poster={`/videos/home/${locale}/describe.jpg`}
                  className="aspect-[1920/900] w-full object-cover"
                />
              </div>
              <p className="mt-5 text-sm text-white/65">{copy.demoCaption}</p>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBand({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="border-b border-black/5 bg-white py-12">
      <p className="text-light-brown mb-8 text-center text-xs font-medium tracking-[0.18em] uppercase">
        {label}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex w-max items-center gap-16 px-8"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {logos.map((logo, i) => (
            <Image
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={40}
              className="h-9 w-auto max-w-[150px] object-contain transition duration-300 hover:scale-105"
            />
          ))}
        </motion.div>
      </div>
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
    <section className="relative overflow-hidden bg-black py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 40%, rgba(117,163,253,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} tone="light" />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-3">
          {copy.proofs.map((proof, i) => (
            <Reveal
              key={proof.source}
              delay={0.08 * i}
              className="bg-black p-7 md:p-8"
            >
              <p className="font-serif text-6xl leading-none tracking-[-0.02em] text-white md:text-7xl">
                <CountUpMetric value={proof.metric} />
              </p>
              <p className="mt-4 text-base text-white/80">{proof.label}</p>
              <p className="mt-5 flex items-center gap-3 text-xs tracking-[0.12em] text-white/45 uppercase">
                {proof.logo && (
                  <span className="flex h-7 items-center rounded-md bg-white px-2">
                    <Image
                      src={proof.logo}
                      alt=""
                      width={64}
                      height={20}
                      className="h-4 w-auto object-contain"
                    />
                  </span>
                )}
                {proof.source}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ol className="flex h-full flex-col justify-center gap-2">
              {copy.chapters.map((c, i) => {
                const isActive = i === active;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      className={cn(
                        "w-full rounded-2xl p-5 text-left transition duration-500",
                        isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-serif text-sm tabular-nums",
                            isActive ? "text-blue-400" : "text-white/30",
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-serif text-xl transition-colors md:text-2xl",
                            isActive ? "text-white" : "text-white/45",
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
                            <span className="block pt-3 text-sm text-white/65 md:text-base">
                              {c.body}
                            </span>
                            <span className="mt-5 block h-px w-full overflow-hidden bg-white/10">
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
          </div>

          <div className="order-1 self-center lg:order-2 lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#18231f] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-video">
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
      </div>
    </section>
  );
}

/* ───────────────────────── models ───────────────────────── */

function Models({ copy }: { copy: HomeV2Copy["models"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % copy.tasks.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, [inView, reduce, copy.tasks.length]);

  const task = copy.tasks[index];
  const modelRow = MODEL_ORDER.indexOf(task.model);
  const rowY = (row: number) => ((row + 0.5) / 4) * 100;
  const from = rowY(index);
  const to = rowY(modelRow);

  return (
    <section className="bg-light-gray py-24 md:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Router */}
          <Reveal className="min-w-0 lg:col-span-8">
            <div className="relative h-full rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_-40px_rgba(14,26,22,0.45)] md:p-8">
              <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-3 md:gap-14">
                <svg
                  className="pointer-events-none absolute inset-0 hidden size-full md:block"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    key={`in-${index}`}
                    d={`M 30 ${from} C 44 ${from}, 40 50, 50 50`}
                    fill="none"
                    stroke="var(--color-blue-400)"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                  <motion.path
                    key={`out-${index}`}
                    d={`M 50 50 C 60 50, 56 ${to}, 70 ${to}`}
                    fill="none"
                    stroke="var(--color-blue-400)"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
                  />
                </svg>

                <ul className="relative grid grid-rows-4 gap-2">
                  {copy.tasks.map((t, i) => (
                    <li key={t.task}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        className={cn(
                          "flex h-full w-full flex-col justify-center rounded-2xl border px-3 py-3 text-left transition duration-300 md:px-4",
                          i === index
                            ? "border-blue-400 bg-blue-100"
                            : "bg-light-gray border-black/[0.06]",
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs md:text-sm",
                            i === index ? "text-black" : "text-black/55",
                          )}
                        >
                          {t.task}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 inline-flex w-fit rounded-full px-2 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                            t.tier === "light"
                              ? "bg-forest-500/15 text-forest-500"
                              : "bg-black/[0.07] text-black/60",
                          )}
                        >
                          {t.tier === "light" ? copy.light : copy.advanced}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="relative flex items-center">
                  <motion.span
                    key={index}
                    initial={{ scale: 0.92 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                      delay: 0.35,
                    }}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-black px-3 py-4 text-center text-white shadow-[0_20px_40px_-20px_rgba(14,26,22,0.8)] md:px-4"
                  >
                    <Image
                      src={`${LOGO}/wonka-logo-mark-white-transparent.png`}
                      alt=""
                      width={28}
                      height={28}
                      className="size-6 object-contain md:size-7"
                    />
                    <span className="max-w-[5.5rem] text-[0.65rem] leading-tight text-white/75 md:text-xs">
                      {copy.auto}
                    </span>
                  </motion.span>
                </div>

                <ul className="relative grid grid-rows-4 gap-2">
                  {MODEL_ORDER.map((id) => {
                    const meta = MODEL_META[id];
                    const selected = id === task.model;
                    return (
                      <li
                        key={id}
                        className={cn(
                          "relative flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-500 md:px-4",
                          selected
                            ? "border-transparent bg-blue-100"
                            : "border-black/[0.06] bg-white",
                        )}
                      >
                        {selected && (
                          <motion.span
                            layoutId="model-ring"
                            className="absolute inset-0 rounded-2xl ring-2 ring-blue-400"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                              delay: 0.5,
                            }}
                          />
                        )}
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white md:size-10">
                          <Image
                            src={meta.src}
                            alt={meta.vendor}
                            width={24}
                            height={24}
                            className="size-5 object-contain md:size-6"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-black">
                            {meta.name}
                          </span>
                          <span className="hidden truncate text-xs text-black/50 sm:block">
                            {meta.vendor}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Cost */}
          <Reveal className="min-w-0 lg:col-span-4" delay={0.1}>
            <CostCard copy={copy} active={inView} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CostCard({
  copy,
  active,
}: {
  copy: HomeV2Copy["models"];
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const bar = (width: string, delay: number) =>
    reduce
      ? { width }
      : {
          width: active ? width : "0%",
          transition: { duration: 1.4, delay, ease: EASE },
        };
  return (
    <div className="flex h-full flex-col gap-12 rounded-[2rem] bg-black p-7 text-white md:p-8">
      <div className="flex items-baseline justify-between">
        <p className="font-serif text-2xl">{copy.costTitle}</p>
        <span className="text-[0.65rem] tracking-[0.16em] text-white/40 uppercase">
          {copy.costNote}
        </span>
      </div>
      <div className="space-y-7">
        <div>
          <p className="mb-3 text-sm text-white/60">{copy.costAll}</p>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white/40"
              initial={{ width: "0%" }}
              animate={bar("100%", 0.1)}
            />
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm text-white">{copy.costRouted}</p>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-blue-400"
              initial={{ width: "0%" }}
              animate={bar("38%", 0.5)}
            />
          </div>
        </div>
      </div>
      <p className="mt-auto font-serif text-xl leading-snug text-white/90">
        {copy.costFoot}
      </p>
    </div>
  );
}

/* ───────────────────────── integrations ───────────────────────── */

function Constellation({ sector }: { sector: SectorId }) {
  const reduce = useReducedMotion();
  const nodes: Tool[] = [...SECTOR_TOOLS[sector], { name: "+" }];
  const radius = 38;
  const position = (i: number) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return {
      // Rounded so server and client render identical attribute strings.
      x: round(50 + Math.cos(angle) * radius),
      y: round(50 + Math.sin(angle) * radius),
    };
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div
        className="absolute inset-[12%] rounded-full border border-black/[0.06]"
        aria-hidden
      />
      <div
        className="absolute inset-[30%] rounded-full border border-black/[0.05]"
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
        <span
          className="absolute -inset-4 animate-ping rounded-[2rem] bg-blue-400/20 [animation-duration:2.6s]"
          aria-hidden
        />
        <Image
          src="/brand/glass-icon/wonka-glass-icon-hills-square.webp"
          alt="WonkaChat"
          width={128}
          height={128}
          className="relative size-20 rounded-[1.4rem] shadow-[0_20px_50px_-15px_rgba(14,26,22,0.6)] md:size-28 md:rounded-[1.6rem]"
        />
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
              <span className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-black/25 bg-white/60 font-serif text-2xl text-black/50 md:size-16">
                +
              </span>
            ) : (
              <ToolTile tool={tool} />
            )}
            {!isCustom && (
              <span className="hidden text-xs font-medium whitespace-nowrap text-black/70 sm:block">
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
    <section className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div
          ref={ref}
          className="mt-14 grid items-center gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {copy.sectors.map((s) => {
                const isActive = s.id === sector;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSector(s.id);
                        setPaused(true);
                      }}
                      className={cn(
                        "group w-full rounded-2xl px-4 py-3 text-left transition duration-300 lg:px-5 lg:py-3.5",
                        isActive ? "bg-light-gray" : "hover:bg-light-gray/60",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "size-1.5 shrink-0 rounded-full transition",
                            isActive ? "bg-blue-500" : "bg-black/15",
                          )}
                        />
                        <span
                          className={cn(
                            "font-serif text-lg transition-colors lg:text-2xl",
                            isActive
                              ? "text-black"
                              : "text-black/40 group-hover:text-black/70",
                          )}
                        >
                          {s.label}
                        </span>
                      </span>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 hidden pl-[1.125rem] text-sm text-black/55 lg:block"
                        >
                          {s.pitch}
                        </motion.span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Constellation sector={sector} />
            <p className="mt-4 text-center text-sm text-black/60">
              <span className="font-medium text-black">{copy.customTitle}</span>{" "}
              {copy.customBody}
            </p>
          </div>
        </div>

        <div className="bg-light-gray mt-20 rounded-[2rem] p-6 md:p-10">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-serif text-2xl text-black md:text-3xl">
              {copy.everydayTitle}
            </p>
            <span className="rounded-full bg-black px-4 py-1.5 text-sm text-white">
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

/* ───────────────────────── clients ───────────────────────── */

function Clients({
  copy,
  playing,
  onPlay,
}: {
  copy: HomeV2Copy["clients"];
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <section id="clients" className="bg-light-gray py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />
        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="flex flex-col lg:col-span-7">
            <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-black shadow-[0_40px_100px_-50px_rgba(14,26,22,0.8)]">
              {playing ? (
                <iframe
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title={copy.videoLabel}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={onPlay}
                  className="group absolute inset-0"
                  aria-label={copy.play}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                    alt=""
                    className="size-full object-cover transition duration-1000 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" />
                  <span className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl transition duration-500 group-hover:scale-110">
                    <svg
                      viewBox="0 0 12 12"
                      className="ml-1 size-5 fill-black"
                      aria-hidden
                    >
                      <path d="M3 1.5v9l7.5-4.5z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            <div className="mt-5 flex flex-col gap-1 px-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <p className="font-serif text-xl text-black md:text-2xl">
                {copy.videoQuote}
              </p>
              <p className="shrink-0 text-sm text-black/55">
                {copy.videoLabel}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5 lg:grid-rows-2">
            {copy.cases.map((c, i) => (
              <Reveal key={c.client} delay={0.1 + i * 0.1} className="h-full">
                <a
                  href={c.href}
                  className="group flex h-full flex-col justify-between gap-5 rounded-[2rem] bg-white p-7 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(14,26,22,0.35)]"
                >
                  <span className="flex items-center justify-between">
                    <Image
                      src={c.logo}
                      alt={c.client}
                      width={120}
                      height={36}
                      className="h-8 w-auto max-w-[120px] object-contain"
                    />
                    <span className="text-sm text-black/50 transition group-hover:text-black">
                      {copy.readCase} →
                    </span>
                  </span>
                  <span>
                    <span className="block font-serif text-6xl leading-none tracking-[-0.02em] text-black">
                      {c.metric}
                    </span>
                    <span className="mt-3 block max-w-sm text-base text-black/65">
                      {c.label}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── team ───────────────────────── */

function Team({
  copy,
  links,
}: {
  copy: HomeV2Copy["team"];
  links: HomeV2Links;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 50%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-light-gray px-4 pb-24 md:pb-36">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]">
        <Image
          src={`${BG}/wonka-bg-river-1920x1080.webp`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-12 lg:items-center lg:p-20">
          <div className="lg:col-span-6">
            <SectionTitle
              eyebrow={copy.eyebrow}
              title={copy.title}
              body={copy.body}
              tone="light"
            />
            <Reveal
              delay={0.1}
              className="mt-10 flex flex-col items-start gap-6"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-serif text-[5.5rem] leading-none text-white md:text-[7rem]">
                  {copy.count}
                </span>
                <span className="max-w-[11rem] text-sm leading-snug text-white/75">
                  {copy.countLabel}
                </span>
              </span>
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex -space-x-3">
                  {TEAM_PHOTOS.map((src, i) => (
                    <motion.span
                      key={src}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5, ease: EASE }}
                    >
                      <Image
                        src={src}
                        alt=""
                        width={96}
                        height={96}
                        className="size-12 rounded-full border-2 border-white/80 object-cover"
                      />
                    </motion.span>
                  ))}
                </span>
                <GhostCta href={links.meetingUrl}>{copy.cta}</GhostCta>
                <a
                  href={links.teamUrl}
                  className="text-sm text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  {copy.pageCta} →
                </a>
              </div>
            </Reveal>
          </div>

          <div ref={lineRef} className="relative lg:col-span-5 lg:col-start-8">
            <ol className="space-y-4">
              {copy.steps.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={0.12 * i}>
                    <div className="relative flex items-start gap-5 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                      {i < copy.steps.length - 1 && (
                        // Runs from this circle's centre to the next one: card padding (1.25rem) + half circle (1.125rem).
                        <motion.span
                          className="absolute top-[2.375rem] left-[2.375rem] h-[calc(100%+1rem)] w-px origin-top bg-blue-400"
                          style={{ scaleY: lineScale }}
                          aria-hidden
                        />
                      )}
                      <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-white font-serif text-sm text-black">
                        {i + 1}
                      </span>
                      <div className="pt-1">
                        <p className="font-serif text-xl leading-tight text-white">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm text-white/70">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
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
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />
          <Reveal>
            <a
              href={links.securityUrl}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm text-black transition hover:border-black/40"
            >
              {copy.cta} <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {copy.tiles.map((tile, i) => (
            <Reveal key={tile.id} delay={0.06 * i}>
              <a
                href={links.securityUrl}
                className="group bg-light-gray flex h-full flex-col items-center gap-4 rounded-3xl px-4 py-8 text-center transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(14,26,22,0.4)]"
              >
                <span className="transition duration-500 group-hover:scale-105">
                  <SecurityVisual id={tile.id} />
                </span>
                <span className="text-sm font-medium text-black">
                  {tile.label}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
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
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale }}
      >
        <Image
          src={`${BG}/wonka-bg-snowy-mountain-1920x1080.webp`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/60" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center gap-7 px-4 py-28 text-center">
        <Reveal>
          <h2 className="font-serif text-[2.6rem] leading-[1.02] text-white md:text-[4.4rem]">
            {copy.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-white/85 md:text-lg">{copy.subtitle}</p>
        </Reveal>
        <Reveal delay={0.16} className="flex flex-col gap-3 sm:flex-row">
          <PrimaryCta href={TRIAL_URL} tone="light">
            {hero.primaryCta}
          </PrimaryCta>
          <GhostCta href={links.meetingUrl}>{hero.secondaryCta}</GhostCta>
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
  const [playing, setPlaying] = useState(false);
  const watchClient = () => {
    setPlaying(true);
    document
      .getElementById("clients")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="bg-white text-black">
      <Hero
        copy={copy.hero}
        award={copy.award}
        links={links}
        locale={locale}
        onWatch={watchClient}
      />
      <TrustBand label={copy.hero.trustedBy} />
      <Platform copy={copy.platform} locale={locale} />
      <Models copy={copy.models} />
      <Integrations copy={copy.integrations} />
      <Clients
        copy={copy.clients}
        playing={playing}
        onPlay={() => setPlaying(true)}
      />
      <Team copy={copy.team} links={links} />
      <Security copy={copy.security} links={links} />
      <FinalCta copy={copy.finalCta} hero={copy.hero} links={links} />
    </main>
  );
}
