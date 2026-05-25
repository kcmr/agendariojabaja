<script lang="ts" setup>
defineProps<{
  /** Unique value identifying this tab */
  value: string | number;
  /** Display label */
  label: string;
  /** Background image URL */
  imageSrc: string;
  /** Whether this tab is currently active */
  active?: boolean;
  /** Optional id for this tab element */
  id?: string;
  /** Optional id of the tabpanel controlled by this tab */
  controls?: string;
}>();

const emit = defineEmits<{
  select: [value: string | number];
}>();
</script>

<template>
  <button
    :id="id"
    type="button"
    role="tab"
    :aria-selected="active ?? false"
    :aria-controls="controls"
    :tabindex="active ? 0 : -1"
    :class="[
      `bg-content-heading relative h-30 w-30 shrink-0 cursor-pointer snap-start
      overflow-hidden rounded-2xl transition-all duration-300 outline-none`,
      active
        ? 'ring-ring-brand scale-95 shadow-md ring-4 ring-offset-2'
        : 'opacity-80 hover:scale-105 hover:opacity-100',
    ]"
    @click="emit('select', value)"
  >
    <!-- alt="" because the label is visible in the text overlay -->
    <img
      :src="imageSrc"
      alt=""
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div
      class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30
        to-transparent"
    />
    <span
      class="text-surface-card absolute bottom-3 left-0 w-full px-2 text-center
        text-sm font-semibold"
    >
      {{ label }}
    </span>
  </button>
</template>
