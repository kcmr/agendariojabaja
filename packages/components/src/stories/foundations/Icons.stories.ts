/**
 * # Icons
 *
 * This project uses an internal wrapper component called **`Icon`** for iconography.
 * The internal component wraps [lucide-vue-next](https://lucide.dev/guide/packages/lucide-vue-next)
 * to provide a single entrypoint and control the bundle size.
 *
 * ### Usage
 * ```vue
 * <script setup>
 * import { Icon } from '@/components/ui'
 * // Note: Adjust the import path according to your alias or file structure
 * </script>
 *
 * <template>
 *   <Icon name="Calendar" :size="20" />
 *   <Icon name="MapPin" :size="16" class="text-content-brand" />
 * </template>
 * ```
 *
 * ### Icon catalogue used in AgendaRiojaBaja
 * The story below renders all icons currently available in the `Icon` component.
 */

import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Icon from "../../components/ui/Icon.vue";
import IconsShowcase from "../utils/IconsShowcase.vue";

const meta = {
  title: "foundations/Icons",
  component: IconsShowcase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Internal `Icon` component that provides a limited set of lucide-vue-next icons.",
      },
    },
  },
} satisfies Meta<typeof IconsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  name: "All app icons",
  render: () => ({
    components: { IconsShowcase },
    template: "<IconsShowcase />",
  }),
};

export const Sizes: Story = {
  name: "Size variants",
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-end gap-6">
        <div class="flex flex-col items-center gap-2">
          <Icon name="Calendar" :size="12" />
          <code class="text-xs text-gray-500">:size="12"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="Calendar" :size="16" />
          <code class="text-xs text-gray-500">:size="16"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="Calendar" :size="20" />
          <code class="text-xs text-gray-500">:size="20"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="Calendar" :size="24" />
          <code class="text-xs text-gray-500">:size="24"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="Calendar" :size="32" />
          <code class="text-xs text-gray-500">:size="32"</code>
        </div>
      </div>
    `,
  }),
};
