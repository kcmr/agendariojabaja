<script lang="ts" setup>
import Button from "./Button.vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** URL for the previous page. Required when the previous control is enabled. */
  previousHref?: string;
  /** URL for the next page. Required when the next control is enabled. */
  nextHref?: string;
}>();
</script>

<template>
  <nav
    aria-label="Paginación"
    class="mt-10 flex items-center justify-center gap-4"
  >
    <Button
      :href="props.currentPage === 1 ? undefined : props.previousHref"
      variant="outline"
      size="md"
      class="p-2"
      :disabled="currentPage === 1"
      :aria-disabled="currentPage === 1"
      aria-label="Página anterior"
      data-agenda-focus-id="agenda-pagination-status"
    >
      <Icon name="ChevronLeft" :size="20" />
    </Button>

    <span
      id="agenda-pagination-status"
      tabindex="-1"
      aria-current="page"
      aria-live="polite"
      class="text-content-muted focus-visible:ring-ring-brand rounded-md text-sm
        font-medium focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:outline-none"
    >
      Página {{ currentPage }} de {{ totalPages }}
    </span>

    <Button
      :href="
        props.currentPage === props.totalPages ? undefined : props.nextHref
      "
      variant="outline"
      size="md"
      class="p-2"
      :disabled="currentPage === totalPages"
      :aria-disabled="currentPage === totalPages"
      aria-label="Página siguiente"
      data-agenda-focus-id="agenda-pagination-status"
    >
      <Icon name="ChevronRight" :size="20" />
    </Button>
  </nav>
</template>
