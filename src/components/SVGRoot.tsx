import { ComponentProps } from 'react';
import { VIEWBOX_SIZE } from './consts';

export type SVGRootProps = ComponentProps<'svg'> & { viewBoxSize?: number };

export function SVGRoot(props: SVGRootProps) {
  const { children, viewBoxSize = VIEWBOX_SIZE, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      {...rest}
    >
      {children}
    </svg>
  );
}
