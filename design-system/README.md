# Wonka Design System

This directory is the source of truth for Wonka’s visual language across products, websites, campaigns, presentations, and agent-generated artifacts.

The first production increment deliberately stays inside the website repository. It establishes stable contracts before components are extracted into publishable packages.

## Source and generated files

| Role | Canonical source | Generated consumer |
| --- | --- | --- |
| Tokens | `tokens/wonka.tokens.json` | `src/styles/generated/tokens.css` |
| Token API | `tokens/wonka.tokens.json` | `src/design-system/generated/tokens.ts` |
| Agent token catalog | `tokens/wonka.tokens.json` | `public/design-system/tokens.json` |
| Component catalog | `components.json` | `public/design-system/components.json` |
| Asset catalog | `assets.json` | `public/design-system/assets.json` |
| System manifest | `manifest.json` | `public/design-system/manifest.json` |
| Agent guidance | `llms.txt` | `public/design-system/llms.txt` |

Never edit generated files directly.

## Commands

```bash
bun run ds:build
bun run ds:check
bun run ds:query -- manifest
bun run ds:query -- tokens
bun run ds:query -- token semantic.color.background --theme dark
bun run ds:query -- component component.button
bun run ds:query -- asset asset.logo.wordmark
bun run ds:query -- search focus
bun run storybook
bun run storybook:build
```

## Token model

Tokens use four layers:

1. **Primitive:** fixed colors, dimensions, shadows, typography, and motion.
2. **Semantic:** intent that can change by theme, such as `semantic.color.background`.
3. **Component:** approved decisions for a component, such as `component.button.primary.background`.
4. **Channel:** future product, campaign, and presentation adaptations that preserve semantic intent.

Consumers use semantic or component tokens. Raw primitive values are reserved for illustrations, data visualisation, and explicitly approved fixed-color assets.

## Change lifecycle

`draft → beta → stable → deprecated → retired`

Every release has a semantic version and an immutable `brandVersionId`. Breaking token or component changes require a major version. Activation and publication remain human decisions.

## Production roadmap

1. Tokens, manifest, Storybook foundations, and query interface.
2. Visual regression, accessibility tests, and generated-file CI.
3. Extract framework-neutral primitives into `@wonka/react`.
4. Publish `@wonka/tokens`, brand assets, and campaign/presentation adapters.
5. Expose the stable query and validation contracts through MCP.
