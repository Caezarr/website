# Repository agent guidance

Before changing UI, read:

1. `design-system/manifest.json`
2. `design-system/llms.txt`
3. `design-system/components.json`
4. `design-system/assets.json`
5. The relevant token or Storybook entry

Use `bun run ds:query -- search <term>` to discover approved tokens and components.

Never hard-code a visual value when a semantic or component token exists. Preserve existing visual output while tokens are extracted. Do not move the Next.js application or publish packages without an explicit migration plan.

Run `bun run ds:check`, `bun run lint`, and `bun run storybook:build` after design-system changes.
