import { useAuth } from "@/shared";

import { simulate401Service } from "../services";

/**
 * useHomeLogic — logic layer cho HomeScreen.
 * Tách khỏi component để HomeScreen chỉ còn render + bind event.
 */
export const useHomeLogic = () => {
  const { logout } = useAuth();

  const runSimulate401 = async () => {
    await simulate401Service();
  };

  const onLogout = async () => {
    await logout();
  };

  return { runSimulate401, onLogout };
};
