<script lang="ts" setup>
const props = defineProps<{
  /** Active tab value (use with the same v-model value as Tabs) */
  modelValue: string | number;
  /** Tab definitions shared with Tabs */
  tabs: Array<{ value: string | number; label: string }>;
  /** Base id used by Tabs to link tabs with their tabpanels */
  idBase: string;
}>();

const tabValueId = (value: string | number) =>
  String(value).replace(/[^a-zA-Z0-9_-]/g, "-");

const tabId = (value: string | number) =>
  `${props.idBase}-tab-${tabValueId(value)}`;

const panelId = (value: string | number) =>
  `${props.idBase}-panel-${tabValueId(value)}`;
</script>

<template>
  <section
    v-for="tab in tabs"
    :id="panelId(tab.value)"
    :key="tab.value"
    role="tabpanel"
    :aria-labelledby="tabId(tab.value)"
    :hidden="modelValue !== tab.value"
    class="mt-4"
  >
    <slot :tab="tab" />
  </section>
</template>
