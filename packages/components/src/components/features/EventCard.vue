<script setup lang="ts">
import { MapPin } from "lucide-vue-next";
import { useDateFormatting } from "../../composables/useDateFormatting";
import Card from "../ui/Card.vue";
import Badge from "../ui/Badge.vue";
import { computed } from "vue";

const props = defineProps<{
  /** Event title */
  heading: string;
  /** Event summary or description */
  text: string;
  /** Event cover image */
  image: {
    src: string;
    alt?: string;
  };
  /** Optional URL for event details */
  link?: string;
  /** ISO date for the time element (e.g., "2026-05-25") */
  dateTime: string;
  /** Formatted hour string (e.g., "14:00", "11:00, 13:00, 15:30") */
  hour?: string;
  /** Event location (city, venue, etc.) */
  location: string;
}>();

const { isoDate, humanDate } = useDateFormatting(
  computed(() => props.dateTime)
);
</script>

<template>
  <Card :heading="heading" :text="text" :image="image" :link="link">
    <template #tag>
      <Badge variant="brand" shape="square">
        <time :datetime="isoDate">{{ humanDate }}</time>
      </Badge>
      <template v-if="hour">
        <span class="text-content-muted mx-1">•</span>
        <span>{{ hour }}</span>
      </template>
    </template>

    <template #footer>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <MapPin :size="14" aria-hidden="true" class="text-brand" />
        <span class="font-medium">{{ location }}</span>
      </div>
    </template>
  </Card>
</template>
