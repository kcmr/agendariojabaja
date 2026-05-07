import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AppHeader from "../../components/features/AppHeader.vue";

const meta: Meta<typeof AppHeader> = {
  title: "features/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  args: {
    links: [
      { label: "Patrocínanos", href: "#", icon: "Megaphone", variant: "text" },
      { label: "Suscríbete", href: "#", icon: "Mail", variant: "text" },
      { label: "Publicar Evento", href: "#", variant: "brand" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
