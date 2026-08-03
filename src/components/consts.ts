export const VIEWBOX_SIZE = 24;

export const SCENARIO_WIDTH = 1080
export const SCENARIO_HEIGHT = 1350

export function toScenarioHeight(width: number) {
    return width / 4 * 5
}

export function toScenarioPadding(width: number) {
    return width * 60 / SCENARIO_WIDTH
}


export const PHI = (1 + Math.sqrt(5)) / 2;
