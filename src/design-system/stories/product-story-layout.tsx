import type { Decorator } from "@storybook/nextjs-vite";
import { ProductTheme } from "../../../packages/product-ui/src";
import "../../../packages/product-ui/src/styles.css";
import "../../../apps/wonkachat-lab/src/product/lab.css";
export const productDecorator: Decorator = (Story, context) => (
  <ProductTheme theme={context.globals.theme === "dark" ? "dark" : "light"}>
    <div style={{ padding: 28 }}>
      <Story />
    </div>
  </ProductTheme>
);
