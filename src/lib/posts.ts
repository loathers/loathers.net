import { getCollection, type CollectionEntry } from "astro:content";

export async function getPostsBySection(section: string) {
  const posts = await getCollection("posts", ({ data }) => {
    return data.section === section;
  });
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export async function getAllPostsSortedAsc() {
  const posts = await getCollection("posts");
  return posts.sort(
    (a, b) => a.data.date.getTime() - b.data.date.getTime(),
  );
}

// Teaser text for a post: the `excerpt` frontmatter field if set, otherwise
// the opening of the post body with MDX imports, components, headings, and
// markdown syntax stripped out, trimmed to a word boundary.
export function getExcerpt(post: CollectionEntry<"posts">, maxLength = 200): string {
  if (post.data.excerpt) return post.data.excerpt;

  const text = (post.body ?? "")
    .replace(/^(import|export)\s.*$/gm, "")
    .replace(/<([A-Z]\w*)[^>]*>[\s\S]*?<\/\1>/g, "")
    .replace(/<[A-Za-z][^>]*\/>/g, "")
    .replace(/<\/?[a-z][^>]*>/g, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s{0,3}#{1,6}\s.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/(?<![\w*])(\*\*|__|\*|_|`)(\S(?:.*?\S)?)\1(?![\w*])/g, "$2")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]+$/, "") + "…";
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
