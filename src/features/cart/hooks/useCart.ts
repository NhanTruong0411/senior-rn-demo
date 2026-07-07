/**
 * useCart.ts — TanStack Query hooks cho CartScreen.
 *
 * Tầng này là cầu nối giữa service (gọi API) và component (hiển thị UI).
 * Component không biết fetch/axios tồn tại — nó chỉ gọi hook và nhận data.
 *
 * Dependency chain trong CartScreen:
 *   useCurrentUser → lấy userId
 *       ↓
 *   useCartItems(userId)   ← enabled khi có userId
 *   useVouchers(userId)    ← enabled khi có userId
 */

import { useQuery } from "@tanstack/react-query";

import {
  fetchCartItems,
  fetchCurrentUser,
  fetchVouchers,
} from "../services/cartService";

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys — tập trung ở đây để tránh typo khi dùng nhiều chỗ
//
// Ví dụ: queryKeys.cart("123") trả về ["cart", "123"]
// TQ dùng array này để nhận dạng và cache data.
// ─────────────────────────────────────────────────────────────────────────────
export const queryKeys = {
  currentUser: ["me"] as const,
  cart: (userId: string) => ["cart", userId] as const,
  vouchers: (userId: string) => ["vouchers", userId] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook 1: lấy user hiện tại
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useCurrentUser — gọi GET /me để lấy thông tin user đang đăng nhập.
 *
 * Đây là hook chạy ĐẦU TIÊN khi CartScreen mount.
 * Kết quả (userId) sẽ unlock 2 hook bên dưới.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: fetchCurrentUser,

    // staleTime: 10 phút — thông tin user ít thay đổi
    // Mở lại màn hình trong 10 phút → dùng cache, không gọi API lại
    staleTime: 10 * 60 * 1000,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook 2: lấy giỏ hàng
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useCartItems — gọi GET /cart/:userId
 *
 * Chỉ chạy khi userId đã có (enabled: !!userId).
 * Trước đó, hook này ngồi yên — không gọi API, không báo loading.
 */
export function useCartItems(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.cart(userId ?? ""),
    queryFn: () => fetchCartItems(userId!),

    // enabled = false khi userId undefined → TQ không gọi queryFn
    // enabled = true khi userId có giá trị → TQ gọi ngay
    enabled: !!userId,

    // staleTime: 1 phút — giỏ hàng thay đổi thường xuyên hơn
    staleTime: 60 * 1000,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook 3: lấy voucher
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useVouchers — gọi GET /vouchers/:userId
 *
 * Tương tự useCartItems — chờ userId trước mới chạy.
 * Cart và Voucher chạy SONG SONG khi cả 2 được enabled.
 */
export function useVouchers(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.vouchers(userId ?? ""),
    queryFn: () => fetchVouchers(userId!),

    enabled: !!userId,

    staleTime: 5 * 60 * 1000,
  });
}
