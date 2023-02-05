import express from "express";
import { redditCategories } from "../lib/CONSTANTS";
const router = express.Router();
import { RequestInfo } from "node-fetch";

const fetch = (url: RequestInfo) =>
	import("node-fetch").then(({ default: fetch }) => fetch(url));

router.get("/:ID", async (req, res) => {
	const { ID } = req.params;

	if (!redditCategories.includes(ID))
		return res.status(400).json({ status: "error", message: "Invalid ID" });

	const url = `https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/${ID}.json`;
	const response = await fetch(url);
	const data = await response.json();
	return res.status(200).json(data?.data?.content_md);
});

export default router;
