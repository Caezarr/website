"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import { cn } from "@/lib/utils";
import type { HomeV2Copy } from "@/views/copy/home-v2";

const TRIAL_URL = "https://wonka.chat/register";
const AWARD_URL = "https://www.startupawards.be/belgium-startup-awards-winners-2026";
const YOUTUBE_ID = "Qv_65poIhig";
const BG = "/brand/backgrounds/16x9";

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

const EVERYDAY_TOOLS = [
  ["outlook-mail.jpg", "Outlook"],
  ["gmail.svg", "Gmail"],
  ["onedrive.svg", "OneDrive"],
  ["google-drive.png", "Google Drive"],
  ["slack.svg", "Slack"],
  ["notion.svg", "Notion"],
  ["hubspot.svg", "HubSpot"],
  ["salesforce.svg", "Salesforce"],
  ["jira.svg", "Jira"],
  ["google-sheets.png", "Google Sheets"],
  ["power-bi.svg", "Power BI"],
  ["zendesk.svg", "Zendesk"],
  ["asana.svg", "Asana"],
  ["monday-com.png", "monday.com"],
  ["stripe.webp", "Stripe"],
  ["shopify.jpg", "Shopify"],
  ["linkedin.svg", "LinkedIn"],
  ["zoom.svg", "Zoom"],
  ["confluence.svg", "Confluence"],
  ["dynamics-365.png", "Dynamics 365"],
].map(([file, name]) => ({ src: `/images/mcp-integrations/${file}`, name }));

type SectorTool = { name: string; src?: string };

const SECTOR_TOOLS: Record<string, SectorTool[]> = {
  finance: [
    { name: "Odoo", src: "/images/visual/odoo.png" },
    { name: "Horus" },
    { name: "QuickBooks" },
    { name: "Zoho Books" },
    { name: "Stripe", src: "/images/mcp-integrations/stripe.webp" },
    { name: "Acerta", src: "/images/visual/acerta.svg" },
  ],
  construction: [
    { name: "Sage", src: "/images/btp-integrations/sage.png" },
    { name: "Obat", src: "/images/btp-integrations/obat-wordmark.png" },
    { name: "ProGBat", src: "/images/btp-integrations/progbat-wordmark.png" },
    { name: "Costructor", src: "/images/btp-integrations/costructor.png" },
    { name: "Graneet", src: "/images/btp-integrations/graneet.png" },
    { name: "Stafiz" },
  ],
  hospitality: [
    { name: "Hostaway" },
    { name: "Breezeway" },
    { name: "Odoo", src: "/images/visual/odoo.png" },
    { name: "WhatsApp", src: "/images/mcp-integrations/whatsapp.webp" },
  ],
  sales: [
    { name: "Pipedrive" },
    { name: "HubSpot", src: "/images/mcp-integrations/hubspot.svg" },
    { name: "Salesforce", src: "/images/mcp-integrations/salesforce.svg" },
    { name: "Instagram" },
    { name: "Facebook" },
    { name: "Meta Ads", src: "/images/mcp-integrations/meta-ads.jpg" },
  ],
};

export interface HomeV2Links {
  meetingUrl: string;
  securityUrl: string;
}

/* ───────────────────────── shared bits ───────────────────────── */

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "type-eyebrow text-xs uppercase tracking-[0.18em]",
        light ? "text-white/75" : "text-text/55",
      )}
    >
      {children}
    </p>
  );
}

function PrimaryCta({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#0E1A16] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-black"
    >
      {children}
    </a>
  );
}

function SecondaryCta({
  children,
  href,
  light,
}: {
  children: React.ReactNode;
  href: string;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium backdrop-blur-md transition hover:-translate-y-0.5",
        light
          ? "border-white/50 bg-white/15 text-white hover:bg-white/25"
          : "border-[#0E1A16]/20 bg-white/60 text-[#0E1A16] hover:bg-white",
      )}
    >
      {children}
    </a>
  );
}

