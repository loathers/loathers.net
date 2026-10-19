# Loathers.net: a Loathers website

Welcome to the GitHub repository for the core loathers.net website. This was built from the ground up by Captain Scotch and (likely) improved over time by our overarching collective!

## For content contributors
Content should be submitted as .mdx files placed within the `src/data/` folders. These MDX files should be (largely) normal markdown files. They should be prepended with the following data:

```
---
title: "Article Title"
date: "YYYY-MM-DD"
slug: "url-string-with-no-spaces"
author: "Your name"
section: "analysis" OR "scripting" OR "shenanigans"
tag: "Whatever your heart desires"
excerpt: "Optional field where you describe your post"
toc: true (optional; adds a "Contents" box at the top, handy for long guides)
---
```

Otherwise, it's all basic markdown, and should be very easy to contribute to! Please put up a PR with any markdown file you'd like to add. Here are a handful of small stylistic things we would prefer to have contributors do, but can change on our end if you aren't as comfortable with it and would like to just submit the content and get support from our editors.

- Please do **NOT** use H1 (the `# blahblah` construction); subheadings should be done with `##` for H2. Reserving H1 for the core title heading.
- Use normal markdown links for most things. For links to other pages on the site, start the address with a slash, like `<a href="/tools/">blahblah</a>` or `[blahblah](/analysis/2024-12-takerspace/)`. Links without the leading slash (like `./tools/` or `analysis/...`) break once the page is live, and CI will warn about them.

### Using custom Loathers.net Components

We have a bunch of custom components that can be used to improve posts! To use one, import it once near the top of your post (right after the frontmatter), then drop it in wherever you like:

```
import Warning from "@components/Warning.astro"
```

Every component lives in `src/components/` if you want to see exactly how it works.

#### Warning

A highlighted callout box for things readers shouldn't miss: update notices, caveats, "this is the original contest text," and so on. Defaults to a ⚠️ emoji on either side; pass `emoji` to swap it.

```
<Warning>Read this before you spend your Mr. Accessory!</Warning>
<Warning emoji="📚">Last updated in January 2025 for the 2025 standard meta.</Warning>
```

