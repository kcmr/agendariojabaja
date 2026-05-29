import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import { ref } from "vue";
import Tabs from "../../components/ui/Tabs.vue";
import TabItem from "../../components/ui/TabItem.vue";
import TabPanels from "../../components/ui/TabPanels.vue";
import Icon from "../../components/ui/Icon.vue";

const SEGMENT_TABS = [
  { value: "events", label: "Eventos" },
  { value: "workshops", label: "Talleres" },
];

const TOGGLE_TABS = [
  { value: "list", label: "Lista" },
  { value: "calendar", label: "Calendario" },
];

const TAB_CONTENT = {
  events: {
    title: "Eventos",
    text: "Actividades abiertas durante las próximas semanas.",
  },
  workshops: {
    title: "Talleres",
    text: "Sesiones prácticas y actividades con plazas limitadas.",
  },
  list: {
    title: "Lista",
    text: "Una vista compacta para revisar los eventos por orden cronológico.",
  },
  calendar: {
    title: "Calendario",
    text: "Una vista mensual para localizar rápidamente qué días tienen actividad.",
  },
} satisfies Record<string, { title: string; text: string }>;

const COMPONENT_DOCS = `
Tabs implements the ARIA \`tablist\` pattern with click and keyboard activation
(\`ArrowLeft\` and \`ArrowRight\`). The recommended usage is to compose \`Tabs\`
with \`TabPanels\`; \`Tabs\` renders each \`TabItem\` internally.

### Quick API

- \`Tabs\`: receives \`tabs\`, \`v-model\`, \`variant\`, and \`id-base\`. It adds
  \`role="tablist"\`, manages focus, and links each tab to its panel when
  \`id-base\` is provided.
- \`TabPanels\`: receives the same \`tabs\`, the same \`model-value\`, and the
  same \`id-base\`. It renders one \`tabpanel\` per tab and exposes \`tab\` to
  the slot.
- \`TabItem\`: low-level button with \`role="tab"\`. You usually do not need to
  use it directly because \`Tabs\` already composes it.

### Recommended Vue usage

\`\`\`ts
<script setup lang="ts">
import { ref } from "vue";
import Tabs from "@repo/components/ui/Tabs";
import TabPanels from "@repo/components/ui/TabPanels";

const tabs = [
  { value: "events", label: "Events" },
  { value: "workshops", label: "Workshops" },
];

const activeTab = ref("events");
</script>

<template>
  <Tabs
    v-model="activeTab"
    id-base="events-tabs"
    :tabs="tabs"
    aria-label="Event status"
  />

  <TabPanels
    id-base="events-tabs"
    :tabs="tabs"
    :model-value="activeTab"
  >
    <template #default="{ tab }">
      <section v-if="tab.value === 'events'">
        Events.
      </section>
      <section v-else>
        Workshops.
      </section>
    </template>
  </TabPanels>
</template>
\`\`\`

### Advanced TabItem usage

Use \`TabItem\` directly only when you need to build a custom \`tablist\`.
In that case, you are also responsible for managing state, focus, and keyboard
events.

\`\`\`ts
<TabItem
  id="event-view-tab-list"
  value="list"
  label="List"
  controls="event-view-panel-list"
  :active="activeTab === 'list'"
  @select="activeTab = $event"
/>
\`\`\`
`;

const meta = {
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: COMPONENT_DOCS,
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["segment", "toggle"] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Segment: Story = {
  args: { modelValue: "events", variant: "segment", tabs: SEGMENT_TABS },
  render: (args) => ({
    components: { Tabs, TabPanels },
    setup() {
      const active = ref(args.modelValue);
      return { active, args, TAB_CONTENT };
    },
    template: `
      <div>
        <Tabs
          v-bind="args"
          id-base="event-status"
          v-model="active"
          aria-label="Estado de eventos"
        />
        <TabPanels id-base="event-status" :tabs="args.tabs" :model-value="active">
          <template #default="{ tab }">
            <div class="rounded-lg border border-gray-200 bg-white p-4">
              <h3 class="text-sm font-bold text-gray-900">
                {{ TAB_CONTENT[tab.value].title }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ TAB_CONTENT[tab.value].text }}
              </p>
            </div>
          </template>
        </TabPanels>
      </div>
    `,
  }),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const events = canvas.getByRole("tab", { name: "Eventos" });
    const workshops = canvas.getByRole("tab", { name: "Talleres" });
    const eventsPanel = canvas.getByRole("tabpanel", {
      name: "Eventos",
    });

    expect(events).toHaveAttribute(
      "aria-controls",
      "event-status-panel-events"
    );
    expect(eventsPanel).toHaveAttribute(
      "aria-labelledby",
      "event-status-tab-events"
    );
    expect(workshops).toHaveAttribute("aria-selected", "false");
    events.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(workshops).toHaveAttribute("aria-selected", "true");
    expect(workshops).toHaveFocus();
    expect(
      canvas.getByRole("tabpanel", { name: "Talleres" })
    ).not.toHaveAttribute("hidden");
  },
};

