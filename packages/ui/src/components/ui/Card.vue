<script lang="ts" setup>
import Heading from "./Heading.vue";

defineProps<{
  /** Card heading */
  heading: string;
  /** Heading level for accessibility (default: h2) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Card content that will be rendered with ellipsis in a single paragraph */
  text: string;
  /** Image */
  image: {
    src: string;
    alt?: string;
  };
}>();
</script>

<template>
  <article
    class="group border-border-subtle bg-surface-card flex h-full max-w-94
      cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-sm
      transition-shadow hover:shadow-xl"
  >
    <div class="relative h-91.25 overflow-hidden">
      <img
        :src="image.src"
        :alt="image.alt ?? ''"
        loading="lazy"
        class="h-full w-full object-cover object-top transition-transform
          duration-500 group-hover:scale-105"
      />
    </div>

    <div class="flex grow flex-col p-5">
      <div
        v-if="$slots.tag"
        class="text-content-muted mb-4 flex items-center gap-2 text-sm"
      >
        <slot name="tag" />
      </div>

      <heading
        :level="headingLevel ?? 2"
        variant="h3"
        class="group-hover:text-content-brand mb-2 transition-colors"
      >
        {{ heading }}
      </heading>

      <p class="text-content-body mb-4 line-clamp-2 text-sm">
        {{ text }}
      </p>
    </div>

    <div
      v-if="$slots.footer"
      class="border-border-subtle mt-auto flex items-center justify-between
        border-t px-5 pt-4 pb-5"
    >
      <slot name="footer" />
    </div>
  </article>
</template>
