/**
 * tokenStorage.ts — Lưu/đọc/xoá auth tokens an toàn.
 *
 * Dùng Expo SecureStore (iOS Keychain / Android Keystore) thay vì AsyncStorage
 * vì token là bí mật — phải mã hoá bởi hệ điều hành.
 *
 * Ai dùng file này?
 *   - AuthProvider: gọi saveTokens (login), clearTokens (logout), getAccessToken (restore).
 *   - API client (client.ts): gọi getAccessToken trước mỗi request.
 *
 * Error handling:
 *   - get → trả null nếu fail (giống "không có token" → 401 → logout tự nhiên).
 *   - save/clear → console.warn nếu fail (app không crash, user có thể retry).
 */

import * as SecureStore from "expo-secure-store";

/**
 * Storage keys — 1 source of truth.
 * Dùng constant để tránh typo khi gọi SecureStore ở nhiều chỗ.
 */
const KEYS = {
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
} as const;

/**
 * Lưu cả access token và refresh token vào SecureStore.
 * Gọi sau khi login thành công.
 */
export async function saveTokens(accessToken: string, refreshToken: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, accessToken);
    await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken);
  } catch (error) {
    console.warn("[tokenStorage] saveTokens failed:", error);
  }
}

/**
 * Đọc access token từ SecureStore.
 * Gọi bởi API client trước mỗi request (gắn vào Authorization header).
 * Trả null nếu không có token hoặc đọc lỗi.
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.warn("[tokenStorage] getAccessToken failed:", error);
    return null;
  }
}

/**
 * Đọc refresh token từ SecureStore.
 * Dùng cho refresh flow (chưa implement ở Day 5, chuẩn bị sẵn).
 * Trả null nếu không có hoặc đọc lỗi.
 */
export async function getRefreshToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.warn("[tokenStorage] getRefreshToken failed:", error);
    return null;
  }
}

/**
 * Xoá cả access token và refresh token khỏi SecureStore.
 * Gọi khi: logout, hoặc 401 handler detect token hết hạn.
 */
export async function clearTokens(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.warn("[tokenStorage] clearTokens failed:", error);
  }
}
