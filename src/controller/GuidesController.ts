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
	const guides = await getAllGuidesService();
	return res.status(200).json({ status: "ok", data: guides });
};

export const getGuidesByUser = async (res: Response) => {
	if (!res.locals.user?.username) {
		return res
			.status(401)
			.json({ status: "error", message: "Unauthorized" });
	}

	const guides = await getGuidesByUserService(res.locals.user.username);
	return res.json({ status: "ok", data: guides });
};

export const getGuideById = async (res: Response, reqParams: any) => {
	const { id } = reqParams;
	validMongooseId.parse(id);

	const guide = await getGuideByIdService(id);
	return res.status(200).json({ status: "ok", data: guide });
};

export const addNewGuide = async (res: Response, reqBody: any) => {
	const guidePayload = guideSchema.parse(reqBody);

	// move user based to a middleware (check todo)
	if (!res.locals.user?.username) {
		return res
			.status(401)
			.json({ status: "error", message: "Unauthorized" });
	}

	guidePayload.title = guidePayload.title.trim();
	guidePayload.link = guidePayload.link.split(" ").join("");

	const newGuide = await addNewGuideService(
		guidePayload,
		res.locals.user.username
	);
	return res.status(200).json({ status: "ok", data: newGuide });
};

export const deleteGuideById = async (res: Response, id: string) => {
	validMongooseId.parse(id);

	const isAdmin = res.locals.user?.admin;
	const username = res.locals.user?.username;

	await deleteGuideByIdService(id, isAdmin, username);
	return res.status(200).json({ status: "ok" });
};

export const updateGuideById = async (
	res: Response,
	reqBody: any,
	id: string
) => {
	const newGuidePayload = guideSchema.parse(reqBody);

	validMongooseId.parse(id);

	const isAdmin = res.locals.user?.admin;
	const username = res.locals.user?.username;

	await updateGuideByIdService(id, newGuidePayload, isAdmin, username);
	return res.status(200).json({ status: "ok" });
};
