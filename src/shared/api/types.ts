export type ApiResponse<T> = {
  data: T;
  message?: string;
  meta?: {
    requestId?: string;
    timestamp?: string;
  };
};

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

export type ApiError = {
  code: ApiErrorCode | (string & {});
  message: string;
  status?: number;
  details?: Record<string, unknown>;
};

export type Result<T, E> = { status: "success"; data: T } | { status: "error"; error: E };
