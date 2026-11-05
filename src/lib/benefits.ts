// Some TS constants used to synchronize what IOTMs do for the tiering sheet. 
// Used for staging data from the IOTM Tier List google sheet used for the 
// on-site tiering.

export interface BenefitInfo {
  /** Name in iotms.json & tier page address (?does=freeKills) */
  key: string;
  label: string;
  /** Hover text */
  description: string;
  /** The sheet's color for IOTMs that do this directly (cells marked 1) */
  color: string;
  /** Its paler color for IOTMs that help indirectly (cells marked 2) */
  indirectColor: string;
}

export const BENEFITS: BenefitInfo[] = [
  {
    key: "summonOrCopy",
    label: "Summon/copy",
    description: "Summons a monster of your choice, or copies one you're fighting",
    color: "#741b47",
    indirectColor: "#ead1dc",
  },
  {
    key: "freeKills",
    label: "Free kills",
    description: "Kills a monster without using a turn",
    color: "#351c75",
    indirectColor: "#d9d2e9",
  },
  {
    key: "freeRuns",
    label: "Free runs",
    description: "Runs away from a fight without using a turn",
    color: "#0b5394",
    indirectColor: "#cfe2f3",
  },
  {
    key: "freeFights",
    label: "Free fights",
    description: "Gives fights that don't use a turn",
    color: "#134f5c",
    indirectColor: "#d0e0e3",
  },
  {
    key: "sneaks",
    label: "Sneaks",
    description: "Skips combats to get to noncombat adventures",
    color: "#38761d",
    indirectColor: "#d9ead3",
  },
  {
    key: "buffGen",
    label: "Buff gen",
    description: "Gives useful buffs",
    color: "#bf9000",
    indirectColor: "#fff2cc", // tint
  },
  {
    key: "itemGen",
    label: "Item gen",
    description: "Makes useful items",
    color: "#b45f06",
    indirectColor: "#fce5cd", // tint
  },
  {
    key: "steals",
    label: "Steals",
    description: "Steals items from monsters, or generates more than you'd generally get",
    color: "#990000",
    indirectColor: "#f4cccc", // tint
  },
  {
    key: "banish",
    label: "Banishes",
    description: "Stops a monster from showing up for a while",
    color: "#85200c",
    indirectColor: "#e6b8af", // tint
  },
  {
    key: "replacer",
    label: "Replacers",
    description: "Replaces the monster you're fighting with a different one",
    color: "#434343",
    indirectColor: "#e0e0e0", // tint
  },
  {
    key: "turnbloat",
    label: "Turnbloat",
    description: "Gives extra adventures, or room to eat/drink more",
    color: "#5c6cb1",
    indirectColor: "#d6daec", // tint
  },
  {
    key: "leveling",
    label: "Leveling",
    description: "Helps level your character to 13 and beyond",
    color: "#ef7c7b",
    indirectColor: "#f4cccc",
  },
];

/** CSS custom properties for one benefit's tag or chip */
export const benefitStyle = (b: BenefitInfo) =>
  `--benefit: ${b.color}; --benefit-pale: ${b.indirectColor}`;
