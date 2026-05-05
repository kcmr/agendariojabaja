import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ButtonLink from "../components/ButtonLink.vue";

const meta = {
  title: "Components/ButtonLink",
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
    components: { ButtonLink },
    setup: () => ({ args }),
    template: `
      <ButtonLink v-bind="args">
        <template #icon-left>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </template>
        Ver fuente original
      </ButtonLink>
    `,
  }),
};
