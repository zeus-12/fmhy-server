import { RESOURCES } from "./utils/CONSTANTS";
// import cron from "node-cron";
import scrape from "./scrape";
import fs from "fs";
import { LinkType } from "./utils/types";

const simpleScrapeScript = async () => {
	let data: LinkType[] = [];
	let scrapedData!: LinkType[];

	const isShort = true;

	await Promise.all(
		RESOURCES.map(async (resource) => {
			scrapedData = [];
			if (resource.title === "STORAGE") {
				// scrapedData = await storage_scrapper();
			} else {
				scrapedData = await scrape(resource.urlEnding, isShort);
			}
			data = data.concat([...scrapedData]);
		})
	);

	console.log(data.length);
	logLinks(data);
};

// cron.schedule("0 0 * * 0", async () => {
// await
simpleScrapeScript();
// });

const logLinks = (data: LinkType[]) => {
	fs.writeFileSync(
		`./src/scraper/links-scraped/${Date.now()}.json`,
		JSON.stringify(data)
	);
};
