<script lang="ts" setup>
import Icon from "../ui/Icon.vue";
import Button from "../ui/Button.vue";

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

defineEmits<{
  clickSponsor: [payload: MouseEvent];
}>();
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
      <Button
        variant="outline"
        class="bg-surface-card text-content-ad-cta rounded-md py-1.5 opacity-0
          shadow-sm transition-opacity group-hover:opacity-100 focus:opacity-100
          focus-visible:opacity-100"
        @click="$emit('clickSponsor', $event)"
      >
        <Icon name="Megaphone" :size="14" />
        Anúnciate aquí
      </Button>
    </slot>
  </aside>
</template>
