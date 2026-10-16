// site.mjs
//
// Shared bits for the site checks (check-site.mjs, check-mobile-layout.mjs):
//   finding the built pages, mapping a page back to the file it came from,
//   and reporting warnings so they show up right on the PR in GitHub Actions.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
export const DIST = join(ROOT, "dist");
const DATA = join(ROOT, "src", "data");
const PAGES = join(ROOT, "src", "pages");

const toPosix = (p) => p.split(sep).join("/");

function walk(dir, keep) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walk(full, keep));
    else if (keep(entry.name)) found.push(full);
  }
  return found;
}

export function requireBuild() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("No built site in dist/. Run `npm run build` first.");
    process.exit(1);
  }
}

/** Every page Astro built, as { url: "/analysis/foo/", file: "dist/analysis/foo/index.html" } */
export function builtPages() {
  return walk(DIST, (name) => name === "index.html").map((file) => {
    const dir = toPosix(relative(DIST, file)).replace(/index\.html$/, "");
    return { url: `/${dir}`, file };
  });
}

/** Every post's source, with the frontmatter fields the checks care about */
export function posts() {
  return walk(DATA, (name) => name.endsWith(".mdx")).map((file) => {
    const text = readFileSync(file, "utf8");
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const field = (name) =>
      frontmatter.match(new RegExp(`^${name}:\\s*["']?(.*?)["']?\\s*$`, "m"))?.[1];
    const section = field("section");
    const slug = field("slug");
    return { file: toPosix(relative(ROOT, file)), text, section, slug, url: `/${section}/${slug}/` };
  });
}

/** The source file a built page came from, so warnings point somewhere you can edit */
export function sourceFor(url, postList) {
  const post = postList.find((p) => p.url === decodeURI(url));
  if (post) return post;
  const name = url === "/" ? "index" : url.replace(/^\/|\/$/g, "");
  for (const candidate of [`${name}.astro`, `${name}/index.astro`]) {
    const file = join(PAGES, candidate);
    if (existsSync(file) && statSync(file).isFile()) {
      return { file: toPosix(relative(ROOT, file)), text: readFileSync(file, "utf8") };
    }
  }
  return null;
}

/** 1-based line of the first line containing any of the needles, if there is one */
export function lineOf(text, ...needles) {
  if (!text) return undefined;
  const lines = text.split("\n");
  for (const needle of needles.filter(Boolean)) {
    const i = lines.findIndex((line) => line.includes(needle));
    if (i !== -1) return i + 1;
  }
  return undefined;
}

// GitHub turns "::warning file=...,line=...::message" lines in the log into
// annotations on the PR (inline on the file, if the file is part of the PR)
const inActions = Boolean(process.env.GITHUB_ACTIONS);
const escapeData = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const escapeProp = (s) => escapeData(s).replace(/:/g, "%3A").replace(/,/g, "%2C");

let warnings = 0;

export function warn({ title, message, file, line }) {
  warnings++;
  if (inActions) {
    const props = [file && `file=${escapeProp(file)}`, line && `line=${line}`, `title=${escapeProp(title)}`];
    console.log(`::warning ${props.filter(Boolean).join(",")}::${escapeData(message)}`);
  } else {
    const where = file ? ` (${file}${line ? `:${line}` : ""})` : "";
    console.log(`⚠ ${title}: ${message}${where}`);
  }
}

export const warningCount = () => warnings;
