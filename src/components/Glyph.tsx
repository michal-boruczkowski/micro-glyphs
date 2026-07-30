export type GlyphProps = {
  name: string;
  size?: number;
  color?: string;
  className?: string;
};

export function Glyph(props: GlyphProps) {
  const { name, size = 24, color = 'currentColor', className = '' } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`micro-glyph micro-glyph-${name} ${className}`}
      data-testid="micro-glyph"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
};
