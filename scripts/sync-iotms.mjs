#!/usr/bin/env node
// sync-iotms.mjs
//
// Copies the IOTM tier spreadsheet into src/data/iotms.json, which the site
//   builds from. The sheet is the source of truth: edit it, then run this and
//   commit the updated JSON. Nothing is fetched while the site builds.
//
//   Uses two tabs: IOTM Tiers and Categorized IOTMs.
//
//   Also reports issues (like non-updated sheet w/ a new IOTM)
//
//   Saves the day it ran as "updated", which the tier page shows as
//   "as of Nov 2026". --check ignores that date when comparing.
//
//   npm run sync-iotms
//   npm run sync-iotms -- --check   (only warns, doesn't fail CI)

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SHEET_ID = "1pDTE8VhuSyH03xvkVW5JGvTQf7PYitaNGLMHLVXz_5A";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/`;
// Tabs by their ID (the gid= in the sheet's URL), so renaming a tab doesn't
// break anything
const TABS = {
  tiers: { name: "IOTM Tiers", gid: "903911646" },
  categories: { name: "Categorized IOTMs", gid: "1172527980" },
};
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "iotms.json");

// Categorized IOTMs columns, and what they're called in the JSON
const BENEFITS = {
  "Summon or copy": "summonOrCopy",
  Freekills: "freeKills",
  Freeruns: "freeRuns",
  Freefights: "freeFights",
  Sneaks: "sneaks",
  "Buff Gen": "buffGen",
  "Item Gen": "itemGen",
  Steals: "steals",
  Banish: "banish",
  Replacer: "replacer",
  Turnbloat: "turnbloat",
  Leveling: "leveling",
};
const BENEFIT_LEVELS = { 1: "direct", 2: "indirect" };

// IOTM Tiers columns that are yes/no, the value that means yes, and what
// they're called in the JSON
const FLAGS = {
  "Unlocks a New Zone?": ["1", "zone"],
  "IOTY?": ["1", "ioty"],
  "Con Item?": ["1", "con"],
  "Replica in LOL?": ["lol", "replica"],
  "Account Bound?": ["1", "accountBound"],
};

const check = process.argv.includes("--check");
const inCI = !!process.env.GITHUB_ACTIONS;
const problems = [];
const problem = (text) => problems.push(text);

// --- Downloading ---

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// One tab as a list of { column header: cell } objects. Fails if a column
// we need has been renamed or removed, rather than quietly reading blanks.
async function readTab({ name, gid }, needed) {
  const url = `${SHEET_URL}export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Couldn't download the "${name}" tab (${response.status} from ${url})`);
  const [header, ...rows] = parseCsv(await response.text());
  const columns = header.map((h) => h.trim());
  const missing = needed.filter((n) => !columns.includes(n));
  if (missing.length) {
    throw new Error(`The "${name}" tab has no ${missing.map((m) => `"${m}"`).join(", ")} column. Was it renamed?`);
  }
  return rows
    .map((cells) => Object.fromEntries(columns.map((c, i) => [c, cleanCell(cells[i] ?? "", name)])))
    .filter((row) => row[columns[0]] !== "");
}

// Names copied from mafia's data files come with HTML codes in them, like
// "SongBoom&trade;". Turn those into the real characters (™), but mention
// them so they get fixed in the sheet too.
const ENTITIES = { trade: "™", eacute: "é", amp: "&", quot: '"', apos: "'", nbsp: " " };

