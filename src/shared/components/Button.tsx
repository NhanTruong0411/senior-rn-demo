import { theme } from "@/shared/theme";
import type { AppTheme } from "@/shared/theme";
import { useState } from "react";
import type {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends Omit<TouchableOpacityProps, "children" | "style"> {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  themeOverride?: AppTheme;
}

export function Button({
  label,
  onPress,
  onPressIn,
  onPressOut,
  variant = "primary",
  disabled = false,
  accessibilityRole = "button",
  accessibilityLabel,
  activeOpacity = 0.85,
  style,
  themeOverride,
  accessibilityState,
  ...rest
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const activeTheme = themeOverride ?? theme;
  const isPrimary = variant === "primary";
  const mergedAccessibilityState = {
    ...accessibilityState,
    disabled,
  } as const;

  const handlePressIn = (event: GestureResponderEvent) => {
    setIsPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setIsPressed(false);
    onPressOut?.(event);
  };

  const buttonStyle = [
    styles.base,
    {
      backgroundColor: isPrimary ? activeTheme.colors.accent : "transparent",
      borderWidth: isPrimary ? 0 : 1,
      borderColor: isPrimary ? "transparent" : activeTheme.colors.border,
    },
    isPressed &&
      !disabled &&
      (isPrimary ? { backgroundColor: activeTheme.colors.accentPressed } : styles.secondaryPressed),
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={mergedAccessibilityState}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={buttonStyle}
      {...rest}
    >
      <Text
        style={[
          styles.label,
          {
            color: isPrimary ? activeTheme.colors.onAccent : activeTheme.colors.textPrimary,
          },
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
  labelDisabled: {
    opacity: 0.9,
  },
});
