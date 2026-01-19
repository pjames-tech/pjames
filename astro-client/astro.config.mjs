// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server", // Enable server-side rendering for API routes
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    solidJs({
      // Exclude React components from Solid.js processing
      exclude: [
        "**/src/components/ui/ThreeHero.jsx",
        "**/src/components/chat/**",
      ],
    }),
    react({
      include: [
        "**/src/components/ui/ThreeHero.jsx",
        "**/src/components/chat/**",
      ],
    }),
  ],
  adapter: vercel(),
});
