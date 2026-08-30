import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { meetingTrackProps } from "@/lib/meeting-track";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/france";
const title = "Wonka AI France - IA d'entreprise déployable";
const description = "Gabriel Rance, country manager France. IA d'entreprise avec agents et gouvernance. ISO 27001, GDPR, NIS 2. Hébergement Azure West Europe (Microsoft Irlande).";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: title,
      metaDescription: description,
      ogImage: null,
    },
    { path: pagePath, fallbackTitle: title },
  );
}

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

const proofPoints = [
  { label: "Équipe", value: "~35 personnes" },
  { label: "Certifications", value: "ISO 27001, GDPR, NIS 2" },
  { label: "Hébergement", value: "Azure West Europe" },
  { label: "Reconnaissance", value: "#1 AI Start-Up Belgique 2026" },
];

const references = [
  {
    company: "Itzu",
    result: "Automatisation du support client",
  },
  {
    company: "N-allo / Engie",
    result: "−50% temps de traitement des mails support, 70 personnes",
  },
];

const certifications = [
  { icon: BadgeGdpr, label: "GDPR" },
  { icon: BadgeIso, label: "ISO 27001" },
  { icon: BadgeNis2, label: "NIS 2" },
];

export default async function FrancePage() {
  const settings = await getSiteSettings();
  const franceMeetingUrl = resolveMeetingUrl(settings?.sharedLinks, "france");

  return (
    <main className="bg-background text-text">
      <Section
        data-theme="dark"
        className="relative isolate flex min-h-[80vh] flex-col overflow-hidden bg-black text-white"
        containerClassName="relative z-10 flex flex-col justify-center py-32 md:py-40"
      >
        <Image
          src="/images/hero-bg.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />

        <div className="max-w-3xl">
          <Eyebrow className="text-white/60">Wonka AI France</Eyebrow>
          <h1 className={cn(headingClass.hero, "mt-5 text-white")}>
            L'IA d'entreprise qui se déploie vraiment
          </h1>
          <p className="type-body mt-6 leading-7 text-white/80">
            Gabriel Rance, country manager France. Wonka AI aide les entreprises européennes à déployer
            des agents IA privés connectés à leurs outils et données existants, avec gouvernance et conformité
            RGPD intégrées.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            {franceMeetingUrl ? (
              <ButtonLink
                href={`${franceMeetingUrl}${franceMeetingUrl.includes("?") ? "&" : "?"}utm_campaign=france&utm_source=website&utm_medium=landing`}
                variant="primary"
                {...meetingTrackProps("general")}
              >
                Échange de 45 minutes
              </ButtonLink>
            ) : (
              <span className="type-paragraph-m-bold text-white/50">
                [URL de réservation France à configurer]
              </span>
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point.label}>
                <p className="type-eyebrow text-white/40">{point.label}</p>
                <p className="type-paragraph-m-bold mt-2 text-white">{point.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-border py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div className="md:sticky md:top-24">
            <Eyebrow>Le problème</Eyebrow>
            <h2 className={cn(headingClass.section, "mt-5")}>
              L'IA d'entreprise déployable en interne, pas ChatGPT personnel
            </h2>
          </div>
          <div className="flex flex-col gap-6 type-body text-text/70">
            <p>
              Les grandes entreprises européennes cherchent une IA qui fonctionne avec leurs systèmes existants
              (ERP, CRM, SharePoint, Teams), qui respecte la RGPD et qui peut être gouvernée de manière centralisée.
            </p>
            <p>
              Wonka AI construit des agents IA privés connectés aux outils que l'entreprise utilise déjà, avec
              contrôle d'accès, logs d'audit et conformité RGPD par défaut.
            </p>
            <p>
              Hébergement Azure West Europe (Microsoft Irlande). Les données clients ne sont pas utilisées pour
              entraîner des modèles publics. DPA disponible.
            </p>
          </div>
        </div>
      </Section>

      <Section wide className="border-t border-dashed border-border bg-mid-gray py-16 md:py-24">
        <h2 className={cn(headingClass.section, "mb-10 text-center")}>Preuves publiques</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {references.map((ref) => (
            <Surface key={ref.company} variant="card" className="p-6 md:p-8">
              <h3 className={cn(headingClass.card)}>{ref.company}</h3>
              <p className="type-paragraph-m mt-4 text-text/70">{ref.result}</p>
            </Surface>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="type-paragraph-m text-center text-text/60">
            #1 AI Start-Up of the Year - Belgium Startup Awards 2026
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 type-paragraph-m text-text/50">
            <span>Nvidia Inception</span>
            <span className="text-text/30">•</span>
            <span>Microsoft for Startups</span>
          </div>
        </div>
      </Section>

      <Section wide className="bg-background py-16 md:py-24">
        <Surface variant="panel" className="bg-blue-900 p-7.5 text-white md:p-12">
          <Image
            src="/images/security/banner-bg.avif"
            alt=""
            fill
            sizes="(min-width: 89rem) 89rem, 100vw"
            className="object-cover mix-blend-luminosity"
          />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-5">
            <div className="flex max-w-[35.125rem] flex-col gap-5">
              <h2 className={headingClass.section}>Conformité et sécurité</h2>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white" />
                  <span className="type-paragraph-m text-white/80">ISO 27001 certifié</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white" />
                  <span className="type-paragraph-m text-white/80">RGPD conforme</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white" />
                  <span className="type-paragraph-m text-white/80">NIS 2 conforme</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white" />
                  <span className="type-paragraph-m text-white/80">SOC 2 Type II en cours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white" />
                  <span className="type-paragraph-m text-white/80">Hébergement : Azure West Europe (Microsoft Irlande)</span>
                </li>
              </ul>
            </div>
            <ul className="grid grid-cols-3">
              {certifications.map((cert) => {
                const Icon = cert.icon;
                return (
                  <li
                    key={cert.label}
                    className="flex min-h-40 items-center justify-center border border-dashed border-white/40 first:border-l-0 md:min-h-[14.4375rem]"
                  >
                    <Icon className="size-16 md:size-31" />
                  </li>
                );
              })}
            </ul>
          </div>
        </Surface>
      </Section>

      <Section
        data-theme="dark"
        className="bg-black text-white py-16 md:py-24"
        containerClassName="flex flex-col items-center text-center"
      >
        <h2 className={cn(headingClass.section, "max-w-2xl")}>
          Découvrons où Wonka AI peut faire la différence
        </h2>
        <p className="type-body mt-6 max-w-lg text-white/70">
          45 minutes pour cartographier un workflow d'agents IA dans votre contexte métier.
        </p>
        <div className="mt-8">
          {franceMeetingUrl ? (
            <ButtonLink
              href={`${franceMeetingUrl}${franceMeetingUrl.includes("?") ? "&" : "?"}utm_campaign=france&utm_source=website&utm_medium=cta`}
              variant="primary"
              {...meetingTrackProps("general")}
            >
              Réserver un échange
            </ButtonLink>
          ) : (
            <p className="type-paragraph-m text-white/50">
              [URL de réservation France à configurer dans Sanity]
            </p>
          )}
        </div>
      </Section>
    </main>
  );
}
