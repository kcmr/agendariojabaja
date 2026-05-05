<script lang="ts" setup>
import TabItem from "./TabItem.vue";

const props = withDefaults(
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
    :aria-label="$attrs['aria-label'] as string | undefined"
    :class="[
      'flex p-1',
      variant === 'toggle'
        ? `rounded-lg border border-border-default
          bg-surface-card shadow-sm`
        : 'rounded-lg bg-surface-muted',
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
