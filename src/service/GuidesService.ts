import { guidePayloadType } from "../lib/zodSchemas";
import Guide from "../models/Guide";

export const getAllGuides = async () => {
	try {
		const guides = await Guide.find();
		return guides;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getGuidesByUser = async (username: string) => {
	try {
		const guides = await Guide.find({ owner: username });
		return guides;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getGuideByLink = async (link: string) => {
	try {
		const guide = await Guide.findOne({ link });
		return guide;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const getGuideById = async (id: string) => {
	try {
		const guide = await Guide.findById(id);
		return guide;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const addNewGuide = async (
	guidePayload: guidePayloadType,
	username: string
) => {
	const guideWithSameLink = await getGuideByLink(guidePayload.link);
	if (guideWithSameLink) {
		throw new Error("Guide already exists");
	}

	try {
		const newGuide = new Guide({
			...guidePayload,
			owner: username,
		});

		await newGuide.save();
		return newGuide;
	} catch (err) {
		throw new Error("Unable to add guide");
	}
};

export const deleteGuideById = async (
	id: string,
	isAdmin: boolean,
	username: string
) => {
	try {
		if (isAdmin) {
			return await Guide.findOneAndDelete({ _id: id });
		} else {
			const deletedGuide = await Guide.findOneAndDelete({
				_id: id,
				owner: username,
			});

			if (!deletedGuide) {
				throw new Error("Invalid ID");
			}
			return;
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export const updateGuideById = async (
	id: string,
	newGuidePayload: guidePayloadType,
	isAdmin: boolean,
	username: string
) => {
	try {
		const existingGuideData = await getGuideById(id);
		if (!existingGuideData) {
			throw new Error("Invalid ID");
		}

		if (!isAdmin && existingGuideData.owner !== username) {
			throw new Error("Unauthorized");
		}

		return await existingGuideData.updateOne({
			title: newGuidePayload.title.trim(),
			link: newGuidePayload.link.split(" ").join(""),
			nsfw: newGuidePayload.nsfw,
			tags: newGuidePayload.tags,
			credits: newGuidePayload.credits.trim(),
		});
	} catch (err) {
		throw new Error(err.message);
	}
};
