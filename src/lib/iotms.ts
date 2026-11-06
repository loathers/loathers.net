// The IOTM tier spreadsheet, as copied into src/data/iotms.json by
// `npm run sync-iotms`. Don't edit the JSON by hand; edit the sheet and sync.
import data from "../data/iotms.json";

export type Benefit = "direct" | "indirect";

export interface Iotm {
  /** The boxed name from Mr. Store, like "boxed bat wings" */
  name: string;
  year: number;
  tier: number;
  zone?: boolean;
  ioty?: boolean;
  con?: boolean;
  replica?: boolean;
  accountBound?: boolean;
  benefits?: Partial<Record<string, Benefit>>;
}

export const SHEET_URL: string = data.sheet;
/** When the sheet was last synced, as "Nov 2026" */
export const UPDATED = new Date(`${data.updated}T12:00:00Z`).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
export const IOTMS = data.iotms as Iotm[];

// Standard allows IOTMs released from January of two years ago on (in 2026,
// everything from 2024 on). Worked out when the site builds, so it moves along
// with the first deploy each January.
export const STANDARD_SINCE = new Date().getFullYear() - 2;
export const isStandard = (iotm: Iotm) => iotm.year >= STANDARD_SINCE;

const byName = new Map(IOTMS.map((iotm) => [iotm.name, iotm]));
export const findIotm = (name: string) => byName.get(name);

// Close matches for a name that isn't in the sheet, for the build error: the
// names sharing the most words with it, ignoring packaging words like "boxed"
const PACKAGING = new Set(["boxed", "packaged", "wrapped", "box", "the"]);

export function suggestIotms(name: string): string[] {
  const wordsOf = (s: string) =>
    s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !PACKAGING.has(w));
  const words = wordsOf(name);
  return IOTMS.map((iotm) => {
    const theirs = wordsOf(iotm.name);
    return { name: iotm.name, score: words.filter((w) => theirs.some((t) => t.startsWith(w) || w.startsWith(t))).length };
  })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((m) => m.name);
}
