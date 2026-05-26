<script lang="ts" setup>
import { computed } from "vue";
import Icon from "../ui/Icon.vue";
import Badge from "../ui/Badge.vue";
import { useDateFormatting } from "../../composables/useDateFormatting";
import Heading from "../ui/Heading.vue";
import Button from "../ui/Button.vue";
import type { EventDetailData } from "./EventDetail.vue";

const props = defineProps<{
  event: EventDetailData;
  transitionName?: string;
}>();

const { isoDate, humanDate } = useDateFormatting(
  computed(() => props.event.date)
);
</script>

<template>
  <article class="mx-auto max-w-6xl py-8">
    <Button href="/" variant="text" size="md" class="mb-6" data-back-link>
      <template #icon-left>
        <Icon name="ArrowLeft" :size="20" />
      </template>
      Volver a la agenda
    </Button>

    <div
      class="bg-surface-card border-border-subtle overflow-hidden rounded-2xl
        border shadow-sm"
    >
      <div class="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_440px]">
        <header class="lg:col-span-2">
          <div
            v-if="event.category || event.price"
            class="mb-5 flex flex-wrap items-center gap-3"
          >
            <Badge v-if="event.category" variant="category">
              {{ event.category }}
            </Badge>
            <Badge v-if="event.price" variant="price">
              <template #icon>
                <Icon name="Ticket" :size="14" role="img" aria-label="Precio" />
              </template>
              {{ event.price }}
            </Badge>
          </div>

          <Heading :level="1" variant="h1" class="max-w-5xl">
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
        </header>

        <div>
          <ul
            class="border-border-subtle bg-surface-subtle m-0 mb-10 grid
              list-none grid-cols-1 gap-6 rounded-2xl border p-6 md:grid-cols-2"
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

          <section>
            <Heading :level="2" class="mb-4">Sobre el evento</Heading>
            <p class="text-content-body text-lg whitespace-pre-line">
              {{ event.description }}
            </p>
          </section>
        </div>

        <aside class="self-start">
          <div
            class="border-border-subtle bg-surface-subtle relative flex min-h-96
              items-start justify-center overflow-hidden rounded-2xl border"
          >
            <img
              :src="event.img"
              :alt="event.imgAlt ?? event.title"
              :style="
                transitionName
                  ? { viewTransitionName: `${transitionName}-image` }
                  : undefined
              "
              class="h-auto max-h-[min(72vh,760px)] w-full object-contain"
            />
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
        </aside>
      </div>

      <footer
        class="border-border-subtle flex flex-col items-start justify-between
          gap-4 border-t px-6 py-5 sm:flex-row sm:items-center md:px-8"
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
      </footer>
    </div>
  </article>
</template>
