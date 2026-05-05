/**
 * # Icons
 *
 * This project uses **[lucide-vue-next](https://lucide.dev/guide/packages/lucide-vue-next)**
 * for iconography.
 *
 * ### Why lucide-vue-next?
 * - Each icon is a self-contained Vue component → full tree-shaking (only the
 *   icons you import end up in the bundle).
 * - Consistent 24×24 grid, stroke-based design that pairs well with the
 *   existing Tailwind utility classes.
 * - No global registration needed; import per component.
 *
 * ### Usage
 * ```vue
 * <script setup>
 * import { Calendar, MapPin } from 'lucide-vue-next'
 * </script>
 *
 * <template>
 *   <Calendar :size="20" aria-hidden="true" />
 *   <MapPin :size="16" class="text-content-brand" aria-hidden="true" />
 * </template>
 * ```
 *
 * ### Icon catalogue used in AgendaRiojaBaja
 * The story below renders all icons currently in use in the app so you can
 * copy-paste the import name quickly.
 */

import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  List,
  Mail,
  MapPin,
  Megaphone,
  Search,
  Ticket,
} from "lucide-vue-next";
import { defineComponent, h } from "vue";

/** Dummy component so Storybook has a "component" to attach meta to */
const IconsShowcase = defineComponent({
  name: "IconsShowcase",
  setup() {
    const icons = [
      { name: "Calendar", component: Calendar },
      { name: "List", component: List },
      { name: "MapPin", component: MapPin },
      { name: "Search", component: Search },
      { name: "ChevronLeft", component: ChevronLeft },
      { name: "ChevronRight", component: ChevronRight },
      { name: "Mail", component: Mail },
      { name: "ExternalLink", component: ExternalLink },
      { name: "Ticket", component: Ticket },
      { name: "ArrowLeft", component: ArrowLeft },
      { name: "Clock", component: Clock },
      { name: "Megaphone", component: Megaphone },
    ];

    return () =>
      h(
        "ul",
        {
          class:
            "grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 list-none m-0 p-0",
        },
        icons.map(({ name, component }) =>
          h(
            "li",
            {
              key: name,
              class:
                "flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm",
            },
            [
              h(component, { size: 24, "aria-hidden": "true" }),
              h("code", { class: "text-xs text-gray-600 break-all" }, name),
            ]
          )
        )
      );
  },
});

const meta = {
  title: "foundations/Icons",
  component: IconsShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Icons sourced from [lucide-vue-next](https://lucide.dev). Import individual icons to keep bundle size minimal.",
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
    components: { Calendar },
    template: `
      <div class="flex items-end gap-6">
        <div class="flex flex-col items-center gap-2">
          <Calendar :size="12" aria-hidden="true" />
          <code class="text-xs text-gray-500">:size="12"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Calendar :size="16" aria-hidden="true" />
          <code class="text-xs text-gray-500">:size="16"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Calendar :size="20" aria-hidden="true" />
          <code class="text-xs text-gray-500">:size="20"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Calendar :size="24" aria-hidden="true" />
          <code class="text-xs text-gray-500">:size="24"</code>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Calendar :size="32" aria-hidden="true" />
          <code class="text-xs text-gray-500">:size="32"</code>
        </div>
      </div>
    `,
  }),
};
