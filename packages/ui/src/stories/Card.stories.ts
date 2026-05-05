import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Card from "../components/Card.vue";
import Tag from "../components/Tag.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "ARB/Card",
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
    components: { Card, Tag },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <template #tag>
          <Tag>
            <time datetime="2026-05-25">2026-05-25</time>
          </Tag>
        </template>
      </Card>
    `,
  }),
};
