import {
	addLink,
	getLinkByCategory,
	getLinkByCategoryAndChannel,
} from "../controller/LinksController";
import express from "express";

const router = express.Router();

router.get("/:CATEGORY/:CHANNEL", (req, res) => {
	return getLinkByCategoryAndChannel(res, req.params);
});

router.get("/:CATEGORY", (req, res) => {
	return getLinkByCategory(res, req.params);
});

router.post("/", (req, res) => {
	return addLink(res, req.body);
});

export default router;
