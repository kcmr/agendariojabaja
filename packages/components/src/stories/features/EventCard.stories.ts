import type { Meta, StoryObj } from "@storybook/vue3-vite";
import EventCard from "../../components/features/EventCard.vue";

const meta = {
  title: "features/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    heading: "Fiestas de la Juventud y de la Cruz de Mayo en Quel",
    text: "Disfruta de un fin de semana lleno de actividades, música y tradición en las fiestas de la juventud de Quel.",
    image: {
      src: "https://wsrv.nl/?url=https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/1406592228168857.jpg&w=300&h=450&fit=cover",
      alt: "Cartel de las fiestas de la juventud de Quel 2026",
    },
    link: "https://example.com/event-details",
    dateTime: "2026-05-02",
    location: "Quel",
  },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHour: Story = {
  args: {
    hour: "14:00, 22:00",
  },
};

export const LongTitle: Story = {
  args: {
    heading:
      "Este es un título de evento extremadamente largo para probar cómo se comporta el truncado de texto y la disposición de los elementos",
  },
};

export const IncorrectDate: Story = {
  args: {
    dateTime: "not-a-date",
  },
};
