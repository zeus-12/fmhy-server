import {
	addLink,
	getLinkByCategory,
	getLinkByCategoryAndChannel,
} from "../controller/LinksController";
import express from "express";

const router = express.Router();

router.get("/:CATEGORY/:CHANNEL", async (req, res, next) => {
	return await getLinkByCategoryAndChannel(res, req.params).catch(next);
});

router.get("/:CATEGORY", async (req, res, next) => {
	return await getLinkByCategory(res, req.params).catch(next);
});

router.post("/", async (req, res, next) => {
	return await addLink(res, req.body).catch(next);
});

export default router;
