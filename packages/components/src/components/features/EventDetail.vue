<script lang="ts" setup>
import { computed } from "vue";
import Icon from "../ui/Icon.vue";
import Badge from "../ui/Badge.vue";
import { useDateFormatting } from "../../composables/useDateFormatting";
import Heading from "../ui/Heading.vue";
import Button from "../ui/Button.vue";

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
  transitionName?: string;
}>();

const { isoDate, humanDate } = useDateFormatting(
  computed(() => props.event.date)
);
</script>

<template>
  <div class="mx-auto max-w-4xl py-8">
    <Button href="/" variant="text" size="md" class="mb-6">
      <template #icon-left>
        <Icon name="ArrowLeft" :size="20" />
      </template>
      Volver a la agenda
    </Button>

    <div
      class="border-border-subtle bg-surface-card overflow-hidden rounded-3xl
        border shadow-sm"
    >
      <!-- Hero image -->
      <div class="relative h-64 w-full sm:h-96">
        <img
          :src="event.img"
          :alt="event.imgAlt ?? event.title"
          :style="
            transitionName
              ? { viewTransitionName: `${transitionName}-image` }
              : undefined
          "
          class="h-full w-full object-cover"
        />
        <!-- Past event overlay -->
        <div
          v-if="event.status === 'past'"
          class="bg-content-heading/50 absolute inset-0 flex items-center
            justify-center"
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
              <Icon name="Ticket" :size="14" role="img" aria-label="Precio" />
            </template>
            {{ event.price }}
          </Badge>
        </div>

        <!-- Title -->
        <Heading :level="2" variant="h1" class="mb-6">
          <span
            :style="
              transitionName
                ? { viewTransitionName: `${transitionName}-title` }
                : undefined
            "
          >
            {{ event.title }}
          </span>
        </Heading>

        <!-- Date / location info grid -->
        <ul
          class="border-border-subtle bg-surface-subtle m-0 mb-8 grid list-none
            grid-cols-1 gap-6 rounded-2xl border p-6 md:grid-cols-2"
        >
          <li class="flex items-center gap-4">
            <div
              class="bg-surface-card text-content-brand rounded-full p-3
                shadow-sm"
            >
              <Icon name="Calendar" :size="24" />
            </div>
            <div>
              <strong class="text-content-muted block text-sm font-medium">
                Cuándo
              </strong>
              <span class="text-content-heading block font-semibold">
                <time :datetime="isoDate">{{ humanDate }}</time>
                <span v-if="event.time"> · {{ event.time }}</span>
              </span>
            </div>
          </li>
          <li class="flex items-center gap-4">
            <div
              class="bg-surface-card text-content-brand rounded-full p-3
                shadow-sm"
            >
              <Icon name="MapPin" :size="24" />
            </div>
            <div>
              <strong class="text-content-muted block text-sm font-medium">
                Dónde
              </strong>
              <span class="text-content-heading block font-semibold">
                {{ event.locality }}
              </span>
            </div>
          </li>
        </ul>

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
            <Icon name="Clock" :size="16" />
            Publicado originalmente en
            {{ event.sourceName ?? "Facebook" }}
          </p>
          <Button
            :href="event.sourceLink"
            external
            variant="brand"
            size="lg"
            class="w-full sm:w-auto"
          >
            <Icon name="ExternalLink" :size="18" />
            Ver fuente original
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
