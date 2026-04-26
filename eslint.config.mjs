import js from "@eslint/js"
import ts from "typescript-eslint"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

export default [
  {
    ignores: ["src/routeTree.gen.ts", "imports.app.d.ts", "public/", ".vscode", "**/*.json", "**/node_modules/**"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["src/**/*.{jsx,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]
