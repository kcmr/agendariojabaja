import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import EventDetailSplit from "../../components/features/EventDetailSplit.vue";

const SAMPLE_EVENT = {
  id: 1,
  title: "Noches Estrelladas: Observación Astronómica y Música en Enciso",
  locality: "Enciso",
  date: "2026-06-06",
  time: "",
  category: "Turismo",
  img: "https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/core/953736720756253.jpg",
  imgAlt:
    "Cartel de Noches Estrelladas con fechas de observaciones astronómicas",
  price: "Gratis",
  description:
    "El programa 'Noches Estrelladas' presenta una actividad de divulgación astronómica en Enciso.\n\nSe realizará una observación astronómica guiada para redescubrir el cielo nocturno. El evento contará con acompañamiento musical en directo.",
  sourceLink: "https://example.com/evento-original",
  sourceName: "Pasea La Rioja",
  status: "upcoming" as const,
};

const meta = {
  component: EventDetailSplit,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    event: SAMPLE_EVENT,
    transitionName: "event-noches-estrelladas",
  },
} satisfies Meta<typeof EventDetailSplit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upcoming: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("heading", { level: 1, name: args.event.title })
    ).toBeInTheDocument();
    expect(
      canvas.getByRole("heading", { level: 2, name: "Sobre el evento" })
    ).toBeInTheDocument();
    expect(
      canvas.getByRole("link", { name: "Volver a la agenda" })
    ).toHaveAttribute("href", "/");
    expect(
      canvas.getByRole("link", { name: /Ver fuente original/ })
    ).toHaveAttribute("href", args.event.sourceLink);
    expect(
      canvas.getByRole("img", { name: args.event.imgAlt })
    ).toHaveAttribute("src", args.event.img);
  },
};

export const PastEvent: Story = {
  args: {
    event: {
      ...SAMPLE_EVENT,
      id: 2,
      title: "Jornada formativa: IA para tu negocio",
      locality: "Calahorra",
      date: "2026-05-26",
      time: "09:30",
      category: "Taller",
      img: "https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/core/1427652222738542.jpg",
      imgAlt: "Cartel de una jornada formativa sobre IA para negocios",
      price: undefined,
      sourceName: "Ayto Calahorra",
      status: "past" as const,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText("Este evento ya se ha celebrado")
    ).toBeInTheDocument();
    expect(canvas.queryByLabelText("Precio")).not.toBeInTheDocument();
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

export const HorizontalPoster: Story = {
  args: {
    event: {
      ...SAMPLE_EVENT,
      id: 3,
      title: "Festival de Primavera en La Rioja Baja",
      locality: "Arnedo",
      date: "2026-06-14",
      time: "18:00",
      category: "Cultura",
      img: "https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/core/1281709743949657.jpg",
      imgAlt: "Cartel vertical de un festival cultural en La Rioja Baja",
      price: undefined,
      sourceName: "Agenda municipal",
      description:
        "Una programación cultural con actividades para todos los públicos. La jornada incluye actuaciones musicales, propuestas familiares y actividades al aire libre en distintos espacios de la localidad.",
    },
  },
};
