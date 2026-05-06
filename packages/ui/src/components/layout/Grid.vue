<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Number of columns override (default: responsive 1→2→3) */
    cols?: 1 | 2 | 3 | 4;
  }>(),
  { cols: 3 }
);

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};
</script>

<template>
  <ul
    role="list"
    :class="[
      'grid gap-6',
      cols ? colClasses[cols] : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    ]"
  >
    <slot />
  </ul>
</template>
