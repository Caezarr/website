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
    result: "-50% de temps de traitement des mails support, 70 personnes",
  },
];

const certifications = [
  {
    icon: BadgeIso,
    label: "ISO 27001 certifié",
    detail: "Système de management de la sécurité de l'information certifié ISO/IEC 27001.",
  },
  {
    icon: BadgeGdpr,
    label: "RGPD conforme",
    detail: "Conformité totale au Règlement Général sur la Protection des Données.",
  },
  {
    icon: BadgeNis2,
    label: "NIS 2 conforme",
    detail: "Conforme à la directive européenne NIS 2 sur la sécurité des réseaux et de l'information.",
  },
];

const faqItems = [
  {
    question: "ChatGPT personnel vs IA gouvernée : quelle différence ?",
    answer: "ChatGPT est un assistant personnel, sans connexion aux systèmes d'entreprise. Wonka AI déploie des agents branchés sur les outils métier (ERP, CRM, SharePoint), avec contrôle d'accès, logs d'audit et conformité RGPD.",
  },
  {
    question: "Où vont les données ?",
    answer: "Hébergement Azure West Europe (Microsoft Irlande) par défaut. Les données clients ne sont pas utilisées pour entraîner des modèles publics. Data Processing Agreement disponible.",
  },
  {
    question: "Le RSSI doit-il valider ?",
    answer: "Oui. ISO 27001 certifié, RGPD conforme, NIS 2 conforme. Architecture faite pour un RSSI : contrôle d'accès, chiffrement, logs, DPA.",
  },
  {
    question: "Combien de temps pour déployer ?",
    answer: "En semaines, pas en mois. Ça dépend du nombre de connecteurs (SharePoint, Odoo, CRM) et de la complexité des workflows agents.",
  },
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
          <p className="type-body mt-6 max-w-[38rem] leading-7 text-white/80">
            Des agents IA privés, branchés sur les outils que votre entreprise utilise déjà (ERP, CRM, SharePoint, Teams), avec gouvernance centralisée et conformité RGPD. Gabriel Rance, country manager France.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <ButtonLink
              href="/france/diagnostic"
              variant="primary"
            >
              Faire le diagnostic
            </ButtonLink>
            <a
              href="#proofs"
              className="type-paragraph-m-bold text-white underline underline-offset-4 hover:text-white/80"
            >
              Voir un cas
            </a>
          </div>
        </div>
      </Section>

      <Section wide className="bg-background py-16 md:py-20">
        <Surface variant="panel" className="p-5 text-white">
          <Image
            src="/images/banner-bg.avif"
            alt=""
            fill
            sizes="(min-width: 89rem) 89rem, 100vw"
            className="object-cover"
          />
          <ul className="relative grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-dashed border-white/40 bg-white/10 md:grid-cols-4">
            {proofPoints.map((point) => (
              <li key={point.label} className="flex min-h-[14.4375rem] flex-col items-start justify-between gap-6 bg-black/70 p-7.5">
                <p className="type-eyebrow text-white/40">{point.label}</p>
                <p className="type-paragraph-m-bold text-white">{point.value}</p>
              </li>
            ))}
          </ul>
        </Surface>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div className="md:sticky md:top-24">
            <Eyebrow>Le problème</Eyebrow>
            <h2 className={cn(headingClass.section, "mt-5")}>
              L'IA d'entreprise déployable en interne, pas ChatGPT personnel
            </h2>
          </div>
          <div className="flex flex-col gap-6 type-body text-text/70">
            <p>
              Les entreprises européennes cherchent une IA qui fonctionne avec leurs systèmes existants (ERP, CRM, SharePoint, Teams), qui respecte le RGPD, et qui peut être gouvernée de manière centralisée.
            </p>
            <p>
              Wonka AI construit des agents IA privés connectés aux outils que l'entreprise utilise déjà, avec contrôle d'accès, logs d'audit et conformité RGPD par défaut.
            </p>
            <p>
              Hébergement Azure West Europe (Microsoft Irlande). Les données clients ne sont pas utilisées pour entraîner des modèles publics. DPA disponible.
            </p>
          </div>
        </div>
      </Section>

      <Section id="proofs" wide className="border-t border-dashed border-border bg-mid-gray py-16 md:py-24">
        <h2 className={cn(headingClass.section, "mb-10")}>Preuves publiques</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {references.map((ref) => (
            <Surface key={ref.company} variant="card" className="p-6 md:p-8">
              <h3 className={cn(headingClass.card)}>{ref.company}</h3>
              <p className="type-paragraph-m mt-4 text-text/70">{ref.result}</p>
            </Surface>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="type-paragraph-m text-text/60">
            #1 AI Start-Up of the Year, Belgium Startup Awards 2026
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 type-paragraph-m text-text/50">
            <span>Nvidia Inception</span>
            <span className="text-text/30">•</span>
            <span>Microsoft for Startups</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-24">
        <h2 className={cn(headingClass.section, "mb-12")}>Conformité et sécurité</h2>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <Surface key={cert.label} variant="card" className="p-6 md:p-7">
                <Icon className="size-12 text-accent" />
                <h3 className={cn(headingClass.card, "mt-5")}>{cert.label}</h3>
                <p className="type-paragraph-m mt-3 text-text/62">{cert.detail}</p>
              </Surface>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="type-paragraph-m text-text/60">
            SOC 2 Type II en cours • Hébergement Azure West Europe (Microsoft Irlande)
          </p>
        </div>
      </Section>

      <Section className="border-t border-dashed border-border bg-mid-gray py-16 md:py-24" containerClassName="max-w-[48rem]">
        <h2 className={cn(headingClass.section, "mb-8")}>Questions fréquentes</h2>
        <div className="flex flex-col gap-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="type-body font-medium">{item.question}</h3>
              <p className="type-paragraph-m mt-3 text-text/62">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        data-theme="dark"
        fluid
        className="bg-black px-0 md:px-0 lg:px-0"
        containerClassName="relative overflow-hidden flex flex-col items-center px-6 md:px-12 py-15 md:py-22"
      >
        <Image
          src="/images/CTA/cta-bg.avif"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-80"
        />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <h2 className={cn(headingClass.section, "text-text")}>
            Prêt à voir où l'IA peut transformer vos opérations ?
          </h2>
          <p className="type-body max-w-[35.125rem] text-text opacity-80">
            Cinq questions pour identifier les cas d'usage prioritaires dans votre contexte.
          </p>
          <ButtonLink
            href="/france/diagnostic"
            variant="primary"
          >
            Faire le diagnostic
          </ButtonLink>
        </div>
      </Section>
    </main>
  );
}
