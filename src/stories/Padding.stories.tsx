import type { Meta, StoryObj } from "@storybook/react";
import { PaddingGrid } from "../components/PaddingGrid";

const meta: Meta<typeof PaddingGrid> = {
  title: "Padding",
  component: PaddingGrid,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["pageMul", "pMul", "cMul"],
    },
  },
  argTypes: {
    pageMul: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },

    pMul: {
      control: { type: "range", min: 0.5, max: 10, step: 0.5 },
    },

    cMul: {
      control: { type: "range", min: 0.5, max: 10, step: 0.5 },
    },
  },
  args: {
    pageMul: 4,
    pMul: 2,
    cMul: 2,
  },
};

export default meta;
type Story = StoryObj<typeof PaddingGrid>;

export const Default: Story = {
  args: {
    pageMul: 4,
    pMul: 2,
    cMul: 2,
  },
};
