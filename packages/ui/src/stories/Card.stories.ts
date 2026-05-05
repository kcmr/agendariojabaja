import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Badge from "../components/Badge.vue";
import Card from "../components/Card.vue";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    heading: "Fiestas de la Juventud y de la Cruz de Mayo en Quel",
    text: "Given a file name, creates an object with utilities to manage a log file. It creates a temporary log file which you can manage with the returned functions. You can then decide whether to move the log file to the users project, or remove it.",
    image: {
      src: "https://wsrv.nl/?url=https://krmwxunfqtcxqgjcngwz.supabase.co/storage/v1/object/public/event-images/1406592228168857.jpg&w=300&h=450&fit=cover",
      alt: "Cartel de las fiestas de la juventud de Quel 2026",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongHeading: Story = {
  args: {
    heading:
      "Este es un título mucho más largo para ver cómo se comporta el componente",
  },
};

export const WithTagSlot: Story = {
  render: (args) => ({
    components: { Card, Badge },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <template #tag>
          <Badge variant="brand" shape="square">
            <time datetime="2026-05-25">2026-05-25</time>
          </Badge>
        </template>
      </Card>
    `,
  }),
};

/** Card with all slots populated – tag, footer with location and "Ver más" link */
export const WithFooter: Story = {
  render: (args) => ({
    components: { Card, Badge },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <template #tag>
          <Badge variant="brand" shape="square">
            <time datetime="2026-05-25">2026-05-25</time>
          </Badge>
          <span>•</span>
          <span>Todo el día</span>
        </template>
        <template #footer>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <!-- MapPin icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="text-brand"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="font-medium">Quel</span>
          </div>
          <span class="text-brand text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100">
            Ver más →
          </span>
        </template>
      </Card>
    `,
  }),
};
