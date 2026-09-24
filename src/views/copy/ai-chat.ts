import type { Locale } from "@/i18n/config";

export interface AiChatCopy {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; subtitle: string; imageAlt: string };
  /** Trial CTA block. `null` keeps the component's own (EN) defaults. */
  trial: { title: string; body: string } | null;
  contactHeading: string;
}

const en: AiChatCopy = {
  seo: {
    title: "AI Chat | Safe AI chat on your company knowledge | Wonka",
    description:
      "Chat with the best AI models on your company documents and tools. EU-hosted, GDPR-compliant, with enterprise access control. Start a free trial.",
  },
  hero: {
    eyebrow: "AI Chat",
    title: "Safe AI chat.",
    subtitle: "The best AI models, connected to your company knowledge, running in the EU.",
    imageAlt: "Wonka AI chat workspace",
  },
  trial: null,
  contactHeading: "Book a demo meeting.",
};

const fr: AiChatCopy = {
  seo: {
    title: "Chat IA sécurisé pour votre entreprise | Wonka",
    description:
      "Les meilleurs modèles d'IA sur vos documents et outils d'entreprise. Hébergé dans l'UE, conforme RGPD, contrôle d'accès. Essai gratuit.",
  },
  hero: {
    eyebrow: "Chat IA",
    title: "Un chat IA sécurisé.",
    subtitle:
      "Les meilleurs modèles d'IA, connectés à la connaissance de votre entreprise, hébergés dans l'UE.",
    imageAlt: "Espace de travail Wonka AI avec chat IA",
  },
  trial: {
    title: "Essayez Wonka Workspace gratuitement.",
    body: "Essai de 7 jours. Sans carte de crédit.",
  },
  contactHeading: "Réservez une démo.",
};

const nl: AiChatCopy = {
  seo: {
    title: "Veilige AI-chat voor uw bedrijf | Wonka",
    description:
      "De beste AI-modellen op uw bedrijfsdocumenten en tools. Gehost in de EU, AVG-conform, met toegangsbeheer. Start een gratis proefperiode.",
  },
  hero: {
    eyebrow: "AI-chat",
    title: "Veilige AI-chat.",
    subtitle:
      "De beste AI-modellen, gekoppeld aan de kennis van uw bedrijf, gehost in de EU.",
    imageAlt: "Wonka AI-chatwerkruimte",
  },
  trial: {
    title: "Probeer Wonka Workspace gratis.",
    body: "7 dagen proefperiode. Geen creditcard nodig.",
  },
  contactHeading: "Plan een demo in.",
};

export const AI_CHAT_COPY: Record<Locale, AiChatCopy> = { en, fr, nl };
