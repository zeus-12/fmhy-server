import { Response } from "express";
import { linkPayloadType } from "routes/LinksRoute";
import {
	getLinkByCategoryAndChannel as getLinkByCategoryAndChannelService,
	getLinkByCategory as getLinkByCategoryService,
	addLink as addLinkService,
} from "../service/LinksService";

export const getLinkByCategoryAndChannel = async (
	res: Response,
	CATEGORY: string,
	CHANNEL: string
) => {
	try {
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

export const getLinkByCategory = async (res: Response, CATEGORY: string) => {
	try {
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

export const addLink = async (res: Response, linkPayload: linkPayloadType) => {
	try {
		const link = await addLinkService(linkPayload);
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
