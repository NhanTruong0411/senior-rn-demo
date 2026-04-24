/**
 * AppStack — screens shown when user IS authenticated.
 * Currently: HomeScreen only. More screens will be added in later days.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@/features/home";

import type { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
}
