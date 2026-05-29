<script lang="ts" setup>
import MaybeLink from "../utils/MaybeLink.vue";
import Heading, { type HeadingLevel } from "./Heading.vue";

const props = withDefaults(
  defineProps<{
    /** Card heading */
    heading: string;
    /** Heading level for accessibility (default: h3) */
    headingLevel?: HeadingLevel;
    /** Card content that will be rendered with ellipsis in a single paragraph */
    text: string;
    /** Image */
    image?: {
      src: string;
      alt?: string;
    };
    /** Link URL */
    link?: string;
    /** Optional stable view-transition name prefix */
    transitionName?: string;
    /** More compact visual treatment for secondary card groups */
    size?: "md" | "sm";
  }>(),
  {
    headingLevel: undefined,
    image: undefined,
    link: undefined,
    transitionName: undefined,
    size: "md",
  }
);
</script>

<template>
  <article
    class="group border-border-subtle bg-surface-card flex h-full w-full
      flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow
      has-[a]:relative has-[a]:hover:shadow-xl"
  >
    <div
      v-if="image"
      :class="[
        'relative overflow-hidden',
        props.size === 'sm' ? 'h-48' : 'h-91.25',
      ]"
    >
      <MaybeLink :href="link" aria-hidden="true" tabindex="-1">
        <img
          loading="lazy"
          :src="image.src"
          :alt="image.alt ?? ''"
          :style="
            transitionName
              ? { viewTransitionName: `${transitionName}-image` }
              : undefined
          "
          class="h-full w-full object-cover object-top
            group-has-[a]:transition-transform group-has-[a]:duration-500
            group-has-[a]:group-hover:scale-105"
        />
      </MaybeLink>
      <slot name="image-overlay" />
    </div>

    <div :class="['flex grow flex-col', props.size === 'sm' ? 'p-4' : 'p-5']">
      <div
        v-if="$slots.tag"
        :class="[
          'text-content-muted flex flex-wrap items-center gap-2 text-sm',
          props.size === 'sm' ? 'mb-3' : 'mb-4',
        ]"
      >
        <slot name="tag" />
      </div>

      <MaybeLink :href="link">
        <Heading
          variant="h3"
          :level="headingLevel ?? 3"
          :style="
            transitionName
              ? { viewTransitionName: `${transitionName}-title` }
              : undefined
          "
          class="group-has-[a]:group-hover:text-content-brand mb-2
            transition-colors"
        >
          {{ heading }}
        </Heading>
      </MaybeLink>

      <p
        :class="[
          'text-content-body mb-4 text-sm',
          props.size === 'sm' ? 'line-clamp-2' : 'line-clamp-3',
        ]"
      >
        {{ text }}
      </p>
    </div>

    <div
      v-if="$slots.footer"
      :class="[
        `border-border-subtle mt-auto flex items-center justify-between
        border-t`,
        props.size === 'sm' ? 'px-4 pt-3 pb-4' : 'px-5 pt-4 pb-5',
      ]"
    >
      <slot name="footer" />
    </div>
  </article>
</template>
