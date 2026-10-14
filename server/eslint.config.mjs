import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    "dist/",
    "docker/",
    "prisma/",
    "resources/",
    "src/generated/",
    "prisma.config.ts",
    "eslint.config.mjs",
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
    },
  },
);
