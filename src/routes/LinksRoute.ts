import {
	addLink,
	getLinkByCategory,
	getLinkByCategoryAndChannel,
} from "../controller/LinksController";
import express from "express";

const router = express.Router();

router.get("/:CATEGORY/:CHANNEL", async (req, res) => {
	return await getLinkByCategoryAndChannel(res, req.params);
});

router.get("/:CATEGORY", async (req, res) => {
	return await getLinkByCategory(res, req.params);
});

router.post("/", async (req, res) => {
	return await addLink(res, req.body);
});

export default router;
