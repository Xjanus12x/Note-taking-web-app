import { SettingType } from "../models/Setting";

export const COLOR_SETTINGS: SettingType[] = [
  {
    icon: "sun",
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
    theme: "light",
  },
  {
    icon: "moon",
    title: "Dark Mode",
    description: "Select a sleek and modern dark theme",
    theme: "dark",
  },
];

export const FONT_SETTINGS: SettingType[] = [
  {
    icon: "sansSerif",
    title: "Sans Serif",
    description: "Clean and modern, easy to read.",
    font: "sans-serif",
  },
  {
    icon: "notoSerif",
    title: "Noto Serif",
    description: "Classic and elegant for timeless feel.",
    font: "noto-serif",
  },
  {
    icon: "monoSpace",
    title: "Monospace",
    description: "Code-like, great for technical vibe.",
    font: "source-code-pro",
  },
];
