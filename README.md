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

## Commit message (Conventional Commits)

Dự án dùng [Conventional Commits](https://www.conventionalcommits.org/) cho message rõ ý đồ, ví dụ:

- `feat: add login screen`
- `fix: handle empty list`
- `chore: bump eslint`
- `docs: update readme`

Có thể dùng `yarn commit` (Commitizen) để được gợi ý type + subject.

## Ngày 2 — tra cứu nhanh (đã làm trong repo)

Dùng mục này để **đối chiếu lại** với playbook `.cursor/rules/day-02.mdc` khi cần.

| Hạng mục                   | Trong repo                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ESLint (Expo, flat config) | `eslint.config.mjs` — `eslint-config-expo/flat.js`; script **`yarn lint`** (= `expo lint`)                                |
| Prettier                   | `.prettierrc`, `.prettierignore`; **`yarn format`**, **`yarn format:check`**                                              |
| ESLint ↔ Prettier          | `eslint-plugin-prettier/recommended` trong `eslint.config.mjs` (Prettier chạy như rule ESLint; không xung đột với format) |
| Path alias `@/` → `src/`   | `tsconfig.json`: `paths` `@/*`; **`babel.config.js`**: `babel-plugin-module-resolver`, `alias: { "@": "./src" }`          |
| Ví dụ import `@/`          | `src/app/AppRoot.tsx`: `import { HomeScreen } from "@/features/home"`                                                     |
| Commit style               | Mục **Commit message** ở trên + `yarn commit` / `.cz-config.js` (kiểu Conventional Commits)                               |
| Khác (tuỳ chọn sau này)    | `husky`, `lint-staged` trong `package.json` — có thể bật hook sau                                                         |

**Kiểm tra nhanh sau khi đổi cấu hình:**

```bash
yarn lint
yarn format:check
yarn start
```

**Definition of Done — ngày 2**

- [x] `yarn lint` sạch trên repo.
- [x] Có `format` / `format:check`; ESLint và Prettier không “đánh nhau”.
- [x] Có ít nhất một import `@/` chạy được (app lên với `yarn start`).
- [x] README ghi quy ước commit (mục **Commit message**).
- [x] Đã tự trả lời 2 câu review trong `day-02.mdc` (mục 5).

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

## Ngày 3 — tra cứu nhanh (theme + `AppText` + `Button`)

Đối chiếu `.cursor/rules/day-03.mdc`. Sau khi triển khai đủ mục dưới, đánh dấu DoD trong playbook.

| Hạng mục            | Trong repo (mục tiêu)                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Theme light (token) | `src/shared/theme/colors.ts`, `spacing.ts`, `src/shared/theme/index.ts` — export `theme`                 |
| `AppText`           | `src/shared/components/AppText.tsx` — `variant`: `title` \| `body` \| `caption`, props có type           |
| `Button`            | `src/shared/components/Button.tsx` — `Pressable`, `primary` \| `secondary`, `accessibilityRole="button"` |
| Public API          | `src/shared/index.ts` — export `theme`, `AppText`, `Button`                                              |
| Màn demo            | `HomeScreen` dùng `theme.colors.background`, `AppText`, `Button` (ví dụ `Alert.alert`)                   |
| Root                | `AppRoot` nền theo `theme.colors.background`                                                             |

**Kiểm tra:**

```bash
yarn lint
yarn start
```

**Definition of Done — ngày 3**

- [x] Theme light + `AppText` + `Button` shared, props TypeScript rõ.
- [x] `HomeScreen` dùng theme và hai component shared; `yarn lint` pass.
- [ ] Đã trả lời câu review trong `day-03.mdc` (mục 5).

**Ngày tiếp theo:** **Ngày 4** — lớp `api/` + kiểu response list; mock token interceptor (xem `day-playbooks.mdc` Section 7). Tạo `day-04.mdc` khi bắt đầu.
