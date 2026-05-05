import type { Meta, StoryObj } from "@storybook/vue3-vite";
import EmptyState from "../components/EmptyState.vue";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No hay eventos para esta selección",
    description: "Prueba a cambiar de localidad o revisa el histórico.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomIcon: Story = {
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
        </template>
      </EmptyState>
    `,
  }),
  args: {
    title: "No hay eventos en el calendario",
    description: "No encontramos eventos para el mes seleccionado.",
  },
};
