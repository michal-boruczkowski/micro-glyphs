import colors from "tailwindcss/colors";

export const TAILWIND_COLORS = colors;

export type PresetColor = {
  color: string;
  title: string;
};

export const TAILWIND_PRESET_COLORS: PresetColor[] = [
  {
    color: "transparent",
    title: "transparent",
  },
  {
    color: colors.white,
    title: "white",
  },
  {
    color: colors.black,
    title: "black",
  },
  {
    color: colors.red[500],
    title: "red",
  },
  {
    color: colors.green[500],
    title: "green",
  },
  {
    color: colors.blue[500],
    title: "blue",
  },
  {
    color: colors.yellow[500],
    title: "yellow",
  },
  {
    color: colors.purple[500],
    title: "purple",
  },
  {
    color: colors.pink[500],
    title: "pink",
  },
];
