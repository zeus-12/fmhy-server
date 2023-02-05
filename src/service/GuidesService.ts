import { guidePayloadType } from "routes/GuidesRoute";
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
		throw new Error("Link already exists");
	}

	try {
		const newGuide = new Guide({
			// todo move these text transformations to somewhere else?
			title: guidePayload.title.trim(),
			link: guidePayload.link.split(" ").join(""),
			nsfw: guidePayload.nsfw ? true : false,
			owner: username,
			credits: guidePayload.credits,
			tags: guidePayload.tags,
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
			await Guide.findOneAndDelete({ _id: id });
			return;
		} else {
			await Guide.findOneAndDelete({
				_id: id,
				owner: username,
			});

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

		const oldGuide = await getGuideById(id);
		if (!oldGuide) {
			throw new Error("Invalid ID");
		}

		await oldGuide.updateOne({
			title: newGuidePayload.title.trim(),
			link: newGuidePayload.link.split(" ").join(""),
			nsfw: newGuidePayload.nsfw ? true : false,
			tags: newGuidePayload.tags,
			credits: newGuidePayload.credits.trim(),
		});
		return;
	} catch (err) {
		throw new Error(err.message);
	}
};
