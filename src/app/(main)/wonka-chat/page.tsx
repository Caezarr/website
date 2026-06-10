import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema, SoftwareAppSchema } from "@/components/json-ld";
import { Cta } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import { WonkaChatFaqAccordion } from "@/components/wonka-chat/faq-accordion";
import { WonkaChatTestimonialsSlider } from "@/components/wonka-chat/testimonials-slider";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/wonka-chat";
const title = "WonkaChat · One secure AI workspace for your team | Wonka AI";
const description =
  "WonkaChat connects all your tools, understands what you need and executes tasks automatically. Secure, governed and useful — not just another chatbot.";

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m22 8-6 4 6 4V8z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

const useCases = [
  { label: "HR", title: "Automate new employee setup", body: "Accounts, access and training material spun up by an agent in minutes instead of days." },
  { label: "Knowledge", title: "Create perfect documentation", body: "Meeting notes, reports and internal comms generated in your voice, with context from your records." },
  { label: "Search", title: "Retrieve company info instantly", body: "Ask anything. The agent pulls fresh, accurate answers from your stack into the conversation." },
  { label: "Support", title: "Answer customer questions faster", body: "One assistant that knows your products, policies and history — so replies stop waiting on humans." },
  { label: "Sales", title: "Keep your CRM clean and current", body: "Update deals, log calls and create tasks from chat. WonkaChat writes back to your systems." },
  { label: "Governance", title: "Govern AI use across the company", body: "One platform, one policy. See who uses what and stop sensitive data leaks." },
];

const connectors = [
  { name: "Odoo", logo: "/images/solution/card-3/logos/odoo.svg" },
  { name: "SharePoint", logo: "/images/visual/sharepoint.svg" },
  { name: "Outlook", logo: "/images/solution/card-3/logos/outlook.svg" },
  { name: "Microsoft Teams", logo: "/images/solution/card-3/logos/teams.svg" },
  { name: "Salesforce", logo: "/images/solution/card-3/logos/salesforce.svg" },
  { name: "HubSpot", logo: "/images/solution/card-3/logos/hubspot.svg" },
  { name: "Jira", logo: "/images/solution/card-3/logos/jira.svg" },
  { name: "Notion", logo: "/images/solution/card-3/logos/notion.svg" },
  { name: "Google Drive", logo: "/images/solution/card-3/logos/googledrive.svg" },
  { name: "Slack", logo: "/images/solution/card-3/logos/slack.svg" },
];

