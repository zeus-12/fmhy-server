import { Response } from "express";
import { linkSchema, validMongooseId } from "../lib/zodSchemas";
import {
	addLinkToQueue as addLinkToQueueService,
	getLinksInQueue as getLinksInQueueService,
	getLinkInQueueById as getLinkInQueueByIdService,
	deleteLinkInQueueById as deleteLinkInQueueByIdService,
	updateLinkInQueuById as updateLinkInQueuByIdService,
} from "../service/LinkQueueService";

export const addLinkToQueue = async (res: Response, reqBody: any) => {
	const linkPayload = linkSchema.parse(reqBody);
	const username = res.locals.user.username;
	const isAdmin = res.locals.user.admin;

	await addLinkToQueueService(linkPayload, username, isAdmin);
	return res.status(200).json({
		status: "success",
	});
};

export const getLinksInQueue = async (res: Response) => {
	const links = await getLinksInQueueService();
	return res.status(200).json({
		status: "success",
		data: links,
	});
};

export const getLinkInQueueById = async (res: Response, id: string) => {
	validMongooseId.parse(id);

	const link = await getLinkInQueueByIdService(id);
	return res.status(200).json({
		status: "success",
		data: link,
	});
};

export const deleteLinkInQueueById = async (res: Response, id: string) => {
	validMongooseId.parse(id);

	const isAdmin = res.locals.user.admin;
	const username = res.locals.user.username;

	await deleteLinkInQueueByIdService(id, username, isAdmin);
	return res.status(200).json({
		status: "success",
	});
};

export const updateLinkInQueuById = async (
	res: Response,
	id: string,
	reqBody: any
) => {
	validMongooseId.parse(id);
	const linkPayload = linkSchema.parse(reqBody);

	const isAdmin = res.locals.user.admin;
	const username = res.locals.user.username;

	await updateLinkInQueuByIdService(id, linkPayload, username, isAdmin);
	return res.status(200).json({
		status: "success",
	});
};
