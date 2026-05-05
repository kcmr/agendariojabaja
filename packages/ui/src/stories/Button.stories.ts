import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import Button from "../components/Button.vue";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "outline", "ghost"],
    },
    size: { control: "select", options: ["md", "lg"] },
  },
  args: { variant: "brand", size: "md", disabled: false },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Publicar Evento</Button>',
  }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = { args: { variant: "brand" } };

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Large: Story = { args: { size: "lg" } };

export const Disabled: Story = {
  args: { variant: "brand", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button");
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    // click should be blocked — no assertions on emit needed here
  },
};

export const WithIconLeft: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        <template #icon-left>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </template>
        Suscríbete
      </Button>
    `,
  }),
  args: { variant: "brand" },
};

export const ClickEmitsEvent: Story = {
  args: { variant: "brand", onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button");
    expect(btn).not.toBeDisabled();
    await userEvent.click(btn);
    expect(args.onClick).toHaveBeenCalledOnce();
  },
};
