import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "@/lib/fonts";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-provider";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const SITE_URL = "https://wonka-ai.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wonka AI",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image.jpg`,
  sameAs: [
    "https://www.linkedin.com/company/wonka-ai",
  ],
  description:
    "Wonka AI deploys private LLMs inside European enterprises — connected to your existing tools, processing everything on your own servers. Full data sovereignty, GDPR compliance, deployed in weeks.",
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wonka AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Private enterprise AI platform. Deploy a secure LLM inside your infrastructure, connected to SharePoint, Salesforce, Slack, Jira and more — with full data sovereignty and GDPR compliance.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/OnlineOnly",
  },
  featureList: [
    "Private LLM deployment on your infrastructure",
    "GDPR-compliant enterprise AI",
    "Connectors for SharePoint, Salesforce, Slack, Jira, HubSpot, Notion",
    "Data sovereignty — no data leaves your environment",
    "RAG on your internal documents and knowledge base",
    "Deployed in weeks, not months",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "Wonka AI – Private Enterprise AI, Deployed on Your Infrastructure",
      template: "%s – Wonka AI",
    },
    description:
      "Wonka AI deploys a private LLM inside your enterprise — connected to SharePoint, Salesforce, Slack and more, with full data sovereignty and GDPR compliance.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        "en-US": SITE_URL,
        "fr-BE": SITE_URL,
        "fr-FR": SITE_URL,
        "x-default": SITE_URL,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={fontVariables}>
        {GTM_ID && (
          <>
            <Script
              id="gtm-consent-default"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
              }}
            />
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
          </>
        )}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <CookieConsentProvider>{children}</CookieConsentProvider>
        <Analytics />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="schema-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
