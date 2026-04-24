import { AppText, Button, spacing } from "@/shared";
import { Alert, StyleSheet, View } from "react-native";
import { useHomeLogic, useHomeUI } from "./hooks";

/**
 * Placeholder for the first vertical slice (list/detail/auth will follow the roadmap).
 */
export function HomeScreen() {
  /**
   * UI state (theme, mode) duoc lay tu useHomeUI.
   * Muc dich: HomeScreen chi con render + bind event, khong giu qua nhieu state.
   */
  const { activeMode, activeTheme, toggleThemeMode } = useHomeUI();

  /**
   * Business logic (goi API + xu ly ket qua) duoc lay tu useHomeLogic.
   * Muc dich: tach logic nghiep vu khoi UI layer de de scale.
   */
  const { apiMessage, runApiDemo, runSimulate401, onLogout } = useHomeLogic();

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.colors.background }]}>
      <AppText variant="title" themeOverride={activeTheme}>
        Senior RN demo
      </AppText>
      <AppText variant="caption" themeOverride={activeTheme} style={styles.subtitle}>
        Day 4 — Step 4 API flow with result.status
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
        onPress={toggleThemeMode}
        style={styles.button}
      />
      <Button
        label="Run Step 4 API call"
        themeOverride={activeTheme}
        onPress={runApiDemo}
        style={styles.button}
      />
      <Button
        label="Simulate 401 (auto logout)"
        variant="secondary"
        themeOverride={activeTheme}
        onPress={runSimulate401}
        style={styles.button}
      />
      <Button
        label="Logout"
        variant="secondary"
        themeOverride={activeTheme}
        onPress={onLogout}
        style={styles.button}
      />
      <AppText variant="caption" themeOverride={activeTheme} style={styles.apiMessage}>
        {apiMessage}
      </AppText>
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
  apiMessage: {
    marginTop: spacing.md,
    textAlign: "center",
  },
});
