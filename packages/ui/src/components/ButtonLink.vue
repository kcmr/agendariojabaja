<script lang="ts" setup>
import { computed } from "vue";
import {
  useButtonClasses,
  type ButtonVariant,
  type ButtonSize,
} from "../composables/useButtonClasses";

const props = withDefaults(
  defineProps<{
    /** URL to navigate to */
    href: string;
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Opens link in new tab with rel="noopener noreferrer" */
    external?: boolean;
  }>(),
  { variant: "brand", size: "md", external: false }
);

const classes = computed(() =>
  useButtonClasses({ variant: props.variant, size: props.size })
);
</script>

<template>
  <a
    :href="href"
    :class="classes"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </a>
</template>
