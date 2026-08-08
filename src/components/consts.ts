export const PHI = (1 + Math.sqrt(5)) / 2;

export const VIEWBOX_SIZE = 24;

export const SCENARIO_WIDTH = 1080;
export const SCENARIO_HEIGHT = 1350;

export function toScenarioHeight(width: number) {
  return (width / 4) * 5;
}

export function toScenarioPadding(width: number) {
  return (width * 60) / SCENARIO_WIDTH;
}

export function getScenarioLimit(mul = 1) {
  return 4 * 5 * mul ** 2;
}

export function getScenarioColumns(howManyItems: number) {
  if (howManyItems < 4) {
    return 1;
  }

  if (howManyItems <= 8) {
    return 2;
  }

  if (howManyItems <= 16) {
    return Math.ceil(Math.sqrt(howManyItems));
  }

  const mul = Math.sqrt(howManyItems / (4 * 5)); //mul * 4 * mul * 5 = howManyItems

  return Math.ceil(mul * 4); //how many repetitions with 4 columns?
}
