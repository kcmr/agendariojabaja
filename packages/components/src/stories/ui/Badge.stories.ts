import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Badge from "../../components/ui/Badge.vue";
import Icon from "../../components/ui/Icon.vue";

const meta = {
  title: "ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["category", "price", "brand", "muted", "on-image"],
    },
    shape: { control: "radio", options: ["pill", "square"] },
  },
  args: { variant: "brand", shape: "pill" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Gastronomía</Badge>',
  }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: { variant: "category" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Gastronomía</Badge>',
  }),
};

export const Price: Story = {
  args: { variant: "price" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">25€</Badge>',
  }),
};

export const Brand: Story = {
  args: { variant: "brand" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Próximo</Badge>',
  }),
};

export const Muted: Story = {
  args: { variant: "muted" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Finalizado</Badge>',
  }),
};

/** High-contrast variant for use on top of images */
export const OnImage: Story = {
  args: { variant: "on-image" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `
      <div class="relative h-40 w-72 overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600&h=400"
          alt=""
          class="h-full w-full object-cover"
        />
        <div class="absolute top-3 left-3">
          <Badge v-bind="args">Gastronomía</Badge>
        </div>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: { variant: "price" },
  render: (args) => ({
    components: { Badge, Icon },
    setup: () => ({ args }),
    template: `
      <Badge v-bind="args">
        <template #icon>
          <Icon name="Ticket" :size="14" />
        </template>
        25€
      </Badge>
    `,
  }),
};

export const SquareShape: Story = {
  args: { variant: "brand", shape: "square" },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">2026-05-25</Badge>',
  }),
};
