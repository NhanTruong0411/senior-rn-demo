# senior-rn-demo

**Lộ trình:** một repo **Senior Mobile (React Native)** theo roadmap **45 ngày** — đối chiếu `checklist.md` và `prompt.md` trong thư mục cha (`Dev`).

## Mục tiêu ngày 1 (và của repo bootstrap)

- App **Expo + TypeScript** chạy được trên simulator/emulator.
- Cấu trúc **`src/features/`**, **`src/shared/`**, **`src/app/`** và màn **placeholder** (feature `home`).
- README ghi mục tiêu lộ trình + lệnh chạy (file này).

## Stack

- **Expo** (~SDK 54)
- **React** / **React Native**
- **TypeScript** (`strict: true` trong `tsconfig`)

## Chạy project

Cài dependency (lần đầu hoặc sau khi đổi `package.json`):

```bash
yarn install
```

Khởi động dev server (chọn một):

```bash
yarn start
# hoặc
npx expo start
```

Sau đó:

- Mở **Expo Go** trên điện thoại và quét QR, hoặc
- Trong terminal bấm **`i`** (iOS Simulator) / **`a`** (Android emulator) nếu môi trường đã cấu hình.

Scripts khác trong `package.json`: `yarn ios`, `yarn android`, `yarn web`.

## Cấu trúc thư mục

```text
src/
  app/              # shell gốc (providers, navigation sau này)
  features/
    home/
      HomeScreen.tsx
      index.ts      # public API của feature (export ra ngoài)
  shared/           # component / token dùng chung
```

Entry gốc: `index.ts` ở root đăng ký `AppRoot` từ `src/app`.

## Quy tắc kiến trúc (từ ngày 1)

- **Feature A** không import trực tiếp code nội bộ **feature B** — phần chung đưa vào **`shared/`** (hoặc layer sau trong lộ trình).
- File **`index.ts`** của mỗi feature là **cửa export** (public API); refactor bên trong feature không nên bắt mọi nơi đổi import.

## Definition of Done — ngày 1

- [ ] `npx expo start` chạy được, thấy màn placeholder.
- [ ] Có `features/` + `shared/` + `app/` rõ ràng.
- [ ] README có mục tiêu + lệnh chạy.
- [ ] Đã tự trả lời ngắn 3 câu ôn tập (trong tài liệu ngày 1).

## Ôn tập (tự kiểm)

1. Vì sao **feature-folder** tốt hơn gom hết vào `screens/` khi dự án lớn?
2. **Public API** `index.ts` của feature dùng để làm gì?
3. Khi nào code nên vào **`shared/`** thay vì `features/home/`?

## Ghi chú lộ trình

Repo giữ **trung lập domain** (catalog, feed, inbox… đặt tên tuỳ bạn). Từ vựng FinTech không bắt buộc.

**Ngày tiếp theo:** xem `checklist.md` mục 7 dòng **Ngày 2** (ESLint, Prettier, path alias).
