import type { MarkdownHeading } from "astro";

export interface TocEntry {
  slug: string;
  text: string;
  /** Set for <Step> headings, so the contents can show the step's number */
  step?: number;
  children: TocEntry[];
}

const STEP = /<Step\s+n=\{(\d+)\}\s*>([\s\S]*?)<\/Step>/;
const MARKDOWN_HEADING = /^(#{1,6})\s/;
const FENCE = /^\s*(```|~~~)/;

/**
 * The table of contents for a post: ## sections, with ### subsections and
 * <Step> headings nested under the section they appear in.
 *
 * Astro's `headings` has the exact IDs the page uses, but leaves out <Step>
 * (it's a component, not markdown). So this walks the post source and slots
 * each step in where it sits between the markdown headings. If the source and
 * Astro's list ever disagree, it skips the steps rather than risk linking to
 * the wrong place.
 */
export function buildToc(body: string, headings: MarkdownHeading[]): TocEntry[] {
  const flat: { depth: number; slug: string; text: string; step?: number }[] = [];
  let next = 0;
  let inFence = false;
  let linedUp = true;

  for (const line of body.split("\n")) {
    if (FENCE.test(line)) inFence = !inFence;
    if (inFence) continue;

    const md = line.match(MARKDOWN_HEADING);
    if (md) {
      const heading = headings[next++];
      if (!heading || heading.depth !== md[1].length) {
        linedUp = false;
        break;
      }
      flat.push(heading);
      continue;
    }

    const step = line.match(STEP);
    if (step) {
      const text = step[2].replace(/<[^>]+>/g, "").trim();
      flat.push({ depth: 3, slug: `step-${step[1]}`, text, step: Number(step[1]) });
    }
  }

  const entries: typeof flat = linedUp && next === headings.length ? flat : headings;

  const toc: TocEntry[] = [];
  for (const { depth, slug, text, step } of entries) {
    if (depth === 2) {
      toc.push({ slug, text, children: [] });
    } else if (depth === 3) {
      const entry = { slug, text, step, children: [] };
      const section = toc.at(-1);
      // A subsection before any section just sits at the top level
      if (section) section.children.push(entry);
      else toc.push(entry);
    }
  }
  return toc;
}
