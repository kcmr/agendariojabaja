<script lang="ts" setup>
import Button from "../ui/Button.vue";
import type { ButtonVariant } from "../../composables/useButtonClasses";
import Icon, { type IconName } from "../ui/Icon.vue";

interface NavItem {
  label: string;
  href: string;
  variant?: Extract<ButtonVariant, "text" | "brand">;
  icon?: IconName;
  analyticsEvent?: string;
  analyticsLocation?: string;
}

interface Brand {
  label: string;
  headline?: string;
  href: string;
  logoSrc?: string;
}

defineProps<{
  brand: Brand;
  links: NavItem[];
}>();
</script>

<template>
  <header class="bg-surface-card sticky top-0 z-1 shadow-sm">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3
        sm:px-6 sm:py-4 lg:px-8"
    >
      <div class="group flex min-w-0 shrink items-center gap-2 sm:gap-3">
        <a :href="brand.href" aria-hidden="true" tabindex="-1">
          <img
            :src="brand.logoSrc"
            alt=""
            class="h-10 w-auto shrink-0 sm:h-14"
          />
        </a>
        <a :href="brand.href" class="flex min-w-0 flex-col gap-1">
          <h1
            class="text-content-heading group-hover:text-content-brand text-xl
              leading-none font-bold tracking-tight transition-colors
              max-sm:text-lg"
          >
            {{ brand.label }}
          </h1>
          <p
            v-if="brand.headline"
            class="text-content-muted text-sm leading-none font-medium
              max-sm:hidden"
          >
            {{ brand.headline }}
          </p>
          <p class="sr-only">&ndash; Home</p>
        </a>
      </div>

      <nav aria-label="Principal" class="shrink-0">
        <ul class="flex items-center gap-2 sm:gap-4 md:gap-5">
          <li
            v-for="link in links"
            :key="link.label"
            :class="[
              'flex',
              link.variant === 'text' ? 'hidden sm:flex' : 'flex',
            ]"
            :variant="link.variant"
            :href="link.href"
          >
            <Button
              :variant="link.variant"
              :href="link.href"
              size="sm"
              class="whitespace-nowrap max-sm:px-3"
              :data-analytics-event="link.analyticsEvent"
              :data-analytics-location="link.analyticsLocation"
              :data-analytics-label="link.label"
            >
              <template v-if="link.icon" #icon-left>
                <Icon :name="link.icon" :size="16" />
              </template>
              {{ link.label }}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
