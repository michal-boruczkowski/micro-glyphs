export const PHI = (1 + Math.sqrt(5)) / 2;

export function phiScale(value: number, steps: number = 1) {
  return value / PHI ** steps;
}

export const VIEWBOX_SIZE = 24;

export const SCENARIO_WIDTH = 1080;
export const SCENARIO_HEIGHT = 1350;

export function toScenarioHeight(width: number) {
  return (width / 4) * 5;
}

export function toScenarioPadding(width: number) {
  return phiScale(width, 6);
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

  if (howManyItems <= 12) {
    return 3;
  }

  // if (howManyItems <= 16) {
  //   return Math.round(Math.sqrt(howManyItems));
  // }

  const mul = Math.sqrt(howManyItems / (4 * 5)); //mul * 4 * mul * 5 = howManyItems

  return Math.round(mul * 4); //how many repetitions with 4 columns?
}
