import Guide from "../models/Guide";
import { Response } from "express";
import { guidePayloadType } from "../routes/GuidesRoute";
import {
	getAllGuides as getAllGuidesService,
	getGuideById as getGuideByIdService,
	getGuidesByUser as getGuidesByUserService,
	addNewGuide as addNewGuideService,
	deleteGuideById as deleteGuideByIdService,
	updateGuideById as updateGuideByIdService,
} from "../service/GuidesService";

// tested
export const getAllGuides = async (res: Response) => {
	try {
		const guides = await getAllGuidesService();
		return res.status(200).json({ status: "ok", data: guides });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};

// to be tested
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

// to be tested

export const getGuideById = async (res: Response, id: string) => {
	try {
		const guide = await getGuideByIdService(id);
		return res.status(200).json({ status: "ok", data: guide });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};

// to be tested

export const addNewGuide = async (
	res: Response,
	guidePayload: guidePayloadType
) => {
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

// to be tested
export const deleteGuideById = async (res: Response, id: string) => {
	try {
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
	newGuidePayload: guidePayloadType,
	id: string
) => {
	try {
		const isAdmin = res.locals.user?.admin;
		const username = res.locals.user?.username;

		await updateGuideByIdService(id, newGuidePayload, isAdmin, username);
		return res.status(200).json({ status: "ok" });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};