export const Toggle: Story = {
  args: { modelValue: "list", variant: "toggle", tabs: TOGGLE_TABS },
  render: (args) => ({
    components: { Tabs, TabPanels },
    setup() {
      const active = ref(args.modelValue);
      return { active, args, TAB_CONTENT };
    },
    template: `
      <div>
        <Tabs
          v-bind="args"
          id-base="event-view"
          v-model="active"
          aria-label="Vista de eventos"
        />
        <TabPanels id-base="event-view" :tabs="args.tabs" :model-value="active">
          <template #default="{ tab }">
            <div class="rounded-lg border border-gray-200 bg-white p-4">
              <h3 class="text-sm font-bold text-gray-900">
                {{ TAB_CONTENT[tab.value].title }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ TAB_CONTENT[tab.value].text }}
              </p>
            </div>
          </template>
        </TabPanels>
      </div>
    `,
  }),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const calBtn = canvas.getByRole("tab", { name: "Calendario" });
    expect(calBtn).toHaveAttribute("aria-selected", "false");
    await userEvent.click(calBtn);
    expect(calBtn).toHaveAttribute("aria-selected", "true");
  },
};

export const ToggleWithIcons: Story = {
  args: { modelValue: "list", variant: "toggle", tabs: TOGGLE_TABS },
  render: (args) => ({
    components: { Tabs, TabPanels, Icon },
    setup() {
      const active = ref(args.modelValue);
      return { active, args, TAB_CONTENT };
    },
    template: `
      <div>
        <Tabs
          v-bind="args"
          id-base="event-view-icons"
          v-model="active"
          aria-label="Vista de eventos"
        >
          <template #icon-list>
            <Icon name="List" :size="18" />
          </template>
          <template #icon-calendar>
            <Icon name="Calendar" :size="18" />
          </template>
        </Tabs>
        <TabPanels id-base="event-view-icons" :tabs="args.tabs" :model-value="active">
          <template #default="{ tab }">
            <div class="rounded-lg border border-gray-200 bg-white p-4">
              <h3 class="text-sm font-bold text-gray-900">
                {{ TAB_CONTENT[tab.value].title }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ TAB_CONTENT[tab.value].text }}
              </p>
            </div>
          </template>
        </TabPanels>
      </div>
    `,
  }),
};

export const LowLevelComposition: Story = {
  name: "Low-level composition with TabItem",
  args: { modelValue: "list", variant: "segment", tabs: TOGGLE_TABS },
  parameters: {
    docs: {
      description: {
        story:
          "`TabItem` is available for custom tablist compositions. Prefer `Tabs` unless the app needs full control over rendering.",
      },
      source: {
        code: `
<script setup lang="ts">
import { ref } from "vue";
import TabItem from "@repo/components/ui/TabItem";
import TabPanels from "@repo/components/ui/TabPanels";

const tabs = [
  { value: "list", label: "List" },
  { value: "calendar", label: "Calendar" },
];

const activeTab = ref("list");

const selectByOffset = (offset: number) => {
  const currentIndex = tabs.findIndex((tab) => tab.value === activeTab.value);
  const nextIndex = (currentIndex + offset + tabs.length) % tabs.length;
  activeTab.value = tabs[nextIndex].value;
};
</script>

<template>
  <div
    role="tablist"
    aria-label="Event view"
    @keydown.left.prevent="selectByOffset(-1)"
    @keydown.right.prevent="selectByOffset(1)"
  >
    <TabItem
      v-for="tab in tabs"
      :id="\`event-view-tab-\${tab.value}\`"
      :key="tab.value"
      :value="tab.value"
      :label="tab.label"
      :active="activeTab === tab.value"
      :controls="\`event-view-panel-\${tab.value}\`"
      @select="activeTab = $event"
    />
  </div>

  <TabPanels id-base="event-view" :tabs="tabs" :model-value="activeTab">
    <template #default="{ tab }">
      {{ tab.label }}
    </template>
  </TabPanels>
</template>
        `.trim(),
      },
    },
  },
  render: (args) => ({
    components: { TabItem, TabPanels },
    setup() {
      const active = ref(args.modelValue);

      const tabValueId = (value: string | number) =>
        String(value).replace(/[^a-zA-Z0-9_-]/g, "-");

      const tabId = (value: string | number) =>
        `event-view-tab-${tabValueId(value)}`;

      const panelId = (value: string | number) =>
        `event-view-panel-${tabValueId(value)}`;

      const selectByOffset = (offset: number) => {
        const currentIndex = args.tabs.findIndex(
          (tab) => tab.value === active.value
        );

        if (currentIndex === -1 || args.tabs.length === 0) return;

        const nextIndex =
          (currentIndex + offset + args.tabs.length) % args.tabs.length;
        active.value = args.tabs[nextIndex].value;
      };

      return {
        active,
        args,
        panelId,
        selectByOffset,
        tabId,
        TAB_CONTENT,
      };
    },
    template: `
      <div>
        <div
          role="tablist"
          aria-label="Vista de eventos"
          class="flex rounded-lg bg-surface-muted p-1"
          @keydown.left.prevent="selectByOffset(-1)"
          @keydown.right.prevent="selectByOffset(1)"
        >
          <TabItem
            v-for="tab in args.tabs"
            :id="tabId(tab.value)"
            :key="tab.value"
            :value="tab.value"
            :label="tab.label"
            :active="active === tab.value"
            :controls="panelId(tab.value)"
            :variant="args.variant"
            @select="active = $event"
          />
        </div>
        <TabPanels id-base="event-view" :tabs="args.tabs" :model-value="active">
          <template #default="{ tab }">
            <div class="rounded-lg border border-gray-200 bg-white p-4">
              <h3 class="text-sm font-bold text-gray-900">
                {{ TAB_CONTENT[tab.value].title }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ TAB_CONTENT[tab.value].text }}
              </p>
            </div>
          </template>
        </TabPanels>
      </div>
    `,
  }),
};
