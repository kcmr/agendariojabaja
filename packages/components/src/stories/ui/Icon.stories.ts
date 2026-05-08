import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Icon from "../../components/ui/Icon.vue";

const meta = {
  title: "ui/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "Mail",
        "Megaphone",
        "Search",
        "MapPin",
        "Calendar",
        "Clock",
        "ExternalLink",
        "Ticket",
        "ChevronLeft",
        "ChevronRight",
      ],
    },
    size: {
      control: "number",
      min: 12,
      max: 48,
      step: 4,
    },
  },
  args: {
    name: "Mail",
    size: 24,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The Icon component wraps [lucide-vue-next](https://lucide.dev/guide/packages/lucide-vue-next) icons and allows other components to set icon propertys using a typed name string.
 * Currently supports a limited set of icons only to keep the bundle size small. More icons can be added as needed.
 */
export const Default: Story = {
  args: {
    name: "Mail",
    size: 24,
  },
};
