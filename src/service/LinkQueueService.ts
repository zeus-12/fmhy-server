import LinkQueue from "../models/LinkQueue";
import { linkPayloadType } from "../lib/zodSchemas";
import { getLinkByUrl } from "./LinksService";

export const addLinkToQueue = async (
	linkPayload: linkPayloadType,
	username: string,
	isAdmin: boolean
) => {
	const isLinkInDb = getLinkByUrl(linkPayload.link);
	if (!isLinkInDb) throw new Error("Link already exists!");

	const isLinkInQueue = await getLinkInQueueById(linkPayload.link);
	if (!isLinkInQueue) throw new Error("Link already added to the queue!");

	const submit_link = new LinkQueue({
		...linkPayload,
		username,
		admin: isAdmin,
	});

	return await submit_link.save();
};

export const getLinksInQueue = async () => {
	const links = await LinkQueue.find();
	return links;
};

export const getLinkInQueueById = async (id: string) => {
	const link = LinkQueue.findById(id);
	return link;
};

export const deleteLinkInQueueById = async (
	id: string,
	username: string,
	isAdmin: boolean
) => {
	if (isAdmin) {
		return await LinkQueue.findByIdAndDelete(id);
	}
	const link = await getLinkInQueueById(id);

	if (!link) throw new Error("Link not found!");

	if (link?.username !== username) {
		throw new Error("You don't have the permission to delete this link!");
	} else {
		return await LinkQueue.findByIdAndDelete(id);
	}
};

export const updateLinkInQueuById = async (
	id: string,
	linkPayload: linkPayloadType,
	username: string,
	isAdmin: boolean
) => {
	if (isAdmin) return await LinkQueue.findByIdAndUpdate(id, linkPayload);

	const link = await getLinkInQueueById(id);
	if (!link) throw new Error("Link not found!");

	if (link?.username !== username) {
		throw new Error("You don't have the permission to delete this link!");
	}

	return await LinkQueue.findByIdAndUpdate(id, linkPayload);
};
