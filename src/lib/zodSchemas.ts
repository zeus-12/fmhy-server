import { Types } from "mongoose";
import { z } from "zod";
import { CATEGORIES, CATEGORY_CHANNEL_MAPPING } from "./CONSTANTS";

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

export const validMongooseId = z
	.string()
	.refine((id) => Types.ObjectId.isValid(id), { message: "Invalid ID" });

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

// add custom error messages
export const usernameSchema = z.string();
export const isAdminSchema = z.boolean();
export const passwordSchema = z.string();
