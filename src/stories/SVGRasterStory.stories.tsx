import type { Meta, StoryObj } from "@storybook/react";
import { SVGRasterPath } from "../components/SVGRasterPath";

import * as monoPatterns_5x5 from "../drawing/svgRasters_5x5";
import * as monoPatterns_9x9 from "../drawing/svgRasters_9x9";
import { generateBinaryCombinations } from "../utils/generateBinaryCombinations";
import { SVGRaster } from "../drawing/SVGRaster";

import { SVGRasterScenario } from "./SVGRasterScenario";
import { TAILWIND_COLORS, TailwindGradients } from "../utils/colors";
import { COLOR_CONTROL, GRADIENT_CONTROL } from "./colors";
import { DIVISION_TYPE_CONTROL, DivisionType } from "./divisionType";
import { niceHeroes, SVG_RASTERS_CONTROL } from "../drawing/svgRasters";

const meta: Meta<typeof SVGRasterScenario> = {
  title: "SVGRasterStory",
  component: SVGRasterScenario,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: [
        "color",
        "background",
        "autoCenter",
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
    background: TAILWIND_COLORS.gray[800],
    autoCenter: false,
    duration: 600,
    glowSize: 4,
    strokeSize: -1,
    roundingSize: -1,
    gradientColors: TailwindGradients.SUNSET_VIBES,
    loop: false,
    stop: false,
    showBox: false,
    divisionType: DivisionType.GRID,
    svgRasters: niceHeroes,
  },
  argTypes: {
    color: COLOR_CONTROL,
    background: COLOR_CONTROL,
    stroke: COLOR_CONTROL,
    gradientColors: GRADIENT_CONTROL,
    divisionType: DIVISION_TYPE_CONTROL,
    autoCenter: { control: "boolean" },
    duration: { control: { type: "range", min: 0, max: 2000, step: 50 } },
    glowSize: { control: { type: "range", min: 0, max: 20, step: 1 } },
    strokeSize: { control: { type: "range", min: -1, max: 20, step: 0.5 } },
    roundingSize: { control: { type: "range", min: -1, max: 20, step: 0.5 } },
    pageMul: { control: { type: "range", min: 1, max: 5, step: 1 } },
    loop: { control: "boolean" },
    stop: { control: "boolean" },
    showBox: { control: "boolean" },
    svgRasters: SVG_RASTERS_CONTROL,
  },
};

export default meta;
type Story = StoryObj<typeof SVGRasterScenario>;

export const _3x3: Story = {
  args: { background: TAILWIND_COLORS.black },
  render: (args) => {
    const svgRasters = generateBinaryCombinations(9).map((combination) =>
      new SVGRaster(3, 3, combination).getPadded(1),
    );

    return (
      <SVGRasterScenario
        startIndex={svgRasters.length}
        stopIndex={svgRasters.length}
        svgRasters={svgRasters}
        {...args}
      />
    );
  },
};

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
    color: "oklch(96.8% 0.007 247.896)",
    background: "oklch(27.8% 0.033 256.848)",
    autoCenter: false,
    duration: 150,
    glowSize: 4,
    strokeSize: -1,
    roundingSize: -1,
    gradientColors: TailwindGradients.GOLD,
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
