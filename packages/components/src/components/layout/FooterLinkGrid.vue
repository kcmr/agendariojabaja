<script lang="ts" setup>
import { useId } from "vue";
import Heading, { type HeadingLevel } from "../ui/Heading.vue";

export type FooterLinkGridLink = {
  label: string;
  href: string;
};

withDefaults(
  defineProps<{
    links: FooterLinkGridLink[];
    heading: string;
    headingLevel?: HeadingLevel;
  }>(),
  {
    headingLevel: 2,
  }
);

const headingId = useId();
</script>

<template>
  <footer
    v-if="links.length"
    class="bg-surface-card border-border-default border-t py-8"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav :aria-labelledby="headingId">
        <Heading
          :id="headingId"
          :level="headingLevel"
          variant="h6"
          class="text-content-heading mb-4 text-sm leading-none font-bold
            tracking-wide uppercase"
        >
          {{ heading }}
        </Heading>

        <ul
          class="grid list-none gap-3 p-0 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4"
        >
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="text-content-muted hover:text-content-brand
                focus-visible:ring-ring-brand rounded-sm text-sm font-medium
                transition-colors focus-visible:ring-2
                focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
