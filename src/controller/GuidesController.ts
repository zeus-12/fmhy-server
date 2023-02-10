import { Response } from "express";
import {
	getAllGuides as getAllGuidesService,
	getGuideById as getGuideByIdService,
	getGuidesByUser as getGuidesByUserService,
	addNewGuide as addNewGuideService,
	deleteGuideById as deleteGuideByIdService,
	updateGuideById as updateGuideByIdService,
} from "../service/GuidesService";
import { guideSchema, validMongooseId } from "../lib/zodSchemas";

export const getAllGuides = async (res: Response) => {
	try {
		const guides = await getAllGuidesService();
		return res.status(200).json({ status: "ok", data: guides });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};

export const getGuidesByUser = async (res: Response) => {
	if (!res.locals.user?.username) {
		res.status(401).json({ status: "error", message: "Unauthorized" });
		return;
	}

	try {
		const guides = await getGuidesByUserService(res.locals.user.username);
		res.json({ status: "ok", data: guides });
	} catch (err) {
		res.status(500).json({ status: "error", message: err.message });
	}
};

export const getGuideById = async (res: Response, reqParams: any) => {
	try {
		const { id } = reqParams;
		validMongooseId.parse(id);

		const guide = await getGuideByIdService(id);
		return res.status(200).json({ status: "ok", data: guide });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};

export const addNewGuide = async (res: Response, reqBody: any) => {
	const guidePayload = guideSchema.parse(reqBody);

	if (!res.locals.user?.username) {
		return res
			.status(401)
			.json({ status: "error", message: "Unauthorized" });
	}

	try {
		const newGuide = await addNewGuideService(
			guidePayload,
			res.locals.user.username
		);
		return res.status(200).json({ status: "ok", data: newGuide });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};

export const deleteGuideById = async (res: Response, id: string) => {
	try {
		validMongooseId.parse(id);

		const isAdmin = res.locals.user?.admin;
		const username = res.locals.user?.username;

		await deleteGuideByIdService(id, isAdmin, username);
		return res.status(200).json({ status: "ok" });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};

export const updateGuideById = async (
	res: Response,
	reqBody: any,
	id: string
) => {
	try {
		const newGuidePayload = guideSchema.parse(reqBody);

		validMongooseId.parse(id);

		const isAdmin = res.locals.user?.admin;
		const username = res.locals.user?.username;

		await updateGuideByIdService(id, newGuidePayload, isAdmin, username);
		return res.status(200).json({ status: "ok" });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};
