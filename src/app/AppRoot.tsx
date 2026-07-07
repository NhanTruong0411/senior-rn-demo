/**
 * AppRoot — application shell.
 *
 * Provider order (outermost → innermost):
 *   QueryClientProvider → AuthProvider → NavigationContainer → RootNavigator
 *
 * AuthProvider must wrap NavigationContainer because
 * RootNavigator calls useAuth() to decide which stack to render.
 */

import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@/shared";

import { RootNavigator } from "./navigation";
import { queryClient } from "./queryClient";

export function AppRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="dark" />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
