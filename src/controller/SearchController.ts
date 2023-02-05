import { Response } from "express";
import { searchUsingQuery as searchUsingQueryService } from "../service/SearchService";

export const searchUsingQuery = async (
	res: Response,
	query: string,
	page: string,
	nsfw: boolean
) => {
	try {
		const { results, count } = await searchUsingQueryService(
			query,
			page,
			nsfw
		);
		return res.status(200).json({ status: "ok", data: results, count });
	} catch (err) {
		return res.status(500).json({ status: "error", message: err.message });
	}
};
