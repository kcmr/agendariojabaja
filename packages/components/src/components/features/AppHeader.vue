<script lang="ts" setup>
import Button from "../ui/Button.vue";
import type { ButtonVariant } from "../../composables/useButtonClasses";
import Icon, { type IconName } from "../ui/Icon.vue";

interface NavItem {
  label: string;
  href: string;
  variant?: Extract<ButtonVariant, "text" | "brand">;
  icon?: IconName;
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
      class="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6
        lg:px-8"
    >
      <div class="group flex h-10 shrink-0 items-center gap-2">
        <a :href="brand.href" aria-hidden="true" tabindex="-1">
          <img :src="brand.logoSrc" alt="" class="h-14 w-auto" />
        </a>
        <a :href="brand.href" class="flex flex-col gap-1">
          <h1
            class="text-content-heading group-hover:text-content-brand text-xl
              leading-none font-bold tracking-tight transition-colors"
          >
            {{ brand.label }}
          </h1>
          <p
            v-if="brand.headline"
            class="text-content-muted text-sm leading-none font-medium"
          >
            {{ brand.headline }}
          </p>
          <p class="sr-only">&ndash; Home</p>
        </a>
      </div>

      <nav>
        <ul class="flex items-center gap-5">
          <li
            v-for="link in links"
            :key="link.label"
            class="flex"
            :variant="link.variant"
            :href="link.href"
          >
            <Button :variant="link.variant" :href="link.href" size="sm">
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
