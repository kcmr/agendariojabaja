<script lang="ts" setup>
const props = defineProps<{
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const prev = () => {
  if (props.currentPage > 1) emit("pageChange", props.currentPage - 1);
};

const next = () => {
  if (props.currentPage < props.totalPages)
    emit("pageChange", props.currentPage + 1);
};
</script>

<template>
  <nav
    aria-label="Paginación"
    class="mt-10 flex items-center justify-center gap-4"
  >
    <button
      type="button"
      :disabled="currentPage === 1"
      :aria-disabled="currentPage === 1"
      aria-label="Página anterior"
      class="rounded-lg border border-border-strong p-2
        transition-colors hover:bg-surface-subtle
        disabled:cursor-not-allowed disabled:opacity-50"
      @click="prev"
    >
      <!-- ChevronLeft -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <span
      aria-current="page"
      aria-live="polite"
      class="text-sm font-medium text-content-muted"
    >
      Página {{ currentPage }} de {{ totalPages }}
    </span>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      :aria-disabled="currentPage === totalPages"
      aria-label="Página siguiente"
      class="rounded-lg border border-border-strong p-2
        transition-colors hover:bg-surface-subtle
        disabled:cursor-not-allowed disabled:opacity-50"
      @click="next"
    >
      <!-- ChevronRight -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </nav>
</template>
