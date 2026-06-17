import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import CalendarView from "../../components/features/CalendarView.vue";

const today = new Date();
const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

const toIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const toIsoMonth = (date: Date) => toIsoDate(date).slice(0, 7);

const dateInCurrentMonth = (day: number) =>
  toIsoDate(new Date(today.getFullYear(), today.getMonth(), day));

const monthHeadingPattern = (date: Date) =>
  new RegExp(
    new Intl.DateTimeFormat("es-ES", {
      month: "long",
      year: "numeric",
    }).format(date),
    "i"
  );

const EVENTS = [
  {
    id: "1",
    title: "Cata de Vinos y Maridaje",
    date: dateInCurrentMonth(12),
    time: "19:30",
    href: "/eventos/cata-de-vinos/",
    status: "upcoming",
    location: "Calahorra",
    category: "Gastronomía",
  },
  {
    id: "2",
    title: "Concierto Acústico en la Plaza",
    date: dateInCurrentMonth(18),
    time: "22:00",
    href: "/eventos/concierto-acustico/",
    status: "upcoming",
    location: "Arnedo",
    category: "Música",
  },
  {
    id: "3",
    title: "Mercado de Artesanía Local",
    date: dateInCurrentMonth(24),
    time: "10:00 - 14:00",
    href: "/eventos/mercado-artesania/",
    status: "upcoming",
    location: "Alfaro",
    category: "Mercados",
  },
  {
    id: "4",
    title: "Ruta de Senderismo: Miradores",
    date: dateInCurrentMonth(24),
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
    initialMonth: toIsoMonth(currentMonth),
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
      canvas.getByRole("heading", { name: monthHeadingPattern(currentMonth) })
    ).toBeInTheDocument();
    expect(
      canvas.getAllByRole("link", { name: /cata de vinos/i })[0]
    ).toHaveAttribute("href", "/eventos/cata-de-vinos/");

    await userEvent.click(
      canvas.getByRole("button", { name: "Mes siguiente" })
    );
    expect(
      canvas.getByRole("heading", { name: monthHeadingPattern(nextMonth) })
    ).toBeInTheDocument();
  },
};

export const MultipleEventsSameDay: Story = {
  args: {
    events: EVENTS.filter((event) => event.date === dateInCurrentMonth(24)),
    initialMonth: toIsoMonth(currentMonth),
  },
};

export const EmptyMonth: Story = {
  args: {
    events: [],
    initialMonth: toIsoMonth(currentMonth),
  },
};

export const PastEvents: Story = {
  args: {
    events: [
      {
        id: "past-1",
        title: "Carnavales 2026",
        date: dateInCurrentMonth(Math.max(1, today.getDate() - 1)),
        time: "18:00",
        href: "/eventos/carnavales/",
        status: "past",
        location: "Calahorra",
      },
    ],
    initialMonth: toIsoMonth(currentMonth),
  },
};

export const LongTitles: Story = {
  args: {
    events: [
      {
        id: "long-1",
        title:
          "Este es un título de evento extremadamente largo para probar el truncado en la cuadrícula mensual",
        date: dateInCurrentMonth(12),
        time: "17:00 - 20:00",
        href: "/eventos/titulo-largo/",
        status: "upcoming",
        location: "Calahorra",
      },
    ],
    initialMonth: toIsoMonth(currentMonth),
  },
};

export const Mobile: Story = {
  args: {
    events: EVENTS,
    initialMonth: toIsoMonth(currentMonth),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
