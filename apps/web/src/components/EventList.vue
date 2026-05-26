<script lang="ts" setup>
import { computed } from "vue";
import LocalitySelector, { type LocalitySelectorOption } from "@repo/components/features/LocalitySelector.vue";
import EventCard from "@repo/components/features/EventCard.vue";
import EmptyState from "@repo/components/features/EmptyState.vue";
import Pagination from "@repo/components/ui/Pagination.vue";
import Tabs from "@repo/components/ui/Tabs.vue";
import {
  DEFAULT_AGENDA_LOCALITY,
  type AgendaState,
  filterAgendaEvents,
  getAgendaLocalities,
  getAgendaPageEvents,
  getAgendaTotalPages,
  getAgendaUrl
} from "../lib/agenda";

interface EventListItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category?: string;
  image?: {
    src: string;
    alt: string;
  };
  status: "upcoming" | "past";
}

const props = defineProps<{
  events: EventListItem[];
  state: AgendaState;
}>();

const ID_BASE = "locality";
const FALLBACK_IMAGE = "/images/arb-instagram-profile.webp";
const LOCALITY_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1660903293997-efd8ee1abf9a?auto=format&fit=crop&q=80&w=300&h=300";

const selectedLocality = computed(() => props.state.locality);
const selectedStatus = computed(() => props.state.status);
const currentPage = computed(() => props.state.page);
const statusTabs = computed(() => [
  {
    value: "upcoming",
    label: "Próximos planes",
    href:
      props.state.status === "upcoming"
        ? getAgendaUrl(props.state)
        : getAgendaUrl({
            status: "upcoming",
            locality: props.state.locality,
            page: 1,
          }),
  },
  {
    value: "past",
    label: "Histórico reciente",
    href:
      props.state.status === "past"
        ? getAgendaUrl(props.state)
        : getAgendaUrl({
            status: "past",
            locality: props.state.locality,
            page: 1,
          }),
  },
]);

const localities = computed<LocalitySelectorOption[]>(() => {
  return [
    {
      id: DEFAULT_AGENDA_LOCALITY,
      label: "Toda La Rioja Baja",
      img: LOCALITY_PLACEHOLDER_IMAGE,
      href:
        props.state.locality === DEFAULT_AGENDA_LOCALITY
          ? getAgendaUrl(props.state)
          : getAgendaUrl({
              status: props.state.status,
              locality: DEFAULT_AGENDA_LOCALITY,
              page: 1,
            }),
    },
    ...getAgendaLocalities(props.events).map((locality) => ({
      ...locality,
      img: LOCALITY_PLACEHOLDER_IMAGE,
      href:
        props.state.locality === locality.id
          ? getAgendaUrl(props.state)
          : getAgendaUrl({
              status: props.state.status,
              locality: locality.id,
              page: 1,
            }),
    })),
  ];
});

const filteredEvents = computed(() => filterAgendaEvents(props.events, props.state));

const totalPages = computed(() => getAgendaTotalPages(props.events, props.state));

const paginatedEvents = computed(() => getAgendaPageEvents(props.events, props.state));

const previousHref = computed(() =>
  props.state.page > 1
    ? getAgendaUrl({ ...props.state, page: props.state.page - 1 })
    : undefined
);

const nextHref = computed(() =>
  props.state.page < totalPages.value
    ? getAgendaUrl({ ...props.state, page: props.state.page + 1 })
    : undefined
);
</script>

<template>
  <div>
    <LocalitySelector
      :id-base="ID_BASE"
      heading="¿Dónde buscas planes?"
      :localities="localities"
      :active-id="selectedLocality"
    />

    <div class="mb-6 flex flex-col gap-4 border-b border-border-default pb-4">
      <Tabs
        id-base="event-status"
        :model-value="selectedStatus"
        :tabs="statusTabs"
        aria-label="Tipo de eventos"
      />
    </div>

    <section
    >
      <div v-if="filteredEvents.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EventCard
          v-for="event in paginatedEvents"
          :key="event.id"
          :heading="event.title"
          :text="event.description"
          :image="event.image ?? { src: FALLBACK_IMAGE, alt: event.title }"
          :link="`/eventos/${event.slug}/`"
          :date-time="event.date"
          :hour="event.time"
          :location="event.location ?? 'La Rioja Baja'"
          :status="event.status"
          :transition-name="`event-${event.slug}`"
        />
      </div>

      <EmptyState
        v-else
        title="No hay eventos para esta selección"
        description="Prueba a cambiar de localidad o revisa el histórico reciente."
      />

      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        :previous-href="previousHref"
        :next-href="nextHref"
      />
    </section>
  </div>
</template>
