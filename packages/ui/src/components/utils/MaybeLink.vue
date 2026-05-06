<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  /** If provided, the component will render a link; otherwise, it will render the content passed through the default slot */
  href?: string;
}>();
</script>

<template>
  <a v-if="href" :href="href" v-bind="$attrs"><slot /></a>
  <slot v-else />
</template>
