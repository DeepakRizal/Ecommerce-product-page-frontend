import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Ecommerce-product-page-frontend/",
  plugins: [react()],
});
