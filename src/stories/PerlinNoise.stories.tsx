import type { Meta, StoryObj } from "@storybook/react";
import { interpolateCool, interpolateRainbow, interpolateSpectral } from "d3";
import { CellShape, PerlinNoiseGrid } from "../components/PerlinNoiseGrid";
import { TAILWIND_COLORS } from "../utils/colors";

const meta: Meta<typeof PerlinNoiseGrid> = {
  title: "PerlinNoise",
  component: PerlinNoiseGrid,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: [
        "width",
        "height",
        "scale",
        "seed",
        "cellSize",
        "duration",
        "background",
        "shape",
      ],
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
      control: { type: "number" },
      description: "Random seed for Perlin noise",
    },
    cellSize: {
      control: { type: "range", min: 8, max: 60, step: 2 },
      description: "Size of each cell in pixels",
    },
    duration: {
      control: { type: "range", min: 0, max: 2000, step: 50 },
      description: "Animation transition duration in ms",
    },
    shape: {
      control: { type: "select" },
      options: Object.values(CellShape),
      description: "Cell shape style",
    },
  },
  args: {
    width: 20,
    height: 20,
    scale: 0.1,
    seed: 1337,
    cellSize: 28,
    duration: 500,
    background: TAILWIND_COLORS.gray[900],
    shape: CellShape.ROUNDED_RECT,
  },
};

export default meta;
type Story = StoryObj<typeof PerlinNoiseGrid>;

export const Default: Story = {};

export const HighFrequency: Story = {
  args: {
    width: 30,
    height: 30,
    scale: 0.35,
    color: interpolateSpectral,
  },
};

export const SmoothWaves: Story = {
  args: {
    width: 25,
    height: 25,
    scale: 0.04,
    color: interpolateCool,
  },
};

export const Circles: Story = {
  args: {
    width: 20,
    height: 20,
    scale: 0.12,
    shape: CellShape.CIRCLE,
    color: interpolateRainbow,
  },
};
