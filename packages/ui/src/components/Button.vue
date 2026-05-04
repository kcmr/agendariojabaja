<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * primary or secondary button
     */
    primary?: boolean;
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * background color of the button
     */
    backgroundColor?: string;
  }>(),
  { primary: false }
);

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => [
  'inline-flex items-center justify-center font-bold rounded cursor-pointer border-0 leading-none',
  props.primary
    ? 'bg-[#1ea7fd] text-white'
    : 'bg-transparent text-[#333] ring-1 ring-inset ring-black/15',
  props.size === 'small' ? 'text-xs px-4 py-2'
    : props.size === 'large' ? 'text-base px-6 py-4'
    : 'text-sm px-5 py-3',
]);

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}));

const onClick = () => {
  emit('click', 1);
};
</script>

<template>
  <button type="button" :class="classes" @click="onClick" :style="style"><slot /></button>
</template>


