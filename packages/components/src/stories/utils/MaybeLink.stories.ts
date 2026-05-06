import type { Meta, StoryObj } from "@storybook/vue3-vite";
import MaybeLink from "../../components/utils/MaybeLink.vue";
import Heading from "../../components/ui/Heading.vue";

const meta = {
  title: "utils/MaybeLink",
  component: MaybeLink,
  tags: ["autodocs"],
  args: { default: "Text content" },
} satisfies Meta<typeof MaybeLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHref: Story = {
  args: { href: "https://example.com" },
};

export const WithCustomContent: Story = {
  render: (args) => ({
    components: { MaybeLink, Heading },
    setup: () => ({ args }),
    template: `
      <MaybeLink v-bind="args">
        <Heading variant="h3">Heading (not linked)</Heading>
      </MaybeLink>
    `,
  }),
};

export const WithCustomContentAndHref: Story = {
  args: {
    href: "https://example.com",
  },
  render: (args) => ({
    components: { MaybeLink, Heading },
    setup: () => ({ args }),
    template: `
      <MaybeLink v-bind="args">
        <Heading variant="h3">Heading (linked)</Heading>
      </MaybeLink>
    `,
  }),
};
