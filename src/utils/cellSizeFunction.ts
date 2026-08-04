import { Rectangle } from "../drawing/Rectangle"
import { getGeometricalSequence } from "./getGeometricalSequence"

export type CellSizeFunction = (rowIndex: number, columnIndex: number) => Rectangle

export function equalCellSizeFunction(canvas: Rectangle, howManyRows: number, howManyColumns: number): CellSizeFunction {
    const equalRowSize = canvas.height / howManyRows

    const equalColumnSize = canvas.width / howManyColumns

    return (rowIndex: number, columnIndex: number) => new Rectangle(0, 0, equalColumnSize, equalRowSize)
}

export function geometricalCellSizeFunction(canvas: Rectangle, howManyRows: number, howManyColumns: number): CellSizeFunction {
    const columnSequence = getGeometricalSequence(canvas.width, howManyColumns)
    const rowSequence = getGeometricalSequence(canvas.height, howManyRows)


    return (rowIndex: number, columnIndex: number) => new Rectangle(0, 0, columnSequence[columnIndex], rowSequence[rowIndex])
}