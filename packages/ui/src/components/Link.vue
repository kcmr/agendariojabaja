<script lang="ts" setup>
const { href = "" } = defineProps<{ href: string }>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const onClick = () => {
  emit("click");
};
</script>

<template>
  <a
    :href="href"
    @click="onClick"
    class="font-semibold text-blue-500 underline hover:text-blue-800"
    ><slot
  /></a>
</template>
