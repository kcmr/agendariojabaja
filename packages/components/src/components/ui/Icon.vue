<script setup lang="ts">
/**
 * Icon component that wraps lucide-vue-next icons and allows other components to set icon propertys using a typed name string.
 * Currently supports a limited set of icons only to keep the bundle size small. More icons can be added as needed.
 */
import {
  Mail,
  Megaphone,
  Search,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Ticket,
  ArrowLeft,
  Home,
  MapPinOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  List,
  Instagram,
} from "lucide-vue-next";
import { computed } from "vue";

const icons = {
  Mail,
  Megaphone,
  Search,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Ticket,
  ArrowLeft,
  Home,
  MapPinOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  List,
  Instagram,
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
