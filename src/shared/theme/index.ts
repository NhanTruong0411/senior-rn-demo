import { darkColors, lightColors } from "./colors";
import { spacing } from "./spacing";

export type ThemeMode = "light" | "dark";

export const lightTheme = {
  colors: lightColors,
  spacing,
} as const;

export const darkTheme = {
  colors: darkColors,
  spacing,
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export const getTheme = (mode: ThemeMode): AppTheme => themes[mode];

/**
 * Backward-compatible export used by current components/screens.
 */
export const theme = lightTheme;

export type AppTheme = typeof lightTheme;

export { darkColors, lightColors } from "./colors";
export { spacing } from "./spacing";
