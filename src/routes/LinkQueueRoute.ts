import express from "express";
import mongoose from "mongoose";
import { linkSchema } from "./LinksRoute";
import {
	addLinkToQueue,
	deleteLinkInQueueById,
	getLinkInQueueById,
	getLinksInQueue,
	updateLinkInQueuById,
} from "../controller/LinkQueueController";
import { fromZodError } from "zod-validation-error";

var router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.post("/", (req, res) => {
	const linkPayload = linkSchema.safeParse(req.body);
	if (!linkPayload.success)
		return res
			.status(400)
			.json({ error: fromZodError(linkPayload.error).message });

	return addLinkToQueue(res, linkPayload.data);
});

router.get("/", async (_, res) => {
	return await getLinksInQueue(res);
});

router.get("/:ID", (req, res) => {
	if (!ObjectId.isValid(req.params.ID))
		return res.status(400).json({ error: "Invalid ID" });

	return getLinkInQueueById(res, req.params.ID);
});

router.delete("/:ID", async (req, res) => {
	if (!ObjectId.isValid(req.params.ID))
		return res.status(400).json({ error: "Invalid ID" });

	return deleteLinkInQueueById(res, req.params.ID);
});

router.put("/:ID", async (req, res) => {
	if (!ObjectId.isValid(req.params.ID))
		return res.status(400).json({ error: "Invalid ID" });

	return updateLinkInQueuById(res, req.params.ID, req.body);
});

export default router;
