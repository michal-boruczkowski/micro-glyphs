import { useState } from "react"
import { PHI, SCENARIO_HEIGHT, SCENARIO_WIDTH, toScenarioHeight } from "../components/consts"
import { Rectangle } from "../drawing/Rectangle"
import { SVGRoot } from "../components/SVGRoot"
import { SVGRectangle } from "../components/SVGRectangle"
import { SVGGrid } from "../components/SVGGrid"
import { SVGRaster } from "../drawing/SVGRaster"

type StorybookScenarioProps = {
    svgRasters: SVGRaster[]
}

export function StorybookScenario(props: StorybookScenarioProps) {
    const { svgRasters } = props

    const [selected, setSelected] = useState<Set<number>>(new Set())

    const viewBoxRect = new Rectangle(0, 0, SCENARIO_WIDTH, SCENARIO_HEIGHT)

    const viewBoxSize = Math.max(viewBoxRect.width, viewBoxRect.height)

    const padding = viewBoxSize / (PHI * 16)

    const canvas = viewBoxRect.toAddPadding(-padding)

    const howManyColumns = 16
    const howManyRows = Math.ceil(svgRasters.length / howManyColumns)


    return (<SVGRoot
        width={700}
        height={toScenarioHeight(700)}
        viewBoxRect={viewBoxRect}>
        <SVGRectangle rectangle={viewBoxRect} fill="white" stroke="red" />
        <SVGGrid howManyColumns={howManyColumns} howManyRows={howManyRows} rectangle={canvas}>
            {svgRasters.map((svgRaster, i) => {
                const cellWidth = canvas.width / howManyColumns
                const cellHeight = canvas.height / howManyRows

                const cellSize = Math.min(cellWidth, cellHeight)

                const cellViewBoxSize = cellSize - (cellSize / (PHI * 2))

                const x = (cellWidth - cellViewBoxSize) / 2
                const y = (cellHeight - cellViewBoxSize) / 2

                const fill = selected.has(i) ? "red" : "black"



                return (<g transform={`translate(${x}, ${y})`} onClick={() => {
                    if (selected.has(i)) {
                        selected.delete(i)
                    } else {
                        selected.add(i)
                    }
                    console.log(Array.from(selected))
                    setSelected(new Set(selected))
                }}>

                    <path key={i} d={svgRaster.toPath(cellViewBoxSize)} fill={fill} opacity={0.8} /></g>


                )
            })}

        </SVGGrid>
    </SVGRoot>
    )
}