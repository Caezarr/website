import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "@/lib/fonts";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-provider";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const GTM_ID = "GTM-5LCPHCRF";
const GA_MEASUREMENT_ID = "G-K27JB3MYL1";
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
      default: "Wonka AI - Private Enterprise AI Agents",
      template: "%s – Wonka AI",
    },
    description:
      "Deploy private AI agents inside your company. Connected to Odoo, SharePoint, Salesforce and Slack, with GDPR compliance and no data leaving your environment.",
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
              strategy="beforeInteractive"
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
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
          }}
        />
        <CookieConsentProvider>{children}</CookieConsentProvider>
        <Analytics />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script
          id="schema-site-navigation"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
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
