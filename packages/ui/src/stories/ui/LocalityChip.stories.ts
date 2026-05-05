import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";
import LocalityChip from "../../components/ui/LocalityChip.vue";

const meta = {
  title: "ui/LocalityChip",
  component: LocalityChip,
  tags: ["autodocs"],
  args: {
    id: "calahorra",
    name: "Calahorra",
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
    selected: false,
  },
} satisfies Meta<typeof LocalityChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { selected: false },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: args.name });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(btn);
  },
};

export const Selected: Story = {
  args: { selected: true },
};

export const AllLocalities: Story = {
  render: () => ({
    components: { LocalityChip },
    data() {
      return {
        selected: "all",
        localities: [
          {
            id: "all",
            name: "Toda La Rioja Baja",
            img: "https://images.unsplash.com/photo-1596395819057-cb373310086c?auto=format&fit=crop&q=80&w=300&h=300",
          },
          {
            id: "calahorra",
            name: "Calahorra",
            img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
          },
          {
            id: "arnedo",
            name: "Arnedo",
            img: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=300&h=300",
          },
          {
            id: "alfaro",
            name: "Alfaro",
            img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300&h=300",
          },
          {
            id: "cervera",
            name: "Cervera",
            img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=300&h=300",
          },
        ],
      };
    },
    template: `
      <div class="flex gap-4 flex-wrap">
        <LocalityChip
          v-for="loc in localities"
          :key="loc.id"
          :id="loc.id"
          :name="loc.name"
          :img="loc.img"
          :selected="selected === loc.id"
          @select="selected = $event"
        />
      </div>
    `,
  }),
};
