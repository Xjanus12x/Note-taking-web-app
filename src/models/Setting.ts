import { IconType } from "../ui/icons";

export type FontStyles = "sans-serif" | "noto-serif" | "source-code-pro";
export type Theme = "light" | "dark";

export type SettingType = {
  icon: IconType;
  title: string;
  description: string;
  font?: FontStyles;
  theme?: Theme;
};

export type StylePreferences = {
  font: FontStyles;
  theme: Theme;
};
