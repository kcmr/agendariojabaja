import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AdSpace from "../components/AdSpace.vue";

const meta = {
  title: "Components/AdSpace",
  component: AdSpace,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["horizontal", "vertical"] },
  },
  args: { variant: "horizontal" },
} satisfies Meta<typeof AdSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { args: { variant: "horizontal" } };

export const Vertical: Story = { args: { variant: "vertical" } };
