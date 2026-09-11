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

export const NiceGradient = {
  SUNSET_VIBES: ["#2B1055", "#75225B", "#D85848", "#F9A43E", "#FFD659"],
  OCEAN_BREEZE: ["#0B486B", "#1CB5E0", "#00C9FF", "#92FE9D"],
  CYBERPUNK_NEON: ["#3C1053", "#7122FA", "#F52585", "#00F0FF"],
  NORTHERN_LIGHTS: ["#160B39", "#182B5A", "#22B276", "#5BF49B", "#C655F0"],
  DARK_NEBULA: ["#0B001A", "#280F4C", "#5E1F6B", "#9E2A8B", "#D44E8D"],
  COTTON_CANDY: ["#FF9A9E", "#FECFEF", "#E0C3FC", "#8EC5FC"],
  MANGO_PAPAYA: ["#FF4E50", "#FF8008", "#FFB75E", "#F9D423"],
  SILVER_CHROME: ["#232526", "#414345", "#928DAB", "#EAEAEA", "#B2B2B2"],
  GOLD: ["#855C0B", "#C59D3F", "#F3E29F", "#DDB945", "#A67C00"],
  RGB: ["#FF0000", "#FF00FF", "#0000FF", "#00FFFF", "#00FF00"],

  SYNTHWAVE_DRIVE: ["#12092D", "#3B0964", "#911E81", "#E5338D", "#FF9255"],
  VOLCANIC_MAGMA: ["#4A0000", "#A80000", "#FF4500", "#FFA800", "#FFDF00"],
  TROPICAL_TOUCAN: ["#004D40", "#009688", "#4CAF50", "#FFEB3B", "#FF5252"],
  SOUR_GUMMY: ["#F9ED69", "#F08A5D", "#B83B5E", "#6A2C70"],
  SUPERNOVA_BLAST: ["#1A0B2E", "#47003F", "#82005E", "#FF2A00", "#FFC500"],
  MINT_LEMONADE: ["#00B4DB", "#0083B0", "#A8E063", "#56AB2F"],
  PEACOCK_FEATHERS: ["#051024", "#083D77", "#048BA8", "#16DB93", "#C5F94B"],
  DRAGON_FRUIT: ["#C40055", "#FF1493", "#FF69B4", "#FFD700", "#7CFC00"],
  VAPORWAVE_DREAM: ["#42047E", "#07F49E", "#00D4FF", "#FF00CC"],
  DEEP_ABYSS_GLOW: ["#020024", "#090979", "#005C97", "#363795", "#00D4FF"],
};

export const NiceGradientCompositions = {
  SUNSET_VIBES__DEEP_PURPLE: {
    background: "#120526",
    gradient: NiceGradient.SUNSET_VIBES,
  },
  SUNSET_VIBES__WARM_SAND: {
    background: "#FFF8F0",
    gradient: NiceGradient.SUNSET_VIBES,
  },

  OCEAN_BREEZE__DARK_NAVY: {
    background: "#031726",
    gradient: NiceGradient.OCEAN_BREEZE,
  },
  OCEAN_BREEZE__ICE_WHITE: {
    background: "#F2FAFD",
    gradient: NiceGradient.OCEAN_BREEZE,
  },

  CYBERPUNK_NEON__VOID_BLACK: {
    background: "#06010D",
    gradient: NiceGradient.CYBERPUNK_NEON,
  },

  NORTHERN_LIGHTS__NIGHT_SKY: {
    background: "#09041A",
    gradient: NiceGradient.NORTHERN_LIGHTS,
  },

  DARK_NEBULA__PITCH_BLACK: {
    background: "#030008",
    gradient: NiceGradient.DARK_NEBULA,
  },

  COTTON_CANDY__PURE_WHITE: {
    background: "#FFFFFF",
    gradient: NiceGradient.COTTON_CANDY,
  },
  COTTON_CANDY__MIDNIGHT_BLUE: {
    background: "#0B1021",
    gradient: NiceGradient.COTTON_CANDY,
  },

  MANGO_PAPAYA__DARK_CHARCOAL: {
    background: "#18181A",
    gradient: NiceGradient.MANGO_PAPAYA,
  },
  MANGO_PAPAYA__IVORY: {
    background: "#FFFCF5",
    gradient: NiceGradient.MANGO_PAPAYA,
  },

  SILVER_CHROME__MATTE_BLACK: {
    background: "#111213",
    gradient: NiceGradient.SILVER_CHROME,
  },

  GOLD__ROYAL_GREEN: {
    background: "#0A1F16",
    gradient: NiceGradient.GOLD,
  },
  GOLD__OBSIDIAN: {
    background: "#120D0A",
    gradient: NiceGradient.GOLD,
  },

  RGB__TRUE_BLACK: {
    background: "#000000",
    gradient: NiceGradient.RGB,
  },

  SYNTHWAVE_DRIVE__GRID_ABYSS: {
    background: "#090417",
    gradient: NiceGradient.SYNTHWAVE_DRIVE,
  },

  VOLCANIC_MAGMA__CHARRED_ROCK: {
    background: "#170A0A",
    gradient: NiceGradient.VOLCANIC_MAGMA,
  },

  TROPICAL_TOUCAN__JUNGLE_SHADE: {
    background: "#011A16",
    gradient: NiceGradient.TROPICAL_TOUCAN,
  },

  SOUR_GUMMY__DARK_GRAPE: {
    background: "#19081C",
    gradient: NiceGradient.SOUR_GUMMY,
  },

  SUPERNOVA_BLAST__DEEP_SPACE: {
    background: "#090312",
    gradient: NiceGradient.SUPERNOVA_BLAST,
  },

  MINT_LEMONADE__COOL_WATER: {
    background: "#E8FAFC",
    gradient: NiceGradient.MINT_LEMONADE,
  },
  MINT_LEMONADE__DARK_FOREST: {
    background: "#071F11",
    gradient: NiceGradient.MINT_LEMONADE,
  },

  PEACOCK_FEATHERS__MIDNIGHT_INDIGO: {
    background: "#02040D",
    gradient: NiceGradient.PEACOCK_FEATHERS,
  },

  DRAGON_FRUIT__DARK_MAGENTA: {
    background: "#1A000D",
    gradient: NiceGradient.DRAGON_FRUIT,
  },
  DRAGON_FRUIT__PALE_PINK: {
    background: "#FFF0F8",
    gradient: NiceGradient.DRAGON_FRUIT,
  },

  VAPORWAVE_DREAM__CRT_SCREEN: {
    background: "#0E021F",
    gradient: NiceGradient.VAPORWAVE_DREAM,
  },

  DEEP_ABYSS_GLOW__MARIANA_TRENCH: {
    background: "#01000A",
    gradient: NiceGradient.DEEP_ABYSS_GLOW,
  },
};
