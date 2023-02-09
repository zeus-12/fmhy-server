import { Response } from "express";
import { linkPayloadType } from "routes/LinksRoute";
import {
	addLinkToQueue as addLinkToQueueService,
	getLinksInQueue as getLinksInQueueService,
	getLinkInQueueById as getLinkInQueueByIdService,
	deleteLinkInQueueById as deleteLinkInQueueByIdService,
} from "../service/LinkQueueService";

export const addLinkToQueue = async (
	res: Response,
	linkPayload: linkPayloadType
) => {
	try {
		const username = res.locals.user.username;
		const isAdmin = res.locals.user.admin;

		// todo validate and isAdmin

		await addLinkToQueueService(linkPayload, username, isAdmin);
		return res.status(200).json({
			status: "success",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

export const getLinksInQueue = async (res: Response) => {
	try {
		const links = await getLinksInQueueService();
		return res.status(200).json({
			status: "success",
			data: links,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

export const getLinkInQueueById = async (res: Response, id: string) => {
	try {
		const link = await getLinkInQueueByIdService(id);
		return res.status(200).json({
			status: "success",
			data: link,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

export const deleteLinkInQueueById = async (res: Response, id: string) => {
	try {
		const isAdmin = res.locals.user.admin;
		const username = res.locals.user.username;

		await deleteLinkInQueueByIdService(id, username, isAdmin);
		return res.status(200).json({
			status: "success",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

export const updateLinkInQueuById = async (
	res: Response,
	id: string,
	linkPayload: linkPayloadType
) => {
	try {
		const isAdmin = res.locals.user.admin;
		const username = res.locals.user.username;

		await deleteLinkInQueueByIdService(id, username, isAdmin);
		return res.status(200).json({
			status: "success",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
