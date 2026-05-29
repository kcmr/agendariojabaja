import type { Meta, StoryObj } from "@storybook/vue3-vite";
import NewsletterSignup from "../../components/features/NewsletterSignup.vue";

const meta = {
  component: NewsletterSignup,
  tags: ["autodocs"],
  args: {
    action: "https://app.kit.com/forms/9152132/subscriptions",
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongCopy: Story = {
  args: {
    description:
      "Recibe una selección semanal de planes, conciertos, mercados, fiestas y actividades familiares de toda La Rioja Baja directamente en tu correo electrónico.",
    hint: "Te enviaremos solo contenido editorial de Agenda Rioja Baja. Puedes darte de baja desde cualquier email.",
  },
};
