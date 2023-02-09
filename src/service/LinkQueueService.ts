import { linkPayloadType } from "routes/LinksRoute";
import { getLinkByUrl } from "./LinksService";
import LinkQueue from "../models/LinkQueue";

export const addLinkToQueue = async (
	linkPayload: linkPayloadType,
	username: string,
	isAdmin: boolean
) => {
	try {
		const isLinkInDb = getLinkByUrl(linkPayload.link);
		// todo make sure if it doesnt exist then null is returned
		if (!isLinkInDb) throw new Error("Link already exists!");

		const isLinkInQueue = await getLinkInQueueById(linkPayload.link);
		// todo make sure if it doesnt exist then null is returned
		if (!isLinkInQueue) throw new Error("Link already added to the queue!");

		const submit_link = new LinkQueue({
			title: linkPayload.title,
			link: linkPayload.link,
			description: linkPayload.description,
			channel: linkPayload.channel,
			category: linkPayload.category,
			username: username,
			admin: isAdmin,
		});

		await submit_link.save();
		return;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getLinksInQueue = async () => {
	try {
		const links = await LinkQueue.find();
		return links;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getLinkInQueueById = async (id: string) => {
	try {
		const link = LinkQueue.findById(id);
		return link;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const deleteLinkInQueueById = async (
	id: string,
	username: string,
	isAdmin: boolean
) => {
	try {
		if (isAdmin) {
			return await LinkQueue.findByIdAndDelete(id);
		}
		const link = await getLinkInQueueById(id);
		if (!link) throw new Error("Link not found!");
		if (link?.username !== username) {
			throw new Error("You are not the owner of this link!");
		} else {
			return await LinkQueue.findByIdAndDelete(id);
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export const updateLinkInQueuById = async (
	id: string,
	linkPayload: linkPayloadType,
	username: string,
	isAdmin: boolean
) => {
	try {
		if (isAdmin) {
			return await LinkQueue.findByIdAndUpdate(id, linkPayload);
		}
		const link = await getLinkInQueueById(id);
		if (!link) throw new Error("Link not found!");

		if (link?.username !== username) {
			throw new Error("You are not the owner of this link!");
		}

		return await LinkQueue.findByIdAndUpdate(id, linkPayload);
	} catch (err) {
		throw new Error(err.message);
	}
};
