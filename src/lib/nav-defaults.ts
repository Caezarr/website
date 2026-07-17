import type { NavItem } from "@/lib/types";

export const DEFAULT_NAVIGATION: NavItem[] = [
  {
    _key: "what-we-do",
    itemType: "dropdown",
    label: "What we do",
    children: [
      {
        _key: "start-ai",
        label: "Start AI",
        href: "/start-ai",
        description: "Create your company's AI strategy",
      },
      {
        _key: "wonka-build",
        label: "Wonka Build",
        href: "/wonka-build",
        description: "Build custom AI applications",
      },
      {
        _key: "wonka-chat",
        label: "WonkaChat",
        href: "/wonka-chat",
        description: "A secure AI chat connected to your tools",
      },
    ],
  },
  {
    _key: "how-we-work",
    itemType: "link",
    label: "How we work",
    href: "/#solution",
  },
  {
    _key: "contact",
    itemType: "link",
    label: "Contact",
    href: "/contact",
  },
];

export function resolveNavigation(
  cms: NavItem[] | null | undefined,
): NavItem[] {
  return cms?.length ? cms : DEFAULT_NAVIGATION;
}
