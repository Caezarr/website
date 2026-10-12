"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Clients,
  Integrations,
} from "@/components/pages/home-v2/home-v2-client";
import { HomeV2PlatformStack } from "@/components/sections/home-v2-platform-stack";
import { HomeSecurityBanner } from "@/components/sections/home-security-banner";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BulletIcon } from "@/components/ui/icons/bullet";
import { HOME_LOGO_BASE } from "@/lib/home-integration-tools";
import { cn } from "@/lib/utils";
import type { HomeV2Copy } from "@/views/copy/home-v2";
import {
  ADS_PRICING,
  type AdsLandingCopy,
  type AdsLandingLogo,
  type AdsLandingSlug,
} from "@/views/copy/ads-landings";

const TRIAL_URL = "https://wonka.chat/register";
const BG = "/brand/backgrounds/16x9";
const EASE = [0.22, 1, 0.36, 1] as const;

const LOGOS: Record<AdsLandingLogo, { src: string; name: string }> = {
  openai: { src: `${HOME_LOGO_BASE}/model-openai.svg`, name: "OpenAI GPT" },
  claude: { src: `${HOME_LOGO_BASE}/model-claude.svg`, name: "Claude" },
  mistral: { src: `${HOME_LOGO_BASE}/model-mistral.png`, name: "Mistral" },
  gemini: { src: `${HOME_LOGO_BASE}/model-gemini.png`, name: "Gemini" },
  odoo: { src: `${HOME_LOGO_BASE}/odoo.svg`, name: "Odoo" },
  outlook: { src: `${HOME_LOGO_BASE}/outlook.svg`, name: "Outlook" },
  teams: { src: `${HOME_LOGO_BASE}/teams.svg`, name: "Teams" },
  sharepoint: { src: `${HOME_LOGO_BASE}/sharepoint.svg`, name: "SharePoint" },
  hubspot: { src: `${HOME_LOGO_BASE}/hubspot.svg`, name: "HubSpot" },
  salesforce: { src: `${HOME_LOGO_BASE}/salesforce.svg`, name: "Salesforce" },
};

export interface AdsLandingLinks {
  meetingUrl: string;
  securityUrl: string;
  pricingUrl: string;
}

/** Shared copy reused from the homepage (platform films, security, proof). */
export type AdsLandingSharedCopy = Pick<
  HomeV2Copy,
  "platform" | "security" | "clients" | "integrations"
>;

function Reveal({
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
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <Reveal className="flex max-w-3xl flex-col items-start gap-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-text font-serif text-[2.4rem] leading-[1.04] tracking-[-0.01em] md:text-[3.4rem]">
        {title}
      </h2>
      {body && <p className="type-paragraph-l text-text/70 max-w-2xl">{body}</p>}
    </Reveal>
  );
}

/** Trial + booking pair. `data-track` feeds the CTA click events in AnalyticsProvider. */
function CtaPair({
  primary,
  secondary,
  meetingUrl,
  center,
}: {
  primary: string;
  secondary: string;
  meetingUrl: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        center && "justify-center",
      )}
    >
      <ButtonLink href={TRIAL_URL} variant="primary" data-track="trial">
        {primary}
      </ButtonLink>
      <ButtonLink
        href={meetingUrl}
        variant="primaryOutline"
        data-track="meeting"
        data-meeting-type="ads-landing"
      >
        {secondary}
      </ButtonLink>
    </div>
  );
}

