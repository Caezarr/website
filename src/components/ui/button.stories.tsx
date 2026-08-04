import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ButtonLink } from "./button";

const meta = {
  title: "Actions/Button",
  component: Button,
  args: {
    children: "Start a project",
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "underline"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Wonka’s primary action primitive. The slanted silhouette is a signature brand element and the action color is selected for WCAG AA text contrast.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "See how it works",
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-10">
        <Story />
      </div>
    ),
  ],
};

export const Underline: Story = {
  args: {
    variant: "underline",
    children: "Read the case study",
  },
};

export const Link: Story = {
  render: () => (
    <ButtonLink href="/contact" variant="primary">
      Talk to Wonka
    </ButtonLink>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Unavailable",
  },
};
