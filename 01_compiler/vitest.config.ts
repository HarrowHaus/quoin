import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.d.ts", "src/index.ts", "src/vite.ts"],
      reporter: ["text", "html", "json-summary"],
      thresholds: {
        lines: 90,
        functions: 90,
        statements: 90,
        branches: 80
      }
    }
  }
});
