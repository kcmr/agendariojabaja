<script lang="ts" setup>
defineProps<{
  /** If provided, the component will render a link; otherwise, it will render the content passed through the default slot */
  href?: string;
}>();
</script>

<template>
  <a v-if="href" :href="href"><slot /></a>
  <template v-else><slot /></template>
</template>
