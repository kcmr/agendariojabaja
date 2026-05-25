import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AdSpace from "../../components/features/AdSpace.vue";
import { expect, fn, waitFor, within } from "storybook/test";

const meta = {
  component: AdSpace,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["horizontal", "vertical"] },
    mode: { control: "radio", options: ["sponsor", "adsense"] },
  },
  args: { variant: "horizontal", mode: "sponsor" },
} satisfies Meta<typeof AdSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default sponsor mode – CTA button appears on hover */
export const Sponsor: Story = {
  args: { variant: "horizontal", mode: "sponsor" },
};

export const SponsorVertical: Story = {
  args: { variant: "vertical", mode: "sponsor" },
};

/**
 * AdSense mode – no interactive element on top of the ad slot.
 * Use this when the space will be filled by a programmatic ad network.
 * Placing buttons over AdSense units violates their publisher policies.
 */
export const AdSense: Story = {
  args: { variant: "horizontal", mode: "adsense" },
};

export const AdSenseVertical: Story = {
  args: { variant: "vertical", mode: "adsense" },
};

export const WithClickEvent: Story = {
  args: {
    variant: "horizontal",
    mode: "sponsor",
    onClickSponsor: fn(),
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button");
    await userEvent.click(btn);
    expect(args.onClickSponsor).toHaveBeenCalled();
  },
};

export const ButtonVisibilityOnFocus: Story = {
  args: { variant: "horizontal", mode: "sponsor" },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button");
    expect(btn).not.toBeVisible();
    await userEvent.tab();
    await waitFor(() => expect(btn).toBeVisible());
  },
};
