<script lang="ts" setup>
defineProps<{
  /** Display label */
  label: string;
  /** URL for this navigation chip */
  href: string;
  /** Background image URL */
  imageSrc: string;
  /** Whether this tab is currently active */
  active?: boolean;
  /** Optional id for this tab element */
  id?: string;
}>();
</script>

<template>
  <a
    :id="id"
    :href="href"
    :aria-current="active ? 'page' : undefined"
    :class="[
      `bg-content-heading focus-visible:ring-ring-brand relative block h-30 w-30
      shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl
      transition-all duration-300 outline-none focus-visible:scale-95
      focus-visible:opacity-100 focus-visible:shadow-md focus-visible:ring-4
      focus-visible:ring-offset-2`,
      active
        ? 'ring-ring-brand scale-95 shadow-md ring-4 ring-offset-2'
        : 'opacity-80 hover:scale-105 hover:opacity-100',
    ]"
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
  </a>
</template>
