import express from "express";
const router = express.Router();
import Search from "../models/Search";

router.get("/", async (req, res) => {
	const query = req.query.q as string;
	const page = req.query.page || 1;
	const nsfw = req.query.nsfw === "true" ? true : false;

	const ITEMS_PER_PAGE = 30;

	const regex = new RegExp(query, "i");

	try {
		const results = await Search.find({
			$or: [{ title: regex }, { link: { $in: [regex] } }],
			// 	title: { $regex: query, $options: "i" },
			isNsfw: nsfw,
		})
			.skip((+page - 1) * ITEMS_PER_PAGE)
			.limit(ITEMS_PER_PAGE);

		const count = await Search.countDocuments({
			$or: [{ title: regex }, { link: { $in: [regex] } }],
			// title: { $regex: query, $options: "i" },
			isNsfw: nsfw,
		});

		return res.json({
			status: "ok",
			data: results,
			count: count,
		});
	} catch (err) {
		console.log(err);
		return res.json({
			status: "error",
		});
	}
});
export default router;
