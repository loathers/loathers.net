#!/usr/bin/env node
// fetch-kol-icon.mjs
//
// Copies KoL images into public/images/kol/ so posts can use them via
//   KolIcon.astro without hotlinking. Paths mirror KoL's own image server
//   (itemimages/pumpkin.gif), the same names mafia data and greenbox use. A
//   bare filename is assumed to be an item image.
//
//   npm run kol-icon -- pumpkin.gif bigpumpkin.gif
//   npm run kol-icon -- otherimages/sigils/hobotat19.gif
//   npm run kol-icon -- --force pumpkin.gif   (re-download files we already have)

import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "https://s3.amazonaws.com/images.kingdomofloathing.com/";
const DEST = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "kol");

// Only KoL's image folders, and no "..", so an odd argument can't write outside DEST
const VALID_PATH = /^(itemimages|otherimages)(\/[\w-]+)+\.(gif|png)$/;
const MAGIC = {
  gif: Buffer.from("GIF8"),
  png: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const paths = args
  .filter((a) => a !== "--force")
  .map((a) => (a.includes("/") ? a : `itemimages/${a}`));

if (paths.length === 0) {
  console.log("Usage: npm run kol-icon -- [--force] <file.gif | itemimages/file.gif | otherimages/...> ...");
  process.exit(1);
}

const exists = (p) => access(p).then(() => true, () => false);
let failures = 0;

for (const path of paths) {
  if (!VALID_PATH.test(path)) {
    console.error(`✗ ${path}: not a KoL image path (expected itemimages/... or otherimages/..., .gif or .png)`);
    failures++;
    continue;
  }

  const target = join(DEST, path);
  if (!force && (await exists(target))) {
    console.log(`- ${path}: already have it (use --force to re-download)`);
    continue;
  }

  try {
    const res = await fetch(SOURCE + path, { signal: AbortSignal.timeout(15_000) });
    // S3 answers missing files with a 403 rather than a 404
    if (res.status === 403 || res.status === 404) throw new Error("not on KoL's image server (typo?)");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Make sure we actually got an image before it lands in public/
    const data = Buffer.from(await res.arrayBuffer());
    const magic = MAGIC[path.split(".").pop()];
    if (!data.subarray(0, magic.length).equals(magic)) throw new Error("response isn't an image");

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, data);
    console.log(`✓ ${path} (${data.length} bytes)`);
  } catch (err) {
    console.error(`✗ ${path}: ${err.message}`);
    failures++;
  }
}

process.exit(failures ? 1 : 0);
