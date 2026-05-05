<script lang="ts" setup>
import { computed } from "vue";

const { variant = "default" } = defineProps<{
  variant?: "default" | "muted";
}>();

const computedClasses = computed(() => [
  "inline-block rounded-md px-2 py-1 font-semibold",
  {
    default: "bg-surface-brand-tint text-content-brand",
    muted: "bg-surface-muted text-content-muted",
  }[variant],
]);
</script>

<template>
  <span :class="computedClasses">
    <slot />
  </span>
</template>
