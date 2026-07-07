/**
 * CartScreen.tsx — màn hình giỏ hàng.
 *
 * Component này CỰC KỲ sạch — không biết fetch/axios/refresh tồn tại.
 * Nó chỉ hỏi "tôi cần data này" và nhận về.
 * Toàn bộ phần phức tạp (refresh token, retry, cache) đã được xử lý
 * ở các tầng bên dưới: client.ts → refreshService.ts → hooks → service.
 */

import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCartItems, useCurrentUser, useVouchers } from "../hooks/useCart";
import type { CartItem, Voucher } from "../services/cartService";

export function CartScreen() {
  // ── Bước 1: lấy user ────────────────────────────────────────────────────
  // Hook này chạy ngay khi CartScreen mount.
  // Nếu token hết hạn → client.ts refresh tự động → retry → trả user về đây.
  // CartScreen không hay biết chuyện đó xảy ra.
  const userQuery = useCurrentUser();

  // Lấy userId từ kết quả — undefined nếu chưa có (đang loading hoặc lỗi)
  const userId = userQuery.data?.id;

  // ── Bước 2: lấy cart và voucher (chờ userId) ────────────────────────────
  // Hai hook này ngồi im (enabled: false) cho đến khi userId xuất hiện.
  // Khi userId có → cả 2 gọi API SONG SONG (không phải tuần tự).
  const cartQuery = useCartItems(userId);
  const vouchersQuery = useVouchers(userId);

  // ── Hiển thị loading ─────────────────────────────────────────────────────
  // Chờ user xong trước, sau đó chờ cart + voucher
  const isLoading =
    userQuery.isLoading || cartQuery.isLoading || vouchersQuery.isLoading;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải giỏ hàng...</Text>
      </View>
    );
  }

  // ── Hiển thị lỗi ─────────────────────────────────────────────────────────
  // Lỗi 401 đã được xử lý ở client.ts (refresh + retry).
  // Nếu vẫn lỗi ở đây nghĩa là: refresh thất bại → đã logout rồi,
  // hoặc lỗi network thật sự.
  if (userQuery.isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Không thể tải thông tin. {userQuery.error?.message}
        </Text>
      </View>
    );
  }

  // ── Render data ───────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Header: tên user */}
      <Text style={styles.greeting}>
        Xin chào, {userQuery.data?.name} 👋
      </Text>

      {/* Danh sách sản phẩm trong giỏ */}
      <Text style={styles.sectionTitle}>Giỏ hàng của bạn</Text>
      <FlatList<CartItem>
        data={cartQuery.data ?? []}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              {item.price.toLocaleString("vi-VN")}đ × {item.quantity}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Giỏ hàng trống.</Text>
        }
      />

      {/* Danh sách voucher bên dưới */}
      <Text style={styles.sectionTitle}>Voucher của bạn</Text>
      <FlatList<Voucher>
        data={vouchersQuery.data ?? []}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.voucherItem}>
            <Text style={styles.voucherCode}>{item.code}</Text>
            <Text>Giảm {item.discount}%</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có voucher.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 8, color: "#666" },
  errorText: { color: "red", textAlign: "center" },
  greeting: { fontSize: 18, fontWeight: "600", marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },
  cartItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemName: { fontSize: 15, fontWeight: "500" },
  itemPrice: { fontSize: 13, color: "#888", marginTop: 4 },
  voucherItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#f0c040",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fffbe6",
  },
  voucherCode: { fontWeight: "700", fontSize: 14 },
  emptyText: { color: "#aaa", fontStyle: "italic" },
});
