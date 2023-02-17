import { RESOURCES } from "./utils/CONSTANTS";
import scrape, { storage_scraper, base64_scraper } from "./scrape";
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
				// scrapedData = await storage_scrapper(isShort);
			} else {
				scrapedData = await scrape(resource.urlEnding, isShort);
			}
			data = data.concat([...scrapedData]);
		})
	);

	console.log(data.length);
	logLinks(data);

	// base64 links
	scrapedData = await base64_scraper();
	logLinks(scrapedData);
	console.log(scrapedData.length);
};

const logLinks = (data: LinkType[]) => {
	fs.writeFileSync(
		`./src/scraper/links-scraped/${Date.now()}.json`,
		JSON.stringify(data)
	);
};

export default scrapeScript;
