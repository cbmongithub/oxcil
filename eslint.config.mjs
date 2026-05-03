// Custom Oxcil flat ESLint config for Next + TS + Tailwind stacks
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindPlugin from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  // Next.js defaults for performance and a11y
  ...nextVitals,
  // TypeScript parser options and rules
  ...nextTs,
  // Tailwind's recommended flat config
  ...tailwindPlugin.configs["flat/recommended"],

  // Tailwind plugin settings: treat our class helper names as classnames and keep the scan scope broad.
  {
    settings: {
      tailwindcss: {
        cssFiles: ["**/*.css"],
        callees: ["clsx", "cn", "cva"],
        removeDuplicates: true,
        config: {},
      },
    },
  },

  // Project-wide rules applied to source and config files.
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      // Predictable import grouping for readability
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^next", "^next/", "^@?\\w"],
            ["^@/hooks"],
            ["^@/components"],
            ["^@/lib"],
            ["^@/types"],
            ["^@/styles"],
            ["^@/"],
            ["^\\u0000"],
            ["^\\.", "^\\.."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // Enforce Tailwind className ordering and v4+ syntax
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
      "tailwindcss/no-custom-classname": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Files and folders ESLint should skip entirely.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
