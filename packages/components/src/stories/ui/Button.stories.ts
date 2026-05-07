import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Button from "../../components/ui/Button.vue";
import { ExternalLinkIcon, MailIcon } from "lucide-vue-next";
import { expect, fn, userEvent, within } from "storybook/test";

const meta = {
  title: "ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "outline", "text"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { variant: "brand", size: "md", external: false },
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

export const Text: Story = { args: { variant: "text" } };

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
        <template #icon-left>
          <MailIcon size="16" />
        </template>
        Suscríbete
      </Button>
    `,
  }),
  args: { variant: "brand" },
};

export const WithIconRight: Story = {
  render: (args) => ({
    components: { Button, MailIcon },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        <template #icon-right>
          <MailIcon size="16" />
        </template>
        Suscríbete
      </Button>
    `,
  }),
  args: { variant: "brand" },
};

export const ExternalLink: Story = {
  args: {
    href: "https://facebook.com",
    variant: "outline",
    external: true,
  },
  render: (args) => ({
    components: { Button, ExternalLinkIcon },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        <template #icon-left>
          <ExternalLinkIcon size="16" />
        </template>
        Ver fuente original
      </Button>
    `,
  }),
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
