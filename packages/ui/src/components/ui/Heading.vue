<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }>(),
  { level: 1 }
);

const visualVariant = computed(() => props.variant || `h${props.level}`);

const variantClasses: Record<string, string> = {
  h1: "text-3xl sm:text-4xl font-extrabold",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
  h5: "text-md",
  h6: "text-sm",
};
</script>

<template>
  <component
    :is="`h${level}`"
    :class="[
      'text-content-heading leading-tight font-bold',
      variantClasses[visualVariant],
    ]"
  >
    <slot />
  </component>
</template>
