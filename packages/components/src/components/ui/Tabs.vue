<script lang="ts" setup>
import { nextTick, ref } from "vue";
import TabItem from "./TabItem.vue";

const props = withDefaults(
  defineProps<{
    /** Active tab value (use with v-model) */
    modelValue: string | number;
    /** Visual style variant */
    variant?: "segment" | "toggle";
    /** Tab definitions */
    tabs: Array<{ value: string | number; label: string }>;
    /** Optional base id used to link tabs with their tabpanels */
    idBase?: string;
  }>(),
  { idBase: undefined, variant: "segment" }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const select = (value: string | number) => emit("update:modelValue", value);

const tabRefs = ref<Array<InstanceType<typeof TabItem> | null>>([]);

const tabValueId = (value: string | number) =>
  String(value).replace(/[^a-zA-Z0-9_-]/g, "-");

const tabId = (value: string | number) =>
  props.idBase ? `${props.idBase}-tab-${tabValueId(value)}` : undefined;

const panelId = (value: string | number) =>
  props.idBase ? `${props.idBase}-panel-${tabValueId(value)}` : undefined;

const selectByOffset = async (offset: number) => {
  const currentIndex = props.tabs.findIndex(
    (tab) => tab.value === props.modelValue
  );

  if (currentIndex === -1 || props.tabs.length === 0) return;

  const nextIndex =
    (currentIndex + offset + props.tabs.length) % props.tabs.length;
  select(props.tabs[nextIndex].value);
  await nextTick();
  tabRefs.value[nextIndex]?.$el.focus();
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    void selectByOffset(-1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    void selectByOffset(1);
  }
};
</script>

<template>
  <div
    role="tablist"
    :class="[
      'flex p-1',
      variant === 'toggle'
        ? 'border-border-default bg-surface-card rounded-lg border shadow-sm'
        : 'bg-surface-muted rounded-lg',
    ]"
    @keydown="onKeydown"
  >
    <TabItem
      v-for="tab in tabs"
      :id="tabId(tab.value)"
      :key="tab.value"
      ref="tabRefs"
      :value="tab.value"
      :label="tab.label"
      :active="modelValue === tab.value"
      :controls="panelId(tab.value)"
      :variant="variant"
      @select="select"
    >
      <template v-if="$slots[`icon-${tab.value}`]" #icon>
        <slot :name="`icon-${tab.value}`" />
      </template>
    </TabItem>
  </div>
</template>
