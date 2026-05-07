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
    href?: string;
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Opens link in new tab with rel="noopener noreferrer" */
    external?: boolean;
    /** Disables the button */
    disabled?: boolean;
  }>(),
  {
    href: undefined,
    variant: "brand",
    size: "md",
    external: false,
    disabled: false,
  }
);

const attrs = useAttrs();

const tag = computed(() => (props.href ? "a" : "button"));

const classes = computed(() =>
  twMerge(
    useButtonClasses({
      variant: props.variant,
      size: props.size,
      disabled: props.disabled,
    }),
    attrs.class as string
  )
);

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
};
</script>

<template>
  <component
    :is="tag"
    v-bind="{ ...attrs, class: undefined }"
    :href="href"
    :type="!href ? 'button' : undefined"
    :class="classes"
    :disabled="disabled"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    @click="onClick"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>
