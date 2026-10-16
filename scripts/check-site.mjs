#!/usr/bin/env node
// check-site.mjs
//
// Warning-only checks on the built site. Produces PR annotation/warnings for:
//
//   - Dead internal links: pages, #section links, and images/icons that don't
//     exist. Checked the way production serves pages (every page lives at a
//     URL ending in /), which is what trips up relative links.
//   - Images without alt text
//   - Two posts sharing a section + slug, where one silently replaces the other
//
//   npm run build && npm run check:site

import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  DIST,
  ROOT,
  builtPages,
  lineOf,
  posts,
  requireBuild,
  sourceFor,
  warn,
  warningCount,
} from "./lib/site.mjs";

requireBuild();

const SITE = "https://www.loathers.net";
const OUR_HOSTS = new Set(["www.loathers.net", "loathers.net"]);

const pages = builtPages();
const postList = posts();

// Redirects nginx handles itself (like /contribute) never show up in dist/
const nginxRedirects = new Set(
  [...readFileSync(join(ROOT, "nginx.conf"), "utf8").matchAll(/location\s*=\s*(\S+)\s*\{\s*return\s+30\d/g)].map(
    (m) => m[1],
  ),
);

const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function attributes(attrText) {
  const attrs = {};
  for (const m of attrText.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return attrs;
}

// Astro's own HTML, so a light regex pass is enough. Script and style bodies
// are emptied first so code inside them can't look like tags.
const htmlCache = new Map();
function readPage(file) {
  if (!htmlCache.has(file)) {
    const html = readFileSync(file, "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/(<(script|style)\b[^>]*>)[\s\S]*?(<\/\2>)/gi, "$1$3");
    const tags = [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map((m) => ({
      name: m[1].toLowerCase(),
      attrs: attributes(m[2]),
    }));
    const ids = new Set(tags.flatMap((t) => [t.attrs.id, t.name === "a" && t.attrs.name].filter(Boolean)));
    htmlCache.set(file, { tags, ids });
  }
  return htmlCache.get(file);
}

/** The file in dist/ a path would be served from, the way nginx finds it */
function servedFile(path) {
  const file = join(DIST, path);
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = join(file, "index.html");
  return existsSync(index) ? index : null;
}

// --- Dead internal links, section links, and images ---

const seen = new Set();

for (const page of pages) {
  const source = sourceFor(page.url, postList);
  const { tags } = readPage(page.file);

  const refs = tags.flatMap(({ name, attrs }) => [
    ...["href", "src"].filter((a) => attrs[a]).map((a) => ({ name, raw: attrs[a] })),
    ...(attrs.srcset ?? "")
      .split(",")
      .map((c) => c.trim().split(/\s+/)[0])
      .filter(Boolean)
      .map((raw) => ({ name, raw })),
  ]);

  for (const { name, raw } of refs) {
    if (/^(mailto|tel|javascript|data|blob):/i.test(raw)) continue;

    const url = new URL(raw, SITE + page.url);
    if (!OUR_HOSTS.has(url.hostname)) continue;

    const key = `${page.url} ${raw}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const path = decodeURIComponent(url.pathname);
    if (nginxRedirects.has(path)) continue;

    const isImage = name !== "a";
    const target = servedFile(path);
    const where = {
      file: source?.file,
      line: lineOf(source?.text, raw, isImage && raw.split("/").pop()),
    };

    if (!target) {
      const relativeHint = /^[^/#?]/.test(raw) && !/^[a-z]+:/i.test(raw)
        ? ` Relative links are resolved from the page's own address (${page.url}), so start internal links with a slash, like /analysis/....`
        : "";
      warn({
        title: isImage ? "Missing image" : "Dead link",
        message: `${page.url} links to "${raw}", but ${path} doesn't exist.${relativeHint}`,
        ...where,
      });
      continue;
    }

    const fragment = decodeURIComponent(url.hash.slice(1));
    if (fragment && target.endsWith(".html") && !readPage(target).ids.has(fragment)) {
      const onPage = target === page.file ? "this page" : path;
      warn({
        title: "Dead section link",
        message: `${page.url} links to "${raw}", but there's no #${fragment} on ${onPage}.`,
        ...where,
      });
    }
  }
}

// --- Images without alt text ---

for (const page of pages) {
  const source = sourceFor(page.url, postList);
  for (const { name, attrs } of readPage(page.file).tags) {
    if (name !== "img" || "alt" in attrs) continue;
    const src = attrs.src ?? "(no src)";
    warn({
      title: "Image without alt text",
      message: `${page.url}: ${src} has no alt attribute. Describe the image, or use alt="" if it's purely decorative.`,
      file: source?.file,
      line: lineOf(source?.text, src.split("/").pop()),
    });
  }
}

// Markdown images build to alt="" either way, which is fine for decoration but
// usually just means the description got skipped, so check the source instead
for (const post of postList) {
  post.text.split("\n").forEach((line, i) => {
    if (/!\[\s*\]\(/.test(line)) {
      warn({
        title: "Image without alt text",
        message: "Markdown image with empty alt text, ![](...). Add a short description between the brackets.",
        file: post.file,
        line: i + 1,
      });
    }
  });
}

// --- Duplicate slugs ---

// Lowercased, since macOS treats Foo and foo as the same folder even though
// the server doesn't
const bySlug = Map.groupBy(postList, (p) => p.url.toLowerCase());
for (const [url, dupes] of bySlug) {
  if (dupes.length < 2) continue;
  for (const post of dupes) {
    const others = dupes.filter((d) => d !== post).map((d) => d.file).join(", ");
    warn({
      title: "Duplicate slug",
      message: `${url} is used by more than one post, so only one of them gets published. Also used by: ${others}`,
      file: post.file,
      line: lineOf(post.text, "slug:"),
    });
  }
}

const count = warningCount();
console.log(
  count
    ? `\n${count} warning(s) across ${pages.length} pages (warnings only; nothing here fails the build)`
    : `✓ ${pages.length} pages: no dead links, missing alt text, or duplicate slugs`,
);
