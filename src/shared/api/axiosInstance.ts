/**
 * axiosInstance.ts — HTTP client dùng chung cho toàn app.
 *
 * File này làm 3 việc:
 *   1. Tạo 1 axios instance với cấu hình mặc định (baseURL, timeout, headers).
 *   2. Đăng ký request interceptor (gắn Bearer token vào mọi request).
 *   3. Đăng ký response interceptor (xử lý 401 + Singleton Refresh).
 *
 * Mọi API call trong app đều dùng `apiClient` từ file này.
 * Không ai gọi `axios.get(...)` trực tiếp — luôn qua `apiClient`.
 *
 * Ngoại lệ duy nhất: refreshService.ts dùng `axios` thuần để gọi /auth/refresh.
 * Lý do: nếu dùng apiClient thì khi /auth/refresh bị 401, interceptor sẽ gọi
 * refresh lại → vòng lặp vô tận. Dùng `axios` thuần để thoát vòng lặp đó.
 */

import axios from "axios";

import { setupRequestInterceptor, setupResponseInterceptor } from "./interceptors";

// Tạo instance với cấu hình mặc định.
// Tất cả request gửi đi đều mang những config này, trừ khi override tường minh.
// eslint-disable-next-line import/no-named-as-default-member
export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
  timeout: 10_000, // 10 giây — nếu server không trả lời → ném lỗi timeout
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Đăng ký interceptors — thứ tự quan trọng:
// request trước, response sau.
setupRequestInterceptor(apiClient);
setupResponseInterceptor(apiClient);
