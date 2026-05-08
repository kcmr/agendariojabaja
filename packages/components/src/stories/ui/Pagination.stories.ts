import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import Pagination from "../../components/ui/Pagination.vue";

const meta = {
  title: "ui/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { currentPage: 2, totalPages: 5 },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currentPage: 2, totalPages: 5 },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const prevBtn = canvas.getByRole("button", { name: "Página anterior" });
    const nextBtn = canvas.getByRole("button", { name: "Página siguiente" });
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
    await userEvent.click(nextBtn);
    await userEvent.click(prevBtn);
  },
};

export const FirstPage: Story = {
  args: { currentPage: 1, totalPages: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevBtn = canvas.getByRole("button", { name: "Página anterior" });
    expect(prevBtn).toBeDisabled();
  },
};

export const LastPage: Story = {
  args: { currentPage: 5, totalPages: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextBtn = canvas.getByRole("button", { name: "Página siguiente" });
    expect(nextBtn).toBeDisabled();
  },
};

export const SinglePage: Story = {
  args: { currentPage: 1, totalPages: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByRole("button", { name: "Página anterior" })
    ).toBeDisabled();
    expect(
      canvas.getByRole("button", { name: "Página siguiente" })
    ).toBeDisabled();
  },
};
