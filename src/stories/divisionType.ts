export enum DivisionType {
  GRID = "grid",
  GOLDEN = "golden",
}

export const DIVISION_TYPE_CONTROL = {
  options: Object.keys(DivisionType),
  mapping: DivisionType,
  control: {
    type: "select",
  },
} as const;
