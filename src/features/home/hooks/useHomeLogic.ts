import { useState } from "react";
import { Alert } from "react-native";
import { getSampleTodoService } from "../services";

/**
 * useHomeLogic():
 * Hook này chịu trách nhiệm "logic nghiệp vụ" của màn Home.
 *
 * Hook này làm gì?
 * - Gọi service để lấy data API.
 * - Chuyển kết quả API thành message để UI hiển thị.
 * - Quy định xử lý success/error tại một nơi.
 *
 * Tại sao tách riêng?
 * - HomeScreen gọn hơn, dễ đọc hơn.
 * - Dùng cho scale: logic tăng lên vẫn không làm screen rối.
 */
export const useHomeLogic = () => {
  const [apiMessage, setApiMessage] = useState("Chưa chạy API mẫu cho Step 4.");

  /**
   * runApiDemo():
   * Trigger 1 API call và xử lý theo `result.status`.
   *
   * Trong function này:
   * 1) Đặt message loading.
   * 2) Gọi service.
   * 3) Nếu success => hiển thị todo title.
   * 4) Nếu error => hiển thị message lỗi chuẩn hoá.
   */
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

  return {
    apiMessage,
    runApiDemo,
  };
};
