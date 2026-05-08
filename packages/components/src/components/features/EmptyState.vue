<script lang="ts" setup>
import Heading from "../ui/Heading.vue";
import Icon from "../ui/Icon.vue";

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
        <Icon name="Search" :size="48" />
      </slot>
    </div>
    <Heading :level="2" variant="h4" class="mb-2 font-semibold">
      {{ title }}
    </Heading>
    <p v-if="description" class="text-content-muted mt-1 text-sm">
      {{ description }}
    </p>
  </div>
</template>
