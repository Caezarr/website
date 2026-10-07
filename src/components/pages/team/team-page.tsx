import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { Locale } from "@/i18n/config";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings } from "@/lib/types";
import { TEAM, TEAM_PAGE_COPY, type TeamMember } from "@/views/copy/team";

const BG = "/brand/backgrounds/16x9";
const AVATAR_SCENES = [
  "hills",
  "river",
  "mountain-range",
  "wheatfield",
  "waterfall",
  "snowy-mountain",
  "hero",
];

/** Kept out of search until every role on the roster is confirmed. */
export function teamMetadata(locale: Locale): Metadata {
  const { seo } = TEAM_PAGE_COPY[locale];
  return {
    title: seo.title,
    description: seo.description,
    robots: { index: false, follow: false },
  };
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return (
    parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const scene = AVATAR_SCENES[index % AVATAR_SCENES.length];
  return (
    <li className="group">
      <div className="bg-light-gray relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <Image
              src={`/brand/backgrounds/16x9/wonka-bg-${scene}-1920x1080.webp`}
              alt=""
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white">
              {initials(member.name)}
            </span>
          </>
        )}
      </div>
      <p className="mt-4 font-serif text-xl text-black">{member.name}</p>
      {member.role && (
        <p className="mt-1 text-sm text-black/55">{member.role}</p>
      )}
    </li>
  );
}

export async function TeamPage({ locale = "en" }: { locale?: Locale }) {
  const copy = TEAM_PAGE_COPY[locale];
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);

  return (
    <main className="bg-white text-black">
      <section className="relative overflow-hidden bg-black">
        <Image
          src={`${BG}/wonka-bg-river-1920x1080.webp`}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 pt-36 pb-20 md:pt-44 md:pb-28">
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-white/70 uppercase">
            <span className="h-px w-6 bg-white/40" />
            {copy.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-[2.6rem] leading-[1.02] text-white md:text-[4.4rem]">
            {copy.title}
          </h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-base text-white/85 md:text-lg">
              {copy.body}
            </p>
            <p className="flex items-baseline gap-3 text-white">
              <span className="font-serif text-7xl leading-none">
                {TEAM.length}
              </span>
              <span className="text-sm text-white/70">{copy.countLabel}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </ul>
      </section>

      <section className="px-4 pb-24 md:pb-32">
        <div className="bg-light-gray mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] p-8 md:flex-row md:items-center md:p-14">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight text-black md:text-5xl">
              {copy.ctaTitle}
            </h2>
            <p className="mt-4 text-black/65 md:text-lg">{copy.ctaBody}</p>
          </div>
          <a
            href={meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            {copy.cta} <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
