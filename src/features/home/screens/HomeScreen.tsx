import { AppText, Button, spacing } from "@/shared";
import { Alert, StyleSheet, View } from "react-native";
import { useHomeLogic, useHomeUI, useSampleTodo } from "../hooks";

/**
 * Placeholder for the first vertical slice (list/detail/auth will follow the roadmap).
 */
export function HomeScreen() {
  /**
   * UI state (theme, mode) duoc lay tu useHomeUI.
   * Muc dich: HomeScreen chi con render + bind event, khong giu qua nhieu state.
   */
  const { activeMode, activeTheme, toggleThemeMode } = useHomeUI();

  /** Action logic cho auth/demo side-effects khong lien quan fetch todo. */
  const { runSimulate401, onLogout } = useHomeLogic();

  /**
   * Server-state cho sample todo duoc lay tu TanStack Query hook.
   * Muc dich: man hinh chi render loading/error/success thay vi goi service truc tiep.
   */
  const { data, isLoading, isError, error, refetch } = useSampleTodo();

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.colors.background }]}>
      <AppText variant="title" themeOverride={activeTheme}>
        Senior RN demo
      </AppText>
      <AppText variant="caption" themeOverride={activeTheme} style={styles.subtitle}>
        Day 29-04 — Step 3 Query hook states
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
        {isLoading && "Loading todo..."}
        {isError && `Failed to load todo: ${error.message}`}
        {!isLoading && !isError && `Todo #${data?.id ?? "-"}: ${data?.title ?? "No todo"}`}
      </AppText>
      {isError && (
        <Button
          label="Retry todo query"
          variant="secondary"
          themeOverride={activeTheme}
          onPress={() => {
            void refetch();
          }}
          style={styles.button}
        />
      )}
      {!isLoading && !isError && (
        <AppText variant="caption" themeOverride={activeTheme} style={styles.apiMessage}>
          Completed: {data?.completed ? "Yes" : "No"}
        </AppText>
      )}
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
