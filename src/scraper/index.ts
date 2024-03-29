import { RESOURCES } from "./utils/CONSTANTS";
import scrape, { base64_scraper } from "./scrape";
import fs from "fs";
import { LinkType } from "./utils/types";

const scrapeScript = async () => {
	let data: LinkType[] = [];
	let scrapedData!: LinkType[];

	const isShort = true;

	await Promise.all(
		RESOURCES.map(async (resource) => {
			scrapedData = [];
			if (resource.title === "STORAGE") {
				// scrapedData = await storage_scraper(isShort);
			} else {
				scrapedData = await scrape(resource.urlEnding, isShort);
			}
			data = data.concat([...scrapedData]);
		})
	);

	console.log(data.length);
	logLinks(data);

	// base64 links
	const base64Links = await base64_scraper();
	logLinks(base64Links);
	console.log(base64Links.length);
};

export const logLinks = (data: LinkType[]) => {
	fs.writeFileSync(
		`./src/scraper/links-scraped/${Date.now()}.json`,
		JSON.stringify(data)
	);
};

export default scrapeScript;
