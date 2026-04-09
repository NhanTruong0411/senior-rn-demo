import { HomeScreen } from "@/features/home";
import { theme } from "@/shared";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

/**
 * Application shell: providers and root layout will live here in later days.
 */
export function AppRoot() {
  return (
    <View style={styles.root}>
      <HomeScreen />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
