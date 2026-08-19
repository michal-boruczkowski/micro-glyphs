export enum DivisionType {
  GRID = "grid",
  GOLDEN = "golden",
  PERLIN = "perlin",
}

export const DIVISION_TYPE_CONTROL = {
  options: Object.keys(DivisionType),
  mapping: DivisionType,
  control: {
    type: "select",
  },
} as const;
