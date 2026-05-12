import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, within } from "storybook/test";
import TabChip from "../../components/ui/TabChip.vue";

const meta = {
  component: TabChip,
  tags: ["autodocs"],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div role="tablist"><story /></div>',
    }),
  ],
  args: {
    value: "calahorra",
    label: "Calahorra",
    imageSrc:
      "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
    active: false,
  },
} satisfies Meta<typeof TabChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onSelect: fn(), active: false },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole("tab", { name: args.label });

    tab.focus();
    await userEvent.keyboard("{Enter}");

    expect(args.onSelect).toHaveBeenCalledWith(args.value);
  },
};

export const Active: Story = {
  args: { active: true },
};
