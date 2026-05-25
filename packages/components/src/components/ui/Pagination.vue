<script lang="ts" setup>
import Button from "./Button.vue";
import Icon from "./Icon.vue";

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
    <Button
      type="button"
      variant="outline"
      size="md"
      class="p-2"
      :disabled="currentPage === 1"
      :aria-disabled="currentPage === 1"
      aria-label="Página anterior"
      @click="prev"
    >
      <Icon name="ChevronLeft" :size="20" />
    </Button>

    <span
      aria-current="page"
      aria-live="polite"
      class="text-content-muted text-sm font-medium"
    >
      Página {{ currentPage }} de {{ totalPages }}
    </span>

    <Button
      type="button"
      variant="outline"
      size="md"
      class="p-2"
      :disabled="currentPage === totalPages"
      :aria-disabled="currentPage === totalPages"
      aria-label="Página siguiente"
      @click="next"
    >
      <Icon name="ChevronRight" :size="20" />
    </Button>
  </nav>
</template>
