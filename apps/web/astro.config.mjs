import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react({
    experimentalReactChildren: true,
  })],
  // Uncomment if there are issues during the build process related to the @repo/ui package
  // vite: {
  //   ssr: {
  //     noExternal: ["@repo/ui"]
  //   }
  // }
});