import { SVGRoot } from './SVGRoot';

export type GlyphProps = {
  name: string;
  size?: number;
  color?: string;
  className?: string;
};

export function Glyph(props: GlyphProps) {
  const { size = 24, color = 'currentColor' } = props;
  return (
    <SVGRoot
      width={size}
      height={size}
      stroke={color}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </SVGRoot>
  );
}
