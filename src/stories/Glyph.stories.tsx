import type { Meta, StoryObj } from '@storybook/react';
import { PathGrid } from '../components/PathGrid';
import { SWORD_2, SWORD_ICON } from '../drawing/monoPatterns';

const meta: Meta<typeof PathGrid> = {
  title: 'Components/PathGrid',
  component: PathGrid,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 12, max: 64 } },
    fill: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof PathGrid>;

export const Default: Story = {
  args: {
    width: 24,
    color: "black"
  },
  render: (args) => (
    <div className='flex flex-wrap gap-4'>
      <PathGrid {...args} pattern={SWORD_ICON} />
      <PathGrid {...args} pattern={SWORD_2} />


    </div>
  )
};
