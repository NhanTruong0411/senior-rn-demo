/**
 * Flat ESLint config aligned with Expo:
 * https://docs.expo.dev/guides/using-eslint/
 *
 * Use `flat.js` + `.mjs` so Node does not treat `eslint-config-expo/flat` as a directory import (ERR_UNSUPPORTED_DIR_IMPORT).
 */
import expoConfig from "eslint-config-expo/flat.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  globalIgnores(["dist/**", "node_modules/**", "build/**", ".expo/**"]),
  {
    files: ["babel.config.js", "*.config.{js,mjs,cjs}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
    },
    languageOptions: {
      globals: globals.node,
    },
  },
]);
