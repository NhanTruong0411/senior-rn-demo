/**
 * Shared color token shape for all theme modes.
 */
export type ThemeColors = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentPressed: string;
  onAccent: string;
  border: string;
};

/**
 * Light theme color tokens — data only, no logic.
 */
export const lightColors = {
  background: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  accent: "#2563EB",
  accentPressed: "#1D4ED8",
  onAccent: "#FFFFFF",
  border: "#E5E7EB",
} satisfies ThemeColors;

/**
 * Dark theme color tokens — same keys as lightColors.
 */
export const darkColors = {
  background: "#0B1220",
  textPrimary: "#F3F4F6",
  textSecondary: "#9CA3AF",
  accent: "#60A5FA",
  accentPressed: "#3B82F6",
  onAccent: "#0B1220",
  border: "#1F2937",
} satisfies ThemeColors;
