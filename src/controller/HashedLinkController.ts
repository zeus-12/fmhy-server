import { Response } from "express";
import { getHashedLinks as getHashedLinksService } from "../service/HashedLinksService";

export const getHashedLinks = async (res: Response, reqQuery: any) => {
	const page = (reqQuery.page as string) || "1";
	const results = await getHashedLinksService(page);

	return res.status(200).json({ status: "ok", data: results });
};
