<script lang="ts" setup>
defineProps<{
  /** Main heading text */
  title: string;
  /** Supporting description text */
  description?: string;
}>();
</script>

<template>
  <div
    class="col-span-full rounded-2xl border border-dashed
      border-border-strong bg-surface-card py-16
      text-center"
  >
    <div
      class="mx-auto mb-4 flex h-12 w-12 items-center justify-center
        text-content-subtle"
      aria-hidden="true"
    >
      <slot name="icon">
        <!-- Default: search icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </slot>
    </div>
    <h3 class="text-lg font-semibold text-content-heading">
      {{ title }}
    </h3>
    <p v-if="description" class="mt-1 text-sm text-content-muted">
      {{ description }}
    </p>
  </div>
</template>
