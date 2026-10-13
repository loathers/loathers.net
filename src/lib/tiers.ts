// Tier colors, matching the IOTM Tier List sheet: green (tier 0, best) through
// red (tier 6). Shared by TierMark and TierTable so they always agree.
export const TIER_COLORS = [
  "#d9ead3",
  "#e2ecd2",
  "#eceed0",
  "#f5f0ce",
  "#fff2cc",
  "#fadfcc",
  "#f4cccc",
];

export const tierColor = (tier: number) => TIER_COLORS[tier] ?? "#e0e0e0";
