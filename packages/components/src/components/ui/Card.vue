<script lang="ts" setup>
import MaybeLink from "../utils/MaybeLink.vue";
import Heading, { type HeadingLevel } from "./Heading.vue";

defineProps<{
  /** Card heading */
  heading: string;
  /** Heading level for accessibility (default: h2) */
  headingLevel?: HeadingLevel;
  /** Card content that will be rendered with ellipsis in a single paragraph */
  text: string;
  /** Image */
  image: {
    src: string;
    alt?: string;
  };
  /** Link URL */
  link?: string;
}>();
</script>

<template>
  <article
    class="group border-border-subtle bg-surface-card flex h-full max-w-94
      flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow
      has-[a]:relative has-[a]:hover:shadow-xl"
  >
    <div class="relative h-91.25 overflow-hidden">
      <MaybeLink :href="link" aria-hidden="true" tabindex="-1">
        <img
          loading="lazy"
          :src="image.src"
          :alt="image.alt ?? ''"
          class="h-full w-full object-cover object-top
            group-has-[a]:transition-transform group-has-[a]:duration-500
            group-has-[a]:group-hover:scale-105"
        />
      </MaybeLink>
    </div>

    <div class="flex grow flex-col p-5">
      <div
        v-if="$slots.tag"
        class="text-content-muted mb-4 flex items-center gap-2 text-sm"
      >
        <slot name="tag" />
      </div>

      <MaybeLink :href="link">
        <Heading
          variant="h3"
          :level="headingLevel ?? 2"
          class="group-has-[a]:group-hover:text-content-brand mb-2
            transition-colors"
        >
          {{ heading }}
        </Heading>
      </MaybeLink>

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
