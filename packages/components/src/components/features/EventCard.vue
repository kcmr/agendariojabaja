<script setup lang="ts">
import Icon from "../ui/Icon.vue";
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
  /** Event status */
  status?: "upcoming" | "past";
}>();

const { isoDate, humanDate } = useDateFormatting(
  computed(() => props.dateTime)
);
</script>

<template>
  <Card :heading="heading" :text="text" :image="image" :link="link">
    <template v-if="status === 'past'" #image-overlay>
      <div
        class="bg-content-heading/50 pointer-events-none absolute inset-0 flex
          items-center justify-center"
      >
        <span
          class="bg-surface-card text-content-heading rounded-lg px-4 py-2
            font-bold shadow-lg"
        >
          Evento finalizado
        </span>
      </div>
    </template>

    <template #tag>
      <Badge variant="brand" shape="square">
        <time :datetime="isoDate">{{ humanDate }}</time>
      </Badge>
      <template v-if="hour">
        <span class="text-content-muted mx-1" aria-hidden="true">•</span>
        <span>{{ hour }}</span>
      </template>
    </template>

    <template #footer>
      <div class="text-content-muted flex items-center gap-2 text-sm">
        <Icon name="MapPin" :size="14" class="text-content-brand" />
        <span class="font-medium">{{ location }}</span>
      </div>
    </template>
  </Card>
</template>
