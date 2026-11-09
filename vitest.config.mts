import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Resolve the "@/*" alias from tsconfig.json, same as Next does.
    tsconfigPaths: true,
  },
  test: {
    // Unit tests cover plain TypeScript logic, so no browser (jsdom) is needed.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
