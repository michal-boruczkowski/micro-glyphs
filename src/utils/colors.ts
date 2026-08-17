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

export const TailwindGradients = {
  SUNSET_VIBES: [colors.rose[500], colors.orange[400], colors.yellow[300]],
  OCEAN_BREEZE: [colors.cyan[400], colors.blue[500], colors.indigo[600]],
  CYBERPUNK_NEON: [colors.fuchsia[600], colors.purple[600], colors.pink[500]],
  NORTHERN_LIGHTS: [colors.emerald[400], colors.teal[500], colors.cyan[500]],
  DARK_NEBULA: [colors.slate[900], colors.violet[900], colors.fuchsia[900]],
  COTTON_CANDY: [colors.pink[300], colors.purple[300], colors.indigo[300]],
  MANGO_PAPAYA: [colors.amber[300], colors.orange[500], colors.red[500]],
  SILVER_CHROME: [colors.slate[200], colors.zinc[400], colors.gray[600]],
  GOLD: [colors.yellow[700], colors.amber[200], colors.yellow[500]],
  RGB: [colors.red[500], colors.green[500], colors.blue[500]],
};
