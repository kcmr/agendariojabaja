<script lang="ts" setup>
import { useId } from "vue";
import Button from "../ui/Button.vue";
import FormInput from "../ui/FormInput.vue";
import Heading, { type HeadingLevel } from "../ui/Heading.vue";
import Icon from "../ui/Icon.vue";

const defaultIdBase = useId();

const props = withDefaults(
  defineProps<{
    /** Section id used as an anchor target. */
    id?: string;
    /** Kit subscription endpoint. */
    action: string;
    /** Kit form id. */
    formId?: string;
    /** Kit form uid. */
    uid?: string;
    /** Heading displayed above the form. */
    heading?: string;
    /** Heading level for the newsletter heading. */
    headingLevel?: HeadingLevel;
    /** Supporting copy displayed above the form. */
    description?: string;
    /** Email input label. */
    emailLabel?: string;
    /** Submit button label. */
    submitLabel?: string;
    /** Small reassurance text below the form. */
    hint?: string;
    /** Opens the Kit submission result in a new tab/window. */
    target?: "_self" | "_blank";
    /** Visual placement of the section. */
    variant?: "footer" | "embedded";
  }>(),
  {
    id: "newsletter",
    formId: "9152132",
    uid: "f0a168168a",
    heading: "No te pierdas ningún plan",
    headingLevel: 2,
    description:
      "Recibe nuestra newsletter semanal con los mejores eventos de La Rioja Baja directamente en tu email.",
    emailLabel: "Correo electrónico",
    submitLabel: "Suscribirme",
    hint: "Gratis, sin spam y con baja en un clic cuando quieras.",
    target: "_blank",
    variant: "footer",
  }
);

const resolvedIdBase = () => `${props.id}-${defaultIdBase}`;
const headingId = () => `${resolvedIdBase()}-heading`;
const descriptionId = () => `${resolvedIdBase()}-description`;
const hintId = () => `${resolvedIdBase()}-hint`;
const emailId = () => `${resolvedIdBase()}-email`;
</script>

<template>
  <section
    :id="id"
    :class="[
      'bg-surface-card',
      variant === 'footer'
        ? 'border-border-default mt-12 border-t py-12'
        : 'py-4',
    ]"
    :aria-labelledby="headingId()"
  >
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <div
        class="bg-surface-brand-tint text-content-brand mb-4 inline-flex
          items-center justify-center rounded-full p-3"
        aria-hidden="true"
      >
        <Icon name="Mail" :size="24" />
      </div>

      <Heading
        :id="headingId()"
        :level="headingLevel"
        variant="h2"
        class="text-content-heading mb-3 text-2xl leading-tight font-bold"
      >
        {{ heading }}
      </Heading>

      <p :id="descriptionId()" class="text-content-body mx-auto mb-6 max-w-xl">
        {{ description }}
      </p>

      <form
        class="mx-auto flex max-w-lg flex-col gap-2 sm:flex-row"
        :action="action"
        method="post"
        data-format="inline"
        data-version="5"
        :data-sv-form="formId"
        :data-uid="uid"
        :aria-describedby="`${descriptionId()} ${hintId()}`"
        :target="target"
      >
        <div class="min-w-0 flex-1">
          <FormInput
            :id="emailId()"
            :label="emailLabel"
            label-variant="floating"
            input-size="lg"
            type="email"
            name="email_address"
            autocomplete="email"
            required
          />
        </div>

        <Button type="submit" class="sm:shrink-0">
          {{ submitLabel }}
        </Button>
      </form>

      <p :id="hintId()" class="text-content-muted mt-3 text-sm">
        {{ hint }}
      </p>
    </div>
  </section>
</template>
