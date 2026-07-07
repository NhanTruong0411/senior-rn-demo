/**
 * Branded types cho ID — compile-time an toàn, runtime vẫn là string.
 * Chưa gắn vào AuthContext; dùng khi tích hợp user object từ API sau này.
 */

/** Gắn "nhãn" ảo để TS không lẫn string có nghĩa khác nhau. */
export type Brand<T, B> = T & { readonly __brand: B };

export type UserId = Brand<string, "UserId">;

/**
 * Một nơi duy nhất cast raw string → UserId. Sau này có thể thêm validate UUID tại đây.
 */
export const createUserId = (raw: string): UserId => raw as UserId;

export type User = Readonly<{
  id: UserId;
  email: string;
}>;
