import type { ApiError, ApiResponse, Result } from "./types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
  path: string;
  method?: HttpMethod;
  baseUrl?: string;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

const STATUS_TO_ERROR_CODE: Record<number, ApiError["code"]> = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "VALIDATION_ERROR",
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const extractMessage = (payload: unknown, fallbackMessage: string): string => {
  if (isRecord(payload) && typeof payload.message === "string") {
    return payload.message;
  }

  if (typeof payload === "string" && payload.trim().length > 0) {
    return payload;
  }

  return fallbackMessage;
};

const getErrorCodeByStatus = (status: number): ApiError["code"] =>
  STATUS_TO_ERROR_CODE[status] ?? "UNKNOWN_ERROR";

const unwrapResponseData = <T>(payload: unknown): T => {
  if (isRecord(payload) && "data" in payload) {
    const apiResponse = payload as ApiResponse<T>;
    return apiResponse.data;
  }

  return payload as T;
};

const parsePayload = async (response: Response): Promise<unknown> => {
  const rawText = await response.text();

  if (!rawText) {
    return undefined;
  }

  try {
    return JSON.parse(rawText) as unknown;
  } catch {
    return rawText;
  }
};

const buildApiError = (
  payload: unknown,
  status?: number,
  fallbackMessage = "Request failed",
): ApiError => ({
  code: typeof status === "number" ? getErrorCodeByStatus(status) : "NETWORK_ERROR",
  message: extractMessage(payload, fallbackMessage),
  status,
  details: isRecord(payload) ? payload : undefined,
});

const buildUrl = (baseUrl: string, path: string): string => {
  if (!baseUrl) {
    return path;
  }

  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
};

export const request = async <T>({
  path,
  method = "GET",
  baseUrl = DEFAULT_BASE_URL,
  headers,
  body,
  signal,
}: RequestConfig): Promise<Result<T, ApiError>> => {
  try {
    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headers,
    };

    const requestInit: RequestInit = {
      method,
      headers: requestHeaders,
      signal,
    };

    if (typeof body !== "undefined") {
      const isFormDataBody = body instanceof FormData;

      if (!isFormDataBody) {
        requestHeaders["Content-Type"] = "application/json";
      }

      requestInit.body = isFormDataBody ? body : JSON.stringify(body);
    }

    const response = await fetch(buildUrl(baseUrl, path), requestInit);
    const payload = await parsePayload(response);

    if (!response.ok) {
      return {
        status: "error",
        error: buildApiError(payload, response.status),
      };
    }

    return {
      status: "success",
      data: unwrapResponseData<T>(payload),
    };
  } catch (error: unknown) {
    return {
      status: "error",
      error: buildApiError(
        undefined,
        undefined,
        error instanceof Error ? error.message : "Network error",
      ),
    };
  }
};

export const get = async <T>(
  path: string,
  config?: Omit<RequestConfig, "path" | "method" | "body">,
): Promise<Result<T, ApiError>> =>
  request<T>({
    ...config,
    path,
    method: "GET",
  });

export const post = async <T, TBody = unknown>(
  path: string,
  body?: TBody,
  config?: Omit<RequestConfig, "path" | "method" | "body">,
): Promise<Result<T, ApiError>> =>
  request<T>({
    ...config,
    path,
    method: "POST",
    body,
  });

export type { RequestConfig, HttpMethod };
