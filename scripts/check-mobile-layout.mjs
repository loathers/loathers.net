#!/usr/bin/env node
// check-mobile-layout.mjs
//
// Opens every page of the built site at phone widths and warns if any of them
//   is wider than the screen (the "whole page slides sideways" bug, like #69),
//   naming the elements poking out past the edge so you know where to look.
//
//   npm run build && npm run check:mobile
//
// Uses the Chrome that's already installed; GitHub's runners have it, in theory!

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";
import { DIST, builtPages, posts, requireBuild, sourceFor, warn, warningCount } from "./lib/site.mjs";

requireBuild();

// iPhone SE / small Android, and the most common modern phone width
const WIDTHS = [320, 375];
const PARALLEL = 4;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

let browser;
try {
  browser = process.env.CHROME_PATH
    ? await chromium.launch({ executablePath: process.env.CHROME_PATH })
    : await chromium.launch({ channel: "chrome" });
} catch {
  // A warning rather than a quiet skip, so a runner without Chrome gets noticed
  warn({
    title: "Phone layout check skipped",
    message: "No Chrome found to run it with. Install Chrome, or set CHROME_PATH to a Chromium-based browser.",
  });
  process.exit(0);
}

const isFile = (p) => stat(p).then((s) => s.isFile(), () => false);

// Just enough of a static file server to stand in for nginx
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = normalize(join(DIST, path));
  if (!file.startsWith(DIST)) return res.writeHead(403).end();
  if (!(await isFile(file))) file = join(file, "index.html");
  if (!(await isFile(file))) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

// Runs in the page: how wide it is, and the innermost elements past the edge
function measure() {
  const vw = document.documentElement.clientWidth;
  const pastEdge = (el) => el.getBoundingClientRect().right > vw + 0.5;
  const culprits = [...document.body.querySelectorAll("*")]
    .filter((el) => pastEdge(el) && ![...el.children].some(pastEdge))
    .slice(0, 3)
    .map((el) => {
      const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/)[0] : "";
      const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40);
      const right = Math.round(el.getBoundingClientRect().right);
      return `<${el.tagName.toLowerCase()}${cls ? `.${cls}` : ""}> reaches ${right}px${text ? ` ("${text}")` : ""}`;
    });
  return { pageWidth: document.documentElement.scrollWidth, vw, culprits };
}

const pages = builtPages();
const postList = posts();

try {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 800 } });
    const queue = [...pages];
    await Promise.all(
      Array.from({ length: PARALLEL }, async () => {
        const tab = await context.newPage();
        for (let page; (page = queue.shift());) {
          await tab.goto(origin + page.url, { waitUntil: "load" });
          const { pageWidth, vw, culprits } = await tab.evaluate(measure);
          if (pageWidth <= vw) continue;
          warn({
            title: "Too wide for phones",
            message: `${page.url} stretches to ${pageWidth}px on a ${width}px screen, so the whole page scrolls sideways. Past the edge: ${culprits.join("; ")}`,
            file: sourceFor(page.url, postList)?.file,
          });
        }
        await tab.close();
      }),
    );
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

const count = warningCount();
console.log(
  count
    ? `\n${count} warning(s) (warnings only; nothing here fails the build)`
    : `✓ All ${pages.length} pages fit at ${WIDTHS.join("px and ")}px wide`,
);
