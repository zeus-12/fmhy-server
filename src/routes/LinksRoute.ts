import {
	addLinkToQueue,
	getLinkByCategory,
	getLinkByCategoryAndChannel,
} from "../controller/LinksController";
import express from "express";
import Link from "../models/Link";
import { z } from "zod";

const router = express.Router();

export const linkSchema = z.object({
	title: z.string().min(3).max(20),
	link: z.string().min(3).max(40),
	description: z.string().min(3).max(40),
	// todo make sure cateogry and channel is valid.
	category: z.string().min(3).max(20),
	channel: z.string().min(3).max(20),
});

export type linkPayloadType = z.infer<typeof linkSchema>;

// none of these routes are tested

router.get("/:CATEGORY/:CHANNEL", (req, res) => {
	const CATEGORY = req.params.CATEGORY as string;
	const CHANNEL = req.params.CHANNEL as string;

	// check cateogry and channel is valid.

	return getLinkByCategoryAndChannel(res, CATEGORY, CHANNEL);
});
router.get("/:CATEGORY", (req, res) => {
	const CATEGORY = req.params.CATEGORY;
	// check cateogry is valid.

	return getLinkByCategory(res, CATEGORY);
});

router.post("/", (req, res) => {
	const linkPayload = linkSchema.safeParse(req.body);

	if (!linkPayload.success) {
		res.status(400).json({ error: linkPayload.error });
		return;
	}

	return addLinkToQueue(res, linkPayload.data);
});

export default router;
