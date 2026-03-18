import { getCollection } from "astro:content";

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

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
