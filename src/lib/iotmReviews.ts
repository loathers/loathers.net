// Connecting our review posts to IOTM tiering from the Google Sheet
import { getCollection, type CollectionEntry } from "astro:content";
import { IOTMS, type Iotm } from "./iotms";

export type Post = CollectionEntry<"posts">;

export const postUrl = (post: Post) => `/${post.data.section}/${post.data.slug}/`;

const boxedNames = (post: Post): string[] => {
  const field = post.data["boxed-iotm"];
  return field === undefined ? [] : Array.isArray(field) ? field : [field];
};

/** Every post that reviews an IOTM, newest first, by boxed name */
export async function reviewsByIotm(): Promise<Map<string, Post[]>> {
  const posts = await getCollection("posts", (post) => boxedNames(post).length > 0);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const reviews = new Map<string, Post[]>();
  for (const post of posts) {
    for (const name of boxedNames(post)) {
      reviews.set(name, [...(reviews.get(name) ?? []), post]);
    }
  }
  return reviews;
}

/** Our reviews of IOTMs in one tier, oldest IOTM first */
export async function reviewsInTier(tier: number): Promise<{ iotm: Iotm; post: Post }[]> {
  const reviews = await reviewsByIotm();
  return IOTMS.filter((iotm) => iotm.tier === tier)
    .flatMap((iotm) => (reviews.get(iotm.name) ?? []).map((post) => ({ iotm, post })))
    .sort((a, b) => a.iotm.year - b.iotm.year || a.post.data.title.localeCompare(b.post.data.title));
}

/** Contracts reviewsInTier to summarize multi-IOTM posts (like the Garden Slot retro) */
export async function reviewPostsInTier(tier: number): Promise<Map<Post, Iotm[]>> {
  const posts = new Map<Post, Iotm[]>();
  for (const { iotm, post } of await reviewsInTier(tier)) {
    posts.set(post, [...(posts.get(post) ?? []), iotm]);
  }
  return posts;
}
