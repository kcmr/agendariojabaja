<script lang="ts" setup>
import { MailIcon, MegaphoneIcon } from "lucide-vue-next";
import Button from "../ui/Button.vue";
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
            <Button variant="ghost" href="/" class="px-0">
              <template #icon-left>
                <MegaphoneIcon :size="16" />
              </template>
              Patrocínanos
            </Button>
          </li>
          <li>
            <Button variant="ghost" href="/" class="px-0">
              <template #icon-left>
                <MailIcon :size="16" />
              </template>
              Suscríbete
            </Button>
          </li>
          <li>
            <Button variant="brand" href="/">Publicar evento</Button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
