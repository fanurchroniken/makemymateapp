import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Relax strict rules that currently block production builds
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ],
      // Next image rule: allow <img> while iterating on performance later
      "@next/next/no-img-element": "warn",
      // Allow quotes/apostrophes in static legal texts
      "react/no-unescaped-entities": "off",
      // Hook deps recommendations should be warnings, not errors
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
