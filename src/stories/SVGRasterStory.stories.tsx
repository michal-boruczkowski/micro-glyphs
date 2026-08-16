import type { Meta, StoryObj } from "@storybook/react";
import { SVGRasterPath } from "../components/SVGRasterPath";
import {
  BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER,
  NICE_FULL,
  ALL_HEROES,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
  ALL_LETTERS,
  compose4,
} from "../drawing/svgRasters_3x3";
import * as monoPatterns_5x5 from "../drawing/svgRasters_5x5";
import * as monoPatterns_9x9 from "../drawing/svgRasters_9x9";
import { generateBinaryCombinations } from "../utils/generateBinaryCombinations";
import { SVGRaster } from "../drawing/SVGRaster";

import { getCartesianProduct } from "../utils/getCartesianProduct";
import { SVGRasterScenario } from "./SVGRasterScenario";
import { TAILWIND_COLORS, TAILWIND_PRESET_COLORS } from "../utils/colors";

const meta: Meta<typeof SVGRasterScenario> = {
  title: "SVGRasterStory",
  component: SVGRasterScenario,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["color", "background", "autoCenter", "duration", "glowSize", "animateOpacity"],
    },
  },
  args: {
    color: TAILWIND_COLORS.slate[100],
    background: TAILWIND_COLORS.gray[800],
    autoCenter: false,
    animateOpacity: true,
    duration: 600,
    glowSize: 4,
  },
  argTypes: {
    color: {
      control: {
        type: "color",
        presetColors: TAILWIND_PRESET_COLORS,
      },
    },
    background: {
      control: {
        type: "color",
        presetColors: TAILWIND_PRESET_COLORS,
      },
    },
    autoCenter: { control: "boolean" },
    animateOpacity: { control: "boolean" },
    duration: { control: { type: "range", min: 0, max: 2000, step: 50 } },
    glowSize: { control: { type: "range", min: 0, max: 20, step: 1 } },
  },
};

console.log(TAILWIND_PRESET_COLORS);

const niceFull = getCartesianProduct({
  a: NICE_FULL,
  b: NICE_FULL,
  c: NICE_FULL,
  d: NICE_FULL,
}).map((combination) => {
  const { a, b, c, d } = combination;

  return compose4(a, b, c, d);
});

const letters = getCartesianProduct({
  a: ALL_LETTERS,
  b: ALL_LETTERS,
  c: ALL_LETTERS,
  d: ALL_LETTERS,
}).map((combination) => {
  const { a, b, c, d } = combination;

  return compose4(a, b, c, d);
});

const niceSides = getCartesianProduct({
  a: TOP_LEFT_CORNER.concat(BOTTOM_RIGHT_CORNER),
  b: TOP_RIGHT_CORNER.concat(BOTTOM_LEFT_CORNER),
  c: BOTTOM_LEFT_CORNER.concat(TOP_RIGHT_CORNER),
  d: BOTTOM_RIGHT_CORNER.concat(TOP_LEFT_CORNER),
}).map((combination) => {
  const { a, b, c, d } = combination;

  return compose4(a, b, c, d);
});

const niceHeroes = ALL_HEROES.concat(TOP_LEFT_CORNER)
  .concat(TOP_RIGHT_CORNER)
  .concat(BOTTOM_LEFT_CORNER)
  .concat(BOTTOM_RIGHT_CORNER);

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
        start={svgRasters.length}
        page={svgRasters.length}
        svgRasters={svgRasters}
        gradientColors={[]}

        {...args}
      />
    );
  },
};

export const _3x3_NICE: Story = {
  render: (args) => {
    const svgRasters = niceHeroes.map((combination) =>
      new SVGRaster(5, 5).overlay(combination, 1, 1),
    );

    return <SVGRasterScenario svgRasters={svgRasters} {...args} />;
  },
};

export const _3x3_NICE_SETS: Story = {
  render: (args) => {
    return <SVGRasterScenario svgRasters={niceFull} {...args} />;
  },
};

export const _3x3_LETTERS_SINGLE: Story = {
  render: (args) => {
    return <SVGRasterScenario svgRasters={letters} page={1} {...args} />;
  },
};

export const _3x3_LETTERS_SETS: Story = {
  render: (args) => {
    return <SVGRasterScenario svgRasters={letters} {...args} />;
  },
};

export const _3x3_NICE_SIDES_SETS: Story = {
  render: (args) => {
    return <SVGRasterScenario svgRasters={niceSides} {...args} />;
  },
};

export const _3x3_NICE_SIDES_SINGLE: Story = {
  render: (args) => {
    return <SVGRasterScenario svgRasters={niceSides} page={1} {...args} />;
  },
};

export const _5x5: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {Object.values(monoPatterns_5x5).map((pattern, i) => (
        <SVGRasterPath key={i} {...args} svgRaster={pattern} {...args} />
      ))}
    </div>
  ),
};

export const _9x9: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {Object.values(monoPatterns_9x9).map((pattern, i) => (
        <SVGRasterPath key={i} {...args} svgRaster={pattern} {...args} />
      ))}
    </div>
  ),
};
