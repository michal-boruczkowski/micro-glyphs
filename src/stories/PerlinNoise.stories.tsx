import type { Meta, StoryObj } from "@storybook/react";
import { PerlinNoiseGrid } from "../components/PerlinNoiseGrid";

const meta: Meta<typeof PerlinNoiseGrid> = {
  title: "PerlinNoise",
  component: PerlinNoiseGrid,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["pageMul", "scale", "seed"],
    },
  },
  argTypes: {
    pageMul: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },
    scale: {
      control: { type: "range", min: 0.01, max: 1.0, step: 0.01 },
    },
    seed: {
      control: { type: "range", min: 1, max: 10000, step: 1 },
    },
  },
  args: {
    pageMul: 4,
    scale: 0.1,
    seed: 1337,
  },
};

export default meta;
type Story = StoryObj<typeof PerlinNoiseGrid>;

export const Default: Story = {
  args: {
    pageMul: 5,
    scale: 0.04,
  },
};
