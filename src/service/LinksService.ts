import { linkPayloadType } from "routes/LinksRoute";
import Link from "../models/Link";

export const getLinkByCategoryAndChannel = async (
	CATEGORY: string,
	CHANNEL: string
) => {
	try {
		const link = await Link.find({ category: CATEGORY, channel: CHANNEL });
		if (link) {
			return link;
		} else {
			throw new Error("No links found");
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getLinkByCategory = async (CATEGORY: string) => {
	try {
		const link = await Link.find({ category: CATEGORY });
		if (link) {
			return link;
		} else {
			throw new Error("No links found");
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export const addLink = async (linkPayload: linkPayloadType) => {
	try {
		const link = new Link(linkPayload);
		await link.save();
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getLinkByUrl = async (url: string) => {
	try {
		const link = await Link.findOne({ link: url });
		return link;
	} catch (err) {
		throw new Error(err.message);
	}
};
