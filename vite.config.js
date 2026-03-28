import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function cloudflareRedirects() {
  return {
    name: "cloudflare-pages-redirects",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "_redirects",
        source: "/* /index.html 200\n",
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), cloudflareRedirects()],
});
