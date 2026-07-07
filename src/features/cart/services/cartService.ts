/**
 * cart/services/cartService.ts — network layer cho Cart feature.
 *
 * Dùng apiClient (axios instance có auth interceptors).
 * Mọi request ở đây đều tự động được:
 *   - Gắn Bearer token (requestInterceptor)
 *   - Refresh token nếu 401 rồi retry (responseInterceptor)
 *
 * Service chỉ làm 1 việc: gọi API và trả data về.
 * Không biết TanStack Query, không biết component nào dùng nó.
 */

import { apiClient } from "@/shared/api";

// ─────────────────────────────────────────────────────────────────────────────
// Types — shape của data từ server
// ─────────────────────────────────────────────────────────────────────────────

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type Voucher = {
  code: string;
  discount: number;
  expiresAt: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// API calls
// ─────────────────────────────────────────────────────────────────────────────

/**
 * fetchCurrentUser — GET /me
 * Bước đầu tiên của CartScreen: lấy userId để unlock cart + voucher queries.
 */
export async function fetchCurrentUser(): Promise<CurrentUser> {
  const response = await apiClient.get<CurrentUser>("/me");
  return response.data;
}

/**
 * fetchCartItems — GET /cart/:userId
 * Chỉ gọi sau khi có userId. Hook useCartItems dùng `enabled` để đảm bảo điều này.
 */
export async function fetchCartItems(userId: string): Promise<CartItem[]> {
  const response = await apiClient.get<CartItem[]>(`/cart/${userId}`);
  return response.data;
}

/**
 * fetchVouchers — GET /vouchers/:userId
 * Tương tự fetchCartItems — chờ userId trước mới gọi.
 */
export async function fetchVouchers(userId: string): Promise<Voucher[]> {
  const response = await apiClient.get<Voucher[]>(`/vouchers/${userId}`);
  return response.data;
}
