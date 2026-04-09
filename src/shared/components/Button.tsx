import { theme } from "@/shared/theme";
import type { PressableProps } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = "primary", disabled = false, accessibilityRole = "button", style, ...rest }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable accessibilityRole={accessibilityRole} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.base, isPrimary ? styles.primary : styles.secondary, pressed && !disabled && (isPrimary ? styles.primaryPressed : styles.secondaryPressed), disabled && styles.disabled, style]} {...rest}>
      <Text style={[styles.label, isPrimary ? styles.labelOnPrimary : styles.labelSecondary, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  primaryPressed: {
    backgroundColor: theme.colors.accentPressed,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryPressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  labelOnPrimary: {
    color: theme.colors.onAccent,
  },
  labelSecondary: {
    color: theme.colors.textPrimary,
  },
  labelDisabled: {
    opacity: 0.9,
  },
});
