import type { Meta, StoryObj } from '@storybook/react';
import { SVGRasterPath } from '../components/SVGRasterPath';
import { BOTTOM_LEFT_SET, BOTTOM_RIGHT_SET, NICE_FULL_SET, NICE_SET, TOP_LEFT_SET, TOP_RIGHT_SET } from '../drawing/svgRasters_3x3';
import * as monoPatterns_5x5 from '../drawing/svgRasters_5x5';
import * as monoPatterns_9x9 from '../drawing/svgRasters_9x9';
import { generateBinaryCombinations } from '../utils/generateBinaryCombinations';
import { SVGRaster } from '../drawing/SVGRaster';

import { StorybookScenario } from './StorybookScenario';
import { getCartesianProduct } from '../utils/getCartesianProduct';
import { useCounterStrategy } from '../utils/useCounterStrategy';
import { getScenarioColumns, toScenarioLimit } from '../components/consts';

const meta: Meta<typeof SVGRasterPath> = {
  title: 'Components/SVGRasterPath',
  component: SVGRasterPath,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 12, max: 64 } },
    fill: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof SVGRasterPath>;

export const _3x3: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => {
    const svgRasters = generateBinaryCombinations(9).map(combination => new SVGRaster(3, 3, combination))

    return (<StorybookScenario svgRasters={svgRasters} />
    )
  }
}


const niceGenerator = getCartesianProduct({
  a: NICE_FULL_SET,
  b: NICE_FULL_SET,
  c: NICE_FULL_SET,
  d: NICE_FULL_SET
});


const niceAndSidesGenerator = getCartesianProduct({
  a: TOP_LEFT_SET.concat(BOTTOM_RIGHT_SET),
  b: TOP_RIGHT_SET.concat(BOTTOM_LEFT_SET),
  c: BOTTOM_LEFT_SET.concat(TOP_RIGHT_SET),
  d: BOTTOM_RIGHT_SET.concat(TOP_LEFT_SET)
});


export const _3x3_NICE: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceGenerator, toScenarioLimit(2))

    let svgRasters = []



    for (const combination of combinations) {
      const { a, b, c, d } = combination

      const background = new SVGRaster(9, 9)
        .overlay(a, 1, 1)
        .overlay(b, 5, 1)
        .overlay(c, 1, 5)
        .overlay(d, 5, 5)


      svgRasters.push(background)
    }

    return (<StorybookScenario svgRasters={svgRasters} howManyColumns={getScenarioColumns(svgRasters.length)} />
    )
  }
}

export const _3x3_NICE_AND_SIDES: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => {
    const [combinations] = useCounterStrategy(niceAndSidesGenerator, 1)

    let svgRasters = []



    for (const combination of combinations) {
      const { a, b, c, d } = combination

      const background = new SVGRaster(9, 9)
        .overlay(a, 1, 1)
        .overlay(b, 5, 1)
        .overlay(c, 1, 5)
        .overlay(d, 5, 5)


      svgRasters.push(background)
    }

    return (<StorybookScenario svgRasters={svgRasters} howManyColumns={getScenarioColumns(svgRasters.length)} />
    )
  }
}

export const _5x5: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => (
    <div className='flex flex-wrap gap-4'>
      {Object.values(monoPatterns_5x5).map((pattern, i) => (
        <SVGRasterPath key={i} {...args} svgRaster={pattern} />
      ))}

    </div>
  )
};

export const _9x9: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => (
    <div className='flex flex-wrap gap-4'>
      {Object.values(monoPatterns_9x9).map((pattern, i) => (
        <SVGRasterPath key={i} {...args} svgRaster={pattern} />
      ))}

    </div>
  )
};
