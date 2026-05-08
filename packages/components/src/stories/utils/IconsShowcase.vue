<script setup lang="ts">
import { ref } from "vue";
import { Copy, Check } from "lucide-vue-next";
import Icon, { type IconName } from "../../components/ui/Icon.vue";

const copiedIcon = ref<IconName | null>(null);

const iconNames: IconName[] = [
  "Calendar",
  "MapPin",
  "Search",
  "ChevronLeft",
  "ChevronRight",
  "Mail",
  "ExternalLink",
  "Ticket",
  "Clock",
  "Megaphone",
];

const copyToClipboard = (name: IconName, event: MouseEvent) => {
  const target = event.target as HTMLInputElement;
  target.select();
  navigator.clipboard.writeText(name);
  copiedIcon.value = name;
  setTimeout(() => {
    if (copiedIcon.value === name) copiedIcon.value = null;
  }, 2000);
};
</script>

<template>
  <ul
    class="m-0 grid list-none grid-cols-3 gap-4 p-0 sm:grid-cols-4
      md:grid-cols-6"
  >
    <li
      v-for="name in iconNames"
      :key="name"
      class="flex flex-col items-center gap-2 rounded-xl border border-gray-200
        bg-white p-4 text-center shadow-sm"
    >
      <Icon :name="name" :size="24" />
      <div class="group relative mt-2 flex w-full items-center">
        <input
          class="w-full cursor-pointer rounded border border-gray-100 bg-gray-50
            py-1 pr-7 pl-2 text-center text-[10px] text-gray-600
            transition-colors outline-none hover:bg-gray-200
            focus:border-blue-300 focus:ring-1 focus:ring-blue-300 sm:text-xs"
          readonly
          :value="name"
          title="Click to copy"
          @click="copyToClipboard(name, $event)"
        />
        <component
          :is="copiedIcon === name ? Check : Copy"
          :size="14"
          :class="[
            'pointer-events-none absolute right-2 transition-colors',
            copiedIcon === name
              ? 'text-green-600'
              : 'text-gray-400 group-hover:text-gray-600',
          ]"
        />
      </div>
    </li>
  </ul>
</template>
