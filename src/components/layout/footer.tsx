import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { CookieSettingsLink } from "@/components/cookie-consent/cookie-settings-link";
import { cn } from "@/lib/utils";
import type { FooterLink, FooterLinkGroup } from "@/lib/types";

interface FooterProps {
  linkGroups: FooterLinkGroup[] | null;
}

type FooterDisplayLink = Omit<FooterLink, "href"> & {
  href?: string;
};

type FooterDisplayGroup = Omit<FooterLinkGroup, "links"> & {
  links: FooterDisplayLink[];
};

const LEGAL_LINKS = [
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
];

const FOOTER_LINK_GROUPS: FooterDisplayGroup[] = [
  {
    _key: "default-product",
    title: "Product",
    links: [
      { _key: "start-ai", label: "StartAI", href: "/start-ai" },
      { _key: "wonka-chat", label: "WonkaChat", href: "/wonka-chat" },
      { _key: "wonka-build", label: "WonkaBuild" },
    ],
  },
  {
    _key: "default-connect",
    title: "Connect",
    links: [
      {
        _key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/wonka-ai",
        external: true,
      },
    ],
  },
  {
    _key: "default-resources",
    title: "Resources",
    links: [
      { _key: "ai-agents", label: "AI Agents", href: "/ai-agents" },
      { _key: "blog", label: "Blog", href: "/blog" },
      { _key: "connectors", label: "Connectors", href: "/integrations" },
      { _key: "glossary", label: "Glossary", href: "/learn" },
      { _key: "comparisons", label: "Comparisons", href: "/vs" },
      { _key: "case-studies", label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    _key: "default-company",
    title: "Company",
    links: [
      { _key: "home", label: "Home", href: "/" },
      {
        _key: "demo",
        label: "Book a demo",
        href: "https://www.cal.eu/team/wonka-ai-experts/demonstration-call",
        external: true,
      },
      {
        _key: "careers",
        label: "Careers",
        href: "https://wonka-ai.odoo.com/jobs",
        external: true,
      },
    ],
  },
];

function FooterColumnLink({ link }: { link: FooterDisplayLink }) {
  const className =
    "type-paragraph-s text-text block w-full transition-opacity hover:opacity-60";

  if (!link.href) {
    return <span className="type-paragraph-s block w-full text-text/45">{link.label}</span>;
  }

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterColumn({ group }: { group: FooterDisplayGroup }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="type-eyebrow text-text/60">{group.title}</p>
      <ul className="flex flex-col gap-2">
        {group.links?.map((link) => (
          <li
            key={link._key}
            className="border-b border-dashed border-border pb-2"
          >
            <FooterColumnLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ linkGroups }: FooterProps) {
  const year = new Date().getFullYear();
  void linkGroups;
  const groups = FOOTER_LINK_GROUPS;
  const groupCount = groups.length;

  return (
    <Section
      as="footer"
      className="border-t border-dashed border-border bg-background"
      containerClassName="flex flex-col gap-12 py-10 md:py-12 lg:gap-20"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-5">
        <div className="flex flex-1 flex-col gap-4">
          <Link href="/" aria-label="Wonka" className="inline-block w-fit">
            <Logo />
          </Link>
          <p className="type-paragraph-m text-text/80">
            Most companies have AI.
            <br />
            Few have it working for everyone.
          </p>
        </div>

        <div
          className={cn(
            "grid gap-x-5 gap-y-10 sm:gap-y-12 lg:flex lg:flex-1 lg:gap-5",
            groupCount === 1 && "grid-cols-1",
            groupCount === 2 && "grid-cols-2",
            groupCount >= 3 && "grid-cols-2 sm:grid-cols-3",
          )}
        >
          {groups.map((group) => (
            <div key={group._key} className="lg:flex-1">
              <FooterColumn group={group} />
            </div>
          ))}
        </div>
      </div>

      <div className="type-eyebrow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-text/60">{year} Wonka, all rights reserved.</p>
        <ul className="flex flex-wrap gap-x-10 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text/60 transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsLink className="text-text/60 transition-colors hover:text-text" />
          </li>
        </ul>
      </div>
    </Section>
  );
}
