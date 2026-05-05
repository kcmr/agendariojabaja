<script lang="ts" setup>
import { onMounted } from "vue";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Ticket,
} from "lucide-vue-next";
import Badge from "../ui/Badge.vue";

export interface EventDetailData {
  id: number | string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  locality: string;
  price: string;
  img: string;
  imgAlt?: string;
  sourceLink: string;
  sourceName?: string;
  status?: "upcoming" | "past";
}

const props = defineProps<{
  event: EventDetailData;
}>();

const emit = defineEmits<{
  (e: "back"): void;
}>();

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <div class="mx-auto max-w-4xl py-8">
    <!-- Back button -->
    <button
      type="button"
      class="text-content-muted hover:text-content-brand mb-6 flex
        cursor-pointer items-center gap-2 font-medium transition-colors"
      @click="emit('back')"
    >
      <ArrowLeft :size="20" aria-hidden="true" />
      Volver a la agenda
    </button>

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
        <div class="mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="category">{{ event.category }}</Badge>
          <Badge variant="price">
            <template #icon>
              <Ticket :size="14" aria-hidden="true" />
            </template>
            {{ event.price }}
          </Badge>
        </div>

        <!-- Title -->
        <h1
          class="text-content-heading mb-6 text-3xl leading-tight font-extrabold
            sm:text-4xl"
        >
          {{ event.title }}
        </h1>

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
              <Calendar :size="24" aria-hidden="true" />
            </div>
            <div>
              <p class="text-content-muted text-sm font-medium">Fecha y Hora</p>
              <p class="text-content-heading font-semibold">
                {{ event.date }} · {{ event.time }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div
              class="bg-surface-card text-content-brand rounded-full p-3
                shadow-sm"
            >
              <MapPin :size="24" aria-hidden="true" />
            </div>
            <div>
              <p class="text-content-muted text-sm font-medium">Ubicación</p>
              <p class="text-content-heading font-semibold">
                {{ event.locality }}
              </p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-10">
          <h2 class="text-content-heading mb-4 text-xl font-bold">
            Sobre el evento
          </h2>
          <p
            class="text-content-body text-lg leading-relaxed
              whitespace-pre-line"
          >
            {{ event.description }}
          </p>
        </div>

        <!-- Footer: source link -->
        <div
          class="border-border-subtle flex flex-col items-center justify-between
            gap-4 border-t pt-8 sm:flex-row"
        >
          <p class="text-content-muted flex items-center gap-2 text-sm">
            <Clock :size="16" aria-hidden="true" />
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
            <ExternalLink :size="18" aria-hidden="true" />
            Ver fuente original
          </a>
        </div>
      </div>
    </div>

    <!-- Ad slot below detail -->
    <slot name="ad" />
  </div>
</template>
