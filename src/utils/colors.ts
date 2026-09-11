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
  // ==========================================
  // 🌙 CIEMNE TŁA (DARK THEMES)
  // ==========================================

  SUNSET_VIBES__DARK: {
    background: "#120526", // Głęboki, ciepły fiolet
    gradient: NiceGradient.SUNSET_VIBES,
  },
  OCEAN_BREEZE__DARK: {
    background: "#02111A", // Bardzo ciemny morski granat
    gradient: NiceGradient.OCEAN_BREEZE,
  },
  CYBERPUNK_NEON__DARK: {
    background: "#0A0014", // Niemal czarny fiolet (Cyberpunk void)
    gradient: NiceGradient.CYBERPUNK_NEON,
  },
  NORTHERN_LIGHTS__DARK: {
    background: "#050A0E", // Głębokie nocne niebo z nutą granatu
    gradient: NiceGradient.NORTHERN_LIGHTS,
  },
  DARK_NEBULA__DARK: {
    background: "#05000A", // Kosmiczna, smolista czerń
    gradient: NiceGradient.DARK_NEBULA,
  },
  COTTON_CANDY__DARK: {
    background: "#1A101C", // Ciemna, zgaszona śliwka
    gradient: NiceGradient.COTTON_CANDY,
  },
  MANGO_PAPAYA__DARK: {
    background: "#1A0800", // Bardzo ciemny, ciepły brąz
    gradient: NiceGradient.MANGO_PAPAYA,
  },
  SILVER_CHROME__DARK: {
    background: "#0F0F0F", // Neutralna, matowa czerń
    gradient: NiceGradient.SILVER_CHROME,
  },
  GOLD__DARK: {
    background: "#140E00", // Głęboka czerń z delikatną nutą oliwkowego złota
    gradient: NiceGradient.GOLD,
  },
  RGB__DARK: {
    background: "#050505", // Klasyczna czerń RGB
    gradient: NiceGradient.RGB,
  },
  SYNTHWAVE_DRIVE__DARK: {
    background: "#0B021A", // Bardzo ciemny, nasycony fiolet
    gradient: NiceGradient.SYNTHWAVE_DRIVE,
  },
  VOLCANIC_MAGMA__DARK: {
    background: "#0A0000", // Węglowa czerń z czerwoną poświatą
    gradient: NiceGradient.VOLCANIC_MAGMA,
  },
  TROPICAL_TOUCAN__DARK: {
    background: "#00140D", // Najciemniejsza zieleń dżungli
    gradient: NiceGradient.TROPICAL_TOUCAN,
  },
  SOUR_GUMMY__DARK: {
    background: "#170A11", // Ciemna wiśnia
    gradient: NiceGradient.SOUR_GUMMY,
  },
  SUPERNOVA_BLAST__DARK: {
    background: "#0D0012", // Przestrzeń kosmiczna przed wybuchem
    gradient: NiceGradient.SUPERNOVA_BLAST,
  },
  MINT_LEMONADE__DARK: {
    background: "#001214", // Bardzo ciemny, chłodny świerk
    gradient: NiceGradient.MINT_LEMONADE,
  },
  PEACOCK_FEATHERS__DARK: {
    background: "#01050A", // Północny, atramentowy granat
    gradient: NiceGradient.PEACOCK_FEATHERS,
  },
  DRAGON_FRUIT__DARK: {
    background: "#140008", // Czarno-różowa głębia
    gradient: NiceGradient.DRAGON_FRUIT,
  },
  VAPORWAVE_DREAM__DARK: {
    background: "#090014", // Nostalgiczna cyfrowa czerń
    gradient: NiceGradient.VAPORWAVE_DREAM,
  },
  DEEP_ABYSS_GLOW__DARK: {
    background: "#00010A", // Rów Mariański
    gradient: NiceGradient.DEEP_ABYSS_GLOW,
  },

  // ==========================================
  // ☀️ JASNE TŁA (LIGHT THEMES)
  // ==========================================

  SUNSET_VIBES__LIGHT: {
    background: "#FFF5E6", // Ciepła, złamana biel o zachodzie
    gradient: NiceGradient.SUNSET_VIBES,
  },
  OCEAN_BREEZE__LIGHT: {
    background: "#F0F9FF", // Delikatny błękit lodowy
    gradient: NiceGradient.OCEAN_BREEZE,
  },
  CYBERPUNK_NEON__LIGHT: {
    background: "#F8F0FA", // Złamana biel z różowym tonem
    gradient: NiceGradient.CYBERPUNK_NEON,
  },
  NORTHERN_LIGHTS__LIGHT: {
    background: "#F0FFF4", // Miętowa, arktyczna biel
    gradient: NiceGradient.NORTHERN_LIGHTS,
  },
  DARK_NEBULA__LIGHT: {
    background: "#F6F2FA", // Perłowy lila
    gradient: NiceGradient.DARK_NEBULA,
  },
  COTTON_CANDY__LIGHT: {
    background: "#FFF0F5", // Czysty odcień Lavender Blush
    gradient: NiceGradient.COTTON_CANDY,
  },
  MANGO_PAPAYA__LIGHT: {
    background: "#FFFBF0", // Kremowo-waniliowy
    gradient: NiceGradient.MANGO_PAPAYA,
  },
  SILVER_CHROME__LIGHT: {
    background: "#F8F9FA", // Chłodny, sterylny szaro-biały
    gradient: NiceGradient.SILVER_CHROME,
  },
  GOLD__LIGHT: {
    background: "#FFFAF0", // Odcień Floral White, kość słoniowa
    gradient: NiceGradient.GOLD,
  },
  RGB__LIGHT: {
    background: "#FAFAFA", // Neutralna, czysta biel
    gradient: NiceGradient.RGB,
  },
  SYNTHWAVE_DRIVE__LIGHT: {
    background: "#FCE4EC", // Pastelowy, jasny róż
    gradient: NiceGradient.SYNTHWAVE_DRIVE,
  },
  VOLCANIC_MAGMA__LIGHT: {
    background: "#FFF0E6", // Bardzo jasna brzoskwinia
    gradient: NiceGradient.VOLCANIC_MAGMA,
  },
  TROPICAL_TOUCAN__LIGHT: {
    background: "#F1F8F5", // Chłodna, świetlista zieleń
    gradient: NiceGradient.TROPICAL_TOUCAN,
  },
  SOUR_GUMMY__LIGHT: {
    background: "#FFF0F5", // Odcień słodkiej różowej waty
    gradient: NiceGradient.SOUR_GUMMY,
  },
  SUPERNOVA_BLAST__LIGHT: {
    background: "#FFF0F0", // Subtelnie ocieplona biel
    gradient: NiceGradient.SUPERNOVA_BLAST,
  },
  MINT_LEMONADE__LIGHT: {
    background: "#F0FFF0", // Odcień Honeydew (jasny melon)
    gradient: NiceGradient.MINT_LEMONADE,
  },
  PEACOCK_FEATHERS__LIGHT: {
    background: "#E0F7FA", // Cyanowa biel
    gradient: NiceGradient.PEACOCK_FEATHERS,
  },
  DRAGON_FRUIT__LIGHT: {
    background: "#FFF0F6", // Jasna, pastelowa magenta
    gradient: NiceGradient.DRAGON_FRUIT,
  },
  VAPORWAVE_DREAM__LIGHT: {
    background: "#F4F0FF", // Pastelowy, chłodny fiolet bieli
    gradient: NiceGradient.VAPORWAVE_DREAM,
  },
  DEEP_ABYSS_GLOW__LIGHT: {
    background: "#E6F2FF", // Jasny, wodnisty błękit
    gradient: NiceGradient.DEEP_ABYSS_GLOW,
  },
};
