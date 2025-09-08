import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@emotion")) {
            return "@emotion";
          } else if (id.includes("node_modules/")) {
            return id.split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: ["src/**/*.d.ts", "src/__tests__"],
      include: ["src/**/*.{ts,tsx}"],
      provider: "v8",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setupTests.ts",
  },
});
