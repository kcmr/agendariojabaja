<script lang="ts" setup>
import { computed, useAttrs, useId } from "vue";
import { twMerge } from "tailwind-merge";
import Icon, { type IconName } from "./Icon.vue";

defineOptions({ inheritAttrs: false });

type SelectSize = "sm" | "lg" | "xl";
type LabelVariant = "stacked" | "hero";

export type FormSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    id?: string;
    label: string;
    name?: string;
    modelValue?: string;
    options: FormSelectOption[];
    hint?: string;
    error?: string;
    selectSize?: SelectSize;
    labelVariant?: LabelVariant;
    required?: boolean;
    icon?: IconName;
  }>(),
  {
    id: undefined,
    name: undefined,
    modelValue: undefined,
    hint: undefined,
    error: undefined,
    selectSize: "sm",
    labelVariant: "stacked",
    required: false,
    icon: undefined,
  }
);

const attrs = useAttrs();
const fallbackId = useId();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const selectId = computed(() => props.id ?? fallbackId);
const hintId = computed(() => `${selectId.value}-hint`);
const errorId = computed(() => `${selectId.value}-error`);
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

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-10 py-2 text-sm",
  lg: "h-12 py-3 text-base",
  xl: "h-14 py-3.5 text-base",
};

const selectClasses = computed(() =>
  twMerge(
    `border-border-strong text-content-heading bg-surface-card
    hover:border-border-strong focus:ring-ring-brand w-full cursor-pointer
    appearance-none rounded-lg border pr-10 font-semibold shadow-sm
    transition-all focus:border-transparent focus:ring-2 focus:outline-none`,
    props.icon ? "pl-12" : "pl-3",
    props.selectSize === "xl" && "rounded-2xl border-2 shadow-xs",
    sizeClasses[props.selectSize],
    hasError.value &&
      "border-border-error focus:border-border-error focus:ring-ring-error",
    attrs.class as string
  )
);

const labelClasses = computed(() =>
  twMerge(
    "text-content-heading leading-none font-semibold",
    props.labelVariant === "hero"
      ? `mb-5 text-left text-xl font-extrabold tracking-normal
        whitespace-nowrap sm:text-center sm:text-3xl`
      : "text-sm"
  )
);

const onChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLSelectElement).value);
};
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="selectId" :class="labelClasses">
      {{ label
      }}<span v-if="required" class="text-content-error" aria-hidden="true"
        >*</span
      >
    </label>

    <p v-if="hint" :id="hintId" class="text-content-muted text-sm leading-5">
      {{ hint }}
    </p>

    <div class="group relative">
      <span
        v-if="icon"
        class="text-content-subtle group-hover:text-content-brand
          group-focus-within:text-content-brand pointer-events-none absolute
          inset-y-0 left-0 flex items-center pl-4 transition-colors"
        aria-hidden="true"
      >
        <Icon :name="icon" :size="20" />
      </span>

      <select
        v-bind="{ ...attrs, class: undefined }"
        :id="selectId"
        :class="selectClasses"
        :name="name"
        :value="modelValue"
        :required="required"
        :aria-required="required || undefined"
        :aria-invalid="hasError || undefined"
        :aria-describedby="describedBy || undefined"
        @change="onChange"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :selected="option.value === modelValue"
        >
          {{ option.label }}
        </option>
      </select>

      <span
        class="text-content-muted pointer-events-none absolute inset-y-0 right-0
          flex items-center pr-3"
        aria-hidden="true"
      >
        <Icon name="ChevronDown" :size="20" />
      </span>
    </div>

    <p v-if="error" :id="errorId" class="text-content-error text-sm leading-5">
      {{ error }}
    </p>
  </div>
</template>
