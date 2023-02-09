import express from "express";
import {
	addLinkToQueue,
	deleteLinkInQueueById,
	getLinkInQueueById,
	getLinksInQueue,
	updateLinkInQueuById,
} from "../controller/LinkQueueController";

var router = express.Router();

router.post("/", (req, res) => {
	return addLinkToQueue(res, req.body);
});

router.get("/", async (_, res) => {
	return await getLinksInQueue(res);
});

router.get("/:ID", (req, res) => {
	return getLinkInQueueById(res, req.params.ID);
});

router.delete("/:ID", async (req, res) => {
	return deleteLinkInQueueById(res, req.params.ID);
});

router.put("/:ID", async (req, res) => {
	return updateLinkInQueuById(res, req.params.ID, req.body);
});

export default router;
