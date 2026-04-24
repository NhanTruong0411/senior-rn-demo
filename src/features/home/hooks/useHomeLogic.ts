import { useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "@/shared";

import { getSampleTodoService, simulate401Service } from "../services";

/**
 * useHomeLogic():
 * Logic của HomeScreen — tách ra để screen chỉ còn render + bind event.
 *
 * Exposes:
 *   - apiMessage: string for display
 *   - runApiDemo(): normal API call (expect success)
 *   - runSimulate401(): call an endpoint that always returns 401 — tests auto-logout
 *   - onLogout(): manual logout action
 */
export const useHomeLogic = () => {
  const { logout } = useAuth();
  const [apiMessage, setApiMessage] = useState("Chưa chạy API mẫu cho Step 4.");

  /** Normal API call — expect success, display todo title. */
  const runApiDemo = async () => {
    setApiMessage("Đang gọi API...");
    const result = await getSampleTodoService();

    if (result.status === "success") {
      setApiMessage(`API success: #${result.data.id} - ${result.data.title}`);
      return;
    }

    const errorMessage = `API error: ${result.error.message} (${result.error.code})`;
    setApiMessage(errorMessage);
    Alert.alert("API call failed", errorMessage);
  };

  /**
   * Test flow: call an endpoint that returns 401.
   * Expected: client.ts handles 401 → triggerLogout → AuthProvider clears tokens → nav swaps to LoginScreen.
   */
  const runSimulate401 = async () => {
    setApiMessage("Đang test 401...");
    const result = await simulate401Service();

    if (result.status === "error") {
      setApiMessage(`401 test done: ${result.error.code}. Nên tự logout về LoginScreen.`);
    }
  };

  /** Manual logout button — clears tokens, nav swaps to AuthStack. */
  const onLogout = async () => {
    await logout();
  };

  return {
    apiMessage,
    runApiDemo,
    runSimulate401,
    onLogout,
  };
};
