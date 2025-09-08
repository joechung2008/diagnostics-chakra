import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react-x";
import reactDomPlugin from "eslint-plugin-react-dom";

export default [
  globalIgnores(["coverage", "dist", "*.config.{js,ts}"]),
  ...tseslint.configs.recommended,
  reactPlugin.configs["recommended-typescript"],
  reactDomPlugin.configs.recommended,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  prettierConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
