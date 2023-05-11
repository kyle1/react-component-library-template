import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    fullWidth: {
      type: "boolean",
    },
    fullHeight: {
      type: "boolean",
    },
    bordered: {
      type: "boolean",
    },
    rounded: {
      type: "boolean",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Click me" },
};

export const Primary: Story = {
  name: "Variant: Primary",
  args: { variant: "primary", children: "Click me" },
};

export const Secondary: Story = {
  name: "Variant: Secondary",
  args: { variant: "secondary", children: "Click me" },
};

export const Success: Story = {
  name: "Variant: Success",
  args: { variant: "success", children: "Click me" },
};

export const Danger: Story = {
  name: "Variant: Danger",
  args: { variant: "danger", children: "Click me" },
};

export const Small: Story = { name: "Size: Small", args: { size: "sm", children: "Click me" } };

export const Medium: Story = { name: "Size: Medium", args: { size: "md", children: "Click me" } };

export const Large: Story = { name: "Size: Large", args: { size: "lg", children: "Click me" } };

export const Bordered: Story = { args: { bordered: true, children: "Click me" } };

export const Disabled: Story = {
  args: { children: "Click me", disabled: true },
};

export const Rounded: Story = { args: { rounded: true, children: "Click me" } };
