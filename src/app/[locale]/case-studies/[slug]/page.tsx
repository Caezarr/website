import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDY_QUERY, CASE_STUDY_SLUGS_QUERY, RELATED_BLOG_POSTS_QUERY, RELATED_CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { getContentLanguages } from "@/lib/content-languages";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { getEvergreenInternalLinks } from "@/lib/internal-links";
import type { Locale } from "@/i18n/config";
import type { BlogPost, CaseStudy, ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(CASE_STUDY_SLUGS_QUERY);
  const slugs = (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
  
  // Add static fallback case studies
  const staticCaseStudies = [
    { locale: "en", slug: "itzu" },
    { locale: "en", slug: "n-allo" }
  ];
  
  return [...slugs, ...staticCaseStudies];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as CaseStudy;
  const siteUrl = getSiteUrl();
  const languages = await getContentLanguages(siteUrl, "case-studies", slug);
  return buildMetadata(c.seo ?? null, { path: itemPath('case-studies', locale, slug), fallbackTitle: c.headline, locale, languages });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  
  // Static fallback for production case studies if CMS data is not available
  let c: CaseStudy | null = data as CaseStudy | null;
  
  if (!c && slug === "itzu" && locale === "en") {
    c = {
      _id: "itzu-fallback",
      slug: { current: "itzu" },
      language: "en",
      clientName: "Itzu",
      clientLogo: null,
      headline: "How Itzu empowers every employee with personal AI assistants",
      excerpt: "Belgian recruitment agency Itzu deployed personal WonkaChat assistants to 100% of their workforce, saving multiple hours per employee each week.",
      sector: "Recruitment & HR",
      publishedAt: "2026-08-01T00:00:00Z",
      results: [
        "100% employee adoption",
        "Multiple hours saved per employee weekly",
        "Connected to internal knowledge systems",
        "Personal AI assistant for each team member"
      ],
      body: [
        {
          _type: "block",
          _key: "intro",
          children: [
            {
              _type: "span",
              _key: "intro-text",
              text: "Itzu, a leading Belgian recruitment agency, recognized that their teams were spending significant time on repetitive tasks: searching internal knowledge bases, drafting routine communications, and extracting insights from candidate data.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "challenge",
          children: [
            {
              _type: "span",
              _key: "challenge-text",
              text: "The challenge was to give every employee access to AI tools that could help with their daily work, while maintaining data security and ensuring adoption across the organization.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "solution",
          children: [
            {
              _type: "span",
              _key: "solution-text",
              text: "Wonka AI deployed personal WonkaChat instances for each employee, connected to Itzu's internal systems and knowledge bases. Each assistant was configured with role-specific context and access permissions, ensuring employees could query company data securely.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "result",
          children: [
            {
              _type: "span",
              _key: "result-text",
              text: "The deployment achieved 100% adoption across the workforce. Employees use their personal AI assistants for everything from candidate research to drafting job descriptions, with each team member saving multiple hours per week on routine tasks.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        }
      ] as never,
      tags: ["recruitment", "knowledge-management", "employee-productivity"],
      seo: null,
      faq: []
    };
  }
  
  if (!c && slug === "n-allo" && locale === "en") {
    c = {
      _id: "n-allo-fallback",
      slug: { current: "n-allo" },
      language: "en",
      clientName: "N-allo (Engie)",
      clientLogo: null,
      headline: "N-allo cuts support email time by 50% with AI agents",
      excerpt: "Engie subsidiary N-allo deployed AI agents to handle support emails, reducing response time by 50% and increasing team capacity by 70%.",
      sector: "Energy & Utilities",
      publishedAt: "2026-07-15T00:00:00Z",
      results: [
        "50% reduction in support email handling time",
        "70% capacity increase across +70 employees",
        "Connected to internal CRM and knowledge systems",
        "Automated email triage and response drafting"
      ],
      body: [
        {
          _type: "block",
          _key: "intro",
          children: [
            {
              _type: "span",
              _key: "intro-text",
              text: "N-allo, an Engie group subsidiary, faced a growing volume of customer support emails that was stretching their team's capacity. Support agents were spending significant time on repetitive queries and manual email triage.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "challenge",
          children: [
            {
              _type: "span",
              _key: "challenge-text",
              text: "The team needed a solution that could handle routine support queries while maintaining the quality and accuracy of responses, all while keeping customer data secure within their systems.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "solution",
          children: [
            {
              _type: "span",
              _key: "solution-text",
              text: "Wonka AI built custom AI agents connected to N-allo's CRM and internal knowledge base. The agents automatically triage incoming support emails, draft responses for common queries, and surface relevant information from past interactions and documentation.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "result",
          children: [
            {
              _type: "span",
              _key: "result-text",
              text: "The deployment reduced time spent handling support emails by 50% across the team. This capacity increase allowed the same team to handle 70% more volume, improving customer response times and freeing agents to focus on complex cases requiring human judgment.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        }
      ] as never,
      tags: ["customer-support", "email-automation", "crm"],
      seo: null,
      faq: []
    };
  }
  
  if (!c) notFound();
  const [{ data: relatedPosts }, { data: relatedConnectors }] = await Promise.all([
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
    sanityFetch({ query: RELATED_CONNECTOR_PAGES_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('case-studies', locale, slug)}`;
  const parentUrl = `${siteUrl}${hubPath('case-studies', locale)}`;
  const relatedGuidesLabel = locale === "fr" ? "Guides liés" : locale === "nl" ? "Gerelateerde gidsen" : "Related guides";
  const relatedIntegrationsLabel = locale === "fr" ? "Intégrations liées" : locale === "nl" ? "Gerelateerde integraties" : "Related integrations";
  const exploreMoreLabel = locale === "fr" ? "Explorer les sujets IA liés" : locale === "nl" ? "Verken gerelateerde AI-thema's" : "Explore related AI topics";
  const rolloutTitle = locale === "fr" ? "Ce qu'il faut retenir du déploiement" : locale === "nl" ? "Wat je uit deze uitrol kunt leren" : "What to learn from this deployment";
  const rolloutBody = {
    en: `A strong private AI deployment connects a concrete business workflow, a trusted data source, and a clear control model. For ${c.clientName}, the important pattern is not only the AI interface, but the way teams can use governed answers inside their existing operating rhythm.`,
    fr: `Un bon déploiement d'IA privée relie un workflow métier concret, une source de données fiable et un modèle de contrôle clair. Pour ${c.clientName}, le point important n'est pas seulement l'interface IA, mais la capacité des équipes à utiliser des réponses gouvernées dans leur rythme de travail existant.`,
    nl: `Een sterke private AI-uitrol verbindt een concrete bedrijfsworkflow, een betrouwbare databron en een duidelijk controlemodel. Voor ${c.clientName} gaat het niet alleen om de AI-interface, maar om hoe teams beheerste antwoorden gebruiken binnen hun bestaande werkritme.`,
  }[locale];
  const evergreenLinks = getEvergreenInternalLinks(locale, "case-studies", itemPath("case-studies", locale, slug));

  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <ArticleSchema title={c.headline} description={c.excerpt} publishedAt={c.publishedAt ?? new Date().toISOString()} url={pageUrl} />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Case Studies", url: parentUrl }, { name: c.clientName, url: pageUrl }]} />
      {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

      <span className="type-eyebrow text-text/40 block mb-4">{c.sector}</span>
      <h1 className="type-h2 mb-6">{c.headline}</h1>

      {c.results?.length ? (
        <div className="grid grid-cols-2 gap-4 mb-12">
          {c.results.map((r, i) => <div key={i} className="p-4 bg-light-gray rounded-lg"><p className="type-paragraph-m-bold">{r}</p></div>)}
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none">{c.body && <PortableText value={c.body as never} />}</div>

      <section className="mt-16 rounded-lg border border-border bg-mid-gray p-6">
        <h2 className="type-h5">{rolloutTitle}</h2>
        <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{rolloutBody}</p>
      </section>

      {c.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          {c.faq.map((item, i) => <div key={i} className="mb-6"><h3 className="type-paragraph-m-bold mb-2">{item.question}</h3><p className="type-paragraph-m text-text/60">{item.answer}</p></div>)}
        </section>
      ) : null}

      {((relatedPosts as BlogPost[])?.length || (relatedConnectors as ConnectorPage[])?.length) ? (
        <section className="mt-16 border-t border-border pt-12">
          <div className="grid gap-8 md:grid-cols-2">
            {(relatedConnectors as ConnectorPage[])?.length ? (
              <div>
                <h2 className="type-h6 mb-5 text-text/50">{relatedIntegrationsLabel}</h2>
                <div className="grid gap-3">
                  {(relatedConnectors as ConnectorPage[]).map((connector) => (
                    <a key={connector._id} href={itemPath("connectors", locale, connector.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                      <p className="type-paragraph-m-bold group-hover:text-accent">{connector.toolName}</p>
                      <p className="mt-1 line-clamp-2 type-paragraph-s text-text/50">{connector.tagline}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {(relatedPosts as BlogPost[])?.length ? (
              <div>
                <h2 className="type-h6 mb-5 text-text/50">{relatedGuidesLabel}</h2>
                <div className="grid gap-3">
                  {(relatedPosts as BlogPost[]).map((post) => (
                    <a key={post._id} href={itemPath("blog", locale, post.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                      <span className="type-eyebrow text-text/30">{post.category}</span>
                      <p className="mt-2 type-paragraph-m-bold group-hover:text-accent">{post.title}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <InternalLinkGrid title={exploreMoreLabel} links={evergreenLinks} className="mt-16" />
    </main>
  );
}
