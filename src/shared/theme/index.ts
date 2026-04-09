import { lightColors } from "./colors";
import { spacing } from "./spacing";

export const theme = {
  colors: lightColors,
  spacing,
} as const;

export type AppTheme = typeof theme;

export { lightColors } from "./colors";
export { spacing } from "./spacing";
