/**
 * home/services/index.ts — network layer cho Home feature.
 *
 * Hai service ở đây có tính chất khác nhau:
 *
 * getSampleTodoService: gọi API public bên ngoài (jsonplaceholder).
 *   → Dùng axios instance riêng (không cần auth interceptors).
 *   → Throw lỗi trực tiếp — TanStack Query bắt và set isError.
 *
 * simulate401Service: mock local, không gọi network thật.
 *   → Chỉ trigger logout để test flow 401 của app.
 */

import axios from "axios";

import { triggerLogout } from "@/shared/auth/authBridge";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SampleTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type SampleTodoView = Readonly<Pick<SampleTodo, "id" | "title" | "completed">>;

export type SampleTodoPatch = Partial<Omit<SampleTodo, "id">>;

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance riêng cho demo API (jsonplaceholder).
//
// Tại sao không dùng apiClient chung?
// jsonplaceholder là API public, không cần Authorization header.
// Dùng apiClient chung sẽ thừa interceptors (gắn token, xử lý 401)
// cho 1 API không cần auth. Tách instance = rõ ràng, không side effect.
// ─────────────────────────────────────────────────────────────────────────────
const demoApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10_000,
  headers: { Accept: "application/json" },
});

/**
 * getSampleTodoService — lấy 1 todo mẫu từ API public.
 * Throw lỗi khi thất bại → TanStack Query bắt → isError = true.
 */
export async function getSampleTodoService(): Promise<SampleTodo> {
  const response = await demoApi.get<SampleTodo>("/todos/1");
  return response.data;
}

/**
 * simulate401Service — giả lập 401 locally để test flow auto-logout.
 * Không gọi network thật. Chỉ dùng ở môi trường dev/test.
 */
export async function simulate401Service(): Promise<void> {
  await triggerLogout();
}
