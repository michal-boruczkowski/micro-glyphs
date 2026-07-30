import { ComponentProps } from 'react';
import { VIEWBOX_SIZE } from './consts';

export type SVGRootProps = ComponentProps<'svg'>;

export function SVGRoot(props: SVGRootProps) {
  const { children, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      {...rest}
    >
      {children}
    </svg>
  );
}
