<script lang="ts" setup>
import { computed, ref } from "vue";
import LocalitySelector, { type LocalitySelectorOption } from "@repo/components/features/LocalitySelector.vue";
import EventCard from "@repo/components/features/EventCard.vue";
import EmptyState from "@repo/components/features/EmptyState.vue";
import Pagination from "@repo/components/ui/Pagination.vue";
import Tabs from "@repo/components/ui/Tabs.vue";

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
}>();

const ID_BASE = "locality";
const ITEMS_PER_PAGE = 9;
const FALLBACK_IMAGE = "/images/arb-instagram-profile.webp";
const ALL_LOCALITIES_IMAGE =
  "https://images.unsplash.com/photo-1660903293997-efd8ee1abf9a?auto=format&fit=crop&q=80&w=300&h=300";

const selectedLocality = ref("all");
const selectedStatus = ref<"upcoming" | "past">("upcoming");
const currentPage = ref(1);
const statusTabs = [
  { value: "upcoming", label: "Próximos planes" },
  { value: "past", label: "Histórico reciente" },
];

const normalizeLocalityId = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const localityIdForEvent = (event: EventListItem) =>
  normalizeLocalityId(event.location ?? "la-rioja-baja") || "la-rioja-baja";

const localities = computed<LocalitySelectorOption[]>(() => {
  const localityMap = new Map<string, LocalitySelectorOption>();

  for (const event of props.events) {
    const label = event.location ?? "La Rioja Baja";
    const id = localityIdForEvent(event);

    if (!localityMap.has(id)) {
      localityMap.set(id, {
        id,
        label,
        img: event.image?.src ?? ALL_LOCALITIES_IMAGE,
      });
    }
  }

  return [
    {
      id: "all",
      label: "Toda La Rioja Baja",
      img: ALL_LOCALITIES_IMAGE,
    },
    ...Array.from(localityMap.values()).sort((a, b) =>
      a.label.localeCompare(b.label, "es")
    ),
  ];
});

const filteredEvents = computed(() =>
  props.events.filter(
    (event) =>
      event.status === selectedStatus.value &&
      (selectedLocality.value === "all" ||
        localityIdForEvent(event) === selectedLocality.value)
  )
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredEvents.value.length / ITEMS_PER_PAGE))
);

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
  return filteredEvents.value.slice(start, start + ITEMS_PER_PAGE);
});

const onFilterChange = () => {
  currentPage.value = 1;
};

const onStatusChange = (status: string | number) => {
  selectedStatus.value = String(status) === "past" ? "past" : "upcoming";
  onFilterChange();
};

const onPageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div>
    <LocalitySelector
      :id-base="ID_BASE"
      heading="¿Dónde buscas planes?"
      :localities="localities"
      v-model="selectedLocality"
      @select="onFilterChange"
    />

    <div class="mb-6 flex flex-col gap-4 border-b border-border-default pb-4">
      <Tabs
        id-base="event-status"
        :model-value="selectedStatus"
        :tabs="statusTabs"
        aria-label="Tipo de eventos"
        @update:model-value="onStatusChange"
      />
    </div>

    <!--
      Un único tabpanel cuyo id y aria-labelledby cambian con la selección activa,
      siguiendo el patrón de la APG: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
    -->
    <section
      :id="`${ID_BASE}-panel-${selectedLocality}`"
      role="tabpanel"
      :aria-labelledby="`${ID_BASE}-tab-${selectedLocality}`"
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
        @page-change="onPageChange"
      />
    </section>
  </div>
</template>
