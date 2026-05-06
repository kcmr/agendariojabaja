import type { Meta, StoryObj } from "@storybook/vue3-vite";
import EventDetail from "../../components/features/EventDetail.vue";

const SAMPLE_EVENT = {
  id: 1,
  title: "Cata de Vinos y Maridaje",
  locality: "Calahorra",
  date: "2026-04-24",
  time: "19:30",
  category: "Gastronomía",
  img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200&h=600",
  price: "25€",
  description:
    "Descubre los sabores de La Rioja Baja en esta cata exclusiva. Probaremos 4 vinos de bodegas locales maridados con pinchos elaborados con producto de kilómetro cero. Una experiencia perfecta para adentrarse en la cultura vitivinícola de nuestra tierra, guiada por enólogos expertos.",
  sourceLink: "https://facebook.com",
  sourceName: "Facebook",
  status: "upcoming" as const,
};

const meta = {
  title: "features/EventDetail",
  component: EventDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    event: SAMPLE_EVENT,
  },
} satisfies Meta<typeof EventDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upcoming: Story = {};

export const PastEvent: Story = {
  args: {
    event: {
      ...SAMPLE_EVENT,
      id: 7,
      title: "Carnavales 2026",
      date: "2026-02-15",
      time: "18:00",
      category: "Fiestas",
      price: "Gratis",
      img: "https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/1551583753635319.jpg",
      description:
        "Desfile de carrozas y comparsas por las calles céntricas de Calahorra. Concurso de disfraces con premios en metálico para las mejores categorías individuales y grupales.",
      status: "past" as const,
    },
  },
};

export const WithoutTags: Story = {
  args: {
    event: {
      ...SAMPLE_EVENT,
      category: undefined,
      price: undefined,
    },
  },
};