function cleanCell(text, tab) {
  const cleaned = text
    .trim()
    .replace(/&(#\d+|[a-z]+);/gi, (code, name) =>
      name.startsWith("#") ? String.fromCodePoint(Number(name.slice(1))) : (ENTITIES[name] ?? code),
    );
  if (cleaned !== text.trim()) problem(`"${text.trim()}" in ${tab} has HTML codes in it; it should be "${cleaned}"`);
  return cleaned;
}

// --- Building the JSON ---

const ITEM = "Mr. Store Item";

function readTier(text, where) {
  if (!/^[0-6]$/.test(text)) {
    problem(`${where} has tier "${text}", which isn't 0 to 6`);
    return null;
  }
  return Number(text);
}

function readYear(text, where) {
  if (!/^20\d\d$/.test(text)) {
    problem(`${where} has year "${text}"`);
    return null;
  }
  return Number(text);
}

// For names that are in both tabs but with different capitals, so the report
// can say that instead of "missing"
const lower = (s) => s.toLowerCase();

function build(tierRows, categoryRows) {
  const categories = new Map();
  for (const row of categoryRows) {
    const name = row[ITEM];
    if (categories.has(name)) problem(`"${name}" is in Categorized IOTMs twice`);
    categories.set(name, row);
  }

  const seen = new Set();
  const iotms = tierRows.map((row) => {
    const name = row[ITEM];
    const where = `"${name}" in IOTM Tiers`;
    if (seen.has(name)) problem(`"${name}" is in IOTM Tiers twice`);
    seen.add(name);

    const iotm = { name, year: readYear(row.Year, where), tier: readTier(row["Speed Tier"], where) };
    for (const [column, [yes, key]] of Object.entries(FLAGS)) {
      const value = row[column];
      if (value === yes) iotm[key] = true;
      else if (value !== "") problem(`${where} has "${value}" under "${column}" (expected "${yes}" or blank)`);
    }

    let cat = categories.get(name);
    if (!cat) {
      const near = [...categories.keys()].find((n) => lower(n) === lower(name));
      if (!near) {
        problem(`"${name}" is in IOTM Tiers but not Categorized IOTMs`);
        return iotm;
      }
      problem(`"${name}" is spelled "${near}" in Categorized IOTMs (different capitals)`);
      cat = categories.get(near);
    }

    // Categorized IOTMs repeats a few IOTM Tiers columns. IOTM Tiers wins, but
    // say so when they disagree.
    const catWhere = `Categorized IOTMs says "${name}"`;
    if (cat.Year !== row.Year) problem(`${catWhere} is from ${cat.Year}, IOTM Tiers says ${row.Year}`);
    if (cat["Speed Tier"] !== row["Speed Tier"]) {
      problem(`${catWhere} is tier ${cat["Speed Tier"]}, IOTM Tiers says ${row["Speed Tier"]}`);
    }
    if (cat["Unlocks a New Zone?"] !== row["Unlocks a New Zone?"]) {
      problem(`The two tabs disagree on whether "${name}" unlocks a new zone`);
    }

    const benefits = {};
    for (const [column, key] of Object.entries(BENEFITS)) {
      const value = cat[column];
      if (BENEFIT_LEVELS[value]) benefits[key] = BENEFIT_LEVELS[value];
      else if (value !== "") problem(`${catWhere} has "${value}" under "${column}" (expected 1, 2, or blank)`);
    }
    if (Object.keys(benefits).length) iotm.benefits = benefits;
    return iotm;
  });

  for (const name of categories.keys()) {
    if (!seen.has(name) && ![...seen].some((n) => lower(n) === lower(name))) {
      problem(`"${name}" is in Categorized IOTMs but not IOTM Tiers`);
    }
  }

  // Our own order (tier, then year, then name), so re-sorting the sheet doesn't
  // reshuffle the whole file; a sync's diff then only shows real changes
  iotms.sort(
    (a, b) =>
      (a.tier ?? 99) - (b.tier ?? 99) ||
      (a.year ?? 0) - (b.year ?? 0) ||
      a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  // Today, in the site's own reckoning (YYYY-MM-DD)
  const updated = new Date().toISOString().slice(0, 10);
  return { sheet: SHEET_URL, updated, iotms };
}

// The same layout VS Code gives JSON when it formats a file, so saving the
// file there doesn't change it
const format = (data) => `${JSON.stringify(data, null, 2)}\n`;

// --- Run ---

const report = (text) => console.log(inCI ? `::warning title=IOTM sheet::${text}` : `  - ${text}`);

try {
  const [tierRows, categoryRows] = await Promise.all([
    readTab(TABS.tiers, [ITEM, "Year", "Speed Tier", ...Object.keys(FLAGS)]),
    readTab(TABS.categories, [ITEM, "Year", "Speed Tier", "Unlocks a New Zone?", ...Object.keys(BENEFITS)]),
  ]);
  const data = build(tierRows, categoryRows);
  const json = format(data);

  if (problems.length) {
    console.log(`${problems.length} thing(s) in the sheet to look at:`);
    problems.forEach(report);
  }

  if (check) {
    let current = "";
    try {
      current = readFileSync(OUT, "utf8");
      // Only the ratings count: a file synced on another day still matches
      data.updated = JSON.parse(current).updated;
    } catch { }
    if (current === format(data)) {
      console.log("src/data/iotms.json matches the sheet.");
    } else {
      report("src/data/iotms.json is out of date with the sheet. Run `npm run sync-iotms` and commit the result.");
    }
  } else {
    writeFileSync(OUT, json);
    console.log(`Wrote ${data.iotms.length} IOTMs to src/data/iotms.json.`);
  }
} catch (error) {
  // In --check mode a Google outage is only worth a warning
  if (!check) throw error;
  report(`Couldn't check the sheet: ${error.message}`);
}
