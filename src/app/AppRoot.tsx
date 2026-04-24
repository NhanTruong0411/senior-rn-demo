/**
 * AppRoot — application shell.
 *
 * Provider order (outermost → innermost):
 *   AuthProvider → NavigationContainer → RootNavigator
 *
 * AuthProvider must wrap NavigationContainer because
 * RootNavigator calls useAuth() to decide which stack to render.
 */

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@/shared";

import { RootNavigator } from "./navigation";

export function AppRoot() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </AuthProvider>
  );
}
