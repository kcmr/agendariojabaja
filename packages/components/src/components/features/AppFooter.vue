<script lang="ts" setup>
import LinkGridNav, { type LinkGridNavLink } from "../layout/LinkGridNav.vue";
import { type HeadingLevel } from "../ui/Heading.vue";
import Icon from "../ui/Icon.vue";

export type AppFooterLink = LinkGridNavLink;

withDefaults(
  defineProps<{
    links: AppFooterLink[];
    linksHeading?: string;
    linksHeadingLevel?: HeadingLevel;
    copyright?: string;
    legalHref?: string;
    developerHref?: string;
    developerLabel?: string;
    instagramHref?: string;
  }>(),
  {
    linksHeading: "Explora planes por localidad",
    linksHeadingLevel: 2,
    copyright: "© 2026 Agenda Rioja Baja.",
    legalHref: "/aviso-legal",
    developerHref: "https://kuscamara.dev",
    developerLabel: "kuscamara.dev",
    instagramHref: "https://instagram.com/agendariojabaja",
  }
);
</script>

<template>
  <footer class="bg-surface-card border-border-default border-t py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <LinkGridNav
        :links="links"
        :heading="linksHeading"
        :heading-level="linksHeadingLevel"
      />

      <div
        class="border-border-subtle mt-10 flex flex-col items-center
          justify-between gap-4 border-t pt-8 text-center md:flex-row
          md:text-left"
      >
        <div
          class="text-content-muted flex flex-col items-center gap-2 text-sm
            sm:flex-row sm:gap-4"
        >
          <p>{{ copyright }}</p>
          <span class="text-content-subtle hidden sm:inline" aria-hidden="true">
            |
          </span>
          <a
            :href="legalHref"
            class="hover:text-content-brand focus-visible:ring-ring-brand
              rounded-sm transition-colors focus-visible:ring-2
              focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Aviso Legal
          </a>
          <span class="text-content-subtle hidden sm:inline" aria-hidden="true">
            |
          </span>
          <p>
            Desarrollo web:
            <a
              :href="developerHref"
              class="hover:text-content-brand focus-visible:ring-ring-brand
                rounded-sm font-medium transition-colors focus-visible:ring-2
                focus-visible:ring-offset-2 focus-visible:outline-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ developerLabel }}
            </a>
          </p>
        </div>

        <a
          :href="instagramHref"
          class="text-content-subtle focus-visible:ring-ring-brand rounded-sm
            transition-colors hover:text-[#E1306C] focus-visible:ring-2
            focus-visible:ring-offset-2 focus-visible:outline-none"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Síguenos en Instagram"
          data-analytics-event="instagram_footer_click"
          data-analytics-location="footer"
        >
          <Icon name="Instagram" :size="22" />
        </a>
      </div>
    </div>
  </footer>
</template>
