<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Layout variant: horizontal (728×90) or vertical (300×250) */
    variant?: "horizontal" | "vertical";
  }>(),
  { variant: "horizontal" }
);
</script>

<template>
  <aside
    aria-label="Espacio publicitario"
    :class="[
      `group relative my-6 flex w-full flex-col items-center justify-center
      overflow-hidden rounded-xl border p-4 shadow-sm`,
      'border-border-ad bg-surface-ad',
      variant === 'horizontal' ? 'h-32' : 'h-64',
    ]"
  >
    <span
      class="mb-2 text-xs font-medium tracking-widest
        text-content-ad-label uppercase"
    >
      Espacio Patrocinado
    </span>
    <span class="mb-3 text-sm font-medium text-content-ad-body">
      Publicidad — {{ variant === "horizontal" ? "728×90" : "300×250" }}
    </span>
    <button
      type="button"
      class="flex items-center gap-2 rounded-md border
        border-border-strong bg-surface-card px-4 py-1.5
        text-sm font-semibold text-content-ad-cta opacity-0 shadow-sm
        transition-opacity group-hover:opacity-100
        hover:bg-surface-subtle focus-visible:opacity-100
        focus-visible:ring-2 focus-visible:ring-ring-brand
        focus-visible:outline-none"
    >
      <!-- Megaphone icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m3 11 19-9-9 19-2-8-8-2z" />
      </svg>
      Anúnciate aquí
    </button>
  </aside>
</template>
