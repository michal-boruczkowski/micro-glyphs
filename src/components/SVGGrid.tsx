import { Children, ComponentProps, useMemo } from 'react';
import { Rectangle } from '../drawing/Rectangle';

export type SVGGridProps = ComponentProps<'g'> & { howManyColumns?: number, howManyRows?: number, rectangle: Rectangle }

export function SVGGrid(props: SVGGridProps) {
  const { children, rectangle, howManyColumns, howManyRows, ...rest } = props;

  const howManyChildren = Children.count(children)
  const defaultSize = Math.sqrt(howManyChildren)

  const numberOfColumns = howManyColumns ?? defaultSize;
  const numberOfRows = howManyRows ?? defaultSize;

  const rows = useMemo(() => {
    const rows = []
    const childrenArray = Children.toArray(children)

    const cellWidth = rectangle.width / numberOfColumns
    const cellHeight = rectangle.height / numberOfRows




    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {

      const row = []

      for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {




        const itemIndex = rowIndex * numberOfColumns + colIndex

        const x = colIndex * cellWidth
        const y = rowIndex * cellHeight

        row.push({ child: childrenArray[itemIndex], colIndex, rowIndex, x, y })
      }

      rows.push(row)
    }

    return rows
  }, [children])

  return (
    <g
      transform={`translate(${rectangle.x},${rectangle.y})`}
      {...rest}
    >
      {rows.map((row, r) => {


        return <g key={r}>
          {row.map((cell, c) => {
            const { child, x, y } = cell

            return <g key={c} transform={`translate(${x},${y})`}>
              {child}
            </g>
          })}
        </g>
      })}
    </g>
  );
}
