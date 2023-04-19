import { guidePayloadType } from "../lib/zodSchemas";
import Guide from "../models/GuideModel";

export const getAllGuides = async () => {
	const guides = await Guide.find().select("-__v");
	return guides;
};

export const getGuidesByUser = async (username: string) => {
	const guides = await Guide.find({ owner: username });
	return guides;
};

export const getGuideByLink = async (link: string) => {
	const guide = await Guide.findOne({ link });
	if (!guide) throw new Error("No guide found.");
	return guide;
};

export const getGuideById = async (id: string) => {
	const guide = await Guide.findById(id);
	if (!guide) throw new Error("No guide found.");

	return guide;
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
		return await newGuide.save();
	} catch (err) {
		throw new Error("Unable to add guide");
	}
};

export const deleteGuideById = async (
	id: string,
	isAdmin: boolean,
	username: string
) => {
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
};

export const updateGuideById = async (
	id: string,
	newGuidePayload: guidePayloadType,
	isAdmin: boolean,
	username: string
) => {
	const existingGuideData = await getGuideById(id);
	if (!existingGuideData) {
		throw new Error("Invalid ID");
	}

	if (!isAdmin && existingGuideData.owner !== username) {
		throw new Error("Unauthorized");
	}

	return await existingGuideData.updateOne({
		...newGuidePayload,
	});
};
