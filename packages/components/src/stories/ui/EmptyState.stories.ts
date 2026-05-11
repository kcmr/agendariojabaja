import type { Meta, StoryObj } from "@storybook/vue3-vite";
import EmptyState from "../../components/features/EmptyState.vue";
import Icon from "../../components/ui/Icon.vue";

const meta = {
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
    components: { EmptyState, Icon },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <template #icon>
          <Icon name="Calendar" :size="48" />
        </template>
      </EmptyState>
    `,
  }),
  args: {
    title: "No hay eventos en el calendario",
    description: "No encontramos eventos para el mes seleccionado.",
  },
};
