<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import CalendarView from "@repo/components/features/CalendarView.vue";
import EventCard from "@repo/components/features/EventCard.vue";
import EmptyState from "@repo/components/features/EmptyState.vue";
import FormSelect, {
  type FormSelectOption,
} from "@repo/components/ui/FormSelect.vue";
import Icon from "@repo/components/ui/Icon.vue";
import Pagination from "@repo/components/ui/Pagination.vue";
import Tabs from "@repo/components/ui/Tabs.vue";
import {
  DEFAULT_AGENDA_PAGE,
  DEFAULT_AGENDA_LOCALITY,
  type AgendaState,
  filterAgendaEvents,
  getAgendaLocalities,
  getAgendaPageEvents,
  getAgendaTotalPages,
  getAgendaUrl,
  parseAgendaPath,
} from "../lib/agenda";
import { trackAnalyticsEvent } from "../scripts/analytics";

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
const activeView = ref<"list" | "calendar">("list");
let isSyncingExternalState = false;

const defaultState = (): AgendaState => ({
  locality: DEFAULT_AGENDA_LOCALITY,
  page: DEFAULT_AGENDA_PAGE,
});

const statesMatch = (a: AgendaState, b: AgendaState) =>
  a.locality === b.locality && a.page === b.page;

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
    trackAnalyticsEvent("agenda_filter_change", {
      locality,
      previous_locality: currentState.value.locality,
    });
    pushStateWithoutNavigation({ ...currentState.value, locality, page: 1 });
  },
});
const currentPage = computed({
  get: () => currentState.value.page,
  set: (page) => {
    pushStateWithoutNavigation({ ...currentState.value, page });
  },
});
const viewTabs = computed(() => [
  {
    value: "list",
    label: "Lista",
  },
  {
    value: "calendar",
    label: "Calendario",
  },
]);

const trackEventCardClick = (clickEvent: MouseEvent, event: EventListItem) => {
  if (!(clickEvent.target instanceof Element)) return;
  if (!clickEvent.target.closest("a")) return;

  trackAnalyticsEvent("event_card_click", {
    event_id: event.id,
    event_slug: event.slug,
    event_title: event.title,
    locality: event.location ?? "La Rioja Baja",
    category: event.category ?? "",
    view: activeView.value,
  });
};

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

const selectedLocalityHeading = computed(() => {
  if (currentState.value.locality === DEFAULT_AGENDA_LOCALITY) {
    return "La Rioja Baja";
  }

  return (
    localities.value.find(
      (locality) => locality.value === currentState.value.locality,
    )?.label ?? "La Rioja Baja"
  );
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

const calendarEvents = computed(() =>
  filteredEvents.value.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    href: `/eventos/${event.slug}/`,
    status: event.status,
    location: event.location ?? "La Rioja Baja",
    category: event.category,
  })),
);

const calendarInitialMonth = computed(() =>
  calendarEvents.value[0]?.date.slice(0, 7),
);

const currentIsoMonth = computed(() => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");

  return `${today.getFullYear()}-${month}`;
});

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

const pageTitle = computed(() => {
  const page = currentState.value.page > 1
    ? ` - Página ${currentState.value.page}`
    : "";

  return `Eventos en ${selectedLocalityHeading.value}${page} | Agenda Rioja Baja`;
});

const resultsAnnouncement = computed(() => {
  const view = activeView.value === "calendar" ? "calendario" : "lista";
  const count = filteredEvents.value.length;
  const noun = count === 1 ? "evento" : "eventos";

  return `${count} ${noun} en ${selectedLocalityHeading.value}. Vista ${view}.`;
});

watch(totalPages, (nextTotalPages) => {
  if (currentState.value.page > nextTotalPages) {
    pushStateWithoutNavigation({ ...currentState.value, page: nextTotalPages });
  }
});

watch(pageTitle, (title) => {
  if (typeof document !== "undefined") {
    document.title = title;
  }
});

watch(activeView, (view, previousView) => {
  trackAnalyticsEvent("agenda_view_change", {
    view,
    previous_view: previousView,
    locality: currentState.value.locality,
  });
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
    <section class="mb-6">
      <div
        class="flex flex-col items-stretch justify-between gap-4 lg:flex-row
          lg:items-end"
      >
        <div class="w-full sm:max-w-sm">
          <FormSelect
            :id="`${ID_BASE}-filter`"
            v-model="selectedLocality"
            label="¿Qué quieres hacer en...?"
            :options="localities"
            icon="MapPin"
            label-variant="hero"
            select-size="lg"
          />
        </div>

        <Tabs
          id-base="event-view"
          v-model="activeView"
          :tabs="viewTabs"
          variant="segment"
          aria-label="Vista de eventos"
        >
          <template #icon-list>
            <Icon name="List" :size="18" aria-hidden="true" />
          </template>
          <template #icon-calendar>
            <Icon name="Calendar" :size="18" aria-hidden="true" />
          </template>
        </Tabs>
      </div>
    </section>

    <p class="sr-only" role="status" aria-live="polite">
      {{ resultsAnnouncement }}
    </p>

    <section
      v-show="activeView === 'list'"
      id="event-view-panel-list"
      role="tabpanel"
      :hidden="activeView !== 'list'"
      aria-labelledby="event-view-tab-list"
    >
      <h2 id="events-list-heading" class="sr-only">
        Eventos en {{ selectedLocalityHeading }}
      </h2>

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
          :heading-level="3"
          @click.capture="trackEventCardClick($event, event)"
        />
      </div>

      <EmptyState
        v-else
        title="No hay eventos para esta selección"
        description="Prueba a cambiar de localidad o vuelve más adelante."
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

    <div
      v-show="activeView === 'calendar'"
      id="event-view-panel-calendar"
      role="tabpanel"
      :hidden="activeView !== 'calendar'"
      aria-labelledby="event-view-tab-calendar"
    >
      <CalendarView
        :key="currentState.locality"
        :events="calendarEvents"
        :initial-month="calendarInitialMonth"
        :min-month="currentIsoMonth"
      />
    </div>
  </div>
</template>
