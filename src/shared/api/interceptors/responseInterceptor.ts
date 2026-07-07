/**
 * responseInterceptor.ts — chặn TỪNG response trả về.
 *
 * Nhiệm vụ: xử lý lỗi 401 theo pattern Singleton Refresh Promise.
 *
 * Logic:
 *   - Response thành công (2xx) → cho qua thẳng.
 *   - Lỗi không phải 401 → ném lỗi ra như bình thường.
 *   - Lỗi 401 lần đầu → gọi ensureFreshToken() → retry request cũ.
 *   - Lỗi 401 sau khi đã retry → refresh thất bại → logout.
 *
 * Singleton: dù 10 request cùng nhận 401, chỉ 1 lần gọi refresh API.
 * Cơ chế singleton nằm trong refreshService.ts, không phải ở đây.
 */

import axios from "axios";
import type { AxiosInstance } from "axios";

import { triggerLogout } from "@/shared/auth/authBridge";
import { ensureFreshToken } from "@/shared/auth/refreshService";

// Mở rộng kiểu của AxiosRequestConfig để thêm field _isRetry.
// Đây là cách chuẩn của TypeScript khi cần thêm field vào kiểu của thư viện ngoài.
// _isRetry = true nghĩa là "request này đã được retry 1 lần sau khi refresh token".
declare module "axios" {
  interface InternalAxiosRequestConfig {
    _isRetry?: boolean;
  }
}

/**
 * setupResponseInterceptor — đăng ký interceptor vào axios instance.
 * Được gọi 1 lần duy nhất khi khởi tạo axiosInstance.
 */
export function setupResponseInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    // Response thành công (status 2xx) → trả về nguyên, không làm gì.
    (response) => response,

    // Response lỗi → vào đây xử lý.
    async (error: unknown) => {
      // Kiểm tra có phải lỗi axios không (tránh nhầm với lỗi JS thông thường).
      // Và kiểm tra có phải 401 không — nếu không phải thì đẩy lỗi ra ngoài.
      // eslint-disable-next-line import/no-named-as-default-member
      if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // === Đến đây là đang xử lý 401 ===

      // _isRetry = true → request này đã được retry sau khi refresh rồi
      // mà vẫn bị 401 → refresh token cũng hết hạn hoặc server từ chối.
      // Không retry nữa, logout thẳng để tránh vòng lặp vô tận.
      if (error.config?._isRetry) {
        await triggerLogout();
        return Promise.reject(error);
      }

      // Lần 401 đầu tiên → gọi ensureFreshToken().
      // Dù có 10 request cùng vào đây cùng lúc, ensureFreshToken() đảm bảo
      // chỉ 1 lần gọi API refresh. 9 request còn lại chờ kết quả của lần đầu.
      const newToken = await ensureFreshToken();

      // refresh thất bại (null) → không còn cứu được → logout.
      if (!newToken) {
        await triggerLogout();
        return Promise.reject(error);
      }

      // Refresh thành công → token mới đã lưu vào SecureStore.
      // Đánh dấu _isRetry = true để nếu 401 lại thì không retry nữa.
      // Gửi lại request cũ — requestInterceptor sẽ tự gắn token mới vào.
      error.config!._isRetry = true;
      return client(error.config!);
    },
  );
}
