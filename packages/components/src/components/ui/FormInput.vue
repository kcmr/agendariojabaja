<script lang="ts" setup>
import { computed, useAttrs, useId } from "vue";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });

type InputType = "date" | "email" | "text" | "url";
type LabelVariant = "stacked" | "floating";
type InputSize = "sm" | "lg";

const props = withDefaults(
  defineProps<{
    id?: string;
    label: string;
    type?: InputType;
    name?: string;
    modelValue?: string;
    hint?: string;
    error?: string;
    labelVariant?: LabelVariant;
    inputSize?: InputSize;
    required?: boolean;
    autocomplete?: string;
    autocapitalize?: string;
    autocorrect?: string;
    placeholder?: string;
    spellcheck?: boolean | "true" | "false";
  }>(),
  {
    id: undefined,
    type: "text",
    name: undefined,
    modelValue: undefined,
    hint: undefined,
    error: undefined,
    labelVariant: "stacked",
    inputSize: "sm",
    required: false,
    autocomplete: undefined,
    autocapitalize: undefined,
    autocorrect: undefined,
    placeholder: undefined,
    spellcheck: undefined,
  }
);

const attrs = useAttrs();
const fallbackId = useId();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const inputId = computed(() => props.id ?? fallbackId);
const hintId = computed(() => `${inputId.value}-hint`);
const errorId = computed(() => `${inputId.value}-error`);
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

const sizeClasses: Record<InputSize, string> = {
  sm: "h-10 px-3 text-sm",
  lg: "h-12 px-4 pt-5 pb-2 text-base",
};

const baseInputClasses = computed(() =>
  twMerge(
    `border-border-strong text-content-heading bg-surface-card
    placeholder:text-content-subtle focus:ring-ring-brand w-full rounded-lg
    border focus:border-transparent focus:ring-2 focus:outline-none`,
    sizeClasses[props.inputSize],
    hasError.value &&
      "border-border-error focus:border-border-error focus:ring-ring-error",
    attrs.class as string
  )
);

const prefixedInputClasses = computed(() =>
  twMerge(
    `text-content-heading bg-surface-card placeholder:text-content-subtle w-full
    border-0 focus:ring-0 focus:outline-none`,
    sizeClasses[props.inputSize],
    attrs.class as string
  )
);

const prefixWrapperClasses = computed(() =>
  twMerge(
    `border-border-strong bg-surface-card focus-within:ring-ring-brand flex
    overflow-hidden rounded-lg border focus-within:border-transparent
    focus-within:ring-2`,
    hasError.value &&
      "border-border-error focus-within:border-border-error focus-within:ring-ring-error"
  )
);

const floatingLabelClasses = computed(() =>
  twMerge(
    `text-content-muted pointer-events-none absolute top-1/2 left-4 z-1
    origin-left -translate-y-1/2 text-base transition-all duration-150
    ease-out`,
    hasError.value && "text-content-error"
  )
);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div
    v-if="labelVariant === 'floating'"
    class="group has-focus-within:[&_label]:text-content-muted relative
      has-focus-within:[&_label]:top-2 has-focus-within:[&_label]:translate-y-0
      has-focus-within:[&_label]:text-xs has-focus-within:[&_label]:font-medium
      has-[input:not(:placeholder-shown)]:[&_label]:top-2
      has-[input:not(:placeholder-shown)]:[&_label]:translate-y-0
      has-[input:not(:placeholder-shown)]:[&_label]:text-xs
      has-[input:not(:placeholder-shown)]:[&_label]:font-medium"
  >
    <label :for="inputId" :class="floatingLabelClasses">
      {{ label }}
    </label>
    <input
      v-bind="{ ...attrs, class: undefined }"
      :id="inputId"
      :class="baseInputClasses"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder ?? ' '"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :required="required"
      :aria-required="required || undefined"
      :aria-invalid="hasError || undefined"
      :aria-describedby="describedBy || undefined"
      @input="onInput"
    />
    <p v-if="hint" :id="hintId" class="text-content-muted mt-2 text-sm">
      {{ hint }}
    </p>
    <p v-if="error" :id="errorId" class="text-content-error mt-2 text-sm">
      {{ error }}
    </p>
  </div>

  <div v-else class="flex flex-col gap-1.5">
    <label
      :for="inputId"
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

    <div v-if="$slots.prefix" :class="prefixWrapperClasses">
      <span
        class="bg-surface-muted text-content-muted border-border-strong flex
          items-center border-r px-3 text-sm font-semibold select-none"
        aria-hidden="true"
      >
        <slot name="prefix" />
      </span>
      <input
        v-bind="{ ...attrs, class: undefined }"
        :id="inputId"
        :class="prefixedInputClasses"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :required="required"
        :aria-required="required || undefined"
        :aria-invalid="hasError || undefined"
        :aria-describedby="describedBy || undefined"
        @input="onInput"
      />
    </div>

    <input
      v-else
      v-bind="{ ...attrs, class: undefined }"
      :id="inputId"
      :class="baseInputClasses"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
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
