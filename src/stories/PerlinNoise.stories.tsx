import type { Meta, StoryObj } from "@storybook/react";
import { interpolateCool } from "d3";
import { PerlinNoiseGrid } from "../components/PerlinNoiseGrid";

const meta: Meta<typeof PerlinNoiseGrid> = {
  title: "PerlinNoise",
  component: PerlinNoiseGrid,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["width", "height", "scale", "seed", "cellSize"],
    },
  },
  argTypes: {
    width: {
      control: { type: "range", min: 2, max: 60, step: 1 },
      description: "Grid width (number of columns)",
    },
    height: {
      control: { type: "range", min: 2, max: 60, step: 1 },
      description: "Grid height (number of rows)",
    },
    scale: {
      control: { type: "range", min: 0.01, max: 1.0, step: 0.01 },
      description: "Perlin noise scale factor",
    },
    seed: {
      control: { type: "range", min: 1, max: 10000, step: 1 },
      description: "Random seed for Perlin noise",
    },
    cellSize: {
      control: { type: "range", min: 8, max: 60, step: 2 },
      description: "Size of each cell in pixels",
    },
  },
  args: {
    width: 20,
    height: 20,
    scale: 0.1,
    seed: 1337,
    cellSize: 28,
  },
};

export default meta;
type Story = StoryObj<typeof PerlinNoiseGrid>;

export const Default: Story = {
  args: {
    width: 25,
    height: 25,
    scale: 0.04,
    color: interpolateCool,
  },
};