Live examples: [Standard Resource Guide](https://www.loathers.net/analysis/standard-ascension-planning/), [TakerSpace](https://www.loathers.net/analysis/2024-12-takerspace/)

#### ItemBox

An in-game-style item card for listing an item's enchantments, usually near the top of an IOTM review. Put a markdown list inside it. Element names (Hot, Cold, Spooky, Sleaze, Stench) are colored automatically.

```
<ItemBox itemName="legendary pasta wand">
- +5 Spooky Damage
- +5 Hot Damage
</ItemBox>
```

Live examples: [Legendary Pasta Wand](https://www.loathers.net/analysis/2026-05-legendary-pasta-wand/), [Cup of 13s](https://www.loathers.net/analysis/2026-07-cup-of-13s/)

#### Step

A numbered step heading for walkthroughs and setup guides. Each step also gets a linkable anchor, so `#step-3` jumps straight to step 3.

```
<Step n={1}>Install VSCode</Step>
```

Live example: [Setting Up Your First TypeScript Script](https://www.loathers.net/scripting/ts-script-setup/)

#### OddsCalculator

An interactive calculator for drop-chance math. Readers enter a base chance and a bonus, then see either how many adventures they'll need for a number of drops, or how many drops to expect in a number of adventures. Only `baseChance` is required.

```
<OddsCalculator
  baseChance={10}
  bonusLabel="Item Drop bonus"
  maxBonus={1800}
  defaultAmount={13}
/>
```

- `baseChance`: the starting drop chance, as a percent (`10` means 10%)
- `bonusLabel`: the label on the bonus slider (default: "Additional probability")
- `maxBonus`: the top of the bonus slider, as a percent (default: 300)
- `defaultAmount`: the starting number of adventures or items (default: 100)

Live example: [Sword of S-Words](https://www.loathers.net/analysis/2026-06-sword-of-s-words/)

#### DamageCalculator

A monster-damage calculator built specifically for the Meat Shield Maiden's "protect me" mechanic. It's not really reusable as-is, but it's a good reference if you want to build a similar calculator for another IOTM. It takes optional `default...` props (e.g. `defaultMoxie`, `defaultDR`) to pre-fill its inputs; see the component file for the full list.

```
<DamageCalculator />
```

Live example: [Meat Shield Maiden](https://www.loathers.net/analysis/2026-09-meat-shield-maiden/)

#### KolIcon

Shows a KoL item icon (or any other KoL image) that we've copied into the repo. See [Using KoL icons in a post](#using-kol-icons-in-a-post) below for how to download icons.

```
<KolIcon image="pumpkin.gif" alt="pumpkin" />
<KolIcon image="pumpkin.gif" alt="pumpkin" size={60} />
```

Live example: the [Garden Slot retro review](https://www.loathers.net/analysis/2026-garden-slot/) (once it's published), in its tier table

#### TierMark

An inline, color-coded tier badge using the same colors as the IOTM Tier List sheet (green for Tier 0, red for Tier 6). Use it for the closing rating in an IOTM review. Leave out `tier` to get a dashed "TBD" badge.

```
**MODERN RATING:** <TierMark tier={3} />, **AT-THE-TIME RATING:** <TierMark tier={1} />
```

Write `tier={3}` or `tier="3"`, not `tier=3`, which isn't valid MDX. An invalid tier fails the build so it gets caught.

Live example: the [Garden Slot retro review](https://www.loathers.net/analysis/2026-garden-slot/) (once it's published), at the end of each garden's section

#### Table

Wraps an ordinary markdown table to add sorting, sizing, and color highlights. Tables without it look the same as always, so only reach for it when a table needs one of these. Leave a blank line after the opening tag and before the closing one, or the markdown table won't render.

```
<Table sortable highlight={{ columns: { Item: "shade" } }}>

| Item | Description | gold |
| ---- | ----------- | ---- |
| golden pet rock | Familiar hatchling | 7 |
| anchor bomb | Combat item; freerun banish | 1 |

</Table>
```

All the options are optional, and can be combined:

- `sortable`: readers can click a column header to sort by it. Clicking again reverses the sort, and a third click puts the table back in the order you wrote it. Numbers sort as numbers, and empty cells (or `—`, `TBD`, `N/A`) always sort last.
- `compact`: the table is only as wide as its content (up to about two-thirds of the page) and centered, instead of stretching across the whole page. Good for small tables; see Tearaway Pants.
- `widths`: a suggested width for each column, in order, with `null` for columns you want to leave alone, like `widths={["10em", "10em", null]}`. Columns still grow if their content needs more room. Percentages split the table's width and work on every screen, which makes them the easy way to get an even split, like `widths={["50%", "50%"]}` for a side-by-side comparison. Fixed sizes like `em` or `px` only apply on wider screens, so phones don't end up scrolling sideways.
- `highlight`: colors parts of the table. Name columns by their header text or position, and rows by their position or by the text in their first cell (which keeps working if you add rows above it later). Highlights stay with their rows when readers sort.

```
<Table highlight={{
  columns: { Item: "shade" },
  rows: { 1: "best", "anchor bomb": "bad" },
  cells: [{ row: "golden pet rock", column: "gold", color: "good" }],
}}>
```

The colors are:

- `shade`: darker background and bold text. It layers on top of the other colors, so a shaded column stays shaded in a highlighted row. Good for the column that labels each row.
- `best`: light greenish-yellow, for the standout option.
- `good`: light green.
- `bad`: light red.

If a highlight names a column or row that doesn't exist, the build fails with a message saying which one, so typos get caught instead of quietly coloring nothing.

Live examples: [TakerSpace](https://www.loathers.net/analysis/2024-12-takerspace/) (sortable, shaded Item column), [A Primer on Faxes & Summons](https://www.loathers.net/analysis/faxes-and-summons/) (widths), [Tearaway Pants](https://www.loathers.net/analysis/2024-08-tearaway-pants/) (compact)

#### TierTable

A sortable summary table for posts that rate several items at once, like a retro review of a whole IOTM slot. Readers can sort by year or by any rating column, or switch to a "tier board" view that drops each item's icon into tier lanes and animates between rating columns. Rows with no tier for a column show as TBD and always sort last. Every row needs an icon (see [KolIcon](#kolicon)); `href` is optional and usually points at that item's section heading.

```
<TierTable
  nameLabel="Garden"
  columns={[
    { key: "modern", label: "Modern" },
    { key: "original", label: "At the time" },
  ]}
  rows={[
    { name: "Pumpkin Patch", year: 2010, icon: "bigpumpkin.gif", href: "#2010-a-pumpkin-patch", tiers: { modern: 6, original: 1 } },
    { name: "Black Rose Garden", year: 2026, icon: "rosebud.gif", tiers: { modern: null, original: null } },
  ]}
/>
```

The tier board opens on whichever column is listed first.

Live example: the [Garden Slot retro review](https://www.loathers.net/analysis/2026-garden-slot/) (once it's published), at the start of the Conclusion

### Using KoL icons in a post

I don't want TPTB to get cross with us, so we keep our own copies of any KoL images we use. We put these images in `public/images/kol/`. The folder structure mirrors KoL's own image server, so the pumpkin icon lives at `public/images/kol/itemimages/pumpkin.gif`, the same `itemimages/pumpkin.gif` path that KoLmafia's data files and greenbox use. Please don't hotlink KoL's servers or drop icons next to your post; put them here so everyone can reuse them.

To grab an icon, find its image filename (the `items.txt` file in KoLmafia's data lists one for every item) and run:

```
npm run kol-icon -- pumpkin.gif
```

A few notes:

- A bare filename is assumed to be an item image. For anything else, give the full path, like `npm run kol-icon -- otherimages/sigils/hobotat19.gif`.
- You can fetch several at once: `npm run kol-icon -- pumpkin.gif bigpumpkin.gif skeleton.gif`.
- Icons you already have are skipped. Add `--force` to download them again.
- Commit the downloaded files along with your post.

Then use the `KolIcon` component in your MDX:

```
import KolIcon from "@components/KolIcon.astro"

<KolIcon image="pumpkin.gif" alt="pumpkin" />
```

Icons render at KoL's native 30x30 by default; pass `size={60}` (or another multiple of 30) to scale them up without blurring. If you use an icon you haven't downloaded, the build will fail and tell you the exact `npm run kol-icon` command to fix it.

## For contributors to the core website frontend/backend

To set up a local development environment, clone this repository and run `npm run dev` or `npm start`. In theory that should be all you need to do? Probably an `npm install` for good measure first.

I'm going to be real with you: this is the first modern-ish website I'd built, and the first thing I had put on the internet in almost a decade. I had a ton of problems with Gatsby (the old engine), so much so that I am mildly scarred by the experience of setting this site up. The new-ish Astro site is a bit better. But there are definitely a few pieces of this that are sort of crummy or poorly built, utilizing silly anti-patterns I should fix at some point. A few examples: 

- Originally, all CSS was contained in a `src/components/layout.module.css` file. This is actually largely fixed now; CSS that is singularly applied to one component lives in said component, while CSS that applies to multiple pages lives in layout.module.css. Perhaps not the most elegant structure, but it's fine. 
- I have gone back and forth on importing fonts and settled on not doing so. This was largely due to a lot of really annoying Gatsby cruft that doesn't matter anymore. I still kind of like the default sorta-crappy fonts we are using, but at some point we probably should update this to make the site look a bit more modern and a bit less "web 1.0", so to speak.

I will also note -- although the site doesn't look AMAZING, it looks OK, and further layout overrides will need to be approved through me. I did a lot of work on this thing, and any core layout change that adds -any- possible overhead to generating content will probably be rejected and/or heavily pushed on. (Sorry -- managed a bunch of blogs in my time. Every piece of additional friction on content contributors will make it hard to impossible to get people to write anything for the site, and it'll just become me toiling away. I will note: I wrote this paragraph when we started this site in 2023 and we get maybe 1-2 posts from not-me per year. So friction has still been enough to prevent frequent contributors. But hey: we still get SOME. Thanks to TES and Phill and Fraz and others!)

## To-Do List
This was once an actual to-do list, but has migrated to GitHub issues. Because I'm an adult. I'm 40. (Man, I don't know why I said that, I'm not 40 yet.)