<script lang="ts" setup>
import TabItem from "./TabItem.vue";

withDefaults(
  defineProps<{
    /** Active tab value (use with v-model) */
    modelValue: string | number;
    /** Visual style variant */
    variant?: "segment" | "toggle";
    /** Tab definitions */
    tabs: Array<{ value: string | number; label: string }>;
  }>(),
  { variant: "segment" }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const select = (value: string | number) => emit("update:modelValue", value);
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
  >
    <TabItem
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      :label="tab.label"
      :active="modelValue === tab.value"
      :variant="variant"
      @select="select"
    >
      <template v-if="$slots[`icon-${tab.value}`]" #icon>
        <slot :name="`icon-${tab.value}`" />
      </template>
    </TabItem>
  </div>
</template>