function Glass({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/40 bg-white/70 shadow-2xl shadow-black/15 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
      <span className="size-2.5 rounded-full bg-[#0E1A16]/15" />
      <span className="size-2.5 rounded-full bg-[#0E1A16]/15" />
      <span className="size-2.5 rounded-full bg-[#0E1A16]/15" />
      <span className="ml-2 truncate text-xs text-[#0E1A16]/60">{title}</span>
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function useTypewriter(text: string, active: boolean, speed = 38) {
  const reduce = useReducedMotion();
  // Callers remount the component (via `key`) to replay, so the count only grows.
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || reduce) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed, reduce]);
  const shown = reduce ? text.length : count;
  return { typed: text.slice(0, shown), done: shown >= text.length };
}

/* ───────────────────────── award ───────────────────────── */

function AwardTag({ copy }: { copy: HomeV2Copy["award"] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={AWARD_URL}
        target="_blank"
        rel="noopener noreferrer"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="award-marble-badge group relative flex items-center gap-2 overflow-hidden rounded-full border border-[#c9962c]/75 px-4 py-1.5 text-white backdrop-blur-md transition hover:scale-[1.03]"
        style={{ animation: "award-glow 3s ease-in-out infinite" }}
      >
        <CrownIcon />
        <span className="relative z-10 h-4 w-px bg-gradient-to-b from-transparent via-[#d7a23c]/80 to-transparent" />
        <span className="relative z-10 text-[0.68rem] font-medium uppercase tracking-[0.14em] md:text-xs">
          {copy.label}
        </span>
        <span className="relative z-10 text-[#e8c477] transition group-hover:translate-x-0.5">→</span>
      </a>
      <AnimatePresence>
        {open && (
          <motion.a
            href={AWARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-30 mt-3 hidden w-[min(90vw,32rem)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/30 md:block"
          >
            <Image
              src="/images/awards/belgium-startup-awards-2026.png"
              alt={copy.label}
              width={1300}
              height={300}
              className="h-auto w-full"
            />
            <span className="block bg-[#0E1A16] px-4 py-2 text-center text-xs text-white/80">
              {copy.cta} →
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 16" className="relative z-10 h-3.5 w-5" fill="none" aria-hidden>
      <path
        d="M2 14 L3 3 L8 9 L12 2 L16 9 L21 3 L22 14 Z"
        stroke="#e8c477"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ───────────────────────── hero ───────────────────────── */

function HeroDemo({ copy }: { copy: HomeV2Copy["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [cycle, setCycle] = useState(0);
  return (
    <div ref={ref}>
      <HeroDemoLoop
        key={cycle}
        copy={copy}
        active={inView}
        onDone={() => setCycle((c) => c + 1)}
      />
    </div>
  );
}

function HeroDemoLoop({
  copy,
  active,
  onDone,
}: {
  copy: HomeV2Copy["hero"];
  active: boolean;
  onDone: () => void;
}) {
  const { typed, done } = useTypewriter(copy.demoPrompt, active, 34);

  useEffect(() => {
    if (!done || !active) return;
    const id = window.setTimeout(onDone, 4200);
    return () => window.clearTimeout(id);
  }, [done, active, onDone]);

  return (
    <div>
      <Glass className="mx-auto w-full max-w-xl text-left">
        <WindowChrome title="WonkaChat" />
        <div className="space-y-4 p-5">
          <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#0E1A16]">
            {typed}
            {!done && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[#0E1A16] align-middle" />}
          </div>
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-2xl bg-[#CADBFD]/60 p-4"
              >
                <Image
                  src="/brand/glass-icon/wonka-glass-icon-hills-square.webp"
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#0E1A16]">{copy.demoAgentName}</p>
                  <p className="truncate text-xs text-[#0E1A16]/60">{copy.demoAgentTools}</p>
                </div>
                <span className="rounded-full bg-[#5C7F5D] px-3 py-1 text-xs text-white">
                  ✓ {copy.demoStatus}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Glass>
    </div>
  );
}

function LogoMarquee({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="w-full">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.18em] text-white/80">{label}</p>
      <div className="relative overflow-hidden rounded-2xl bg-white/85 py-4 backdrop-blur-md [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex w-max items-center gap-12 px-6"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {logos.map((logo, i) => (
            <Image
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={36}
              className="h-7 w-auto max-w-[120px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Hero({
  copy,
  award,
  links,
  onPlay,
}: {
  copy: HomeV2Copy["hero"];
  award: HomeV2Copy["award"];
  links: HomeV2Links;
  onPlay: () => void;
}) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={`${BG}/wonka-bg-hills-1920x1080.webp`}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/30" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-14 pt-32 text-center md:pt-40">
        <FadeUp>
          <AwardTag copy={award} />
        </FadeUp>
        <FadeUp delay={0.05}>
          <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.05] text-white md:text-6xl">
            {copy.title}
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto max-w-2xl text-base text-white/90 md:text-lg">{copy.subtitle}</p>
        </FadeUp>
        <FadeUp delay={0.15} className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryCta href={TRIAL_URL}>{copy.primaryCta}</PrimaryCta>
            <SecondaryCta href={links.meetingUrl} light>
              {copy.secondaryCta}
            </SecondaryCta>
          </div>
          <button
            type="button"
            onClick={onPlay}
            className="inline-flex items-center gap-2 text-sm text-white/90 underline-offset-4 hover:underline"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-white/25 backdrop-blur">▶</span>
            {copy.videoCta}
          </button>
        </FadeUp>
        <FadeUp delay={0.25} className="w-full">
          <HeroDemo copy={copy} />
        </FadeUp>
        <FadeUp delay={0.3} className="w-full">
          <LogoMarquee label={copy.trustedBy} />
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────── results ───────────────────────── */

function Results({ copy }: { copy: HomeV2Copy["results"] }) {
  return (
    <section className="bg-[#F7F7F7] px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="mb-10 space-y-3">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl text-[#0E1A16] md:text-5xl">{copy.title}</h2>
        </FadeUp>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.items.map((item, i) => (
            <FadeUp key={item.client} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
                <p className="font-serif text-5xl text-[#0E1A16] md:text-6xl">{item.metric}</p>
                <div className="space-y-2">
                  <p className="text-base text-[#0E1A16]/80">{item.label}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#5C7F5D]">{item.client}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── how it works (pinned) ───────────────────────── */

function DescribeMock({ mock, active }: { mock: HomeV2Copy["how"]["mock"]; active: boolean }) {
  const { typed, done } = useTypewriter(mock.describePrompt, active, 30);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#0E1A16]">
        {typed}
        {!done && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[#0E1A16] align-middle" />}
      </div>
      <div className="space-y-2">
        {mock.fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -10 }}
            animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: i * 0.25, duration: 0.4 }}
            className="flex items-center justify-between gap-4 rounded-xl bg-[#CADBFD]/45 px-4 py-2.5 text-sm"
          >
            <span className="text-[#0E1A16]/55">{f.label}</span>
            <span className="truncate font-medium text-[#0E1A16]">{f.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConnectMock({ mock, active }: { mock: HomeV2Copy["how"]["mock"]; active: boolean }) {
  const tools = [
    { name: "Outlook", src: "/images/visual/outlook.svg" },
    { name: "Odoo", src: "/images/visual/odoo.png" },
    { name: "SharePoint", src: "/images/visual/sharepoint.svg" },
  ];
  const [connected, setConnected] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setConnected((c) => Math.min(c + 1, tools.length)), 700);
    return () => window.clearInterval(id);
  }, [active, tools.length]);
  return (
    <div className="space-y-3">
      {tools.map((t, i) => {
        const on = i < connected;
        return (
          <div key={t.name} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3">
            <Image src={t.src} alt={t.name} width={32} height={32} className="size-8 object-contain" />
            <span className="flex-1 text-sm font-medium text-[#0E1A16]">{t.name}</span>
            <motion.span
              layout
              className={cn(
                "rounded-full px-3 py-1 text-xs transition-colors",
                on ? "bg-[#5C7F5D] text-white" : "border border-black/15 text-[#0E1A16]/70",
              )}
            >
              {on ? `✓ ${mock.connected}` : mock.connect}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

const MODELS = ["GPT", "Claude", "Gemini", "Mistral"];

function ModelMock({ mock, active }: { mock: HomeV2Copy["how"]["mock"]; active: boolean }) {
  const [taskIndex, setTaskIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setTaskIndex((i) => (i + 1) % mock.modelTasks.length), 1800);
    return () => window.clearInterval(id);
  }, [active, mock.modelTasks.length]);
  const current = mock.modelTasks[taskIndex];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.task}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-[#0E1A16]"
          >
            {current.task}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-[#0E1A16]/50">→</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {MODELS.map((m) => {
          const selected = m === current.model;
          return (
            <motion.div
              key={m}
              animate={{ scale: selected ? 1.03 : 1 }}
              className={cn(
                "relative rounded-2xl border p-3 text-sm transition-colors",
                selected
                  ? "border-[#75A3FD] bg-[#CADBFD]/70 text-[#0E1A16]"
                  : "border-black/5 bg-white text-[#0E1A16]/60",
              )}
            >
              <span className="font-medium">{m}</span>
              {m === "Mistral" && (
                <span className="mt-1 block text-[0.65rem] uppercase tracking-wider text-[#5C7F5D]">
                  {mock.modelEu}
                </span>
              )}
              {selected && (
                <motion.span
                  layoutId="model-check"
                  className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-[#75A3FD] text-[0.6rem] text-white"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ShareMock({ mock, active }: { mock: HomeV2Copy["how"]["mock"]; active: boolean }) {
  const portraits = [1, 2, 3, 4, 5].map((n) => `/images/visual/portrait-${n}.png`);
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-[#0E1A16]">{mock.shareTitle}</p>
      <div className="space-y-2">
        {mock.shareTeams.map((team, i) => (
          <motion.div
            key={team}
            initial={{ opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.2 + i * 0.35 }}
            className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-2.5"
          >
            <span className="text-sm text-[#0E1A16]">{team}</span>
            <span className="flex -space-x-2">
              {portraits.slice(i, i + 3).map((p) => (
                <Image key={p} src={p} alt="" width={28} height={28} className="size-7 rounded-full border-2 border-white object-cover" />
              ))}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks({ copy }: { copy: HomeV2Copy["how"] }) {
  const [active, setActive] = useState(0);
  const mocks = [DescribeMock, ConnectMock, ModelMock, ShareMock];
  const ActiveMock = mocks[active];

  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${BG}/wonka-bg-wheatfield-1920x1080.webp)` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <FadeUp className="mb-12 max-w-3xl space-y-3">
          <Eyebrow light>{copy.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl text-white md:text-5xl">{copy.title}</h2>
        </FadeUp>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6 md:space-y-[30vh] md:pb-[20vh]">
            {copy.steps.map((step, i) => (
              <Step key={step.title} index={i} active={active === i} onEnter={() => setActive(i)}>
                <Glass className={cn("p-6 transition", active === i ? "bg-white/85" : "bg-white/55")}>
                  <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#5C7F5D]">0{i + 1}</p>
                  <h3 className="mb-2 font-serif text-2xl text-[#0E1A16]">{step.title}</h3>
                  <p className="text-sm text-[#0E1A16]/75 md:text-base">{step.body}</p>
                  {/* Mobile: the mock sits under its step since nothing is pinned. */}
                  <div className="mt-5 md:hidden">
                    {(() => {
                      const Mock = mocks[i];
                      return <Mock mock={copy.mock} active />;
                    })()}
                  </div>
                </Glass>
              </Step>
            ))}
            <p className="text-sm text-white/90">✓ {copy.humanNote}</p>
          </div>
          <div className="hidden md:block">
            <div className="sticky top-28">
              <Glass>
                <WindowChrome title={copy.steps[active].title} />
                <div className="min-h-[300px] p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                    >
                      <ActiveMock mock={copy.mock} active />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Glass>
              <div className="mt-4 flex justify-center gap-2">
                {copy.steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={cn("h-1.5 rounded-full transition-all", i === active ? "w-8 bg-white" : "w-3 bg-white/50")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  children,
  onEnter,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);
  return <div ref={ref}>{children}</div>;
}

/* ───────────────────────── integrations ───────────────────────── */

function ToolChip({ tool }: { tool: SectorTool }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
      {tool.src ? (
        <Image src={tool.src} alt="" width={28} height={28} className="size-7 object-contain" />
      ) : (
        <span className="flex size-7 items-center justify-center rounded-lg bg-[#CADBFD] text-xs font-semibold text-[#0E1A16]">
          {tool.name.slice(0, 1)}
        </span>
      )}
      <span className="text-sm font-medium text-[#0E1A16]">{tool.name}</span>
    </div>
  );
}

function Integrations({ copy }: { copy: HomeV2Copy["integrations"] }) {
  const reduce = useReducedMotion();
  const [sector, setSector] = useState(copy.sectors[0].id);
  const row = [...EVERYDAY_TOOLS, ...EVERYDAY_TOOLS];

  return (
    <section className="relative overflow-hidden">
      <Image src={`${BG}/wonka-bg-river-1920x1080.webp`} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <FadeUp className="mb-10 max-w-3xl space-y-3">
          <Eyebrow light>{copy.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl text-white md:text-5xl">{copy.title}</h2>
          <p className="text-white/85">{copy.subtitle}</p>
        </FadeUp>

        <FadeUp>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-white/80">{copy.everydayLabel}</p>
          <div className="mb-12 overflow-hidden rounded-3xl bg-white/80 py-5 backdrop-blur-md [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <motion.div
              className="flex w-max gap-6 px-6"
              animate={reduce ? undefined : { x: ["-50%", "0%"] }}
              transition={{ duration: 50, ease: "linear", repeat: Infinity }}
            >
              {row.map((t, i) => (
                <div key={`${t.name}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
                  <Image src={t.src} alt="" width={28} height={28} className="size-7 rounded-md object-contain" />
                  <span className="text-sm text-[#0E1A16]/80">{t.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </FadeUp>

        <FadeUp>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-white/80">{copy.sectorLabel}</p>
          <Glass className="p-5 md:p-8">
            <div className="mb-6 flex flex-wrap gap-2" role="tablist">
              {copy.sectors.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={sector === s.id}
                  onClick={() => setSector(s.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition",
                    sector === s.id ? "bg-[#0E1A16] text-white" : "bg-white text-[#0E1A16]/70 hover:text-[#0E1A16]",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={sector}
                className="grid grid-cols-2 gap-3 md:grid-cols-3"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
              >
                {SECTOR_TOOLS[sector].map((tool) => (
                  <motion.div
                    key={tool.name}
                    variants={{
                      hidden: { opacity: 0, x: -24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <ToolChip tool={tool} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex flex-col gap-1 rounded-2xl border border-dashed border-[#5C7F5D]/50 bg-[#5C7F5D]/10 p-5 md:flex-row md:items-center md:gap-4">
              <p className="font-serif text-lg text-[#0E1A16]">{copy.customTitle}</p>
              <p className="text-sm text-[#0E1A16]/75">{copy.customBody}</p>
            </div>
          </Glass>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────── team ───────────────────────── */

function Team({ copy, links }: { copy: HomeV2Copy["team"]; links: HomeV2Links }) {
  const portraits = [1, 2, 3, 4, 5].map((n) => `/images/visual/portrait-${n}.png`);
  return (
    <section className="bg-[#F7F7F7] px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <FadeUp className="space-y-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl text-[#0E1A16] md:text-5xl">{copy.title}</h2>
          <p className="text-[#0E1A16]/75 md:text-lg">{copy.subtitle}</p>
          <div className="flex -space-x-3 pt-2">
            {portraits.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image src={p} alt="" width={56} height={56} className="size-14 rounded-full border-4 border-[#F7F7F7] object-cover" />
              </motion.div>
            ))}
            <span className="flex size-14 items-center justify-center rounded-full border-4 border-[#F7F7F7] bg-[#0E1A16] text-sm font-medium text-white">
              +30
            </span>
          </div>
          <div className="pt-2">
            <SecondaryCta href={links.meetingUrl}>{copy.cta}</SecondaryCta>
          </div>
        </FadeUp>
        <div className="relative space-y-4">
          <div className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-[#5C7F5D]/30" aria-hidden />
          {copy.steps.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.12}>
              <div className="relative flex gap-5 rounded-3xl bg-white p-5 shadow-sm">
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#5C7F5D] font-serif text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#0E1A16]">{step.title}</h3>
                  <p className="text-sm text-[#0E1A16]/70">{step.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── video ───────────────────────── */

function VideoSection({
  copy,
  playing,
  onPlay,
}: {
  copy: HomeV2Copy["video"];
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <section id="video" className="relative overflow-hidden">
      <Image src={`${BG}/wonka-bg-waterfall-1920x1080.webp`} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
        <FadeUp className="mb-10 space-y-3 text-center">
          <Eyebrow light>{copy.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl text-white md:text-5xl">{copy.title}</h2>
          <p className="text-white/85">{copy.body}</p>
        </FadeUp>
        <FadeUp>
          <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/20">
            {playing ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title={copy.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button type="button" onClick={onPlay} className="group absolute inset-0" aria-label={copy.play}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt=""
                  className="size-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#0E1A16] shadow-xl transition group-hover:scale-110">
                  ▶
                </span>
              </button>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────── security ───────────────────────── */

function Security({ copy, links }: { copy: HomeV2Copy["security"]; links: HomeV2Links }) {
  return (
    <section className="relative overflow-hidden">
      <Image src={`${BG}/wonka-bg-mountain-range-1920x1080.webp`} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <FadeUp className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <Eyebrow light>{copy.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-white md:text-5xl">{copy.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <BadgeIso className="size-16" />
            <BadgeGdpr className="size-16" />
            <BadgeNis2 className="size-16" />
          </div>
        </FadeUp>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.columns.map((col, i) => (
            <FadeUp key={col.title} delay={i * 0.08}>
              <Glass className="h-full p-6">
                <h3 className="mb-4 font-serif text-xl text-[#0E1A16]">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#0E1A16]/80">
                      <span className="text-[#5C7F5D]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Glass>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-white/90">{copy.models}</p>
          <a href={links.securityUrl} className="text-sm text-white underline underline-offset-4">
            {copy.cta} →
          </a>
        </FadeUp>
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
    <section className="relative overflow-hidden">
      <Image src={`${BG}/wonka-bg-snowy-mountain-1920x1080.webp`} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/45" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <FadeUp>
          <h2 className="font-serif text-4xl text-white md:text-6xl">{copy.title}</h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="text-white/90 md:text-lg">{copy.subtitle}</p>
        </FadeUp>
        <FadeUp delay={0.15} className="flex flex-col gap-3 sm:flex-row">
          <PrimaryCta href={TRIAL_URL}>{hero.primaryCta}</PrimaryCta>
          <SecondaryCta href={links.meetingUrl} light>
            {hero.secondaryCta}
          </SecondaryCta>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────── page ───────────────────────── */

export function HomeV2Client({ copy, links }: { copy: HomeV2Copy; links: HomeV2Links }) {
  const [playing, setPlaying] = useState(false);
  const playFromHero = () => {
    setPlaying(true);
    document.getElementById("video")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="bg-[#F7F7F7] text-[#0E1A16]">
      <Hero copy={copy.hero} award={copy.award} links={links} onPlay={playFromHero} />
      <Results copy={copy.results} />
      <HowItWorks copy={copy.how} />
      <Integrations copy={copy.integrations} />
      <Team copy={copy.team} links={links} />
      <VideoSection copy={copy.video} playing={playing} onPlay={() => setPlaying(true)} />
      <Security copy={copy.security} links={links} />
      <FinalCta copy={copy.finalCta} hero={copy.hero} links={links} />
    </main>
  );
}
