import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import LocalitySelector, {
  type LocalitySelectorOption,
} from "../../components/features/LocalitySelector.vue";

const LOCALITIES = [
  {
    id: "all",
    label: "Toda La Rioja Baja",
    img: "https://images.unsplash.com/photo-1660903293997-efd8ee1abf9a?auto=format&fit=crop&q=80&w=300&h=300",
    href: "#all",
  },
  {
    id: "calahorra",
    label: "Calahorra",
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
    href: "#calahorra",
  },
  {
    id: "arnedo",
    label: "Arnedo",
    img: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=300&h=300",
    href: "#arnedo",
  },
  {
    id: "alfaro",
    label: "Alfaro",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300&h=300",
    href: "#alfaro",
  },
  {
    id: "cervera",
    label: "Cervera",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=300&h=300",
    href: "#cervera",
  },
] satisfies LocalitySelectorOption[];

const meta = {
  component: LocalitySelector,
  tags: ["autodocs"],
  args: {
    idBase: "localities",
    heading: "¿Dónde buscas planes?",
    localities: LOCALITIES,
    activeId: "all",
  },
} satisfies Meta<typeof LocalitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", {
      name: "¿Dónde buscas planes?",
    });
    const links = within(nav).getAllByRole("link");
    const all = within(nav).getByRole("link", {
      name: "Toda La Rioja Baja",
    });
    const calahorra = within(nav).getByRole("link", {
      name: "Calahorra",
    });

    expect(links).toHaveLength(LOCALITIES.length);
    expect(all).toHaveAttribute("href", "#all");
    expect(all).toHaveAttribute("aria-current", "page");
    expect(calahorra).toHaveAttribute("href", "#calahorra");
    expect(calahorra).not.toHaveAttribute("aria-current");
  },
};
