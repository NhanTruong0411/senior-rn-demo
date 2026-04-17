import { getTheme, type ThemeMode } from "@/shared";
import { useMemo, useState } from "react";
import { useColorScheme } from "react-native";

/**
 * useHomeUI():
 * Hook này chịu trách nhiệm state liên quan đến giao diện (UI state).
 *
 * Hook này làm gì?
 * - Quản lý light/dark mode (manual + system).
 * - Tính active theme để screen dùng khi render.
 * - Cung cấp action toggle mode cho nút bấm.
 *
 * Tại sao tách riêng?
 * - Tách biệt UI state và business logic.
 * - Dễ reuse nếu sau này có thêm HomeHeader/HomeBody component.
 */
export const useHomeUI = () => {
  const systemScheme = useColorScheme();
  const [manualMode, setManualMode] = useState<ThemeMode | null>(null);

  const activeMode: ThemeMode = manualMode ?? (systemScheme === "dark" ? "dark" : "light");
  const activeTheme = useMemo(() => getTheme(activeMode), [activeMode]);

  /**
   * toggleThemeMode():
   * Đảo qua lại giữa light và dark mode.
   */
  const toggleThemeMode = () => {
    setManualMode(activeMode === "light" ? "dark" : "light");
  };

  return {
    activeMode,
    activeTheme,
    toggleThemeMode,
  };
};
