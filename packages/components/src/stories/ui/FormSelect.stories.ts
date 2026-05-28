import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import FormSelect, {
  type FormSelectOption,
} from "../../components/ui/FormSelect.vue";

const LOCALITIES = [
  { value: "all", label: "Toda La Rioja Baja" },
  { value: "calahorra", label: "Calahorra" },
  { value: "arnedo", label: "Arnedo" },
  { value: "alfaro", label: "Alfaro" },
] satisfies FormSelectOption[];

const meta = {
  component: FormSelect,
  tags: ["autodocs"],
  args: {
    label: "¿Dónde buscas planes?",
    modelValue: "all",
    options: LOCALITIES,
    icon: "MapPin",
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText("¿Dónde buscas planes?");

    expect(select).toHaveValue("all");
    expect(canvas.getByRole("option", { name: "Calahorra" })).toHaveValue(
      "calahorra"
    );
  },
};

export const WithHint: Story = {
  args: {
    hint: "Filtra los eventos por municipio.",
  },
};

export const WithError: Story = {
  args: {
    error: "Selecciona una localidad válida.",
  },
};
