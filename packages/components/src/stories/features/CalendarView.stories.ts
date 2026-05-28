import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import CalendarView from "../../components/features/CalendarView.vue";

const EVENTS = [
  {
    id: "1",
    title: "Cata de Vinos y Maridaje",
    date: "2026-04-24",
    time: "19:30",
    href: "/eventos/cata-de-vinos/",
    status: "upcoming",
    location: "Calahorra",
    category: "Gastronomía",
  },
  {
    id: "2",
    title: "Concierto Acústico en la Plaza",
    date: "2026-04-25",
    time: "22:00",
    href: "/eventos/concierto-acustico/",
    status: "upcoming",
    location: "Arnedo",
    category: "Música",
  },
  {
    id: "3",
    title: "Mercado de Artesanía Local",
    date: "2026-04-26",
    time: "10:00 - 14:00",
    href: "/eventos/mercado-artesania/",
    status: "upcoming",
    location: "Alfaro",
    category: "Mercados",
  },
  {
    id: "4",
    title: "Ruta de Senderismo: Miradores",
    date: "2026-04-26",
    time: "09:00",
    href: "/eventos/ruta-senderismo/",
    status: "upcoming",
    location: "Autol",
    category: "Naturaleza",
  },
] as const;

const meta = {
  component: CalendarView,
  tags: ["autodocs"],
  args: {
    events: EVENTS,
    initialMonth: "2026-04",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("heading", { name: /abril de 2026/i })
    ).toBeInTheDocument();
    expect(
      canvas.getAllByRole("link", { name: /cata de vinos/i })[0]
    ).toHaveAttribute("href", "/eventos/cata-de-vinos/");

    await userEvent.click(
      canvas.getByRole("button", { name: "Mes siguiente" })
    );
    expect(
      canvas.getByRole("heading", { name: /mayo de 2026/i })
    ).toBeInTheDocument();
  },
};

export const MultipleEventsSameDay: Story = {
  args: {
    events: EVENTS.filter((event) => event.date === "2026-04-26"),
    initialMonth: "2026-04",
  },
};

export const EmptyMonth: Story = {
  args: {
    events: [],
    initialMonth: "2026-04",
  },
};

export const PastEvents: Story = {
  args: {
    events: [
      {
        id: "past-1",
        title: "Carnavales 2026",
        date: "2026-02-15",
        time: "18:00",
        href: "/eventos/carnavales/",
        status: "past",
        location: "Calahorra",
      },
    ],
    initialMonth: "2026-02",
  },
};

export const LongTitles: Story = {
  args: {
    events: [
      {
        id: "long-1",
        title:
          "Este es un título de evento extremadamente largo para probar el truncado en la cuadrícula mensual",
        date: "2026-04-24",
        time: "17:00 - 20:00",
        href: "/eventos/titulo-largo/",
        status: "upcoming",
        location: "Calahorra",
      },
    ],
    initialMonth: "2026-04",
  },
};

export const Mobile: Story = {
  args: {
    events: EVENTS,
    initialMonth: "2026-04",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
