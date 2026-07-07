# Technical decisions — Strong Middle RN demo sprint

> Mỗi coding day **D01–D06**: 3 dòng — **Đã chọn gì**, **vì sao**, **Đã chủ động cắt gì**.

---

## D01 · 29/04 — TanStack Query cho sample todo (`useSampleTodo`)

- **Đã chọn:** `useSampleTodo()` + TanStack Query thay cho gom fetch/`useEffect` trực tiếp trong `HomeScreen` (hoặc đẩy toàn bộ server read vào Redux).
- **Vì:** TODO này là **server-derived read**; Query lo cache + dedupe + lifecycle; Redux trong repo được giữ cho **client/session state** (`AuthProvider`).
- **Cắt:** Mutation / optimistic update / invalidate — để **D02**; không prefetch hay shared query factory phức tạp.

*(Tinh chỉnh câu 2 bằng giọng bạn để interviewer nghe được “ownership”, không chỉ checklist.)*

---

<!-- D02–D06: append khi làm -->
