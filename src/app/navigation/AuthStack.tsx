/**
 * AuthStack — screens shown when user is NOT authenticated.
 * Currently: LoginScreen only.
 *
 * headerShown: false → login screens are usually fullscreen (no nav bar).
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@/features/auth";

import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
