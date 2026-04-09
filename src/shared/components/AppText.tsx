import { theme } from "@/shared/theme";
import type { TextProps } from "react-native";
import { Text } from "react-native";

export type AppTextVariant = "title" | "body" | "caption";

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
}

const variantStyle = {
  title: {
    fontSize: 20,
    fontWeight: "600" as const,
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
};

export function AppText({ variant = "body", style, ...rest }: AppTextProps) {
  return <Text style={[variantStyle[variant], style]} {...rest} />;
}
