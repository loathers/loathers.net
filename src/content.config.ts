import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    section: z.enum(["analysis", "scripting", "shenanigans"]),
    tag: z.string(),
    author: z.string(),
  }),
});

export const collections = { posts };