function Reassurance({ items, center }: { items: string[]; center?: boolean }) {
  return (
    <ul
      className={cn(
        "type-paragraph-s text-text/75 flex flex-wrap gap-x-5 gap-y-2",
        center && "justify-center",
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <BulletIcon className="text-accent h-[0.625rem] w-[0.4375rem] shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ───────────────────────── hero ───────────────────────── */

function Hero({
  copy,
  meetingUrl,
}: {
  copy: AdsLandingCopy["hero"];
  meetingUrl: string;
}) {
  return (
    <section
      id="lp-hero"
      data-theme="dark"
      className="bg-background text-text relative isolate flex min-h-[92svh] w-full flex-col overflow-hidden"
    >
      <Image
        src={`${BG}/wonka-bg-hills-1920x1080.webp`}
        alt=""
        fill
        priority
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="from-background/50 via-background/20 to-background/60 absolute inset-0 -z-10 bg-gradient-to-b" />

      <div className="flex flex-1 items-center justify-center px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
          <Reveal>
            <span className="type-eyebrow border-text/30 bg-background/30 text-text rounded-full border px-4 py-1.5 backdrop-blur-md">
              {copy.tag}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-text font-serif text-[2.5rem] leading-[1.03] tracking-[-0.015em] text-balance md:text-[4.2rem]">
              {copy.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body text-text/90 max-w-[40rem]">{copy.subtitle}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-2 flex flex-col items-center gap-5">
            <CtaPair
              primary={copy.primaryCta}
              secondary={copy.secondaryCta}
              meetingUrl={meetingUrl}
              center
            />
            <Reassurance items={copy.reassurance} center />
          </Reveal>
          <Reveal delay={0.32} className="mt-4">
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {copy.logos.map((id) => (
                <li
                  key={id}
                  className="flex size-12 items-center justify-center rounded-sm border border-white/20 bg-white md:size-14"
                  title={LOGOS[id].name}
                >
                  <Image
                    src={LOGOS[id].src}
                    alt={LOGOS[id].name}
                    width={40}
                    height={40}
                    className="size-6 object-contain md:size-7"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── prompts ───────────────────────── */

function Prompts({ copy }: { copy: AdsLandingCopy["prompts"] }) {
  return (
    <section id="lp-prompts" className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, i) => (
            <li key={item.ask}>
              <Reveal
                delay={0.06 * i}
                className="border-border flex h-full flex-col gap-4 rounded-sm border border-dashed p-6"
              >
                <span className="type-eyebrow text-accent">{item.tool}</span>
                <p className="type-paragraph-m-bold text-text bg-light-gray self-start rounded-sm px-4 py-3">
                  « {item.ask} »
                </p>
                <p className="type-paragraph-m text-text/70 mt-auto">
                  → {item.result}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── fit ───────────────────────── */

function Fit({ copy }: { copy: AdsLandingCopy["fit"] }) {
  const columns = [
    { data: copy.left, highlight: false },
    { data: copy.right, highlight: true },
  ];
  return (
    <section id="lp-fit" className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {columns.map(({ data, highlight }, i) => (
            <Reveal
              key={data.title}
              delay={0.08 * i}
              className={cn(
                "flex flex-col gap-5 rounded-sm p-7 md:p-9",
                highlight
                  ? "bg-blue-900 text-white"
                  : "border-border border border-dashed",
              )}
            >
              <p className={cn("type-h5", highlight ? "text-white" : "text-text")}>
                {data.title}
              </p>
              <ul className="flex flex-col gap-3">
                {data.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <BulletIcon
                      className={cn(
                        "mt-[0.45rem] h-[0.625rem] w-[0.4375rem] shrink-0",
                        highlight ? "text-blue-200" : "text-accent-dark/50",
                      )}
                    />
                    <span
                      className={cn(
                        "type-paragraph-m",
                        highlight ? "text-white/90" : "text-text/75",
                      )}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        {copy.note && (
          <Reveal className="mt-6">
            <p className="type-paragraph-m text-text/70">{copy.note}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── steps ───────────────────────── */

function Steps({ copy }: { copy: AdsLandingCopy["steps"] }) {
  return (
    <section id="lp-steps" className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />
        <ol className="border-border md:divide-border mt-12 grid border-y border-dashed md:grid-cols-3 md:divide-x md:divide-dashed">
          {copy.items.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "flex flex-col gap-4 py-8 md:px-8 md:py-10",
                i > 0 && "border-border border-t border-dashed md:border-t-0",
                i === 0 && "md:pl-0",
              )}
            >
              <Reveal delay={0.1 * i} className="flex flex-col gap-4">
                <span className="type-eyebrow text-accent tabular-nums">0{i + 1}</span>
                <p className="type-h5 text-text">{step.title}</p>
                <p className="type-paragraph-m text-text/70">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── pricing ───────────────────────── */

function Pricing({
  copy,
  links,
}: {
  copy: AdsLandingCopy["hero"];
  links: AdsLandingLinks;
}) {
  const p = ADS_PRICING;
  return (
    <section id="lp-pricing" className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={p.eyebrow} title={p.title} />
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          <Reveal className="bg-mid-gray flex flex-col gap-6 rounded-sm p-7 md:p-10 lg:col-span-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-text font-serif text-6xl leading-none lining-nums md:text-7xl">
                {p.price}
              </span>
              <span className="type-paragraph-m text-text/70">{p.unit}</span>
            </div>
            <p className="type-paragraph-s text-text/60">{p.note}</p>
            <ul className="flex flex-col gap-3">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <BulletIcon className="text-accent-dark mt-[0.45rem] h-[0.625rem] w-[0.4375rem] shrink-0" />
                  <span className="type-paragraph-m text-text/80">{b}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={links.pricingUrl} variant="underline" className="self-start">
              {p.detailsCta}
            </ButtonLink>
          </Reveal>
          <Reveal
            delay={0.08}
            className="border-border flex flex-col justify-between gap-6 rounded-sm border border-dashed p-7 md:p-10 lg:col-span-2"
          >
            <div className="flex flex-col gap-3">
              <p className="type-h5 text-text">{p.trialTitle}</p>
              <p className="type-paragraph-m text-text/70">{p.trialBody}</p>
            </div>
            <CtaPair
              primary={copy.primaryCta}
              secondary={copy.secondaryCta}
              meetingUrl={links.meetingUrl}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

function Faq({ items }: { items: AdsLandingCopy["faq"] }) {
  return (
    <section id="lp-faq" className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <SectionTitle eyebrow="Questions fréquentes" title="Ce qu'on nous demande avant de commencer." />
        <div className="border-border mt-10 border-t border-dashed">
          {items.map((item) => (
            <details key={item.q} className="group border-border border-b border-dashed">
              <summary className="type-h6 text-text flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                {item.q}
                <span
                  aria-hidden
                  className="text-text/50 font-serif text-2xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="type-paragraph-m text-text/70 pb-6">{item.a}</p>
            </details>
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
  meetingUrl,
}: {
  copy: AdsLandingCopy["finalCta"];
  hero: AdsLandingCopy["hero"];
  meetingUrl: string;
}) {
  return (
    <section
      id="lp-final"
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
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-7 px-6 py-28 text-center">
        <Reveal>
          <h2 className="text-text font-serif text-[2.4rem] leading-[1.03] text-balance md:text-[4rem]">
            {copy.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="type-body text-text/85 max-w-2xl">{copy.subtitle}</p>
        </Reveal>
        <Reveal delay={0.16} className="flex flex-col items-center gap-5">
          <CtaPair
            primary={hero.primaryCta}
            secondary={hero.secondaryCta}
            meetingUrl={meetingUrl}
            center
          />
          <Reassurance items={hero.reassurance} center />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── sticky mobile CTA ───────────────────────── */

function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      id="lp-sticky"
      className={cn(
        "border-border bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 backdrop-blur transition-transform md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <ButtonLink href={TRIAL_URL} variant="primary" data-track="trial" className="w-full">
        {label}
      </ButtonLink>
    </div>
  );
}

/* ───────────────────────── page ───────────────────────── */

export function AdsLandingClient({
  slug,
  copy,
  shared,
  links,
}: {
  slug: AdsLandingSlug;
  copy: AdsLandingCopy;
  shared: AdsLandingSharedCopy;
  links: AdsLandingLinks;
}) {
  return (
    <main data-landing={slug} className="bg-background text-text">
      <Hero copy={copy.hero} meetingUrl={links.meetingUrl} />
      <Prompts copy={copy.prompts} />
      <HomeV2PlatformStack copy={shared.platform} locale="fr" />
      <Fit copy={copy.fit} />
      <Integrations copy={shared.integrations} locale="fr" />
      <Steps copy={copy.steps} />
      <Pricing copy={copy.hero} links={links} />
      <HomeSecurityBanner data={shared.security} securityUrl={links.securityUrl} />
      <Clients copy={shared.clients} />
      <Faq items={copy.faq} />
      <FinalCta copy={copy.finalCta} hero={copy.hero} meetingUrl={links.meetingUrl} />
      <StickyCta label={copy.hero.primaryCta} />
    </main>
  );
}
