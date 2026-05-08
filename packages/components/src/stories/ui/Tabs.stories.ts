import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";
import { ref } from "vue";
import Tabs from "../../components/ui/Tabs.vue";

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
  play: async ({ canvasElement }) => {
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
  play: async ({ canvasElement }) => {
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
    components: { Tabs },
    setup() {
      const active = ref(args.modelValue);
      return { active, args };
    },
    template: `
      <div>
        <Tabs v-bind="args" v-model="active" aria-label="Vista de eventos">
          <template #icon-list>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
          </template>
          <template #icon-calendar>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </template>
        </Tabs>
        <p class="mt-4 text-sm text-gray-500">Activo: <strong>{{ active }}</strong></p>
      </div>
    `,
  }),
};
