import type { Meta, StoryObj } from "@storybook/react";
import { PerlinNoiseMatchingGrid } from "../components/PerlinNoiseMatchingGrid";
import { allCorners, letters, niceHeroes, SVG_RASTERS_CONTROL } from "../drawing/svgRasters";
import { GRADIENT_COMPOSITION_CONTROL } from "./controls";
import { NiceGradientCompositions } from "../utils/colors";

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
        "gradientComposition",
        "duration",
        "glowSize",
        "strokeSize",
        "roundingSize",
        "showBox",
        "noiseBackground",
        "mirrorBackground",
      ],
    },
  },
  argTypes: {
    pageMul: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },
    scale: {
      control: { type: "range", min: 0.01, max: 1.0, step: 0.001 },
    },
    seed: {
      control: { type: "range", min: 1, max: 10000, step: 1 },
    },
    windowSize: {
      control: { type: "range", min: 1, max: 9, step: 1 },
    },
    svgRasters: SVG_RASTERS_CONTROL,
    gradientComposition: GRADIENT_COMPOSITION_CONTROL,
    duration: {
      control: { type: "range", min: 0, max: 2000, step: 50 },
    },
    glowSize: {
      control: { type: "range", min: 0, max: 20, step: 1 },
    },
    strokeSize: {
      control: { type: "range", min: -1, max: 100, step: 1 },
    },
    roundingSize: {
      control: { type: "range", min: -1, max: 100, step: 1 },
    },
    noiseBackground: {
      control: "boolean",
    },
    mirrorBackground: {
      control: "boolean",
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
    duration: 300,
    glowSize: 0,
    strokeSize: -1,
    roundingSize: -1,
    showBox: false,
    noiseBackground: false,
    mirrorBackground: true,
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
    duration: 0,
    glowSize: 4,
    strokeSize: 0,
    roundingSize: 0,
    showBox: true,
    gradientComposition: NiceGradientCompositions.CYBERPUNK_NEON__DARK,
  },
};

export const RedLetters: Story = {
  args: {
    pageMul: 2,
    scale: 0.206,
    seed: 1662,
    windowSize: 1,
    svgRasters: letters,
    duration: 300,
    glowSize: 0,
    strokeSize: 0,
    roundingSize: 0,
    showBox: false,
    noiseBackground: true,
    mirrorBackground: false,
    gradientComposition: NiceGradientCompositions.SUNSET_VIBES__DARK,
  },
};

export const SandSymbols: Story = {
  args: {
    pageMul: 1,
    scale: 0.206,
    seed: 7074,
    windowSize: 9,
    svgRasters: niceHeroes,
    duration: 500,
    glowSize: 3,
    strokeSize: 74,
    roundingSize: 100,
    showBox: false,
    noiseBackground: true,
    mirrorBackground: false,
    gradientComposition: NiceGradientCompositions.SUNSET_VIBES__LIGHT,
  },
};
