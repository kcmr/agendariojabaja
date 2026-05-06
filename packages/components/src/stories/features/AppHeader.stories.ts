import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AppHeader from "../../components/features/AppHeader.vue";

const meta = {
  title: "features/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
