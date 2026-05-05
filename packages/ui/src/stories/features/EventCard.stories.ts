import type { Meta, StoryObj } from "@storybook/vue3-vite";
import EventCard from "../../components/features/EventCard.vue";

const meta = {
  title: "features/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  args: {
    title: "Fiestas de la Juventud y de la Cruz de Mayo en Quel",
    description:
      "Disfruta de un fin de semana lleno de actividades, música y tradición en las fiestas de la juventud de Quel.",
    image: {
      src: "https://wsrv.nl/?url=https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/1406592228168857.jpg&w=300&h=450&fit=cover",
      alt: "Cartel de las fiestas de la juventud de Quel 2026",
    },
    date: "2026-05-25",
    location: "Quel",
    isAllDay: true,
  },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAllDay: Story = {
  args: {
    isAllDay: false,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "Este es un título de evento extremadamente largo para probar cómo se comporta el truncado de texto y la disposición de los elementos",
  },
};
