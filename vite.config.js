import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // necesario para que Vitest pueda renderizar componentes React
    globals: true,         // permite usar test(), expect(), vi() sin importar
    setupFiles: "./src/tests/setupTests.js", // archivo para setup global (opcional)
  },
});
