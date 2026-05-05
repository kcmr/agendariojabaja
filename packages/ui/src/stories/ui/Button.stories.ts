import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import Button from "../../components/ui/Button.vue";
import { MailIcon } from "lucide-vue-next";

const meta = {
  title: "ui/Button",
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
  },
};

export const WithIconLeft: Story = {
  render: (args) => ({
    components: { Button, MailIcon },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        <MailIcon size="16" aria-hidden="true" #icon-left />
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
