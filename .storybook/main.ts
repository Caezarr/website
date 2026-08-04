import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: [{ from: "../public", to: "/" }],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    // Storybook's staticDirs owns this copy. Leaving Vite's publicDir enabled
    // makes both processes race to create the same nested directories.
    publicDir: false,
  }),
};

export default config;
