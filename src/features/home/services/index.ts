import { get, type ApiError, type Result } from "@/shared";

/**
 * Kiểu dữ liệu mẫu dùng cho API demo ở feature `home`.
 *
 * Mục đích:
 * - Định nghĩa rõ data shape từ API.
 * - Giúp UI và hooks có type an toàn khi sử dụng kết quả API.
 */
export type SampleTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 * Base URL riêng cho API demo.
 *
 * Mục đích:
 * - Gom cấu hình endpoint vào service layer.
 * - Sau này đổi endpoint thì chỉ sửa 1 nơi.
 */
const DEMO_API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * getSampleTodoService():
 * Hàm service thuộc network layer, chỉ có nhiệm vụ gọi API.
 *
 * Hàm này làm gì?
 * - Gọi GET `/todos/1`.
 * - Trả về `Result<SampleTodo, ApiError>`.
 *
 * Lưu ý:
 * - Service KHÔNG xử lý state UI.
 * - Service KHÔNG show Alert.
 */
export const getSampleTodoService = (): Promise<Result<SampleTodo, ApiError>> =>
  get<SampleTodo>("/todos/1", {
    baseUrl: DEMO_API_BASE_URL,
  });
