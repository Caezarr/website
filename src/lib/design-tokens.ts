/** Homepage design tokens — source of truth for radius and heading roles. */

export const radius = {
  /** Small callouts (e.g. how-to-start dark card) */
  xs: "rounded-xs",
  /** Cards, panels, banners (stats, security, use-cases, product cards) */
  sm: "rounded-sm",
  /** Pills, chips, avatars */
  full: "rounded-full",
} as const;

export type HeadingRole = "hero" | "section" | "subsection" | "card";

export const headingClass: Record<HeadingRole, string> = {
  hero: "type-h3",
  section: "type-h4",
  subsection: "type-h5",
  card: "type-h6",
};
