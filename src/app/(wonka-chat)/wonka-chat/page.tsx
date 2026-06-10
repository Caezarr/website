import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema, SoftwareAppSchema } from "@/components/json-ld";
import { Cta } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WonkaChatFaqAccordion } from "@/components/wonka-chat/faq-accordion";
import { WonkaChatTestimonialsSlider } from "@/components/wonka-chat/testimonials-slider";
import { WonkaChatUseCasesTabs } from "@/components/wonka-chat/use-cases-tabs";
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

const clientLogos = [
  { name: "D'Ieteren", logo: "/images/wonka-chat/logos/dieteren.svg" },
  { name: "NMBS", logo: "/images/wonka-chat/logos/nmbs.svg" },
  { name: "Luminus", logo: "/images/wonka-chat/logos/luminus.svg" },
  { name: "PwC", logo: "/images/wonka-chat/logos/pwc.svg" },
  { name: "Stellantis", logo: "/images/wonka-chat/logos/stellantis.svg" },
];

const features = [
  {
    title: "Chat for your company",
    description:
      "Give your employees one simple place to ask questions, find information and get support from AI. WonkaChat works like a familiar chat experience, but with your company context and workflows built in.",
    image: "/images/wonka-chat/feature-chat.png",
    alt: "Voice prompt creating an opportunity in Odoo",
  },
  {
    title: "Choose your own AI model",
    description:
      "WonkaChat gives your company flexibility. Use the AI model that fits your needs, preferences and security requirements.",
    image: "/images/wonka-chat/feature-models.png",
    alt: "Choose between leading AI models",
  },
  {
    title: "Connected to your tools",
    description:
      "WonkaChat connects to the systems your team already uses, so employees can access information and trigger actions without switching between tools.",
    image: "/images/wonka-chat/feature-tools.png",
    alt: "Connected to the tools your team uses",
    cta: "Discover all integrations",
  },
  {
    title: "Create AI agents for specific tasks",
    description:
      "Build agents that understand a role, task or workflow. From sales follow-up to finance checks or support summaries, agents help employees get specific work done faster.",
    image: "/images/wonka-chat/wonka-vis-10.png",
    alt: "Create AI agents for specific tasks",
  },
  {
    title: "Built for every employee",
    description:
      "WonkaChat is designed so the whole organisation can work with AI, not just technical teams or early adopters. Employees use simple language, shared agents and guided workflows.",
    image: "/images/wonka-chat/feature-employee.png",
    alt: "Built for every employee",
  },
];

