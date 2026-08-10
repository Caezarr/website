import type { FooterLink, FooterLinkGroup } from "@/lib/types";

export type FooterDisplayLink = Omit<FooterLink, "href"> & {
  href?: string;
};

export type FooterDisplayGroup = Omit<FooterLinkGroup, "links"> & {
  links: FooterDisplayLink[];
};

export const FOOTER_LINK_GROUPS: FooterDisplayGroup[] = [
  {
    _key: "workspace",
    title: "Workspace",
    links: [
      { _key: "overview", label: "Overview", href: "/workspace" },
      { _key: "ai-chat", label: "AI Chat", href: "/workspace/ai-chat" },
      { _key: "ai-agents", label: "AI Agents", href: "/workspace/ai-agents" },
      { _key: "ai-apps", label: "AI Apps", href: "/workspace/ai-apps" },
      {
        _key: "ai-automations",
        label: "AI Automations",
        href: "/workspace/ai-automations",
      },
      { _key: "integrations", label: "Integrations", href: "/integrations" },
      { _key: "governance", label: "Governance", href: "/workspace/governance" },
    ],
  },
  {
    _key: "services",
    title: "Services",
    links: [
      { _key: "ai-strategy", label: "AI Strategy", href: "/services/ai-strategy" },
      {
        _key: "ai-agent-development",
        label: "AI Agent Development",
        href: "/services/ai-agent-development",
      },
      {
        _key: "ai-app-development",
        label: "AI App Development",
        href: "/services/ai-app-development",
      },
      { _key: "ai-training", label: "AI Training", href: "/services/ai-training" },
    ],
  },
  {
    _key: "resources",
    title: "Resources",
    links: [
      { _key: "use-cases", label: "Use cases", href: "/use-cases" },
      { _key: "clients", label: "Clients", href: "/clients" },
      { _key: "agent-library", label: "Agent library", href: "/agent-library" },
      { _key: "comparisons", label: "Comparisons", href: "/vs" },
      { _key: "glossary", label: "Glossary", href: "/learn" },
      { _key: "blog", label: "Blog", href: "/blog" },
    ],
  },
  {
    _key: "company",
    title: "Company",
    links: [
      { _key: "about", label: "About Wonka", href: "/about" },
      { _key: "team", label: "Team", href: "/team" },
      { _key: "jobs", label: "Jobs", href: "/jobs" },
      { _key: "contact", label: "Contact", href: "/contact" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];
