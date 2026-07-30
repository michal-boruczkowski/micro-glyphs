import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Glyph } from './Glyph';

describe('Glyph', () => {
  it('renders correctly with default props', () => {
    render(<Glyph name="plus" />);
    const svgElement = screen.getByTestId('micro-glyph');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
  });

  it('applies custom size and color', () => {
    render(<Glyph name="plus" size={32} color="red" />);
    const svgElement = screen.getByTestId('micro-glyph');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('stroke', 'red');
  });
});
