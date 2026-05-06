<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import {
  useButtonClasses,
  type ButtonVariant,
  type ButtonSize,
} from "../../composables/useButtonClasses";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });

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

const attrs = useAttrs();

const classes = computed(() =>
  twMerge(
    useButtonClasses({ variant: props.variant, size: props.size }),
    attrs.class as string
  )
);
</script>

<template>
  <a
    v-bind="{ ...attrs, class: undefined }"
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
