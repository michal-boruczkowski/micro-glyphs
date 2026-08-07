import { ComponentProps } from "react";
import { Rectangle } from "../drawing/Rectangle";

export type SVGRectangleProps = ComponentProps<"rect"> & { rectangle: Rectangle };

export function SVGRectangle(props: SVGRectangleProps) {
  const { rectangle, ...rest } = props;

  return (
    <rect
      x={rectangle.x}
      y={rectangle.y}
      width={rectangle.width}
      height={rectangle.height}
      {...rest}
    />
  );
}
