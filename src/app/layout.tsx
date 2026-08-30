import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-provider";
import { InlineScript } from "@/components/inline-script";
import { JsonLd } from "@/components/json-ld/json-ld";
import { MetaPixel } from "@/components/meta-pixel";
import { ATTRIBUTION_TRACKER_SCRIPT } from "@/lib/attribution-tracker-script";
import { META_PIXEL_ID } from "@/lib/meta-pixel-id";
import { gtSectra, interDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const GTM_ID = "GTM-5LCPHCRF";
const SITE_URL = getSiteUrl();

const priorityPages = [
  {
    name: "AI Agents",
    url: `${SITE_URL}/ai-agents`,
    description: "Private AI agents connected to the business tools your company already uses.",
  },
  {
    name: "Integrations",
    url: `${SITE_URL}/integrations`,
    description: "Connect Wonka AI to Odoo, Microsoft 365, CRM, ERP and internal knowledge systems.",
  },
  {
    name: "Start AI",
    url: `${SITE_URL}/start-ai`,
    description: "A practical program to identify, prioritize and launch enterprise AI use cases.",
  },
  {
    name: "Wonka Build",
    url: `${SITE_URL}/wonka-build`,
    description: "Custom AI applications built for your systems and day-to-day workflows.",
  },
  {
    name: "Case Studies",
    url: `${SITE_URL}/case-studies`,
    description: "Customer stories and examples of private enterprise AI deployments.",
  },
  {
    name: "Blog",
    url: `${SITE_URL}/blog`,
    description: "Insights on enterprise AI, private LLMs, automation and AI agents.",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Wonka AI",
  alternateName: ["Wonka", "WonkaChat"],
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  hasPart: priorityPages.map((page) => ({
    "@type": "WebPage",
    name: page.name,
    url: page.url,
    description: page.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  })),
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#site-navigation`,
  name: "Wonka AI primary pages",
  itemListElement: priorityPages.map((page, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: page.name,
    url: page.url,
    description: page.description,
  })),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Wonka AI",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image.jpg`,
  sameAs: [
    "https://www.linkedin.com/company/wonka-ai",
  ],
  description:
    "Wonka AI deploys private enterprise AI agents connected to your existing tools. Hosted in Azure West Europe (Microsoft Ireland), with GDPR compliance and ISO 27001 certification.",
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wonka AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Private enterprise AI platform. Deploy secure AI agents connected to SharePoint, Salesforce, Slack, Jira and more — with GDPR compliance. Hosted in Azure West Europe (Microsoft Ireland).",
  publisher: {
    "@type": "Organization",
    name: "Wonka AI",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    url: SITE_URL,
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/OnlineOnly",
  },
  featureList: [
    "Private AI agent deployment",
    "GDPR-compliant enterprise AI",
    "Connectors for SharePoint, Salesforce, Slack, Jira, HubSpot, Notion",
    "Azure West Europe hosting (Microsoft Ireland)",
    "RAG on your internal documents and knowledge base",
    "Deployed in weeks, not months",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "Wonka AI - Private Enterprise AI Agents",
      template: "%s – Wonka AI",
    },
    description:
      "Deploy private AI agents inside your company. Connected to Odoo, SharePoint, Salesforce and Slack, with GDPR compliance. Hosted in Azure West Europe (Microsoft Ireland).",
    robots: {
      index: true,
      follow: true,
    },
    // No canonical here — each page sets its own via buildMetadata
    // No hreflang here — [locale]/layout.tsx and buildMetadata handle it per-page
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn(interDisplay.variable, gtSectra.variable)}>
      <body className="font-sans antialiased">
        {GTM_ID && (
          <>
            <InlineScript
              id="gtm-consent-default"
              html={`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`}
            />
            <InlineScript
              id="gtm-script"
              html={`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
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
        <InlineScript
          id="apollo-tracker"
          html={`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"691d86987b3dc0000db97e49"})},document.head.appendChild(o)}initApollo();`}
        />
        <InlineScript
          id="wonka-attribution-tracker"
          html={ATTRIBUTION_TRACKER_SCRIPT}
        />
        <noscript>
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <CookieConsentProvider>
          {children}
          <MetaPixel />
        </CookieConsentProvider>
        <Analytics />
        <JsonLd id="schema-website" data={websiteSchema} />
        <JsonLd id="schema-site-navigation" data={siteNavigationSchema} />
        <JsonLd id="schema-organization" data={organizationSchema} />
        <JsonLd id="schema-software-application" data={softwareApplicationSchema} />
        <SpeedInsights />
      </body>
    </html>
  );
}
