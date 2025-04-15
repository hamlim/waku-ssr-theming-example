import tailwindcss from "@tailwindcss/vite";
import macros from "unplugin-macros/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), macros()],
});
