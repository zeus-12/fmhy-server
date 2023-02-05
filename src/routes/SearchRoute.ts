import { searchUsingQuery } from "../controller/SearchController";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
	const query = req.query.q as string;
	const page = (req.query.page as string) || "1";
	const nsfw = req.query.nsfw === "true" ? true : false;

	await searchUsingQuery(res, query, page, nsfw);
});
export default router;
