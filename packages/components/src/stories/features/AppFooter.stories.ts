import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";
import AppFooter, {
  type AppFooterLink,
} from "../../components/features/AppFooter.vue";

const LINKS = [
  {
    label: "Eventos en Calahorra",
    href: "/agenda/proximos/localidad/calahorra/",
  },
  {
    label: "Eventos en Arnedo",
    href: "/agenda/proximos/localidad/arnedo/",
  },
  {
    label: "Eventos en Alfaro",
    href: "/agenda/proximos/localidad/alfaro/",
  },
  {
    label: "Eventos en Autol",
    href: "/agenda/proximos/localidad/autol/",
  },
  {
    label: "Eventos en Pradejón",
    href: "/agenda/proximos/localidad/pradejon/",
  },
  {
    label: "Eventos en Rincón de Soto",
    href: "/agenda/proximos/localidad/rincon-de-soto/",
  },
] satisfies AppFooterLink[];

const meta = {
  component: AppFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    linksHeadingLevel: {
      control: "select",
      options: [2, 3, 4, 5, 6],
    },
  },
  args: {
    links: LINKS,
  },
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const footer = canvasElement.querySelector("footer");
    const nav = canvas.getByRole("navigation", {
      name: "Explora planes por localidad",
    });
    const legalLink = canvas.getByRole("link", { name: "Aviso Legal" });
    const developerLink = canvas.getByRole("link", { name: "kuscamara.dev" });
    const instagramLink = canvas.getByRole("link", {
      name: "Visita nuestro perfil de Instagram",
    });

    expect(footer).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: "Eventos en Calahorra" })
    ).toHaveAttribute("href", "/agenda/proximos/localidad/calahorra/");
    expect(legalLink).toHaveAttribute("href", "/aviso-legal");
    expect(developerLink).toHaveAttribute("href", "https://kuscamara.dev");
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://instagram.com/agendariojabaja"
    );
  },
};

export const CustomLegalLinks: Story = {
  args: {
    copyright: "© 2026 Agenda Rioja Baja.",
    legalHref: "/legal",
    developerHref: "https://example.com",
    developerLabel: "example.com",
    instagramHref: "https://instagram.com/agendariojabaja",
  },
};
