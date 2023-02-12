import { Response } from "express";
import { searchUsingQuery as searchUsingQueryService } from "../service/SearchService";

export const searchUsingQuery = async (res: Response, reqQuery: any) => {
	const query = reqQuery.q as string;
	const page = (reqQuery.page as string) || "1";
	const nsfw = reqQuery.nsfw === "true" ? true : false;

	const { results, count } = await searchUsingQueryService(query, page, nsfw);
	return res.status(200).json({ status: "ok", data: results, count });
};
