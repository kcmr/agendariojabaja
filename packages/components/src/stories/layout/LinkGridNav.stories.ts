import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import LinkGridNav, {
  type LinkGridNavLink,
} from "../../components/layout/LinkGridNav.vue";

const LINKS = [
  {
    label: "Eventos en Calahorra",
    href: "/agenda/localidad/calahorra/",
  },
  {
    label: "Eventos en Arnedo",
    href: "/agenda/localidad/arnedo/",
  },
  {
    label: "Eventos en Alfaro",
    href: "/agenda/localidad/alfaro/",
  },
  {
    label: "Eventos en Rincón de Soto",
    href: "/agenda/localidad/rincon-de-soto/",
  },
] satisfies LinkGridNavLink[];

const meta = {
  component: LinkGridNav,
  tags: ["autodocs"],
  argTypes: {
    headingLevel: {
      control: "select",
      options: [2, 3, 4, 5, 6],
    },
  },
  args: {
    heading: "Explora planes por localidad",
    headingLevel: 2,
    links: LINKS,
  },
} satisfies Meta<typeof LinkGridNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", {
      name: "Explora planes por localidad",
      level: 2,
    });
    const nav = canvas.getByRole("navigation", {
      name: "Explora planes por localidad",
    });
    const calahorra = within(nav).getByRole("link", {
      name: "Eventos en Calahorra",
    });

    expect(heading).toBeInTheDocument();
    expect(calahorra).toHaveAttribute("href", "/agenda/localidad/calahorra/");
  },
};

export const CustomHeading: Story = {
  args: {
    heading: "Busca planes cerca de ti",
  },
};
