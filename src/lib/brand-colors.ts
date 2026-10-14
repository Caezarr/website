import { tokenCatalog, type TokenId } from "@wonka/tokens";

/**
 * Raw hex value of a design-system colour token, for renderers that cannot
 * read CSS variables (OG images, PDFs).
 */
export function tokenHex(id: TokenId): string {
  const token = tokenCatalog.tokens.find((item) => item.id === id);
  const value = token?.values.light;
  if (typeof value !== "string" || !value.startsWith("#")) {
    throw new Error(`Design token ${id} is not a colour`);
  }
  return value;
}

/** The fixed palette used by the blueprint OG image and PDF. */
export const BLUEPRINT_BRAND = {
  black: tokenHex("color.neutral.black"),
  white: tokenHex("color.neutral.white"),
  lightGray: tokenHex("color.neutral.light-gray"),
  midGray: tokenHex("color.neutral.mid-gray"),
  darkGray: tokenHex("color.neutral.dark-gray"),
  lightBrown: tokenHex("color.neutral.light-brown"),
  blue100: tokenHex("color.blue.100"),
  blue300: tokenHex("color.blue.300"),
  blue700: tokenHex("color.blue.700"),
  blue900: tokenHex("color.blue.900"),
  green300: tokenHex("color.green.300"),
} as const;
