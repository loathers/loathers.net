import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.loathers.net",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "night-owl",
    },
  },
  redirects: {
    "/contribute": "https://opencollective.com/loathers",
  },
});
