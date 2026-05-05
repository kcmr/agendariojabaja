<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Layout variant: horizontal (728×90) or vertical (300×250) */
    variant?: "horizontal" | "vertical";
    /**
     * Mode controls the slot usage:
     * - "sponsor" (default): shows a CTA button on hover for direct sponsorship
     * - "adsense": hides the button (programmatic ads must not have overlapping
     *   interactive elements per AdSense policy)
     */
    mode?: "sponsor" | "adsense";
  }>(),
  { variant: "horizontal", mode: "sponsor" }
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
      class="text-content-ad-label mb-2 text-xs font-medium tracking-widest
        uppercase"
    >
      Espacio Patrocinado
    </span>
    <span class="text-content-ad-body mb-3 text-sm font-medium">
      Publicidad — {{ variant === "horizontal" ? "728×90" : "300×250" }}
    </span>

    <!--
      In "adsense" mode this slot is intentionally empty.
      AdSense policy prohibits placing interactive elements (buttons, links)
      on top of ad units, as it could trigger accidental clicks.
      In "sponsor" mode a CTA to attract local sponsors is shown on hover.
    -->
    <slot v-if="mode === 'sponsor'" name="cta">
      <button
        type="button"
        class="border-border-strong bg-surface-card text-content-ad-cta
          hover:bg-surface-subtle focus-visible:ring-ring-brand flex
          items-center gap-2 rounded-md border px-4 py-1.5 text-sm font-semibold
          opacity-0 shadow-sm transition-opacity group-hover:opacity-100
          focus-visible:opacity-100 focus-visible:ring-2
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
    </slot>
  </aside>
</template>
