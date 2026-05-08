<script lang="ts" setup>
import { computed } from "vue";
import { Calendar, Clock, ExternalLink, MapPin, Ticket } from "lucide-vue-next";
import Badge from "../ui/Badge.vue";
import { useDateFormatting } from "../../composables/useDateFormatting";
import Heading from "../ui/Heading.vue";

export interface EventDetailData {
  id: number | string;
  title: string;
  description: string;
  date: string;
  time: string;
  locality: string;
  img: string;
  imgAlt?: string;
  category?: string;
  price?: string;
  sourceLink: string;
  sourceName?: string;
  status?: "upcoming" | "past";
}

const props = defineProps<{
  event: EventDetailData;
}>();

const { isoDate, humanDate } = useDateFormatting(
  computed(() => props.event.date)
);
</script>

<template>
  <div class="mx-auto max-w-4xl py-8">
    <div
      class="border-border-subtle bg-surface-card overflow-hidden rounded-3xl
        border shadow-sm"
    >
      <!-- Hero image -->
      <div class="relative h-64 w-full sm:h-96">
        <img
          :src="event.img"
          :alt="event.imgAlt ?? event.title"
          class="h-full w-full object-cover"
        />
        <!-- Past event overlay -->
        <div
          v-if="event.status === 'past'"
          class="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <span
            class="bg-surface-card text-content-heading rounded-xl px-6 py-3
              text-lg font-bold shadow-lg"
          >
            Este evento ya se ha celebrado
          </span>
        </div>
      </div>

      <div class="p-8 sm:p-12">
        <!-- Badges row -->
        <div
          v-if="event.category || event.price"
          class="mb-6 flex flex-wrap items-center gap-3"
        >
          <Badge v-if="event.category" variant="category">{{
            event.category
          }}</Badge>
          <Badge v-if="event.price" variant="price">
            <template #icon>
              <Ticket :size="14" />
            </template>
            {{ event.price }}
          </Badge>
        </div>

        <!-- Title -->
        <Heading :level="2" variant="h1" class="mb-6">
          {{ event.title }}
        </Heading>

        <!-- Date / location info grid -->
        <div
          class="border-border-subtle bg-surface-subtle mb-8 grid grid-cols-1
            gap-6 rounded-2xl border p-6 md:grid-cols-2"
        >
          <div class="flex items-center gap-4">
            <div
              class="bg-surface-card text-content-brand rounded-full p-3
                shadow-sm"
            >
              <Calendar :size="24" />
            </div>
            <div>
              <p class="text-content-muted text-sm font-medium">Cuándo</p>
              <p class="text-content-heading font-semibold">
                <time :datetime="isoDate">{{ humanDate }}</time>
                <span v-if="event.time"> · {{ event.time }}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div
              class="bg-surface-card text-content-brand rounded-full p-3
                shadow-sm"
            >
              <MapPin :size="24" />
            </div>
            <div>
              <p class="text-content-muted text-sm font-medium">Dónde</p>
              <p class="text-content-heading font-semibold">
                {{ event.locality }}
              </p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-10">
          <Heading :level="3" class="mb-4">Sobre el evento</Heading>
          <p class="text-content-body text-lg whitespace-pre-line">
            {{ event.description }}
          </p>
        </div>

        <!-- Footer: source link -->
        <div
          class="border-border-subtle flex flex-col items-center justify-between
            gap-4 border-t pt-8 sm:flex-row"
        >
          <p class="text-content-muted flex items-center gap-2 text-sm">
            <Clock :size="16" />
            Publicado originalmente en
            {{ event.sourceName ?? "Facebook" }}
          </p>
          <a
            :href="event.sourceLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-full items-center justify-center gap-2 rounded-xl
              bg-[#3b5998] px-6 py-3 font-semibold text-white shadow-sm
              transition-colors hover:bg-[#2d4373] sm:w-auto"
          >
            <ExternalLink :size="18" />
            Ver fuente original
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
