import type { Meta, StoryObj } from "@storybook/vue3-vite";
import FormInput from "../../components/ui/FormInput.vue";
import FormTextarea from "../../components/ui/FormTextarea.vue";

const meta = {
  component: FormInput,
  tags: ["autodocs"],
  argTypes: {
    labelVariant: {
      control: "select",
      options: ["stacked", "floating"],
    },
    inputSize: {
      control: "select",
      options: ["sm", "lg"],
    },
    type: {
      control: "select",
      options: ["date", "email", "text", "url"],
    },
  },
  args: {
    label: "Nombre del evento",
    labelVariant: "stacked",
    inputSize: "sm",
    type: "text",
    required: true,
  },
  render: (args) => ({
    components: { FormInput },
    setup: () => ({ args }),
    template: '<FormInput v-bind="args" />',
  }),
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};

export const StackedWithHint: Story = {
  args: {
    label: "URL de la imagen",
    type: "url",
    required: false,
    placeholder: "https://...",
    hint: "Enlace directo a la imagen o cartel del evento.",
  },
};

export const StackedWithError: Story = {
  args: {
    error: "El nombre del evento es obligatorio.",
  },
};

export const WithPrefix: Story = {
  args: {
    label: "Cuenta de Instagram",
    required: false,
    placeholder: "agendariojabaja",
  },
  render: (args) => ({
    components: { FormInput },
    setup: () => ({ args }),
    template: `
      <FormInput v-bind="args">
        <template #prefix>@</template>
      </FormInput>
    `,
  }),
};

export const FloatingNewsletter: Story = {
  args: {
    label: "Correo electrónico",
    labelVariant: "floating",
    inputSize: "lg",
    type: "email",
    required: true,
  },
};

export const Textarea: Story = {
  render: () => ({
    components: { FormTextarea },
    template: `
      <FormTextarea
        label="Descripción"
        required
        hint="Incluye horarios, ubicación y cualquier detalle útil."
      />
    `,
  }),
};
