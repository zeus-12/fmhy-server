import express from "express";
import {
	addLinkToQueue,
	deleteLinkInQueueById,
	getLinkInQueueById,
	getLinksInQueue,
	updateLinkInQueuById,
} from "../controller/LinkQueueController";

var router = express.Router();

router.post("/", async (req, res) => {
	return await addLinkToQueue(res, req.body);
});

router.get("/", async (_, res) => {
	return await getLinksInQueue(res);
});

router.get("/:ID", async (req, res) => {
	return await getLinkInQueueById(res, req.params.ID);
});

router.delete("/:ID", async (req, res) => {
	return await deleteLinkInQueueById(res, req.params.ID);
});

router.put("/:ID", async (req, res) => {
	return await updateLinkInQueuById(res, req.params.ID, req.body);
});

export default router;
