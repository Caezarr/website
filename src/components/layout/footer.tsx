import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { CookieSettingsLink } from "@/components/cookie-consent/cookie-settings-link";
import { cn } from "@/lib/utils";
import type { FooterLink, FooterLinkGroup } from "@/lib/types";

interface FooterProps {
  linkGroups: FooterLinkGroup[] | null;
}

const LEGAL_LINKS = [
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
];

const DEFAULT_LINK_GROUPS: FooterLinkGroup[] = [
  {
    _key: "default-product",
    title: "Product",
    links: [
      { _key: "ai-agents", label: "AI Agents", href: "/ai-agents" },
      { _key: "integrations", label: "Integrations", href: "/integrations" },
      { _key: "start-ai", label: "Start AI", href: "/start-ai" },
    ],
  },
  {
    _key: "default-resources",
    title: "Resources",
    links: [
      { _key: "case-studies", label: "Case Studies", href: "/case-studies" },
      { _key: "blog", label: "Blog", href: "/blog" },
      { _key: "learn", label: "Learn", href: "/learn" },
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
    ],
  },
];

function mergeFooterLinkGroups(linkGroups: FooterLinkGroup[] | null): FooterLinkGroup[] {
  if (!linkGroups?.length) return DEFAULT_LINK_GROUPS;

  const existingHrefs = new Set(
    linkGroups.flatMap((group) => group.links?.map((link) => link.href) ?? []),
  );

  const missingDefaultGroups = DEFAULT_LINK_GROUPS
    .map((group) => ({
      ...group,
      links: group.links.filter((link) => !existingHrefs.has(link.href)),
    }))
    .filter((group) => group.links.length > 0);

  return [...linkGroups, ...missingDefaultGroups];
}

function FooterColumnLink({ link }: { link: FooterLink }) {
  const className =
    "type-paragraph-s text-text block w-full transition-opacity hover:opacity-60";

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

function FooterColumn({ group }: { group: FooterLinkGroup }) {
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
  const groups = mergeFooterLinkGroups(linkGroups);
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
