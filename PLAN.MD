# PLAN FOR WHAT CONTENT LOOKS LIKE

This is an initial plan for what the site tree and general content should look like, in the end state.

=====================================

- MAIN PAGE (DONE)
    - caveat at the top that everything on this site is a spoiler
    - Pinned posts 
        - Most recent iotm review 
        - Newest added loathers script
        - Most recent shenanigan

- COMMUNITY PAGE (DONE; could use a little TLC)
    - Links (ass discord, wiki, reddit, non-script resources)
    - Scotch Spreadsheet Repository
    - About us (general writer bios; scotch, 3bh, bill, gausie, tes?)

- TOOLS PAGE (needs work)
    - Link to core Loathers.net tools; this is basically a subdomain showcase
    - Core links are:
        - BOFA
        - treat
        - museum
        - greenbox

- SCRIPTS PAGE + SCRIPTING SECTION (DONE; could use a little editing)
    - Link to our Scripting Resources section
        - This is basically just the GarfJalen, but hopefully people update it more often (lol this won't happen)
    - At some point, might be nice to have a guide on contributing to Mafia

- ANALYSIS (DONE)
    - IOTM Overview (monthly posts outlining IOTMs)
        - Goal will be to populate all of 2023. I don't really care to go too far back beyond that.
        - In addition to monthly IOTM reviews, one or two monthly "retro" reviews for older IOTMs, especially way-back-when IOTMs; this scratches the old IOTM itch without demanding we do EVERYTHING
    - Old Man Yells at Path (quarterly path overviews + 1 quarterly retro path review)
        - Most recent challenge path (and paths going forward) + occasional retro path reviews
    - Strategy Helpers (uncategorized speedrunning analysis/helper files)
        - Currently just the unrestricted pulls doc, but other mechanics and things that deserve posts include:
            - A Primer on Sicko Mode (ask TES to adapt wiki page post-nerf?)
            - Why Camel Spitting is So Dang Bonkers
            - How I Learned To Stop Worrying and Trust the Orb
    - Dank Ranks (rankings for various random kol things)
        - Scotch's Main Quest Rankings
        - Scotch's Standard Ascension IOTM Rankings

- SHENANIGANS (only have extorb; could eventually make full page)
    - Stunt Writeups (currently only have extrorb, and mention bean's wad extravaganza in 2CRS, but more would be nice)
        - Duffo
        - Phillanthropist
        - Altend's Slime Extravaganza
        - Cannon doing a million casuals in one day for some ungodly reason
    - Contest Writeups
        - BOFA
        - NSFW-AI
        - ASTRAY, DARNED OAF!

=========================================================

NOTES ON HOW GATSBY-THEME-MINIMAL SET SHIT UP

COMPONENTS THAT ARE REUSED:
    - Layout (L) <= H + F (header + footer) + Skipnavlink
    - Title (T)
    - Listing (LI) <= BLI (blog list item -> itemtags)
    <!-- - List (LIS) -->
    - Seo (S)
    <!-- - Code (C) <= Copy (CO) -->
    <!-- - HeaderExternalLinks (HEL) -->
    <!-- - HeaderTitle (HT) -->
    - Navigation (N)
    <!-- - Post Footer (PF) <= post (for type?) -->

COMPONENTS THAT ARE BUILT OF OTHER COMPONENTS
    - Homepage (L + T + LI + LIS + S)
    - Blog (L + LI + S)
    - Header (HT + HEL + N)
    <!-- - mdxcomponents (C + T) -->
    - Page (L + S)
    - Post (L + IT + S + PF) (weird circular ref?)
    <!-- - Tag (L +LI + S) -->

=====================================

POST FUNDAMENTALS:

    - Every instance of "<" or ">" will need to be written as {'<'} or {'>'} due to MDX parsing < as the start of a react thing.