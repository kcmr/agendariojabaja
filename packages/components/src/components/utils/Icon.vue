<script setup lang="ts">
/**
 * Icon component that wraps lucide-vue-next icons and allows other components to set icon propertys using a typed name string.
 * Currently supports "Mail" and "Megaphone" icons only to keep the bundle size small. More icons can be added as needed.
 */
import { Mail, Megaphone } from "lucide-vue-next";
import { computed } from "vue";

const icons = {
  Mail,
  Megaphone,
} as const;

export type IconName = keyof typeof icons;

const props = withDefaults(
  defineProps<{
    /** Name of the icon to display */
    name: IconName;
    /** Size of the icon in pixels */
    size?: number;
  }>(),
  {
    size: 16,
  }
);

const iconComponent = computed(() => icons[props.name]);
</script>

<template>
  <component :is="iconComponent" :size="size" />
</template>
