<script lang="ts" setup>
import { Search } from "lucide-vue-next";

defineProps<{
  /** Main heading text */
  title: string;
  /** Supporting description text */
  description?: string;
}>();
</script>

<template>
  <div
    class="border-border-strong bg-surface-card col-span-full rounded-2xl border
      border-dashed py-16 text-center"
  >
    <div
      class="text-content-subtle mx-auto mb-4 flex h-12 w-12 items-center
        justify-center"
    >
      <slot name="icon">
        <!-- Default: search icon (decorative – the heading conveys the meaning) -->
        <Search :size="48" aria-hidden="true" />
      </slot>
    </div>
    <h3 class="text-content-heading text-lg font-semibold">
      {{ title }}
    </h3>
    <p v-if="description" class="text-content-muted mt-1 text-sm">
      {{ description }}
    </p>
  </div>
</template>
