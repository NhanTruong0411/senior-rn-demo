/**
 * API layer types: response envelope, errors as discriminated union, Result.
 *
 * ApiError dùng field `kind` để TypeScript narrow từng variant — tránh optional lung tung.
 */

export type ApiResponse<T> = {
  data: T;
  message?: string;
  meta?: {
    requestId?: string;
    timestamp?: string;
  };
};

/** Lỗi từ tầng HTTP — union có discriminant `kind`. */
export type ApiError =
  | { kind: "network"; message: string }
  | { kind: "unauthorized"; message: string; status: 401 }
  | {
      kind: "validation";
      message: string;
      status: 422;
      fields: Record<string, string[]>;
    }
  | { kind: "http"; message: string; status: number; code?: string };

export type Result<T, E> = { status: "success"; data: T } | { status: "error"; error: E };

/**
 * formatApiErrorLabel — trả về nhãn ngắn cho UI/logging; đồng thời ép exhaustive switch.
 */
export const formatApiErrorLabel = (error: ApiError): string => {
  switch (error.kind) {
    case "network":
      return "network";
    case "unauthorized":
      return "unauthorized";
    case "validation":
      return "validation";
    case "http":
      return "http";
    default: {
      const _exhaustive: never = error;
      return _exhaustive;
    }
  }
};
