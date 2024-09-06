import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ProjectClientRegistry",
  plugins: [react()],
  assetsInclude: ["**/*.php"],
});
