export const VIEWBOX_SIZE = 24;

export const SCENARIO_WIDTH = 1080
export const SCENARIO_HEIGHT = 1350

export function toScenarioHeight(width: number) {
    return width / SCENARIO_WIDTH * SCENARIO_HEIGHT
}

export const PHI = (1 + Math.sqrt(5)) / 2;
