import {
	addNewGuide,
	deleteGuideById,
	getAllGuides,
	// getGuideById,
	getGuidesByUser,
	updateGuideById,
} from "../controller/GuidesController";
import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

var ObjectId = mongoose.Types.ObjectId;

export const guideSchema = z.object({
	title: z.string().min(3).max(20),
	link: z.string().min(3).max(40),
	nsfw: z.boolean(),
	credits: z.string().min(3).max(20),
	tags: z.array(
		z
			.string()
			.min(3, {
				message: "min 3 characters",
			})
			.max(12, { message: "max 12 character" })
	),
});

export type guidePayloadType = z.infer<typeof guideSchema>;

var router = express.Router();

router.get("/", (_, res) => {
	return getAllGuides(res);
});

router.get("/user", (_, res) => {
	return getGuidesByUser(res);
});

router.post("/", (req, res) => {
	const guidePayload = guideSchema.safeParse(req.body);
	if (!guidePayload.success) {
		return res
			.status(400)
			.json({ error: fromZodError(guidePayload.error).message });
	}
	return addNewGuide(res, guidePayload.data);
});

router.delete("/:ID", async (req, res) => {
	if (!ObjectId.isValid(req.params.ID))
		return res.status(400).json({ error: "Invalid ID" });

	return deleteGuideById(res, req.params.ID);
});

router.put("/:ID", (req, res) => {
	if (!ObjectId.isValid(req.params.ID))
		return res.status(400).json({ error: "Invalid ID" });

	const newGuidePayload = guideSchema.safeParse(req.body);
	if (!newGuidePayload.success) {
		res.status(400).json({ error: newGuidePayload.error });
		return;
	}

	return updateGuideById(res, newGuidePayload.data, req.params.ID);
});

// ##### route not required rn => remember to whitelist it in authhandler #####

// router.get("/:ID", (req, res) => {
// 	const { ID } = req.params;
// 	const ObjectId = mongoose.Types.ObjectId;
// 	if (!ObjectId.isValid(ID)) {
// 		res.status(400).json({ error: "Invalid ID" });
// 		return;
// 	}

// 	return getGuideById(res, ID);
// });

export default router;
