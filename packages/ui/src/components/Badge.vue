<script lang="ts" setup>
export type BadgeVariant =
  | "category"
  | "price"
  | "brand"
  | "muted"
  | "on-image";

withDefaults(
  defineProps<{
    /** Visual style variant */
    variant?: BadgeVariant;
    /**
     * Corner shape:
     * - "pill" (default) → fully-rounded, for floating badges
     * - "square" → slightly-rounded, for inline tags/labels
     */
    shape?: "pill" | "square";
  }>(),
  { variant: "brand", shape: "pill" }
);

const variantClasses: Record<BadgeVariant, string> = {
  category:
    "bg-surface-category-tint text-content-category border border-border-category-tint",
  price:
    "bg-surface-highlight-tint text-content-highlight border border-border-highlight-tint",
  brand:
    "bg-surface-brand-tint text-content-brand border border-border-brand-tint",
  muted: "bg-surface-muted text-content-muted border border-border-default",
  "on-image":
    "bg-black/60 text-white border border-white/20 backdrop-blur-sm shadow-sm",
};
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 px-3 py-1 text-sm font-bold',
      shape === 'square' ? 'rounded-md border-none' : 'rounded-full',
      variantClasses[variant ?? 'brand'],
    ]"
  >
    <slot name="icon" />
    <slot />
  </span>
</template>
