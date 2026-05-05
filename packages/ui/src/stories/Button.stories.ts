import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import Button from "../components/Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    backgroundColor: { control: "color" },
  },
  args: {
    primary: false,
    onClick: fn(),
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
