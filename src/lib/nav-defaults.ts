import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import { en } from "@/i18n/messages/en";
import { fr } from "@/i18n/messages/fr";
import { nl } from "@/i18n/messages/nl";
import type { NavItem } from "@/lib/types";

/** English header CTA label. Localized: `getT(locale)("shell.headerCta")`. */
export const HEADER_CTA_LABEL = "Get started";

/** Toggle when locale switching is ready to ship. */
export const SHOW_LANGUAGE_SWITCHER = true;

export const DEFAULT_NAVIGATION: NavItem[] = [
  {
    _key: "ai-workspace",
    itemType: "dropdown",
    label: "AI Workspace",
    href: "/",
    children: [
      {
        _key: "overview",
        label: "Overview",
        href: "/",
        description: "Discover Wonka Workspace",
      },
      {
        _key: "ai-chat",
        label: "AI Chat",
        href: "/workspace/ai-chat",
        description: "Chat with your data, safely",
      },
      {
        _key: "ai-agents",
        label: "AI Agents",
        href: "/workspace/ai-agents",
        description: "Delegate recurring tasks to AI",
        disabled: true,
      },
      {
        _key: "governance",
        label: "Governance",
        href: "/workspace/governance",
        disabled: true,
      },
      {
        _key: "integrations",
        label: "Integrations",
        href: "/integrations",
        disabled: true,
      },
    ],
  },
  {
    _key: "ai-services",
    itemType: "dropdown",
    label: "AI Services",
    href: "/services",
    children: [
      {
        _key: "ai-strategy",
        label: "AI Strategy",
        href: "/start-ai",
        description: "Become AI native in four weeks",
      },
      {
        _key: "ai-agent-development",
        label: "AI Agent Development",
        href: "/services/ai-agent-development",
        description: "We build your agents and ship them",
        disabled: true,
      },
    ],
  },
  {
    _key: "company",
    itemType: "dropdown",
    label: "Company",
    children: [
      {
        _key: "jobs",
        label: "Jobs",
        href: "https://wonka-ai.odoo.com/jobs",
        external: true,
      },
      { _key: "contact", label: "Contact", href: "/contact" },
    ],
  },
  {
    _key: "pricing",
    itemType: "link",
    label: "Pricing",
    href: "/pricing",
  },
];

type NavMessages = Record<
  string,
  {
    label?: string;
    children?: Record<string, { label?: string; description?: string }>;
  }
>;

const NAV_MESSAGES: Record<Locale, NavMessages> = {
  en: en.shell.nav,
  fr: fr.shell.nav,
  nl: nl.shell.nav,
};

/**
 * `DEFAULT_NAVIGATION` with labels/descriptions from `shell.nav` and internal
 * hrefs mapped to `locale` (pages without a localized version keep their EN
 * href). Structure, keys and disabled flags are identical in every locale.
 */
export function getNavigation(locale: Locale): NavItem[] {
  const messages: NavMessages = NAV_MESSAGES[locale];

  return DEFAULT_NAVIGATION.map((item) => {
    const itemMessages = messages[item._key];
    return {
      ...item,
      label: itemMessages?.label ?? item.label,
      ...(item.href ? { href: localizeHref(item.href, locale) } : {}),
      ...(item.children
        ? {
            children: item.children.map((child) => {
              const childMessages = itemMessages?.children?.[child._key];
              return {
                ...child,
                label: childMessages?.label ?? child.label,
                ...(child.description
                  ? { description: childMessages?.description ?? child.description }
                  : {}),
                href: child.external ? child.href : localizeHref(child.href, locale),
              };
            }),
          }
        : {}),
    };
  });
}

export function resolveNavigation(
  cms: NavItem[] | null | undefined,
  locale: Locale = "en",
): NavItem[] {
  void cms;
  return getNavigation(locale);
}
