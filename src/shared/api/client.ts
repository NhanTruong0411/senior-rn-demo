/**
 * client.ts — HTTP client dùng chung cho toàn app.
 *
 * Đây là nơi DUY NHẤT gọi API. UI không gọi fetch trực tiếp.
 *
 * Cách hoạt động:
 *   1. UI gọi get() hoặc post().
 *   2. Hàm request() bên trong gọi fetch, xử lý response.
 *   3. Trả về Result: { status: "success", data } hoặc { status: "error", error }.
 *   4. UI chỉ cần check result.status — không cần try/catch.
 *
 * Scope hiện tại (Day 5 — Step 6):
 *   - request(), get(), post().
 *   - Real token từ SecureStore attach vào header Authorization.
 *   - 401 handler → trigger logout qua authBridge (clear tokens + set state unauthenticated).
 *   - Chưa có: refresh token, retry, cache.
 */

import { triggerLogout } from "../auth/authBridge";
import { getAccessToken } from "../auth/tokenStorage";

import type { ApiError, ApiResponse, Result } from "./types";

// ----------------------------------------------------------------
// Types — cấu hình cho mỗi request
// ----------------------------------------------------------------

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
  path: string;
  method?: HttpMethod;
  baseUrl?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

// ----------------------------------------------------------------
// Constants
// ----------------------------------------------------------------

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

// ----------------------------------------------------------------
// Helper duy nhất — ghép base URL và path thành full URL.
// Ví dụ: ("https://api.example.com", "/users") => "https://api.example.com/users"
// ----------------------------------------------------------------
const buildUrl = (baseUrl: string, path: string): string => {
  if (!baseUrl) return path;

  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const route = path.startsWith("/") ? path : `/${path}`;

  return `${base}${route}`;
};

/**
 * Xử lý tập trung khi server trả 401.
 * - Log cảnh báo để dễ debug.
 * - Trigger logout qua authBridge → AuthProvider clear tokens + set state unauthenticated.
 * - Navigation tự swap về AuthStack (không cần navigate thủ công).
 */
const handleUnauthorized = async (): Promise<void> => {
  console.warn("[API] 401 Unauthorized. Token có thể đã hết hạn hoặc không hợp lệ.");
  await triggerLogout();
};

// ----------------------------------------------------------------
// Hàm chính — đọc từ trên xuống dưới là hiểu toàn bộ flow
// ----------------------------------------------------------------

/**
 * request() — gọi fetch và trả về Result<T, ApiError>.
 *
 * Ví dụ sử dụng:
 *   const result = await request<User[]>({ path: "/users" });
 *
 *   if (result.status === "success") {
 *     console.log(result.data); // User[]
 *   }
 *   if (result.status === "error") {
 *     console.log(result.error.message); // "Not found" ...
 *   }
 *
 * Hàm này KHÔNG BAO GIỜ throw. Mọi lỗi đều nằm trong result.error.
 */
export const request = async <T>({
  path,
  method = "GET",
  baseUrl = DEFAULT_BASE_URL,
  headers,
  body,
}: RequestConfig): Promise<Result<T, ApiError>> => {
  try {
    // --- Bước 1: Chuẩn bị headers ---
    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headers,
    };

    if (body !== undefined) {
      requestHeaders["Content-Type"] = "application/json";
    }

    // --- Bước 2: Gắn access token (từ SecureStore) vào Authorization header ---
    // Nếu không có token (user chưa login hoặc đã logout), bỏ qua header này.
    const accessToken = await getAccessToken();
    if (accessToken) {
      requestHeaders.Authorization = `Bearer ${accessToken}`;
    }

    // --- Bước 3: Gọi fetch ---
    const response = await fetch(buildUrl(baseUrl, path), {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // --- Bước 4: Đọc response body (JSON) ---
    // Nếu body không phải JSON (ví dụ HTML 502), json() sẽ throw => ta bắt và trả undefined.
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = undefined;
    }

    // --- Bước 5: Nếu server trả lỗi (4xx, 5xx) => trả về error ---
    if (!response.ok) {
      if (response.status === 401) {
        await handleUnauthorized();
      }

      return {
        status: "error",
        error: {
          code: response.status === 401 ? "UNAUTHORIZED" : "UNKNOWN_ERROR",
          message:
            typeof payload === "object" &&
            payload !== null &&
            "message" in payload &&
            typeof (payload as Record<string, unknown>).message === "string"
              ? ((payload as Record<string, unknown>).message as string)
              : "Request failed",
          status: response.status,
        },
      };
    }

    // --- Bước 6: Thành công => lấy data từ response ---
    // Nhiều API trả về { data: T, message: "..." }. Ta chỉ cần T.
    // Nếu response không có field "data", trả nguyên payload.
    let data: T;

    if (typeof payload === "object" && payload !== null && "data" in payload) {
      data = (payload as ApiResponse<T>).data;
    } else {
      data = payload as T;
    }

    return { status: "success", data };
  } catch (error: unknown) {
    // --- Bước 7: Fetch throw (mất mạng, DNS fail, ...) => trả về network error ---
    return {
      status: "error",
      error: {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Network error",
      },
    };
  }
};

// ----------------------------------------------------------------
// Shortcuts — để UI gọi ngắn gọn hơn
// ----------------------------------------------------------------

/**
 * get() — shortcut cho GET request (lấy data, không có body).
 * Ví dụ: const result = await get<User[]>("/users");
 */
export const get = <T>(
  path: string,
  config?: Omit<RequestConfig, "path" | "method" | "body">,
): Promise<Result<T, ApiError>> => request<T>({ ...config, path, method: "GET" });

/**
 * post() — shortcut cho POST request (gửi data lên server).
 * Ví dụ: const result = await post<LoginResponse>("/auth/login", { email, password });
 */
export const post = <T, TBody = unknown>(
  path: string,
  body?: TBody,
  config?: Omit<RequestConfig, "path" | "method" | "body">,
): Promise<Result<T, ApiError>> => request<T>({ ...config, path, method: "POST", body });

export type { RequestConfig, HttpMethod };
