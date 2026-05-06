<script lang="ts" setup>
import { MailIcon, MegaphoneIcon } from "lucide-vue-next";
import ButtonLink from "../ui/ButtonLink.vue";
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
          <li>
            <ButtonLink variant="ghost" href="/" class="px-0">
              <template #icon-left>
                <MegaphoneIcon :size="16" />
              </template>
              Patrocínanos
            </ButtonLink>
          </li>
          <li>
            <ButtonLink variant="ghost" href="/" class="px-0">
              <template #icon-left>
                <MailIcon :size="16" />
              </template>
              Suscríbete
            </ButtonLink>
          </li>
          <li>
            <ButtonLink variant="brand" href="/">Publicar evento</ButtonLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
