import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { IndustryTabs } from "@/components/start-ai/industry-tabs";
import { TestimonialsSlider } from "@/components/start-ai/testimonials-slider";
import { FaqAccordion } from "@/components/start-ai/faq-accordion";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Start AI · Make your company AI-powered, fast | Wonka",
  description:
    "A 6-week program to make your SME AI-native. Identify the right opportunities, build your strategy, ship results, fast.",
  openGraph: {
    title: "Start AI · Make your company AI-powered, fast",
    description: "A 6-week program to make your SME AI-native.",
    type: "website",
  },
};

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
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const deliverables = [
  { title: "AI readiness assessment", body: "A clear picture of where your organization stands today." },
  { title: "Priority AI business cases", body: "The opportunities with the highest return, ready to be realized." },
  { title: "Concrete AI roadmap", body: "What to implement, in what order, and why." },
  { title: "AI policy & governance framework", body: "Guidelines so everything that follows sits in the right frame." },
  { title: "Quick win identification", body: "Immediately actionable opportunities your team can start on from day one." },
  { title: "AI agent concepts", body: "Where tailor-made AI assistants will deliver the most value for you." },
];

const phases = [
  {
    k: "01",
    title: "Prepare",
    subtitle: "Create alignment before action",
    body: "We define the strategic context, clarify expectations and make sure the right people are involved from the start. This ensures the program is not a generic AI exploration, but a focused trajectory built around your organisation's reality.",
  },
  {
    k: "02",
    title: "Understand & Inspire",
    subtitle: "Build a shared understanding of AI",
    body: "We bring leadership, teams and key stakeholders onto the same page. Through inspiration, examples and future vision mapping, we define what AI could mean for your organisation and where it should create value.",
  },
  {
    k: "03",
    title: "Analyse & Validate",
    subtitle: "Separate real opportunities from noise",
    body: "We analyse your workflows, processes and bottlenecks to identify the AI opportunities that are both valuable and realistic. Every opportunity is assessed through the lens of impact, feasibility, readiness and strategic relevance.",
  },
  {
    k: "04",
    title: "Activate & Deliver",
    subtitle: "Turn strategy into a practical roadmap",
    body: "We translate the validated opportunities into a concrete roadmap, supported by governance foundations and practical recommendations. The result is a clear path forward: what to do, why it matters and how to start.",
  },
];

const whyNow = [
  {
    title: "AI should not stay with the pioneers",
    body: "In many organisations, AI value stays with a small group of early adopters. They find better ways to work, but those ways rarely spread across teams.\n\nStart AI creates the structure to turn individual experiments into organisational progress.",
  },
  {
    title: "People are too good for repetitive work",
    body: "Your team should not spend its best hours copying information, searching documents, rewriting the same answers or moving work between systems.\n\nStart AI identifies the work your people should stop doing — and where AI can support them first.",
  },
  {
    title: "Responsible AI needs shared rules",
    body: "If everyone uses AI differently, the organisation loses control. If nobody uses AI, the organisation loses momentum.\n\nStart AI helps you create the balance: clear governance, practical guidelines and a roadmap that makes AI usable for everyone.",
  },
];

