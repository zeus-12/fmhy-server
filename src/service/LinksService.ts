import { linkPayloadType } from "../lib/zodSchemas";
import Link from "../schema/LinkSchema";

export const getLinkByCategoryAndChannel = async (
	CATEGORY: string,
	CHANNEL: string
) => {
	const link = await Link.find({ category: CATEGORY, channel: CHANNEL });
	if (link) {
		return link;
	} else {
		throw new Error("No links found");
	}
};

export const getLinkByCategory = async (CATEGORY: string) => {
	const link = await Link.find({ category: CATEGORY });
	if (link) {
		return link;
	} else {
		throw new Error("No links found");
	}
};

export const addLink = async (linkPayload: linkPayloadType) => {
	const link = new Link(linkPayload);
	await link.save();
};

export const getLinkByUrl = async (url: string) => {
	const link = await Link.findOne({ link: url });
	return link;
};
