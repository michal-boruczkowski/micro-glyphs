import { useState } from "react"
import { PHI, SCENARIO_HEIGHT, SCENARIO_WIDTH, toScenarioHeight, toScenarioPadding } from "../components/consts"
import { Rectangle } from "../drawing/Rectangle"
import { SVGRoot } from "../components/SVGRoot"
import { SVGRectangle } from "../components/SVGRectangle"
import { SVGGrid } from "../components/SVGGrid"
import { SVGRaster } from "../drawing/SVGRaster"

type StorybookScenarioProps = {
    svgRasters: SVGRaster[]
    howManyColumns?: number
}

export function StorybookScenario(props: StorybookScenarioProps) {
    const { svgRasters, howManyColumns = 16 } = props

    const [selected, setSelected] = useState<Set<number>>(new Set())

    const scenarioWidth = 700

    const viewBoxRect = new Rectangle(0, 0, scenarioWidth, toScenarioHeight(scenarioWidth))

    const padding = toScenarioPadding(scenarioWidth)

    const initialCanvas = viewBoxRect.toAddPadding(-padding)

    const howManyRows = Math.ceil(svgRasters.length / howManyColumns)

    const cellWidth = initialCanvas.width / howManyColumns
    const cellHeight = initialCanvas.height / howManyRows

    const cellSize = Math.min(cellWidth, cellHeight)

    return (<SVGRoot
        width={viewBoxRect.width}
        height={viewBoxRect.height}
        viewBoxRect={viewBoxRect}>
        <SVGRectangle rectangle={viewBoxRect} fill="oklch(25.7% 0.09 281.288)" stroke="red" />
        <SVGGrid howManyColumns={howManyColumns} howManyRows={howManyRows} rectangle={initialCanvas}>
            {svgRasters.map((svgRaster, i) => {


                const paddedCellSize = cellSize * (1 - 1 / (PHI * 2))


                const cellViewBoxSize = Math.ceil(paddedCellSize)


                const x = (cellWidth - cellViewBoxSize) / 2
                const y = (cellHeight - cellViewBoxSize) / 2

                const fill = selected.has(i) ? "#FF0000DD" : "#FFFFFFDD"

                const transform = `translate(${x}, ${y})`



                return (<g transform={transform} cursor="pointer" onClick={() => {
                    if (selected.has(i)) {
                        selected.delete(i)
                    } else {
                        selected.add(i)
                    }
                    console.log(Array.from(selected))
                    setSelected(new Set(selected))
                }}>
                    <SVGRectangle rectangle={new Rectangle(0, 0, cellViewBoxSize, cellViewBoxSize)} fill="transparent" />
                    <path key={i} d={svgRaster.toPath(cellViewBoxSize)} fill={fill} /></g>


                )
            })}

        </SVGGrid>
    </SVGRoot>
    )
}
