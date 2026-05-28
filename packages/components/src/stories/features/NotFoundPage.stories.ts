import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import NotFoundPage from "../../components/features/NotFoundPage.vue";

const meta = {
  component: NotFoundPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    homeHref: "/",
  },
  render: (args) => ({
    components: { NotFoundPage },
    setup: () => ({ args }),
    template:
      '<main class="bg-surface-body p-4"><NotFoundPage v-bind="args" /></main>',
  }),
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "404", level: 1 })
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("¡Uy! Parece que te has salido de la ruta.")
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: /Volver a la agenda/i })
    ).toHaveAttribute("href", "/");
  },
};
