import { ComponentProps, useMemo } from "react";
import { Rectangle } from "../drawing/Rectangle";

export type SVGRootProps = ComponentProps<"svg"> & { viewBoxRect?: Rectangle };

export function SVGRoot(props: SVGRootProps) {
  const { children, viewBoxRect, ...rest } = props;

  const viewBox = useMemo(() => {
    if (viewBoxRect) {
      return `${viewBoxRect.x} ${viewBoxRect.y} ${viewBoxRect.width} ${viewBoxRect.height}`;
    }

    return;
  }, [viewBoxRect]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} {...rest}>
      {children}
    </svg>
  );
}
