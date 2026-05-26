<script lang="ts" setup>
const props = defineProps<{
  /** Unique value identifying this tab */
  value: string | number;
  /** Display label */
  label: string;
  /** Optional URL. When present the tab is rendered as a real link. */
  href?: string;
  /** Whether this tab is currently active */
  active?: boolean;
  /** Visual variant inherited from parent Tabs */
  variant?: "segment" | "toggle";
  /** Optional id used to link the tab with its tabpanel */
  id?: string;
  /** Optional tabpanel id controlled by this tab */
  controls?: string;
}>();

const emit = defineEmits<{
  (e: "select", value: string | number): void;
}>();
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :id="id"
    :href="props.href"
    :type="props.href ? undefined : 'button'"
    :role="props.href ? undefined : 'tab'"
    :aria-controls="props.href ? undefined : controls"
    :aria-selected="props.href ? undefined : active"
    :aria-current="props.href && active ? 'page' : undefined"
    :tabindex="props.href ? undefined : active ? 0 : -1"
    :class="[
      `focus-visible:ring-ring-brand flex cursor-pointer items-center gap-2
      rounded-md px-4 py-2 text-sm font-bold transition-all focus-visible:ring-2
      focus-visible:ring-offset-2 focus-visible:outline-none`,
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
  </component>
</template>
