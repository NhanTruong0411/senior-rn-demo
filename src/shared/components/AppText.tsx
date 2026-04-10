import { theme } from "@/shared/theme";
import type { AppTheme } from "@/shared/theme";
import type { TextProps } from "react-native";
import { StyleSheet, Text } from "react-native";

export type AppTextVariant = "title" | "body" | "caption";
export type AppTextColorToken = keyof AppTheme["colors"];

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  colorToken?: AppTextColorToken;
  themeOverride?: AppTheme;
}

const variantStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  caption: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

export function AppText({
  variant = "body",
  colorToken,
  themeOverride,
  style,
  ...rest
}: AppTextProps) {
  const activeTheme = themeOverride ?? theme;
  const defaultColor =
    variant === "caption" ? activeTheme.colors.textSecondary : activeTheme.colors.textPrimary;
  const colorStyle = {
    color: colorToken ? activeTheme.colors[colorToken] : defaultColor,
  };

  return <Text style={[variantStyles[variant], colorStyle, style]} {...rest} />;
}
