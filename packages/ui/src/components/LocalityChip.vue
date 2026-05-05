<script lang="ts" setup>
const props = defineProps<{
  /** Unique identifier for the locality */
  id: string;
  /** Display name */
  name: string;
  /** Image URL */
  img: string;
  /** Whether this chip is currently selected */
  selected?: boolean;
}>();

const emit = defineEmits<{
  (e: "select", id: string): void;
}>();

const onClick = () => emit("select", props.id);
</script>

<template>
  <button
    type="button"
    :aria-pressed="selected"
    :aria-label="name"
    class="focus-visible:ring-ring-brand relative shrink-0 snap-start
      overflow-hidden rounded-2xl transition-all duration-300
      focus-visible:ring-2 focus-visible:ring-offset-2
      focus-visible:outline-none"
    :class="
      selected
        ? 'ring-ring-brand scale-95 shadow-md ring-4 ring-offset-2'
        : 'opacity-80 hover:scale-105 hover:opacity-100'
    "
    style="width: 120px; height: 120px"
    @click="onClick"
  >
    <img
      :src="img"
      :alt="name"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30
        to-transparent"
      aria-hidden="true"
    />
    <span
      class="absolute bottom-3 left-0 w-full px-2 text-center text-sm
        font-semibold text-white"
    >
      {{ name }}
    </span>
  </button>
</template>
