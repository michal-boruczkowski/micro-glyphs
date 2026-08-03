import { SVGRaster } from '../drawing/SVGRaster';
import { VIEWBOX_SIZE } from './consts';
import { SVGRoot, SVGRootProps } from './SVGRoot';

export type SVGRasterPathProps = SVGRootProps & { svgRaster: SVGRaster }

export function SVGRasterPath(props: SVGRasterPathProps) {
  const { width = VIEWBOX_SIZE, height = width, svgRaster, viewBoxSize = Math.max(svgRaster.width, svgRaster.height), ...rest } = props;

  return (
    <SVGRoot
      width={width}
      height={height}
      viewBoxSize={viewBoxSize}
      {...rest}
    >
      <path d={svgRaster.toPath(viewBoxSize)} fill="currentColor" stroke="none" />
    </SVGRoot>
  );
}
