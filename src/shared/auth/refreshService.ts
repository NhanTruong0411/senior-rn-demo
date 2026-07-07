/**
 * refreshService.ts — Singleton Refresh Promise.
 *
 * Giải quyết vấn đề: khi 10 request cùng nhận 401,
 * chỉ gọi API refresh token 1 lần duy nhất.
 * 9 request còn lại await cùng 1 promise — không tạo thêm.
 *
 * Tại sao dùng axios thuần (không phải apiClient)?
 * Nếu dùng apiClient → khi /auth/refresh bị 401 → responseInterceptor
 * gọi ensureFreshToken() lại → vòng lặp vô tận → app treo.
 * Dùng axios thuần = thoát khỏi interceptor chain của app.
 */

import axios from "axios";

import { getRefreshToken, saveTokens } from "./tokenStorage";

// ─────────────────────────────────────────────────────────────────────────────
// "Tấm biển đang có người làm rồi"
//
// null         → chưa có ai đang refresh, người đến đầu tiên tạo promise
// có giá trị  → đang có refresh đang chạy, người đến sau chờ promise này
// ─────────────────────────────────────────────────────────────────────────────
let refreshPromise: Promise<string | null> | null = null;

/**
 * Gọi API /auth/refresh để đổi refresh token lấy cặp token mới.
 * Hàm private — chỉ được gọi bởi ensureFreshToken().
 *
 * Trả về: access token mới nếu thành công, null nếu thất bại.
 */
async function callRefreshTokenApi(): Promise<string | null> {
  const refreshToken = await getRefreshToken();

  // Không có refresh token trong storage → không thể refresh
  if (!refreshToken) return null;

  try {
    // Dùng axios thuần (không phải apiClient) để tránh vòng lặp interceptor.
    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`, { refreshToken });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Lưu cặp token mới vào SecureStore.
    // Từ đây, requestInterceptor sẽ đọc được accessToken mới này.
    await saveTokens(accessToken, newRefreshToken);

    return accessToken;
  } catch {
    // Refresh token hết hạn, bị revoke, hoặc server lỗi → trả null
    return null;
  }
}

/**
 * ensureFreshToken — hàm PUBLIC duy nhất.
 * Được gọi bởi responseInterceptor khi gặp 401.
 *
 * Singleton logic:
 *   - Chưa có promise → TÔI tạo promise, lưu vào biến, treo tấm biển
 *   - Đã có promise → TÔI chờ promise đó, không tạo thêm
 *   - Dù 10 request gọi hàm này cùng lúc → chỉ 1 lần gọi API
 */
export async function ensureFreshToken(): Promise<string | null> {
  if (!refreshPromise) {
    // Người đầu tiên → tạo promise và lưu vào biến module-level
    refreshPromise = callRefreshTokenApi().finally(() => {
      // finally đảm bảo reset dù thành công hay thất bại.
      // Nếu dùng .then: khi callRefreshTokenApi() throw → .then không chạy
      // → biến mãi không về null → lần sau app không bao giờ thử refresh nữa.
      refreshPromise = null;
    });
  }

  // Tất cả (kể cả người đầu tiên) đều await cùng 1 promise
  return refreshPromise;
}
