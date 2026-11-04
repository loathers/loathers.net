import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { findIotm, suggestIotms } from "./lib/iotms";

// A Mr. Store name from the IOTM tier sheet, spelled exactly as the sheet has it
const boxedIotm = z.string().superRefine((name, ctx) => {
  if (findIotm(name)) return;
  const close = suggestIotms(name);
  ctx.addIssue({
    code: "custom",
    message:
      `"${name}" isn't in the IOTM tier sheet. Add it to the sheet and run \`npm run sync-iotms\`, or check the spelling` +
      (close.length ? ` (did you mean ${close.map((c) => `"${c}"`).join(", ")}?)` : "."),
  });
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    section: z.enum(["analysis", "scripting", "shenanigans"]),
    tag: z.string(),
    author: z.string(),
    excerpt: z.string().optional(),
    // Show a "Contents" box at the top of the post
    toc: z.boolean().optional(),
    // The IOTM(s) a review covers, by their boxed Mr. Store name in the IOTM
    // tier sheet (like "boxed bat wings"). A list for posts covering several.
    "boxed-iotm": z.union([boxedIotm, z.array(boxedIotm).nonempty()]).optional(),
  }),
});

export const collections = { posts };
