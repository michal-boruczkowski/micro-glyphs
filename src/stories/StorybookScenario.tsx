import { useMemo, useState } from "react"
import { PHI, toScenarioHeight, toScenarioPadding } from "../components/consts"
import { Rectangle } from "../drawing/Rectangle"
import { SVGRoot } from "../components/SVGRoot"
import { SVGRectangle } from "../components/SVGRectangle"
import { SVGGrid } from "../components/SVGGrid"
import { SVGRaster } from "../drawing/SVGRaster"
import { CellSizeFunction, equalCellSizeFunction } from "../utils/cellSizeFunction"


type StorybookScenarioProps = {
    svgRasters: SVGRaster[]
    howManyColumns?: number
    cellSizeFunction?: (canvas: Rectangle, howManyRows: number, howManyColumns: number) => CellSizeFunction
}

const scenarioWidth = 700

const viewBoxRect = new Rectangle(0, 0, scenarioWidth, toScenarioHeight(scenarioWidth))

export function StorybookScenario(props: StorybookScenarioProps) {
    const { svgRasters, howManyColumns = 16, cellSizeFunction } = props

    const [selected, setSelected] = useState<Set<number>>(new Set())


    const canvas = useMemo(() => {
        const padding = toScenarioPadding(scenarioWidth)

        return viewBoxRect.toAddPadding(-padding)

    }, [])

    const howManyRows = Math.ceil(svgRasters.length / howManyColumns)

    const sizeFunction = useMemo(() => {
        return cellSizeFunction ? cellSizeFunction(canvas, howManyRows, howManyColumns) : equalCellSizeFunction(canvas, howManyRows, howManyColumns)
    }, [canvas, howManyRows, howManyColumns])


    return (<SVGRoot
        width={viewBoxRect.width}
        height={viewBoxRect.height}
        viewBoxRect={viewBoxRect}>
        <SVGRectangle rectangle={viewBoxRect} fill="#1B1E32" stroke="red" />
        <SVGGrid howManyColumns={howManyColumns} howManyRows={howManyRows} rectangle={canvas} cellSizeFunction={sizeFunction}>
            {svgRasters.map((svgRaster, i) => {

                const rowIndex = Math.floor(i / howManyColumns)
                const colIndex = i - rowIndex * howManyColumns

                const cellRectangle = sizeFunction(rowIndex, colIndex)

                const cellWidth = cellRectangle.width
                const cellHeight = cellRectangle.height

                const cellSize = Math.min(cellWidth, cellHeight)

                const paddedCellSize = cellSize * 1 / PHI


                const cellViewBoxSize = Math.ceil(paddedCellSize)


                const x = (cellWidth - cellViewBoxSize) / 2
                const y = (cellHeight - cellViewBoxSize) / 2

                const fill = selected.has(i) ? "#FF0000DD" : "#FDFDFF"

                const transform = `translate(${x}, ${y})`



                return (<g transform={transform} cursor="pointer" onClick={() => {
                    if (selected.has(i)) {
                        selected.delete(i)
                    } else {
                        selected.add(i)
                    }
                    console.log(Array.from(selected))
                    setSelected(new Set(selected))
                }} >
                    <SVGRectangle rectangle={new Rectangle(0, 0, cellViewBoxSize, cellViewBoxSize)} fill="transparent" />
                    <path key={i} d={svgRaster.toPath(cellViewBoxSize)} fill={fill} stroke="white" strokeWidth={0} /></g>


                )
            })}

        </SVGGrid>
    </SVGRoot>
    )
}
