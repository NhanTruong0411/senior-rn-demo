/**
 * RootNavigator — the top-level navigator that decides which stack to show.
 *
 * This is the "auth flow pattern" from React Navigation docs:
 *   - State drives navigation (not navigate() calls).
 *   - When auth state changes, React Navigation swaps the entire stack automatically.
 *   - User cannot press Back to reach a protected screen after logout.
 *
 * States:
 *   "idle"            → loading indicator (checking SecureStore)
 *   "unauthenticated" → AuthStack (LoginScreen)
 *   "authenticated"   → AppStack (HomeScreen, ...)
 *   "loading"         → AuthStack stays visible (login in progress, spinner on LoginScreen)
 */

import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "@/shared";

import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export function RootNavigator() {
  const { status } = useAuth();

  if (status === "idle") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return status === "authenticated" ? <AppStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
