import type { Meta, StoryObj } from "@storybook/react";
import { GridPadding } from "../components/GridPadding";

const meta: Meta<typeof GridPadding> = {
  title: "GridPadding",
  component: GridPadding,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["pageMul", "paddingX", "paddingY", "cellPaddingX", "cellPaddingY"],
    },
  },
  argTypes: {
    pageMul: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },

    paddingX: {
      control: { type: "range", min: 1, max: 20, step: 1 },
    },

    paddingY: {
      control: { type: "range", min: 1, max: 20, step: 1 },
    },

    cellPaddingX: {
      control: { type: "range", min: 0, max: 50, step: 1 },
    },

    cellPaddingY: {
      control: { type: "range", min: 0, max: 50, step: 1 },
    },
  },
  args: {
    pageMul: 4,
    paddingX: 6,
    cellPaddingX: 0,
    cellPaddingY: 0,
  },
};

export default meta;
type Story = StoryObj<typeof GridPadding>;

export const Default: Story = {
  args: {
    pageMul: 4,
    paddingX: 8,
    paddingY: 10,
    cellPaddingX: 10,
    cellPaddingY: 8,
  },
};
