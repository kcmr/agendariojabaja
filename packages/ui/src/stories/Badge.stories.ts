import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Badge from "../components/Badge.vue";

const meta = {
  title: "Components/Badge",
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
    components: { Badge },
    setup: () => ({ args }),
    template: `
      <Badge v-bind="args">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
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
