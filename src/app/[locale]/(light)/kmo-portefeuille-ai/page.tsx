import type { Metadata } from "next";
import { START_AI_CONTENT_QUERY } from "@sanity/lib/queries";
import { fetchPageDoc } from "@/lib/localized-content";
import { ContactBlock } from "@/components/sections/contact-block";
import { StartAiSubsidizedFlandersLogoStrip } from "@/components/sections/start-ai-subsidized-flanders/logo-strip";
import { StartAiSubsidizedFlandersHero } from "@/components/sections/start-ai-subsidized-flanders/hero";
import { StartAiSubsidizedFlandersJourney } from "@/components/sections/start-ai-subsidized-flanders/journey";
import {
  StartAiSubsidizedFlandersProgramDelivery,
  StartAiSubsidizedFlandersProgramOverview,
} from "@/components/sections/start-ai-subsidized-flanders/program-overview";
import { StartAiSubsidizedFlandersReviewVideo } from "@/components/sections/start-ai-subsidized-flanders/review-video";
import { StartAiSubsidizedFlandersSubsidyPopup } from "@/components/sections/start-ai-subsidized-flanders/subsidy-popup";
import { resolveStartAiContent } from "@/lib/page-defaults/resolve-pages";
import { BreadcrumbSchema, FaqSchema } from "@/components/json-ld";
import { landingLanguages, landingPath } from "@/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { StartAiContent } from "@/lib/types";

export const dynamic = "force-static";
export const dynamicParams = false;

// Flemish subsidy page: published in Dutch only.
export function generateStaticParams() {
  return [{ locale: "nl" }];
}

const pagePath = landingPath("kmoPortefeuille", "nl")!;

const FAQ_ITEMS = [
  {
    question: "Wat is de KMO-portefeuille?",
    answer:
      "De KMO-portefeuille is een subsidiemaatregel van VLAIO (Vlaams Agentschap Innoveren & Ondernemen). Vlaamse kmo's krijgen er financiële steun mee voor opleiding en advies bij erkende dienstverleners. Een AI-traject zoals Start AI valt daaronder.",
  },
  {
    question: "Komt Start AI in aanmerking voor de KMO-portefeuille?",
    answer:
      "Ja. Start AI komt in aanmerking voor de VLAIO KMO-portefeuille. De meeste Vlaamse kmo's kunnen zo tot 70% subsidie krijgen op het programma. Via de link op deze pagina controleert u of uw onderneming in aanmerking komt.",
  },
  {
    question: "Hoeveel subsidie krijgt u voor een AI-traject?",
    answer:
      "De meeste Vlaamse kmo's komen in aanmerking voor 70% subsidie op Start AI. Het exacte percentage hangt af van uw onderneming en de voorwaarden van VLAIO. Wij helpen u bij de aanvraag, zodat u niet zelf door de administratie moet.",
  },
  {
    question: "Wat houdt het Start AI-programma in?",
    answer:
      "Start AI begint met een intake en een halve dag kick-off met een prompting workshop rond tools als ChatGPT en Claude. Daarna volgen diepte-interviews over uw processen, een analyse van de AI-kansen met hun ROI, een AI-beleid op maat en een concreet actieplan met advies over training, tooling en investeringen.",
  },
  {
    question: "Hoe vraagt u de KMO-portefeuille aan voor Start AI?",
    answer:
      "Klik op 'Subsidie aanvragen' en vul het korte formulier in. Wij nemen contact met u op, bekijken of uw kmo in aanmerking komt en begeleiden de aanvraag bij VLAIO. U kunt ook meteen een gesprek van 30 minuten inplannen met ons team.",
  },
  {
    question: "Voor welke bedrijven is Start AI met KMO-portefeuille bedoeld?",
    answer:
      "Voor Vlaamse kmo's die AI concreet en veilig willen inzetten, ongeacht de sector. We begeleidden al meer dan 150 kmo's met Start AI en realiseerden meer dan 100 AI-oplossingen op maat.",
  },
];

const FLANDERS_MEETING_URL =
  "https://outlook.office.com/bookwithme/user/58f423924e0a4408be133c904198e953@meetwonka.com/meetingtype/6Mql1x37YECWsmIDQ6fK6Q2?anonymous&ismsaljsauthenabled&ep=mLinkFromTile";

async function getStartAiContent() {
  const doc = await fetchPageDoc<StartAiContent>(
    START_AI_CONTENT_QUERY,
    "startAiContent",
    "nl",
  );
  return resolveStartAiContent(doc, "nl");
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: "KMO-portefeuille voor AI: tot 70% subsidie | Wonka",
      metaDescription:
        "Gebruik de VLAIO KMO-portefeuille voor uw AI-traject: tot 70% subsidie op Start AI voor Vlaamse kmo's. Strategie, roadmap en AI-beleid. Plan een gesprek.",
      ogImage: null,
    },
    {
      path: pagePath,
      locale: "nl",
      languages: landingLanguages(getSiteUrl(), "kmoPortefeuille"),
    },
  );
}

export default async function KmoPortefeuilleAiPage() {
  const { contact } = await getStartAiContent();

  const siteUrl = getSiteUrl();

  return (
    <main lang="nl-BE" className="bg-background text-text">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${siteUrl}/nl` },
          { name: "Start AI", url: `${siteUrl}/nl/start-ai` },
          { name: "KMO-portefeuille", url: `${siteUrl}${pagePath}` },
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />
      <StartAiSubsidizedFlandersHero />
      <StartAiSubsidizedFlandersLogoStrip />
      <StartAiSubsidizedFlandersProgramOverview />
      <StartAiSubsidizedFlandersProgramDelivery />
      <StartAiSubsidizedFlandersReviewVideo />
      <StartAiSubsidizedFlandersJourney />
      <ContactBlock
        id="contact"
        data={{
          ...contact,
          personRole: "Partner, Wonka",
          header: contact.header
            ? {
                ...contact.header,
                eyebrow: "Neem contact op",
                heading: "Meer info over Start AI?",
                body: null,
              }
            : null,
        }}
        meetingUrl={FLANDERS_MEETING_URL}
        meetingLabel="Plan een gesprek van 30 min"
        meetingTrackType="start-ai"
        email="jordy@meetwonka.com"
        phone="+32 496 83 95 28"
        className="py-24"
      />
      <section className="mx-auto max-w-[900px] px-6 py-18 md:py-24">
        <h2 className="type-h4">Veelgestelde vragen over de KMO-portefeuille voor AI</h2>
        <div className="mt-10 divide-y divide-dashed divide-border">
          {FAQ_ITEMS.map((item) => (
            <article key={item.question} className="py-6">
              <h3 className="type-body font-medium">{item.question}</h3>
              <p className="mt-3 type-paragraph-m text-text/62">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <StartAiSubsidizedFlandersSubsidyPopup />
    </main>
  );
}
