import {
	addLinkToQueue,
	getLinkByCategory,
	getLinkByCategoryAndChannel,
} from "../controller/LinksController";
import express from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { CATEGORIES, CATEGORY_CHANNEL_MAPPING } from "../lib/CONSTANTS";

const router = express.Router();

export const linkSchema = z
	.object({
		title: z.string().min(3).max(20),
		link: z.string().min(3).max(40),
		description: z.string().min(3, "Min length must be 3"),
		// throw proper error message here if invalid category name is passed
		category: z.enum(CATEGORIES),
		channel: z.string().min(3, "Min length must be 3"),
	})
	.refine((data) => {
		const findChannel = CATEGORY_CHANNEL_MAPPING.find(
			(item) => item.category === data.category
		);

		// check how to put proper error message here
		// @ts-ignore
		return findChannel?.channels.includes(data.channel);
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
		return res
			.status(400)
			.json({ error: fromZodError(linkPayload.error).message });
	}
	return addLinkToQueue(res, linkPayload.data);
});

export default router;
