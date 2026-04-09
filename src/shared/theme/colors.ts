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
} as const;

export type LightColors = typeof lightColors;
