import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ButtonLink from "../../components/ui/ButtonLink.vue";
import { ExternalLinkIcon } from "lucide-vue-next";

const meta = {
  title: "ui/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "outline", "ghost"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { href: "#", variant: "brand", size: "md", external: false },
  render: (args) => ({
    components: { ButtonLink },
    setup: () => ({ args }),
    template: '<ButtonLink v-bind="args">Publicar Evento</ButtonLink>',
  }),
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = { args: { variant: "brand" } };

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const ExternalLink: Story = {
  args: {
    href: "https://facebook.com",
    variant: "outline",
    external: true,
  },
  render: (args) => ({
    components: { ButtonLink, ExternalLinkIcon },
    setup: () => ({ args }),
    template: `
      <ButtonLink v-bind="args">
        <ExternalLinkIcon size="16" #icon-left />
        Ver fuente original
      </ButtonLink>
    `,
  }),
};
