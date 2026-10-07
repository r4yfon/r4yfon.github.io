// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// User site (r4yfon.github.io), so no `base`. Archived versions live in public/v2/.
export default defineConfig({
  site: "https://r4yfon.github.io",
  trailingSlash: "always",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Caprasimo",
      cssVariable: "--font-caprasimo",
      weights: [400],
      fallbacks: ["Cooper Black", "Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Sora",
      cssVariable: "--font-sora",
      weights: [400, 500, 600],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [400, 500],
      fallbacks: ["ui-monospace", "Consolas", "monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
