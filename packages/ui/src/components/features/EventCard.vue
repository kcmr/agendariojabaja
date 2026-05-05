<script setup lang="ts">
import { MapPin } from "lucide-vue-next";
import Card from "../ui/Card.vue";
import Badge from "../ui/Badge.vue";

defineProps<{
  /** Event title */
  title: string;
  /** Event summary or description */
  description: string;
  /** Event cover image */
  image: {
    src: string;
    alt?: string;
  };
  /** Formatted date string */
  date: string;
  /** ISO date for the time element */
  dateTime?: string;
  /** Event location (city, venue, etc.) */
  location: string;
  /** Whether it's an all-day event */
  isAllDay?: boolean;
}>();
</script>

<template>
  <Card :heading="title" :text="description" :image="image">
    <template #tag>
      <Badge variant="brand" shape="square">
        <time :datetime="dateTime ?? date">{{ date }}</time>
      </Badge>
      <template v-if="isAllDay">
        <span class="text-content-muted mx-1">•</span>
        <span>Todo el día</span>
      </template>
    </template>

    <template #footer>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <MapPin :size="14" aria-hidden="true" class="text-brand" />
        <span class="font-medium">{{ location }}</span>
      </div>
      <span
        class="text-brand text-sm font-semibold opacity-0 transition-opacity
          group-hover:opacity-100"
      >
        Ver más →
      </span>
    </template>
  </Card>
</template>
