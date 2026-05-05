<script lang="ts" setup>
import { computed } from "vue";
import {
  useButtonClasses,
  type ButtonVariant,
  type ButtonSize,
} from "../../composables/useButtonClasses";

const props = withDefaults(
  defineProps<{
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Disabled state */
    disabled?: boolean;
  }>(),
  { variant: "brand", size: "md", disabled: false }
);

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const classes = computed(() =>
  useButtonClasses({
    variant: props.variant,
    size: props.size,
    disabled: props.disabled,
  })
);

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>

<template>
  <button type="button" :class="classes" :disabled="disabled" @click="onClick">
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>
