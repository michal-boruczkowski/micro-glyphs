import type { Meta, StoryObj } from '@storybook/react';
import { SVGRasterPath } from '../components/SVGRasterPath';
import * as monoPatterns_3x3 from '../drawing/svgRasters_3x3';
import * as monoPatterns_5x5 from '../drawing/svgRasters_5x5';
import * as monoPatterns_9x9 from '../drawing/svgRasters_9x9';
import { generateBinaryCombinations } from '../utils/generateBinaryCombinations';
import { SVGRaster } from '../drawing/SVGRaster';

import { StorybookScenario } from './StorybookScenario';

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

export const _3x3_sets: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => {


    return (<StorybookScenario svgRasters={[]} />
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
