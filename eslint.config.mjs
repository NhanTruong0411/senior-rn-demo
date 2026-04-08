import { defineConfig, globalIgnores } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  globalIgnores([".expo/*", "dist/*", "build/*"]),
  {
    files: ["*.config.{js,mjs,cjs}", "babel.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
