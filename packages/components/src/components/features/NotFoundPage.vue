<script lang="ts" setup>
import { computed, useId } from "vue";
import Button from "../ui/Button.vue";
import Heading, { type HeadingLevel } from "../ui/Heading.vue";
import Icon from "../ui/Icon.vue";

const defaultIdBase = useId();

const props = withDefaults(
  defineProps<{
    /** URL used by the primary action. */
    homeHref?: string;
    /** Accessible heading level for the visible 404 heading. */
    headingLevel?: HeadingLevel;
    /** Supporting heading displayed below the code. */
    title?: string;
    /** Body copy explaining the missing route. */
    description?: string;
    /** Primary action label. */
    actionLabel?: string;
  }>(),
  {
    homeHref: "/",
    headingLevel: 1,
    title: "¡Uy! Parece que te has salido de la ruta.",
    description:
      "El plan o evento que estás buscando no existe, ha caducado o ha cambiado de enlace. Vuelve a la agenda para descubrir qué hacer hoy en La Rioja Baja.",
    actionLabel: "Volver a la agenda",
  }
);

const headingId = `${defaultIdBase}-not-found-heading`;
const titleId = `${defaultIdBase}-not-found-title`;
const titleLevel = computed<HeadingLevel>(
  () => Math.min(props.headingLevel + 1, 6) as HeadingLevel
);
</script>

<template>
  <section
    class="bg-surface-card border-border-subtle my-8 flex min-h-[60vh] flex-col
      items-center justify-center rounded-4xl border px-4 py-16 text-center
      shadow-sm sm:py-24"
    :aria-labelledby="headingId"
    :aria-describedby="titleId"
  >
    <div class="relative mb-8" aria-hidden="true">
      <div
        class="bg-surface-brand-tint absolute inset-0 rounded-full opacity-60
          blur-3xl"
      />
      <div
        class="bg-surface-card border-border-subtle text-content-brand relative
          z-10 rounded-full border p-6 shadow-sm"
      >
        <Icon name="MapPinOff" :size="56" />
      </div>
    </div>

    <Heading
      :id="headingId"
      :level="headingLevel"
      variant="h1"
      class="mb-4 text-7xl leading-none font-extrabold tracking-normal
        sm:text-9xl"
    >
      4<span class="text-content-brand">0</span>4
    </Heading>

    <Heading
      :id="titleId"
      :level="titleLevel"
      variant="h2"
      class="text-content-heading mb-4 text-2xl leading-tight font-bold
        sm:text-3xl"
    >
      {{ title }}
    </Heading>

    <p class="text-content-muted mx-auto mb-10 max-w-lg text-lg">
      {{ description }}
    </p>

    <Button :href="homeHref" size="lg">
      <template #icon-left>
        <Icon name="Home" :size="20" />
      </template>
      {{ actionLabel }}
    </Button>
  </section>
</template>
