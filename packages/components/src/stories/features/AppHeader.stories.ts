import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AppHeader from "../../components/features/AppHeader.vue";
import Logo from "../assets/arb-instagram-profile.webp";

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    brand: {
      label: "Agenda Rioja Baja",
      headline: "Eventos y ocio local",
      href: "#",
      logoSrc: Logo,
    },
    links: [
      { label: "Patrocínanos", href: "#", icon: "Megaphone", variant: "text" },
      { label: "Suscríbete", href: "#", icon: "Mail", variant: "text" },
      { label: "Enviar evento", href: "#", variant: "brand" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
