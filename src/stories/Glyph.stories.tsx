import type { Meta, StoryObj } from '@storybook/react';
import { Glyph } from '../components/Glyph';

const meta: Meta<typeof Glyph> = {
  title: 'Components/Glyph',
  component: Glyph,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 12, max: 64 } },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Glyph>;

export const Default: Story = {
  args: {
    name: 'plus',
    size: 24,
    color: '#3b82f6',
  },
};

export const Large: Story = {
  args: {
    name: 'plus',
    size: 48,
    color: '#10b981',
  },
};
