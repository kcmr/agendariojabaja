<script lang="ts" setup>
import { useId } from "vue";
import TabChip from "../ui/TabChip.vue";
import Heading, { type HeadingLevel } from "../ui/Heading.vue";

export type LocalitySelectorOption = {
  id: string;
  label: string;
  img: string;
  href: string;
};

const defaultIdBase = useId();

const props = withDefaults(
  defineProps<{
    /** Available locality options */
    localities: LocalitySelectorOption[];
    /** Active locality id */
    activeId: string;
    /** Heading text above the selector */
    heading: string;
    /** Heading level for the selector */
    headingLevel?: HeadingLevel;
    /** Base id used to generate stable link ids. */
    idBase?: string;
  }>(),
  { headingLevel: 2, idBase: undefined }
);

const resolvedIdBase = () => props.idBase ?? defaultIdBase;

const linkId = (id: string) => `${resolvedIdBase()}-link-${id}`;

const headingId = () => `${resolvedIdBase()}-heading`;
</script>

<template>
  <nav class="py-6" :aria-labelledby="headingId()">
    <Heading :id="headingId()" :level="headingLevel" variant="h3" class="mb-4">
      {{ heading }}
    </Heading>
    <ul
      class="m-0 -my-2 flex snap-x scroll-px-2 list-none gap-4 overflow-x-auto
        px-2 py-2 pb-4 md:-mx-1 md:scroll-px-1 md:px-1"
      style="scrollbar-width: none"
    >
      <li v-for="locality in localities" :key="locality.id" class="shrink-0">
        <TabChip
          :id="linkId(locality.id)"
          :label="locality.label"
          :href="locality.href"
          :image-src="locality.img"
          :active="activeId === locality.id"
        />
      </li>
    </ul>
  </nav>
</template>
