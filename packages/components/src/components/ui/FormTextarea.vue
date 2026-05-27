<script lang="ts" setup>
import { computed, useAttrs, useId } from "vue";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    id?: string;
    label: string;
    name?: string;
    modelValue?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    rows?: number;
    placeholder?: string;
  }>(),
  {
    id: undefined,
    name: undefined,
    modelValue: undefined,
    hint: undefined,
    error: undefined,
    required: false,
    rows: 4,
    placeholder: undefined,
  }
);

const attrs = useAttrs();
const fallbackId = useId();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const textareaId = computed(() => props.id ?? fallbackId);
const hintId = computed(() => `${textareaId.value}-hint`);
const errorId = computed(() => `${textareaId.value}-error`);
const hasError = computed(() => Boolean(props.error));
const describedBy = computed(() =>
  [
    attrs["aria-describedby"],
    props.hint ? hintId.value : undefined,
    props.error ? errorId.value : undefined,
  ]
    .filter(Boolean)
    .join(" ")
);

const textareaClasses = computed(() =>
  twMerge(
    `border-border-strong text-content-heading bg-surface-card
    placeholder:text-content-subtle focus:ring-ring-brand min-h-28 w-full
    resize-y rounded-lg border px-3 py-2 text-sm leading-6 focus:border-transparent
    focus:ring-2 focus:outline-none`,
    hasError.value &&
      "border-border-error focus:border-border-error focus:ring-ring-error",
    attrs.class as string
  )
);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
};
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="textareaId"
      class="text-content-heading text-sm leading-none font-semibold"
    >
      {{ label
      }}<span v-if="required" class="text-content-error" aria-hidden="true"
        >*</span
      >
    </label>
    <p v-if="hint" :id="hintId" class="text-content-muted text-sm leading-5">
      {{ hint }}
    </p>
    <textarea
      v-bind="{ ...attrs, class: undefined }"
      :id="textareaId"
      :class="textareaClasses"
      :name="name"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :aria-required="required || undefined"
      :aria-invalid="hasError || undefined"
      :aria-describedby="describedBy || undefined"
      @input="onInput"
    />
    <p v-if="error" :id="errorId" class="text-content-error text-sm leading-5">
      {{ error }}
    </p>
  </div>
</template>
