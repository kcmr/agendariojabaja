<script lang="ts" setup>
import Button from "../ui/Button.vue";
import type { ButtonVariant } from "../../composables/useButtonClasses";
import type { IconName } from "../utils/Icon.vue";
import Icon from "../utils/Icon.vue";

interface NavItem {
  label: string;
  href: string;
  variant?: Extract<ButtonVariant, "text" | "brand">;
  icon?: IconName;
}

defineProps<{
  links: NavItem[];
}>();
</script>

<template>
  <header class="bg-surface-card sticky top-0 shadow-sm">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6
        lg:px-8"
    >
      <h1>App Header</h1>

      <nav>
        <ul class="flex items-center gap-5">
          <li
            v-for="link in links"
            :key="link.label"
            class="flex"
            :variant="link.variant"
            :href="link.href"
          >
            <Button :variant="link.variant" :href="link.href">
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
