<script lang="ts" setup>
import { nextTick, ref, useId } from "vue";
import TabChip from "../ui/TabChip.vue";
import Heading, { type HeadingLevel } from "../ui/Heading.vue";

export type LocalitySelectorOption = {
  id: string;
  label: string;
  img: string;
};

const defaultIdBase = useId();

const props = withDefaults(
  defineProps<{
    /** Available locality options */
    localities: LocalitySelectorOption[];
    /** Selected locality id (use with v-model) */
    modelValue: string;
    /** Heading text above the selector */
    heading: string;
    /** Heading level for the selector */
    headingLevel?: HeadingLevel;
    /**
     * Base id used to generate stable tab and panel ids.
     * Each tab gets id="{idBase}-tab-{value}" so that the consumer can
     * associate an external tabpanel via aria-labelledby.
     * Defaults to a unique id generated per instance.
     */
    idBase?: string;
  }>(),
  { headingLevel: 2, idBase: undefined }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  select: [value: string];
}>();

const resolvedIdBase = () => props.idBase ?? defaultIdBase;

const tabId = (id: string) => `${resolvedIdBase()}-tab-${id}`;

const panelId = (id: string) => `${resolvedIdBase()}-panel-${id}`;

const headingId = () => `${resolvedIdBase()}-heading`;

const select = (value: string | number) => {
  const stringValue = String(value);
  emit("update:modelValue", stringValue);
  emit("select", stringValue);
};

const tabRefs = ref<Array<InstanceType<typeof TabChip> | null>>([]);

const selectAt = async (index: number) => {
  select(props.localities[index].id);
  await nextTick();
  tabRefs.value[index]?.$el.focus();
};

const selectByOffset = (offset: number) => {
  const currentIndex = props.localities.findIndex(
    (loc) => loc.id === props.modelValue
  );
  if (currentIndex === -1 || props.localities.length === 0) return;
  const nextIndex =
    (currentIndex + offset + props.localities.length) % props.localities.length;
  void selectAt(nextIndex);
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    selectByOffset(1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectByOffset(-1);
  } else if (event.key === "Home") {
    event.preventDefault();
    void selectAt(0);
  } else if (event.key === "End") {
    event.preventDefault();
    void selectAt(props.localities.length - 1);
  }
};
</script>

<template>
  <div class="py-6">
    <Heading :id="headingId()" :level="headingLevel" variant="h3" class="mb-4">
      {{ heading }}
    </Heading>
    <div
      role="tablist"
      :aria-labelledby="headingId()"
      class="-mx-1 -my-2 flex snap-x gap-4 overflow-x-auto px-1 py-2 pb-4"
      style="scrollbar-width: none"
      @keydown="onKeydown"
    >
      <TabChip
        v-for="locality in localities"
        :id="tabId(locality.id)"
        :key="locality.id"
        ref="tabRefs"
        :value="locality.id"
        :label="locality.label"
        :image-src="locality.img"
        :active="modelValue === locality.id"
        :controls="panelId(locality.id)"
        @select="select"
      />
    </div>
  </div>
</template>