const faqItems = [
  {
    question: "What is WonkaChat?",
    answer:
      "WonkaChat is a secure AI workspace that connects to your tools, executes tasks across them and gives your whole team one consistent place to use AI.",
  },
  {
    question: "How is it different from ChatGPT or Copilot?",
    answer:
      "ChatGPT helps you think — WonkaChat helps you finish. It connects to your systems, executes tasks in them, and keeps your data inside European infrastructure.",
  },
  {
    question: "Where is our data stored?",
    answer:
      "All data is processed and stored in European data centers. We never train foundation models on your content.",
  },
  {
    question: "Which tools does it integrate with?",
    answer:
      "Google Workspace, Microsoft 365, Slack, all major CRMs, project management tools and many more. If we don't support a tool yet, we'll build the connector.",
  },
  {
    question: "How long does it take to deploy?",
    answer:
      "Most teams are up and running in less than two weeks, including integrations and team rollout.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${getSiteUrl()}${pagePath}` },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}${pagePath}`,
    type: "website",
    siteName: "Wonka AI",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function WonkaChatPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath}`;
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const meetingUrl = (settings as SiteSettings | null)?.sharedLinks?.meetingUrl ?? null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "WonkaChat", url: pageUrl },
        ]}
      />
      <SoftwareAppSchema
        name="WonkaChat"
        description={description}
        url={pageUrl}
        features={useCases.map((u) => u.title)}
      />
      <FaqSchema items={faqItems} />

      <main className="bg-background text-text">
        {/* HERO */}
        <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-32 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-mid-gray px-4 py-1.5 type-eyebrow text-text">
              WonkaChat
            </span>
            <h1 className="mx-auto mt-6 max-w-[20ch] text-balance type-h2">
              The AI workspace your whole team can actually use.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl type-body text-text/70">
              WonkaChat connects to your company tools, understands your workflows and helps your
              team get work done through simple conversation.
            </p>
            <p className="mx-auto mt-3 max-w-xl type-paragraph-m text-text/50">
              Not just another chatbot. A secure AI platform with agents, tool connections and
              human-in-the-loop control.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={meetingUrl ?? "#contact"} variant="primary">
                <VideoIcon className="h-4 w-4" />
                Book a demo
              </ButtonLink>
              <Link
                href="#use-cases"
                className="type-paragraph-m-bold text-text underline underline-offset-4"
              >
                See what it does
              </Link>
            </div>
          </div>
        </section>

        {/* LOGOS STRIP */}
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="border-t border-dashed border-border" />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <Image
              src="/images/hero/proof-1.svg"
              alt="PwC, Engie, Buildwise, Xerius"
              width={287}
              height={24}
              className="h-6 w-auto opacity-60 brightness-0"
            />
            <Image
              src="/images/hero/proof-2.svg"
              alt="Luminus, Cambio, Zorgi, ODTH"
              width={289}
              height={24}
              className="h-6 w-auto opacity-60 brightness-0"
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
            <span className="type-body text-text/70">Trusted by Belgian teams of every size</span>
            <span className="hidden h-1 w-1 rounded-full bg-text/30 md:inline-block" />
            <span className="type-body text-text/70">European data storage</span>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="border-t border-dashed border-border" />
        </div>

        {/* PROBLEM */}
        <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-start md:gap-16">
            <div>
              <Eyebrow>The problem today</Eyebrow>
              <h2 className="mt-6 type-h4">
                Your AI works.
                <br />
                <span className="text-text/50">Just not for everyone.</span>
              </h2>
            </div>
            <div className="border-l border-dashed border-border pl-6 md:pl-10">
              <p className="type-body text-text/65">
                Most AI tools create value for the people who already know how to use them. Everyone
                else keeps doing repetitive work manually — copy-pasting data, forwarding requests,
                checking documents and updating systems.
              </p>
              <p className="mt-4 type-body font-medium text-text/80">
                WonkaChat changes that. It gives your whole team access to AI in a way that is
                simple, practical and built for daily work.
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="border-y border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <Eyebrow>One workspace</Eyebrow>
              <h2 className="mt-6 type-h3">
                Ask once.
                <br />
                <span className="text-text/50">Get real work done.</span>
              </h2>
              <p className="mt-6 max-w-2xl type-body text-text/65">
                Drop in your data — a spreadsheet, an email, a doc — and WonkaChat extracts what
                matters, understands the intent, and finishes the task across your tools.
              </p>
            </div>
            <div className="mt-14">
              <Image
                src="/images/visual/visual-center.webp"
                alt="WonkaChat turning incoming documents and emails into reviewed actions across your tools"
                width={1664}
                height={1080}
                sizes="(min-width: 1200px) 1024px, 100vw"
                className="mx-auto h-auto w-full max-w-5xl"
              />
            </div>
          </div>
        </section>

        {/* FROM PROMPT TO EXECUTION */}
        <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-18 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <Eyebrow>From prompt to execution</Eyebrow>
            <h2 className="mt-6 type-h4">
              One sentence becomes
              <br />
              <span className="text-text/50">a finished workflow.</span>
            </h2>
          </div>
          <div className="border-l border-dashed border-border pl-6 md:pl-10">
            <p className="type-body text-text/70">
              Speak or type a request. WonkaChat turns it into the right sequence of actions in your
              real systems — Odoo, your CRM, Slack — and reports back when it&apos;s done.
            </p>
            <div className="mt-8 bg-black p-6 text-white">
              <p className="type-eyebrow text-white/35">Example prompt</p>
              <p className="mt-4 type-body text-white/78">
                Create an opportunity in Odoo for Acme — 25k, kickoff in 3 weeks. Then notify
                #sales-eu.
              </p>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section id="use-cases" className="border-y border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <div className="max-w-3xl">
              <Eyebrow>Use cases</Eyebrow>
              <h2 className="mt-6 type-h3">
                What WonkaChat
                <br />
                <span className="text-text/50">does for your team.</span>
              </h2>
              <p className="mt-6 max-w-2xl type-body text-text/65">
                From onboarding a new hire to keeping your CRM clean — WonkaChat handles the work
                that lives between your tools.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((u) => (
                <article key={u.title} className="rounded-lg bg-background p-7 md:p-8">
                  <p className="type-eyebrow text-text/35">{u.label}</p>
                  <h3 className="mt-4 type-h6">{u.title}</h3>
                  <p className="mt-3 type-paragraph-m text-text/65">{u.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-start">
            <div className="md:sticky md:top-24">
              <Eyebrow>Connected to your stack</Eyebrow>
              <h2 className="mt-6 type-h4">
                All your tools,
                <br />
                <span className="text-text/50">working as one team.</span>
              </h2>
              <p className="mt-6 max-w-md type-body text-text/65">
                WonkaChat plugs into the systems you already use — CRM, productivity, comms, project
                tools — and orchestrates them. Need a new connector? We&apos;ll build it.
              </p>
              <div className="mt-8">
                <ButtonLink href="/integrations" variant="primary">
                  Explore integrations
                </ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
              {connectors.map((connector) => (
                <div
                  key={connector.name}
                  className="group flex h-28 items-center justify-center bg-background p-6 md:h-32"
                >
                  <Image
                    src={connector.logo}
                    alt={connector.name}
                    width={92}
                    height={34}
                    className="max-h-9 w-auto max-w-[7rem] object-contain grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="px-2 py-8 md:px-3">
          <div className="relative overflow-hidden rounded-3xl bg-black">
            <Image
              src="/images/security/banner-bg.avif"
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className="pointer-events-none object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
            <div className="relative mx-auto grid max-w-[1100px] gap-10 px-8 py-16 md:grid-cols-[1.6fr_1fr] md:items-center md:py-20">
              <div>
                <span className="type-eyebrow text-white/60">Security &amp; governance</span>
                <h2 className="mt-3 type-h4 text-white">Your data is always yours.</h2>
                <p className="mt-4 max-w-xl type-body text-white/75">
                  We don&apos;t train on it. We don&apos;t store what doesn&apos;t need to be
                  stored. Everything runs in a secure European environment that only your team can
                  access. No lock-in. No complications.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <BadgeGdpr className="size-16" />
                  <BadgeIso className="size-16" />
                  <BadgeNis2 className="size-16" />
                </div>
              </div>
              <div className="md:justify-self-end">
                <ButtonLink href={meetingUrl ?? "#contact"} variant="primary">
                  <VideoIcon className="h-4 w-4" />
                  Schedule a call
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-[1100px] px-6 py-18 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex flex-col items-center">
              <Eyebrow>What clients say</Eyebrow>
            </div>
            <h2 className="mt-6 type-h4">
              Real teams,
              <br />
              <span className="text-text/50">real results.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl type-body text-text/60">
              From leaders who replaced a stack of unauthorized AI tools with one secure workspace.
            </p>
          </div>
          <div className="mt-14">
            <WonkaChatTestimonialsSlider />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-2xl px-6 py-18 text-center md:py-24">
          <div className="flex flex-col items-center">
            <Eyebrow>Talk to us</Eyebrow>
          </div>
          <h2 className="mt-6 type-h4">See WonkaChat on your stack.</h2>
          <p className="mx-auto mt-4 max-w-xl type-body text-text/65">
            Jump on a 30-minute discovery call. We&apos;ll show you exactly how WonkaChat fits into
            the tools your team already uses.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-border">
              <Image
                src="/images/start-ai/jordy.jpg"
                alt="Jordy Callens"
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="type-body font-medium">Jordy Callens</div>
              <div className="type-paragraph-s text-text/55">Partner, Wonka</div>
            </div>
            <div className="mt-2">
              <ButtonLink href={meetingUrl ?? "#"} variant="primary">
                <CalendarIcon className="h-4 w-4" />
                Book a discovery call
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-2xl px-6 py-18 md:py-24">
            <div className="flex flex-col items-center">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-6 text-center type-h4">Frequently asked questions</h2>
            </div>
            <div className="mt-10">
              <WonkaChatFaqAccordion items={faqItems} />
            </div>
          </div>
        </section>
      </main>

      <Cta meetingUrl={meetingUrl} />
    </>
  );
}
