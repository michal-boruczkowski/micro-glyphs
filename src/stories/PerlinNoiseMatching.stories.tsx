import type { Meta, StoryObj } from "@storybook/react";
import { PerlinNoiseMatchingGrid } from "../components/PerlinNoiseMatchingGrid";
import { allCorners, niceHeroes, SVG_RASTERS_CONTROL } from "../drawing/svgRasters";
import { TAILWIND_COLORS, TailwindGradients } from "../utils/colors";
import { COLOR_CONTROL, GRADIENT_CONTROL } from "./colors";

const meta: Meta<typeof PerlinNoiseMatchingGrid> = {
  title: "PerlinNoiseMatching",
  component: PerlinNoiseMatchingGrid,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: [
        "pageMul",
        "scale",
        "seed",
        "windowSize",
        "svgRasters",
        "background",
        "stroke",
        "gradientColors",
        "duration",
        "glowSize",
        "strokeSize",
        "roundingSize",
        "showBox",
      ],
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
    windowSize: {
      control: { type: "range", min: 1, max: 9, step: 1 },
    },
    svgRasters: SVG_RASTERS_CONTROL,
    background: COLOR_CONTROL,
    stroke: COLOR_CONTROL,
    gradientColors: GRADIENT_CONTROL,
    duration: {
      control: { type: "range", min: 0, max: 2000, step: 50 },
    },
    glowSize: {
      control: { type: "range", min: 0, max: 20, step: 1 },
    },
    strokeSize: {
      control: { type: "range", min: -1, max: 20, step: 0.5 },
    },
    roundingSize: {
      control: { type: "range", min: -1, max: 20, step: 0.5 },
    },
    showBox: {
      control: "boolean",
    },
  },
  args: {
    pageMul: 5,
    scale: 0.05,
    seed: 1337,
    windowSize: 3,
    svgRasters: niceHeroes,
    background: TAILWIND_COLORS.gray[900],
    duration: 300,
    glowSize: 0,
    strokeSize: -1,
    roundingSize: -1,
    showBox: false,
  },
};

export default meta;
type Story = StoryObj<typeof PerlinNoiseMatchingGrid>;

export const Default: Story = {
  args: {
    pageMul: 5,
    scale: 0.05,
    seed: 1337,
    windowSize: 3,
    svgRasters: niceHeroes,
  },
};

export const Gradientmapping: Story = {
  args: {
    pageMul: 5,
    scale: 0.08,
    seed: 1337,
    windowSize: 2,
    svgRasters: allCorners,
    background: "oklch(21% 0.034 264.665)",
    duration: 0,
    glowSize: 4,
    strokeSize: 0,
    roundingSize: 0,
    showBox: true,
    gradientColors: TailwindGradients.CYBERPUNK_NEON,
  },
};
