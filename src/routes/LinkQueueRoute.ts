import express from "express";
import {
	addLinkToQueue,
	deleteLinkInQueueById,
	getLinkInQueueById,
	getLinksInQueue,
	updateLinkInQueuById,
} from "../controller/LinkQueueController";

var router = express.Router();

router.post("/", async (req, res, next) => {
	return await addLinkToQueue(res, req.body).catch(next);
});

router.get("/", async (_, res, next) => {
	return await getLinksInQueue(res).catch(next);
});

router.get("/:ID", async (req, res, next) => {
	return await getLinkInQueueById(res, req.params.ID).catch(next);
});

router.delete("/:ID", async (req, res, next) => {
	return await deleteLinkInQueueById(res, req.params.ID).catch(next);
});

router.put("/:ID", async (req, res, next) => {
	return await updateLinkInQueuById(res, req.params.ID, req.body).catch(next);
});

export default router;
