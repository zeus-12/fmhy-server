import { Response } from "express";
import { linkSchema } from "../lib/zodSchemas";
import { fromZodError } from "zod-validation-error";
import {
	getLinkByCategoryAndChannel as getLinkByCategoryAndChannelService,
	getLinkByCategory as getLinkByCategoryService,
	addLink as addLinkService,
} from "../service/LinksService";

export const getLinkByCategoryAndChannel = async (
	res: Response,
	reqParams: any
) => {
	try {
		const CATEGORY = reqParams.CATEGORY as string;
		const CHANNEL = reqParams.CHANNEL as string;

		// validate category and channel

		const link = await getLinkByCategoryAndChannelService(
			CATEGORY,
			CHANNEL
		);
		return res.status(200).json({
			status: "success",
			data: link,
		});
	} catch (err) {
		return res.json({
			status: "error",
			message: err.message,
		});
	}
};

export const getLinkByCategory = async (res: Response, reqParams: any) => {
	try {
		const CATEGORY = reqParams.CATEGORY as string;

		const link = await getLinkByCategoryService(CATEGORY);
		return res.status(200).json({
			status: "success",
			data: link,
		});
	} catch (err) {
		return res.json({
			status: "error",
			message: err.message,
		});
	}
};

export const addLink = async (res: Response, reqBody: any) => {
	try {
		const linkPayload = linkSchema.safeParse(reqBody);
		if (!linkPayload.success) {
			return res
				.status(400)
				.json({ error: fromZodError(linkPayload.error).message });
		}

		const link = await addLinkService(linkPayload.data);
		return res.status(200).json({
			status: "success",
			data: link,
		});
	} catch (err) {
		return res.json({
			status: "error",
			message: err.message,
		});
	}
};
