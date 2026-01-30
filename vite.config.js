import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  // ⚠️ base SOLO per GitHub Pages
  base: mode === "production" && process.env.GITHUB_PAGES
    ? "/html-meditation-app/"
    : "/",
}));


