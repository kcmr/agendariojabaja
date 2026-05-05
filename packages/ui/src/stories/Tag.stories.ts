import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Tag from "../components/Tag.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "ARB/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "muted"],
    },
    default: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    default: "This is a tag",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    variant: "muted",
  },
};
