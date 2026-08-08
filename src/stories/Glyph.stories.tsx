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

import { StorybookScenario } from "./StorybookScenario";
import { getCartesianProduct } from "../utils/getCartesianProduct";
import { useCounterStrategy } from "../utils/useCounterStrategy";
import { getScenarioColumns, getScenarioLimit } from "../components/consts";
import { StorybookD3Scenario } from "./StorybookD3Scenario";

const meta: Meta<typeof SVGRasterPath> = {
  title: "Components/SVGRasterPath",
  component: SVGRasterPath,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["width", "fill"],
    },
  },
  argTypes: {
    width: { control: { type: "number", min: 12, max: 64 } },
    fill: { control: "color" },
  },
};

const niceGenerator = getCartesianProduct({
  a: NICE_FULL,
  b: NICE_FULL,
  c: NICE_FULL,
  d: NICE_FULL,
});

const lettersGenerator = getCartesianProduct({
  a: ALL_LETTERS,
  b: ALL_LETTERS,
  c: ALL_LETTERS,
  d: ALL_LETTERS,
});

const niceSidesGenerator = getCartesianProduct({
  a: TOP_LEFT_CORNER.concat(BOTTOM_RIGHT_CORNER),
  b: TOP_RIGHT_CORNER.concat(BOTTOM_LEFT_CORNER),
  c: BOTTOM_LEFT_CORNER.concat(TOP_RIGHT_CORNER),
  d: BOTTOM_RIGHT_CORNER.concat(TOP_LEFT_CORNER),
});

const niceHeroes = ALL_HEROES.concat(TOP_LEFT_CORNER)
  .concat(TOP_RIGHT_CORNER)
  .concat(BOTTOM_LEFT_CORNER)
  .concat(BOTTOM_RIGHT_CORNER);

export default meta;
type Story = StoryObj<typeof SVGRasterPath>;

export const d3: Story = {
  render: (args) => {
    const svgRasters = niceHeroes.map((combination) =>
      new SVGRaster(5, 5).overlay(combination, 1, 1),
    );

    return <StorybookD3Scenario svgRasters={svgRasters} pageLimit={getScenarioLimit(2)} />;
  },
};

export const _3x3: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const svgRasters = generateBinaryCombinations(9).map(
      (combination) => new SVGRaster(3, 3, combination),
    );

    return <StorybookScenario svgRasters={svgRasters} />;
  },
};

export const _3x3_NICE: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceHeroes, 1, 300);

    let svgRasters = [];

    for (const base of combinations) {
      const background = new SVGRaster(5, 5).overlay(base, 1, 1);

      svgRasters.push(background);
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _3x3_NICE_SETS: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceGenerator, getScenarioLimit(2));

    let svgRasters = [];

    for (const combination of combinations) {
      const { a, b, c, d } = combination;

      svgRasters.push(compose4(a, b, c, d));
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _3x3_NICE_SINGLE: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceGenerator, 1);

    let svgRasters = [];

    for (const combination of combinations) {
      const { a, b, c, d } = combination;

      svgRasters.push(compose4(a, b, c, d));
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _3x3_LETTERS_SINGLE: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(lettersGenerator, 1);

    let svgRasters = [];

    for (const combination of combinations) {
      const { a, b, c, d } = combination;

      svgRasters.push(compose4(a, b, c, d));
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _3x3_LETTERS_SETS: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(lettersGenerator, getScenarioLimit(4));

    let svgRasters = [];

    for (const combination of combinations) {
      const { a, b, c, d } = combination;

      svgRasters.push(compose4(a, b, c, d));
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _3x3_NICE_SIDES_SETS: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceSidesGenerator, getScenarioLimit(2));

    let svgRasters = [];

    for (const combination of combinations) {
      const { a, b, c, d } = combination;

      svgRasters.push(compose4(a, b, c, d));
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _3x3_NICE_SIDES_SINGLE: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceSidesGenerator, 1);

    let svgRasters = [];

    for (const combination of combinations) {
      const { a, b, c, d } = combination;

      svgRasters.push(compose4(a, b, c, d));
    }

    return (
      <StorybookScenario
        svgRasters={svgRasters}
        howManyColumns={getScenarioColumns(svgRasters.length)}
      />
    );
  },
};

export const _5x5: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {Object.values(monoPatterns_5x5).map((pattern, i) => (
        <SVGRasterPath key={i} {...args} svgRaster={pattern} />
      ))}
    </div>
  ),
};

export const _9x9: Story = {
  args: {
    width: 24,
    color: "black",
  },
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {Object.values(monoPatterns_9x9).map((pattern, i) => (
        <SVGRasterPath key={i} {...args} svgRaster={pattern} />
      ))}
    </div>
  ),
};
