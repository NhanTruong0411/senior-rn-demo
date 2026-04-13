/**
 * client.ts — HTTP client dung chung cho toan app.
 *
 * Day la noi DUY NHAT goi API. UI khong goi fetch truc tiep.
 *
 * Cach hoat dong:
 *   1. UI goi get() hoac post().
 *   2. Ham request() ben trong goi fetch, xu ly response.
 *   3. Tra ve Result: { status: "success", data } hoac { status: "error", error }.
 *   4. UI chi can check result.status — khong can try/catch.
 *
 * Scope hien tai (Step 2 — Day 4):
 *   Chi co request(), get(), post().
 *   Chua co: interceptor, token, retry, cache.
 */

import type { ApiError, ApiResponse, Result } from "./types";

// ----------------------------------------------------------------
// Types — cau hinh cho moi request
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
// Helper duy nhat — ghep base URL va path thanh full URL.
// Vi du: ("https://api.example.com", "/users") => "https://api.example.com/users"
// ----------------------------------------------------------------
const buildUrl = (baseUrl: string, path: string): string => {
  if (!baseUrl) return path;

  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const route = path.startsWith("/") ? path : `/${path}`;

  return `${base}${route}`;
};

// ----------------------------------------------------------------
// Ham chinh — doc tu tren xuong duoi la hieu toan bo flow
// ----------------------------------------------------------------

/**
 * request() — goi fetch va tra ve Result<T, ApiError>.
 *
 * Vi du su dung:
 *   const result = await request<User[]>({ path: "/users" });
 *
 *   if (result.status === "success") {
 *     console.log(result.data); // User[]
 *   }
 *   if (result.status === "error") {
 *     console.log(result.error.message); // "Not found" ...
 *   }
 *
 * Ham nay KHONG BAO GIO throw. Moi loi deu nam trong result.error.
 */
export const request = async <T>({
  path,
  method = "GET",
  baseUrl = DEFAULT_BASE_URL,
  headers,
  body,
}: RequestConfig): Promise<Result<T, ApiError>> => {
  try {
    // --- Buoc 1: Chuan bi headers ---
    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headers,
    };

    if (body !== undefined) {
      requestHeaders["Content-Type"] = "application/json";
    }

    // --- Buoc 2: Goi fetch ---
    const response = await fetch(buildUrl(baseUrl, path), {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // --- Buoc 3: Doc response body (JSON) ---
    // Neu body khong phai JSON (vi du HTML 502), json() se throw => ta bat va tra undefined.
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = undefined;
    }

    // --- Buoc 4: Neu server tra loi (4xx, 5xx) => tra ve error ---
    if (!response.status) {
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

    // --- Buoc 5: Thanh cong => lay data tu response ---
    // Nhieu API tra ve { data: T, message: "..." }. Ta chi can T.
    // Neu response khong co field "data", tra nguyen payload.
    let data: T;

    if (typeof payload === "object" && payload !== null && "data" in payload) {
      data = (payload as ApiResponse<T>).data;
    } else {
      data = payload as T;
    }

    return { status: "success", data };
  } catch (error: unknown) {
    // --- Buoc 6: Fetch throw (mat mang, DNS fail, ...) => tra ve network error ---
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
// Shortcuts — de UI goi ngan gon hon
// ----------------------------------------------------------------

/**
 * get() — shortcut cho GET request (lay data, khong co body).
 * Vi du: const result = await get<User[]>("/users");
 */
export const get = <T>(
  path: string,
  config?: Omit<RequestConfig, "path" | "method" | "body">,
): Promise<Result<T, ApiError>> => request<T>({ ...config, path, method: "GET" });

/**
 * post() — shortcut cho POST request (gui data len server).
 * Vi du: const result = await post<LoginResponse>("/auth/login", { email, password });
 */
export const post = <T, TBody = unknown>(
  path: string,
  body?: TBody,
  config?: Omit<RequestConfig, "path" | "method" | "body">,
): Promise<Result<T, ApiError>> => request<T>({ ...config, path, method: "POST", body });

export type { RequestConfig, HttpMethod };