const faqItems = [
  {
    question: "Is WonkaChat only for technical teams?",
    answer: "No. WonkaChat is built for every employee. People can use AI through simple chat, shared agents and guided workflows.",
  },
  {
    question: "Can WonkaChat connect to our existing tools?",
    answer: "Yes. WonkaChat can connect to company tools such as CRM, ERP, email, documents, project tools and internal databases.",
  },
  {
    question: "Do we need to choose one AI model?",
    answer: "No. WonkaChat is designed to be flexible, so your organisation can work with the AI model that fits your needs.",
  },
  {
    question: "Can we control what AI can access?",
    answer: "Yes. You can manage access, permissions and which agents are available to which users or teams.",
  },
  {
    question: "Can actions require human approval?",
    answer: "Yes. WonkaChat supports human-in-the-loop workflows, so important actions can be reviewed before they are executed.",
  },
  {
    question: "Is WonkaChat a replacement for ChatGPT or Copilot?",
    answer: "WonkaChat is different. It is built as a company AI workspace, connected to your tools, agents, workflows and governance.",
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
        features={features.map((f) => f.title)}
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
                href="#how-it-works"
                className="type-paragraph-m-bold text-text underline underline-offset-4"
              >
                See how it works
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-[1400px] md:mt-16">
            <Image
              src="/images/wonka-chat/wonka-hero-flow-v2.png"
              alt="WonkaChat turning incoming documents and emails into reviewed actions across your tools"
              width={1920}
              height={694}
              priority
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* LOGOS STRIP */}
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="border-t border-dashed border-border" />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {clientLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.logo}
                alt={logo.name}
                width={120}
                height={32}
                className="h-7 w-auto opacity-60 brightness-0 md:h-8"
              />
            ))}
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
          <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-16">
            <div>
              <Eyebrow>The problem today</Eyebrow>
              <h2 className="mt-6 type-h4">
                Your AI works.
                <br />
                <span className="text-text/50">Just not for everyone.</span>
              </h2>
              <p className="mt-6 max-w-md type-body text-text/65">
                Most AI tools create value for the people who already know how to use them. Everyone
                else keeps doing repetitive work manually — copy-pasting data, forwarding requests,
                checking documents and updating systems.
              </p>
              <p className="mt-4 max-w-md type-body font-medium text-text/80">
                WonkaChat changes that. It gives your whole team access to AI in a way that is
                simple, practical and built for daily work.
              </p>
            </div>
            <Image
              src="/images/wonka-chat/wonka-problem-people.png"
              alt="Team members and the repetitive jobs WonkaChat removes"
              width={1650}
              height={1920}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* WHAT IS WONKACHAT */}
        <section id="how-it-works" className="border-y border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-[900px] px-6 py-18 md:py-24">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>What is WonkaChat?</Eyebrow>
              <h2 className="mt-6 type-h3">
                One AI workspace
                <br />
                <span className="text-text/50">for your entire company.</span>
              </h2>
              <p className="mt-6 max-w-2xl type-body text-text/65">
                WonkaChat brings AI, agents, company knowledge and tool connections together in one
                secure workspace. Your team can ask questions, get support and move work forward —
                without needing to become AI experts.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCT FEATURES — STICKY SCROLL */}
        <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
            <div className="md:sticky md:top-24 md:self-start">
              <Eyebrow>Product features</Eyebrow>
              <h2 className="mt-6 type-h4">
                Everything your team needs
                <br />
                <span className="text-text/50">to work with AI.</span>
              </h2>
              <p className="mt-6 type-body text-text/65">
                WonkaChat is built to make AI useful across the organisation: simple enough for every
                employee, powerful enough for real workflows, and flexible enough to connect with the
                tools you already use.
              </p>
              <div className="mt-8">
                <ButtonLink href={meetingUrl ?? "#contact"} variant="primary">
                  <VideoIcon className="h-4 w-4" />
                  Book a demo
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col gap-28 md:gap-40">
              {features.map((f, idx) => (
                <article key={f.title}>
                  <div className="mb-8 w-full overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.alt}
                      width={1200}
                      height={800}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <h3 className="type-h6">{f.title}</h3>
                  <p className="mt-3 type-paragraph-m text-text/65">{f.description}</p>
                  {idx === 2 && f.cta && (
                    <Link
                      href="/integrations"
                      className="mt-6 inline-flex items-center gap-1.5 type-paragraph-m-bold text-text underline underline-offset-4"
                    >
                      {f.cta}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="border-y border-dashed border-border bg-background">
          <div className="mx-auto max-w-[1280px] px-6 py-18 md:py-24">
            <Eyebrow>Use cases</Eyebrow>
            <div className="mt-6">
              <WonkaChatUseCasesTabs />
            </div>
          </div>
        </section>

        {/* SECURITY BANNER */}
        <section className="px-2 py-8 md:px-3 md:py-12">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/wonka-chat/security-banner.png"
              alt="Your data is always yours. GDPR, ISO 27001 and NIS2 compliant."
              width={1920}
              height={600}
              sizes="100vw"
              className="block h-auto w-full"
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-[1100px] px-6 py-18 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex flex-col items-center">
              <Eyebrow>What clients say</Eyebrow>
            </div>
            <h2 className="mt-6 type-h4">
              Honest feedback
              <br />
              <span className="text-text/50">from valued people.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl type-body text-text/60">
              Real feedback from leaders who trusted Wonka to turn AI ambition into a concrete plan
              their teams could act on.
            </p>
          </div>
          <div className="mt-14">
            <WonkaChatTestimonialsSlider />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-2xl px-6 py-18 text-center md:py-24">
          <div className="flex flex-col items-center">
            <Eyebrow>Book a demo</Eyebrow>
          </div>
          <h2 className="mt-6 type-h4">
            Want to see what WonkaChat
            <br />
            <span className="text-text/50">could do for your team?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl type-body text-text/65">
            Book a short demo and we&apos;ll show how WonkaChat can connect to your tools, support
            your workflows and make AI accessible across your organisation.
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
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={meetingUrl ?? "#"} variant="primary">
                <CalendarIcon className="h-4 w-4" />
                Book a demo
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
