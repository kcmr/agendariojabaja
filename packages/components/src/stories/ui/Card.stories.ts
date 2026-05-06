import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { MapPin } from "lucide-vue-next";

import Badge from "../../components/ui/Badge.vue";
import Card from "../../components/ui/Card.vue";

const meta = {
  title: "ui/Card",
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

export const WithLink: Story = {
  args: {
    link: "#",
  },
};

/** Card with all slots populated – tag, footer with location and "Ver más" link */
export const WithFooterSlot: Story = {
  render: (args) => ({
    components: { Card, Badge, MapPin },
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
            <MapPin :size="14" aria-hidden="true" class="text-brand" />
            <span class="font-medium">Quel</span>
          </div>
        </template>
      </Card>
    `,
  }),
};
