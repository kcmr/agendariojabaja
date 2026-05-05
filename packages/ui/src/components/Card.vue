<script lang="ts" setup>
defineProps<{
  /** Card heading */
  heading: string;
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
      <div class="text-content-muted mb-4 flex items-center gap-2 text-sm">
        <slot name="tag" />
      </div>

      <h2
        class="text-content-heading group-hover:text-content-brand mb-2 text-xl
          leading-tight font-bold transition-colors"
      >
        {{ heading }}
      </h2>
      <p class="text-content-body mb-4 line-clamp-2 text-sm">
        {{ text }}
      </p>
    </div>

    <div
      class="border-border-subtle mt-auto flex items-center justify-between
        border-t pt-4"
    >
      <slot name="footer" />
    </div>
  </article>
</template>
