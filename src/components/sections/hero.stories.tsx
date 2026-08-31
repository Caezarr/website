import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Hero } from "./hero";

const meta = {
  title: "Compositions/Homepage Hero Experiment",
  component: Hero,
  args: {
    meetingUrl: "/contact",
    meetingLabel: "Book a 30 min call",
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Control: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("link", { name: "Book a 30 min call" }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      canvas.queryByAltText(/WonkaChat interface/i),
    ).not.toBeInTheDocument();
  },
};

export const ProductPreview: Story = {
  args: {
    showProductUI: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("link", { name: "Book a 30 min call" }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      canvas.getByAltText(/WonkaChat interface/i),
    ).toBeInTheDocument();
  },
};
