# Deprecated!
## Migrated to Nextjs [API routes](https://github.com/zeus-12/fmhy)

# Backend Server for FMHY

Domains:

-   fmhy.ml
-   freemediaheckyeah.ml

Features:

-   Typesafe
-   Run time type validation using Zod
-   MVCS architecture
-   Uses a custom error factory to handle errors
-   A cron job that scrapes data from FMHY's Github page to power FMHY search & FMHY Discord Bot.

## Scrapper

-   build with ts, node-cron, cheerio

## Current Stats (last updated: 11/2/23)

-   total links = 14352
-   sfw = 14024
-   nsfw = 328

## To run local

-   run "yarn generate" to generate the compiled js files
-   "yarn dev" to run the server
-   "yarn scrape" to run the scraper
