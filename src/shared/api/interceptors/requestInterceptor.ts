/**
 * requestInterceptor.ts — chặn TỪNG request trước khi gửi đi.
 *
 * Nhiệm vụ duy nhất: đọc access token từ storage và gắn vào header.
 * Viết 1 lần ở đây → mọi request của app đều có token, không cần nhớ gắn tay.
 */

import type { AxiosInstance } from "axios";

import { getAccessToken } from "@/shared/auth/tokenStorage";

/**
 * setupRequestInterceptor — đăng ký interceptor vào axios instance.
 * Được gọi 1 lần duy nhất khi khởi tạo axiosInstance.
 */
export function setupRequestInterceptor(client: AxiosInstance): void {
  client.interceptors.request.use(async (config) => {
    // Đọc access token mới nhất từ SecureStore trước mỗi request.
    // Quan trọng: đọc lại mỗi lần (không cache) vì token có thể vừa được refresh.
    const token = await getAccessToken();

    if (token) {
      // Gắn token vào header Authorization theo chuẩn Bearer.
      // Mọi API được gọi qua apiClient đều tự động có header này.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}
