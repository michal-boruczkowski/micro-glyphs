import type { Meta, StoryObj } from '@storybook/react';
import { SVGRasterPath } from '../components/SVGRasterPath';
import * as monoPatterns_3x3 from '../drawing/svgRasters_3x3';
import * as monoPatterns_5x5 from '../drawing/svgRasters_5x5';
import * as monoPatterns_9x9 from '../drawing/svgRasters_9x9';
import { generateBinaryCombinations } from '../utils/generateBinaryCombinations';
import { SVGRaster } from '../drawing/SVGRaster';

import { StorybookScenario } from './StorybookScenario';
import { getCartesianProduct } from '../utils/getCartesianProduct';
import { useEffect, useState } from 'react';

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

const allPatterns = Object.values(monoPatterns_3x3)

const generator = getCartesianProduct({
  a: allPatterns,
  b: allPatterns,
  c: allPatterns,
  d: allPatterns
});

export const _3x3_sets: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => {



    const [count, setCount] = useState(1)






    const svgRasters = []

    for (const combination of generator) {
      if (svgRasters.length >= count) {
        break
      }

      const { a, b, c, d } = combination

      const background = new SVGRaster(9, 9)
        .overlay(a, 1, 1)
        .overlay(b, 5, 1)
        .overlay(c, 1, 5)
        .overlay(d, 5, 5)


      svgRasters.push(background)

    }


    const howManyColumns = Math.ceil(Math.sqrt(svgRasters.length))

    useEffect(() => {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= (allPatterns.length ** 4)) {
            return 1
          }
          return prev + 1
        })
      }, 100)

      return () => {
        clearInterval(timer)
      }
    }, [allPatterns.length])


    return (<StorybookScenario svgRasters={svgRasters} howManyColumns={howManyColumns} />
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
