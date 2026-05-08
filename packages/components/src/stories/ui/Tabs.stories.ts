import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import { ref } from "vue";
import Tabs from "../../components/ui/Tabs.vue";
import Icon from "../../components/ui/Icon.vue";

const SEGMENT_TABS = [
  { value: "upcoming", label: "Próximos planes" },
  { value: "past", label: "Histórico" },
];

const TOGGLE_TABS = [
  { value: "list", label: "Lista" },
  { value: "calendar", label: "Calendario" },
];

const meta = {
  title: "ui/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["segment", "toggle"] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Segment: Story = {
  args: { modelValue: "upcoming", variant: "segment", tabs: SEGMENT_TABS },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const active = ref(args.modelValue);
      return { active, args };
    },
    template: `
      <div>
        <Tabs v-bind="args" v-model="active" aria-label="Estado de eventos" />
        <p class="mt-4 text-sm text-gray-500">Activo: <strong>{{ active }}</strong></p>
      </div>
    `,
  }),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const historico = canvas.getByRole("tab", { name: "Histórico" });
    expect(historico).toHaveAttribute("aria-selected", "false");
    await userEvent.click(historico);
    expect(historico).toHaveAttribute("aria-selected", "true");
  },
};

export const Toggle: Story = {
  args: { modelValue: "list", variant: "toggle", tabs: TOGGLE_TABS },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const active = ref(args.modelValue);
      return { active, args };
    },
    template: `
      <div>
        <Tabs v-bind="args" v-model="active" aria-label="Vista de eventos" />
        <p class="mt-4 text-sm text-gray-500">Activo: <strong>{{ active }}</strong></p>
      </div>
    `,
  }),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const calBtn = canvas.getByRole("tab", { name: "Calendario" });
    expect(calBtn).toHaveAttribute("aria-selected", "false");
    await userEvent.click(calBtn);
    expect(calBtn).toHaveAttribute("aria-selected", "true");
  },
};

export const ToggleWithIcons: Story = {
  args: { modelValue: "list", variant: "toggle", tabs: TOGGLE_TABS },
  render: (args) => ({
    components: { Tabs, Icon },
    setup() {
      const active = ref(args.modelValue);
      return { active, args };
    },
    template: `
      <div>
        <Tabs v-bind="args" v-model="active" aria-label="Vista de eventos">
          <template #icon-list>
            <Icon name="List" :size="18" />
          </template>
          <template #icon-calendar>
            <Icon name="Calendar" :size="18" />
          </template>
        </Tabs>
        <p class="mt-4 text-sm text-gray-500">Activo: <strong>{{ active }}</strong></p>
      </div>
    `,
  }),
};
