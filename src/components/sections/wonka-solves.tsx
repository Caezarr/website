import { LogoMark } from "@/components/ui/logo-mark";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

const copy = {
  en: {
    eyebrow: "The Wonka AI answer",
    headline: "Your data stays yours. Your AI works for you.",
    body: "Wonka AI deploys a private LLM inside your infrastructure — connected to your existing tools, processing everything on your servers. No data leaves. No cloud dependency. Full GDPR compliance, out of the box.",
    bullets: [
      "Model runs on your servers — nothing reaches a third party",
      "Connects to your full stack: SharePoint, Salesforce, Slack, Jira and more",
      "Deployed in weeks, not months",
    ],
    cta: "Book a demo",
  },
  fr: {
    eyebrow: "La réponse Wonka AI",
    headline: "Vos données restent les vôtres. Votre IA travaille pour vous.",
    body: "Wonka AI déploie un LLM privé dans votre infrastructure — connecté à vos outils existants, tout traité sur vos serveurs. Aucune donnée ne quitte votre périmètre. Aucune dépendance cloud. Conformité RGPD totale, dès le départ.",
    bullets: [
      "Le modèle tourne sur vos serveurs — rien n'atteint un tiers",
      "Connecté à toute votre stack : SharePoint, Salesforce, Slack, Jira et plus",
      "Déployé en semaines, pas en mois",
    ],
    cta: "Réserver une démo",
  },
  nl: {
    eyebrow: "Het Wonka AI antwoord",
    headline: "Uw data blijft van u. Uw AI werkt voor u.",
    body: "Wonka AI implementeert een private LLM binnen uw infrastructuur — verbonden met uw bestaande tools, alles verwerkt op uw servers. Geen data verlaat uw omgeving. Geen cloudafhankelijkheid. Volledige AVG-naleving, standaard inbegrepen.",
    bullets: [
      "Het model draait op uw servers — niets bereikt een derde partij",
      "Verbonden met uw volledige stack: SharePoint, Salesforce, Slack, Jira en meer",
      "Geïmplementeerd in weken, niet maanden",
    ],
    cta: "Demo boeken",
  },
};

interface WonkaSolvesProps {
  locale: Locale;
  meetingUrl?: string | null;
}

export function WonkaSolves({ locale, meetingUrl }: WonkaSolvesProps) {
  const t = copy[locale];

  return (
    <section className="mt-20 border-t border-b border-border pt-16 pb-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
        <div className="flex flex-col gap-6 md:max-w-sm">
          <div className="flex items-center gap-3">
            <LogoMark className="size-8 shrink-0" />
            <span className="type-eyebrow text-accent">{t.eyebrow}</span>
          </div>
          <h2 className="type-h4">{t.headline}</h2>
          <p className="type-paragraph-m text-text/60">{t.body}</p>
          <ButtonLink href={meetingUrl ?? "https://www.cal.eu/team/wonka-ai-experts/demonstration-call"} variant="primary" className="self-start">
            {t.cta}
          </ButtonLink>
        </div>
        <ul className="flex flex-col gap-4 md:flex-1 md:pt-2">
          {t.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="type-paragraph-m text-text/80">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
