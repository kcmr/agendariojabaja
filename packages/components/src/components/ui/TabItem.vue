<script lang="ts" setup>
defineProps<{
  /** Unique value identifying this tab */
  value: string | number;
  /** Display label */
  label: string;
  /** Whether this tab is currently active */
  active?: boolean;
  /** Visual variant inherited from parent Tabs */
  variant?: "segment" | "toggle";
}>();

const emit = defineEmits<{
  (e: "select", value: string | number): void;
}>();
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="active"
    :tabindex="active ? 0 : -1"
    :class="[
      `flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm
      font-bold transition-all`,
      variant === 'toggle'
        ? active
          ? 'bg-surface-brand text-content-on-brand'
          : 'text-content-muted hover:text-content-body'
        : active
          ? 'bg-surface-card text-content-heading shadow-sm'
          : 'text-content-muted hover:text-content-body',
    ]"
    @click="emit('select', value)"
  >
    <slot name="icon" />
    {{ label }}
  </button>
</template>
