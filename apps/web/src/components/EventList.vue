<script lang="ts" setup>
import { navigate } from "astro:transitions/client";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import EventCard from "@repo/components/features/EventCard.vue";
import EmptyState from "@repo/components/features/EmptyState.vue";
import FormSelect, {
  type FormSelectOption,
} from "@repo/components/ui/FormSelect.vue";
import Pagination from "@repo/components/ui/Pagination.vue";
import Tabs from "@repo/components/ui/Tabs.vue";
import {
  DEFAULT_AGENDA_PAGE,
  DEFAULT_AGENDA_LOCALITY,
  DEFAULT_AGENDA_STATUS,
  type AgendaState,
  filterAgendaEvents,
  getAgendaLocalities,
  getAgendaPageEvents,
  getAgendaTotalPages,
  getAgendaUrl,
  parseAgendaPath,
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

const currentState = ref<AgendaState>({ ...props.state });
let isSyncingExternalState = false;

const defaultState = (): AgendaState => ({
  status: DEFAULT_AGENDA_STATUS,
  locality: DEFAULT_AGENDA_LOCALITY,
  page: DEFAULT_AGENDA_PAGE,
});

const statesMatch = (a: AgendaState, b: AgendaState) =>
  a.status === b.status && a.locality === b.locality && a.page === b.page;

const parseCurrentUrlState = () => {
  if (typeof window === "undefined") return null;

  const path = window.location.pathname;

  if (path === "/") {
    return defaultState();
  }

  if (!path.startsWith("/agenda/")) {
    return null;
  }

  return parseAgendaPath(path.replace(/^\/agenda\/|\/$/g, ""));
};

const applyUrlState = () => {
  const urlState = parseCurrentUrlState();

  if (!urlState || statesMatch(urlState, currentState.value)) return;

  isSyncingExternalState = true;
  currentState.value = urlState;
  queueMicrotask(() => {
    isSyncingExternalState = false;
  });
};

const navigateToState = (state: AgendaState) => {
  currentState.value = state;

  if (typeof window === "undefined" || isSyncingExternalState) return;

  const url = getAgendaUrl(state);

  if (url === window.location.pathname) return;

  void navigate(url);
};

const pushStateWithoutNavigation = (state: AgendaState) => {
  currentState.value = state;

  if (typeof window === "undefined" || isSyncingExternalState) return;

  const url = getAgendaUrl(state);

  if (url === window.location.pathname) return;

  const currentHistoryState = window.history.state ?? {};

  window.history.pushState(
    {
      ...currentHistoryState,
      agendaState: state,
      index: (currentHistoryState.index ?? 0) + 1,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    },
    "",
    url,
  );
};

const selectedLocality = computed({
  get: () => currentState.value.locality,
  set: (locality) => {
    navigateToState({ ...currentState.value, locality, page: 1 });
  },
});
const selectedStatus = computed({
  get: () => currentState.value.status,
  set: (status) => {
    navigateToState({ ...currentState.value, status, page: 1 });
  },
});
const currentPage = computed({
  get: () => currentState.value.page,
  set: (page) => {
    pushStateWithoutNavigation({ ...currentState.value, page });
  },
});
const statusTabs = computed(() => [
  {
    value: "upcoming",
    label: "Próximos planes",
  },
  {
    value: "past",
    label: "Histórico reciente",
  },
]);

const localities = computed<FormSelectOption[]>(() => {
  return [
    {
      value: DEFAULT_AGENDA_LOCALITY,
      label: "Toda La Rioja Baja",
    },
    ...getAgendaLocalities().map((locality) => ({
      value: locality.id,
      label: locality.label,
    })),
  ];
});

const filteredEvents = computed(() =>
  filterAgendaEvents(props.events, currentState.value),
);

const totalPages = computed(() =>
  getAgendaTotalPages(props.events, currentState.value),
);

const paginatedEvents = computed(() =>
  getAgendaPageEvents(props.events, currentState.value),
);

const previousHref = computed(() =>
  currentState.value.page > 1
    ? getAgendaUrl({ ...currentState.value, page: currentState.value.page - 1 })
    : undefined,
);

const nextHref = computed(() =>
  currentState.value.page < totalPages.value
    ? getAgendaUrl({ ...currentState.value, page: currentState.value.page + 1 })
    : undefined,
);

watch(totalPages, (nextTotalPages) => {
  if (currentState.value.page > nextTotalPages) {
    navigateToState({ ...currentState.value, page: nextTotalPages });
  }
});

watch(
  () => props.state,
  (state) => {
    if (statesMatch(state, currentState.value)) return;

    isSyncingExternalState = true;
    currentState.value = { ...state };
    queueMicrotask(() => {
      isSyncingExternalState = false;
    });
  },
  { deep: true },
);

onMounted(() => {
  applyUrlState();
  window.addEventListener("popstate", applyUrlState);
  document.addEventListener("astro:page-load", applyUrlState);
});

onUnmounted(() => {
  window.removeEventListener("popstate", applyUrlState);
  document.removeEventListener("astro:page-load", applyUrlState);
});
</script>

<template>
  <div>
    <section
      class="mb-8 py-4 sm:bg-surface-card sm:border-border-default sm:rounded-4xl sm:border sm:px-6 sm:py-14 sm:shadow-sm"
    >
      <div class="mx-auto max-w-sm sm:px-0">
        <FormSelect
          :id="`${ID_BASE}-filter`"
          v-model="selectedLocality"
          label="¿Qué quieres hacer en...?"
          :options="localities"
          icon="MapPin"
          label-variant="hero"
          select-size="xl"
        />
      </div>
    </section>

    <div
      class="mb-6 flex flex-col items-start gap-4 border-b border-border-default pb-4"
    >
      <Tabs
        id-base="event-status"
        v-model="selectedStatus"
        :tabs="statusTabs"
        aria-label="Tipo de eventos"
      />
    </div>

    <section>
      <div
        v-if="filteredEvents.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
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
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :previous-href="previousHref"
        :next-href="nextHref"
        client-navigation
      />
    </section>
  </div>
</template>
