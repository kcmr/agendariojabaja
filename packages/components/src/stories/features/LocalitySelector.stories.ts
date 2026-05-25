import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, within } from "storybook/test";
import { ref } from "vue";
import LocalitySelector, {
  type LocalitySelectorOption,
} from "../../components/features/LocalitySelector.vue";

const LOCALITIES = [
  {
    id: "all",
    label: "Toda La Rioja Baja",
    img: "https://images.unsplash.com/photo-1660903293997-efd8ee1abf9a?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "calahorra",
    label: "Calahorra",
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "arnedo",
    label: "Arnedo",
    img: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "alfaro",
    label: "Alfaro",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "cervera",
    label: "Cervera",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=300&h=300",
  },
] satisfies LocalitySelectorOption[];

const meta = {
  component: LocalitySelector,
  tags: ["autodocs"],
  args: {
    idBase: "localities",
    heading: "¿Dónde buscas planes?",
    localities: LOCALITIES,
    modelValue: "all",
    onSelect: fn(),
  },
} satisfies Meta<typeof LocalitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { LocalitySelector },
    setup() {
      const selected = ref(args.modelValue);
      const onSelect = (value: string) => {
        args.onSelect?.(value);
      };
      return { args, selected, onSelect };
    },
    template: `
      <LocalitySelector
        v-bind="args"
        v-model="selected"
        @select="onSelect"
      />
      <div
        v-for="loc in args.localities"
        :key="loc.id"
        :id="\`\${args.idBase}-panel-\${loc.id}\`"
        role="tabpanel"
        :aria-labelledby="\`\${args.idBase}-tab-\${loc.id}\`"
        :hidden="selected !== loc.id"
      />
    `,
  }),
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement);
    const tablist = canvas.getByRole("tablist", {
      name: "¿Dónde buscas planes?",
    });
    const tabs = within(tablist).getAllByRole("tab");
    const [first, , , , last] = tabs;
    const all = within(tablist).getByRole("tab", {
      name: "Toda La Rioja Baja",
    });
    const calahorra = within(tablist).getByRole("tab", {
      name: "Calahorra",
    });

    // Click selection
    expect(all).toHaveAttribute("aria-selected", "true");
    expect(calahorra).toHaveAttribute("aria-selected", "false");

    await userEvent.click(calahorra);

    expect(args.onSelect).toHaveBeenCalledWith("calahorra");
    expect(calahorra).toHaveAttribute("aria-selected", "true");

    // Keyboard navigation
    await userEvent.click(first);

    await userEvent.keyboard("{ArrowRight}");
    expect(calahorra).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{ArrowLeft}");
    expect(first).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{End}");
    expect(last).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{Home}");
    expect(first).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{ArrowLeft}");
    expect(last).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{ArrowRight}");
    expect(first).toHaveAttribute("aria-selected", "true");
  },
};
