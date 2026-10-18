// rss.xml.ts
//
// The site's RSS feed at /rss.xml: every post, newest first, with the same
//   teaser text the post cards use. Readers click through for the full post,
//   since the calculators and other interactive bits only work on the site.

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "@lib/constants";
import { getAllPostsSortedAsc, getExcerpt } from "@lib/posts";

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(context: APIContext) {
  const posts = (await getAllPostsSortedAsc()).reverse();
  const site = context.site?.href ?? SITE.siteUrl;

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/",
    },
    // atom:link points the feed at its own address, which feed validators expect
    customData: [
      "<language>en-us</language>",
      `<atom:link href="${new URL("/rss.xml", site)}" rel="self" type="application/rss+xml"/>`,
    ].join(""),
    items: posts.map((post) => ({
      title: post.data.title,
      // Trailing slash is the address nginx actually serves, so readers skip a redirect.
      // It's also the item's permanent ID, which is why slugs had to settle first.
      link: `/${post.data.section}/${post.data.slug}/`,
      pubDate: post.data.date,
      description: getExcerpt(post),
      categories: [post.data.tag],
      // RSS's own <author> wants an email address, so names go in dc:creator
      customData: `<dc:creator>${escapeXml(post.data.author)}</dc:creator>`,
    })),
  });
}
