import { AppText, Button, theme } from "@/shared";
import { Alert, StyleSheet, View } from "react-native";

/**
 * Placeholder for the first vertical slice (list/detail/auth will follow the roadmap).
 */
export function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppText variant="title">Senior RN demo</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        Day 3 — light theme + shared AppText and Button
      </AppText>
      <Button
        label="Tap me"
        onPress={() => {
          Alert.alert("Day 3", "Shared Button works.");
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
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing.sm,
    minWidth: 160,
  },
});