export default async function StartAIPage() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const meetingUrl = (settings as SiteSettings | null)?.sharedLinks?.meetingUrl ?? null;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate w-full overflow-hidden bg-black">
        <Image
          src="/images/start-ai/hero.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
        <div className="relative mx-auto max-w-[1100px] px-6 pb-20 pt-32 md:pb-28 md:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-white px-4 py-1.5 type-eyebrow text-text">
                Start AI
              </span>
              <h1 className="mx-auto mt-6 type-h2 text-white">
                Make your company AI&#8209;powered, fast.
              </h1>
              <p className="mx-auto mt-6 max-w-xl type-body text-white/80">
                We evaluate your operations, design your AI strategy and hand you the execution plan,
                so your whole team can start working at full potential.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={meetingUrl ?? "#contact"} variant="primary">
                  <VideoIcon className="h-4 w-4" />
                  Schedule a call
                </ButtonLink>
              </div>
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
            className="opacity-60 brightness-0 h-6 w-auto"
          />
          <Image
            src="/images/hero/proof-2.svg"
            alt="Luminus, Cambio, Zorgi, ODTH"
            width={289}
            height={24}
            className="opacity-60 brightness-0 h-6 w-auto"
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
          <span className="type-body text-text/70">#1 Start AI partner in Belgium</span>
          <span className="hidden h-1 w-1 rounded-full bg-text/30 md:inline-block" />
          <span className="type-body text-text/70">+150 Start AI&apos;s completed</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-t border-dashed border-border" />
      </div>

      {/* PHASES */}
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <Eyebrow>The framework</Eyebrow>
            <h2 className="mt-6 type-h4">
              A proven framework
              <br />
              <span className="text-text/50">for AI adoption.</span>
            </h2>
            <p className="mt-6 max-w-md type-body text-text/65">
              Start AI is built around a simple belief: successful AI adoption does not start with
              tools. It starts with clarity, alignment and the right priorities.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {phases.map((p) => (
              <article key={p.k} className="rounded-lg bg-mid-gray p-7 md:p-8">
                <div className="flex gap-5">
                  <span className="shrink-0 type-h3 leading-none text-text/20">{p.k}</span>
                  <div className="flex-1">
                    <h3 className="type-h5">{p.title}</h3>
                    <p className="mt-1 type-body text-text/50">{p.subtitle}</p>
                    <p className="mt-3 type-paragraph-m text-text/65">{p.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES — blue panel */}
      <section className="px-2 py-8 md:px-3">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "radial-gradient(ellipse at 15% 25%, #dce8ff 0%, #7ea3e8 50%, #6088d4 100%)",
          }}
        >
          <div className="relative mx-auto max-w-[1200px] px-8 py-16 md:px-14 md:py-20">
            <div className="text-center">
              <h2 className="mx-auto type-h4 text-white">
                What you walk away with.
              </h2>
            </div>
            <div className="mt-10 grid gap-0 md:grid-cols-3 md:gap-x-8">
              {deliverables.map((d, i) => (
                <div key={d.title} className="py-6">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-4 w-4 shrink-0 text-white/80" />
                    <h3 className="type-body font-medium text-white">{d.title}</h3>
                  </div>
                  <p className="mt-2 pl-7 type-paragraph-m text-white/75">{d.body}</p>
                  {i < deliverables.length - 1 && (
                    <div className="mt-6 border-t border-dashed border-white/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-mid-gray">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="max-w-3xl">
            <Eyebrow>Our industries</Eyebrow>
            <h2 className="mt-6 type-h3">
              Where Start AI
              <br />
              <span className="text-text/50">creates value.</span>
            </h2>
            <p className="mt-6 max-w-2xl type-body text-text/65">
              Start AI is shaped by experience across industries. We do not start from generic AI
              trends, but from the operational reality of your organisation: where time is lost, where
              quality is under pressure and where teams need better tools to scale.
            </p>
          </div>
          <div className="mt-14">
            <IndustryTabs meetingUrl={meetingUrl} />
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <Eyebrow>Why now</Eyebrow>
          <h2 className="mt-6 type-h3">Leave no team behind.</h2>
          <p className="mt-6 max-w-2xl type-body text-text/65">
            AI should not only work for the people who know which prompt to write or which tool to
            open. It should help the whole organisation work smarter, faster and with more focus.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyNow.map((p, i) => (
            <article
              key={i}
              className="group flex h-full flex-col rounded-lg bg-mid-gray p-7 transition-colors hover:bg-black hover:text-white md:min-h-[280px] md:p-8"
            >
              <h3 className="type-h6">{p.title}</h3>
              <p className="mt-4 type-paragraph-m whitespace-pre-line text-text/65 group-hover:text-white/70">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* VLAIO */}
      <section className="px-2 py-8 md:px-3">
        <div className="relative overflow-hidden rounded-3xl bg-black">
          <Image
            src="/images/how-to-start/how-to-start-bg.avif"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          <div className="relative mx-auto grid max-w-[1100px] gap-10 px-8 py-16 md:grid-cols-[1.6fr_1fr] md:items-center md:py-20">
            <div>
              <span className="type-eyebrow text-white/60">VLAIO KMO-portefeuille</span>
              <h3 className="mt-3 type-h4 text-white">
                Get 70% off as a Flemish SME.
              </h3>
              <p className="mt-4 max-w-xl type-body text-white/75">
                Wonka is a registered KMO-portefeuille service provider. Most Flemish SMEs claim back
                up to 70% of the program cost. We&apos;ll help you with the paperwork.
              </p>
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
      <section className="mx-auto max-w-[1100px] px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What clients say</Eyebrow>
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
          <TestimonialsSlider />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Eyebrow>Talk to us</Eyebrow>
        <h2 className="mt-6 type-h4">Ready for AI action?</h2>
        <p className="mx-auto mt-4 max-w-xl type-body text-text/65">
          Jump on a 30-minute discovery call. No slides, no pitch, just a real conversation about
          your business.
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
      <section className="bg-mid-gray">
        <div className="mx-auto max-w-2xl px-6 py-24">
          <div className="flex flex-col items-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 type-h4 text-center">Frequently asked questions</h2>
          </div>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
