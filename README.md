# Loathers.net: a Loathers website

Welcome to the GitHub repository for the core loathers.net website. This was built from the ground up by Captain Scotch and (likely) improved over time by our overarching collective!

## For content contributors
Content should be submitted as .mdx files placed within the `src/data/` folders. These MDX files should be (largely) normal markdown files. They should be prepended with the following data:

```
---
title: "Article Title"
date: "Article Posted Date"
slug: "url-string-with-no-spaces"
author: "Your name"
section: "analysis" OR "scripting" OR "miscellaneous"
tag: "Whatever your heart desires"
---
```

Otherwise, it's all basic markdown, and should be very easy to contribute to! Please put up a PR with any markdown file you'd like to add. Here are a handful of small stylistic things we would prefer to have contributors do, but can change on our end if you aren't as comfortable with it and would like to just submit the content and get support from our editors.

- Please do **NOT** use H1 (the `# blahblah` construction); subheadings should be done with `##` for H2. Reserving H1 for the core title heading.
- Use normal markdown links for most things. For internal site links, you can use `<Link to="./tools/">blahblah</Link>` to leverage Gatsby's internal link system

Eventually, we are hoping to have various components like `<IOTMBox iotm="gamename" />` that contributors can use, but we don't have those yet. When we do, we'll put a guide to using them here (or in a separate MD file!)

## For contributors to the core website frontend/backend

To set up a local development environment, clone this repository and run `npm run develop`. In theory that should be all you need to do? Probably an `npm install` for good measure first.

I'm going to be real with you: I've never built a React site before, and I had a ton of awful issues with Gatsby while setting this site up. I think the final product is OK, but there are definitely pieces of this that aren't "pure" modern web design. A few examples: 

- While I used a few modern-ish CSS tricks like stripe creation, the CSS is applied via a one-time drop in the `src/components/layout.module.css` file, applied to all pages via the `layout.jsx` file (and referenced within a few other components). There's a broad theming engine in Gatsby I considered using but found way too heavyweight for my tastes. 
- I have gone back and forth on importing fonts and settled on not doing so. I'll probably reverse course on that at some point, but the build process for development was taking too long while I was doing heavy work on `gatsby-node.js` and `gatsby-config.mjs` (which requires you to rebuild/repack everything after every change) and I don't totally mind the older-ish vibe this gives the site.
- Getting MDX comprehension to work well was an absolute nightmare. MDX is overall a good file format (as it lets us eventually do things like allow posts to pull in small amounts of data without forcing contributors to understand a single thing about coding) but it sucks the big one for Gatsby ingestion. As is, everything works. But if you are going to fiddle with node and config, do so with the expectation that maintaining MDX parsing is going to be a bit of a pain.

I will also note -- although the site doesn't look AMAZING, it looks OK, and further layout overrides will need to be approved through me. I did a lot of work on this thing, and any core layout change that adds -any- possible overhead to generating content will probably be rejected and/or heavily pushed on. (Sorry -- managed a bunch of blogs in my time. Every piece of additional friction on content contributors will make it hard to impossible to get people to write anything for the site, and it'll just become me toiling away.)

## To-Do List
- I am converting the to-do list into GitHub Issues. This is because I am an adult, and adults just use GitHub Issues for their problems. 

- Put the site online!
- MDX isn't linking up properly with any of the remark image plugins I tried to use. However, you can get around this pretty easily by just uploading images to GitHub instead, as images do work when they are externally sourced. Not a perfect solution but it works fine for now.
- RSS feed support via an `allMdx` query-to-xml generator
- OAF integration so that OAF knows when new articles get published (probably after the RSS feed, seems like that would be easiest)
- Would be nice to set up next/previous post buttons within our two content streams (analysis & scripting)
- When we complete a mafia data API, I really want to make IOTM boxes that generate on site build that pop up with an in-game item card. That way we can pepper IOTM analysis with images of the item without taking screenshots of every item.