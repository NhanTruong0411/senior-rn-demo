import { AppText, Button, getTheme, spacing, type ThemeMode } from "@/shared";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, View, useColorScheme } from "react-native";

/**
 * Placeholder for the first vertical slice (list/detail/auth will follow the roadmap).
 */
export function HomeScreen() {
  const systemScheme = useColorScheme();
  const [manualMode, setManualMode] = useState<ThemeMode | null>(null);
  const activeMode: ThemeMode = manualMode ?? (systemScheme === "dark" ? "dark" : "light");
  const activeTheme = useMemo(() => getTheme(activeMode), [activeMode]);

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.colors.background }]}>
      <AppText variant="title" themeOverride={activeTheme}>
        Senior RN demo
      </AppText>
      <AppText variant="caption" themeOverride={activeTheme} style={styles.subtitle}>
        Day 3 — shared AppText/Button + light/dark theme
      </AppText>
      <Button
        label="Tap me"
        themeOverride={activeTheme}
        onPress={() => {
          Alert.alert("Day 3", "Shared Button works.");
        }}
        style={styles.button}
      />
      <Button
        label={`Switch to ${activeMode === "light" ? "dark" : "light"} mode`}
        variant="secondary"
        themeOverride={activeTheme}
        onPress={() => {
          setManualMode(activeMode === "light" ? "dark" : "light");
        }}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  button: {
    marginTop: spacing.sm,
    minWidth: 160,
  },
});
