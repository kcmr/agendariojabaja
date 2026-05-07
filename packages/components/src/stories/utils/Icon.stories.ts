import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Icon from "../../components/utils/Icon.vue";

const meta = {
  title: "utils/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["Mail", "Megaphone"],
    },
    size: {
      control: "number",
      min: 12,
      max: 48,
      step: 4,
    },
  },
  args: {
    name: "Mail",
    size: 24,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Mail",
    size: 24,
  },
};
