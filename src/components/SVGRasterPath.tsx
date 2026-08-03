import { useMemo } from 'react';
import { SVGRaster } from '../drawing/SVGRaster';
import { VIEWBOX_SIZE } from './consts';
import { SVGRoot, SVGRootProps } from './SVGRoot';
import { Rectangle } from '../drawing/Rectangle';

export type SVGRasterPathProps = SVGRootProps & { svgRaster: SVGRaster }

export function SVGRasterPath(props: SVGRasterPathProps) {
  const { width = VIEWBOX_SIZE, height = width, svgRaster, ...rest } = props;

  const viewBoxRect = useMemo(() => {
    const size = Math.max(svgRaster.width, svgRaster.height)

    return new Rectangle(0, 0, size, size)
  }, [svgRaster])

  return (
    <SVGRoot
      width={width}
      height={height}
      viewBoxRect={viewBoxRect}
      {...rest}
    >
      <path d={svgRaster.toPath(viewBoxRect.width)} fill="currentColor" />
    </SVGRoot>
  );
}
