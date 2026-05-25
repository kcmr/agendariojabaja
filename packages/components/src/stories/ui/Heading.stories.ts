import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Heading from "../../components/ui/Heading.vue";

const meta = {
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
  args: { level: 1, variant: "h1", default: "Heading text" },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: { level: 1, variant: "h1" },
};

export const H2: Story = {
  args: { level: 2, variant: "h2" },
};

export const H3: Story = {
  args: { level: 3, variant: "h3" },
};

export const H4: Story = {
  args: { level: 4, variant: "h4" },
};

export const H5: Story = {
  args: { level: 5, variant: "h5" },
};

export const H6: Story = {
  args: { level: 6, variant: "h6" },
};
