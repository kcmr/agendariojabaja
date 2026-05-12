<script lang="ts" setup>
import { computed, ref } from "vue";
import LocalitySelector, { type LocalitySelectorOption } from "@repo/components/features/LocalitySelector.vue";

const LOCALITIES: LocalitySelectorOption[] = [
  {
    id: "all",
    label: "Toda La Rioja Baja",
    img: "https://images.unsplash.com/photo-1660903293997-efd8ee1abf9a?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "calahorra",
    label: "Calahorra",
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "arnedo",
    label: "Arnedo",
    img: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "alfaro",
    label: "Alfaro",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "cervera",
    label: "Cervera",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

const EVENTS = [
  { id: 1, title: "Cata de Vinos y Maridaje", locality: "calahorra", date: "24 abr", category: "Gastronomía" },
  { id: 2, title: "Concierto Acústico en la Plaza", locality: "arnedo", date: "25 abr", category: "Música" },
  { id: 3, title: "Mercado de Artesanía Local", locality: "alfaro", date: "26 abr", category: "Mercados" },
  { id: 4, title: "Ruta de Senderismo: Miradores", locality: "cervera", date: "26 abr", category: "Naturaleza" },
  { id: 5, title: "Exposición de Calzado Histórico", locality: "arnedo", date: "28 abr", category: "Cultura" },
  { id: 6, title: "Fiestas de la Juventud", locality: "cervera", date: "1 may", category: "Fiestas" },
];

const ID_BASE = "locality";

const selectedLocality = ref("all");

const filteredEvents = computed(() =>
  selectedLocality.value === "all"
    ? EVENTS
    : EVENTS.filter((e) => e.locality === selectedLocality.value)
);
</script>

<template>
  <div>
    <LocalitySelector
      :id-base="ID_BASE"
      heading="¿Dónde buscas planes?"
      :localities="LOCALITIES"
      v-model="selectedLocality"
    />

    <!--
      Un único tabpanel cuyo id y aria-labelledby cambian con la selección activa,
      siguiendo el patrón de la APG: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
    -->
    <section
      :id="`${ID_BASE}-panel-${selectedLocality}`"
      role="tabpanel"
      :aria-labelledby="`${ID_BASE}-tab-${selectedLocality}`"
    >
      <ul v-if="filteredEvents.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="event in filteredEvents"
          :key="event.id"
          class="bg-surface-card border-border-default rounded-xl border p-4 shadow-sm"
        >
          <span class="text-content-category bg-surface-category-tint border-border-category-tint mb-2 inline-block rounded-full border px-2 py-0.5 text-xs font-semibold">
            {{ event.category }}
          </span>
          <p class="text-content-heading font-semibold">{{ event.title }}</p>
          <p class="text-content-muted mt-1 text-sm">{{ event.date }}</p>
        </li>
      </ul>
      <p v-else class="text-content-muted py-8 text-center text-sm">
        No hay eventos disponibles en esta localidad.
      </p>
    </section>
  </div>
</template>
