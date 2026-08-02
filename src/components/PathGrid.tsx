import { MonoPattern } from '../drawing/MonoPattern';
import { VIEWBOX_SIZE } from './consts';
import { SVGRoot, SVGRootProps } from './SVGRoot';

export type PathGridProps = SVGRootProps & { pattern: MonoPattern }

export function PathGrid(props: PathGridProps) {
  const { width = VIEWBOX_SIZE, height = width, pattern, viewBoxSize = Math.max(pattern.width, pattern.height), ...rest } = props;

  return (
    <SVGRoot
      width={width}
      height={height}
      viewBoxSize={viewBoxSize}
      {...rest}
    >
      <path d={pattern.toPath(viewBoxSize)} fill="currentColor" stroke="none" />
    </SVGRoot>
  );
}
