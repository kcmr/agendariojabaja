import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AdSpace from "../components/AdSpace.vue";
import Grid from "../components/Grid.vue";

const MockCard = {
  props: ["title"],
  template: `
    <li class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="mb-3 h-32 rounded-xl bg-gray-100"></div>
      <h3 class="font-bold text-gray-900">{{ title }}</h3>
      <p class="mt-1 text-sm text-gray-500">Descripción breve del evento.</p>
    </li>
  `,
};

const TITLES = [
  "Cata de Vinos",
  "Concierto en la Plaza",
  "Mercado Artesanal",
  "Ruta de Senderismo",
  "Exposición de Calzado",
  "Fiestas de la Juventud",
];

const meta = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    cols: { control: "select", options: [undefined, 1, 2, 3, 4] },
  },
  args: {},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Grid, MockCard },
    setup: () => ({ args, titles: TITLES }),
    template: `
      <Grid v-bind="args">
        <MockCard v-for="t in titles" :key="t" :title="t" />
      </Grid>
    `,
  }),
};

export const TwoColumns: Story = {
  args: { cols: 2 },
  render: (args) => ({
    components: { Grid, MockCard },
    setup: () => ({ args, titles: TITLES.slice(0, 4) }),
    template: `
      <Grid v-bind="args">
        <MockCard v-for="t in titles" :key="t" :title="t" />
      </Grid>
    `,
  }),
};

export const WithAdSpace: Story = {
  render: (args) => ({
    components: { Grid, MockCard, AdSpace },
    setup: () => ({ args, titles: TITLES }),
    template: `
      <Grid v-bind="args">
        <MockCard v-for="(t, i) in titles" :key="t" :title="t" />
        <li class="col-span-1 md:col-span-2 lg:col-span-3">
          <AdSpace variant="horizontal" />
        </li>
      </Grid>
    `,
  }),
  args: {},
};
