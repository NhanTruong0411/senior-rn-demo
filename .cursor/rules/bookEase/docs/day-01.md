# Agile Project — Day 01 (Thứ Sáu, 24/07)

## Sprint hiện tại
Sprint 1 — Foundation & Authentication. Tiến độ: 0/6 task.

## 1. Standup
- Hôm qua: Ngày đầu của project BookEase. Repo đang có sẵn 1 Expo scaffold ở root (`senior-rn-demo`), `src/` rỗng, đã có ESLint/Prettier/Husky/commitizen + React Query + axios + SecureStore.
- Hôm nay: Task **1.1** — Khởi tạo cấu trúc monorepo `web-admin/` (NextJS) + `mobile-app/` (Expo), TypeScript.
- Blocker: Cần chốt cách xử lý Expo scaffold đang nằm ở root (di chuyển vào `mobile-app/` hay giữ nguyên root làm mobile). Xem Mục 4.

## 2. Task hôm nay
- **1.1** — Khởi tạo `web-admin/` (NextJS) + `mobile-app/` (Expo), TypeScript.
- **Mục đích (vì sao quan trọng cho Strong Middle):** Một Strong Middle phải dựng được kiến trúc project rõ ràng ngay từ đầu. Monorepo tách biệt web/mobile nhưng cùng gọi 1 REST API là điểm kể chuyện tốt khi phỏng vấn ("em thiết kế 2 client dùng chung contract API"). Foundation sai → cả 4 sprint lệch.

## 3. Skill mapping (bắt buộc áp dụng)
- Day 35 — Mobile App Architecture → feature-based folder cho `mobile-app/`, tách `src/features`, `src/shared`.
- Day 22 — Git thành thạo → làm trên feature branch, không commit thẳng master.

## 4. Quyết định kiến trúc — ĐÃ CHỐT: Phương án C
User chọn **C** — xoá scaffold cũ, init lại cả `web-admin/` + `mobile-app/` từ đầu.

- **Trade-off đã chấp nhận:** mất phần setup ESLint/Prettier/Husky/commitizen đang có ở root. Tech Lead note: nên salvage `.cz-config.js`, `.prettierrc`, husky về root monorepo sau, không cần xoá vội (rẻ mà giữ được tooling).
- **Scope hôm nay:** chỉ skeleton 2 project + README + verify chạy. Không làm login UI (để task 1.4).
- **Cách làm:** Tech Lead hướng dẫn từng bước, user tự gõ lệnh/code. Không Accept All mù quáng.

## 5. Các bước thực hiện (step-by-step) — phương án C
1. Tạo branch `feature/sprint-1-setup` từ master.
2. Init `mobile-app/` bằng `create-expo-app` (TypeScript).
3. Init `web-admin/` bằng `create-next-app` (App Router + TS + Tailwind).
4. Dọn/di chuyển scaffold cũ ở root (src rỗng; cân nhắc giữ tooling husky/commitizen ở root).
5. Thêm README root mô tả layout monorepo + cách chạy từng phần.
6. Verify: `mobile-app` chạy `expo start`, `web-admin` chạy `next dev`.
7. Commit theo convention, mở PR mindset (không commit thẳng master).

## 6. Definition of Done (DoD)
- [ ] Layout `web-admin/` + `mobile-app/` tồn tại, TypeScript cả 2.
- [ ] `mobile-app/` chạy được (expo start không lỗi config).
- [ ] `web-admin/` chạy được (`next dev` render trang mặc định).
- [ ] README root mô tả kiến trúc + cách chạy từng phần.
- [ ] Làm trên branch `feature/sprint-1-setup`, commit message rõ ràng (không commit thẳng master).

## 7. AI workflow nhắc dùng
- `/shape-audit` — sau khi move, check không có file rác / path sai.
- Không Accept All mù quáng khi di chuyển file — kiểm tra từng path config (babel `module-resolver`, tsconfig, app.json).

## 8. Kết quả cuối ngày (điền khi "kết thúc ngày")
- Verify: PASS/FAIL từng mục
- Carry-forward:
