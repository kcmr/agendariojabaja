<script lang="ts" setup>
export type BadgeVariant = "category" | "price" | "brand" | "muted";

withDefaults(
  defineProps<{
    /** Visual style variant */
    variant?: BadgeVariant;
  }>(),
  { variant: "brand" }
);

const variantClasses: Record<BadgeVariant, string> = {
  category:
    "bg-surface-category-tint text-content-category border border-border-category-tint",
  price:
    "bg-surface-highlight-tint text-content-highlight border border-border-highlight-tint",
  brand:
    "bg-surface-brand-tint text-content-brand border border-border-brand-tint",
  muted:
    "bg-surface-muted text-content-muted border border-border-default",
};
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold',
      variantClasses[variant ?? 'brand'],
    ]"
  >
    <slot name="icon" />
    <slot />
  </span>
</template>
