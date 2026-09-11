import type { Meta, StoryObj } from "@storybook/react";
import { SVGRasterPath } from "../components/SVGRasterPath";

import * as monoPatterns_5x5 from "../drawing/svgRasters_5x5";
import * as monoPatterns_9x9 from "../drawing/svgRasters_9x9";

import { SVGRasterScenario } from "./SVGRasterScenario";
import { TAILWIND_COLORS, NiceGradientCompositions } from "../utils/colors";
import { GRADIENT_CONTROL } from "./colors";
import { DIVISION_TYPE_CONTROL, DivisionType } from "./divisionType";
import { allCorners, niceHeroes, SVG_RASTERS_CONTROL } from "../drawing/svgRasters";

const meta: Meta<typeof SVGRasterScenario> = {
  title: "SVGRasterStory",
  component: SVGRasterScenario,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: [
        "duration",
        "glowSize",
        "roundingSize",
        "animateOpacity",
        "strokeSize",
        "gradientColors",
        "stroke",
        "loop",
        "pageMul",
        "stop",
        "showBox",
        "divisionType",
        "svgRasters",
      ],
    },
  },
  args: {
    color: TAILWIND_COLORS.slate[100],
    duration: 600,
    glowSize: 4,
    strokeSize: -1,
    roundingSize: -1,
    gradientColors: NiceGradientCompositions.SUNSET_VIBES__DARK,
    loop: false,
    stop: false,
    showBox: false,
    divisionType: DivisionType.GRID,
    svgRasters: niceHeroes,
    pageMul: 2,
  },
  argTypes: {
    gradientColors: GRADIENT_CONTROL,
    divisionType: DIVISION_TYPE_CONTROL,
    duration: { control: { type: "range", min: 0, max: 2000, step: 50 } },
    glowSize: { control: { type: "range", min: 0, max: 20, step: 1 } },
    strokeSize: { control: { type: "range", min: -1, max: 20, step: 0.5 } },
    roundingSize: { control: { type: "range", min: -1, max: 20, step: 0.5 } },
    pageMul: { control: { type: "range", min: 1, max: 10, step: 1 } },
    loop: { control: "boolean" },
    stop: { control: "boolean" },
    showBox: { control: "boolean" },
    svgRasters: SVG_RASTERS_CONTROL,
  },
};

export default meta;
type Story = StoryObj<typeof SVGRasterScenario>;

export const StoryGenerator: Story = {
  render: (args) => {
    return <SVGRasterScenario {...args} />;
  },
};

export const _5x5: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {Object.values(monoPatterns_5x5).map((pattern, i) => (
        <SVGRasterPath key={i} svgRaster={pattern} {...args} />
      ))}
    </div>
  ),
};

export const _9x9: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {Object.values(monoPatterns_9x9).map((pattern, i) => (
        <SVGRasterPath key={i} svgRaster={pattern} {...args} />
      ))}
    </div>
  ),
};

export const GoldHeroes: Story = {
  args: {
    duration: 150,
    glowSize: 4,
    strokeSize: -1,
    roundingSize: -1,
    gradientColors: NiceGradientCompositions.GOLD__DARK,
    loop: true,
    stop: true,
    showBox: false,
    divisionType: DivisionType.GRID,
    svgRasters: niceHeroes,
  },

  render: (args) => {
    return <SVGRasterScenario {...args} />;
  },
};

export const PerlinPattern: Story = {
  args: {
    duration: 0,
    glowSize: 4,
    strokeSize: 0,
    roundingSize: 0,

    loop: false,
    stop: true,
    showBox: true,
    divisionType: DivisionType.PERLIN,
    svgRasters: allCorners,
    pageMul: 8,
  },

  render: (args) => {
    return <SVGRasterScenario {...args} />;
  },
};
