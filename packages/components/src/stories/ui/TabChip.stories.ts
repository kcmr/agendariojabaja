import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import TabChip from "../../components/ui/TabChip.vue";

const meta = {
  component: TabChip,
  tags: ["autodocs"],
  args: {
    label: "Calahorra",
    href: "/agenda/localidad/calahorra/",
    imageSrc:
      "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
    active: false,
  },
} satisfies Meta<typeof TabChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { active: false },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: args.label });

    expect(link).toHaveAttribute("href", args.href);
    expect(link).not.toHaveAttribute("aria-current");
  },
};

export const Active: Story = {
  args: { active: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: args.label });

    expect(link).toHaveAttribute("aria-current", "page");
  },
};
